// Tableau de bord Mercedes - Logique JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const speedDisplay = document.querySelector('.speed-display');
    const rpmFill = document.querySelector('.rpm-fill');
    const gearDisplay = document.querySelector('.gear-display');
    
    // Variables de simulation
    let speed = 87;
    let rpm = 45;
    let gear = 'D';
    
    function updateDashboard() {
        // Variation aléatoire de la vitesse
        speed += (Math.random() - 0.5) * 2;
        speed = Math.max(0, Math.min(220, speed));
        
        // Variation aléatoire du RPM
        rpm += (Math.random() - 0.5) * 5;
        rpm = Math.max(0, Math.min(100, rpm));
        
        // Mise à jour des affichages
        speedDisplay.textContent = Math.round(speed) + 'km/h';
        rpmFill.style.width = rpm + '%';
        
        // Changement de vitesse en fonction de la vitesse
        if (speed < 20) gear = '1';
        else if (speed < 40) gear = '2';
        else if (speed < 60) gear = '3';
        else if (speed < 80) gear = '4';
        else if (speed < 100) gear = '5';
        else gear = '6';
        
        gearDisplay.textContent = gear;
    }
    
    // Mettre à jour le tableau de bord toutes les secondes
    setInterval(updateDashboard, 1000);
    
    // Fonctions supplémentaires
    function changeSpeed(newSpeed) {
        speed = newSpeed;
        updateDashboard();
    }
    
    function getCurrentSpeed() {
        return Math.round(speed);
    }
    
    // Exposer les fonctions globalement si nécessaire
    window.dashboard = {
        changeSpeed,
        getCurrentSpeed
    };
});