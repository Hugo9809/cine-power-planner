const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

function findBackupFallbackArray(ast) {
  let result = null;

  const visit = node => {
    if (!node || typeof node !== 'object' || result) {
      return;
    }

    if (
      node.type === 'VariableDeclarator' &&
      node.id &&
      node.id.type === 'Identifier' &&
      node.id.name === 'backupFallbackLoaders'
    ) {
      result = node.init || null;
      return;
    }

    Object.keys(node).forEach(key => {
      const value = node[key];
      if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (value && typeof value === 'object') {
        visit(value);
      }
    });
  };

  visit(ast);
  return result;
}

function getObjectPropertyValue(node, propertyName) {
  if (!node || node.type !== 'ObjectExpression') {
    return null;
  }

  const property = node.properties.find(prop => {
    if (prop.type !== 'ObjectProperty' || prop.computed) {
      return false;
    }
    if (prop.key.type === 'Identifier') {
      return prop.key.name === propertyName;
    }
    if (prop.key.type === 'StringLiteral') {
      return prop.key.value === propertyName;
    }
    return false;
  });

  return property ? property.value : null;
}

function unwrapCallExpressionFromArrow(node) {
  if (!node || node.type !== 'ArrowFunctionExpression') {
    return null;
  }
  if (node.body.type === 'CallExpression') {
    return node.body;
  }
  if (node.body.type === 'BlockStatement') {
    const returnStatement = node.body.body.find(statement => statement.type === 'ReturnStatement');
    if (returnStatement && returnStatement.argument && returnStatement.argument.type === 'CallExpression') {
      return returnStatement.argument;
    }
  }
  return null;
}

describe('app session backup configuration', () => {
  test('backup fallbacks include monitor defaults loader', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../../src/scripts/app-session.js'),
      'utf8',
    );
    const ast = parser.parse(source, { sourceType: 'script', allowReturnOutsideFunction: true });
    const fallbackArray = findBackupFallbackArray(ast.program);
    expect(fallbackArray).not.toBeNull();
    expect(fallbackArray.type).toBe('ArrayExpression');

    const monitorEntry = fallbackArray.elements.find(element => {
      if (!element || element.type !== 'ObjectExpression') {
        return false;
      }
      const keyNode = getObjectPropertyValue(element, 'key');
      return keyNode && keyNode.type === 'StringLiteral' && keyNode.value === 'autoGearMonitorDefaults';
    });

    expect(monitorEntry).toBeDefined();

    const loaderNameNode = getObjectPropertyValue(monitorEntry, 'loaderName');
    expect(loaderNameNode).toBeDefined();
    expect(loaderNameNode.type).toBe('StringLiteral');
    expect(loaderNameNode.value).toBe('loadAutoGearMonitorDefaults');

    const isValidNode = getObjectPropertyValue(monitorEntry, 'isValid');
    expect(isValidNode).toBeDefined();
    expect(isValidNode.type).toBe('ArrowFunctionExpression');

    const isValidCall = unwrapCallExpressionFromArrow(isValidNode);
    expect(isValidCall).not.toBeNull();
    expect(isValidCall.callee.type).toBe('Identifier');
    expect(isValidCall.callee.name).toBe('isPlainObject');
    expect(isValidCall.arguments).toHaveLength(1);
    expect(isValidCall.arguments[0].type).toBe('Identifier');
    expect(isValidCall.arguments[0].name).toBe('value');
  });
});
