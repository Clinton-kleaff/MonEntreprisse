import Newsletter from '../models/Newsletter.js';
import { sendNewsletterConfirmation, sendNewsletterAdminAlert } from '../utils/emailService.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Cet email est déjà inscrit' });
    }
    await Newsletter.create({ email });
    
    // Send confirmation to the subscriber (modern card)
    sendNewsletterConfirmation(email).catch(console.error);
    
    // ✅ Send admin alert about new subscription
    sendNewsletterAdminAlert(email).catch(console.error);
    
    res.status(201).json({ message: 'Inscription réussie à la newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};