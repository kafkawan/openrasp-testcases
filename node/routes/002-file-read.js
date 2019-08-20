"use strict";

var express = require('express');
var router = express.Router();
var fs = require("fs")
var caseInfo = require('../helpers/case_index')['002']

function readFile(filePath) {
  return fs.readFileSync(filePath)
}

function routeHandler(req, res, next) {
  var baseUrl = 'http://' + req.get('host') + req.baseUrl
  
  var params = {
    'name': caseInfo['name'],
    'linuxUrl': baseUrl + '/%2fetc%2fhosts',
    'linuxUrlFile': baseUrl + '/file:%2f%2f%2fetc%2fhosts',
	  'windowsUrl': baseUrl + '/C:\\Windows\\System32\\drivers\\etc\\hosts',
	  'windowsUrlFile': baseUrl + '/C:\\Windows\\System32\\drivers\\etc\\hosts'
  }

  try {
    if (req.params.file !== undefined) {
      params.fileContent = readFile(req.params.file)
    }
  }
  catch(e) {
    params.fileContent = 'Read dir failed! ' + e.message
  }

  res.render(caseInfo['path'], params);
}

router.get('/:file?', routeHandler);
router.post('/', routeHandler);

module.exports = router;