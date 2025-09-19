const Donation = require('../models/Donation')
const asyncHandler = require('../middleware/async')
const mongoose = require('mongoose')

//Add a Donation
const registerDonation = asyncHandler(async (req, res, next) => {
  const {
    donorId,
    amount,
    chequeNo,
    chequeDate,
    bank,
    branch,
    depositDate,
    clearanceDate,
    depositBank,
    eightyG,
    dateOfIssue,
    submissionDate,
    remark,
    AccountantSubmissionDate,
  } = req.body

  try {
    const donation = await Donation.donation(
      donorId,
      amount,
      chequeNo,
      chequeDate,
      bank,
      branch,
      depositDate,
      clearanceDate,
      depositBank,
      eightyG,
      dateOfIssue,
      submissionDate,
      remark,
      AccountantSubmissionDate
    )

    res.status(200).json(donation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//Get Donation by chequeId
const getDonorDonation = asyncHandler(async (req, res, next) => {
  const cheque_No = req.params.chequeNo

  const donations = await Donation.find({ chequeNo: cheque_No }).sort({
    createdAt: -1,
  })
  if (donations) {
    res.status(200).json(donations)
  } else {
    res.status(400).json('No such donations')
  }
})

//Search Donation with chequeID
const getDonationByChequeId = asyncHandler(async (req, res, next) => {
  const { cheque_No } = req.query
  let query = {}

  if (cheque_No) {
    query.chequeNo = { $regex: cheque_No, $options: 'i' }
  }

  const donation = await Donation.find(query)
  res.status(200).json(donation)
})

//Get donations by donorId
const getByDonorId = asyncHandler(async (req, res, next) => {
  const donor_Id = req.params.donorId
  if (!mongoose.Types.ObjectId.isValid(donor_Id)) {
    return res.status(400).json({ error: 'No such Donation' })
  }

  const donations = await Donation.find({ donorId: donor_Id }).sort({
    createdAt: -1,
  })
  if (donations) {
    res.status(200).json(donations)
  } else {
    res.status(400).json('No More Donations')
  }
})

// Sanchit Start

const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({})
    .sort({ createdAt: -1 })
    .populate('donorId')
  res.status(200).json(donations)
})

const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.donationId).populate('donorId')
  res.status(200).json(donation)
})

// Sanchit End

module.exports = {
  registerDonation,
  getDonorDonation,
  getDonationByChequeId,
  getByDonorId,
  getDonations,
  getDonationById,
}
