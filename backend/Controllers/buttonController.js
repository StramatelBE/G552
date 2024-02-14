const Button = require('../Models/buttonModel');

class ButtonController {
    constructor() {
        this.button = new Button();
    }
    create = (req, res) => {
        this.button.create(req.body)
            .then((button) => {
                res.status(201).json(button);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    update = (req, res) => {
        this.button.update(req.body)
            .then((button) => {
                res.status(200).json(button);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    getAll= (req, res) => {
        this.button.getAll()
            .then((buttons) => {
                res.status(200).json(buttons);
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    getById= (req, res) => {
        this.button.getById(req.params.id)
            .then((button) => {
                if (button) {
                    res.status(200).json(button);
                } else {
                    res.status(404).json({message: 'Button not found'});
                }
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
    delete= (req, res) => {
        this.button.delete(req.params.id)
            .then(() => {
                res.status(204).json();
            })
            .catch((err) => {
                res.status(500).json({message: err});
            });
    }
}

module.exports = ButtonController;