'use strict'

const test = require('ava')
const {compress, decompress} = require('..')

test('basic', async t => {
	const data = {a: 'foo', b: 'bar'}
	const c = await compress(data)
	const d = await decompress(c)
	t.is(c, 'CwiAe2E6ImZvbyIsYjoiYmFyIn0D')
	t.is(JSON.stringify(d), JSON.stringify(data))
})

test('compress invalid', async t => {
	const error = await t.throwsAsync(compress({[Symbol('test')]: undefined}))
	t.is(error.message, 'Cannot stringify POJOs with symbolic keys')
})

test('decompress invalid base64', async t => {
	const error = await t.throwsAsync(decompress('123'))
	t.is(error.message, 'Decompression failed')
})
