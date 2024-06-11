const Company = require('../models/Company');
const nodemailer = require('nodemailer');
const { parse } = require('csv-parse');
const fs = require('fs');

exports.createCompany = async (req, res) => {
  const { name, description } = req.body;
  try {
    const company = new Company({ name, description });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCompanies = async (req, res) => {
  const { search } = req.query;
  try {
    const query = search ? { $text: { $search: search } } : {};
    const companies = await Company.find(query);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).send('Company not found');
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.sendInquiry = async (req, res) => {
  const { id } = req.params;
  const { email, message } = req.body;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Inquiry about ${company.name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Inquiry sent');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.bulkUploadCompanies = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const companies = [];
  fs.createReadStream(file.path)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      const [name, description] = row;
      companies.push({ name, description });
    })
    .on('end', async () => {
      try {
        await Company.insertMany(companies);
        res.status(201).send('Companies uploaded successfully');
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
};
