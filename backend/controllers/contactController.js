import Contact from '../models/Contact.js';
import { sendContactNotification, sendContactAutoReply } from '../utils/emailService.js';

// @desc    Submit contact form
// @route   POST /api/contact
export const submitContact = async (req, res) => {
  const { email, message } = req.body;
  try {
    const contact = await Contact.create({ email, message });
    
    // Send notifications (non-blocking)
    sendContactNotification({ email, message }).catch(console.error);
    sendContactAutoReply(email).catch(console.error);

    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};