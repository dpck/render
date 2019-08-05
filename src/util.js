// DOM properties that should NOT have "px" added when numeric
export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

export let encodeEntities = s => `${s}`
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

export let indent = (s, char) => `${s}`.replace(/(\n+)/g, '$1' + (char || '\t'))

export let isLargeString = (s, length = 40, ignoreLines = false) => (`${s}`.length>length || (!ignoreLines && `${s}`.indexOf('\n')!=-1) || `${s}`.indexOf('<')!==-1)

const JS_TO_CSS = {}

/**
 * Convert an Object style to a CSSText string.
 * @param {!Object} s
 */
export function styleObjToCss(s) {
  let str = ''
  for (let prop in s) {
    let val = s[prop]
    if (val!=null) {
      if (str) str += ' '
      // str += jsToCss(prop);
      str += JS_TO_CSS[prop] || (JS_TO_CSS[prop] = prop.replace(/([A-Z])/g,'-$1').toLowerCase())
      str += ': '
      str += val
      if (typeof val=='number' && IS_NON_DIMENSIONAL.test(prop)===false) {
        str += 'px'
      }
      str += ';'
    }
  }
  return str || undefined
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {!preact.VNode} vnode The VNode to get props for
 */
export function getNodeProps(vnode) {
  const props = {
    ...vnode.attributes, children: vnode.children,
  }

  let defaultProps = vnode.nodeName.defaultProps
  if (defaultProps!==undefined) {
    for (let i in defaultProps) {
      if (props[i]===undefined) {
        props[i] = defaultProps[i]
      }
    }
  }

  return props
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').VNode} preact.VNode
 */