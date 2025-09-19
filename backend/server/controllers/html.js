const { logo, sign } = require('../public/images');
const QrCode = require('qrcode')
const {outputCSS}  = require('../public/outputCSS')

const thanksLetter = async (data) => { 
 const currentDate = new Date().toDateString();
 const currentTime = new Date().toTimeString();
 const currentDateTime = `${currentTime} ${currentDate}`;
 const signatureText = `Mr. Vinay Vasta\nFounder & Secretary General\nSocial Activities Integration-SAI\nSigned on: ${currentDateTime}`;
 const QrImage = await QrCode.toDataURL(signatureText)

 const generateCheckboxHtml = (label, checked) => {
  return `
      <div class="flex items-center gap-2">
          <input type="checkbox" class="accent-black" ${checked ? 'checked' : ''} />
          <p>${label}</p>
      </div>`;
}

const checkboxesHtml=`
${generateCheckboxHtml('Educational support & Construction of Shelter for the children of Poor & deprived Female Sex Workers.', data.educationalSupport)}
${generateCheckboxHtml('Medical Care & Support for poor kids on Cancer Treatment.', data.medicalCare)}
${generateCheckboxHtml('Medical Care & Nutritional Support to deserving Poor female sex worker, Poor People Living with HIV & their Children.', data.nutritionalSupport)}
${generateCheckboxHtml('Comprehensive Care & Support to Tribal & Marginalised Children.', data.comprehensiveCare)}
${generateCheckboxHtml('Other', data.other)}
`
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Certificate</title>
        <link rel="stylesheet" href="${outputCSS}">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Times New Roman', Times, serif;
          }
          .certificate {
            width: 842px;
          }
          .logo {
            margin-left: auto;
            width: 300px;
          }

          .signature {
            width: 300px;
          }
        </style>
      </head>
      <body>
        <div class="certificate pt-[100px] px-[100px]">
          <img class="ml-auto logo" src="data:image/jpeg;base64,${logo}" alt="" /> 
          <div class="flex text-xs font-semibold">
            <span>Ref :Saathire Pvt.Ltd. (give)-07/ ./23-24</span>
            <span class="ml-auto">Date : ${currentDate}</span>
          </div>
          <div class="text-sm font-semibold">
            <p>To,</p>
            <p>${data.donorName}</p>
            <p>${data.donorAddress}</p>
          </div>
          <div class="flex justify-center text-sm font-semibold underline mt-10">
            <p>Sub: - Thanks Giving Letter For Your Profound Donation.</p>
          </div>
          <div class="space-y-2 mt-2 text-sm">
            <p class="text-sm font-bold">Dear Sir / Madam,</p>
            <p>
              On behalf of Social Activities Integration-SAI we express our
              wholehearted thanks for your kind and generous donation of ₹${data.donationAmount}/-
            </p>
            <p>For the noble cause of the following:</p>
            <div class="space-y-2 mx-4">
              ${checkboxesHtml}
            </div>
            <p class="text-justify">
              <span class="font-semibold">
                We have purchased 11.5 acres of land from the donation at Kuhe Village, Taluka Bhiwandi, District- Thane, Maharashtra where we propose to construct Shelter for Children of Poor Female Sex Worker for their permanent Shelter and safety from the exploitation by anti-social elements and providing quality education for their upliftment & Bright Future.
              </span>
              For this noble task, we extremely need the substantial financial support from all quarters of the society to fulfill the desired goal. Hence we earnestly appeal to your goodselves for securing donation by exploring the possibility of funding support from your contacts/ relatives.
            </p>
            <p class="font-semibold">Thanks and Regards,</p>
          </div>
          <img class="signature" src="data:image/jpeg;base64,${sign}" alt="Digital Signature" width="200px" height="200px" /> 
          <div class="font-semibold">
            <p>Digitally Signed by</p>
            <p>Mr. Vinay Vasta</p>
            <p>Founder & Secretary General</p>
            <p>Social Activities Integration-SAI</p>
            <div class="text-sm">
              <p class="underline">
                Encl: 1. Receipt & 80 G Certificate for 50 % Income Tax rebate (U/S 80 G)
              </p>
              <p class="underline">Please Mention your Donor ID for further Communication</p>
              <p class="underline">Please note this is computer generated print</p>
            </div>
          </div>
        </div>
      </body>
      </html>`;
        }
module.exports = { thanksLetter };