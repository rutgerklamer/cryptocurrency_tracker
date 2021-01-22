function httpGet(theUrl)
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );

    return xmlHttp.responseText;
}
/*background-image:url('../img/loading.gif');
background-repeat:no-repeat;
background-size: 100px;*/
