/*var t, tx, ty, x, y;

function setup() {
    createCanvas(windowWidth, windowHeight);
    t = 0;
    x = windowWidth / 2;
    y = windowHeight / 2;
    tx = random(10);
    ty = random(10);
}

function draw() {
    background(100);

    // Dibujar el rectángulo verde en el centro de la ventana
    fill(0, 255, 0);
    rect(windowWidth / 2 - 50, windowHeight / 2 - 50, 100, 100);

    // Dibujar el elipse verde que sigue al ratón
    fill(0, 255, 0);
    ellipse(mouseX, mouseY, 20, 20);

    // Actualizar las posiciones x e y usando ruido (noise)
    x = map(noise(tx), 0, 1, windowWidth / 2 - 50, windowWidth / 2 + 50);
    y = map(noise(ty), 0, 1, windowHeight / 2 - 50, windowHeight / 2 + 50);
    tx += 0.01;
    ty += 0.01;

    // Corregir las comparaciones de límites para x e y
    if (x > windowWidth / 2 + 100) {
        x = windowWidth / 2 + 100;
        tx *= -1; // Invertir la dirección del ruido
    } else if (x < windowWidth / 2 - 100) {
        x = windowWidth / 2 - 100;
        tx *= -1; // Invertir la dirección del ruido
    }

    if (y > windowHeight / 2 + 100) {
        y = windowHeight / 2 + 100;
        ty *= -1; // Invertir la dirección del ruido
    } else if (y < windowHeight / 2 - 100) {
        y = windowHeight / 2 - 100;
        ty *= -1; // Invertir la dirección del ruido
    }

    // Dibujar el elipse rojo en la posición (x, y)
    fill(255, 0, 0);
    ellipse(x, y, 20, 20);

    t += 0.01;
}*/