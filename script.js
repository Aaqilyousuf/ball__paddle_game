var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen1 = false;
var showingWinScreen2 = false;

const PADDLE_HEIGHT = 100; 
const PADDLE_THICK = 10; 



window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framePerRate = 30;
    setInterval(()=>{
        drawEverything();
        moveEverything();
    },1000/framePerRate);

    canvas.addEventListener('click',handleMouseClick);

    canvas.addEventListener('mousemove',(event) => {
        var mousepos = calculateMousePos(event);
        paddle1Y = mousepos.y - (PADDLE_HEIGHT/2);   
    })   
}
function resetBall(){
    if(player1Score==WINNING_SCORE){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen1 = true;

    }
    else if(player2Score==WINNING_SCORE){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen2 = true;
    }
    ballSpeedX = -ballSpeedX;    
    ballX = canvas.width/2;      //respawn at center of the screen
    ballY = canvas.height/2;
}
function calculateMousePos(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };

}
function moveEverything(){
    if(showingWinScreen1){
        return;
    }
    else if(showingWinScreen2){
        return;
    }
    computerMovement();
    ballX = ballX + ballSpeedX; 
    ballY = ballY + ballSpeedY;
     
    if(ballX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){  //Collision of player 1
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } 
        else{
            player2Score++;
            resetBall();  
        }   
    }
    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){  //Collision of player 1
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } 
        else{
            player1Score++;
            resetBall();
        }
    } 
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;  //Player 2 {AI}
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY; 
        //player1Score++;
    }  
}
function drawEverything(){
    //Creating the background for game
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    if(showingWinScreen1){
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("MATCH OVER PLAYER 1 WON!",350,200);
        canvasContext.fillText("CLICK HERE TO CONTINUE",350,500);
        return;
    }
    if(showingWinScreen2){
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("MATCH OVER PLAYER 2 WON!",350,200);
        canvasContext.fillText("CLICK HERE TO CONTINUE",350,500);
        return;
    }
    drawNet(); //net drawing function

    //Creating the paddle for left player
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,paddle1Y,10,PADDLE_HEIGHT); //(horizontal,vertical,width,height)

    //Creating the paddle for Right player
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvas.width-PADDLE_THICK,paddle2Y,PADDLE_THICK,PADDLE_HEIGHT); //(horizontal,vertical,width,height)

    //Creating the Bouncing ball
    canvasContext.fillStyle = 'red';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true); //(horizontal,vertical,width,height)
    canvasContext.fill();
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Score Player 1: "+player1Score,100,100)
    canvasContext.fillText("Score Player 2: "+player2Score,canvas.width-200,100)

}
function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);  //Player 2 Movement(AI)
    if(paddle2YCenter<ballY-35){
        paddle2Y += 6;
    } 
    else if(paddle2YCenter>ballY+35){ 
        paddle2Y -= 6;
    }
}
function handleMouseClick(event){
    if(showingWinScreen1 || showingWinScreen2){     // Clcik to restart the game
        showingWinScreen1 = false;
        showingWinScreen2 = false;
        player1Score = 0;
        player2Score = 0;
        resetBall();
    }
}
function drawNet(){
    for(var i=0;i<canvas.height;i+=40){
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width/2-1,i,2,20) // (X-axis,Y-axis,width,height,color)
    }
}
