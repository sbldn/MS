function keyPressed() {
  if (key === 'r' || key === 'R') {
    UpdateBPMNoise();
  }
  if (key === 'd' || key === 'D') {
    console.log("Loding Data");
    loadData(); // Recarga los datos al presionar 'd'
  }
  if (key === 'c' || key === 'C') {
    console.log("Color transitions " + walkers[0].transColor);
    console.log("from " + walkers[0].oColor + " to" + walkers[0].nColor);
    console.log(temperature);
  }
  if (key === 'i' || key === 'I') {
    temperature = temperature + 3;
    updateTemperature(aColorMatrix, temperature);
  }
  if (key === 'o' || key === 'O') {
    temperature = temperature - 3;
    updateTemperature(aColorMatrix, temperature);
  }
  if (key === 'u' || key === 'U') {
    UV = UV +1;
    uvValues(UV);
  }
  if (key === 'y' || key === 'Y') {
    UV = UV -1;
    uvValues(UV);
  }
  if (key === 'q' || key === 'Q') {
    light = light +100;
    updateNoiseW(light);
  }
  if (key === 'w' || key === 'W') {
    light = light -100;
    updateNoiseW(light);
  }

}
