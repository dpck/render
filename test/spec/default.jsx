import { equal, deepEqual } from '@zoroaster/assert'
import Context from '../context'
import render from '../../src'
import { mapAttributes } from '../../src/lib'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof mapAttributes, 'function')
  },
  'gives results'() {
    const res = mapAttributes({
      attr1: 'test',
      attrs: '',
    })
    deepEqual(res, {
      mappedAttributes: [ 'attr1="test"', 'attrs' ],
      html: undefined })
  },
  'adds doctype'() {
    const res = render(<div />, {
      addDoctype: true,
    })
    equal(res, '<!doctype html><div></div>')
  },
  'adds pretty doctype'() {
    const res = render(<div />, {
      addDoctype: true,
      pretty: true,
    })
    equal(res, `<!doctype html>
<div></div>`)
  },
}

export default T