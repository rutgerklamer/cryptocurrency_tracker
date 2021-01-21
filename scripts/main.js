let topCoins;
let currentCoin;
let topCoinAmount = 100;
let currency = "$"
let pageCount = 1;
const geckoApiLink = "https://api.coingecko.com/api/v3";

$( document ).ready(function() {
    topCoins = JSON.parse(httpGet(geckoApiLink+getTopCoins(topCoinAmount,pageCount)));
    console.log(topCoins);
    for (i = 0; i < topCoinAmount; i++) {
      addCoinToDashboard(topCoins[i]);
    }
    console.log(topCoins);
    //showCoin();
});

function changePage(nextPage) {
  if (nextPage || pageCount > 1) {
    $(".dashboard").empty();
    $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  }
  if (nextPage) {
    pageCount++;
    topCoins = JSON.parse(httpGet(geckoApiLink+getTopCoins(topCoinAmount, pageCount)));
    for (i = 0; i < topCoinAmount; i++) {
      addCoinToDashboard(topCoins[i]);
    }
  } else if (pageCount > 1) {
    pageCount--;
    topCoins = JSON.parse(httpGet(geckoApiLink+getTopCoins(topCoinAmount, pageCount)));
    for (i = 0; i < topCoinAmount; i++) {
      addCoinToDashboard(topCoins[i]);
    }
  }
  console.log(pageCount);
}


function getTopCoins(amount) {
  return "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" + amount + "&page="+pageCount+"&sparkline=true&price_change_percentage=1h,24h,7d&";
}

function addCoinToDashboard(coin) {
  let changePercentage24h = stylePercentage(coin["price_change_percentage_24h"]);
  let changePercentage1h = stylePercentage(coin["price_change_percentage_1h_in_currency"]);
  let changePercentage7d = stylePercentage(coin["price_change_percentage_7d_in_currency"]);

  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = coin["id"];


  $(".dashboard").append( '<div class="coin"> <img src='+ coin["image"] +'> <a class="name"> #' + coin["market_cap_rank"] + ' ' +  coin["name"]   + '</a> <a> '+currency + coin["current_price"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '</a> ' + changePercentage1h +  changePercentage24h + changePercentage7d + '<a>' +currency + coin["total_volume"].toLocaleString('en') + '</a><a> <canvas id="'+coin["id"]+'"></canvas></a>');

  if (coin["sparkline_in_7d"]["price"][0] < coin["sparkline_in_7d"]["price"][coin["sparkline_in_7d"]["price"].length-1]) {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: greenColor, background: 'transparent' })
  } else {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: redColor, background: 'transparent' })
  }

  $(".dashboard").append('</a></div>')
}

function showCoin() {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = topCoins[0]["id"];
  newCanvas.width = 480;
  newCanvas.height = 360
  $(".dashboard").append('<a> <canvas class="full" id="'+topCoins[0]["id"]+'"></canvas></a>');

  var chart = new Graph({ data: topCoins[0]["sparkline_in_7d"]["price"], target: document.getElementById(topCoins[0]["id"]), lineWidth: 1, lineColor: greenColor, background: 'transparent' })
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
