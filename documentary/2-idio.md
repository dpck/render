## **Server-Side Rendering**

Using _Depack/Render_ for SSR is very easy with the [ÀLaMode](https://github.com/a-la/alamode) transpiler of the source code. It is installed as a require hook in the entry point of the app:

%EXAMPLE: example/app.js%

_And the server is configured:_

%EXAMPLE: example/server.jsx, ../src => @depack/render%
%FORK-html example example/app%

There are some limitation such as

* no `>` or `<` in expressions or comments, e.g., `for (let i=0; i<10; i++) { ... }` &mdash; the function needs to be taken out of JSX scope. This is due to how the parser finds closing `>` tags: the number of opening to closing `>` must be equal.

%~%