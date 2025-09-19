const mongoose = require('mongoose')
const validator = require('validator')

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    identificationNo: {
      type: String,
      // required: true,
      // unique: true,
    },
  },
  { timestamps: true }
)

donorSchema.statics.donor = async function (
  name,
  birthDate,
  email,
  contactNo,
  address,
  identificationNo
) {
  if (
    !name ||
    !birthDate ||
    !email ||
    !contactNo
  ) {
    throw Error('All Compulsory Fields Must be Filled!')
  }
  if (!validator.isEmail(email)) {
    throw Error('Enter a Valid Email!')
  }
  if (!validator.isMobilePhone(contactNo)) {
    throw Error('Enter a Valid Number!')
  }
  const exists = await this.findOne({ contactNo })
  if (exists) {
    throw Error('Number Already in Use!')
  }
  const emailexists = await this.findOne({ email })
  if (emailexists) {
    throw Error('Email Already in Use!')
  }
  // const identificationExists = await this.findOne({ identificationNo })
  // if (identificationExists) {
  //   throw Error('Identification already Exists')
  // }

  const donorProfile = await this.create({
    name,
    birthDate,
    email,
    contactNo,
    address,
    identificationNo,
  })
  return donorProfile
}

donorSchema.virtual('donation', {
  ref: 'Donation',
  localField: '_id',
  foreignField: 'donorId',
  justOne: false, 
})

module.exports =mongoose.model.Donor || mongoose.model('Donor', donorSchema)
