# jsonb

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/jsonb.svg
[npm]:             https://www.npmjs.com/package/@tadashi/jsonb
[ci-img]:          https://travis-ci.org/lagden/jsonb.svg
[ci]:              https://travis-ci.org/lagden/jsonb
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo

-----

Compress or decompress any data

## Install

```
$ npm i -S @tadashi/jsonb
```


## Usage

```js
const {compress, decompress} = require('@tadashi/jsonb');

(async () => {
  const c = await compress({a: 'foo', b: 'bar'})
  // => CwiAe2E6ImZvbyIsYjoiYmFyIn0D

  const d = await decompress(c)
  console.log(d) // => {a: 'foo', b: 'bar'}
})()
```


## License

MIT © [Thiago Lagden](http://lagden.in)
