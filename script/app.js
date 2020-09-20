let canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    gamePlaying = true,
    index = 1,
    speed = 2,
    bestScore = 0,
    clientX,
    clientY;

const img = new Image();
      img.src = 'assets/canvas/bg-default.png';


canvas.width = 1366;
canvas.height = 766;

setInterval(() => speed = speed * 1.0001, 100);

const render = () => {
    index++;


    /* BACKGROUND */
    c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed) % canvas.height - canvas.height, canvas.width, canvas.height);
    c.drawImage(img, 0, 0, canvas.width, canvas.height, 0, (index * speed) % canvas.height, canvas.width, canvas.height);

    /* CAR */
    c.drawImage(img, 1366, 0, 256, 256, voitureClientX(), 460 /* hauteur figé*/, 256, 256);

    /* CURSOR */
    c.beginPath();
    c.arc(clientX - (window.innerWidth - canvas.width)/2, clientY, 10, 0, 2 * Math.PI);
    c.fillStyle='white';
    c.strokeStyle='white'
    c.fill();
    c.stroke();


    window.requestAnimationFrame(render);
}

document.addEventListener("mousemove", function(e) {
    if (gamePlaying) {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    //e.clientX > 190 && e.clientX < 1336
});

function voitureClientX() {
    if (clientX < 190) return 190 - 128 - (window.innerWidth - canvas.width)/2;
    else if (clientX > 1336) return 1336 - 128 - (window.innerWidth - canvas.width)/2;
    else return clientX - 128 - (window.innerWidth - canvas.width)/2;
}

img.onload = render;

function randomCar() {}
function randomX() {}
// setInterval tous les 2s pour faire apparaitre une voiture avec APPARENCE RANDOM et un RANDOM X
// MEILLEUR SCORE (avec index ?)