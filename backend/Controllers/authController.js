const User = require("../Models/userModel");
const ActiveSession = require("../Models/activeSessionModel");
const bcrypt = require("bcrypt");
const config = require("../config");
const verification = require("../Middlewares/signUpCheck");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const fs = require("fs");
require("dotenv").config();

const signUp = async (req, res) => {
  console.log(req.body);
  const folderName = `../../Server/Frontend/public/medias/${req.body.username}`;
  const user = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  };

  try {
    const isDuplicate = await verification.checkDuplicateUsername(
      user.username
    );
    if (isDuplicate) {
      return res
        .status(400)
        .json({ message: "Le nom d'utilisateur est déjà utilisé" });
    }

    console.log("signUp");

    const newUser = User.getInstance();

    console.log(fs.existsSync(folderName));
    if (!fs.existsSync(folderName)) {
      console.log("Folder does not exist");
      await fs.mkdirSync(folderName);
      console.log("Folder created");
    }

    const createdUser = await newUser
      .create(user)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const userController = User.getInstance();

    const activeSessionModel = new ActiveSession();
    const foundUser = await userController.getByUsername(user.username);
    if (foundUser) {
      bcrypt.compare(
        user.password,
        foundUser.password,
        async function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: err });
          } else {
            if (result) {
              if (foundUser.firstLogin === 1) {
              }

              const activeSession = await activeSessionModel.getAll();

              const inactivity = moment
                .duration(
                  moment(new Date()).diff(activeSession[0].last_activity)
                )
                .asHours();

              if (activeSession[0].activeToken !== null && inactivity < 2) {
                console.log("Un autre utilisateur est déjà connecté");
                return res.status(409).json({
                  error: "Une session est déjà active pour cet utilisateur.",
                  isConnected: true,
                });
              } else {
                await activeSessionModel.updateOne({
                  active_token: null,
                  last_activity: null,
                });
                const secret = config.secret;
                const accessToken = jwt.sign({ id: foundUser.id }, secret);

                await userController.updateTokenAndActivity({
                  id: foundUser.id,
                  active_token: accessToken,
                });

                await activeSessionModel.updateOne({
                  active_token: accessToken,
                  userId: foundUser.id,
                  last_activity: new Date(),
                });

                return res.status(200).send({
                  accessToken: accessToken,
                  user: foundUser,
                });
              }
            } else {
              console.log("Invalid Password!");
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
              });
            }
          }
        }
      );
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
const modifyPassword = async (req, res) => {
  console.log(req.body);
  const newUser = User.getInstance();
  const user = {
    id: req.params.id,
    newPassword: req.body.newPassword,
  };
  try {
    await newUser
      .changePassword(user)
      .then((user) => {
        newUser.updateFirstLogin(user.id);
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

const authentification = {
  signUp,
  signIn,
  modifyPassword,
};

module.exports = authentification;
