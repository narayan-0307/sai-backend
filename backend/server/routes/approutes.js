const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { register, getAll, getDonor, getDashboard } = require('../controllers/donorManagement')
const {
  registerDonation,
  getDonorDonation,
  getDonationByChequeId,
  getByDonorId,
  getDonations,
  getDonationById,
} = require('../controllers/donationManagement')

//protect routes
router.use(requireAuth)

//create donor route
router.post('/donor', register)

//get all donors
router.get('/getdonors', getAll)

//register a donation
router.post('/donation', registerDonation)

//get donations as per cheque_No.
router.get('/donation/:chequeNo', getDonorDonation)

//search donations as per their cheque_no.
router.get('/searchDonation/', getDonationByChequeId)

//get donor and their donations
router.get('/getDonor/:donorId', getDonor)

//get donation by donorId
router.get('/getDonationById/:donorId', getByDonorId)

// Sanchit Start

//get donations
router.get('/donations', getDonations)

//get donations by Id
router.get('/donations/:donationId', getDonationById)

// Sanchit end

//Dashboard Route
router.get('/dashboard', getDashboard)

module.exports = router
