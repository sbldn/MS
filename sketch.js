let hearts = [];
let circleSize=500;
let it=5
const goldenP=0.5*(1+Math.sqrt(5))-1;
let proportions=[]

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);

  proportions=fibonacciVolumeDivisions(circleSize,it);

  let previousHeart = null;


  for (let i = 0; i < it; i++) {
  
    let hue = random(360); // Generar un tono aleatorio
    let saturation = random(50, 100); // Generar una saturación aleatoria
    let brightness = random(50, 100); // Generar un brillo aleatorio
    let col = color(hue, saturation, brightness); 
    
    let heart = new Heart(proportions[i], col, 1, previousHeart); // Pasar la referencia de la esfera contenedora
    hearts.push(heart);
    previousHeart = heart; 
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
  constructor(diameter,color,noiseIncrement,containerHeart) {
    this.col=color;
    /*Pulse*/
    this.angle = 0;
    this.angleSpeed = 0.1;
    /*movement*/
    this.centerX = (width/2);
    this.centerY = (height/2);

    this.diameter = diameter;

    this.tx = random(10)*0.1;
    this.ty = random(10)*0.1;
    this.noiseIncrement = noiseIncrement;
    this.x = this.centerX;
    this.y = this.centerY;
    this.limitRadius = this.diameter/2+this.diameter/2*0.05;
    this.directionX = 1;
    this.directionY = 1;
    /*Container*/
    this.containerHeart = containerHeart; 
    let dcontainer=null;

    }
  
  pulse(){
    // console.log(this.angle);
    this.diameter = sin(this.angle) * this.diameter*0.001+ this.diameter;
    this.angle += this.angleSpeed;
  }
  /**Version 3 */
  move(){
    this.x += map(noise(this.tx), 0, 1, -1/5, 1/5) * this.directionX;
    this.y += map(noise(this.ty), 0, 1, -1/5, 1/5) * this.directionY;
    this.tx += this.noiseIncrement;
    this.ty += this.noiseIncrement;
    
    if (this.containerHeart=!null){
      
    }
  


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


function fibonacciVolumeDivisions(totalVolume, numDivisions) {
  let aux=totalVolume
  let seccuenceV=[totalVolume]
  for(let i=numDivisions;i>=2;i--){
    // console.log(i)
    aux=aux*goldenP;
    seccuenceV.push(aux)
    
}
  // console.log(seccuenceV)
return seccuenceV;
}