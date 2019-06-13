import { encodeEntities, styleObjToCss } from '../util'

/**
 * Maps attributes to `name="value"` strings, and returns html if dangerouslySetInnerHTML is given.
 */
export const mapAttributes = (attributes, {
  allAttributes, xml, isSvgMode, sort,
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
      return `${name}="${encodeEntities(v)}"`
    }
  }).filter(Boolean)
  return { mappedAttributes: a, html }
}