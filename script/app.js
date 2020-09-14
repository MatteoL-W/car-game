let canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    gamePlaying = false;

const bg = new Image();
bg.src = 'assets/canvas/bg-default.png';

canvas.width = window.innerWidth;
canvas.height = 768;

const render = () => {
    c.drawImage(bg, 0, 0);
    


    window.requestAnimationFrame('render');
}


