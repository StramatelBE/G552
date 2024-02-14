const express = require('express');
const ModeController = require('../Controllers/modeController');

const router = express.Router();
const modeController = new ModeController();

router.post('/', modeController.create);
router.put('/:id', modeController.update);
router.get('/', modeController.getAll);
router.delete('/:id', modeController.delete);

module.exports = router;