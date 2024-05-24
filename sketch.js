

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
    let hue = random(360); // Generar un tono aleatorio
    let saturation = random(50, 100); // Generar una saturación aleatoria
    let brightness = random(50, 100); // Generar un brillo aleatorio
    let col = color(hue, saturation, brightness); 
    hearts.push(new Heart(dif, col,0.00001)); // Crear un nuevo corazón con el color aleatorio
  }
}
  

function draw() {
  background(0);
  // cext.move();
  // cint.move();
  // cext.display();
  // cint.display();
  for (let heart of hearts) {
    heart.move();

    heart.display();
  }
}

// clase Jitter
class Heart {
  constructor(diameter,color,noiseIncrement) {

    this.centerX = (width/2);
    this.centerY = (height/2);
    this.diameter = diameter;
   // this.speed = 1;
    this.angle = 0;
    this.angleSpeed = 0.1;

    this.col=color;
    this.tx = random(10)*0.1;
    this.ty = random(10)*0.1;
    this.noiseIncrement = noiseIncrement;
    this.x = this.centerX;
    this.y = this.centerY;

    this.limitRadius = this.diameter/2+this.diameter/2*0.1;
 

    this.directionX = 1;
    this.directionY = 1;



    }
  
  pulse(){
    
    // console.log(this.angle);
    this.diameter = sin(this.angle) * this.diameter*0.001+ this.diameter;
    this.angle += this.angleSpeed;
  }

  //Move Version 1
  /*move() {
    this.x += random(-this.speed*0.5, this.speed*0.5);
    this.y += random(-this.speed*0.5, this.speed*0.5);
    this.pulse();
    // need add limits to stay in the 
  }*/

  //Move Version 2
  /*
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
  */
  move(){
    this.x += map(noise(this.tx), 0, 1, -1, 1) * this.directionX;
    this.y += map(noise(this.ty), 0, 1, -1, 1) * this.directionY;
    this.tx += this.noiseIncrement;
    this.ty += this.noiseIncrement;

    // Calcular la distancia desde el centro
    let d = dist(this.x, this.y, this.centerX, this.centerY);

    // Verificar si el círculo rojo está fuera del límite circular, considerando el radio del círculo rojo
    if (d > this.limitRadius - this.diameter/2) {
        // Calcular el ángulo desde el centro al punto (x, y)
        let angle = atan2(this.y - this.centerY, this.x - this.centerX);

        // Reposicionar el punto (x, y) en el borde del círculo
        this.x = this.centerX + cos(angle) * (this.limitRadius - this.diameter/2);
        this.y = this.centerY + sin(angle) * (this.limitRadius - this.diameter/2);

        // Invertir la dirección del movimiento correspondiente para simular el rebote
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