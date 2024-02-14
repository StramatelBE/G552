const express = require('express');
const MediaController = require('../Controllers/mediaController');

const router = express.Router();
const mediaController = new MediaController();

router.post('/:user/:id', mediaController.create);
router.put('/:id', mediaController.update);
router.get('/', mediaController.getAll);
router.get('/:user', mediaController.getByUserId);
router.delete('/:id', mediaController.delete);
router.get('/user/:id', mediaController.getByUserId);


module.exports = router;