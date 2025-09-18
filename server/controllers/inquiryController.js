const Inquiry = require('../models/Inquiry');

const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      marketingOptIn: Boolean(req.body.marketingOptIn),
    });

    res.status(201).json({
      id: inquiry._id,
      createdAt: inquiry.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

const listInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, listInquiries };
