let fArray = [];
let painting; 
let hatchSize = 100; 
let hatchToggle = true;
let cx, cy;
let chatchSize = 100;
let bg;

// 🔥 variables para brillo dinámico
let brightnessLevel = 0;
let brightnessDirection = 1;

function preload() {
  bg = loadImage(
    'https://assets.codepen.io/9234665/sunflowers.jpeg'
  );
}

function setup() {
  h = max(windowWidth, 3*windowHeight);
  w = (h * bg.width) / bg.height;
  cnv = createCanvas(w, h);
  strokeWeight(0.8);

  const numFocalPoints = 1000;
  const spacingX = width / (numFocalPoints + 1);
  const spacingY = height / (numFocalPoints + 1);

  for (let i = 1; i <= numFocalPoints; i++) {
    const focalPoint = createVector(i * spacingX, i * spacingY);
    fArray.push(focalPoint);
  }
}

let hatchDelay = 1;

function draw() {
  if (hatchToggle) {

    // 🔥 SOLO agregamos esto (brillo dinámico)
    brightenImage();

    if (frameCount % hatchDelay === 0) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < fArray.length; j++) {
          circleHatch(fArray[j].x, fArray[j].y);
        }
      }

      if (hatchSize > 5) {
        hatchSize -= 0.5;
      }
    }
  }
}

function circleHatch(cx, cy) {
  x = random(0, width);
  y = random(0, height);

  pixCol = bg.get(bg.width / (width / x), bg.height / (height / y));
  stroke(pixCol);

  r = dist(cx, cy, x, y);
  theta = atan((y - cy) / (x - cx));
  hs = min(200, chatchSize / 10);
  d = random(PI / (hs + 10), PI / hs);

  noFill();

  if (cx >= x && cy >= y) {
    theta += PI;
    arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
  }
  if (cx >= x && cy < y) {
    theta -= PI;
    arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
  }
  if (cx < x && cy <= y) {
    arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
  }
  if (cx < x && cy > y) {
    arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
  }

  chatchSize += 0.05;
}

// change the focal points
function mousePressed() {
  fArray = [];
  const numFocalPoints = 20;
  const spacingX = width / (numFocalPoints + 1);
  const spacingY = height / (numFocalPoints + 1);

  for (let i = 1; i <= numFocalPoints; i++) {
    const focalPoint = createVector(i * spacingX, i * spacingY);
    fArray.push(focalPoint);
  }

  chatchSize = 1;
}

function keyPressed() {
  hatchToggle = !hatchToggle;
}

function classicHatch() {
  x = random(0, width);
  y = random(0, height);

  pixCol = bg.get(bg.width / (width / x), bg.height / (height / y));
  stroke(pixCol);

  d = random(0, hatchSize);
  line(x - d / 2, y - d / 2, x + d / 22, y + d / 2);
}

// 🔥 FUNCIÓN DINÁMICA (REEMPLAZA LA ORIGINAL)
function brightenImage() {
  bg.loadPixels();

  for (let i = 0; i < bg.pixels.length; i += 4) {
    bg.pixels[i] = constrain(bg.pixels[i] + brightnessDirection * 0.3, 0, 255);
    bg.pixels[i + 1] = constrain(bg.pixels[i + 1] + brightnessDirection * 0.3, 0, 255);
    bg.pixels[i + 2] = constrain(bg.pixels[i + 2] + brightnessDirection * 0.3, 0, 255);
  }

  bg.updatePixels();

  brightnessLevel += brightnessDirection * 0.3;

  if (brightnessLevel > 80 || brightnessLevel < -40) {
    brightnessDirection *= -1;
  }
}
