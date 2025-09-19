const { signTwo } = require("../public/signTwo");
const { incomeTaxWatermark } = require('../public/incomeTaxWatermark');
const QrCode = require('qrcode');
const eightyGCSS = require('../public/eightyGCSS.js');

const eightyG = async (data) => {
    const date = new Date().toDateString()
    const currentTime = new Date().toTimeString();
    const currentDateTime = `${currentTime} ${date}`;
    const signatureText = `SIBICHEN K MATHEW\nFounder & Secretary General\nSocial Activities Integration-SAI\nSigned on: ${currentDateTime}`;
    const QrImage = await QrCode.toDataURL(signatureText)

     return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>80 G Certificate</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
        <link rel="stylesheet" href="${eightyGCSS}">
            * {
                font-family: 'Times New Roman', Times, serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .certificate {
                width: 842px;
                border: 3px;
                border-color: rgb(37, 231, 37);
            }
            .content {
                position: relative; /* Add position relative for watermark positioning */
                z-index: 2; /* Ensure content appears above the watermark */
            }
            .table {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 1rem;
                border-collapse: collapse;
            }
            .table th, .table td {
                border: 2px solid #000000; /* Set border color */
                padding: 0.5rem;
            }
            .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.2;
                z-index: 1;
                size: cover;
            }
        </style>
    </head>
    <body>
        <div class="certificate px-[100px]">
            <div class="content px-4 py-8 space-y-4">
            <div class="flex justify-center font-bold text-2xl">FORM NO. 10AC</div>
            <div class="flex justify-center"><p>(See rule 17A/11AA/2C)</p></div>
            <div class="flex justify-between font-semibold text-md">
                <p>Donor Name : <span class="text-red-600">${data.name}</span></p> 
                <p>Date : <span class="text-red-600">${date}</span></p>
            </div>
            <div class="flex justify-between font-semibold text-md">
                <p>Receipt No :<span class="text-red-600">SAATHIRE (give)-07</span></p> 
                <p>Amount :<span class="text-red-600">${data.amount}/-</span></p>
            </div>
            <div class="flex justify-center">Order for approval</div>
    
            <!--Table Starts--> 
            <div class="flex justify-between">
            <div class="mx-auto p-4">
                <table class="table w-full text-sm">
                    <tbody>
                    <div class="flex justify-between">
                    <img src="data:image/jpeg;base64,${incomeTaxWatermark}" class="watermark" alt="Watermark" width="600px" height="600px">
                </div>
                        <tr>
                            <td>1</td>
                            <td>PAN</td>
                            <td>AACTS0408E</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Name</td>
                            <td>SOCIAL ACTIVITIES INTEGRATION</td>
                        </tr>
                        <tr>
                            <td>2a</td>
                            <td>Address</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Flat/Door/Building</td>
                            <td>14 G F BYCULLA MUNICIPALSCHOOL 
                                BUILDING</td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Name of premises/Building/Village</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Road/Street/Post Office</td>
                            <td>NEAR S BRIDGE N M 
                                JOSHIROAD BYCULLA WEST</td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Area/Locality</td>
                            <td>MUMBAI</td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Town/City/District</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>State</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Country</td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>Pin Code/Zip Code</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Document Identification Number</td>
                            <td>AACTS0408EF2021601</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Application Number</td>
                            <td>303652910160821</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Unique Registration Number</td>
                            <td>AACTS0408EF20216</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Section/sub-section/clause/sub-clause/proviso in 
                                which approval is being granted</td>
                            <td>11-Clause (i) of first proviso to 
                                sub-section (5) of section 80G</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Date of approval</td>
                            <td>24-09-2021</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Assessment year or years for which the trust or 
                                institution is approved</td>
                            <td>From AY 2022-23 to AY 2026-27</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td colspan="2">Order for approval:</td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td colspan="2">a. After considering the application of the applicant and the material available on 
                                record, the applicant is hereby granted approval with effect from the assessment year 
                                mentioned at serial no 8 above subject to the conditions mentioned in row number 10.
                            </td>
                        </tr>
                        <tr>
                        <td> </td>
                        <td colspan="2">b. The taxability, or otherwise, of the income of the applicant would be separately 
                            considered as per the provisions of the Income Tax Act, 1961.
                        </td>
                    </tr>
                    <tr>
                        <td> </td>
                        <td colspan="2">c. This order is liable to be withdrawn by the prescribed authority if it is subsequently 
                            found that the activities of the applicant are not genuine or if they are not carried out 
                            in accordance with all or any of the conditions subject to which it is granted, if it is 
                            found that the applicant has obtained the approval by fraud or misrepresentation of 
                            facts or it is found that the assessee has violated any condition prescribed in the 
                            Income Tax Act, 1961.</td>
                    </tr>
                    <tr>
                    <td>10</td>
                    <td colspan="2">Conditions subject to which approval is being granted</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </div>
        <div class="certificate px-[100px]">
        <div class="content px-4 py-8 space-y-4">
            <div class="flex justify-between">
                <div class="mx-auto p-4">
                    <table class="table w-full text-sm">
                        <tbody>
                            <div class="flex justify-between">
                                <img src="data:image/jpeg;base64,${incomeTaxWatermark}" class="watermark" alt="Watermark" width="600px" height="600px">
                            </div>
                            <tr>
                                <td> </td>
                                <td colspan="2">The approval is granted subject to the following conditions:-</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">a. No change in the deed of the applicant trust/society/non profit company or any of 
                                    its bye-laws shall be affected without the due procedure of law and the approval of 
                                    the Competent Authority as per provisions of law and its intimation shall be given 
                                    immediately to Office of the Jurisdictional Commissioner of Income Tax and to the 
                                    Assessing Officer.
                                    </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">b. Any change in the trustees or address of the applicant trust/society/non-profit 
                                    company shall be intimated forthwith to Office of the Jurisdictional Commissioner of 
                                    Income Tax and to the Assessing Officer.</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">c. The applicant trust/society/non profit company shall maintain its accounts 
                                    regularly and also get them audited as per the provisions of section 80G(5)(iv) read 
                                    with section 12A(1)(b)/10(23C) of the Income Tax Act,1961.
                                    </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">d. Certificate of donation shall be issued to the donor in form no 10BE, as per the 
                                    provisions of rule 18AB.
                                    </td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">e. No cess or fee or any other consideration shall be received in violation of section 
                                    2(15) of the Income Tax Act, 1961.</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">f. The trust/society/non profit company shall file the return of income of its 
                                    trust/society/non profit company as per the provisions of section 139(1)/(4A)/(4C) of 
                                    the Income Tax Act, 1961.</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">g. The approval granted through this order shall apply to the donations received only 
                                    if the applicant trust/society/non profit company, established in India for charitable 
                                    purpose, fulfills the conditions laid down in section 80G(5) of the Income Tax Act, 
                                    1961 and the religious expenditure does not exceed the limit specified in section 
                                    80G(5B) of the said Act</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">h. If the applicant trust/ society/ non-profit company derives any income, being 
                                    profits and gains of business, it shall maintain separate books of account in respect of 
                                    such business as provided in section 80G(5)(i) of the Income Tax Act,1961. Further, 
                                    any donation received by the applicant shall not be used, directly or indirectly, for the 
                                    purposes of such business and a certificate shall be issued to every person making a 
                                    donation to the effect that the applicant maintains separate books of account in 
                                    respect of the business and the donation received by it will not be used, directly or 
                                    indirectly, for the purpose of the business.</td>
                            </tr>
                            <tr>
                                <td> </td>
                                <td colspan="2">i. The applicant shall comply with the provisions of the Income Tax Act, 1961 read 
                                    with the Income Tax Rules, 1962</td>
                            </tr>
                            <tr>
                            <td>  </td>
                            <td colspan="2">j. The approval and the Unique registration number has been instantly granted and if, 
                                at any point of time, it is noticed that form for approval has not been duly filled in by 
                                not providing, fully or partly, or by providing false or incorrect information or 
                                documents required to be provided under sub-rule (1) or (2) of rule 11AA or by not 
                                complying with the requirements of sub- rule (3) or (4) of the said rule, the approval 
                                and Unique Registration Number (URN), shall be cancelled and the approval and 
                                URN shall be deemed to have never been issued or granted</td>
                        </tr>
                        <tr>
                            <td>  </td>
                            <td>Name and Designation of the Approving Authority</td>
                            <td>Principal Commissioner of Income 
                                Tax/ Commissioner of Income Tax
                                (Digitally signed)</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        <div class="flex justify-end">
        <img class="signature" src="${QrImage}" alt="Digital Signature" width="100px" height="100px" /> 
        </div>
        <div class="flex justify-end">
        <p class= "text-md">Digitally Signed by,
        Mr. SIBICHEN K MATHEW</p>
        </div>
        <div class="flex justify-end">
            <img src="data:image/jpeg;base64,${signTwo}" width="150px" height="150px"/>
        </div>
    </div>
</div>
    </body>
    </html>
    `
}
module.exports = { eightyG }