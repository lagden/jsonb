import test from 'ava'
import {compress, decompress} from '../src/jsonb.js'

test('basic', async t => {
	const data = {a: 'foo', b: 'bar'}
	const c = await compress(data)
	const d = await decompress(c)
	t.is(c, 'Cw2AW3siYSI6MSwiYiI6Mn0sImZvbyIsImJhciJdAw==')
	t.is(JSON.stringify(d), JSON.stringify(data))
})

test('any data and buffer', async t => {
	const data = 'Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Manduma pindureta quium dia nois paga. Per aumento de cachacis, eu reclamis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Manduma pindureta quium dia nois paga. Per aumento de cachacis, eu reclamis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Manduma pindureta quium dia nois paga. Per aumento de cachacis, eu reclamis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Manduma pindureta quium dia nois paga. Per aumento de cachacis, eu reclamis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Manduma pindureta quium dia nois paga. Per aumento de cachacis, eu reclamis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.'
	const bc = await compress(data, {base64: false})
	const d = await decompress(bc)
	t.true(Buffer.byteLength(bc) < Buffer.byteLength(data, 'utf8'))
	t.true(Buffer.byteLength(d, 'utf8') === Buffer.byteLength(data, 'utf8'))
})

test('compress invalid', async t => {
	const error = await t.throwsAsync(compress({[Symbol('test')]: undefined}))
	t.is(error.message, 'Cannot stringify POJOs with symbolic keys')
})

test('decompress invalid base64', async t => {
	const error = await t.throwsAsync(decompress('123'))
	t.is(error.message, 'Decompression failed')
})
