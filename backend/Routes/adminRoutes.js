const express = require('express');
const AdminController = require('../Controllers/adminController');

const router = express.Router();
const adminController = new AdminController();

router.put('/', adminController.update);
router.get('/', adminController.get);

module.exports = router;