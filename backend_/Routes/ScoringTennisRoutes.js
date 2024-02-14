const express = require('express');
const ScoringTennisController = require('../Controllers/scoringTennisController');

const router = express.Router();
const scoringTennisController = new ScoringTennisController();

router.post('/:user/:id', scoringTennisController.create);

router.put('/config', scoringTennisController.updateConfig);
router.get('/', scoringTennisController.getAll);
router.get('/:id', scoringTennisController.getById);
router.delete('/:id', scoringTennisController.delete);

module.exports = router;
