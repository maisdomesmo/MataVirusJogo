const nav = document.querySelector('.nav')
const playArea = document.querySelector('#main-play-area')
const virus = ['inimigo.png', 'bozo.png']
const instructions = document.querySelector('.instructions');
const startbutton = document.querySelector('.start-button')
let virusInterval;


//movimento e tiro da nave
function fly(event) {
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveup();
    } else if (event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        firelaser();
    }
}

function moveup(){
    let topPosition = getComputedStyle(nav).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 25;
        nav.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = getComputedStyle(nav).getPropertyValue('top');
    if(topPosition === "525px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 25;
        nav.style.top = `${position}px`
    }
}

function firelaser(){
    let laser = createlaserElement();
    playArea.appendChild(laser);
    movelaser(laser);
}

function createlaserElement(){
    let xPosition = parseInt(window.getComputedStyle(nav).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(nav).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = "fogo.png";
    newLaser.classList.add("laser")
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 5}px`
    return newLaser;
}

function movelaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let gogo = document.querySelectorAll('.virus');

        gogo.forEach((virus) => {
            if(matar(laser, virus)){
                virus.src = 'explosion.png';
                //virus.classList.remove('virus');
                virus.classList.add('morto');
                laser.remove();
                setTimeout(() => {
                    virus.remove('.morto')
                }, 1000);
                //virus.classList.add('virusderrotado');
            }
        })

        if (xPosition > 500){
            laser.remove()
        } else {
            laser.style.left = `${xPosition + 10}px`
        }
    }, 10);
}




function createvirus(){
    let newvirus = document.createElement('img')
    let virussprite = virus[Math.floor(Math.random() * virus.length)]
    newvirus.src = virussprite;
    newvirus.classList.add('virus');
    //newvirus.classList.add('virusderrotado');
    newvirus.style.left = '460px';
    newvirus.style.top = `${Math.floor(Math.random()* 330 + 50)}px`;
    playArea.appendChild(newvirus);
    movevirus(newvirus);
}

function movevirus(virus){
    let movevirusInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(virus).getPropertyValue('left'))
        if (xPosition <= 50){
            if (Array.from(virus.classList).includes('dead')){
                virus.remove();
            } else {
                //gameover();
            }
        } else {
            virus.style.left = `${xPosition-4}px`;
        }
    }, 50);
}

function matar(laser, virus){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 30;
    let virusTop = parseInt(virus.style.top);
    let virusLeft = parseInt(virus.style.left);
    let virusBottom = virusTop - 60;
    if (laserLeft != 500 && laserLeft + 30 >= virusLeft){
        if(laserTop <= virusTop && laserBottom >= virusBottom){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//inicio

startbutton.addEventListener('click', (event) => {
    playgame();
})

function playgame() {
    startbutton.style.display = 'none';
    instructions.style.display = 'none';
    window.addEventListener('keydown', fly)
    virusInterval = setInterval(() => {
        createvirus();
    }, 2000);
}

function gameover() {
    window.removeEventListener('keydown', fly)
    clearInterval(virusInterval)
    let virus = document.querySelectorAll('.virus')
    virus.forEach((virus) => virus.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove);
    setTimeout(() => {
        alert('game over!');
        nav.style.top = "250px";
        startbutton.style.display = "block";
        instructions.style.display = "block";
    }, );
}

