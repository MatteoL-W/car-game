/* VARIABLES */

const img = new Image();
      img.src = 'assets/canvas/bg-default.png',
      audio_explosion = new Audio("assets/sound/explosion.mp3"),
      voitures = [
        [1366, 0],
        [1366, 256],
        [1366, 512],
        [1622, 0],
        [1622, 256],
        [1878, 0]],
    emplacements = [115,415,715,1015],
    divVoitures = document.getElementById('voitures');

let canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    gamePlaying = false,
    index = 1,
    speed = 2,
    bestScore = 0,
    clientX,
    clientY,
    emplacement = [],
    vitesse = [],
    voiture = [],
    score,
    init = false,
    myCar = voitures[0];


canvas.width = 1366;
canvas.height = 766;

/* AUGMENTATION DE LA VITESSE */

const render = () => {
    
    if (gamePlaying) {
        index++;

        /* BACKGROUND */
        c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed * 2) % canvas.height - canvas.height, canvas.width, canvas.height);
        c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed * 2) % canvas.height, canvas.width, canvas.height);
    
        /* MY CAR */
        c.drawImage(img, ...myCar, 256, 256, voitureClientX(), 460 /* hauteur figé*/, 256, 256);
    
        /* CURSOR */
        c.beginPath();
        c.arc(clientX - (window.innerWidth - canvas.width)/2, clientY, 10, 0, 2 * Math.PI);
        c.fillStyle='white';
        c.strokeStyle='white';
        c.fill();
        c.stroke();
    
        c.font = "48px Calibri";
    
        if (init) {
            let hauteur = speed*index*3 % (canvas.height+250) - 250;

            for (let i = 1; i < 4; i++) {
                c.drawImage(img, ...voitures[voiture[i]] , 256, 256, emplacements[emplacement[i]] /*x*/, hauteur /*y*/, 256, 256);

                // SI COLLISION
                if (hauteur > 260 && hauteur < 670) {
                    if (voitureClientX() > emplacements[emplacement[i]] - 128 && voitureClientX() < emplacements[emplacement[i]] + 128) {
                        
                        c.drawImage(img, 1622, 512, 256, 256, voitureClientX(), 460, 256, 256);
                        audio_explosion.play();
                        score = 0;
                        divVoitures.style.display='block';
                        gamePlaying = false;

                    }
                }
            }

            if (hauteur < -240) {
                init = 0;
                setup();
            }
        }

        bestScore = Math.floor(Math.max(bestScore, index/2));
        score = Math.floor(index/2);
    
        c.fillText("Meilleur score: " + bestScore,120,50);
        c.fillText("Score actuel: " + score,120,100);

    } else {
        index = 0;
        c.fillStyle = '#528e2b';
        c.fillRect(0,0,canvas.width,canvas.height);
        
        c.fillStyle = 'white';
        c.font = "40px Calibri";
        c.fillText("Votre meilleur score: " + bestScore,50,100);
        c.fillText("Cliquez sur votre voiture pour commencer ", canvas.width / 2 - 350, canvas.height /2 + 300);

        canvas.style.cursor = 'pointer';
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
    canvas.style.cursor = 'none';
    if (gamePlaying == true) {
        init = true;
        emplacement = [];
        let nombre = [0,1,2,3];
    
        for (let i = 1; i < 6; i++) {
            voiture[i] = Math.floor(Math.random() * voitures.length);
        }
    
        for (let i = 0; i < 4; i++) {
            let aleat = Math.floor(Math.random() * nombre.length);
            emplacement[i] = nombre[aleat];
            nombre.splice(aleat,1);
        }
    }
}

function changerMyCar(valeur) {
    myCar = voitures[valeur];
    divVoitures.style.display='none';
    gamePlaying = true;
    setup();

}


img.onload = render;





