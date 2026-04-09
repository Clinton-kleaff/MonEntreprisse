// utils/emailService.js
import SibApiV3Sdk from '@sendinblue/client';
import brevoAPI from '../config/brevo.js';

const adminEmail = process.env.ADMIN_EMAIL || 'admin@monentreprise.ht';

// Helper: get the client URL dynamically, fallback to production domain
const getClientUrl = () => {
  return process.env.CLIENT_URL || 'https://monentreprise.onrender.com';
};

// Re-usable email sender
export const sendEmail = async (to, subject, htmlContent) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = {
    email: process.env.BREVO_SENDER_EMAIL,
    name: process.env.BREVO_SENDER_NAME,
  };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    const response = await brevoAPI.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${to}`, response);
    return response;
  } catch (error) {
    console.error('Brevo email error:', error);
    throw new Error('Email could not be sent');
  }
};

// ---------- Base modern card wrapper (reusable) ----------
const getBaseTemplate = (content, title = '') => {
  const clientUrl = getClientUrl();
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; padding: 10px !important; }
        .card { padding: 20px !important; }
        .button { display: block !important; width: 100% !important; text-align: center !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f7fb; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width:600px; margin:0 auto; padding:20px;">
      <div class="card" style="background:#ffffff; border-radius:24px; box-shadow:0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02); overflow:hidden; padding:32px 28px;">
        ${content}
        <hr style="border:0; border-top:1px solid #e9eef3; margin:32px 0 20px;">
        <p style="margin:0; font-size:12px; color:#8898aa; text-align:center;">
          &copy; ${new Date().getFullYear()} MonEntreprise. Tous droits réservés.<br>
          <a href="${clientUrl}" style="color:#d81b60; text-decoration:none;">monentreprise.ht</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Helper to inject main content
const buildHtml = (innerHtml, title) => getBaseTemplate(innerHtml, title).replace('{{content}}', innerHtml);

// ---------- Templates ----------

// Welcome email (to new user)
export const sendWelcomeEmail = async (email, name) => {
  const clientUrl = getClientUrl();
  const inner = `
    <div style="text-align:center; margin-bottom:24px;">
      <h1 style="font-size:28px; font-weight:700; color:#1a2c3e; margin:0 0 8px;">Bienvenue chez MonEntreprise 🚀</h1>
      <p style="color:#5a6e8a; font-size:16px;">Nous sommes ravis de vous compter parmi nous</p>
    </div>
    <p style="font-size:16px; color:#2d3e50;">Bonjour <strong>${name}</strong>,</p>
    <p style="font-size:16px; color:#2d3e50;">Merci de vous être inscrit. Nous sommes impatients de vous accompagner dans votre transformation digitale.</p>
    <div style="background:#f8fafc; border-radius:16px; padding:20px; margin:24px 0;">
      <p style="margin:0 0 12px; font-weight:600;">✨ Découvrez nos services :</p>
      <a href="${clientUrl}/services" style="background:#d81b60; color:#ffffff; padding:12px 24px; border-radius:40px; text-decoration:none; display:inline-block; font-weight:500;">Explorer les services →</a>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Bienvenue chez MonEntreprise');
  return sendEmail(email, 'Bienvenue chez MonEntreprise', html);
};

// Admin alert on new user registration
export const sendNewUserAlert = async (userData) => {
  const inner = `
    <div style="border-left:4px solid #d81b60; padding-left:16px; margin-bottom:24px;">
      <h2 style="margin:0 0 4px; font-size:22px;">📢 Nouvel utilisateur inscrit</h2>
      <p style="margin:0; color:#5a6e8a;">${new Date().toLocaleString()}</p>
    </div>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0; border-bottom:1px solid #e9eef3;"><strong>Nom</strong></td><td style="padding:8px 0; border-bottom:1px solid #e9eef3;">${userData.name}</td></tr>
      <tr><td style="padding:8px 0; border-bottom:1px solid #e9eef3;"><strong>Email</strong></td><td style="padding:8px 0; border-bottom:1px solid #e9eef3;">${userData.email}</td></tr>
    </table>
  `;
  const html = getBaseTemplate(inner, 'Nouvelle inscription');
  return sendEmail(adminEmail, '📌 Nouvelle inscription utilisateur', html);
};

