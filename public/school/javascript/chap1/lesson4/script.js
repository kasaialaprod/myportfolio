document.addEventListener("keydown", function(event) {
    let key = document.getElementById('key-event')
    key.style.borderRadius='50%'
    key.style.background='#0000ff'
});


function changeOutfit(){
    let heros = document.getElementById('heros')
    heros.style.backgroundColor='#253751';
    heros.style.color='#ffe38f';
    heros.style.border='3px solid #60e6da';
}

function epee() {
    let coffre = document.createElement('div');
    coffre.textContent='🗡️ Nouvelle épée ajoutée !';
    coffre.style.background='#e1f7ef';
    coffre.style.color='#253751';
    coffre.style.border='2px solid #60e6da';
    coffre.style.margin='7px 0 0 0';
    coffre.style.borderRadius='7px';
    document.getElementById('zone-jeu').appendChild(coffre);
    setTimeout(()=>{coffre.remove();}, 2400);
}

function powAct(){
    alert("Pouvoir Activé !!!");
}

let power = document.getElementById('bouton');
power.addEventListener("click", powAct);