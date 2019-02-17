import { makeTestSuite } from 'zoroaster'
import JSXContext from '@depack/context'
import render from '../../src'

export default makeTestSuite('test/result/index.html', {
  /**
   * @param {string} input
   * @param {JSXContext} c
   */
  getResults(input, { getVNode }) {
    const test = getVNode(input)
    const res = render(test)
    return res
  },
  context: [JSXContext],
})

export const pretty = makeTestSuite('test/result/pretty.html', {
  /**
   * @param {string} input
   * @param {JSXContext} c
   */
  getResults(input, { getVNode }) {
    const test = getVNode(input)
    const res = render(test, { pretty: true })
    return res
  },
  context: [JSXContext],
})
