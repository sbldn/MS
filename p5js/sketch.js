let hearts = [];
const TIME_INCREMENT = 0.01;

const circleSize = 500;
const it = 5;
const goldenP = 0.5 * (1 + Math.sqrt(5)) - 1;
let proportions = fibonacciVolumeDivisions(circleSize, it);

let data;

let temperature=0;
let timer = 0;
let t=0;
cIninital=[]
cFinal=[]

p5.disableFriendlyErrors = true;

//Get the information of the JSON and print the last value of the file
function loadData() {
  loadJSON('/data/data.json', (json) => {
    data = json;
    console.log(data[Object.keys(data).length-1]);
  });
}


function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  cIninital=ColorP(temperature);
  cFinal=ColorP(temperature);
  for (let i = 0; i < it; i++) {
    let hue = random(360);
    let saturation = random(50, 100);
    let brightness = random(50, 100);
    let col = color(hue, saturation, brightness);
    let bpm = random(140, 150);
    let heart = new Heart(proportions[i], cIninital[i],cFinal[i], 0,10,i,0);
    hearts.push(heart);
    
  }
  frameRate(24);
  
  // Llama a la función para actualizar el estado de los corazones
  requestAnimationFrame(update);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    let rh=random(40,200)
    //loadData(); // Recarga los datos al presionar 'r'
     for (let heart of hearts) {
       let newbpm=random(rh-5,rh+5);
    heart.bpmc(newbpm); 
  }
  }
  if (key === 'd' || key === 'D') {
    loadData(); // Recarga los datos al presionar 'd'
  }
}

function update() {
  
  t += 0.01;
  drawHearts();
  if (millis() - timer > 5000) {
    temperature=temperature+1;
   // cFinal=ColorP(temperature);
   /*for (let i=0;i <hearts.length;i++) {
      hearts[0].colorU(cFinal[i]);// <-- Debería ser display() en lugar de move()
    }*/

    console.log(t+" "+temperature)
   timer = millis();
 }
 
  // Llama a la función nuevamente para actualizar el estado en el siguiente cuadro
  requestAnimationFrame(update);
}

function drawHearts() {
  background(0);
  for (let heart of hearts) {
    heart.tc(t);
    heart.move(); // <-- Llama al método move() en lugar de display()
    heart.display(); // <-- Debería ser display() en lugar de move()
  }
}
/*
Move
noiseIncrement - Valor entre 0 y 100 - Mover
perLimit - Porcentaje del radio que se puede mover la circunferencia entre 0
*/
class Heart {
  constructor(baseDiameter, col,colF, bpm, noiseIncrement,main,t) {
    this.baseDiameter = baseDiameter;
    this.diameter = baseDiameter;
    this.col = col;
    this.bpm = bpm;
    this.period = 60 / this.bpm;
    this.phase = 0;
    

    this.directionX = 1;
    this.directionY = 1;
    this.angle = 0;
    this.angleSpeed = 0.1;
    this.centerX = width / 2;
    this.centerY = height / 2;
    
    this.main=main;
    this.colF=colF;
    this.t=t;

    this.noiseIncrement = noiseIncrement;
    this.perLimit = this.diameter+2*this.diameter/100; 
    this.tx = random(1000);
    this.ty = random(1000);
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
    return lerp(this.diameter, this.baseDiameter * (0.95 + 0.1 * pqrst), 0.01);
  }
  tc(time){
    this.t=time;
  }
  // colorU(newColor){
  //   this.col=this.colorF;
  //   this.colorF=newColor;
  // }
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
  }
  
  display() {
    noStroke();
    this.fade();
  }

  move() {
    const noiseAmplitude = map(this.noiseIncrement, 0, 100, 0, 1);
    const noiseX = noise(this.tx) * 2 - 1; // Escalar el ruido a un rango de -1 a 1
    const noiseY = noise(this.ty) * 2 - 1; // Escalar el ruido a un rango de -1 a 1
    this.x += noiseX * noiseAmplitude * this.directionX;
    this.y += noiseY * noiseAmplitude * this.directionY;
    this.tx += TIME_INCREMENT;
    this.ty += TIME_INCREMENT;
    const dSquared = this.distSquared(this.x, this.y, this.centerX, this.centerY);
    const limitRadius = this.perLimit/2 - this.diameter / 2;
    const limitRadiusSquared = limitRadius * limitRadius;
    if (dSquared > limitRadiusSquared) {
      const angle = atan2(this.y - this.centerY, this.x - this.centerX);
      this.x = this.centerX + cos(angle) * limitRadius;
      this.y = this.centerY + sin(angle) * limitRadius;
      if (Math.abs(this.x - this.centerX) >= Math.abs(this.y - this.centerY)) {
        this.directionX *= -1;
      } else {
        this.directionY *= -1;
      }
    }
    this.pulse();
  }

// Función para calcular la distancia al cuadrado entre dos puntos
distSquared(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
}


  fade() {
    // fill(this.col)
    // ellipse(50, 50, 50,1);
    // fill(this.colF)
    // ellipse(70, 70, 50);
    if(this.main==0){
      //onsole.log(this.main)
      fill(hue(this.col), saturation(this.col), brightness(this.col), 1);
      ellipse(width/2, height/2, this.baseDiameter*2);
      // fill(this.col);
      // ellipse(this.x, this.y, this.baseDiameter,this.baseDiameter);
  }
    for (let i = this.diameter; i >= this.diameter * 0.01; i--) {
        let alphaValue = map(i, this.diameter, this.diameter * 0.01, 0, 255 * 0.01);
        let degrade = map(i, this.diameter, this.diameter * 0.01, saturation(this.col) * 0.7, saturation(this.col));
        
        let colorC=color(lerpColorBetweenTwoColors(this.col, this.colF, noise(this.t)));
        // fill(this.col)
        fill(hue(colorC), degrade, brightness(colorC), alphaValue);
        ellipse(this.x, this.y, i, i);
        // fill(colorC)
        // ellipse(90, 90, 50);
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

// Función para interpolar entre dos colores basados en el tiempo
function lerpColorBetweenTwoColors(color1, color2, time) {
  return lerpColor(color1, color2, noise(time*.8))
}

function ColorP(temp){
  let escale=map(temp,0,40,9,1)*30;
  firstcolor=color(random(escale-30,escale),random(40,255)*.7,random(40,255));  secondcolor=color(getHue(hue(firstcolor)),random(40,200)*.7,random(40,200));
thirdcolor=lerpColor(firstcolor,secondcolor,random(0,1));  fourthcolor=color(getHue(hue(thirdcolor)),saturation(thirdcolor)*0.7,brightness(thirdcolor));
  fifthcolor=color(random(escale-30,escale),random(40,255)*0.7,random(40,255))
  return [firstcolor,secondcolor,thirdcolor,fourthcolor,fifthcolor]
}

function getHue(hue){
  if(hue<180){
    newhue=hue+180
  }else{
    newhue=hue-180
  } 
  return newhue
}

function lerpcolor(colorI,colorF,t){
    let resultado = [];
    for (var i = 0; i < colorI.length; i++) {
      resultado.push(lerpColor(colorI[i], colorF[i], noise(t)));
    }
  // console.log(hue(resultado[0]))
  return resultado
  
}



