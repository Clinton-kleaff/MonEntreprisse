import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    isReplied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;