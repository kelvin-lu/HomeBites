var express = require('express')
var router = express.Router();

var reqController = require('../controllers/req-controller')


router.get('/req/', reqController.requestFood);
router.get('/see/', reqController.seeRequests);
router.get('/loc', reqController.locByID)

module.exports = router;
