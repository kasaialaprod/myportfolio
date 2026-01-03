import 'dotenv/config';
import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
  console.log('Requête reçue !');
  console.log('Body:', req.body);
  
  const { name, email, message } = req.body;
  console.log('APRÈS DÉSTRUCTURATION');
  
  if (!name || !email || !message) {
    console.log('Champs manquants');
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  console.log('Champs validés');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD existe:', !!process.env.EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `[Portfolio] Message de ${name}`,
    text: `Nom: ${name}
    Email: ${email}

Message:
${message}`,
    html: `
      <h3>Nouveau message depuis ton portfolio</h3>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
  console.log('Tentative d\'envoi...');
  const info = await transporter.sendMail(mailOptions);
  console.log('Après sendMail');
  console.log('Email envoyé !', info.messageId);
  res.status(200).json({ success: true, message: "Email envoyé avec succès !" });
} catch (error) {
  console.error('Erreur envoi email:', error);
  res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
}

};