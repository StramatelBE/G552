const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Admin = require("../Models/adminModel");

const MEDIA_DISPLAY_PATH = `${process.env.MEDIA_DISPLAY_PATH}`; // Assurez-vous de définir cette constante correctement

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(MEDIA_DISPLAY_PATH, 'uploadVersion');

    // Vérifie si le répertoire existe et le crée s'il n'existe pas
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, uploadPath);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, 'uploaded-file'); // Utilise un nom de fichier fixe pour écraser l'ancien
  },
});

const upload = multer({ storage });

class AdminController {
  constructor() {
    this.admin = new Admin();
  }

  update = (req, res) => {
    const { serialnumber, canal, ip } = req.body;

    this.admin
      .updateAdmin(serialnumber, canal, ip)
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

  upload = upload.single('file');

  handleFileUpload = (req, res) => {
    console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      // Traitement du fichier ici si nécessaire
      return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = AdminController;