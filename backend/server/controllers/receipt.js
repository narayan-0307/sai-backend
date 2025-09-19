const { sign } = require('../public/images');
const { newLogo } = require('../public/newLogo');
const { receiptCSS } = require('../public/receiptCSS.js');

const receipt = async (data) => {
    const date = new Date().toDateString();
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt Letter</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${receiptCSS}">
    <style>
        ul.tick-list li::before {
            content: "✔";
            color: #4CAF50; /* Green color */
            margin-right: 8px;
        }
        * {
            font-family: 'Times New Roman', Times, serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .certificate {
        width: 842px
      }
      .receipt {
        border-color: rgb(0, 132, 255);
        border-width: 2px;
        border-radius: 6px;
      }
      .line {
        border-color: black;
        border-width: 1px;
      }
    </style>
</head>
<body>
    <div class="certificate pt-[50px] px-[100px]">
        <div class="flex justify-center"><img src="data:image/jpeg;base64,${newLogo}" alt=""/></div>
       
        <div class="px-4 py-8 space-y-4">

            <div class="flex justify-center">
                <span class="font-bold receipt">RECEIPT</span>
            </div>

            <div class="flex justify-between">
                <p>Registration No: F-21793</p>
                <p>Our PAN No: AACTS0408E</p>
            </div>
    
            <div class="flex justify-between">
                <p>Receipt No: <span class="text-red-600">SAATHIRE (give)-07</span></p>
                <p>Date: <span class="text-red-600">${date}</span></p>
            </div>

            <div class="flex justify-center">
                <p>Donor ID: <span class="underline text-red-600">65e35633477c36da4c45d640</span></p>
            </div>
    
            <div class="mb-4 text-justify text-lg">
                <p><span class="font-semibold italic">Received with Thanks from Mr./Ms./Mrs/Dr.:-</span> <span class="underline">${data.name}</span>
                <span class="font-semibold">Address:</span> <span class="underline">${data.address}</span>
                <span class="font-semibold">Mob:</span><span class="underline">${data.contactNo}</span>
                <span class="font-semibold">Email:</span><span class="underline">${data.email}</span></p>
                <p><span class="font-semibold">The Sum of Rupees:</span><span class="underline 	text-transform: capitalize">  ${data.amountText} Only</span>
                <span class="font-semibold">through:</span><span class="underline">√ RTGS/ NEFT/ Cash/ Cheque</span></p>
                <p><span class="font-semibold">Reference Number:</span> <span class="underline">${data.chequeNo}</span>
                <span class="font-semibold">Credit dated:</span><span class="underline">${data.clearanceDate}</span>
                <span class="font-semibold">drawn on Bank:</span><span class="underline">${data.bank}</span>
                <span class="font-semibold">Branch:</span><span class="underline">${data.branch}</span> having <span class="font-semibold">PAN No.:</span><span class="underline">${data.identificationNo}</span></p>
            </div>
    
            <div class="mb-4 flex justify-between">
                <p class="font-semibold underline text-red-600 text-2xl">₹ ${data.amount}/-</p>
                <div class="flex gap-4">
                    <p>80 G <span><input type="checkbox" checked class="accent-black text-white"></span></p>
                    <p><span><input type="checkbox" class="accent-black text-white"></span>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
    
            <div class="flex justify">
            <div class="mb-4 font-semibold">
                <p>Authorised Signatory</p>
                <img src="data:image/jpeg;base64,${sign}"/>
                <p>Social Activities Integration -SAI</p>
            </div>
        </div>

        <div class="mb-4 line">

        </div>
    
            <div class="mb-4 text-justify text-sm">
                <p class="font-bold">Important Notes:</p>
                <ul class="list-none pl-4 tick-list">
                    <li> Registered under the Public Trust Act, 1950, Regd. No. E All Donations to Social Activities integration(SAI) are exempted from IncomeTax for 50% Tax rebate (U/s 80G). Due to amendment made in Finance Act 1961 vide circular no 7/2010[F No. 
                        197/21/2010-ITA-I] dated 27/10/2010,this certificate has been extended in validity.</li>
                    <li>Overseas contributions / Foreign contribution / NRI DONATIONS are accepted through our FCRA regn no.083780858 dated 20th June 2002 can be credited to Social Activities Integration-SAI.</li>
                    <li>For Credit Card / Debit Card /Mobile Donations, use our Website.f you are making donations directly through our Website 
                        or RTGS Please intimate us through email & Call.
                        </li>
                    <li>It is proposed to omit the proviso to clause(vi) of sub section (5) of section 80G to provide that the approval once granted
                        shall continue to be valid in perpetuity. This amendment will take effect from 1st day of October 2009.Accordingly existing 
                        approvals expiring on or after 1st October 2009 shall be deemed to have been extended in perpetuity unless specifically 
                        withdrawn</li>
                    <li>School support programs for children of Sex Workers, HIV/AIDS and Cancer affected patients.</li>
                    <li>APNI DUNIYA project for POOR, HIV / AIDS and Cancer Patients, Orphans, Destitute Women, and the old aged in 11.5 acre land in Bhiwandi at Thane, Maharashtra.</li>
                </ul>
                <span class="font-semibold">*This is a Computer Generated Receipt</span>
            </div>
        </div>    
    </div>
</body>
</html>
    `
}

module.exports = { receipt }