// Reset password email (to user)
export const sendResetPasswordEmail = async (email, resetToken) => {
  const clientUrl = getClientUrl();
  const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
  const inner = `
    <div style="text-align:center; margin-bottom:24px;">
      <h2 style="font-size:24px; color:#1a2c3e;">🔐 Réinitialisation du mot de passe</h2>
    </div>
    <p style="font-size:16px;">Bonjour,</p>
    <p style="font-size:16px;">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
    <div style="text-align:center; margin:28px 0;">
      <a href="${resetUrl}" class="button" style="background:#d81b60; color:#ffffff; padding:12px 28px; border-radius:40px; text-decoration:none; font-weight:600;">Réinitialiser mon mot de passe</a>
    </div>
    <p style="font-size:14px; color:#8898aa;">Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
  `;
  const html = getBaseTemplate(inner, 'Réinitialisation mot de passe');
  return sendEmail(email, 'Réinitialisation de votre mot de passe', html);
};

// Password changed confirmation
export const sendPasswordChangedEmail = async (email, name) => {
  const inner = `
    <div style="text-align:center;">
      <h2 style="font-size:24px; color:#1a2c3e;">✅ Mot de passe modifié</h2>
      <p style="font-size:16px;">Bonjour ${name}, votre mot de passe a été modifié avec succès.</p>
      <p style="font-size:14px; background:#fef2f2; padding:12px; border-radius:12px; color:#b91c1c;">Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.</p>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Confirmation modification mot de passe');
  return sendEmail(email, 'Votre mot de passe a été modifié', html);
};

// Contact notification to admin
export const sendContactNotification = async (contactData) => {
  const inner = `
    <div style="border-left:4px solid #d81b60; padding-left:16px;">
      <h2 style="margin:0 0 8px;">✉️ Nouveau message de contact</h2>
      <p><strong>Email :</strong> ${contactData.email}</p>
      <p><strong>Message :</strong><br>${contactData.message}</p>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Nouveau message contact');
  return sendEmail(adminEmail, '📬 Nouveau message de contact', html);
};

// Auto-reply to user after contact form
export const sendContactAutoReply = async (email) => {
  const clientUrl = getClientUrl();
  const inner = `
    <div style="text-align:center;">
      <h2 style="font-size:24px;">🙏 Merci de nous avoir contactés</h2>
      <p style="font-size:16px;">Notre équipe vous répondra dans les meilleurs délais (sous 24h).</p>
      <div style="margin:24px 0;">
        <a href="${clientUrl}/services" class="button" style="background:#d81b60; color:white; padding:10px 20px; border-radius:40px; text-decoration:none;">Découvrir nos services →</a>
      </div>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Confirmation de votre message');
  return sendEmail(email, 'Nous avons bien reçu votre message', html);
};

// Order notification to admin (modern card)
export const sendOrderNotification = async (orderData) => {
  const inner = `
    <div style="border-left:4px solid #d81b60; padding-left:16px; margin-bottom:20px;">
      <h2 style="margin:0 0 4px;">🛎️ Nouvelle demande de projet</h2>
      <p style="margin:0; color:#5a6e8a;">${new Date().toLocaleString()}</p>
    </div>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:8px 0;"><strong>Nom</strong></td><td>${orderData.name}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Email</strong></td><td>${orderData.email}</td></tr>
      <tr><td style="padding:8px 0;"><strong>Service</strong></td><td>${orderData.service}</td></tr>
      <tr><td style="padding:8px 0; vertical-align:top;"><strong>Message</strong></td><td>${orderData.message}</td></tr>
    </table>
  `;
  const html = getBaseTemplate(inner, 'Nouvelle commande');
  return sendEmail(adminEmail, '🆕 Nouvelle demande de projet', html);
};

// Order confirmation to user (card, responsive)
export const sendOrderConfirmationToUser = async (orderData) => {
  const clientUrl = getClientUrl();
  const inner = `
    <div style="text-align:center; margin-bottom:24px;">
      <h1 style="font-size:28px; color:#1a2c3e;">📦 Demande reçue !</h1>
      <p style="color:#5a6e8a;">Nous avons bien enregistré votre projet</p>
    </div>
    <p style="font-size:16px;">Bonjour <strong>${orderData.name}</strong>,</p>
    <p style="font-size:16px;">Merci d’avoir fait confiance à MonEntreprise. Voici le récapitulatif de votre demande :</p>
    <div style="background:#f8fafc; border-radius:20px; padding:20px; margin:24px 0;">
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Service demandé</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${orderData.service}</td></tr>
        <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><strong>Message</strong></td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${orderData.message}</td></tr>
        <tr><td style="padding:8px 0;"><strong>Référence</strong></td><td style="padding:8px 0;">#${Date.now().toString().slice(-6)}</td></tr>
      </table>
    </div>
    <p style="font-size:14px; color:#475569;">Notre équipe vous recontactera sous 24h pour valider les détails. En attendant, vous pouvez consulter nos services.</p>
    <div style="text-align:center; margin-top:24px;">
      <a href="${clientUrl}/services" style="background:#d81b60; color:white; padding:10px 20px; border-radius:40px; text-decoration:none;">Voir nos services →</a>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Confirmation de votre commande');
  return sendEmail(orderData.email, 'Confirmation de votre demande', html);
};

