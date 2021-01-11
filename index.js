/* eslint no-new-func: 0 */
'use strict'

const {brotliCompress, brotliDecompress} = require('zlib')
const devalue = require('devalue')

/**
 * Returns the data compressed in base64 or buffer
 * @param {*} data
 * @param {object} [options={}]
 * @param {string} [options.encoding=utf8]
 * @param {boolean} [options.base64=true]
 * @returns {Promise<Base64|Buffer>} Promise object represents the data compressed in string base64 or buffer
 */
function compress(data, options = {}) {
	const {
		encoding = 'utf8',
		base64 = true
	} = options
	return new Promise((resolve, reject) => {
		const str = devalue(data)
		const buf = Buffer.from(str, encoding)
		brotliCompress(buf, (error, buffer) => {
			if (error) {
				reject(error)
				return
			}
			resolve(base64 ? buffer.toString('base64') : buffer)
		})
	})
}

/**
 * Returns the data decompressed
 * @param {Base64|Buffer} data
 * @param {object} [options={}]
 * @param {string} [options.encoding=utf8]
 * @returns {Promise<string>} Promise object represents the data decompressed in string encoded
 */
function decompress(data, options = {}) {
	const {encoding = 'utf8'} = options
	return new Promise((resolve, reject) => {
		let buf = data
		if (typeof data === 'string') {
			buf = Buffer.from(data, 'base64')
		}
		brotliDecompress(buf, (error, buffer) => {
			if (error) {
				reject(error)
				return
			}
			const fn = new Function(`return ${(buffer.toString(encoding))}`)
			resolve(fn())
		})
	})
}

exports.compress = compress
exports.decompress = decompress

/**
 * A string in Base64.
 * @typedef {string} Base64
 */
