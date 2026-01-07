// Création d'un fond étoilé
        document.addEventListener('DOMContentLoaded', function() {
            const spaceBg = document.getElementById('space-bg');
            const starCount = 100;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.opacity = Math.random() * 0.7 + 0.3;
                
                spaceBg.appendChild(star);
            }
        });
        
        // Traitement du formulaire de démonstration
        function traiterFormulaire(event) {
            event.preventDefault();
            
            const form = document.getElementById('demo-form');
            const formData = new FormData(form);
            const resultDiv = document.getElementById('form-result');
            
            let resultHTML = '<span style="color: #f72585;">>> Données du formulaire :</span><br><br>';
            
            // Simulation du traitement PHP
            for (let [key, value] of formData.entries()) {
                if (key === 'langages[]') {
                    continue; // Géré séparément
                }
                resultHTML += `<strong>${key}:</strong> ${value}<br>`;
            }
            
            // Gestion des cases à cocher multiples
            const langages = formData.getAll('langages[]');
            if (langages.length > 0) {
                resultHTML += `<strong>langages:</strong> ${langages.join(', ')}<br>`;
            }
            
            resultDiv.innerHTML = resultHTML;
            return false;
        }
        
        // Simulation de soumission PHP
        function simulerSoumission() {
            const resultDiv = document.getElementById('simulation-result');
            
            resultDiv.innerHTML = `
                <span style="color: #f72585;">>> Simulation de traitement PHP :</span><br><br>
                <span style="color: #4cc9f0;">// Récupération des données</span><br>
                $nom = \$_POST['nom'];<br>
                $email = \$_POST['email'];<br>
                $sujet = \$_POST['sujet'];<br>
                $message = \$_POST['message'];<br>
                <br>
                <span style="color: #4cc9f0;">// Validation</span><br>
                if (empty($nom) || empty($email)) {<br>
                &nbsp;&nbsp;echo "Erreur: Champs obligatoires manquants";<br>
                } else {<br>
                &nbsp;&nbsp;<span style="color: #4cc9f0;">// Traitement sécurisé</span><br>
                &nbsp;&nbsp;$nom_secure = htmlspecialchars($nom);<br>
                &nbsp;&nbsp;$email_secure = filter_var($email, FILTER_SANITIZE_EMAIL);<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;echo "Formulaire traité avec succès!";<br>
                &nbsp;&nbsp;echo "Bonjour $nom_secure, nous vous répondrons à $email_secure";<br>
                }<br>
                <br>
                <span style="color: #90e0ef;">→ Dans un vrai script PHP, les données seraient maintenant traitées</span>
            `;
        }
        
        // Affichage du code de traitement
        function afficherCodeTraitement() {
            const resultDiv = document.getElementById('simulation-result');
            
            resultDiv.innerHTML = `
                <span style="color: #f72585;">>> Code PHP complet pour traiter le formulaire :</span><br><br>
                <span style="color: #4cc9f0;">&lt;?php</span><br>
                if (\$_SERVER['REQUEST_METHOD'] === 'POST') {<br>
                &nbsp;&nbsp;<span style="color: #4cc9f0;">// Récupération et nettoyage</span><br>
                &nbsp;&nbsp;$nom = htmlspecialchars(trim(\$_POST['nom']));<br>
                &nbsp;&nbsp;$email = filter_var(trim(\$_POST['email']), FILTER_SANITIZE_EMAIL);<br>
                &nbsp;&nbsp;$sujet = htmlspecialchars(trim(\$_POST['sujet']));<br>
                &nbsp;&nbsp;$message = htmlspecialchars(trim(\$_POST['message']));<br>
                &nbsp;&nbsp;$newsletter = isset(\$_POST['newsletter']) ? 1 : 0;<br>
                &nbsp;&nbsp;$langages = isset(\$_POST['langages']) ? \$_POST['langages'] : [];<br>
                <br>
                &nbsp;&nbsp;<span style="color: #4cc9f0;">// Validation</span><br>
                &nbsp;&nbsp;$erreurs = [];<br>
                &nbsp;&nbsp;if (empty($nom)) $erreurs[] = "Le nom est obligatoire";<br>
                &nbsp;&nbsp;if (empty($email)) {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;$erreurs[] = "L'email est obligatoire";<br>
                &nbsp;&nbsp;} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;$erreurs[] = "L'email n'est pas valide";<br>
                &nbsp;&nbsp;}<br>
                &nbsp;&nbsp;if (empty($message)) $erreurs[] = "Le message est obligatoire";<br>
                <br>
                &nbsp;&nbsp;if (empty($erreurs)) {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4cc9f0;">// Traitement réussi</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;echo "Formulaire envoyé avec succès!";<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4cc9f0;">// Ici: envoi d'email, sauvegarde en BDD, etc.</span><br>
                &nbsp;&nbsp;} else {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #4cc9f0;">// Affichage des erreurs</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;foreach ($erreurs as $erreur) {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo "Erreur: $erreur&lt;br&gt;";<br>
                &nbsp;&nbsp;&nbsp;&nbsp;}<br>
                &nbsp;&nbsp;}<br>
                }<br>
                <span style="color: #4cc9f0;">?&gt;</span>
            `;
        }