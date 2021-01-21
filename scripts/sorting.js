function sortByRank(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(' + ((down) ? 'false)" style="margin-left: 48px">Coin <i class="arrow up"></i>'  : 'true)" style="margin-left: 48px">Coin <i class="arrow down"></i>') + '</a> <a  onclick="sortByPrice(false)">Price per coin </a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a> <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  sortByString(topCoins, "market_cap_rank");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}

function sortBy(down, item) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin"> <a  class="name"  onclick="sortByRank(true)" style="margin-left: 48px">Coin </a> <a onclick="sortByPrice(' + ((down) ? 'false' : 'true') + ')">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');

}

function sortByPrice(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>  <a onclick="sortByPrice(' + ((down) ? 'false)">Price per coin <i class="arrow up"></i>'  : 'true)">Price per coin <i class="arrow down"></i>') + ' <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a>  <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  sortByString(topCoins, "current_price");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}


function sortByPriceChange1h(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(' + ((down) ? 'false)">Change 1 hrs <i class="arrow up"></i>'  : 'true)">Change 1 hrs <i class="arrow down"></i>') + '<a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  sortByString(topCoins, "price_change_percentage_1h_in_currency");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}



function sortByPriceChange24h(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a> <a onclick="sortByPriceChange24h(' + ((down) ? 'false)">Change 24 hrs <i class="arrow up"></i>'  : 'true)">Change 24 hrs <i class="arrow down"></i>') + '</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  sortByString(topCoins, "price_change_percentage_24h");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}

function sortByPriceChange7d(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true  )" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a> <a onclick="sortByPriceChange24h(false)">Change 24 hrs</a><a onclick="sortByPriceChange7d(' + ((down) ? 'false)">Change 7 days <i class="arrow up"></i>'  : 'true)">Change 7 days <i class="arrow down"></i>') + '</a><a onclick="sortByTotalVolume(false)">Total volume</a><a onclick="sortByPriceChange7d(' + ((down) ? 'false' : 'true') + ')">7 day graph</a></div>');
  sortByString(topCoins, "price_change_percentage_7d_in_currency");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}

function sortByTotalVolume(down) {
  $(".dashboard").empty();
  $(".dashboard").append('<div class="coin">     <a  class="name" onclick="sortByRank(true)" style="margin-left: 48px">Coin </a>      <a  onclick="sortByPrice(false)">Price per coin</a> <a  onclick="sortByPriceChange1h(false)">Change 1 hrs</a> <a onclick="sortByPriceChange24h(false)"> Change 24 hrs</a><a onclick="sortByPriceChange7d(false)">Change 7 days</a><a onclick="sortByTotalVolume(' + ((down) ? 'false)">Total volume <i class="arrow up"></i>'  : 'true)">Total volume <i class="arrow down"></i>') +'<a onclick="sortByPriceChange7d(false)">7 day graph</a></div>');
  sortByString(topCoins, "total_volume");

  if (down) {
    for (i = 0; i < topCoinAmount; i++)
      addCoinToDashboard(topCoins[i]);
  } else {
    for (i = topCoinAmount-1; i > 0; i--)
      addCoinToDashboard(topCoins[i]);
  }
}

function sortByString(arr, index) {
    let endIndex = arr.length - 1;
    while(endIndex > 0){
        let swaps = 0;
        let currentIndex = 0;
        while(currentIndex < endIndex){
            if(arr[currentIndex][index] > arr[currentIndex + 1][index]){
                var b = arr[currentIndex];
                arr[currentIndex] = arr[currentIndex+1];
                arr[currentIndex+1] = b;
                swaps++;
            }
            currentIndex++;
        }
        if(swaps === 0) break;
        endIndex--;
    }
    return arr;
}
