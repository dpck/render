import { encodeEntities, indent, isLargeString, getNodeProps } from './util'
import { mapAttributes, inlineElements } from './lib'

// components without names, kept as a hash for later comparison to return consistent UnnamedComponentXX names.
const UNNAMED = []

const VOID_ELEMENTS = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/
const INLINE_ELEMENTS = new RegExp(`^(${inlineElements.join('|')})$`)

/** Only render elements, leaving Components inline as `<ComponentName ... />`.
 * This method is just a convenience alias for `render(vnode, context, { shallow:true })`
 * @param {preact.VNode} vnode JSX VNode to render.
 * @param {!Object} [context]  Optionally pass an initial context object through the render path.
 */
const shallowRender = (vnode, context) => renderToString(vnode, { shallow: true }, context)

// const prettyAttributeHook = (name, value, context, opts) => {
//   let indentChar = typeof opts.pretty=='string' ? opts.pretty : '  '
//   return `\n${indentChar}${name}="${encodeEntities(value)}"`
// }

/**
 * Render Preact JSX Components to an HTML string.
 * @param {preact.VNode} vnode JSX VNode to render.
 * @param {!_depack.RenderConfig} [config] Rendering options.
 */
const render = (vnode, config = {}, context = {}) => {
  const { addDoctype, pretty } = config
  const res = renderToString(vnode, config, context)
  if (addDoctype) return `<!doctype html>${pretty ? '\n': ''}${res}`
  return res
}

/** Render Preact JSX + Components to an HTML string.
 * @param {preact.VNode|boolean|number|string|undefined} vnode
 * @param {!_depack.RenderConfig} [opts]
 * @param {!Object} [context]
 * @param {boolean} [inner]
 * @param {boolean} [isSvgMode]
 * @param {string} [selectValue] Used to set the value of options via select's value `attribute`.
 */
