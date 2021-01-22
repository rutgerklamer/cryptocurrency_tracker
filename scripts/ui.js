let darkMode = true;
let greenColor = getComputedStyle(document.documentElement).getPropertyValue('--green');
let redColor = getComputedStyle(document.documentElement).getPropertyValue('--red');
let bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bgColor');
let infoColor = getComputedStyle(document.documentElement).getPropertyValue('--infoColor');
let infoColorSelect = getComputedStyle(document.documentElement).getPropertyValue('--infoColorSelect');
let textColor = getComputedStyle(document.documentElement).getPropertyValue('--textColor');

function changeColorMode() {
  console.log("hello");
  darkMode = !darkMode;
  if (darkMode) {
     greenColor = '#02C08C';
     redColor = '#FF0346';
     bgColor = '#121111';
     infoColor = '#191B20';
     infoColorSelect = '#272B32';
     textColor = 'white';
  } else {
    greenColor = 'green';
    redColor = 'red';
    bgColor = '#F6F5F2';
    infoColor = '#F6F5F2';
    infoColorSelect = '#F0F1F5';
    textColor = '#3D3D3D';
  }
  let r = document.querySelector(':root');
  r.style.setProperty('--green', greenColor);
  r.style.setProperty('--red', redColor);
  r.style.setProperty('--bgColor', bgColor);
  r.style.setProperty('--infoColor', infoColor);
  r.style.setProperty('--infoColorSelect', infoColorSelect);
  r.style.setProperty('--textColor', textColor);

  if (bigChart) {
        let changeItemColor = (item) => {
            item.scaleLabel.fontColor = textColor;
            item.ticks.fontColor = textColor;
            item.ticks.minor.fontColor = textColor;
            item.ticks.major.fontColor = textColor;
        };
        bigChart.options.scales.xAxes.forEach((item) => changeItemColor(item));
        bigChart.options.scales.yAxes.forEach((item) => changeItemColor(item));
        var dataset = bigChart.data.datasets[0];
        dataset.borderColor = textColor;
        dataset.fontColor = textColor;
        bigChart.update();
  }

}