// Order status update email to client (enhanced card)
export const sendOrderStatusUpdate = async (order) => {
  const clientUrl = getClientUrl();
  let statusMessage = '';
  let statusIcon = '🔄';
  if (order.status === 'contacted') {
    statusMessage = 'Notre équipe a pris connaissance de votre demande et vous contactera très prochainement.';
    statusIcon = '📞';
  } else if (order.status === 'completed') {
    statusMessage = 'Votre projet est terminé. Nous espérons que vous êtes satisfait(e) ! N’hésitez pas à laisser un avis.';
    statusIcon = '✅';
  } else {
    statusMessage = `Le statut de votre demande a été mis à jour : ${order.status}.`;
  }
  const inner = `
    <div style="text-align:center;">
      <div style="font-size:48px;">${statusIcon}</div>
      <h2 style="font-size:24px;">Mise à jour de votre projet</h2>
    </div>
    <p>Bonjour <strong>${order.name}</strong>,</p>
    <div style="background:#f1f5f9; border-radius:16px; padding:16px; margin:24px 0;">
      <p style="margin:0;">${statusMessage}</p>
    </div>
    <p>Pour toute question, répondez à cet email ou visitez notre site.</p>
    <div style="text-align:center; margin-top:24px;">
      <a href="${clientUrl}" style="background:#d81b60; color:white; padding:10px 20px; border-radius:40px; text-decoration:none;">Accéder au site →</a>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Statut de votre commande');
  return sendEmail(order.email, `Votre projet : ${order.status === 'completed' ? 'Terminé' : 'Mis à jour'}`, html);
};

// Newsletter confirmation to user (card)
export const sendNewsletterConfirmation = async (email) => {
  const clientUrl = getClientUrl();
  const inner = `
    <div style="text-align:center;">
      <h2 style="font-size:26px;">📰 Abonnement confirmé</h2>
      <p style="font-size:18px; color:#2d3e50;">Merci de vous être abonné à notre newsletter !</p>
      <div style="background:#eef2ff; border-radius:20px; padding:20px; margin:24px 0;">
        <p style="margin:0;">✨ Vous recevrez nos actualités, offres exclusives et conseils digitaux directement dans votre boîte mail.</p>
      </div>
      <p style="font-size:14px;">À très bientôt,<br>L’équipe MonEntreprise</p>
      <div style="margin-top:24px;">
        <a href="${clientUrl}" style="background:#d81b60; color:white; padding:10px 20px; border-radius:40px; text-decoration:none;">Visiter le site →</a>
      </div>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Confirmation newsletter');
  return sendEmail(email, 'Confirmation d’inscription à la newsletter', html);
};

// Admin alert for new newsletter subscription
export const sendNewsletterAdminAlert = async (subscriberEmail) => {
  const inner = `
    <div style="border-left:4px solid #d81b60; padding-left:16px;">
      <h2 style="margin:0 0 8px;">📧 Nouvel abonné à la newsletter</h2>
      <p><strong>Email :</strong> ${subscriberEmail}</p>
      <p><strong>Date :</strong> ${new Date().toLocaleString()}</p>
    </div>
  `;
  const html = getBaseTemplate(inner, 'Nouvel abonné newsletter');
  return sendEmail(adminEmail, '📢 Nouvelle inscription à la newsletter', html);
};