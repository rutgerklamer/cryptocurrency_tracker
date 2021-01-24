let topCoins;
let allCoins;
let allTopCoins;
let currentCoin;
let topCoinAmount = 100;
let currency = ["$", "usd"]
let pageCount = 1;
let bigChart;
let exchangeRate = 1.0;

const geckoApiLink = "https://api.coingecko.com/api/v3";

$(document).ready(function() {
    allCoins = JSON.parse(httpGet(geckoApiLink + getAllCoins()));

    topCoins = JSON.parse(httpGet(geckoApiLink + getTopCoins(topCoinAmount, pageCount)));
    console.log(topCoins);
    for (i = 0; i < topCoinAmount; i++) {
        addCoinToDashboard(topCoins[i]);
    }

    $("#coinSearch").keyup(function() {
      let foundCoins = searchCoin($("#coinSearch").val());
      console.log(foundCoins)
      if (foundCoins[0]) {
          $("#item0").html(allCoins[foundCoins[0]]["name"]);
          document.getElementById("item0").dataset.coinId = allCoins[foundCoins[0]]["id"];
      } else {
          $("#item0").text("");
      }
      if (foundCoins[1]) {
        $("#item1").text(allCoins[foundCoins[1]]["name"]);
        document.getElementById("item1").dataset.coinId = allCoins[foundCoins[1]]["id"];
      } else {
          $("#item1").text("");
      }
      if (foundCoins[2]) {
        $("#item2").text(allCoins[foundCoins[2]]["name"]);
        document.getElementById("item2").dataset.coinId = allCoins[foundCoins[2]]["id"];
      } else {
          $("#item2").text("");
      }

      if (foundCoins[3]) {
        $("#item3").text(allCoins[foundCoins[3]]["name"]);
        document.getElementById("item3").dataset.coinId = allCoins[foundCoins[3]]["id"];
      } else {
          $("#item3").text("");
      }

      if (foundCoins[4]) {
        $("#item4").text(allCoins[foundCoins[4]]["name"]);
        document.getElementById("item4").dataset.coinId = allCoins[foundCoins[4]]["id"];
      } else {
          $("#item4").text("");
      }
      if (!foundCoins[0] && !foundCoins[1] && !foundCoins[2]) {
        $(".searchContent").css("width", "0");
      } else {
        $(".searchContent").css("width", "30%");
      }
    });

});

function goToCoin(e) {
  $(".searchContent").css("width", "0");
  $("#item0").text("");
  $("#item1").text("");
  $("#item2").text("");
  $("#item3").text("");
  $("#item4").text("");
  showCoin(e.dataset.coinId);
}

function searchCoin(inp) {
  if (inp == "") {
    return Array();
  }

  var target = "b";
  let allMatchedCoins = [];
  for (i = 0; i < allCoins.length; i++) {
    const id = allCoins[i]["id"].toLowerCase();
    const symbol = allCoins[i]["symbol"].toLowerCase();
    const name = allCoins[i]["name"].toLowerCase();
    const substring = inp.toLowerCase();

    if (!(name.includes("0.5x long")) && !(name.includes("1x short")) && !(name.includes("3x long")) && !(name.includes("3x short"))) {
      if (id.includes(substring)) {
        allMatchedCoins.push(i);
      } else
      if (symbol.includes(substring)) {
        allMatchedCoins.push(i);
      } else
      if (name.includes(substring)) {
        allMatchedCoins.push(i);
      }
    }
  }
  return allMatchedCoins;
}

function getAllCoins() {
    return "/coins/list";
}

function getPriceUpdate(coinId) {
    return "/simple/price?ids=" + coinId + "&vs_currencies=" + currency[1];
}

function getTopCoins(amount, curr) {
    return "/coins/markets?vs_currency=" + currency[1] + "&order=market_cap_desc&per_page=" + amount + "&page=" + pageCount + "&sparkline=true&price_change_percentage=1h,24h,7d&";
}

function getCoinMarket(coinId, curr, days) {
  return "/coins/" + coinId + "/market_chart?vs_currency=" + currency[1] + "&days="+days+"";
}

function getCoinInfo(coinId) {
    return "/coins/" + coinId + "?vs_currency=" + currency[1] + "&sparkline=true";
}

function getCoinInfo(coinId) {
    return "/coins/" + coinId + "?vs_currency=" + currency[1] + "&sparkline=true";
}

