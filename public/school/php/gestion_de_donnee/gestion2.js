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

        // Fonctions pour la démonstration interactive
        function testerHachage() {
            const password = document.getElementById('password-input').value;
            const resultDiv = document.getElementById('security-result');
            
            resultDiv.innerHTML = `<span style="color: #f72585;">>> Test de hachage pour: "${password}"</span><br><br>`;
            
            // Simulation de différents algorithmes
            resultDiv.innerHTML += `<span style="color: #4cc9f0;">MD5 (DANGEREUX):</span> ${md5(password)}<br>`;
            resultDiv.innerHTML += `<span style="color: #f72585;">SHA1 (OBSOLÈTE):</span> ${sha1(password)}<br>`;
            resultDiv.innerHTML += `<span style="color: #90e0ef;">BCRYPT (SÉCURISÉ):</span> ${simulerBcrypt(password)}<br><br>`;
            
            resultDiv.innerHTML += `<span style="color: #8d99ae;">→ En production, utilisez toujours password_hash() avec PASSWORD_DEFAULT</span>`;
        }

        function comparerAlgorithmes() {
            const resultDiv = document.getElementById('security-result');
            
            resultDiv.innerHTML = `<span style="color: #f72585;">>> Comparaison des algorithmes de hachage</span><br><br>`;
            
            resultDiv.innerHTML += `
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                    <tr style="background-color: #3a0ca3;">
                        <th style="padding: 8px; border: 1px solid #4361ee;">Algorithme</th>
                        <th style="padding: 8px; border: 1px solid #4361ee;">Sécurité</th>
                        <th style="padding: 8px; border: 1px solid #4361ee;">Vitesse</th>
                        <th style="padding: 8px; border: 1px solid #4361ee;">Recommandation</th>
                    </tr>
                    <tr style="background-color: #14213d;">
                        <td style="padding: 8px; border: 1px solid #4361ee;">MD5</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #f72585;">❌ Très faible</td>
                        <td style="padding: 8px; border: 1px solid #4361ee;">Rapide</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #f72585;">À bannir</td>
                    </tr>
                    <tr style="background-color: #14213d;">
                        <td style="padding: 8px; border: 1px solid #4361ee;">SHA1</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #f72585;">❌ Faible</td>
                        <td style="padding: 8px; border: 1px solid #4361ee;">Rapide</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #f72585;">Déconseillé</td>
                    </tr>
                    <tr style="background-color: #14213d;">
                        <td style="padding: 8px; border: 1px solid #4361ee;">BCRYPT</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #90e0ef;">✅ Forte</td>
                        <td style="padding: 8px; border: 1px solid #4361ee;">Lente</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #90e0ef;">Recommandé</td>
                    </tr>
                    <tr style="background-color: #14213d;">
                        <td style="padding: 8px; border: 1px solid #4361ee;">ARGON2</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #90e0ef;">✅ Très forte</td>
                        <td style="padding: 8px; border: 1px solid #4361ee;">Lente</td>
                        <td style="padding: 8px; border: 1px solid #4361ee; color: #90e0ef;">Meilleur choix</td>
                    </tr>
                </table>
            `;
        }

        function genererTokenCSRF() {
            const resultDiv = document.getElementById('security-result');
            
            // Simulation de génération de token CSRF
            const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            
            resultDiv.innerHTML = `<span style="color: #f72585;">>> Token CSRF généré :</span><br><br>`;
            resultDiv.innerHTML += `<span style="color: #90e0ef; word-break: break-all;">${token}</span><br><br>`;
            resultDiv.innerHTML += `<span style="color: #8d99ae;">→ À inclure dans les formulaires comme champ hidden</span>`;
        }

        // Fonctions de simulation de hachage
        function md5(str) {
            // Simulation simple pour la démo
            return 'e99a18c428cb38d5f260853678922e03';
        }

        function sha1(str) {
            // Simulation simple pour la démo
            return '2aab6a67dd2a7a2b7c3a7a8a9a0a1a2a3a4a5a6a7';
        }

        function simulerBcrypt(str) {
            // Simulation d'un hash bcrypt
            return '$2y$12$QjSH496pcT5CEbzjD/vtVeH03tfHKFy36d4J0Ltp3lRtee9HDxY3K';
        }