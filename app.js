let fArray = [];
let painting; 
let hatchSize = 100; 
let hatchToggle = true;
let cx, cy;
let chatchSize = 100;
let bg;

// brillo dinámico
let brightnessLevel = 0;
let brightnessDirection = 1;

function preload() {
  bg = loadImage(
    'https://assets.codepen.io/9234665/sunflowers.jpeg'
  );
}

function setup() {
  h = windowHeight;
  w = windowWidth;
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

    // brillo dinámico
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
  let x = random(0, width);
  let y = random(0, height);

  // 🔥 FIX CRÍTICO (evita NaN)
  let imgX = floor(map(x, 0, width, 0, bg.width));
  let imgY = floor(map(y, 0, height, 0, bg.height));

  let pixCol = bg.get(imgX, imgY);
  stroke(pixCol);

  let r = dist(cx, cy, x, y);
  let theta = atan((y - cy) / (x - cx));
  let hs = min(200, chatchSize / 10);
  let d = random(PI / (hs + 10), PI / hs);

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

// cambiar focal points
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
  let x = random(0, width);
  let y = random(0, height);

  let imgX = floor(map(x, 0, width, 0, bg.width));
  let imgY = floor(map(y, 0, height, 0, bg.height));

  let pixCol = bg.get(imgX, imgY);
  stroke(pixCol);

  let d = random(0, hatchSize);
  line(x - d / 2, y - d / 2, x + d / 22, y + d / 2);
}

// 🔥 brillo dinámico correcto
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
