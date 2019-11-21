'use strict'

import test from 'ava'
import {compress, decompress} from '..'

test('basic', async t => {
	const data = {a: 'foo', b: 'bar'}
	const c = await compress(data)
	const d = await decompress(c)
	t.is(c, 'CwqAeyJhIjoiZm9vIiwiYiI6ImJhciJ9Aw==')
	t.is(JSON.stringify(d), JSON.stringify(data))
})

test('compress invalid', async t => {
	const error = await t.throwsAsync(compress(undefined))
	t.is(error.message, 'Data can\'t be undefined')
})

test('decompress invalid JSON', async t => {
	const error = await t.throwsAsync(decompress('eJwDAAAAAAE='))
	t.is(error.message, 'Decompression failed')
})

test('decompress invalid base64', async t => {
	const error = await t.throwsAsync(decompress('123'))
	t.is(error.message, 'Decompression failed')
})
