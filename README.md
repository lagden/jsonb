# jsonb

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/jsonb.svg
[npm]:             https://www.npmjs.com/package/@tadashi/jsonb
[ci-img]:          https://github.com/lagden/jsonb/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/jsonb/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/jsonb/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/jsonb?branch=master


-----

Compress or decompress any data

## Install

```
$ npm i -S @tadashi/jsonb
```


## Usage

```js
import {compress, decompress} from '@tadashi/jsonb'

const c = await compress({a: 'foo', b: 'bar'})
// => Cw2AW3siYSI6MSwiYiI6Mn0sImZvbyIsImJhciJdAw==

const d = await decompress(c)
// => {a: 'foo', b: 'bar'}
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
