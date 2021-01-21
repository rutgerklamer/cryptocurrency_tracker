let darkMode = true;
let greenColor = '#02C08C';
let redColor = '#FF0346';
let bgColor = '#121111';
let infoColor = '#191B20';
let infoColorSelect = '#272B32';
let textColor = 'white';

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

}
