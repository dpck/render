import { makeTestSuite } from 'zoroaster'
import jsx from '@a-la/jsx'
import { runInNewContext } from 'vm'
import { h as preact } from 'preact'
// import Context from '../context'
import render from '../../src'

const getVNode = (input) => {
  const sandbox = { require, h: preact }
  runInNewContext(`test = ${jsx(input)}`, sandbox)
  const { test } = sandbox
  return test
}

export default makeTestSuite('test/result/index.html', {
  getResults(input) {
    const test = getVNode(input)
    const res = render(test)
    return res
  },
})

export const pretty = makeTestSuite('test/result/pretty.html', {
  getResults(input) {
    const test = getVNode(input)
    const res = render(test, undefined, { pretty: true })
    return res
  },
})
