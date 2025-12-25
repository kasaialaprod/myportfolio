const mots = ["SEMILLANT", "COLLINAIRE", "DAMASQUINE", "DIGITAL", "CHOCOLAT"];

let motChoisi = "";
let lettresTrouvees = [];
let lettresEssayees = [];
let essaisRestants = 8;

document.addEventListener("DOMContentLoaded", () => {
    const button2 = document.getElementById('nextWord');
    const wordDisplay = document.getElementById("wordToFind");
    const proposition = document.getElementById("props");
    const button1 = document.getElementById("testButton");
    const triesDisplay = document.getElementById("tries");
    const messageDisplay = document.getElementById("message");

    function start() {
        button2.textContent = "Next Word";
        gameOn();
    }

    function gameOn() {
        // Choisir un mot au hasard
        motChoisi = mots[Math.floor(Math.random() * mots.length)];
        lettresTrouvees = [];
        lettresEssayees = [];
        essaisRestants = 8;
        
        triesDisplay.textContent = essaisRestants;
        messageDisplay.textContent = "";
        proposition.disabled = false;
        button1.disabled = false;
    
        // Réinitialiser le pendu
        dessinerPendu(0);
    
        // Créer une version affichable (ex : S _ _ _ _ _ T)
        let motAffiche = "";
        for (let i = 0; i < motChoisi.length; i++) {
            if (i === 0 || i === motChoisi.length - 1) {
                motAffiche += motChoisi[i] + " ";
                // Ajouter première et dernière lettre aux lettres trouvées
                if (!lettresTrouvees.includes(motChoisi[i])) {
                    lettresTrouvees.push(motChoisi[i]);
                }
            } else {
                motAffiche += "_ ";
            }
        }
    
        // 👉 Afficher le mot sur la page
        wordDisplay.textContent = motAffiche.trim();
        proposition.value = "";
        proposition.focus();
    }

    // Fonction pour messages temporaires
    function afficherMessage(message, duree = 2000) {
        messageDisplay.textContent = message;
        setTimeout(() => {
            if (messageDisplay.textContent === message) {
                messageDisplay.textContent = "";
            }
        }, duree);
    }

    function testerLettre() {
        const lettre = proposition.value.toUpperCase();
    
        // Validation de l'input
        if (lettre.length !== 1 || !lettre.match(/[A-Z]/)) {
            afficherMessage("Veuillez entrer une lettre valide!");
            proposition.value = "";
            return;
        }
    
        // Vérifier si la lettre a déjà été essayée
        if (lettresEssayees.includes(lettre)) {
            afficherMessage("Vous avez déjà essayé cette lettre!");
            proposition.value = "";
            return;
        }
    
        // Ajouter aux lettres essayées
        lettresEssayees.push(lettre);
    
        // Vérifier si la lettre est dans le mot
        if (motChoisi.includes(lettre)) {
            lettresTrouvees.push(lettre);
            afficherMessage("Bonne lettre!");
        } else {
            essaisRestants--;
            triesDisplay.textContent = essaisRestants;
            
            // Dessiner le pendu (étape = 8 - essaisRestants)
            dessinerPendu(8 - essaisRestants);
            
            afficherMessage("Lettre incorrecte!");
            
            if (essaisRestants === 0) {
                // Dessiner le pendu complet
                dessinerPendu(10);
                finPartie(false);
                return;
            }
        }
    
        // Mettre à jour l'affichage du mot
        let motAffiche = "";
        for (let i = 0; i < motChoisi.length; i++) {
            // Toujours afficher la première et dernière lettre
            if (i === 0 || i === motChoisi.length - 1 || lettresTrouvees.includes(motChoisi[i])) {
                motAffiche += motChoisi[i] + " ";
            } else {
                motAffiche += "_ ";
            }
        }
    
        wordDisplay.textContent = motAffiche.trim();
        
        // Vérifier si le joueur a gagné
        const toutesLettresTrouvees = motChoisi.split('').every(lettre => 
            lettresTrouvees.includes(lettre)
        );
        
        if (toutesLettresTrouvees) {
            finPartie(true);
        }
        
        proposition.value = "";
        proposition.focus();
    }

    function finPartie(gagne) {
        if (gagne) {
            messageDisplay.textContent = "Félicitations! Vous avez trouvé le mot!";
        } else {
            messageDisplay.textContent = `Dommage! Le mot était: ${motChoisi}`;
            wordDisplay.textContent = motChoisi;
        }
        
        // Désactiver l'input et le bouton de test
        proposition.disabled = true;
        button1.disabled = true;
    }

    // Fonction pour dessiner le pendu
function dessinerPendu(etape) {
    const canvas = document.getElementById('pendu-canvas');
    const ctx = canvas.getContext('2d');
    const stepsDisplay = document.getElementById('pendu-steps');
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    
    // Mettre à jour l'affichage de l'étape
    stepsDisplay.textContent = `Étape: ${etape}/8`;
    
    // Dessiner étape par étape
    switch(etape) {
        case 1:
            // Base
            ctx.beginPath();
            ctx.moveTo(50, 350);
            ctx.lineTo(150, 350);
            ctx.stroke();
            break;
            
        case 2:
            // Poteau vertical
            dessinerPendu(1);
            ctx.beginPath();
            ctx.moveTo(100, 350);
            ctx.lineTo(100, 50);
            ctx.stroke();
            break;
            
        case 3:
            // Poteau horizontal
            dessinerPendu(2);
            ctx.beginPath();
            ctx.moveTo(100, 50);
            ctx.lineTo(200, 50);
            ctx.stroke();
            break;
            
        case 4:
            // Corde
            dessinerPendu(3);
            ctx.beginPath();
            ctx.moveTo(200, 50);
            ctx.lineTo(200, 100);
            ctx.stroke();
            break;
            
        case 5:
            // Tête
            dessinerPendu(4);
            ctx.beginPath();
            ctx.arc(200, 120, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
            
        case 6:
            // Corps
            dessinerPendu(5);
            ctx.beginPath();
            ctx.moveTo(200, 140);
            ctx.lineTo(200, 240);
            ctx.stroke();
            break;
            
        case 7:
            // Bras gauche
            dessinerPendu(6);
            ctx.beginPath();
            ctx.moveTo(200, 160);
            ctx.lineTo(170, 200);
            ctx.stroke();
            break;
            
        case 8:
            // Bras droit
            dessinerPendu(7);
            ctx.beginPath();
            ctx.moveTo(200, 160);
            ctx.lineTo(230, 200);
            ctx.stroke();
            break;
            
        case 9:
            // Jambe gauche
            dessinerPendu(8);
            ctx.beginPath();
            ctx.moveTo(200, 240);
            ctx.lineTo(170, 300);
            ctx.stroke();
            break;
            
        case 10:
            // Jambe droite (pendu complet)
            dessinerPendu(9);
            ctx.beginPath();
            ctx.moveTo(200, 240);
            ctx.lineTo(230, 300);
            ctx.stroke();
            
            // Visage triste
            ctx.beginPath();
            ctx.arc(195, 115, 3, 0, Math.PI * 2); // Œil gauche
            ctx.fill();
            ctx.beginPath();
            ctx.arc(205, 115, 3, 0, Math.PI * 2); // Œil droit
            ctx.fill();
            ctx.beginPath();
            ctx.arc(200, 125, 8, 0, Math.PI); // Bouche triste
            ctx.stroke();
            break;
    }
}
// Version alternative avec un pendu plus détaillé
function dessinerPenduDetaille(etape) {
    const canvas = document.getElementById('pendu-canvas');
    const ctx = canvas.getContext('2d');
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#8B4513'; // Couleur bois
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Dessin progressif
    const etapes = [
        () => { /* Étape 0: rien */ },
        () => { // Base
            ctx.moveTo(50, 350); ctx.lineTo(150, 350);
        },
        () => { // Poteau vertical
            ctx.moveTo(100, 350); ctx.lineTo(100, 50);
        },
        () => { // Poteau horizontal
            ctx.moveTo(100, 50); ctx.lineTo(200, 50);
        },
        () => { // Corde
            ctx.moveTo(200, 50); ctx.lineTo(200, 100);
        },
        () => { // Tête
            ctx.beginPath(); ctx.arc(200, 120, 20, 0, Math.PI * 2); ctx.stroke();
        },
        () => { // Corps
            ctx.beginPath(); ctx.moveTo(200, 140); ctx.lineTo(200, 240); ctx.stroke();
        },
        () => { // Bras gauche
            ctx.beginPath(); ctx.moveTo(200, 160); ctx.lineTo(170, 200); ctx.stroke();
        },
        () => { // Bras droit
            ctx.beginPath(); ctx.moveTo(200, 160); ctx.lineTo(230, 200); ctx.stroke();
        },
        () => { // Jambe gauche
            ctx.beginPath(); ctx.moveTo(200, 240); ctx.lineTo(170, 300); ctx.stroke();
        },
        () => { // Jambe droite + visage
            ctx.beginPath(); ctx.moveTo(200, 240); ctx.lineTo(230, 300); ctx.stroke();
            // Visage triste
            ctx.beginPath(); ctx.arc(195, 115, 3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(205, 115, 3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(200, 130, 8, 0.1, Math.PI - 0.1); ctx.stroke();
        }
    ];
    
    // Dessiner toutes les étapes jusqu'à l'étape actuelle
    ctx.beginPath();
    for (let i = 1; i <= etape; i++) {
        etapes[i]();
    }
    ctx.stroke();
    
    // Mettre à jour l'affichage
    document.getElementById('pendu-steps').textContent = `Étape: ${etape}/10`;
}

    button2.addEventListener("click", start);
    button1.addEventListener("click", testerLettre);
    
    // Démarrer le jeu
    gameOn();
});