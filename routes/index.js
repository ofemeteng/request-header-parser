var express = require('express')
var router = express.Router()
var getIP = require('ipware')().get_ip

/* GET home page. */
router.get('/', function(req, res, next) {
	[ipaddress, language, software] = getHeaderParams(req)
	createJson(res, ipaddress, language, software)
})

function getHeaderParams(req) {
	var ipaddress = getIP(req).clientIp.split(':')[3] || req.ip.split(':')[3] || req.connection.remoteAddress.split(':')[3]
	var language = req.headers["accept-language"].split(',')[0]
	var software = req.headers['user-agent']
	var start = software.indexOf('(')
	var end = software.indexOf(')')
	software = software.slice(start + 1, end)
	return [ipaddress, language, software]
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
