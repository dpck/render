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
 * @param {number} [config.initialPadding=0] The initial padding to apply to each line when pretty printing. Default `0`.
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
 * @prop {number} [initialPadding=0] The initial padding to apply to each line when pretty printing. Default `0`.
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
 * @typedef {preact.Component} Component `＠constructor` A base class that is usually subclassed to create stateful _Preact_ components.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} preact.Component `＠constructor` A base class that is usually subclassed to create stateful _Preact_ components.
 * @prop {function(!Object=, !Object=): preact.Component} constructor Constructor method.
 * @prop {boolean} [_disable] Turns off stateful re-rendering.
 * @prop {boolean} [__x] An alias for `_disable`.
 * @prop {!Object} context The context.
 * @prop {!Object} props The properties.
 * @prop {!Object} state The state.
 * @prop {function(!Object,function(): void=)} setState
 * @prop {function(function(): void=)} forceUpdate
 * @prop {function(!Object=,!Object=,!Object=): preact.VNode} render The `render()` function is required for all components. It can inspect the props and state of the component, and should return a _Preact_ element or `null`.
 * @prop {function()} componentWillMount Called before the component gets mounted to the DOM.
 * @prop {function()} componentDidMount Called after the component gets mounted to the DOM.
 * @prop {function()} componentWillUnmount Called prior to removal from the DOM.
 * @prop {function(): !Object} getChildContext
 * @prop {function(!Object=,!Object=)} componentWillReceiveProps Called before new props get accepted.
 * @prop {function(!Object=,!Object=,!Object=): boolean} shouldComponentUpdate Called before `render()`. Should return `false` to skip render.
 * @prop {function(!Object=,!Object=,!Object=)} componentWillUpdate Called before `render()`.
 * @prop {function(!Object=,!Object=,!Object=)} componentDidUpdate Called after `render()`.
 */
