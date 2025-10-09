const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

describe('gear list data integrity', () => {
  it('rejects duplicate property keys in lens definitions', () => {
    const sourcePath = path.join(__dirname, '..', '..', 'src', 'data', 'devices', 'gearList.js');
    const source = fs.readFileSync(sourcePath, 'utf8');
    const ast = parser.parse(source, {
      sourceType: 'script',
      allowReturnOutsideFunction: true
    });

    const duplicates = [];

    const visitObject = (node, breadcrumb) => {
      if (!node || node.type !== 'ObjectExpression') {
        return;
      }

      const seen = new Map();

      node.properties.forEach((prop) => {
        if (prop.type !== 'ObjectProperty' || prop.computed) {
          return;
        }

        let keyName;
        if (prop.key.type === 'Identifier') {
          keyName = prop.key.name;
        } else if (prop.key.type === 'StringLiteral') {
          keyName = prop.key.value;
        } else if (prop.key.type === 'NumericLiteral') {
          keyName = String(prop.key.value);
        } else {
          return;
        }

        if (seen.has(keyName)) {
          const pathLabel = breadcrumb.length ? `${breadcrumb.join(' > ')} > ${keyName}` : keyName;
          duplicates.push(pathLabel);
        } else {
          seen.set(keyName, true);
        }

        if (prop.value && prop.value.type === 'ObjectExpression') {
          visitObject(prop.value, [...breadcrumb, keyName]);
        }
      });
    };

    let gearInitializer = null;

    const walk = (node) => {
      if (!node || typeof node !== 'object') {
        return;
      }

      if (node.type === 'VariableDeclaration') {
        const gearDeclaration = node.declarations.find(
          (decl) => decl.id && decl.id.type === 'Identifier' && decl.id.name === 'gear'
        );

        if (gearDeclaration && gearDeclaration.init) {
          gearInitializer = gearDeclaration.init;
        }
      }

      Object.keys(node).forEach((key) => {
        const value = node[key];

        if (!value || typeof value !== 'object') {
          return;
        }

        if (Array.isArray(value)) {
          value.forEach(walk);
        } else if (value.type) {
          walk(value);
        }
      });
    };

    walk(ast);

    expect(gearInitializer).toBeTruthy();
    visitObject(gearInitializer, []);

    expect(duplicates).toEqual([]);
  });
});
