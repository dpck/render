const _render = require('./render')

/**
 * Render Preact JSX Components to an HTML string.
 * @param {preact.VNode} vnode Virtual DOM Node.
 * @param {string|preact._Component} vnode.nodeName The string of the DOM node to create or Component constructor to render.
 * @param {!Array<!preact.VNode|string>} vnode.children The children of node.
 * @param {string|number} [vnode.key] The key used to identify this VNode in a list.
 * @param {Object} vnode.attributes The properties of this VNode.
 * @param {_depack.RenderConfig} [config] Rendering options.
 * @param {boolean} [config.addDoctype=false] Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @param {boolean} [config.shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @param {boolean} [config.xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @param {boolean} [config.pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @param {number} [config.lineLength=40] The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @param {boolean} [config.closeVoidTags=false] Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @param {boolean} [config.renderRootComponent=false] When shallow rendering is on, will render root component. Default `false`.
 */
function render(vnode, config) {
  return _render(vnode, config)
}

module.exports = render

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_depack.RenderConfig} RenderConfig `＠record` Rendering options.
 */
/**
 * @typedef {Object} _depack.RenderConfig `＠record` Rendering options.
 * @prop {boolean} [addDoctype=false] Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @prop {boolean} [shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @prop {boolean} [xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @prop {boolean} [pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @prop {number} [lineLength=40] The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @prop {boolean} [closeVoidTags=false] Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @prop {boolean} [renderRootComponent=false] When shallow rendering is on, will render root component. Default `false`.
 */

/* typal node_modules/@externs/preact/types/vnode.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {preact._Component} _Component `＠interface` A component that extends preact.Component to set default properties. https://git.io/fjHoZ
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} preact._Component `＠interface` A component that extends preact.Component to set default properties. https://git.io/fjHoZ
 * @prop {!Object} defaultProps The properties that will be assigned on the component by _Preact_ when constructing it.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {preact.VNode} VNode `＠constructor` Virtual DOM Node.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} preact.VNode `＠constructor` Virtual DOM Node.
 * @prop {string|preact._Component} nodeName The string of the DOM node to create or Component constructor to render.
 * @prop {!Array<!preact.VNode|string>} children The children of node.
 * @prop {string|number} [key] The key used to identify this VNode in a list.
 * @prop {Object} attributes The properties of this VNode.
 */