function getCoinHistory(coinId, date) {
    return "/coins/" + coinId + "/history?date=" + date;
}


function changePage(nextPage) {
    if (nextPage || pageCount > 1) {
        $(".dashboard").empty();
        $(".dashboard").append('<div class="coin">  <a class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
    }
    if (nextPage) {
        pageCount++;
        topCoins = JSON.parse(httpGet(geckoApiLink + getTopCoins(topCoinAmount, pageCount)));
        for (i = 0; i < topCoinAmount; i++) {
            addCoinToDashboard(topCoins[i]);
        }
    } else if (pageCount > 1) {
        pageCount--;
        topCoins = JSON.parse(httpGet(geckoApiLink + getTopCoins(topCoinAmount, pageCount)));
        for (i = 0; i < topCoinAmount; i++) {
            addCoinToDashboard(topCoins[i]);
        }
    }
}

function addCoinToDashboard(coin) {
    let changePercentage24h = stylePercentage(coin["price_change_percentage_24h"]);
    let changePercentage1h = stylePercentage(coin["price_change_percentage_1h_in_currency"]);
    let changePercentage7d = stylePercentage(coin["price_change_percentage_7d_in_currency"]);

    let newCanvas = document.createElement('CANVAS');
    newCanvas.id = coin["id"];

    $(".dashboard").append('<div class="coin fully" onclick="showCoin(&quot;' + coin["id"] + '&quot;)"> <img src=' + coin["image"] + '> <a class="name"> #' + coin["market_cap_rank"] + ' ' + coin["name"] + '</a> <a> ' + currency[0] + coin["current_price"].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '</a> ' + changePercentage1h + changePercentage24h + changePercentage7d + '<a>' + currency[0] + coin["total_volume"].toLocaleString('en') + '</a><a> <canvas width="100%"height="100%"id="' + coin["id"] + '"></canvas></a>');

    if (coin["sparkline_in_7d"]["price"][0] < coin["sparkline_in_7d"]["price"][coin["sparkline_in_7d"]["price"].length - 1]) {
        var chart = new Graph({
            data: coin["sparkline_in_7d"]["price"],
            target: document.getElementById(coin["id"]),
            lineWidth: 1,
            lineColor: greenColor,
            background: 'transparent'
        })
    } else {
        var chart = new Graph({
            data: coin["sparkline_in_7d"]["price"],
            target: document.getElementById(coin["id"]),
            lineWidth: 1,
            lineColor: redColor,
            background: 'transparent'
        })
    }

    $(".dashboard").append('</a></div>')
}

function updatePrice(coinId, symbol) {
  if ($("#currentPrice")[0]) {
    let price = JSON.parse(httpGet(geckoApiLink + getPriceUpdate(coinId)));
    $("#currentPrice").text("Current price of " + symbol + ": " + currency[0]+price[coinId][currency[1]].toLocaleString("en"));
    console.log("Current price of " + symbol + ": " + currency[0]+price[coinId][currency[1]].toLocaleString("en"))
    setTimeout(function(){updatePrice(coinId,symbol);},1000);
  }
}

//select multiple coins and display them in a graph, normalized

/*
function multipleCoins(ids) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Go back </a>      </div>');
  let newCanvas = document.createElement('CANVAS');
  newCanvas.id = coinInfo["id"];
  $(".dashboard").append('<div class="coinWrapper"><div class="full"> <canvas id="multipleCoinsGraph"></canvas></div</div>');
  exchangeRate = parseFloat(coinInfo["market_data"]["current_price"]["usd"]) / parseFloat(coinInfo["market_data"]["current_price"][currency[1]]);
  setTimeout(function(){updatePrice(coinInfo["id"],coinInfo["symbol"]);},1000);

  let sparkline = coinInfo["market_data"]["sparkline_7d"]["price"].map(i => parseFloat(i));


  drawChart(coinInfo["id"], sparkline);
}
*/

function changeGraph(coinId, length) {
  let coinMarketInfo = JSON.parse(httpGet(geckoApiLink + getCoinMarket(coinId.id, currency[1], length/24)));
  let sparkline =  [];
  for (i = 0; i < coinMarketInfo["prices"].length; i++) {
    sparkline.push(coinMarketInfo["prices"][i][1]);
  }
  bigChart.destroy();
  drawChart(coinId.id, sparkline);
}

function showCoin(coinId) {
    let coinInfo = JSON.parse(httpGet(geckoApiLink + getCoinInfo(coinId)))
    console.log(coinInfo)


    $(".dashboard").empty();
    $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Go back </a><a  class="name" onclick="changeGraph('+coinInfo["id"]+',24)">Get 24h graph </a><a  class="name" onclick="changeGraph('+coinInfo["id"]+',168)">Get 7 day graph </a>       </div>');
    let newCanvas = document.createElement('CANVAS');
    newCanvas.id = coinInfo["id"];
    $(".dashboard").append('<div class="coinWrapper"><div class="full"> <canvas id="' + coinInfo["id"] + '"></canvas></div><div class="sideInfo"><a id="currentPrice">Current price of '+coinInfo["symbol"] + ': ' + currency[0] + coinInfo["market_data"]["current_price"][currency[1]].toLocaleString('en') + '</a><br><a>Highest last 24 hr: ' + currency[0] + coinInfo["market_data"]["high_24h"][currency[1]].toLocaleString('en') + '</a><br><a>Lowest last 24 hr: ' + currency[0] + coinInfo["market_data"]["low_24h"][currency[1]].toLocaleString('en') + '</a><br><a>Difference between: ' + currency[0] + (parseFloat(coinInfo["market_data"]["high_24h"][currency[1]]-coinInfo["market_data"]["low_24h"][currency[1]])).toLocaleString('en') + '</a><br><a>Market cap: '+ currency[0] + coinInfo["market_data"]["market_cap"][currency[1]].toLocaleString('en') + '</a><br><a>Volume: '+ currency[0] + coinInfo["market_data"]["total_volume"][currency[1]].toLocaleString('en') + '</a><br><a>Price change 1h: <a style="color:'+((coinInfo["market_data"]["price_change_percentage_1h_in_currency"][currency[1]] > 0) ? 'var(--green)' : 'var(--red)')+';">' + coinInfo["market_data"]["price_change_percentage_1h_in_currency"][currency[1]] + '</a>%</a><br><a>Price change 24h: <a style="color:'+((coinInfo["market_data"]["price_change_percentage_24h_in_currency"][currency[1]] > 0) ? 'var(--green)' : 'var(--red)')+';">' + coinInfo["market_data"]["price_change_percentage_24h_in_currency"][currency[1]] + '</a>%</a><br><a>Price change 7d: <a style="color:'+((coinInfo["market_data"]["price_change_percentage_7d_in_currency"][currency[1]] > 0) ? 'var(--green)' : 'var(--red)')+';">' + coinInfo["market_data"]["price_change_percentage_7d_in_currency"][currency[1]] + '</a>%</a><br><a>Market cap rank: #' + coinInfo["market_data"]["market_cap_rank"] + '</a><br><a>All time high: ' + currency[0] + coinInfo["market_data"]["ath"][currency[1]].toLocaleString('en') + '</a><br><a>All time high change: <a style="color:' + ((coinInfo["market_data"]["ath_change_percentage"][currency[1]] > 0) ? 'var(--green)' : 'var(--red)') +'">' + coinInfo["market_data"]["ath_change_percentage"][currency[1]].toLocaleString('en') + '</a>%</a></div></div><div class="coinDescription"><div ><a style="color:var(--red)">Coin info: </a>'+coinInfo["description"]['en']+'</div></div><div class="coinDescription small"><div><a style="color:var(--red)">Coin media:<br> </a><a href="'+coinInfo["links"]['homepage'][0]+'">Website</a><br><a href="'+coinInfo["links"]['blockchain_site'][0]+'">Blockchain scan site</a><br><a href="https://twitter.com/'+coinInfo["links"]['twitter_screen_name']+'">Twitter</a><br><a href="https://facebook.com/'+coinInfo["links"]['facebook_username']+'">Facebook</a><br>'+(coinInfo["links"]['subreddit_url'] ? "<a href=" + coinInfo["links"]['subreddit_url']+">Reddit</a><br>" : "")+(coinInfo["links"]['official_forum_url'][0] ? "<a href=" + coinInfo["links"]['official_forum_url'][0] +">Forum</a><br>" : "")+'</div></div><div class="likePercentageBarRed"><div class="likePercentageBarGreen" style="width:'+(100-coinInfo["sentiment_votes_down_percentage"])+'%"><a>Coingecko community likes today</a></div></div>');
    exchangeRate = parseFloat(coinInfo["market_data"]["current_price"]["usd"]) / parseFloat(coinInfo["market_data"]["current_price"][currency[1]]);
    setTimeout(function(){updatePrice(coinInfo["id"],coinInfo["symbol"]);},1000);

    let sparkline = coinInfo["market_data"]["sparkline_7d"]["price"].map(i => parseFloat(i));


    drawChart(coinInfo["id"], sparkline);
}

function normalizeArray(arr, min, max, a, b) {
  for (i = 0; i < arr.length; i++) {
    arr[i] = parseFloat(arr[i] - min)  / parseFloat(max - min) * (b-a) + a;
  }
  return arr;
}

/*
function getMarketData() {
let coinMarketInfo = JSON.parse(httpGet(geckoApiLink + getCoinMarket(coinId, currency[1], 7)));

let volume_24h =  [];
for (i = 0; i < coinMarketInfo["total_volumes"].length; i++) {
  volume_24h.push(coinMarketInfo["total_volumes"][i][1]);
}
console.log(normalizeArray(volume_24h, Math.min(...volume_24h) , Math.max(...volume_24h) , Math.min(...sparkline) ,Math.max(...sparkline)))
} */


/*

function getCommunityData() {

  let alexaline = [];
  for (i = 0; i < 28; i++) {
    var date = new Date();
    date.setHours(date.getHours() - (i*24));
    let response = JSON.parse(httpGet(geckoApiLink + getCoinHistory(coinInfo["id"], date.toLocaleDateString("nl-NL").replace(".", "-"))));
    for (j = 0; j < 6; j++) {
      alexaline.push(response["community_data"]["reddit_accounts_active_48h"]);
    }
  }
  let maxValue = Math.max(...sparkline);

  console.log(normalizeArray(alexaline, Math.min(...alexaline), Math.max(...alexaline), Math.min(...sparkline), maxValue));

  for (i = 0; i < alexaline.length; i++) {
    //alexaline[i] *= maxValue;
  }

} */ //works but dirty and heavy, used for displaying community activity line


function stylePercentage(percentage) {
    if (percentage == null) {
        return "<a> unkown </a>";
    } else if (percentage.toFixed(2)[0] == "-") {
        return '<a style="color:' + redColor + ';">' + percentage.toFixed(2) + '%</a>'
    } else {
        let plusText = '+' + percentage.toFixed(2);
        return '<a style="color: ' + greenColor + ';">' + plusText + '%</a>';
    }
}


function fixSparklineDecimals(arr) {
    for (i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i].toString().slice(0, -arr[i].toString().length + 10).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',').replace(/,/g, '')) / parseFloat(exchangeRate);
    }
    return arr;
}

