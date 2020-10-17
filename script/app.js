/* VARIABLES */

let canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    gamePlaying = false,
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
    emplacements = [115,415,715,1015],
    emplacement = [],
    vitesse = [],
    voiture = [],
    score,
    soustraction,
    init = false;

const img = new Image();
      img.src = 'assets/canvas/bg-default.png';


canvas.width = 1366;
canvas.height = 766;

/* AUGMENTATION DE LA VITESSE */

//setInterval(() => speed = speed * 1.0001, 100)

const render = () => {
    
    if (gamePlaying) {
        index++;

        /* BACKGROUND */
        c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed * 2) % canvas.height - canvas.height, canvas.width, canvas.height);
        c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed * 2) % canvas.height, canvas.width, canvas.height);
    
        /* MY CAR */
        c.drawImage(img, 1366, 0, 256, 256, voitureClientX(), 460 /* hauteur figé*/, 256, 256);
    
    
        /* CURSOR */
        c.beginPath();
        c.arc(clientX - (window.innerWidth - canvas.width)/2, clientY, 10, 0, 2 * Math.PI);
        c.fillStyle='white';
        c.strokeStyle='white'
        c.fill();
        c.stroke();
    
        c.font = "48px Calibri";
    
        if (init) {

            for (let i = 1; i < 4; i++) {
                c.drawImage(img, ...voitures[voiture[i]] , 256, 256, emplacements[emplacement[i]] /*x*/, speed*index*3 % (canvas.height+250) - 250 /*y*/, 256, 256);
            }

            if (speed*index*3 % (canvas.height+250) - 250 < -240) {
                init = 0;
                setup();
            }
        }
        
        bestScore = Math.floor(Math.max(bestScore, index/2));
        score = Math.floor(index/2);
    
        c.fillText("Meilleur score: " + bestScore,120,50);
        c.fillText("Score actuel: " + score,120,100);

    }

    window.requestAnimationFrame(render);
}

/* MOUSEMOVE */
document.addEventListener("mousemove", function(e) {
    if (gamePlaying) {
        clientX = e.clientX;
        clientY = e.clientY;
    }
});

/* NE PAS DEPASSER DU CADRE */
function voitureClientX() {
    if (clientX < 100 + (window.innerWidth - canvas.width)/2) return 100 + (window.innerWidth - canvas.width)/2 - 128 - (window.innerWidth - canvas.width)/2;
    else if (clientX > 1250 + (window.innerWidth - canvas.width)/2) return 1250 + (window.innerWidth - canvas.width)/2 - 128 - (window.innerWidth - canvas.width)/2;
    else return clientX - 128 - (window.innerWidth - canvas.width)/2;
}

function setup() {
    init = true;
    emplacement = [];
    let nombre = [0,1,2,3];

    for (let i = 1; i < 4; i++) {

        voiture[i] = Math.floor(Math.random() * voitures.length);

        temp = 2;
        emplacement[i] = nombre[temp];
        nombre.splice(0,temp);
        console.log(nombre.length);
    
    }

}



canvas.addEventListener('click', () => {if (gamePlaying == false) {gamePlaying = true; setup()}});

img.onload = render;





