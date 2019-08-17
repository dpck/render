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
 * Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.addDoctype
/**
 * If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.shallow
/**
 * If `true`, uses self-closing tags for elements without children. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.xml
/**
 * If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.pretty
/**
 * The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @type {number|undefined}
 */
_depack.RenderConfig.prototype.lineLength
/**
 * The initial padding to apply to each line when pretty printing. Default `0`.
 * @type {number|undefined}
 */
_depack.RenderConfig.prototype.initialPadding
/**
 * Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.closeVoidTags
/**
 * When shallow rendering is on, will render root component. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.renderRootComponent
/**
 * When shallow rendering is on, will render root component. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.shallowHighOrder
/**
 * Sort attributes' keys using the `.sort` method. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.sortAttributes
/**
 * Render all attributes, including `key` and `ref`. Default `false`.
 * @type {boolean|undefined}
 */
_depack.RenderConfig.prototype.allAttributes

/* manual */
// /** @type {{ class: string, for: string, srcset: string }} */
/** @type {{ dangerouslySetInnerHTML: {__html: string}, class: string }} */
_depack.PreactAttributes