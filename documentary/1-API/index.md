## API

The package is available by importing its default function:

```js
import render from '@depack/render'
```

%~%

<include-typedefs>@externs/preact</include-typedefs>

<typedef name="render">types/api.xml</typedef>

<typedef>types/index.xml</typedef>

%EXAMPLE: example, ../src => @depack/render%
%FORK-html example%

%~%

## **Pretty Render**

Unlike the original _Preact/render-to-string_, the new rendering algorithm does not break up attributes to have each its own line, so that it is easier to present on the documentation.

%EXAMPLE: example/pretty, ../src => @depack/render%
%FORK-html example/pretty%

%~%