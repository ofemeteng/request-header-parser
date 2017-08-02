var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	var ipaddress = req.ip.split(':')[3]
	var language = req.headers["accept-language"].split(',')[0]
	var software = req.headers['user-agent']
	var start = software.indexOf('(')
	var end = software.indexOf(')')
	software = software.slice(start + 1, end)

	console.log(req.headers['user-agent'])
  createJson(res, ipaddress, language, software)
});

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
