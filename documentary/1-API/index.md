## API

The package is available by importing its default function:

```js
import render from '@depack/render'
```

%~%

```## render => string
[
  ["vnode", "VNode"],
  ["opts?", "Config"],
  ["context?", "*"]
]
```

Renders the _VNode_ into the string.

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.jsx, ../src => @depack/render%
%FORK-html example example/example%

%~%

## Pretty Render

Unlike the original _Preact/render-to-string_, the new rendering algorithm does not break up attributes to have each its own line, so that it is easier to present on the documentation.

%EXAMPLE: example/pretty.jsx, ../src => @depack/render%
%FORK-html example example/pretty%

%~%