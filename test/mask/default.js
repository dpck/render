import makeTestSuite from '@zoroaster/mask'
import JSXContext from '@depack/context'
import render from '../../src'

export default makeTestSuite('test/result/index.html', {
  /**
   * @param {JSXContext} c
   */
  getResults({ getVNode }) {
    const test = getVNode(this.input)
    const res = render(test)
    return res
  },
  context: JSXContext,
})

export const Render = makeTestSuite('test/result/render', {
  /**
   * @param {JSXContext} c
   */
  getResults({ getVNode }) {
    const test = getVNode(this.input)
    const res = render(test)
    return res
  },
  context: JSXContext,
})

export const pretty = makeTestSuite('test/result/pretty.html', {
  /**
   * @param {JSXContext} c
   */
  getResults({ getVNode }) {
    const test = getVNode(this.input)
    const res = render(test, { pretty: true, ...(this.options || {}) })
    return res
  },
  context: JSXContext,
  jsProps: ['options'],
})
