import { encodeEntities, styleObjToCss } from '../util'

/**
 * Maps attributes to `name="value"` strings, and returns html if dangerouslySetInnerHTML is given.
 * @param {!Object<string, ?>} attributes
 * @param {string} nodeName
 * @param {Object} [props]
 * @param {boolean} [props.allAttributes=false]
 * @param {boolean} [props.xml=false]
 * @param {boolean} [props.isSvgMode=false]
 * @param {boolean} [props.sort=false]
 */
export const mapAttributes = (attributes, nodeName, {
  allAttributes, xml, isSvgMode, sort, selectValue,
} = {}) => {
  let html
  const attrs = Object.keys(attributes)
  if (sort) attrs.sort()
  const a = attrs.map((name) => {
    let v = attributes[name]
    if (name == 'children') return
    if (name.match(/[\s\n\\/='"\0<>]/)) return
    if (!allAttributes && ['key', 'ref'].includes(name)) return
    if (name == 'className') {
      if (attributes.class) return // class takes precedence
      name = 'class'
    } else if (name == 'htmlFor') {
      if (attributes.for) return // class takes precedence
      name = 'for'
    } else if (name == 'srcSet') {
      if (attributes.srcset) return // srcset takes precedence
      name = 'srcset'
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
      let s = ''
      if (name == 'value') {
        if (nodeName == 'select') {
          selectValue = v
          return
        } else if (nodeName == 'option' && selectValue == v) {
          s = 'selected '
        }
      }
      return `${s}${name}="${encodeEntities(v)}"`
    }
  }).filter(Boolean)
  return { mappedAttributes: a, html, selectValue }
}

export const inlineElements = [
  'a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br',
  'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del',
  'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins',
  'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object',
  'output', 'picture', 'progress', 'q', 'ruby', 's', 'samp',
  'slot', 'small', 'span', 'strong', 'sub',
  'sup', 'svg', 'template', 'textarea', 'time', 'u', 'tt', 'var',
  'video', 'wbr',
]