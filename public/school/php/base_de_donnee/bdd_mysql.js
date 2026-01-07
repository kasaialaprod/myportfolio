
        
        // Données simulées pour la démonstration
        const utilisateurs = [
            { id: 1, nom: "Alice Martin", email: "alice@example.com", age: 28 },
            { id: 2, nom: "Bob Dupont", email: "bob@example.com", age: 32 },
            { id: 3, nom: "Charlie Wilson", email: "charlie@example.com", age: 24 },
            { id: 4, nom: "Diana Lee", email: "diana@example.com", age: 29 },
            { id: 5, nom: "Eve Johnson", email: "eve@example.com", age: 35 }
        ];
        
        // Fonction pour exécuter les requêtes SQL simulées
        function executerRequete() {
            const input = document.getElementById('sqlInput').value.trim();
            const resultDiv = document.getElementById('sqlResult');
            
            resultDiv.innerHTML = `<span style="color: #f72585;">>> Exécution de: ${query}</span><br><br>`;
            
            // Simulation basique d'un interpréteur SQL
            if (query.toUpperCase().startsWith('SELECT')) {
                // Simulation SELECT
                let conditions = [];
                

                
                if (query.includes('WHERE')) {
                    const whereClause = query.split('WHERE')[1];
                    
                    switch(true) {
                        case whereClause.includes('age >'):
                            const ageValue = parseInt(whereClause.split('age >')[1]);
                            conditions = utilisateurs.filter(u => u.age > ageValue);
                        case whereClause.includes('nom LIKE'):
                            // handled below
                            break;
                        default:
                            conditions = utilisateurs;
                    }
                }else {
                    conditions = utilisateurs;
                }
                
                // Affichage des résultats
                if (conditions.length > 0) {
                    resultDiv.innerHTML += `<span style="color: #4cc9f0;">${conditions.length} résultat(s) trouvé(s):</span><br><br>`;
                    
                    // Création d'un tableau pour afficher les résultats
                    let tableHTML = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">';
                    tableHTML += '<tr style="background-color: #3a0ca3;">';
                    tableHTML += '<th style="padding: 8px; border: 1px solid #4361ee;">ID</th>';
                    tableHTML += '<th style="padding: 8px; border: 1px solid #4361ee;">Nom</th>';
                    tableHTML += '<th style="padding: 8px; border: 1px solid #4361ee;">Email</th>';
                    tableHTML += '<th style="padding: 8px; border: 1px solid #4361ee;">Age</th>';
                    tableHTML += '</tr>';
                    
                    conditions.forEach(user => {
                        tableHTML += `<tr style="background-color: #14213d;">`;
                        tableHTML += `<td style="padding: 8px; border: 1px solid #4361ee;">${user.id}</td>`;
                        tableHTML += `<td style="padding: 8px; border: 1px solid #4361ee;">${user.nom}</td>`;
                        tableHTML += `<td style="padding: 8px; border: 1px solid #4361ee;">${user.email}</td>`;
                        tableHTML += `<td style="padding: 8px; border: 1px solid #4361ee;">${user.age}</td>`;
                        tableHTML += `</tr>`;
                    });
                    
                    tableHTML += '</table>';
                    resultDiv.innerHTML += tableHTML;
                } else {
                    resultDiv.innerHTML += '<span style="color: #f72585;">Aucun résultat trouvé</span>';
                }
                
            } else if (query.toUpperCase().startsWith('INSERT')) {
                resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Enregistrement inséré avec succès (simulation)</span>';
            } else if (query.toUpperCase().startsWith('UPDATE')) {
                resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Enregistrement modifié avec succès (simulation)</span>';
            } else if (query.toUpperCase().startsWith('DELETE')) {
                resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Enregistrement supprimé avec succès (simulation)</span>';
            } else {
                resultDiv.innerHTML += '<span style="color: #f72585;">Erreur: Requête non reconnue</span>';
            }
        }
        
        // Exemples de requêtes
        function exempleSelect() {
            document.getElementById('sql-query').value = "SELECT XX FROM XX;";
        }
        
        function exempleInsert() {
            document.getElementById('sql-query').value = "INSERT INTO utilisateurs (nom, email, age) VALUES ('XX', 'XX', XX);";
        }
        
        function exempleUpdate() {
            document.getElementById('sql-query').value = "UPDATE utilisateurs SET age = XX WHERE nom = 'XX';";
        }

        /* utile pour la database
        function processFormData() {

  let email = document.getElementById('email').value;
  let password = document.getElementById('pass').value;
  let isSubscribed = document.getElementById('subscribe').checked;

  //Insert data into table with predefined function
  insertdata(email, password, isSubscribed);
    
  // Clear the form fields
  document.getElementById('email').value = '';
  document.getElementById('pass').value = '';

}; */
