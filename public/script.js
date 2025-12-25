

console.log('Script chargé !');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM chargé !');
  
  const form = document.getElementById('contact'); // ✅ Nouveau nom
  console.log('Formulaire trouvé:', form);
  
  if (!form) {
    console.error('Le formulaire n\'a pas été trouvé !');
    return;
  }

  form.addEventListener('submit', async (e) => {
    console.log('Formulaire soumis !');
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    console.log('Données:', formData);

    try {
      console.log('Envoi de la requête...');
      
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Status:', response.status);

      const result = await response.json();
      console.log('Réponse:', result);
      
      if (result.success) {
        alert('Message envoyé avec succès !');
        e.target.reset();
      } else {
        alert('Erreur: ' + (result.error || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    }
  });
});
