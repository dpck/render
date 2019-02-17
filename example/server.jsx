import rqt from 'rqt'
/* start example */
import idio from '@idio/core'
import render from '../src'

const Html = ({ name }) => (<html>
  <head>
    <title>Example Depack/Render</title>
    <style>
      {`body {
        background: lightblue;
      }`}
    </style>
  </head>
  <body>
    <h1>Welcome to the Server-Side-Rendering</h1>
    Hello, { name }
    <a href="https://dpck.artd.eco">https://dpck.artd.eco</a>
  </body>
</html>)

const Server = async (name) => {
  const { app, url } = await idio()
  app.use(async (ctx) => {
    ctx.body = render(
      (<Html name={name}/>),
      { addDoctype: true,
        pretty: true,
        lineLength: 40 })
  })
  return { url, app }
}

/* end example */
(async () => {
  const { url, app } = await Server('Example')
  const res = await rqt(url)
  console.error(url)
  console.log(res)
  await app.destroy()
})()