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
        
        // Données simulées pour la démonstration
        const employes = [
            { id: 1, nom: "Alice Martin", salaire: 45000, departement: "Ventes" },
            { id: 2, nom: "Bob Dupont", salaire: 38000, departement: "Ventes" },
            { id: 3, nom: "Charlie Wilson", salaire: 52000, departement: "IT" },
            { id: 4, nom: "Diana Lee", salaire: 48000, departement: "Marketing" },
            { id: 5, nom: "Eve Johnson", salaire: 42000, departement: "IT" }
        ];
        
        const ventes = [
            { id: 1, employe_id: 1, montant: 1500, date_vente: "2024-01-15" },
            { id: 2, employe_id: 1, montant: 2300, date_vente: "2024-01-20" },
            { id: 3, employe_id: 2, montant: 1800, date_vente: "2024-01-18" },
            { id: 4, employe_id: 3, montant: 3200, date_vente: "2024-01-22" },
            { id: 5, employe_id: 4, montant: 1200, date_vente: "2024-01-25" },
            { id: 6, employe_id: 1, montant: 1900, date_vente: "2024-02-01" }
        ];
        
        // Fonction pour exécuter les requêtes SQL simulées
        function executerRequete() {
            const query = document.getElementById('sql-query').value.trim();
            const resultDiv = document.getElementById('sql-result');
            
            resultDiv.innerHTML = `<span style="color: #f72585;">>> Exécution de: ${query}</span><br><br>`;
            
            try {
                // Simulation basique d'un interpréteur SQL
                if (query.toUpperCase().includes('SELECT') && query.toUpperCase().includes('JOIN')) {
                    // Simulation de jointure avec agrégation
                    const resultats = [];
                    
                    employes.forEach(emp => {
                        const ventesEmp = ventes.filter(v => v.employe_id === emp.id);
                        const totalVentes = ventesEmp.reduce((sum, v) => sum + v.montant, 0);
                        
                        if (ventesEmp.length > 0) {
                            resultats.push({
                                nom: emp.nom,
                                departement: emp.departement,
                                total_ventes: totalVentes
                            });
                        }
                    });
                    
                    // Tri par total_ventes DESC
                    resultats.sort((a, b) => b.total_ventes - a.total_ventes);
                    
                    resultDiv.innerHTML += `<span style="color: #4cc9f0;">${resultats.length} résultat(s) trouvé(s):</span><br><br>`;
                    
                    // Création d'un tableau pour afficher les résultats
                    let tableHTML = '<table class="data-table">';
                    tableHTML += '<tr>';
                    tableHTML += '<th>Nom</th>';
                    tableHTML += '<th>Département</th>';
                    tableHTML += '<th>Total Ventes</th>';
                    tableHTML += '</tr>';
                    
                    resultats.forEach(row => {
                        tableHTML += '<tr>';
                        tableHTML += `<td>${row.nom}</td>`;
                        tableHTML += `<td>${row.departement}</td>`;
                        tableHTML += `<td>${row.total_ventes.toFixed(2)} €</td>`;
                        tableHTML += '</tr>';
                    });
                    
                    tableHTML += '</table>';
                    resultDiv.innerHTML += tableHTML;
                    
                } else if (query.toUpperCase().includes('GROUP BY')) {
                    resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Requête d\'agrégation exécutée avec succès</span>';
                } else if (query.toUpperCase().includes('WHERE')) {
                    resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Requête avec filtrage exécutée</span>';
                } else {
                    resultDiv.innerHTML += '<span style="color: #90e0ef;">→ Requête exécutée avec succès</span>';
                }
                
            } catch (error) {
                resultDiv.innerHTML += `<span style="color: #f72585;">Erreur SQL: ${error.message}</span>`;
            }
        }
        
        // Exemples de requêtes
        function exempleAgregation() {
            document.getElementById('sql-query').value = `SELECT departement, AVG(salaire) as salaire_moyen, COUNT(*) as nb_employes
FROM employes
GROUP BY departement
ORDER BY salaire_moyen DESC;`;
        }
        
        function exempleJointure() {
            document.getElementById('sql-query').value = `SELECT e.nom, e.departement, v.montant, v.date_vente
FROM employes e
LEFT JOIN ventes v ON e.id = v.employe_id
ORDER BY v.date_vente DESC;`;
        }
        
        function exempleFonctions() {
            document.getElementById('sql-query').value = `SELECT 
    nom,
    salaire,
    CASE 
        WHEN salaire > 50000 THEN 'Haut'
        WHEN salaire > 40000 THEN 'Moyen'
        ELSE 'Bas'
    END as categorie_salaire,
    ROUND(salaire * 1.1, 2) as salaire_augmente
FROM employes
ORDER BY salaire DESC;`;
        }