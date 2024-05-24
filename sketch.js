

let hearts = [];
let initialSize=500;
let dif=initialSize

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  // crear objeto
  // cext = new Heart(200,50);
  // cint = new Heart(100,80);
  
  for (let i = 0; i < 5; i++) {
    dif=dif-initialSize*0.1;
    console.log(dif);
    let hue = random(360); // Generar un tono aleatorio
    let saturation = random(50, 100); // Generar una saturación aleatoria
    let brightness = random(50, 100); // Generar un brillo aleatorio
    let col = color(hue, saturation, brightness); 
    hearts.push(new Heart(dif, col)); // Crear un nuevo corazón con el color aleatorio
  }
}
  

function draw() {
  background(0);
  // cext.move();
  // cint.move();
  // cext.display();
  // cint.display();
  for (let heart of hearts) {
    heart.moveR();

    heart.display();
  }
}

// clase Jitter
class Heart {
  constructor(diameter,col,noiseIncrement) {

    this.centerX = (width/2);
    this.centerY = (height/2);
    this.diameter = diameter;
   // this.speed = 1;
    this.angle = 0;
    this.angleSpeed = 0.1;
    this.col=col;
    this.tx = random(10);
    this.ty = random(10);
    this.noiseIncrement = noiseIncrement;
    this.radius = 600;
    this.x = centerX;
      this.y = centerY;
    }
  
  pulse(){
    
    // console.log(this.angle);
    this.diameter = sin(this.angle) * this.diameter*0.001+ this.diameter;
    this.angle += this.angleSpeed;
  }

  /*move() {
    this.x += random(-this.speed*0.5, this.speed*0.5);
    this.y += random(-this.speed*0.5, this.speed*0.5);
    this.pulse();
    // need add limits to stay in the 
  }*/

  moveR(){
    this.x = map(noise(this.tx), 0, 1, this.centerX - this.radius, this.centerX + this.radius);
    this.y = map(noise(this.ty), 0, 1, this.centerY - this.radius, this.centerY + this.radius);
    this.tx += this.noiseIncrement;
    this.ty += this.noiseIncrement;

    let d = dist(this.x, this.y, this.centerX, this.centerY);

    // Verificar si el círculo rojo está fuera del límite circular
    if (d > this.radius) {
      // Calcular el ángulo desde el centro al punto (x, y)
      let angle = atan2(this.y - this.centerY, this.x - this.centerX);

      // Reposicionar el punto (x, y) en el borde del círculo
      this.x = this.centerX + cos(angle) * this.radius;
      this.y = this.centerY + sin(angle) * this.radius;

      // Invertir la dirección del ruido para simular el rebote
      this.tx *= -1;
      this.ty *= -1;
     // this.pulse();
    }
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, 20, 20);
  }
}