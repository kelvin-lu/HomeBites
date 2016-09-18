var express = require('express')
var router = express.Router();

var reqController = require('../controllers/req-controller')


router.get('/request/', reqController.requestFood);
router.get('/see', reqController.seeOpenRequests);
router.get('/serve', reqController.closeOpenRequest);

module.exports = router;