function renderToString(
  vnode, opts = {}, context = {}, inner = false, isSvgMode = false, selectValue,
) {
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
    initialPadding = 0,
    closeVoidTags = false,
  } = opts

  let { lineLength = 40 } = opts
  lineLength -= initialPadding

  let { nodeName, attributes = {} } = vnode

  const noPretty = ['textarea', 'pre'].includes(nodeName)
  const ip = ' '.repeat(initialPadding)

  const indentChar = typeof pretty == 'string' ? pretty :
    `  ${ip}`

  // #text nodes
  if (typeof vnode!='object' && !nodeName) {
    return encodeEntities(vnode)
  }

  // components
  if (typeof nodeName=='function') {
    // nodeName = /** @type {!Function} */ (nodeName)
    if (shallow && (inner || !renderRootComponent)) {
      nodeName = getComponentName(nodeName)
    }
    else {
      let props = getNodeProps(/** @type {!preact.VNode} */ (vnode)),
        rendered

      if (!nodeName.prototype || typeof nodeName.prototype.render!='function') {
        // stateless functional components
        rendered = nodeName(props, context)
      }
      else {
        // class-based components
        let c = /** @type {!preact.Component} */ (new nodeName(props, context))
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

      return renderToString(rendered, opts, context, shallowHighOrder, isSvgMode, selectValue)
    }
  }

  // render JSX to HTML
  let s = '', html

  let mappedAttributes
  ;({ mappedAttributes, html, selectValue } = mapAttributes(/** @type {!Object} */ (attributes), nodeName, {
    allAttributes, xml, isSvgMode, sort: sortAttributes, selectValue,
  }))

  // account for >1 multiline attribute
  if (pretty) {
    const nl = `<${nodeName}`
    let cl = nl.length
    s = mappedAttributes.reduce((acc, current) => {
      const newLength = cl + 1 + current.length
      if (newLength > lineLength) {
        cl = indentChar.length
        return `${acc}\n${indentChar}${current}`
      }
      cl = newLength
      return `${acc} ${current}`
    }, '')
  } else {
    s = mappedAttributes.length ? ' ' + mappedAttributes.join(' ') : ''
  }

  s = `<${nodeName}${s}>`
  if (`${nodeName}`.match(/[\s\n\\/='"\0<>]/)) throw s

  let isVoid = `${nodeName}`.match(VOID_ELEMENTS)
  if (closeVoidTags) {
    if (isVoid) s = s.replace(/>$/, ' />')
  }

  let pieces = []
  if (html) {
    // if multiline, indent.
    if (!noPretty && pretty && (isLargeString(html) || html.length + getLastLineLength(s) > lineLength)) {
      html = '\n' + indentChar + indent(html, indentChar)
    }
    s += html
  }
  else if (vnode.children) {
    let hasLarge = pretty && s.includes('\n')
    const noPrettyPieces = []
    pieces = vnode.children.map((child, j) => {
      if (child==null || child===false) return
      const childSvgMode = nodeName == 'svg' ? true : nodeName == 'foreignObject' ? false : isSvgMode
      const ret = renderToString(child, opts, context, true, childSvgMode, selectValue)
      if (!ret) return
      if (pretty && ret.length + getLastLineLength(s) > lineLength)
        hasLarge = true
      if (typeof child.nodeName == 'string') {
        const rr = ret.replace(new RegExp(`</${child.nodeName}>$`), '')
        if (isNodeInline(child.nodeName, rr)) noPrettyPieces[j] = ret.length
      }
      return ret
    }).filter(Boolean)

    if (pretty && hasLarge && !noPretty) {
      pieces = pieces.reduce((acc, p, i) => {
        const shouldSkipPretty = noPrettyPieces[i - 1] // length of prev inline
        let currentBlockElement = shouldSkipPretty && /^<([\s\S]+?)>/.exec(p)
        if (currentBlockElement) {
          [, currentBlockElement] = currentBlockElement
          currentBlockElement = !INLINE_ELEMENTS.test(currentBlockElement)
        }
        if (shouldSkipPretty && !currentBlockElement) {
          const re = /[^<]*?(\s)/y
          let rres
          let firstMatch = true
          let lastWs
          while ((rres = re.exec(p)) !== null) {
            const [match] = /** @type {!Iterable}*/ (rres)
            ;([,lastWs] = /** @type {!Iterable}*/ (rres))
            const j = re.lastIndex + match.length - 1
            if (j > lineLength - (firstMatch ? shouldSkipPretty : 0)) {
              const before = p.slice(0, re.lastIndex - 1)
              p = p.slice(re.lastIndex)
              if (firstMatch) {
                acc.push(before)
                firstMatch = false
              } else {
                acc.push('\n' + indentChar + indent(before, indentChar))
              }
              re.lastIndex = 0
            }
          }
          if (lastWs) acc.push(lastWs)
          acc.push(p)
        } else {
          acc.push('\n' + indentChar + indent(p, indentChar))
        }
        return acc
      }, [])
    }
  }

  if (pieces.length) {
    s += pieces.join('')
  }
  else if (xml) {
    return s.substring(0, s.length-1) + ' />'
  }

  if (!isVoid) {
    // inline elements should not have additional whitespace
    // however if there were other tags inside them, that should be fine
    const lastPiece = pieces[pieces.length - 1]
    const isInline = isNodeInline(nodeName, lastPiece)
    if (!isInline && !noPretty && pretty && s.includes('\n')) s += `\n${ip}`
    s += `</${nodeName}>`
  }

  return s
}

const isNodeInline = (nodeName, lastPiece) => {
  return `${nodeName}`.match(INLINE_ELEMENTS) && (lastPiece ? !/>$/.test(lastPiece) : true)
}

/**
 * @param {!Function} component
 */
function getComponentName(component) {
  return component.displayName || component!==Function && component.name || getFallbackComponentName(component)
}

/**
 * @param {!Function} component
 */
function getFallbackComponentName(component) {
  /** @type {string} */
  const str = Function.prototype.toString.call(component)

  let name = (str.match(/^\s*function\s+([^( ]+)/) || '')[1]
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

export default render

export { shallowRender }

const getLastLineLength = (s) => {
  const st = s.split('\n')
  const lastLine = st[st.length - 1]
  return lastLine.length
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').RenderConfig} _depack.RenderConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').VNode} preact.VNode
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Component} preact.Component
 */