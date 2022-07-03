let ball_x, ball_y, ball_dx, ball_dy, ball_radius, ball_init_x, ball_init_y;
let paddle_x, paddle_y, paddle_dx, paddle_dy;
let grid = [];
let x, y, l, w, v;
let scores, lives;

function setup() {
  createCanvas(400, 400);
  
  paddle_y = height - 20;
  ball_radius = 25;
  //ball
  ball_x = ball_init_x = width/2;
  ball_y = ball_init_y = paddle_y - ball_radius/2;
  ball_dx = -1;
  ball_dy = 1;
  
  
  //paddle
  paddle_x = (width/2) - (80/2);
  
  paddle_height = 15;
  paddle_width = 80;
  paddle_dx = 2;
  
  
  //initializing multiple bricks
  for( var i=0; i < 4; i++){
    let row = [];
    for( var j = 0; j < 4; j++){
      row.push( {x: (i*90)+10, 
                 y: (j*50)+25, 
                 l: 85, 
                 w: 30, 
                 v: true} );
    }
    grid.push(row);
  }
  
  lives = 2;
  scores = 0;
  
}

function draw() {
  background('black');
  
  ball_x += ball_dx;
  ball_y -= ball_dy;
  
  //moving paddle
  if(keyIsDown(RIGHT_ARROW)){
    if( paddle_x >= width - paddle_width )
      paddle_x = width - paddle_width;
    
    else
      paddle_x += paddle_dx;
  }
  
  if(keyIsDown(LEFT_ARROW)){
    if( paddle_x <= 0)
      paddle_x = 0;
    
    else
      paddle_x -= paddle_dx;
    
  }
  
  
  fill('white');
  circle(ball_x, ball_y, ball_radius); //ball
  rect(paddle_x, paddle_y, 80, 15); //paddle
    
  //right & left side of boundaries
  if(ball_x + (ball_radius/2) > width || ball_x - (ball_radius/2) < 0 )  {
    ball_dx = -(ball_dx)
  }
  
  //upper side of the boundary
  if( ball_y - (ball_radius)/2 < 0 ){
    ball_dy = -(ball_dy);
    
  }
  
  //hitting on paddle
  //upper side of the paddle 
  if( (ball_x >= paddle_x && ball_x <= paddle_x + paddle_width) &&  (ball_y + ball_radius/2 >= paddle_y) ){
    ball_dy = -(ball_dy);
  }
  // right side and left side of paddle
  else if(ball_y >= paddle_y && ball_y <= paddle_y + paddle_width && ball_x - ball_radius/2 <= paddle_x + paddle_width && ball_x + ball_radius/2 >= paddle_x)
  {
    ball_dx = -(ball_dx);
          
          }
  
  //not on paddle, bottom of the boundary
    else if( ball_y + (ball_radius)/2 >= height) {
        lives = lives - 1;
        
      if( lives > 0 ){
        // moving paddle to same point again
        paddle_y = height - 20;
        paddle_x = (width/2) - (80/2);
        
        // making the ball again
        ball_x = ball_init_x ;
        ball_y = ball_init_y ;
        ball_dx = 2;
        ball_dy = 1;
        ball_radius = 25;
        
        paddle_width = 80;
        paddle_height = 15;
      }
      else {
        ball_dy = 0;
        ball_dx = 0;
        paddle_dx = 0;
        lives = 0;
        
        text("Game Over: ", width/2 -40, height/2);
      }
        
}
  
  //multiple bricks
  for( var i = 0; i < 4; i++){
    for( var j = 0; j < 4; j++){
      
      rect(grid[i][j].x, grid[i][j].y, grid[i][j].l, grid[i][j].w);
      
       if( ball_y > grid[i][j].y && ball_y < grid[i][j].y + grid[i][j].w  && ball_x - ball_radius/2 < grid[i][j].x  + grid[i][j].l && ball_x + ball_radius/2 > grid[i][j].x){
    ball_dx = -(ball_dx);
    scores++;     
    grid[i][j].l = 0;  //brick_l == grid[i][j].l
    grid[i][j].w = 0;  //brick_w == grid[i][j].w

        }
      
      else if(ball_x > grid[i][j].x && ball_x < grid[i][j].x + grid[i][j].l && ball_y + ball_radius/2 > grid[i][j].y && ball_y - ball_radius/2 < grid[i][j].y  + grid[i][j].w ){
    ball_dy = -(ball_dy);
    scores++;
    grid[i][j].l = 0;
    grid[i][j].w = 0;
  }
      
      
    }
  }
  

  
  
  text(`Score: ${scores}`, width-100, 15);
  text(`Lives left: ${lives}` , 10, 15 );
  
  if(scores === (grid.length*grid[0].length) ){
    ball_dx = 0;
    ball_dy = 0;
    text("Congo! You won", width/2 - 50, height/2); 
  }
  
  } 
  
  