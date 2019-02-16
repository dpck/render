# @depack/render

%NPM: @depack/render%

`@depack/render` is Renders JSX To String. This is a fork of [developit/preact-render-to-string](https://github.com/developit/preact-render-to-string/) with the new pretty algorithm that breaks up attributes by the line length rather than printing them on each line. It also removes dependency on the Facebook's package called "pretty-format" for JSX printing that cannot be in _Depack_ because of the whole idea of _Preact_ to be different from Facebook, so the `/jsx` is currently not implemented. The additional functionality of this package is also to correctly handle pretty printing for `textarea` and `pre` tags which are sensitive to the leading and forwarding whitespace.

```sh
yarn add -E @depack/render
```

## Table Of Contents

%TOC%

%~%