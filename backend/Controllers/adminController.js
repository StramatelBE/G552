const Admin = require("../Models/adminModel");

class AdminController {
  constructor() {
    this.admin = new Admin();
  }

  update = (req, res) => {
    const { serialNumber } = req.body;

    this.admin
      .updateAdmin(serialNumber)
      .then(() => {
        res.status(200).json({ message: "Admin updated successfully." });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  get = (req, res) => {
    console.log("test");
    this.admin
      .getAdmin()
      .then((admin) => {
        res.status(200).json(admin);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };
}

module.exports = AdminController;