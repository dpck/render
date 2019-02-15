import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import render from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof render, 'function')
  },
}

export default T