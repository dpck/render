import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import render from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await render({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