function getSparklineLabels(arr) {
    let labels = new Array();
    for (i = 0; i < arr.length; i++) {
        var date = new Date();
        date.setHours(date.getHours() - arr.length + i);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric'
        };

        labels.push(date.toLocaleDateString('eng', options));
    }
    return labels;
}

function drawChart(coinId, sparkline) {

    var ctx = document.getElementById(coinId).getContext('2d');

    ctx.canvas.width = screen.width * 0.64;
    ctx.canvas.height =  screen.width * 0.48;
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
                backgroundColor: "#02C08C",
                showLine: true
            }],
        },
        options: {
          responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
                borderColor: redColor,
                backgroundColor: redColor,
                titleFontColor: textColor,
                bodyFontColor: textColor
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            title: {
                display: true,
                text: coinId + ' price in ' + currency[1].toUpperCase()
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        fontColor: textColor
                    },
                    gridLines: {
                        color: infoColorSelect
                    },
                    ticks: {
                        maxTicksLimit: 14.285,
                        fontColor: textColor,
                        minor: {
                            fontColor: textColor
                        },
                        major: {
                            fontColor: textColor
                        }
                    },
                }],
                yAxes: [{
                    scaleLabel: {
                        fontColor: textColor
                    },
                    gridLines: {
                        color: infoColorSelect
                    },
                    ticks: {
                      callback: function(value, index, values) {
                        return '$' + value.toLocaleString("en");
                    },
                        maxTicksLimit: 14.285,
                        fontColor: textColor,
                        minor: {
                            fontColor: textColor
                        },
                        major: {
                            fontColor: textColor
                        }
                    },
                }]
            },
        }
    });
}
