const TennisScore = require('../Models/scoringTennisModel');

class ScoringTennisController {
    constructor() {
        this.tennisScore = new TennisScore();
    }
    create = (req, res) => {
        this.tennisScore.create(req.body)
            .then((tennisScore) => {
                res.status(201).json(tennisScore);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
   

    updateConfig = (req, res) => {
        console.log(req.body);
        this.tennisScore.updateConfig(req.body)
            .then((tennisScore) => {
                res.status(200).json(tennisScore);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }

    getAll= (req, res) => {
        this.tennisScore.getAll()
            .then((tennisScores) => {
                res.status(200).json(tennisScores);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    getById= (req, res) => {
        this.tennisScore.getById(req.params.id)
            .then((tennisScore) => {
                if (tennisScore) {
                    res.status(200).json(tennisScore);
                } else {
                    res.status(404).json({message: 'Score not found'});
                }
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    delete= (req, res) => {
        this.tennisScore.delete(req.params.id)
            .then(() => {
                res.status(204).json();
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
}

module.exports = ScoringTennisController;
