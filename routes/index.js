var express = require('express')
var router = express.Router();

var reqController = require('../controllers/req-controller')


router.post('/request', reqController.requestFood);

module.exports = router;
