//Exemple sur l'inventaire crari
let inv = ["épée"];
let invSpan = null;

function ajouterObjet() {
    inv.push("potion");
    majInv();

}

function retirerObjet() {
    if(inv.length > 0) inv.pop();
    majInv();
}

function resetInv() {
    inv = ["épée"];
    majInv();
}

function majInv() {
    invSpan = invSpan || document.getElementById('inv-list');
    invSpan.textContent = inv.length === 0 ? "—vide—" : inv.join(", ");
}

let reset = document.getElementById('resetBtn')
reset.addEventListener("click" , resetInv)

let pop = document.getElementById('popBtn')
pop.addEventListener("click" , retirerObjet)

let push = document.getElementById('pushBtn')
push.addEventListener("click" , ajouterObjet)



//Exemple avec le carré qui bouge (manque d'inspi visiblement)

function moveSquare(){
    var carre = document.getElementById('carre');
    carre.style.left = Math.round(40+Math.random()*180)+'px';
    carre.style.background='#2fb6c0';
    setTimeout(()=>{carre.style.background='#70e6e6'},600);
}

let interA;
function animeLoop() {
    clearInterval(interA);
    let carre = document.getElementById('carre');
        interA = setInterval(() => {
          carre.style.left = Math.round(20+Math.random()*180)+'px';
          carre.style.background = "#41a97c";
          setTimeout(()=>{carre.style.background='#70e6e6';},510);
        }, 800);
    setTimeout(()=>clearInterval(interA), 5000);
}

let moveBox = document.getElementById('moveBox');
moveBox.addEventListener("click" , moveSquare);

let autoAnimBtn = document.getElementById('autoAnimBtn');
autoAnimBtn.addEventListener("click" , animeLoop);