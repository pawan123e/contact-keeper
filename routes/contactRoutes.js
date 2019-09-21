const express = require('express');
const router = express.Router();

const { protect } = require('../controller/authController')
const {
    getContacts,
    createContact,
    deleteContact,
    updateContact
} = require('../controller/contactController')
router.route('/').get(protect, getContacts).post(protect, createContact);
router.route('/:id').delete(protect, deleteContact).patch(protect, updateContact);

module.exports = router;