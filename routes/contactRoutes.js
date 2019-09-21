const express = require('express');
const router = express.Router();

const { protect } = require('../controller/authController')
const {
    getContacts,
    createContact
} = require('../controller/contactController')
router.route('/').get(protect, getContacts).post(protect, createContact)

module.exports = router;