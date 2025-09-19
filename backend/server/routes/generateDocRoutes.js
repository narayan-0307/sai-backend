const express = require('express');
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { generateThanks, generateReceipt, generateEightyG, generateEmail, emailReceipt, emailEightyG } = require('../controllers/certificateManagement')

//protect routes
router.use(requireAuth)

//Generate Thanks Letter
router.post('/generate-thanksLetter', generateThanks)

//Generate Receipt
router.post('/generate-receipt', generateReceipt)

//Generate EightG
router.post('/generate-eightyG', generateEightyG)

//Send an Thanks letter Email
router.post('/generate-email', generateEmail)

//Send a Receipt Email
router.post('/generate-receipt-email', emailReceipt)

//Send a EightyG Email
router.post('/generate-eightyG-email', emailEightyG)

module.exports = router