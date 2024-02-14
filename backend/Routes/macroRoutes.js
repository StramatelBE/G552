const express = require('express');
const MacroController = require('../Controllers/macroController');

const router = express.Router();
const macroController = new MacroController();

router.post('/', macroController.create);
router.put('/:id', macroController.update);
router.get('/:id', macroController.getById);
router.get('/user/:id', macroController.getByUserId);
router.get('/button/:id', macroController.getByButtonId);
router.get('/event/:id', macroController.getByEventId);
router.delete('/:id', macroController.deleteMacro);

module.exports = router;



