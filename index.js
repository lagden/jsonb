'use strict'

const {deflate, unzip} = require('zlib')

function compress(json) {
	return new Promise((resolve, reject) => {
		const str = JSON.stringify(json)
		if (str === undefined) {
			reject(new TypeError('Data can\'t be undefined'))
			return
		}
		const buf = Buffer.from(str, 'utf8')
		deflate(buf, (err, buffer) => {
			if (err) {
				reject(err)
				return
			}
			resolve(buffer.toString('base64'))
		})
	})
}

function decompress(base64) {
	return new Promise((resolve, reject) => {
		const buf = Buffer.from(base64, 'base64')
		unzip(buf, (error, buffer) => {
			if (error) {
				reject(error)
				return
			}
			try {
				resolve(JSON.parse(buffer.toString('utf8')))
			} catch (error2) {
				reject(error2)
			}
		})
	})
}

exports.compress = compress
exports.decompress = decompress
