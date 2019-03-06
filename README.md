# @depack/render

[![npm version](https://badge.fury.io/js/%40depack%2Frender.svg)](https://npmjs.org/package/@depack/render)

`@depack/render` is Renders JSX To String. This is a fork of [developit/preact-render-to-string](https://github.com/developit/preact-render-to-string/) with the new pretty algorithm that breaks up attributes by the line length rather than printing them on each line. It also removes dependency on the Facebook's package called "pretty-format" for JSX printing that cannot be in _Depack_ because of the whole idea of _Preact_ to be different from Facebook, so the `/jsx` is currently not implemented. The additional functionality of this package is also to correctly handle pretty printing for `textarea` and `pre` tags which are sensitive to the leading and forwarding whitespace.

```sh
yarn add -E @depack/render
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`render(vnode: VNode, config?: RenderConfig, context?: *): string`](#rendervnode-vnodeconfig-renderconfigcontext--string)
  * [`RenderConfig`](#type-renderconfig)
- [**Pretty Render**](#pretty-render)
- [**Server-Side Rendering**](#server-side-rendering)
- [Fork Improvements](#fork-improvements)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import render from '@depack/render'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `render(`<br/>&nbsp;&nbsp;`vnode: VNode,`<br/>&nbsp;&nbsp;`config?: RenderConfig,`<br/>&nbsp;&nbsp;`context?: *,`<br/>`): string`

Renders the _VNode_ into the string.

`import('preact').VNode` __<a name="type-vnode">`VNode`</a>__

__<a name="type-renderconfig">`RenderConfig`</a>__: Rendering options.

|    Name    |   Type    |                                                    Description                                                    | Default |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| addDoctype | _boolean_ | Adds the `<!doctype html>` at the beginning of the return string.                                                 | `false` |
| shallow    | _boolean_ | If `true`, renders nested Components as HTML elements (`<Foo a="b" />`).                                          | `false` |
| xml        | _boolean_ | If `true`, uses self-closing tags for elements without children.                                                  | `false` |
| pretty     | _boolean_ | If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. | `false` |
| lineLength | _number_  | The number of characters on one line above which the line should be split in the `pretty` mode.                   | `40`    |

```jsx
/* yarn example/ */
import render from '@depack/render'

const App = () => (
  <div className="hello">
    <span id="name"></span>
  </div>
)
const s = render(<App />)
console.log(s)
```
```html
<div class="hello"><span id="name"></span></div>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## **Pretty Render**

Unlike the original _Preact/render-to-string_, the new rendering algorithm does not break up attributes to have each its own line, so that it is easier to present on the documentation.

```jsx
import render from '@depack/render'

const App = () => (
  <div className="hello" data-example data-example-2="on9384636" id="Main-true-than-ever">
    Welcome to the website. Here you can find
information regarding different topics.
    <span id="name">This is your name</span>
    <select>
      <option value="pretty">Option One For You To Choose.</option>
      <option value="string">
        Another Option For The Choosing.
      </option>
    </select>
  </div>
)
const s = render(<App />, {
  pretty: true,
  lineLength: 40,
})
console.log(s)
```
```html
<div class="hello" data-example
  data-example-2="on9384636" id="Main-true-than-ever">
  Welcome to the website. Here you can find
  information regarding different topics.
  <span id="name">This is your name</span>
  <select>
    <option value="pretty">
      Option One For You To Choose.
    </option>
    <option value="string">
      Another Option For The Choosing.
    </option>
  </select>
</div>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## **Server-Side Rendering**

Using _Depack/Render_ for SSR is very easy with the [ÀLaMode](https://github.com/a-la/alamode) transpiler of the source code. It is installed as a require hook in the entry point of the app:

```js
require('alamode')()
require('./server')
```

_And the server is configured:_

```jsx
import idio from '@idio/core'
import render from '@depack/render'

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
```
```html
<!doctype html>
<html>
  <head>
    <title>Example Depack/Render</title>
    <style>
      body {
              background: lightblue;
            }
    </style>
  </head>
  <body>
    <h1>Welcome to the Server-Side-Rendering</h1>
    Hello, Example
    <a href="https://dpck.artd.eco">
      https://dpck.artd.eco
    </a>
  </body>
</html>
```

There are some limitation such as

* no `>` or `<` in expressions or comments, e.g., `for (let i=0; i<10; i++) { ... }` &mdash; the function needs to be taken out of JSX scope. This is due to how the parser finds closing `>` tags: the number of opening to closing `>` must be equal.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## Fork Improvements

There are a number of new features that the fork has:

* Render `htmlFor` into plain `for` attribute.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>
      © <a href="https://artd.eco">Art Deco</a> for <a href="https://artd.eco/depack">Depack</a>
      2019
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>
    </th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>