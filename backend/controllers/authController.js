import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { 
  sendResetPasswordEmail, 
  sendWelcomeEmail, 
  sendNewUserAlert,
  sendPasswordChangedEmail 
} from '../utils/emailService.js';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

// @desc    Register user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const user = await User.create({ name, email, password });
    
    sendWelcomeEmail(email, name).catch(console.error);
    sendNewUserAlert({ name, email }).catch(console.error);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur avec cet email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    await sendResetPasswordEmail(email, resetToken);
    res.json({ message: 'Email de réinitialisation envoyé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendPasswordChangedEmail(user.email, user.name).catch(console.error);

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Google OAuth callback handler
// @route   GET /api/auth/google/callback (handled by Passport)
export const googleCallbackHandler = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user._id);
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    // Use CLIENT_URL from .env, fallback to localhost for safety
    const clientUrl = process.env.CLIENT_URL || 'https://techsphere-qmbx.onrender.com';
    const redirectUrl = `${clientUrl}/login?token=${token}&user=${encodeURIComponent(
      JSON.stringify(userData)
    )}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google callback error:', error);
    const clientUrl = process.env.CLIENT_URL ||  'https://techsphere-qmbx.onrender.com';
    res.redirect(`${clientUrl}/login?error=google_auth_failed`);
  }
};