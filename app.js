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

  // menos carga para móvil
  const numFocalPoints = 120;

  for (let i = 0; i < numFocalPoints; i++) {
    fArray.push(createVector(random(width), random(height)));
  }

  frameRate(30);
}

let hatchDelay = 2;

function draw() {
  if (!hatchToggle) return;

  // 🔥 DIBUJAR IMAGEN BASE
  image(bg, 0, 0, width, height);

  // brillo dinámico liviano
  applyOverlayBrightness();

  if (frameCount % hatchDelay === 0) {
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

// brillo eficiente con overlay
function applyOverlayBrightness() {
  brightnessLevel += brightnessDirection * 0.5;

  if (brightnessLevel > 80 || brightnessLevel < -40) {
    brightnessDirection *= -1;
  }

  noStroke();

  if (brightnessLevel < 0) {
    fill(0, abs(brightnessLevel) * 2);
  } else {
    fill(255, 200, 50, brightnessLevel * 0.5);
  }

  rect(0, 0, width, height);
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

// responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
