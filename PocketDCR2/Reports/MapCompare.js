var map;
$(document).ready(function () {

   // alert('dad');
    var queryString = window.location.search;
    queryString = queryString.replace("?", "");
    queryString = queryString.replace("%20", " ");
    queryString = queryString.split("&");

    //var latlon = "{'Lat1':'" + queryString[0].split("=")[1] + "','Lng1':'" + queryString[1].split("=")[1] + "','Lat2':'" + queryString[2].split("=")[1] + "','Lng2':'" + queryString[3].split("=")[1] + "'}";
    //queryString[0].split("=")[1];
    initialize(queryString[0].split("=")[1], queryString[1].split("=")[1], queryString[2].split("=")[1], queryString[3].split("=")[1]);

    //$.ajax({
    //    type: "POST",
    //    url: "NewDashboard.asmx/getLocationByEmpId",
    //    contentType: "application/json; charset=utf-8",
    //    data: "{'date':'" + queryString[0].split("=")[1] + "-01','empid':'" + queryString[1].split("=")[1] + "'}",
    //    success: function (data) {
    //        var latlon = JSON.parse(data.d);
    //        initialize(latlon);
    //    },
    //    error: function () {
    //        alert("An Error occurd");
    //    },
    //    cache: false
    //});


});

function initialize(calllat, calllng, actlat, actlng) {
  
    //if (data.length == 0) {
    //    alert("location not found");
    //}

    var myLatLng = { lat: parseFloat(calllat), lng: parseFloat(calllng) };
    var myLatLng1 = { lat: parseFloat(actlat), lng: parseFloat(actlng) };

   
    var map = new google.maps.Map($("#map-canvas")[0], {
        zoom: 20,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (actlat != 0 && actlng != 0) {
        var marker1 = new google.maps.Marker({
            position: myLatLng1,
            map: map,
            icon: '../img/green2.png',
            title: 'Doctor Tag location'
        });
    }
    else {
        alert('Tag Location Not Exists');
    }

    if (calllat != 0 && calllng != 0) {
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: '../img/reddot.png',
            title: 'Call Location'
        });
    } else {
        alert('Doctor Location not Exist');
    }


    //$.each(data, function (index, ndx) {
    //    l
    //    new google.maps.Marker({
    //        position: new google.maps.LatLng(ndx.Latitude, ndx.Longitude),
    //        map: map
    //    });
    //});
}


function initMap(nlat, nlng,plat, plng) {
    //var myLatLng = { lat: 24.867255, lng: 67.082744 };

    var myLatLng = { lat: parseFloat(plat), lng: parseFloat(plng) };
    var myLatLng1 = { lat: parseFloat(nlat), lng: parseFloat(nlng) };

    //var locations = [
    //  [parseFloat(plat), parseFloat(plng)],
    //  [24.862038, 67.070059]
    //];
    var map = new google.maps.Map($("#dvMap")[0], {
        zoom: 8,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'previous location'
    });

    var marker1 = new google.maps.Marker({
        position: myLatLng1,
        map: map,
        title: 'New location'
    });

    //for (var i = 0; i < locations.length; i++) {

    //    var marker = new google.maps.Marker({
    //        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //        map: map,
    //        title: 'loc'
    //    });

    //}

    //var marker = new google.maps.Marker({
    //    position: myLatLng,
    //    map: map,
    //    title: 'Location'
    //});
}


