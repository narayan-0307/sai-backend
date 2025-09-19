const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer')
const asyncHandler = require('../middleware/async');
const { thanksLetter } = require('./html');
const { receipt } = require('./receipt');
const { eightyG } = require('./eightyG');



const generateThanks = asyncHandler(async (req, res, next) => {
  // Function to fetch data from server
  async function fetchDataFromServer(data) {
    return data
  }

  // Function to generate Thanks Letter
  async function generatePDFWithWatermark(htmlContent) {
    const browser = await puppeteer.launch({
      headless: true   });
    const page = await browser.newPage()

    // Load HTML content into the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' }) // Wait for image to load

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'Legal' })

    // Save the pdf
    // await fs.writeFileSync('thanksLetter.pdf', pdfBuffer)

    // Close the browser
    await browser.close()

    return pdfBuffer
  }

  try {
    // Fetch data from the server
    const data = await fetchDataFromServer(req.body)

    // Generate HTML content
    // const output = fs.readFileSync(outputCSS)
    // const output1 = fs.readFileSync(output)
    // const output = fs.readFileSync('D:/project 2/sai/src/main/server/controllers\output.css')
    const htmlContent = await thanksLetter(data)

    // Generate PDF with watermark using Puppeteer
    const pdfBuffer = await generatePDFWithWatermark(htmlContent)

    // Set response headers to make the PDF downloadable
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=thanksLetter.pdf',
    })

    // Send the PDF file as response
    res.send(pdfBuffer)

  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Internal Server Error')
  }
})

//!!!!!!!!!!! Function to generate receipt PDF
const generateReceipt = asyncHandler(async (req, res, next) => {
  // Create PDF using Puppeteer
  async function generatePDFWithWatermark(htmlContent) {
    const browser = await puppeteer.launch({
      headless: true    })
    const page = await browser.newPage()

    // Load HTML content into the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'Legal' })

    // Save the pdf
    // await fs.writeFileSync('receipt.pdf', pdfBuffer)

    // Close the browser
    await browser.close()

    return pdfBuffer
  }

  try {
    // Fetch data from the server
    const data = req.body

    // Generate HTML content
    // const output = fs.readFileSync(
    //     path.join(__dirname, 'receipt.css'),
    //   'utf8'
    // )
    const htmlContent = await receipt(data)

    // Generate PDF with watermark using Puppeteer
    const pdfBuffer = await generatePDFWithWatermark(htmlContent)

    // Set response headers to make the PDF downloadable
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="receipt.pdf"',
    })

    // Send the PDF file as response
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Internal Server Error')
  }
})

// !!!!!!!!!!!!!!!!!!!!!!!! Function to Generate 80G certificate
const generateEightyG = asyncHandler(async (req, res, next) => {
  async function generatePDFWithWatermark(htmlContent) {
    const browser = await puppeteer.launch({
      headless: true    })
    const page = await browser.newPage()

    // Load HTML content into the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' }) // Wait for image to load

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'Legal' })

    // Save the pdf
    // await fs.writeFileSync('eightyG.pdf', pdfBuffer)

    // Close the browser
    await browser.close()

    return pdfBuffer
  }
  try {
    // Fetch data from the server
    const data = req.body

    // Generate HTML content
    // const output = fs.readFileSync(
    //     path.join(__dirname, 'eightyG.css'),
    //   'utf8'
    // )
    const htmlContent = await eightyG(data)

    // Generate PDF with watermark using Puppeteer
    const pdfBuffer = await generatePDFWithWatermark(htmlContent)

    // Set response headers to make the PDF downloadable
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="eightyG.pdf"',
    })

    // Send the PDF file as response
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Internal Server Error')
  }
})

