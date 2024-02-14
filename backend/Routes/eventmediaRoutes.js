const express = require('express');
const EventMediaController = require('../Controllers/eventmediaController');

const router = express.Router();
const eventMediaController = new EventMediaController();

router.post('/', eventMediaController.create);
router.put('/update-position', eventMediaController.updateMediaPositions);
router.put('/update-duration', eventMediaController.updateMediaDuration);
router.delete('/:id', eventMediaController.delete);
router.delete('/media/:id', eventMediaController.deleteAllByMedia);
router.get('/media/:mediaId', eventMediaController.getAllByMedia);
router.get('/event/:eventId', eventMediaController.getAllByEvent);



module.exports = router;