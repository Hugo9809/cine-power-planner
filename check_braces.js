const fs = require('fs');
const filePath = process.argv[2];
const content = fs.readFileSync(filePath, 'utf8');

let balance = 0;
let line = 1;
let col = 0;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '\n') {
        line++;
        col = 0;
    } else {
        col++;
    }

    if (char === '{') {
        balance++;
    } else if (char === '}') {
        balance--;
        if (balance < 0) {
            console.log(`Extra closing brace at line ${line}, col ${col}`);
            process.exit(1);
        }
    }
}

if (balance !== 0) {
    console.log(`Unbalanced braces: ${balance} (positive means missing closing braces)`);
    process.exit(1);
} else {
    console.log('Braces are balanced.');
}