//!!!!!!!!!!! Thanks Email Route
const generateEmail = asyncHandler(async(req, res, next)=>{
    // Function to fetch data from server
    async function fetchDataFromServer(data) {
      return data
    }
  
    // Function to generate Thanks Letter
    async function generatePDFWithWatermark(htmlContent) {
      const browser = await puppeteer.launch({
        headless: true   });
      const page = await browser.newPage()
  
      // Load HTML content into the page
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' }) // Wait for image to load
  
      // Generate PDF
      const pdfBuffer = await page.pdf({ format: 'Legal' })
  
      // Save the pdf
      // await fs.writeFileSync('thanksLetter.pdf', pdfBuffer)
  
      // Close the browser
      await browser.close()
  
      return pdfBuffer
    }
  
    //transport for nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD
      },
    });
  
    try {
      // Fetch data from the server
      const data = await fetchDataFromServer(req.body)
  
      // Generate HTML content
      // const output = fs.readFileSync(path.join(__dirname, 'output.css'), 'utf8')
      const htmlContent = await thanksLetter(data)
  
      // Generate PDF with watermark using Puppeteer
      const pdfBuffer = await generatePDFWithWatermark(htmlContent)
  
      //Email thanksLetter to receiver
        await transporter.sendMail({
            from: {
              name: 'SAI Server',
              address: 'atharva.wagh@somaiya.edu'
            },
            to: data.email,
            subject: 'Thanks Letter from SAI',
            text: 'This is a server generated email please do not reply.',
            attachments: [
              {
                filename: data.donorName + 'thanksLetter.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
              }
            ]
          });
    
      res.status(200).send("Email Sent Successfully")
  
    } catch (error) {
      console.error('Error Sending Email:', error)
      res.status(500).send('Internal Server Error')
    }
})


// !!!!!!!!!!!! Receipt Email Route
const emailReceipt = asyncHandler(async(req, res, next) =>{
    // Create PDF using Puppeteer
    async function generatePDFWithWatermark(htmlContent) {
      const browser = await puppeteer.launch({
        headless: true    })
      const page = await browser.newPage()
  
      // Load HTML content into the page
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
  
      // Generate PDF
      const pdfBuffer = await page.pdf({ format: 'Legal' })
  
      // Save the pdf
      // await fs.writeFileSync('receipt.pdf', pdfBuffer)
  
      // Close the browser
      await browser.close()
  
      return pdfBuffer
    }

        //transport for nodemailer
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.PASSWORD
          },
        });
  
    try {
      // Fetch data from the server
      const data = req.body
  
      // Generate HTML content
      // const output = fs.readFileSync(
      //     path.join(__dirname, 'receipt.css'),
      //   'utf8'
      // )
      const htmlContent = await receipt(data)
  
      // Generate PDF with watermark using Puppeteer
      const pdfBuffer = await generatePDFWithWatermark(htmlContent)
  
           //Email thanksLetter to receiver
           await transporter.sendMail({
            from: {
              name: 'SAI Server',
              address: 'atharva.wagh@somaiya.edu'
            },
            to: data.email,
            subject: 'Receipt for your donation from SAI',
            text: 'This is a server generated email please do not reply.',
            attachments: [
              {
                filename: 'receipt.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
              }
            ]
          });
    
      res.status(200).send("Receipt Email Sent Successfully")
    } catch (error) {
      console.error('Error Sending Email:', error)
      res.status(500).send('Internal Server Error')
    }
})


// !!!!!!!!!!! EightyG Route
const emailEightyG = asyncHandler(async(req, res, next) => {
  async function generatePDFWithWatermark(htmlContent) {
    const browser = await puppeteer.launch({
      headless: true    })
    const page = await browser.newPage()

    // Load HTML content into the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' }) // Wait for image to load

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'Legal' })

    // Save the pdf
    // await fs.writeFileSync('eightyG.pdf', pdfBuffer)

    // Close the browser
    await browser.close()

    return pdfBuffer
  }

      //transport for nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.PASSWORD
        },
      });

  try {
    // Fetch data from the server
    const data = req.body

    // Generate HTML content
    // const output = fs.readFileSync(
    //     path.join(__dirname, 'eightyG.css'),
    //   'utf8'
    // )
    const htmlContent = await eightyG(data)

    // Generate PDF with watermark using Puppeteer
    const pdfBuffer = await generatePDFWithWatermark(htmlContent)

           //Email thanksLetter to receiver
           await transporter.sendMail({
            from: {
              name: 'SAI Server',
              address: 'atharva.wagh@somaiya.edu'
            },
            to: data.email,
            subject: 'Eighty G Certificate from SAI for your donation',
            text: 'This is a server generated email please do not reply.',
            attachments: [
              {
                filename: 'eightyG.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
              }
            ]
          });
    
      res.status(200).send("Email Sent Successfully")
  } catch (error) {
    console.error('Error Sending Email:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = { generateThanks, generateReceipt, generateEightyG, generateEmail, emailReceipt, emailEightyG }
