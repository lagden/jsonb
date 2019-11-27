/* eslint no-new-func: 0 */
'use strict'

const {brotliCompress, brotliDecompress} = require('zlib')
const devalue = require('devalue')

function compress(data) {
	return new Promise((resolve, reject) => {
		const str = devalue(data)
		const buf = Buffer.from(str, 'utf8')
		brotliCompress(buf, (error, buffer) => {
			if (error) {
				reject(error)
				return
			}
			resolve(buffer.toString('base64'))
		})
	})
}

function decompress(base64) {
	return new Promise((resolve, reject) => {
		const buf = Buffer.from(base64, 'base64')
		brotliDecompress(buf, (error, buffer) => {
			if (error) {
				reject(error)
				return
			}
			const fn = new Function(`return ${(buffer.toString('utf8'))}`)
			resolve(fn())
		})
	})
}

exports.compress = compress
exports.decompress = decompress
