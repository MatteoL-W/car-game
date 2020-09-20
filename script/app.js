/* VARIABLES */

let canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    gamePlaying = true,
    index = 1,
    speed = 2,
    bestScore = 0,
    clientX,
    clientY,
    voitures = [
        [1366, 0],
        [1366, 256],
        [1366, 512],
        [1622, 0],
        [1366, 256]
    ],
    emplacement = [110, 408, 700, 998];

const img = new Image();
      img.src = 'assets/canvas/bg-default.png';


canvas.width = 1366;
canvas.height = 766;

/* AUGMENTATION DE LA VITESSE */
setInterval(() => speed = speed * 1.001, 100);

const render = () => {
    index++;

    /* BACKGROUND */
    c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed) % canvas.height - canvas.height, canvas.width, canvas.height);
    c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed) % canvas.height, canvas.width, canvas.height);

    /* MY CAR */
    c.drawImage(img, 1366, 0, 256, 256, voitureClientX(), 460 /* hauteur figé*/, 256, 256);

    c.drawImage(img, ...voitures[Math.floor(Math.random() * 5)] , 256, 256, emplacement[Math.floor(Math.random() * 4)] + (window.innerWidth - canvas.width)/2 /*x*/, 0 /*y*/, 256, 256);

    /* CURSOR */
    c.beginPath();
    c.arc(clientX - (window.innerWidth - canvas.width)/2, clientY, 10, 0, 2 * Math.PI);
    c.fillStyle='white';
    c.strokeStyle='white'
    c.fill();
    c.stroke();

    

    window.requestAnimationFrame(render);
}

/* MOUSEMOVE */
document.addEventListener("mousemove", function(e) {
    if (gamePlaying) {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    //e.clientX > 190 && e.clientX < 1336
});

/* NE PAS DEPASSER DU CADRE */
function voitureClientX() {
    if (clientX < 100 + (window.innerWidth - canvas.width)/2) return 100 + (window.innerWidth - canvas.width)/2 - 128 - (window.innerWidth - canvas.width)/2;
    else if (clientX > 1300 + (window.innerWidth - canvas.width)/2) return 1300 + (window.innerWidth - canvas.width)/2 - 128 - (window.innerWidth - canvas.width)/2;
    else return clientX - 128 - (window.innerWidth - canvas.width)/2;
}

function randomCar() {
   
    //c.drawImage(img, ...voitures[Math.floor(Math.random() * 5)] , 256, 256, emplacement[Math.floor(Math.random() * 4)] + (window.innerWidth - canvas.width)/2 /*x*/, 0 /*y*/, 256, 256);
}

function randomX() {}
// setInterval tous les 2s pour faire apparaitre une voiture avec APPARENCE RANDOM et un RANDOM X
// MEILLEUR SCORE (avec index ?)

img.onload = render;





