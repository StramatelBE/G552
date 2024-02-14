const express = require('express');
const EventController = require('../Controllers/eventController');

const router = express.Router();
const eventController = new EventController();

router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.get('/user/:id', eventController.getByUserId);
router.delete('/:id', eventController.delete);


module.exports = router;