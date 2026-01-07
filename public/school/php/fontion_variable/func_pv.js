// Fonction pour exécuter le code dans la console interactive
        function executerCode() {
            const output = document.getElementById('console-output');
            const code = document.getElementById('code-editor').innerText;
            
            // Simulation basique d'exécution PHP
            output.innerHTML = '<span style="color: #f72585;">>> Exécution du code PHP:</span><br>';
            
            // Extraction du code entre les balises PHP
            const codeMatch = code.match(/&lt;\?php([\s\S]*?)\?&gt;/);
            if (codeMatch) {
                const phpCode = codeMatch[1].trim();
                
                // Simulation simple pour l'affichage
                if (phpCode.includes('calculerCarre')) {
                    output.innerHTML += 'Le carré de 5 est: 25<br>';
                } else if (phpCode.includes('saluerPersonne')) {
                    output.innerHTML += 'Bonjour Marie !<br>';
                } else {
                    output.innerHTML += '<span style="color: #90e0ef;">Code exécuté avec succès</span><br>';
                    output.innerHTML += '<span style="color: #8d99ae;">(Dans un environnement PHP réel, vous verriez le résultat de votre code ici)</span>';
                }
            } else {
                output.innerHTML += '<span style="color: #f72585;">Erreur: Code PHP non trouvé</span><br>';
            }
        }
        
        // Permettre la tabulation dans l'éditeur de code
        document.getElementById('code-editor').addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                document.execCommand('insertText', false, '    ');
            }
        });