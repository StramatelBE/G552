const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const setupExpress = (app) => {
    app.use(cors());
    app.use(bodyParser.json({ limit: '800mb' }));
    app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    }));
};

module.exports = setupExpress;
