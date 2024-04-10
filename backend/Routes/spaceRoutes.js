const express = require('express');
const SpaceController = require('../Controllers/spaceController');

const router = express.Router();
const spaceController = new SpaceController();

router.get('/', spaceController.getSpace);

module.exports = router;

