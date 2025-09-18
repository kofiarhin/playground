const { Schema, model } = require('mongoose');

const inquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    marketingOptIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model('Inquiry', inquirySchema);
