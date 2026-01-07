let courses = ["Pain", "Fromage", "Oeufs"];
        
        function mettreAJourAffichage() {
            const output = document.getElementById('array-output');
            output.innerHTML = `$courses = [${courses.map(item => `"${item}"`).join(", ")}];<br><br>`;
            output.innerHTML += `Contenu: ${courses.join(", ")}<br>`;
            output.innerHTML += `Nombre d'éléments: ${courses.length}`;
        }
        
        function ajouterElement() {
            courses.push("Lait");
            mettreAJourAffichage();
        }
        
        function supprimerElement() {
            if (courses.length > 0) {
                courses.pop();
                mettreAJourAffichage();
            }
        }
        
        function trierTableau() {
            courses.sort();
            mettreAJourAffichage();
        }
        
        function compterElements() {
            const output = document.getElementById('array-output');
            mettreAJourAffichage();
            output.innerHTML += `<br><span style="color: #f72585;">→ Le tableau contient ${courses.length} élément(s)</span>`;
        }
        
        function reinitialiser() {
            courses = ["Pain", "Fromage", "Oeufs"];
            mettreAJourAffichage();
        }