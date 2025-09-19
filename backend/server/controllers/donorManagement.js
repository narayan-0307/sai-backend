const Donor = require('../models/Donor')
const Donation = require('../models/Donation')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const mongoose = require('mongoose')

//Register a Donor
const register = asyncHandler(async (req, res, next) => {
  try {
    const name = req.body.name
    const birthDate = req.body.birthDate
    const email = req.body.email
    const contactNo = req.body.contactNo
    const address = req.body.address
    const identificationNo = req.body.identificationNo
    const donor = await Donor.donor(
      name,
      birthDate,
      email,
      contactNo,
      address,
      identificationNo
    )
    await donor.save()
    res.status(200).json(donor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//Retrieve all Donors
const getAll = asyncHandler(async (req, res, next) => {
  const { name, identificationNo } = req.query
  let query = {}

  if (name) {
    query.name = { $regex: name, $options: 'i' }
  }

  if (identificationNo) {
    query.identificationNo = identificationNo
  }

  const donors = await Donor.find(query).sort({ createdAt: -1 })
  res.status(200).json(donors)
})

//getDonor and their Donations (if any)
const getDonor = asyncHandler(async (req, res, next) => {
  const donorId = req.params.donorId

  if (!mongoose.Types.ObjectId.isValid(donorId)) {
    return res.status(400).json({ error: 'No such Donor' })
  }

  // const donations = await Donation.find({donorId: donorId}).sort({createdAt: -1})
  // const donor = await Donor.find({_id: donorId}).populate("donation")

  // res.status(200).json({donations, donor})

  const donor = await Donor.findById(donorId).populate('donation')


  res.status(200).json({ ...donor.toObject(), donations: donor.donation })
})

const getDashboard = asyncHandler(async(req, res, next) => {
  try {
    const totalDonors = await Donor.countDocuments();

    const totalDonations = await Donation.countDocuments();

    const highestDonation = await Donation.aggregate([
      {
        $group: {
          _id: '$donorId',
          highestAmount: { $max: '$amount' }
        }
      },
      {
        $sort: { highestAmount: -1 }
      },
      {
        $limit: 1
      }
    ]);

    const totalAmountCollectedRoundoff = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    const totalAmountCollected = totalAmountCollectedRoundoff.length > 0 ? totalAmountCollectedRoundoff[0].totalAmount : 0;
    res.status(200).json({totalDonors, totalDonations, highestDonation, totalAmountCollected})
 
  }catch (error) {
    console.error("Error Loading Dashboard Status: ", error);
    throw error;
  }
})

module.exports = { register, getAll, getDonor, getDashboard }
