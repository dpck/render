import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import render from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof render, 'function')
  },
  async 'calls package without error'() {
    await render()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await render({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T