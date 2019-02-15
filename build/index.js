const { encodeEntities, indent, isLargeString, styleObjToCss, getNodeProps } = require('./util');

// components without names, kept as a hash for later comparison to return consistent UnnamedComponentXX names.
const UNNAMED = []

const VOID_ELEMENTS = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/

/** Only render elements, leaving Components inline as `<ComponentName ... />`.
 * This method is just a convenience alias for `render(vnode, context, { shallow:true })`
 * @param {VNode} vnode  JSX VNode to render.
 * @param {Object} [context={}]  Optionally pass an initial context object through the render path.
 */
const shallowRender = (vnode, context) => renderToString(vnode, { shallow: true }, context)

// const prettyAttributeHook = (name, value, context, opts) => {
//   let indentChar = typeof opts.pretty=='string' ? opts.pretty : '  '
//   return `\n${indentChar}${name}="${encodeEntities(value)}"`
// }

/** Render Preact JSX + Components to an HTML string.
 * @param {VNode} vnode JSX VNode to render.
 * @param {Object} [context={}] Optionally pass an initial context object through the render path.
 * @param {Config} [opts] Rendering options.
 * @param {boolean} [opts.shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @param {boolean} [opts.xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @param {boolean} [opts.pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 */
function renderToString(vnode, opts = {}, context = {}, inner, isSvgMode) {
  if (vnode==null || typeof vnode=='boolean') {
    return ''
  }

  const {
    pretty = false,
    shallow = false,
    renderRootComponent = false,
    shallowHighOrder = false,
    sortAttributes,
    allAttributes,
    xml,
  } = opts

  let nodeName = vnode.nodeName,
    attributes = vnode.attributes || {}

  const noPretty = ['textarea', 'pre'].includes(nodeName)

  const indentChar = typeof pretty == 'string' ? pretty : '  '

  // #text nodes
  if (typeof vnode!='object' && !nodeName) {
    return encodeEntities(vnode)
  }

  // components
  if (typeof nodeName=='function') {
    if (shallow && (inner || !renderRootComponent)) {
      nodeName = getComponentName(nodeName)
    }
    else {
      let props = getNodeProps(vnode),
        rendered

      if (!nodeName.prototype || typeof nodeName.prototype.render!='function') {
        // stateless functional components
        rendered = nodeName(props, context)
      }
      else {
        // class-based components
        let c = new nodeName(props, context)
        // turn off stateful re-rendering:
        c._disable = c.__x = true
        c.props = props
        c.context = context
        if (nodeName.getDerivedStateFromProps) c.state = {
          ...c.state,
          ...nodeName.getDerivedStateFromProps(c.props, c.state),
        }
        else if (c.componentWillMount) c.componentWillMount()
        rendered = c.render(c.props, c.state, c.context)

        if (c.getChildContext) {
          context = { ...context, ...c.getChildContext() }
        }
      }

      return renderToString(rendered, opts, context, shallowHighOrder)
    }
  }

  // render JSX to HTML
  let s = '', html

  const attrs = Object.keys(attributes)

  // allow sorting lexicographically for more determinism (useful for tests, such as via preact-jsx-chai)
  if (sortAttributes) attrs.sort()

  const a = attrs.map((name) => {
    let v = attributes[name]
    if (name == 'children') return
    if (name.match(/[\s\n\\/='"\0<>]/)) return
    if (!allAttributes && ['key', 'ref'].includes(name)) return
    if (name == 'className') {
      if (attributes.class) return // class takes precedence
      name = 'class'
    }
    if (isSvgMode && name.match(/^xlink:?./)) {
      name = name.toLowerCase().replace(/^xlink:?/, 'xlink:')
    }
    if (name == 'style' && v && typeof v == 'object') {
      v = styleObjToCss(v)
    }
    if (name == 'dangerouslySetInnerHTML') {
      html = v && v.__html // side-effect
    } else if ((v || v===0 || v==='') && typeof v!='function') {
      if (v===true || v==='') {
        v = name
        // in non-xml mode, allow boolean attributes
        if (!xml) return name
      }
      return `${name}="${encodeEntities(v)}"`
    }
  }).filter(Boolean)

  // account for >1 multiline attribute
  if (pretty) {
    const nl = `<${nodeName}`
    let cl = nl.length
    s = a.reduce((acc, current) => {
      const newLength = cl + 1 + current.length
      if (newLength > 80) {
        cl = indentChar.length
        return `${acc}\n${indentChar}${current}`
      }
      cl = newLength
      return `${acc} ${current}`
    }, '')
  } else {
    s = a.length ? ' ' + a.join(' ') : ''
  }

  s = `<${nodeName}${s}>`
  if (`${nodeName}`.match(/[\s\n\\/='"\0<>]/)) throw s

  let isVoid = `${nodeName}`.match(VOID_ELEMENTS)
  if (isVoid) s = s.replace(/>$/, ' />')

  let pieces = []
  if (html) {
    // if multiline, indent.
    if (pretty && isLargeString(html) || html.length + getLastLineLength(s) > 80) {
      html = '\n' + indentChar + indent(html, indentChar)
    }
    s += html
  }
  else if (vnode.children) {
    let hasLarge = pretty && ~s.indexOf('\n')
    pieces = vnode.children.map((child) => {
      if (child==null || child===false) return
      const childSvgMode = nodeName == 'svg' ? true : nodeName == 'foreignObject' ? false : isSvgMode
      const ret = renderToString(child, opts, context, true, childSvgMode)
      if (!ret) return
      if (pretty && ret.length + getLastLineLength(s) > 80)
        hasLarge = true
      return ret
    }).filter(Boolean)

    if (pretty && hasLarge && !noPretty) {
      for (let i=pieces.length; i--;) {
        pieces[i] = '\n' + indentChar + indent(pieces[i], indentChar)
      }
    }
  }

  if (pieces.length) {
    s += pieces.join('')
  }
  else if (xml) {
    return s.substring(0, s.length-1) + ' />'
  }

  if (!isVoid) {
    if (!noPretty && pretty && ~s.indexOf('\n')) s += '\n'
    s += `</${nodeName}>`
  }

  return s
}

function getComponentName(component) {
  return component.displayName || component!==Function && component.name || getFallbackComponentName(component)
}

function getFallbackComponentName(component) {
  let str = Function.prototype.toString.call(component),
    name = (str.match(/^\s*function\s+([^( ]+)/) || '')[1]
  if (!name) {
    // search for an existing indexed name for the given component:
    let index = -1
    for (let i=UNNAMED.length; i--; ) {
      if (UNNAMED[i]===component) {
        index = i
        break
      }
    }
    // not found, create a new indexed name:
    if (index<0) {
      index = UNNAMED.push(component) - 1
    }
    name = `UnnamedComponent${index}`
  }
  return name
}

module.exports=renderToString



const getLastLineLength = (s) => {
  const st = s.split('\n')
  const lastLine = st[st.length - 1]
  return lastLine.length
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Rendering options.
 * @prop {boolean} [shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @prop {boolean} [xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @prop {boolean} [pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 */


module.exports.shallowRender = shallowRender