var express = require('express')
var router = express.Router();

var reqController = require('../controllers/req-controller')


router.get('/request/', reqController.requestFood);
router.get('/see/requests/', reqController.seeRequests);
router.get('/offer/', reqController.offerDinner)
router.get('/see/offers/', reqController.seeOffers)
router.get('/accept', reqController.closeOpenRequest);

module.exports = router;
