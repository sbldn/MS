const TIME_INCREMENT = 0.0001;
let walkers=[]

const circleSize = 350;
const it = 5;
const goldenP = 0.5 * (1 + Math.sqrt(5)) - 1;
let proportions = fibonacciVolumeDivisions(circleSize, it);


function setup() {
  createCanvas(400, 400);
  
  
  for (let i = 0; i < it; i++) {
  
  let hue = random(360);
  let saturation = random(50, 100);
  let brightness = random(50, 100);
  let col = color(hue, saturation, brightness);

  let bpm = random(1000, 12000);
    
  let walker = new Walker(diameterCircle=proportions[i],
                      noiseWalker=10,
                      limitDiaPer=5-map(i,0,it,5,3),
                      amplitudPulso=1,
                      factorBPM=bpm,
                      colorH=col,
                      main=i);
    walkers.push(walker)
  }
  frameRate(24);
}

function draw() {
  background(220);
  drawHearts();
}

function drawHearts() {
  background(0);
  for (let walker of walkers) {
    walker.move();
    walker.update();
  }
}

/*
diameterCircle - Diametro del circulo a dibujar
noiseWalker - Factor del Movimiento del perlin walker
limitDiaPer - porcentaje de movimiento permitido para el noise walker

amplitudPulso - 1 a 100 cuando es en porcentaje lo que se expandira el ciruclo en cada latido
factorBPM - BPM

ColorH - Color de la seccion

Main - ID, idenficar el primer circulo
*/

class Walker {
  constructor(diameterCircle,noiseWalker,limitDiaPer,amplitudPulso,factorBPM,colorH,main) {
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.diameterCircle=diameterCircle;
    this.x=this.centerX;
    this.y=this.centerY;
    this.tx = 0;
	this.ty = 10000;
    this.noiseWalker=noiseWalker/100;
    this.limitRad=(this.diameterCircle+this.diameterCircle*limitDiaPer/100)/2
    this.directionX =1;
    this.directionY = 1;
    
    this.angle = 0;
    this.originalDiameter=this.diameterCircle;
    this.amplitudPulso=amplitudPulso;
    this.factorBPM=factorBPM
    
    this.colorH=colorH;
    this.main=main;
  }
  
  pulse() {
    this.diameterCircle = sin(this.angle)* this.originalDiameter*(this.amplitudPulso/100)+this.originalDiameter;
    this.angle += TIME_INCREMENT*this.factorBPM;
  
   
}
  
  
  
  move(){
    this.pulse();
    this.x =this.x+map(noise(this.tx), 0, 1, -1, 1)*this.noiseWalker*this.directionX;
    this.y =this.y+map(noise(this.ty), 0, 1, -1, 1)*this.noiseWalker*this.directionY;
    this.tx += TIME_INCREMENT;
    this.ty += TIME_INCREMENT;
    const dSquared = Math.sqrt(distSquared(this.x, this.y, this.centerX, this.centerY));
    if (dSquared >= this.limitRad-this.diameterCircle/2 ){
      const angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
      const newX = this.centerX + Math.cos(angle) * ((this.diameterCircle / 2) - 1);
      const newY = this.centerY + Math.sin(angle) * ((this.diameterCircle / 2) - 1); // Restar 1 para mantener la esfera dentro del límite
    // Cambiar aleatoriamente la dirección
      this.directionX = random(-1, 1);
      this.directionY = random(-1, 1);
    }
  }
  
  fade() {
    // fill(this.col)
    // ellipse(50, 50, 50,1);
    // fill(this.colF)
    // ellipse(70, 70, 50);
    if(this.main==0){
      //onsole.log(this.main)
      fill(hue(this.colorH), saturation(this.colorH), brightness(this.colorH), 1);
      ellipse(width/2, height/2, this.diameterCircle);
      // fill(this.col);
      // ellipse(this.x, this.y, this.baseDiameter,this.baseDiameter);
  }
    for (let i = this.diameterCircle; i >= this.diameterCircle * 0.01; i--) {
        let alphaValue = map(i, this.diameterCircle, this.diameterCircle * 0.01, 0, 255 * 0.01);
        let degrade = map(i, this.diameterCircle, this.diameterCircle * 0.01, saturation(this.colorH) * 0.7, saturation(this.colorH));
        
        let colorC=color(lerpColorBetweenTwoColors(this.colorH, this.colorH, noise(this.tx)));
        // fill(this.col)
        fill(hue(colorC), degrade, brightness(colorC), alphaValue);
        ellipse(this.x, this.y, i);
        // fill(colorC)
        // ellipse(90, 90, 50);
    }
  }

  
  
  update(){
     noStroke();
    this.fade();
   // ellipse(width/2, height/2, this.originalDiameter); testing
   // noStroke();
    //fill(this.colorH);
   // ellipse(this.x, this.y, this.diameterCircle);
  }
}

function distSquared(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
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
