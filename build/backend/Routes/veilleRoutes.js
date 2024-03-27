// Routes/veilleRoutes.js
const express = require('express');
const VeilleController = require('../Controllers/veilleController');

const router = express.Router();
const veilleController = new VeilleController();

router.post('/', veilleController.create);
router.put('/', veilleController.update);
router.get('/', veilleController.getAll);
router.get('/:id', veilleController.getById);
router.delete('/:id', veilleController.delete);

module.exports = router;