const request = require ( 'request' );
const path    = require ( 'path' );
const baseURL = 'https://api.fincharts.info';

let serialize = function(obj) {
	let str = [];
	for (let p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
};

exports.current = function( api_key, options ) {
	return new Promise((resolve, reject) => {
		let url = baseURL + '/current?key=' + api_key + '&' + serialize(options);
		request ( { url : url }, function ( error, response, body ) {
			if (error) {
				return reject(error)
			}else{
				return resolve(body)
			}
		} );
	})
};

exports.exchange = function ( api_key, options ) {
	return new Promise((resolve, reject) => {
		let url = baseURL + '/exchange?key=' + api_key + '&' + serialize(options);
		request ( { url : url }, function ( error, response, body ) {
			if (error) {
				return reject(error)
			}else{
				return resolve(body)
			}
		} );
	})
};

exports.specific = function ( api_key, options ) {
	return new Promise((resolve, reject) => {
		let url = baseURL + '/specific?key=' + api_key + '&' + serialize(options);
		request ( { url : url }, function ( error, response, body ) {
			if (error) {
				return reject(error)
			}else{
				return resolve(body)
			}
		} );
	})
};

exports.historic = function ( api_key, options ) {
	return new Promise((resolve, reject) => {
		let url = baseURL + '/historic?key=' + api_key + '&' + serialize(options);
		request ( { url : url }, function ( error, response, body ) {
			if (error) {
				return reject(error)
			}else{
				return resolve(body)
			}
		} );
	})
};

exports.fluctuation = function ( api_key, options ) {
	return new Promise((resolve, reject) => {
		let url = baseURL + '/fluctuation?key=' + api_key + '&' + serialize(options);
		request ( { url : url }, function ( error, response, body ) {
			if (error) {
				return reject(error)
			}else{
				return resolve(body)
			}
		} );
	})
};
