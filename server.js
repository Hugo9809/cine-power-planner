const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const nodeFetch = require('node-fetch');

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const app = express();
app.use(express.json());
app.use(session({ secret: 'camera-power-planner', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  profile.accessToken = accessToken;
  return done(null, profile);
}));

app.get('/auth/github', passport.authenticate('github', { scope: ['gist'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

async function loadData(accessToken) {
  const resp = await nodeFetch('https://api.github.com/gists', {
    headers: { Authorization: `token ${accessToken}` }
  });
  const gists = await resp.json();
  let gist = gists.find(g => g.files && g.files['camera-power-planner.json']);
  if (!gist) return {};
  const file = gist.files['camera-power-planner.json'];
  const dataResp = await nodeFetch(file.raw_url, { headers: { Authorization: `token ${accessToken}` } });
  return await dataResp.json();
}

async function saveData(accessToken, data) {
  const resp = await nodeFetch('https://api.github.com/gists', {
    headers: { Authorization: `token ${accessToken}` }
  });
  const gists = await resp.json();
  let gist = gists.find(g => g.files && g.files['camera-power-planner.json']);
  if (gist) {
    await nodeFetch(`https://api.github.com/gists/${gist.id}`, {
      method: 'PATCH',
      headers: { Authorization: `token ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: { 'camera-power-planner.json': { content: JSON.stringify(data, null, 2) } } })
    });
  } else {
    await nodeFetch('https://api.github.com/gists', {
      method: 'POST',
      headers: { Authorization: `token ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ public: false, files: { 'camera-power-planner.json': { content: JSON.stringify(data, null, 2) } } })
    });
  }
}

app.get('/api/data', ensureAuth, async (req, res) => {
  try {
    const data = await loadData(req.user.accessToken);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/data', ensureAuth, async (req, res) => {
  try {
    await saveData(req.user.accessToken, req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
