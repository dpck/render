/* yarn example/ */
import render from '../src'

(async () => {
  const res = await render({
    text: 'example',
  })
  console.log(res)
})()