const User = require("../Models/userModel");
class UserController {
  constructor() {
    this.user = User.getInstance();
  }
  create = (req, res) => {
    this.user
      .create(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };


  updateLanguage  = (req, res) => {
    console.log("updateLanguage", req.body);
    this.user
      .updateLanguage(req.body, req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
  

  update = (req, res) => {
    this.user
      .update(req.body)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  changePassword = (req, res) => {
    this.user
      .changePassword(req.body, req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getByUsername = (req, res) => {
    this.user
      .getByUsername(req.params.username)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getAll = (req, res) => {
    this.user
      .getAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getById = (req, res) => {
    this.user
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  delete = (req, res) => {
    this.user
      .delete(req.params.id)
      .then(() => {
        res.status(204).json();
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };
  updateFirstLogin = (req, res) => {
    this.user
      .updateFirstLogin(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };
}

module.exports = UserController;
