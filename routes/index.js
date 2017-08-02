var express = require('express')
var request = require('request')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	var ipaddress = ''
	request({
		uri: 'http://freegeoip.net/json',
		method: 'GET'
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let json = JSON.parse(body)
			var ipaddress = json.ip
			var [language, software] = getHeaderParams(req)
			createJson(res, ipaddress, language, software)
		} else {
			var ipaddress = req.ip.split(':')[3]
			var [language, software] = getHeaderParams(req)
			createJson(res, ipaddress, language, software)
			console.error('Offline: ', error);
		}
	})
});

function getHeaderParams(req) {
	var language = req.headers["accept-language"].split(',')[0]
	var software = req.headers['user-agent']
	var start = software.indexOf('(')
	var end = software.indexOf(')')
	software = software.slice(start + 1, end)
	return [language, software]
}

function createJson(res, ipaddress, language, software) {
	return res.format({
  	'application/json': function() {
  		res.send({
  			ipaddress: ipaddress,
  			language: language,
  			software: software
  		})
  	}
  })
}

module.exports = router;
