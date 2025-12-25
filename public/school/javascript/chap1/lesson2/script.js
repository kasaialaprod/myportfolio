function welcomeHero(event){
    event.preventDefault(); // Annule le reload
    let heroName = document.getElementById('heroName').value;
    let welcomeMessage = document.getElementById('user-response');
    welcomeMessage.textContent = "Bienvenu " + heroName;
}