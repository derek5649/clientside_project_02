// These variables create the canvas
var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");

/* These variables create the height and width for how far the ball can move */
var x = canvas.width/2;
var y = canvas.height-30;

/* These variables adds a small value for every frame so it'll create the illusion that the ball is moving. */
var dx = 2;
var dy = -2;

/* This variables set the radius of the ball */
var ballRadius = 10;

/* These variables set the width, height, and length position of the paddle */
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

/* These variables set the control buttons and it's equal to false because we don't want the paddle to move by itself.  Only once we hit the command keys, will it move. */
var rightPressed = false;
var leftPressed = false;

/* These variables set how many rows and columns of bricks.  Then, it sets the width, height, padding, top and left.  The reason for the top and left is so the bricks don't get drawn on the edge of the canvas. The var bricks creates a two-dimensional array that will contain the columns, rows, and the x & y positions on the browser. */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

/* These variables set the score that you start off with and how many lives we have. */
var score = 0;
var lives = 3;

/* These document.addEventListener tells the canvas to listen for actual key commands, when the key is being pressed down and when it's not.  Also, I added to where you can control your paddel with the mouse */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

/* Both the keyDownHandler and keyUpHandler functions checks whether the keys were pressed down.  KeyCode 39 is suppose to represent the left key and keyCode 37 is suppose to represent the right key. If it is, then it will return as true, but if it's not, then will return as false */
function keyDownHandler(e){
    if(e.keyCode==39){
        
        rightPressed=true;
        
        }
        else if(e.keyCode==37){
        
        leftPressed=true;
        
        }
        
    }
    
function keyUpHandler(e){
    
    if(e.keyCode==39){
        
        rightPressed=false;
    }
    else if(e.keyCode==37){
        
        leftPressed=false;
        
        }
    }

/* The drawBall function creates our ball, sets it to move every frame per second, and sets its radius.  */
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,2*Math.PI);
    ctx.fillstyle="#0033FF";
    ctx.fillStroke="#0033FF";
    ctx.Stroke="10"
    ctx.fill();
    ctx.closePath();
    }


/* The drawPaddle function draws the paddle onto the screen and adds in its height, width, and length position. */ 
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillstyle = "#7c0c53";
    ctx.fill();
    ctx.closePath();
    }


/* The drawBricks function creates a loop so that the rows, columns, x & y positions, width, and height of each brick is set into its correct positions.  If we didn't do these calculations then all of them would be in one spot. Also, this checks the status of the bricks so when the ball hits them, they won't appear on the browser again until the game has been reset.*/    
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#7c0c53";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

/* The collisionDetection function calculates the position of the brick to the ball's coordinates frame by frame.  This in turn will tell that it that once the ball has hit the brick, the brick will disappear and the ball bounce to the other side.  The function also calculates the amount of points you get, which for every brick we destroy, we gain 10 points.  Since there're 15 bricks, we'd need a maximum of 150 points in order to win.  Once we've gotten 150 points, a message on the browser will appear saying "Congragulations! You Win!". */
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score += 10;
                    if(score == brickRowCount*brickColumnCount*10) {
                        /* So, it took me a while to figure out how to display my message on the browser.  Basically I created an id of win, called that id to my stylesheet and made it hidden so when the game first starts it won't appear.  However, once you win the game, it will appear which I used the setTimeout function and set the time to 8000 which is basically 8 milliseconds. */
                       win.style.visibility = "visible";
                       setTimeout(function () {
                        location.reload(true); }, 8000);  
                       
                    }
                }
            }
        }
    }
}

/* The drawScore function bascially creates and updates our score everytime we gain a new one. */
function drawScore() {
    ctx.font = "16px Italic";
    ctx.fillStyle = "#7c0c53";
    ctx.fillText("Score: "+score, 8, 20);

}

/* The drawLives function basically create and updates how many lives we have left each time the ball drops to the bottom of the canvas. */
function drawLives() {
    ctx.font = "16px Italic";
    ctx.fillStyle = "#7c0c53";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


/* The reloadButton function basically tells our reload button to reset once the reload button has been clicked. */
function reloadButton() {
    document.location.reload();
}

/* The draw function contains a lot of informaiton.  1. We use this function in order to execute all of the other functions that we've created. 2. It executes our setInterval which sets each frame of our ball. 3. It set to whever the ball moves into a new frame, it will delete the previous frame so the ball doesn't make one big line. 4. It calculates the position of exactly where the ball bounces off from top, left, and right.  Also, we set so that half of the ball doesn't disappear into the wall. 5. Sets to where if the ball has reached the bottom and I have lost all of my 3 lives, it should display "Game Over! Better Luck Next Time!" on to the browser.  After that, I tell it to reload the page and start the game again.*/
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
 if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
             if(y= y-paddleHeight){
            dy = -dy;

             }
        }
        else {
            lives--;
            if(!lives) {
                /* As I explained above, I used the same methods for the Game Over message.  However, for some reason it won't display on the browser and I haven't been able to figure out why */
            lose.style.visiblity = "visible";
            setTimeout(function () {
            location.reload(true); 
            }, 8000);

        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
            score -= 25;
            }
        }
    }
    if(rightPressed && paddleX<canvas.width-paddleWidth){
        
        paddleX+=7;
        }
     else if(leftPressed && paddleX>0 ){
         paddleX-=7;
         
         }
         
         x=x+dx;
         y=y+dy;

    }

/* The setInterval draws every frame of the ball, which has been set to 8 milliseconds.
setInterval(draw, 8);
