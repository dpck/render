# @depack/render

[![npm version](https://badge.fury.io/js/%40depack%2Frender.svg)](https://npmjs.org/package/@depack/render)

`@depack/render` is Renders JSX To String. This is a fork of [developit/preact-render-to-string](https://github.com/developit/preact-render-to-string/) with the new pretty algorithm that breaks up attributes by the line length rather than printing them on each line. It also removes dependency on the Facebook's package for JSX printing that cannot be in _Preact_, so the `/jsx` is currently not implemented.

```sh
yarn add -E @depack/render
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`render(vnode: VNode, opts?: Conf, context?: *)`](#rendervnode-vnodeopts-confcontext--void)
  * [`Config`](#type-config)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import render from '@depack/render'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `render(`<br/>&nbsp;&nbsp;`vnode: VNode,`<br/>&nbsp;&nbsp;`opts?: Conf,`<br/>&nbsp;&nbsp;`context?: *,`<br/>`): void`

Renders the _VNode_ into the string.

__<a name="type-config">`Config`</a>__: Rendering options.

|    Name    |   Type    |                                                    Description                                                    | Default |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
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
```
<div class="hello"><span id="name"></span></div>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

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