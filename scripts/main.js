let topCoins;
let topCoinAmount = 100;
let bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bgColor');
let greenColor = getComputedStyle(document.documentElement).getPropertyValue('--green');
let redColor = getComputedStyle(document.documentElement).getPropertyValue('--red');
let infoColor = getComputedStyle(document.documentElement).getPropertyValue('--infoColor');

$( document ).ready(function() {
    const geckoApiLink = "https://api.coingecko.com/api/v3";
    topCoins = JSON.parse(httpGet(geckoApiLink+getTopCoins(topCoinAmount)));
    for (i = 0; i < topCoinAmount; i++) {
      addCoinToDashboard(topCoins[i]);
    }
    console.log(topCoins);

});

function getTopCoins(amount) {
  return "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" + amount + "&page=1&sparkline=true&price_change_percentage=1h,24h,7d&";
}

function addCoinToDashboard(coin) {
  let changePercentage24h = stylePercentage(coin["price_change_percentage_24h"]);
  let changePercentage1h = stylePercentage(coin["price_change_percentage_1h_in_currency"]);
  let changePercentage7d = stylePercentage(coin["price_change_percentage_7d_in_currency"]);

  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = coin["id"];


  $(".dashboard").append( '   <div class="coin"> <img src='+ coin["image"] +'> <a> #' + coin["market_cap_rank"] + ' ' +  coin["name"]   + '</a>      <a> $' + (coin["current_price"]).toLocaleString('en') + '</a> ' + changePercentage1h + '</a>' + '</a>' + changePercentage24h + '</a>' + changePercentage7d+ '</a><a> <canvas id="'+coin["id"]+'"></canvas>');

  if (coin["sparkline_in_7d"]["price"][0] < coin["sparkline_in_7d"]["price"][coin["sparkline_in_7d"]["price"].length-1]) {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: greenColor, background: infoColor })
  } else {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: redColor, background: infoColor })
  }

  $(".dashboard").append('</a></div>')

}

function stylePercentage(percentage) {
  if (percentage == null) {
    return "<a> unkown </a>";
  } else if (percentage.toFixed(2)[0] == "-") {
   return '<a style="color:'+redColor +';">' + percentage.toFixed(2) + '%</a>'
   } else {
     let plusText = '+' + percentage.toFixed(2);
     return '<a style="color: '+greenColor +';">' + plusText + '%</a>';
   }
}
