import 'dotenv/config';

export const sendContactEmail = async (req, res) => {
  console.log('Requête reçue !');
  console.log('Body:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('Champs manquants');
    return res.status(400).json({ success: false, error: 'Tous les champs sont requis' });
  }

  try {
    console.log('Envoi via Brevo API...');

    const toEmail = process.env.CONTACT_TO || 'israelkokesha2@gmail.com';

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio Israël',
          email: toEmail     // adresse vérifiée sur Brevo
        },
        to: [
          {
            email: 'israelkokesha2@gmail.com',
            name: 'Israël'
          }
        ],
        replyTo: {
          email,
          name
        },
        subject: `[Portfolio] Message de ${name}`,
        htmlContent: `
          <h3>Nouveau message depuis ton portfolio</h3>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        textContent: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      })
    });

    const data = await response.json();
    console.log('Réponse Brevo:', response.status, data);

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: 'Erreur Brevo',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès !'
    });
  } catch (error) {
    console.error('Erreur API Brevo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message
    });
  }
};
