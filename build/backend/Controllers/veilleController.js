// Controllers/veilleController.js
const Veille = require('../Models/veilleModel');

class VeilleController {
  constructor() {
    this.veille = new Veille();
  }

  create = (req, res) => {
    this.veille.create(req.body)
      .then((veilleId) => {
        res.status(201).json({ id: veilleId });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  getAll = (req, res) => {
    this.veille.getAll()
      .then((veilles) => {
        res.status(200).json(veilles);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  getById = (req, res) => {
    this.veille.getById(req.params.id)
      .then((veille) => {
        if (veille) {
          res.status(200).json(veille);
        } else {
            res.status(404).json({ message: 'Veille not found' });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  
    update = (req, res) => {
      this.veille.update(req.body)
        .then(() => {
          res.status(200).json({ message: 'Veille updated successfully' });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  
    delete = (req, res) => {
      this.veille.delete(req.params.id)
        .then(() => {
          res.status(204).json();
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  }
  
  module.exports = VeilleController;
