let darkMode = true;
let greenColor = getComputedStyle(document.documentElement).getPropertyValue('--green');
let redColor = getComputedStyle(document.documentElement).getPropertyValue('--red');
let bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bgColor');
let infoColor = getComputedStyle(document.documentElement).getPropertyValue('--infoColor');
let infoColorSelect = getComputedStyle(document.documentElement).getPropertyValue('--infoColorSelect');
let textColor = getComputedStyle(document.documentElement).getPropertyValue('--textColor');

function changeCurrency(cur) {
    currency[0] = cur;
    if (currency[0] == "$") {
        currency[1] = "usd";
    } else if (currency[0] == "€") {
        currency[1] = "eur";
    } else if (currency[0] == "£") {
        currency[1] = "gbp";
    }

    $(".dashboard").empty();
    $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
    topCoins = JSON.parse(httpGet(geckoApiLink + getTopCoins(topCoinAmount, pageCount)));
    for (i = 0; i < topCoinAmount; i++) {
        addCoinToDashboard(topCoins[i]);
    }
}

function changeColorMode() {
    darkMode = !darkMode;
    if (darkMode) {
        greenColor = '#02C08C';
        redColor = '#FF0346';
        bgColor = '#121111';
        infoColor = '#191B20';
        infoColorSelect = '#272B32';
        textColor = '#FFFFC0';
    } else {
        greenColor = '#02C08C';
        redColor = '#FF0346';
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
            item.gridLines.color = infoColorSelect;
        };
        bigChart.options.scales.xAxes.forEach((item) => changeItemColor(item));
        bigChart.options.scales.yAxes.forEach((item) => changeItemColor(item));
        bigChart.options.borderColor = redColor;
        bigChart.options.backgroundColor = redColor;
        bigChart.options.titleFontColor = textColor;
        bigChart.options.bodyFontColor = textColor;
        bigChart.data.datasets[0].borderColor = textColor;
        bigChart.data.datasets[0].backgroundColor = textColor;
        bigChart.data.datasets[0].fontColor = textColor;
        bigChart.update();
    }

}
