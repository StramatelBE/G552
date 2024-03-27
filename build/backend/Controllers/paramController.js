const Param = require('../Models/paramModel');

class ParamController {
  constructor() {
    this.param = new Param();
  }

  create = (req, res) => {
    console.log(req.body);
    this.param.create(req.body)
      .then(() => {
        res.status(201).json({ message: 'Param created successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  getAllByUser = (req, res) => {
    this.param.getAllByUser(req.params.userId)
      .then((params) => {
        res.status(200).json(params);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  getAllByVeille = (req, res) => {
    this.param.getAllByVeille(req.params.veilleId)
      .then((params) => {
        res.status(200).json(params);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  updateEventAuto = (req, res) => {
    console.log('test',req.body);
    const { user_id: userId, veille_id: veilleId, event_auto: eventAuto } = req.body;

    this.param.updateEventAuto(userId, veilleId, eventAuto)
      .then(() => {
        res.status(200).json({ message: 'Event auto updated successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }

  deleteByUserAndVeille = (req, res) => {
    const { userId, veilleId } = req.params;
    this.param.deleteByUserAndVeille(userId, veilleId)
      .then(() => {
        res.status(204).json({ message: 'Param deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
}

module.exports = ParamController;
