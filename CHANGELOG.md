## 26 February 2020

### [1.3.5](https://github.com/dpck/render/compare/v1.3.4...v1.3.5)

- [deps] Update dependencies.

## 9 December 2019

### [1.3.4](https://github.com/dpck/render/compare/v1.3.3...v1.3.4)

- [fix] Fix `child.nodeName` bug.

## 18 September 2019

### [1.3.3](https://github.com/dpck/render/compare/v1.3.2...v1.3.3)

- [fix] Correct indentation of inline tags.

## 17 August 2019

### [1.3.2](https://github.com/dpck/render/compare/v1.3.1...v1.3.2)

- [fix] No pretty for dangerouslySetInnerHtml in pre and textarea.

### [1.3.1](https://github.com/dpck/render/compare/v1.3.0...v1.3.1)

- [feature] Add initial padding features.
- [fix] Don't add whitespace for inline elements (before closing, todo: after opening).

## 7 August 2019

### [1.3.0](https://github.com/dpck/render/compare/v1.2.1...v1.3.0)

- [feature] Compile with [_Depack_](https://compiler.page).
- [feature] Use the `value` on _<select>_ elements to select an option.

## 24 July 2019

### [1.2.1](https://github.com/dpck/render/compare/v1.2.0...v1.2.1)

- [fix] Don't indent text inside of tags with `__html` with pretty=false.

## 13 June 2019

### [1.2.0](https://github.com/dpck/render/compare/v1.1.4...v1.2.0)

- [feature] Configure whether to close void tags.
- [fix] Rename `srcSet` to `src`.

## 6 February 2019

### 1.1.4

- [deps] Up deps (for boolean attributes in JSX@1.4.4)
- [docs] Fix missing SSR html output.

## 19 February 2019

### 1.1.3

- [fix] Render `htmlFor` into `for`.

## 17 February 2019

### 1.1.2

- [doc] Correct JSDoc for `RenderConfig`.

### 1.1.1

- [doc] Publish types directory and JSDoc VNode.
- [test] Start using _Depack/Context_.

### 1.1.0

- [doc] Document Server-Side-Rendering.
- [feature] Pass `addDoctype` to automatically add `<!doctype hml>` to the output.

## 16 February 2019

### 1.0.0

- [feature] Add rendering and pretty rendering, and create documentation with examples.

## 15 February 2019

### 0.0.0

- Create `@depack/render` with [`mnp`][https://mnpjs.org]
- [repository]: `src`, `test`
