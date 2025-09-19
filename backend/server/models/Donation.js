const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Donor"
    },
    amount: {
        type: Number,
        required: true,
    },
    chequeNo: {
        type: String,
        required: true,
        unique: true
    },
    chequeDate: {
        type: Date,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    depositDate:  {
        type: Date,
        required: true,
    },
    clearanceDate: {
        type: Date,
        required: true,
    },
    depositBank: {
        type: String,
        required: true,
    },
    eightyG: {
        type: String,
        required: true,
    },
    dateOfIssue: {
        type: Date,
        required: true,
    },
    submissionDate: {
        type: Date,
        required: true,
    },
    remark: {
        type: String,
        required: false,
    },
    AccountantSubmissionDate: {
        type: String,
        required: true,
    }
}, {timestamps: true})

//validation
DonationSchema.statics.donation = async function (donorId, amount, chequeNo,
    chequeDate, bank, branch, depositDate, clearanceDate, depositBank, eightyG,
    dateOfIssue, submissionDate, remark, AccountantSubmissionDate){

        if (!donorId || !amount || !chequeNo || !chequeDate || !bank || !branch || 
            !depositDate || !clearanceDate || !depositBank || !eightyG
            || !dateOfIssue || !submissionDate || !AccountantSubmissionDate){
                throw Error("All Fields must be Filled!")
            }

        const exists = await this.findOne({ chequeNo })    
        if (exists){
            throw Error('Cheque already used!')
        }

            const donation = await this.create({donorId, amount, chequeNo,
                chequeDate, bank, branch, depositDate, clearanceDate, depositBank, eightyG,
                dateOfIssue, submissionDate, remark, AccountantSubmissionDate})
            return donation
}


module.exports = mongoose.model.Donation || mongoose.model("Donation", DonationSchema)