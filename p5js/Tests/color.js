let temperature=0;
let timer = 0;
 let x;
let t=0;
let circles=5
let diameter=400

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  cIninital=ColorP(temperature);
  cFinal=ColorP(temperature);
 
}

function draw() {
   background(220);
  noStroke()
  t += 0.01;
  drawCircles(cIninital,cFinal,t)
  
  
   if (millis() - timer > 30000) {
     temperature=temperature+1;
     cIninital=cFinal
     cFinal=ColorP(temperature);
 
     console.log(t+" "+temperature)
    timer = millis();
  }
  
  fill(cFinal[0])
  ellipse(70,70,50)
  fill(cIninital[0])
  ellipse(50,50,50)
}

function drawCircles(cInitial, cFinal, t) {
  lastdiameter=diameter
  for (let i = 0; i < circles; i++) {
    
    let lerped = lerpColorBetweenTwoColors(cInitial[i], cFinal[i], t);
    fill(lerped);
    ellipse(width / 2, height / 2, lastdiameter);
    lastdiameter=lastdiameter-lastdiameter*0.4
  }
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

