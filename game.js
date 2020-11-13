const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');

canvas.height = 500;
canvas.width = 700;
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

var ding = new Audio("yes.wav");
const playerWidth= 50;
const playerHeight = 150;
let game = false;
const ballSpeed = 7;
const playerSpeed = 5;

let score1 = 0;
let score2 = 0;

//Animation


const player1 ={
    x: 0,
    y: 150,
    dy:0,
}
const player2 ={
    x: 650,
    y: 150,
    dy:0,
}
const ball = {
    x:player1.x+15+playerWidth+1,
    y:player1.y + playerHeight/2,
    r: 15,
    dx: 0,
    dy: 0
}


function drawball(){

    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawPlaye1(){

    ctx.fillStyle = 'red';
    ctx.fillRect(player1.x,player1.y,playerWidth,playerHeight);

}
function drawPlaye2(){

    ctx.fillStyle = 'blue';
    ctx.fillRect(player2.x,player2.y,playerWidth,playerHeight);

}
function detectPlayer1(){
    
    if( ball.x-ball.r <= player1.x+playerWidth &&
        ball.y+ball.r > player1.y && ball.y-ball.r < player1.y+playerHeight)  ball.dx *= -1;

}
function detectPlayer2(){
    
    if( ( ball.x+ball.r >= player2.x ) &&
        ball.y+ball.r > player2.y && ball.y-ball.r < player2.y+playerHeight)  ball.dx *= -1;

}

function detectWalls(){
    if(ball.y+ball.r > canvas.height || ball.y-ball.r < 0) ball.dy *= -1; 

    if(player1.y < 0 ) player1.y =0;
    if(player2.y < 0 ) player2.y =0;
    
    if(player1.y + playerHeight > canvas.height ) player1.y = canvas.height - playerHeight;
    if(player2.y + playerHeight > canvas.height ) player2.y = canvas.height - playerHeight;
    
}

function update(){

    ctx.clearRect(0,0,canvas.width,canvas.height); 
    drawPlaye1();
    drawPlaye2();
    drawball();

    
    ball.x += ball.dx;
    ball.y += ball.dy; 
   
    

    player1.y += player1.dy;
    player2.y += player2.dy;

    //detect walls
    detectWalls();

    //dectect players
    detectPlayer1();
    detectPlayer2();
    checkEndGame();
    if(game) requestAnimationFrame(update);

}

function keyDown(e){

    if(e.key === 'ArrowUp') player2.dy = -1*playerSpeed;
    if(e.key === 'ArrowDown')player2.dy = playerSpeed;

    if(e.key === 'w') player1.dy = -1*playerSpeed;
    if(e.key === 's') player1.dy = playerSpeed;

    if(e.key === ' ' || e.key === 'Enter') start();

}

function keyUp(e){

    if(e.key === 'ArrowUp' || e.key === 'ArrowDown') player2.dy=0;
    if(e.key === 'w' || e.key === 's') player1.dy=0;
}

function start(){

    if(!game){
        game=true;
        ball.dx = ballSpeed;
        ball.dy = Math.ceil(Math.random()*5);
        update();
    }
}
function checkEndGame(){

    if(ball.x + ball.r< 0){
        score2++;
        ball.x=player1.x+ball.r+playerWidth+1;
        ball.y=player1.y + playerHeight/2;
        game = false;
        drawball();


    }

    if(ball.x  - ball.r> canvas.width){
        score1++;
        ball.x=player2.x-ball.r-1;
        ball.y=player2.y + playerHeight/2;
        game = false;
        drawball();

    }

    score.innerText = "Score "+score1+" : "+score2;

}

drawball();
drawPlaye1();
drawPlaye2();