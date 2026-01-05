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

  console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS existe:', !!process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // pour le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
  console.log('Transporteur créé');

  const mailOptions = {
    from: email,
    to: 'israelkokesha2@gmail.com',
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
  console.error('Erreur envoi email:', error); // garde cette ligne
  res.status(500).json({ 
    success: false,
    error: "Erreur lors de l'envoi de l'email",
    details: error.message  // <-- ajoute ça si tu veux le voir côté front
  });
}


};