let hearts = [];
const circleSize = 500;
const it = 50;
const goldenP = 0.5 * (1 + Math.sqrt(5)) - 1;
let proportions = fibonacciVolumeDivisions(circleSize, it);

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  for (let i = 0; i < it; i++) {
    let hue = random(360);
    let saturation = random(50, 100);
    let brightness = random(50, 100);
    let col = color(hue, saturation, brightness);
    let bpm = random(140, 150);
    let heart = new Heart(proportions[i], col, 0);
    hearts.push(heart);
  }
  
  
  // Llama a la función para actualizar el estado de los corazones
  requestAnimationFrame(update);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    
    //loadData(); // Recarga los datos al presionar 'r'
     for (let heart of hearts) {
       let asdadsa=random(30,200);
    heart.bpmc(asdadsa); 
  }
  }
}

function update() {
  ellipse(width/2, height/2, 600, 600);
  for (let heart of hearts) {
    heart.move(); // <-- Llama al método move() en lugar de display()
  }
  drawHearts();
  // Llama a la función nuevamente para actualizar el estado en el siguiente cuadro
  requestAnimationFrame(update);
}

function drawHearts() {
  background(0);
  for (let heart of hearts) {
    heart.display(); // <-- Debería ser display() en lugar de move()
  }
}

class Heart {
  constructor(baseDiameter, col, bpm) {
    this.baseDiameter = baseDiameter;
    this.diameter = baseDiameter;
    this.col = col;
    this.bpm = bpm;
    this.period = 60 / this.bpm;
    this.phase = 0;
    this.tx = random(10) * 0.1;
    this.ty = random(10) * 0.1;
    this.noiseIncrement = 10;
    this.limitRadius = this.diameter / 2 + this.diameter / 2 * 0.02;
    this.directionX = 1;
    this.directionY = 1;
    this.angle = 0;
    this.angleSpeed = 0.1;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.x = this.centerX; // <-- Inicializa this.x
    this.y = this.centerY; // <-- Inicializa this.y
  }

  pulse() {
    let time = millis() / 1000;
    let t = (time / this.period) % 1;
    this.diameter = this.calculateDiameter(t);
  }

  calculateDiameter(t) {
    let pqrst = this.pqrstSignal(t);
    return lerp(this.diameter, this.baseDiameter * (0.95 + 0.1 * pqrst), 0.05);
  }
  
  pqrstSignal(t) {
    if (t < 0.1) {
      return 0.1 - 10 * (t - 0.05) ** 2;
    } else if (t < 0.3) {
      return 1;
    } else if (t < 0.4) {
      return 1 - 5 * (t - 0.35) ** 2;
    } else if (t < 0.5) {
      return 0.5;
    } else if (t < 0.7) {
      return 0.5 - 2.5 * (t - 0.6) ** 2;
    } else {
      return 0;
    }
  }
  bpmc(bpmin){
    this.bpm=bpmin;
        this.period = 60 / this.bpm;

    console.log(bpmin);
    console.log(this.bpm);
  }
  
  display() {
    noStroke();
    this.fade();
    
  }
  
  move() {
    // Calcular la amplitud del ruido basada en noiseIncrement
    let noiseAmplitude = map(this.noiseIncrement, 0, 100, 0, 1);

    // Movimiento controlado por Perlin noise, ajustado por la amplitud del ruido
    let noiseX = noise(this.tx) * 2 - 1; // Escalar el ruido a un rango de -1 a 1
    let noiseY = noise(this.ty) * 2 - 1; // Escalar el ruido a un rango de -1 a 1
    this.x += noiseX * noiseAmplitude * this.directionX;
    this.y += noiseY * noiseAmplitude * this.directionY;
    this.tx += 0.01; // Incremento de tiempo para el ruido X
    this.ty += 0.01; // Incremento de tiempo para el ruido Y

    // Verificar y corregir si el objeto está fuera del límite circular
    let d = dist(this.x, this.y, this.centerX, this.centerY);
    if (d > this.limitRadius - this.diameter / 2) {
        let angle = atan2(this.y - this.centerY, this.x - this.centerX);
        this.x = this.centerX + cos(angle) * (this.limitRadius - this.diameter / 2);
        this.y = this.centerY + sin(angle) * (this.limitRadius - this.diameter / 2);
        if (abs(this.x - this.centerX) >= abs(this.y - this.centerY)) {
            this.directionX *= -1;
        } else {
            this.directionY *= -1;
        }
    }

    // Realizar alguna acción adicional asociada con el movimiento del objeto
    this.pulse();
}


 
  
  fade() {
    for (let i = this.diameter; i >= this.diameter * 0.01; i--) {
        let alphaValue = map(i, this.diameter, this.diameter * 0.01, 0, 255 * 0.01);
        let degrade = map(i, this.diameter, this.diameter * 0.01, saturation(this.col) * 0.7, saturation(this.col));
        fill(hue(this.col), degrade, brightness(this.col), alphaValue);
        ellipse(this.x, this.y, i, i);
        
    }
  }
}

function fibonacciVolumeDivisions(totalVolume, numDivisions) {
  let aux = totalVolume;
  let seccuenceV = [totalVolume];
  for (let i = numDivisions; i >= 2; i--) {
    aux = aux * goldenP;
    seccuenceV.push(aux);
  }
  return seccuenceV;
}

