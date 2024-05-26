let hearts = [];
let initialSize = 500;
let dif = initialSize;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);

  let previousHeart = null; // Variable para almacenar la referencia a la esfera contenedora

  for (let i = 0; i < 5; i++) {
    dif = dif - initialSize * 0.1;
    let hue = random(360); // Generar un tono aleatorio
    let saturation = random(50, 100); // Generar una saturación aleatoria
    let brightness = random(50, 100); // Generar un brillo aleatorio
    let col = color(hue, saturation, brightness);
    let heart = new Heart(dif, col, 0.00001, previousHeart); // Pasar la referencia de la esfera contenedora
    hearts.push(heart);
    previousHeart = heart; // Actualizar la referencia a la esfera contenedora
  }
}

function draw() {
  background(0);

  for (let heart of hearts) {
    heart.move();
    heart.display();
  }
}

class Heart {
  constructor(diameter, color, noiseIncrement, containerHeart) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.diameter = diameter;
    this.angle = 0;
    this.angleSpeed = 0.1;
    porcentaje=0.7
    this.col = color;
    this.tx = random(10) * 0.1;
    this.ty = random(10) * 0.1;
    this.noiseIncrement = noiseIncrement;
    this.x = this.centerX;
    this.y = this.centerY;

    this.limitRadius = this.diameter / 2;

    this.containerHeart = containerHeart; // Referencia a la esfera contenedora

    this.directionX = 1;
    this.directionY = 1;
  }

  pulse() {
    this.diameter = sin(this.angle) * this.diameter * 0.001 + this.diameter;
    this.angle += this.angleSpeed;
  }

  move() {
    this.x += map(noise(this.tx), 0, 1, -1, 1) * this.directionX;
    this.y += map(noise(this.ty), 0, 1, -1, 1) * this.directionY;
    this.tx += this.noiseIncrement;
    this.ty += this.noiseIncrement;

    let limitRadius = this.limitRadius;
    if (this.containerHeart) {
      limitRadius = this.containerHeart.diameter / 2; // Actualizar el límite si hay una esfera contenedora
    }

    // Calcular la distancia desde el centro
    let d = dist(this.x, this.y, this.centerX, this.centerY);

    // Verificar si el círculo está fuera del límite circular, considerando el radio del círculo
    if (d > limitRadius - this.diameter / 2) {
      let angle = atan2(this.y - this.centerY, this.x - this.centerX);
      this.x = this.centerX + cos(angle) * (limitRadius - this.diameter / 2);
      this.y = this.centerY + sin(angle) * (limitRadius - this.diameter / 2);

      if (abs(this.x - this.centerX) >= abs(this.y - this.centerY)) {
        this.directionX *= -1;
      } else {
        this.directionY *= -1;
      }
    }

    this.pulse();
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
