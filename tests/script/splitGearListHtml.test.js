const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('splitGearListHtml', () => {
  let cleanup;

  beforeEach(() => {
    ({ cleanup } = setupScriptEnvironment({ readyState: 'loading' }));
  });

  afterEach(() => {
    cleanup();
  });

  test('returns empty markup when provided falsy html', () => {
    expect(global.splitGearListHtml('')).toEqual({ projectHtml: '', gearHtml: '' });
    expect(global.splitGearListHtml(null)).toEqual({ projectHtml: '', gearHtml: '' });
  });

  test('honours legacy object storage with project and gear markup', () => {
    const legacyObject = {
      projectHtml: '<section id="project">Stored project</section>',
      gearHtml: '<section id="gear">Stored gear</section>'
    };
    expect(global.splitGearListHtml(legacyObject)).toEqual(legacyObject);

    const legacyGearList = {
      gearList: '<div id="saved">Combined legacy markup</div>'
    };
    expect(global.splitGearListHtml(legacyGearList).gearHtml).toContain('Combined legacy markup');
  });

  test('extracts the gear table that follows the Gear List heading', () => {
    const legacyHtml = `
      <h2 data-project-name="Offsite Prep">Project Overview and Gear List</h2>
      <h3>Project Requirements</h3>
      <div class="requirements-grid"><div class="requirement-box">Codec: ARRIRAW</div></div>
      <table id="requirements"><tr><td>Ignore me</td></tr></table>
      <h3>Gear List</h3>
      <table id="gear"><tr><td>Main Kit Item</td></tr></table>
      <table id="extra"><tr><td>Spare table</td></tr></table>
    `;
    const { projectHtml, gearHtml } = global.splitGearListHtml(legacyHtml);

    expect(projectHtml).toContain('requirements-grid');
    expect(projectHtml).toContain('Codec: ARRIRAW');
    expect(gearHtml).toContain('Gear List: “Offsite Prep”');
    expect(gearHtml).toContain('id="gear"');
    expect(gearHtml).not.toContain('id="requirements"');
  });

  test('wraps category rows into tbody groups when missing grouping markup', () => {
    const legacyHtml = `
      <h2>Project Overview for "Night Shoot"</h2>
      <h3>Gear List</h3>
      <table>
        <tr class="category-row"><td>Camera</td></tr>
        <tr><td>Alexa 35 Body</td></tr>
        <tr class="category-row"><td>Power</td></tr>
        <tr><td>Battery Kit</td></tr>
      </table>
    `;
    const { gearHtml } = global.splitGearListHtml(legacyHtml);
    const doc = new DOMParser().parseFromString(`<div>${gearHtml}</div>`, 'text/html');
    const table = doc.querySelector('table');
    const groups = table ? Array.from(table.querySelectorAll('tbody.category-group')) : [];

    expect(groups).toHaveLength(2);
    const firstGroupRows = groups[0] ? Array.from(groups[0].querySelectorAll('tr')) : [];
    const secondGroupRows = groups[1] ? Array.from(groups[1].querySelectorAll('tr')) : [];
    expect(firstGroupRows[0].classList.contains('category-row')).toBe(true);
    expect(firstGroupRows[0].textContent).toContain('Camera');
    expect(firstGroupRows[1].textContent).toContain('Alexa 35 Body');
    expect(secondGroupRows[0].textContent).toContain('Power');
    expect(secondGroupRows[1].textContent).toContain('Battery Kit');
  });

  test('derives project name from data attribute when overview heading is generic', () => {
    const legacyHtml = `
      <h2 data-project-name="Steadicam Prep">Project Overview and Gear List</h2>
      <h3>Gear List</h3>
      <table class="gear-table"><tr><td>Legacy Item</td></tr></table>
    `;
    const { gearHtml } = global.splitGearListHtml(legacyHtml);
    expect(gearHtml).toContain('Gear List: “Steadicam Prep”');
  });

  test('falls back to stored markup when no table is present and strips overview chrome', () => {
    const legacyHtml = `
      <h2>Project One</h2>
      <h3>Project Requirements</h3>
      <div class="requirements-grid"><div class="requirement-box">Codec: ProRes</div></div>
      <h3>Gear List</h3>
      <p>Legacy summary</p>
      <ul><li>Legacy Item</li></ul>
    `;
    const { projectHtml, gearHtml } = global.splitGearListHtml(legacyHtml);

    expect(projectHtml).toContain('requirements-grid');
    expect(gearHtml).toContain('Legacy summary');
    expect(gearHtml).toContain('<ul>');
    expect(gearHtml).toContain('Legacy Item');
    expect(gearHtml).not.toContain('<h2>Project One</h2>');
    expect(gearHtml).not.toContain('Project Requirements');
  });

  test('derives project name from overview heading with embedded quotes', () => {
    const legacyHtml = `
      <h2>Project Overview for “Mini LF New old”</h2>
      <h3>Gear List</h3>
      <table class="gear-table"><tr><td>Legacy Item</td></tr></table>
    `;
    const { gearHtml } = global.splitGearListHtml(legacyHtml);
    expect(gearHtml).toContain('Gear List: “Mini LF New old”');
  });
});
