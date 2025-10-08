// This module is loaded dynamically by loader.js to detect support for
// modern JavaScript syntax such as optional chaining and nullish
// coalescing. Browsers that cannot parse this file will trigger the
// loader to fall back to the legacy bundle.

globalThis.__cinePowerOptionalChainingCheck__ = ({ a: { b: 1 } })?.a?.b ?? 2 === 1;

export {};
