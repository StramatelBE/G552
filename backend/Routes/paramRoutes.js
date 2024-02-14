const express = require('express');
const ParamController = require('../Controllers/paramController');

const router = express.Router();
const paramController = new ParamController();

router.post('/', paramController.create);
router.put('/updateEventAuto', paramController.updateEventAuto);
router.get('/user/:userId', paramController.getAllByUser);
router.get('/veille/:veilleId', paramController.getAllByVeille);
router.delete('/user/:userId/veille/:veilleId', paramController.deleteByUserAndVeille);

module.exports = router;
