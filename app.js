let fArray = [];
let hatchSize = 100; 
let hatchToggle = true;
let chatchSize = 100;
let bg;

// brillo dinámico
let brightnessLevel = 0;
let brightnessDirection = 1;

function preload() {
  bg = loadImage('https://assets.codepen.io/9234665/sunflowers.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.7);

  // 🔥 MENOS puntos (antes 1000)
  const numFocalPoints = 120;

  for (let i = 0; i < numFocalPoints; i++) {
    fArray.push(createVector(random(width), random(height)));
  }

  frameRate(30); // 🔥 clave para móvil
}

let hatchDelay = 2; // menos carga

function draw() {
  if (!hatchToggle) return;

  // 🔥 brillo más liviano (no toca todos los píxeles)
  applyOverlayBrightness();

  if (frameCount % hatchDelay === 0) {
    // 🔥 menos iteraciones (antes 10)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < fArray.length; j++) {
        circleHatch(fArray[j].x, fArray[j].y);
      }
    }

    if (hatchSize > 5) hatchSize -= 0.3;
  }
}

function circleHatch(cx, cy) {
  let x = random(width);
  let y = random(height);

  let imgX = floor(map(x, 0, width, 0, bg.width));
  let imgY = floor(map(y, 0, height, 0, bg.height));

  let pixCol = bg.get(imgX, imgY);
  stroke(pixCol);

  let r = dist(cx, cy, x, y);
  let theta = atan2(y - cy, x - cx);

  let hs = min(200, chatchSize / 10);
  let d = random(PI / (hs + 10), PI / hs);

  noFill();
  arc(cx, cy, r * 2, r * 2, theta - d, theta + d);

  chatchSize = min(chatchSize + 0.03, 200);
}

// 🔥 NUEVO: brillo eficiente (overlay en vez de píxeles)
function applyOverlayBrightness() {
  brightnessLevel += brightnessDirection * 0.5;

  if (brightnessLevel > 80 || brightnessLevel < -40) {
    brightnessDirection *= -1;
  }

  noStroke();

  // noche → overlay oscuro
  if (brightnessLevel < 0) {
    fill(0, abs(brightnessLevel) * 2);
    rect(0, 0, width, height);
  } 
  // día → overlay cálido
  else {
    fill(255, 200, 50, brightnessLevel * 0.5);
    rect(0, 0, width, height);
  }
}

// interacción
function mousePressed() {
  fArray = [];

  for (let i = 0; i < 40; i++) {
    fArray.push(createVector(random(width), random(height)));
  }

  chatchSize = 1;
}

function keyPressed() {
  hatchToggle = !hatchToggle;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
