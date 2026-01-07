
        function runDemo() {
            const output = document.getElementById('demo-output');
            output.innerHTML = '';
            let num = prompt("Entrez un entier");
            


            
            let html = '<strong>Table de multiplication de 7:</strong><br>';
            
            for (let i = 1; i <= 10; i++) {
                const resultat = num * i;
                html += `${num} × ${i} = ${resultat}<br>`;
            }
            
            output.innerHTML = html;
        }