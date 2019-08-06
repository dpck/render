const _render = require('./render')

/**
 * Render Preact JSX Components to an HTML string.
 * @param {preact.VNode} vnode Virtual DOM Node.
 * @param {string|function(new: preact.Component)|Function} vnode.nodeName The string of the DOM node to create or Component constructor to render.
 * @param {!Array<preact.VNode|string|boolean|number|undefined>} vnode.children The children of node. Can be scalar values (string, number, boolean, null, undefined, etc), more Virtual DOM elements, or infinitely nested arrays of the above.
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
 * @param {boolean} [config.shallowHighOrder=false] When shallow rendering is on, will render root component. Default `false`.
 * @param {boolean} [config.sortAttributes=false] Sort attributes' keys using the `.sort` method. Default `false`.
 * @param {boolean} [config.allAttributes=false] Render all attributes, including `key` and `ref`. Default `false`.
 */
function render(vnode, config) {
  return _render(vnode, config)
}

module.exports = render

/* typal types/index.xml namespace */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_depack.RenderConfig} RenderConfig `＠record` Rendering options.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _depack.RenderConfig `＠record` Rendering options.
 * @prop {boolean} [addDoctype=false] Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @prop {boolean} [shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @prop {boolean} [xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @prop {boolean} [pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @prop {number} [lineLength=40] The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @prop {boolean} [closeVoidTags=false] Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @prop {boolean} [renderRootComponent=false] When shallow rendering is on, will render root component. Default `false`.
 * @prop {boolean} [shallowHighOrder=false] When shallow rendering is on, will render root component. Default `false`.
 * @prop {boolean} [sortAttributes=false] Sort attributes' keys using the `.sort` method. Default `false`.
 * @prop {boolean} [allAttributes=false] Render all attributes, including `key` and `ref`. Default `false`.
 */

/* typal node_modules/@externs/preact/types/vnode.xml  namespace */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {preact.VNode} VNode `＠interface` Virtual DOM Node.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} preact.VNode `＠interface` Virtual DOM Node.
 * @prop {string|function(new: preact.Component)|Function} nodeName The string of the DOM node to create or Component constructor to render.
 * @prop {!Array<preact.VNode|string|boolean|number|undefined>} children The children of node. Can be scalar values (string, number, boolean, null, undefined, etc), more Virtual DOM elements, or infinitely nested arrays of the above.
 * @prop {string|number} [key] The key used to identify this VNode in a list.
 * @prop {Object} attributes The properties of this VNode.
 */

/* typal node_modules/@externs/preact/types/component.xml namespace */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {preact.Component} Component `＠constructor` Preact component.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} preact.Component `＠constructor` Preact component.
 * @prop {boolean} [_disable] Turns off stateful re-rendering.
 * @prop {boolean} [__x] An alias for `_disable`.
 * @prop {!Object} context The context.
 * @prop {!Object} props The properties.
 * @prop {!Object} state The state.
 * @prop {function(!Object,function(): void=): void} setState
 * @prop {function(function(): void=): void} forceUpdate
 * @prop {function(!Object=,!Object=,!Object=): preact.VNode} render
 * @prop {function(): void} componentWillMount
 * @prop {function(): void} componentDidMount
 * @prop {function(): void} componentWillUnmount
 * @prop {function(): !Object} getChildContext
 * @prop {function(!Object=,!Object=): void} componentWillReceiveProps
 * @prop {function(!Object=,!Object=,!Object=): boolean} shouldComponentUpdate
 * @prop {function(!Object=,!Object=,!Object=): void} componentWillUpdate
 * @prop {function(!Object=,!Object=,!Object=): void} componentDidUpdate
 */
