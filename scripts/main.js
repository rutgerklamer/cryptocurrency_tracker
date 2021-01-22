let topCoins;
let currentCoin;
let topCoinAmount = 100;
let currency = ["$", "usd"]
let pageCount = 1;
let bigChart;
const geckoApiLink = "https://api.coingecko.com/api/v3";

$( document ).ready(function() {
    topCoins = JSON.parse(httpGet(geckoApiLink+getTopCoins(topCoinAmount,pageCount)));
    for (i = 0; i < topCoinAmount; i++) {
      addCoinToDashboard(topCoins[i]);
    }
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
}


function getTopCoins(amount, curr) {
  return "/coins/markets?vs_currency="+currency[1]+"&order=market_cap_desc&per_page=" + amount + "&page="+pageCount+"&sparkline=true&price_change_percentage=1h,24h,7d&";
}

function getCoinInfo(coin) {
  return "/coins/"+ coin + "?sparkline=true" ;
}

function addCoinToDashboard(coin) {
  let changePercentage24h = stylePercentage(coin["price_change_percentage_24h"]);
  let changePercentage1h = stylePercentage(coin["price_change_percentage_1h_in_currency"]);
  let changePercentage7d = stylePercentage(coin["price_change_percentage_7d_in_currency"]);

  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = coin["id"];

  $(".dashboard").append( '<div class="coin" onclick="showCoin(&quot;'+coin["id"]+'&quot;, this)"> <img src='+ coin["image"] +'> <a class="name"> #' + coin["market_cap_rank"] + ' ' +  coin["name"]   + '</a> <a> '+currency[0] + coin["current_price"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '</a> ' + changePercentage1h +  changePercentage24h + changePercentage7d + '<a>' +currency[0] + coin["total_volume"].toLocaleString('en') + '</a><a> <canvas width="100%"height="100%"id="'+coin["id"]+'"></canvas></a>');

  if (coin["sparkline_in_7d"]["price"][0] < coin["sparkline_in_7d"]["price"][coin["sparkline_in_7d"]["price"].length-1]) {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: greenColor, background: 'transparent' })
  } else {
    var chart = new Graph({ data: coin["sparkline_in_7d"]["price"], target: document.getElementById(coin["id"]), lineWidth: 1, lineColor: redColor, background: 'transparent' })
  }

  $(".dashboard").append('</a></div>')
}

function showCoin(coinId, e) {
  let coinInfo = JSON.parse(httpGet(geckoApiLink+getCoinInfo(coinId)))

  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Go back </a>      </div>');
  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = coinInfo["id"];
  $(".dashboard").append('<div class="full"> <canvas id="'+coinInfo["id"]+'"></canvas></div>');
  drawChart(coinInfo["id"], coinInfo["market_data"]["sparkline_7d"]["price"]);
  //var chart = new Graph({ data: coinInfo["market_data"]["sparkline_7d"]["price"], target: document.getElementById(coinInfo["id"]), lineWidth: 4, lineColor: greenColor, background: 'transparent' });
}

function fixSparklineDecimals(arr) {
  for (i = 0; i < arr.length; i++) {
    arr[i] = parseFloat(arr[i].toString().slice(0, -arr[i].toString().length + 10).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',').replace(/,/g, ''));
  }
  return arr;
}

function getSparklineLabels(arr) {
  let labels = new Array();
  for (i = 0; i < arr.length; i++) {
    var date = new Date();
    date.setHours(date.getHours() - arr.length + i);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };

    labels.push(date.toLocaleDateString('eng', options));
  }
  return labels;
}

function drawChart(coinId, sparkline) {

var ctx = document.getElementById(coinId).getContext('2d');

ctx.canvas.width = 480;
ctx.canvas.height = 360;
bigChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: getSparklineLabels(sparkline),
    datasets: [{
        data: fixSparklineDecimals(sparkline),
        label: coinId,
        borderColor: textColor,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: false,
        backgroundColor: textColor,
        showLine: true
      }
    ]
  },
    options: {
    tooltips: {
      mode: 'index',
      intersect: false
   },
   hover: {
      mode: 'index',
      intersect: false
   },
    title: {
      display: true,
      text: coinId + ' price in ' + currency[0]
    }, legend: {
            display: false,
          },
        scales: {
    xAxes: [{
        scaleLabel: {fontColor: textColor},
        ticks: {
            maxTicksLimit: 14.285,
            fontColor: textColor,
            gridLines: { color: infoColorSelect },
            minor: { fontColor: textColor },
            major: { fontColor: textColor }
        },
    }],
    yAxes: [{
        scaleLabel: {fontColor: textColor},
        ticks: {
            maxTicksLimit: 14.285,
            fontColor: textColor,
            gridLines: { color: infoColorSelect },
            minor: { fontColor: textColor },
            major: { fontColor: textColor }
        },
    }]
},
  }
});
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
