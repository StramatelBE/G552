const express = require('express');
const ButtonController = require('../Controllers/buttonController');

const router = express.Router();
const buttonController = new ButtonController();

router.post('/', buttonController.create);
router.put('/:id', buttonController.update);
router.get('/:id', buttonController.getById);
router.delete('/:id', buttonController.delete);

module.exports = router;