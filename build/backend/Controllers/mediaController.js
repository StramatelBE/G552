const Media = require("../Models/mediaModel");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");
const sharedEmitter = require("../Utils/SharedEmitter");
require("dotenv").config();

class MediaController {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const username = req.params.user;
        const userFolder =`${process.env.UPLOAD_PATH}${username}`;
        cb(null, userFolder);
      },
      filename: (req, file, cb) => {
        const hash = crypto.createHash("sha256");
        hash.update(file.name + Date.now().toString());
        const fileName = hash.digest("hex");
        cb(null, fileName + "." + file.mimetype.split("/")[1]);
        file.filename = fileName;
      },
    });
    this.upload = multer({ storage: this.storage });
    this.media = new Media();
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.delete = this.delete.bind(this);
  }


  create = (req, res) => {
    const username = req.params.user;
    this.upload.single("file")(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: err });
      } else {
        sharedEmitter.emit("created", req.file.filename);
        res.status(201).json({ message: "File uploaded successfully" });
        const id = req.params.id;

        this.media
          .create(req.file, id, username)
          .then((media) => {
            fs.rename(
              req.file.path,
              `${process.env.UPLOAD_PATH} ${username} / ${req.file.filename}`,
              (erreur) => {
                if (erreur) {
                  console.error(
                    "Erreur lors du déplacement du fichier :",
                    erreur
                  );
                } else {
                  console.log("Fichier déplacé avec succès");
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ message: err });
          });
      }
    });
  };

  update = (req, res) => {
    this.media
      .update(req.body)
      .then((media) => {
        sharedEmitter.emit("updated", req.file.filename);
        res.status(200).json(media);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getAll = (req, res) => {
    this.media
      .getAll()
      .then((medias) => {
        res.status(200).json(medias);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getById = (req, res) => {
    this.media
      .getById(req.params.id)
      .then((media) => {
        if (media) {
          res.status(200).json(media);
        } else {
          res.status(404).json({ message: "Media not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getByUserId = (req, res) => {
    this.media
      .getByUserId(req.params.user)
      .then((media) => {
        if (media) {
          res.status(200).json(media);
        } else {
          res.status(404).json({ message: "Media not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  delete = (req, res) => {
    this.media
      .getById(req.params.id)
      .then((file) => {
        const filePath = file.path;
        fs.unlink(process.env.UPLOAD_PATH + filePath, (err) => {
          if (err) {
            {
              this.media
                .delete(req.params.id)
                .then(() => {
                  console.log("delete OK");
                  return res
                    .status(204)
                    .json({ message: "File deleted successfully" });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({ message: err });
                });
            }
          } else {
            this.media
              .delete(req.params.id)
              .then(() => {
                console.log("delete OK");
                return res
                  .status(204)
                  .json({ message: "File deleted successfully" });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({ message: err });
              });
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };
}

module.exports = MediaController;
