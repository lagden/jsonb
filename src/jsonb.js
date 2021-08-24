import {promisify} from 'node:util'
import {brotliCompress, brotliDecompress, constants} from 'node:zlib'
import devalue from 'devalue'

const brotliCompressPromise = promisify(brotliCompress)
const brotliDecompressPromise = promisify(brotliDecompress)
/**
 * Returns the data compressed in base64 or buffer
 * @param {*} data
 * @param {object} [options={}]
 * @param {string} [options.encoding=utf8]
 * @param {boolean} [options.base64=true]
 * @returns {Promise<Base64|Buffer>} Promise object represents the data compressed in string base64 or buffer
 */
export async function compress(data, options = {}) {
	const {
		encoding = 'utf8',
		base64 = true,
	} = options
	const str = devalue(data)
	const buf = Buffer.from(str, encoding)
	const res = await brotliCompressPromise(buf, {
		chunkSize: 32 * 1024,
		params: {
			[constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
			[constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
		},
	})
	return base64 ? res.toString('base64') : res
}

/**
 * Returns the data decompressed
 * @param {Base64|Buffer} data
 * @param {object} [options={}]
 * @param {string} [options.encoding=utf8]
 * @returns {Promise<string>} Promise object represents the data decompressed in string encoded
 */
export async function decompress(data, options = {}) {
	const {encoding = 'utf8'} = options
	let buf = data
	if (typeof data === 'string') {
		buf = Buffer.from(data, 'base64')
	}
	const res = await brotliDecompressPromise(buf)
	const fn = new Function(`return ${(res.toString(encoding))}`)
	return fn()
}

/**
 * A string in Base64.
 * @typedef {string} Base64
 */
