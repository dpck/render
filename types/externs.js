/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _depack = {}
/**
 * Rendering options.
 * @record
 */
_depack.RenderConfig
/**
 * Adds the `<!doctype html>` at the beginning of the return string.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.addDoctype
/**
 * If `true`, renders nested Components as HTML elements (`<Foo a="b" />`).
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.shallow
/**
 * If `true`, uses self-closing tags for elements without children.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.xml
/**
 * If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.pretty
/**
 * The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @type {number|undefined}
 */
_depack.RenderConfig.prototype.lineLength
/**
 * Whether the void tags will be auto-closed (for xhtml support).
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.closeVoidTags
/**
 * When shallow rendering is on, will render root component.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.renderRootComponent
