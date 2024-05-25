// Canvas Setup
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let rectX = 20;
let rectY = 350;
let size = 30;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;


let walls = [];
walls.push({ 
  x: -1, 
  y: 100,
  w: 150,
  h: 20 
});

walls.push({ 
  x: 356, 
  y: 200, 
  w: 20,
  h: 150 
});

walls.push({ 
  x: 500, 
  y: 100, 
  w: 190, 
  h: 20 
});

walls.push({ 
  x: 500, 
  y: 450, 
  w: 160, 
  h: 20 
});

walls.push({
   x: 160, 
   y: 500, 
   w: 120, 
   h: 20 
});


// Draw Function
window.addEventListener("load", draw);

function constrain(val, low, high) {
    if (val < low) {
      return low;
    } else if (val > high) {
      return high;
    } else {
      return val;
    }
}
  
function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  
  // Draw Player
  ctx.fillStyle = "blue"
  ctx.fillRect(rectX, rectY, size, size,)
  
  // Draw Walls
  ctx.fillStyle = "grey"
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i]
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  }

    // Update Player Position
    let dx = 0;
    let dy = 0;
    if (leftPressed) {
      dx = -5;
    } else if (rightPressed) {
      dx = 5;
    } else if (upPressed) {
      dy = -5;
    } else if (downPressed) {
      dy = 5;
    }
  
    // Check for Wall Collision
    let nextX = rectX + dx;
    let nextY = rectY + dy;
    let collision = false;
    
    for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      if (
        nextX + size > wall.x && 
        nextX < wall.x + wall.w && 
        nextY + size > wall.y && 
        nextY < wall.y + wall.h
      ) {
        collision = true;
        break;
      }
    }
  
    // Move the player only if no collision detected
    if (!collision) {
      rectX = constrain(rectX + dx, 0, cnv.width - size);
      rectY = constrain(rectY + dy, 0, cnv.height - size);
    }
  
  
   requestAnimationFrame(draw);
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
  if (e.code === "ArrowLeft") {
    leftPressed = true;
  } else if (e.code === "ArrowRight") {
    rightPressed = true;
  } else if (e.code === "ArrowUp") {
    upPressed = true;
  } else if (e.code === "ArrowDown") {
    downPressed = true;
  }
}

function keyupHandler(e) {
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  } else if (e.code === "ArrowRight") {
    rightPressed = false;
  } else if (e.code === "ArrowUp") {
    upPressed = false;
  } else if (e.code === "ArrowDown") {
    downPressed = false;
  }
}
