let mobileCheck = new MobileDetect(window.navigator.userAgent).mobile() !== null;

let count = mobileCheck ? 300 : 1000;
let r = mobileCheck ? 100 : 200;
let particles = [];

let influences = { // Multipliers
    mouse: 0.008,
    particles: 0.0025,
    center: 0.006,
    noise: 3
  };
let friction = 0.96;

let canvas, ctx;
let mouseIn = false;

let pos, acc, vel;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;
  canvas.canvas.onmouseenter = () => mouseIn = true;
  canvas.canvas.onmouseleave = () => mouseIn = false;
  
  randomizeParticles();
  
  pos = createVector(width / 2, height / 2);
  acc = createVector(0, 0);
  vel = createVector(0, 0);
}

function randomizeParticles() {
  particles = [];
  let r_ = r / 2;
  for(let i = 0; i < count; i++) {
    let p = createVector(
        random(-r_, width + r_),
        random(-r_, height + r_)
      );
    particles.push(p);
  }
}

function draw() {
  background(0);
  
  stroke(255);
  noFill();
  
  let center = createVector(width / 2, height / 2);
  let mouse = createVector(mouseX, mouseY);
  
  strokeWeight(1);
  
  // Influences:
  
  // Prevent the particles from taking too long, makes performance better
  // on mobile somewhat.
  let particleStart = performance.now();
  let maxTime = 10; // ms
  
  // By particles
  particles.some(n => {
    if(performance.now() - particleStart > maxTime) {
      return true;
    }
    
    let di = p5.Vector.sub(n, pos);//pos.dist(n);
    let d = di.mag();
    let inRegion = d < r;
    
    if(inRegion) {
      // Overpowered stroke color;
      stroke((1 - d / r) * (255 * 3));
      line(n.x, n.y, pos.x, pos.y);
      ellipse(n.x, n.y, (1 - d / r) * (r / 4));
      acc.add(di);
    }
  });
  acc.mult(influences.particles);
  
  // By center
  acc.add(p5.Vector.sub(center, pos).mult(influences.center));
  
  // By mouse
  if(mouseIn) {
    acc.add(p5.Vector.sub(mouse, pos).mult(influences.mouse));
  }
  else {
    let ns = noise(pos.x / 100, pos.y / 100, frameCount / 300);
    let ang = map(ns, 0.28, 0.72, 0, TAU);
    let v = p5.Vector.fromAngle(ang);
    acc.add(v.mult(influences.noise));
  }
  
  vel.add(acc);
  vel.mult(0.96);
  acc.set(0, 0);
  pos.add(vel);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  noiseSeed(random());
  randomizeParticles();
}

function mouseWheel(e) {
  r += e.delta > 0 ? -10 : 10;
  r = max(30, min(min(width, height) / 3 * 2, r));
}