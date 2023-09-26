$(document).ready(function () {
    var caseone = moment().format('dddd, MMMM Do YYYY');
    $('#currentdiv').text(caseone);
    fillSpecialityCovered();
    FillBrandsDetails();
    FillCountOfData();
    fillCallChampions();
    FillLastCallTime();
    FillMapWithLocation();
    moment.locale();   
    
});
var d = new Date();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var day = d.getDate();
var fillCallChampions = function () {

    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/CallChampions",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "'}",
        success: onSuccessGetCHampions,
        error: onError,
        cache: false
    });
}
var onSuccessGetCHampions = function (response) {
    var msg = jQuery.parseJSON(response.d);

    for (var i = 1; i < 4; i++) {
        if (i == 1) {
            
            $('#empterritory1').text(msg[0].Territory);
            $('#empname1').text(msg[0].EmployeeName);
            $('#totalnumcalls1').text('Avg Calls: ' + msg[0].NoOfCalls);

            $('#imageone').append(' <img src="../TeamImages/' + msg[0].EmployeeId + '_image.jpg" style="height: 100px" onerror=\" this.onerror=null;this.src=\'../TeamImages/484_image.jpg\'; \" />');
            //$('#imageone').append(' <img src="../assets/img/' + msg[0].EmployeeId + '.jpg" style="height: 100px" />');
        }
        else if (i == 2) {
            $('#empterritory2').text(msg[1].Territory);
            $('#empname2').text(msg[1].EmployeeName);
            $('#totalnumcalls2').text('Avg Calls: ' + msg[1].NoOfCalls);
            $('#imagetwo').append(' <img src="../TeamImages/' + msg[1].EmployeeId + '_image.jpg" style="height: 100px" onerror=\" this.onerror=null;this.src=\'../TeamImages/484_image.jpg\'; \" />');
            //$('#imagetwo').append(' <img src="../assets/img/' + msg[1].EmployeeId + '.jpg" style="height: 100px" />');
        }
        else if (i == 3) {
            $('#empterritory3').text(msg[2].Territory);
            $('#empname3').text(msg[2].EmployeeName);
            $('#totalnumcalls3').text('Avg Calls: ' + msg[2].NoOfCalls);
            $('#imagethree').append(' <img src="../TeamImages/' + msg[2].EmployeeId + '_image.jpg" style="height: 100px" onerror=\" this.onerror=null;this.src=\'../TeamImages/484_image.jpg\'; \" />');
            //$('#imagethree').append(' <img src="../assets/img/' + msg[2].EmployeeId + '.jpg" style="height: 100px" />');
        }
    }

}

var FillBrandsDetails = function () {
    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/BrandDetails",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "','day':'"+day+"'}",
        success: onSuccessBrands,
        error: onError,
        cache: false
    });
}
var onSuccessBrands = function (response) {
    var msg = jQuery.parseJSON(response.d);
    var data = [];
    var dataP1 = [];

    $.each(msg, function (i, option) {
        data.push({
            name: '<b>' + option.ProductName + '<b> : ' + parseInt(option.CountOfProduct) + ', P1 : ' + parseInt(option.CountOfProductP1),
            data: [parseInt(option.CountOfProduct)]
           
        });
     //   dataP1.push(parseInt(option.CountOfProductP1));
    });

  //  var p1Hits = "P1 Calls For Product: <br>";

    //$.each(dataP1, function (i, p1Count) {
    //    p1Hits += data[i].name + ": " + p1Count + "<br>";

    //});


    $(function () {
        Highcharts.chart('brandchart', {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 0,
                    depth: 100
                }
            },
            title: {
                text: null
            },
            //subtitle: {
            //    text: p1Hits
            //},
            plotOptions: {
                column: {
                    depth: 25,
                    //events: { // disabled click
                    //    legendItemClick: function () {
                    //        return false;
                    //    }
                    //}
                    //events: { // show alert on click
                    //    click: function () {
                    //        debugger
                    //        alert(this.name)
                    //    }
                    //}
                }
            },
            xAxis: {
                categories: null
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: data,
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ' <b>';

                }
            }
        });
    });

}

var fillSpecialityCovered = function () {

    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/SpecialistCoverd",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "','day':'" + day + "'}",
        success: onSuccessSpeciality,
        error: onError,
        cache: false
    });
}
var onSuccessSpeciality = function (response) {
    var msg = jQuery.parseJSON(response.d);
    var data = [];
    $.each(msg, function (i, option) {
        data.push({
            name: option.SpecialiityName,
            y: parseInt(option.CountOfSpecialist)
        });
    });

    $(function () {
        Highcharts.chart('specialistChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: ''
            },
            //tooltip: {
            //    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            //},
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    size: 200,
                    //dataLabels: {
                    //    enabled: false,
                    //    //formatter: function () {
                    //    //    return this.percentage.toFixed(2) + '%';
                    //    //}
                    //}
                    //point: {
                    //    events: {
                    //        legendItemClick: function (e) {
                    //            e.preventDefault();
                    //            return false;
                    //        }
                    //    }
                    //}
                }
            },
            legend: {
                //enabled: true,
                //layout: 'horizontal',
                //align: 'right',
                //width: 200,
                //verticalAlign: 'middle',
                //useHTML: true,
                labelFormatter: function () {
                    return '<div style="text-align: left; width:130px;float:left;">' + this.name + '</div><div style="width:40px; float:left;text-align:right;"> (' + this.y + ')</div>';
                }
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: data
            }]
        });

    });

}

var FillCountOfData = function () {
    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/CountOfData",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "','day':'" + day + "'}",
        success: onSuccessCountofData,
        error: onError,
        cache: false
    });
}

var onSuccessCountofData = function (response) {
    var msg = jQuery.parseJSON(response.d);
    var places = ['#nationalcount', '#southcount', '#centralcount', '#northcount', '#karachicount', '#faisalabadcount', '#islamabadcount', '#hyderabadcount', '#multancount', '#peshawarcount', '#sukkurcount', '#Sialkotcount', '#lahorecount', '#Gujranwalacount', '#Swatcount', '#Mardancount'];

    var national = msg[0].NationalTotalCalls;
    var north = msg[0].NorthCount;
    var south = msg[0].SouthCount;
    var central = msg[0].CentralCount;
    var karachi = msg[0].KarachiCount;
    var hyderabad = msg[0].HyderabadCount;
    var islamabad = msg[0].IslamabadCount;
    var lahore = msg[0].LahoreCount;
    var sukkur = msg[0].SukkurCount;
    var multan = msg[0].MultanCount;
    var peshawar = msg[0].PeshawarCount;
    var faisalabad = msg[0].FaisalabadCount;
    var Sialkot = msg[0].SialkotCount;
    var Swat = msg[0].SwatCount;
    var Mardan = msg[0].MardanCount;
    var Gujranwala = msg[0].GujranwalaCount;

    $('#nationalcount').text(national);
    $('#southcount').text(south);
    $('#northcount').text(north);
    $('#centralcount').text(central);
    $('#karachicount').text(karachi);
    $('#faisalabadcount').text(faisalabad);
    $('#islamabadcount').text(islamabad);
    $('#hyderabadcount').text(hyderabad);
    $('#multancount').text(multan);
    $('#peshawarcount').text(peshawar);
    $('#sukkurcount').text(sukkur);
    $('#Sialkotcount').text(Sialkot);
    $('#lahorecount').text(lahore);
    $('#Gujranwalacount').text(Gujranwala);
    $('#Swatcount').text(Swat);
    $('#Mardancount').text(Mardan);


    for (var i = 0; i < places.length; i++) {

        $(places[i]).each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 5000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

}
//var onSuccessCountofData = function (response) {
//    var msg = jQuery.parseJSON(response.d);
//    var places = ['#nationalcount', '#southcount', '#northcount', '#karachicount', '#faisalabadcount', '#islamabadcount', '#hyderabadcount', '#multancount', '#peshawarcount', '#sukkurcount', '#quettacount', '#lahorecount'];


//    debugger;

//    jsonObj = jQuery.parseJSON(response.d);


//    var rec = jsonObj;
//    var Cities = [];
//    var Region = [];
//    var National = [];
 
//    for (i = 0; i < rec.length; i++) {
//        if (National.indexOf(rec[i].flag) === 'National') {
//            National.push(rec[i].Title, rec[i].Counts);
//        }

//    for (i = 0; i < rec.length; i++) {
//            if (Region.indexOf(rec[i].flag) === 'Region') {
//                Region.push(rec[i].Title, rec[i].Counts);
//            }
//        }

//    for (i = 0; i < rec.length; i++) {
//        if (Cities.indexOf(rec[i].flag) === 'City') {
//            Cities.push(rec[i].Title, rec[i].Counts);
//        }
//    }

 

   
//    } 


//    debugger;
//    var national = msg[0].NationalTotalCalls;
//    var north = msg[0].NorthCount;
//    var south = msg[0].SouthCount;
//    var central = msg[0].CentralCount;
//    var karachi = msg[0].KarachiCount;
//    var hyderabad = msg[0].HyderabadCount;
//    var islamabad = msg[0].IslamabadCount;
//    var lahore = msg[0].LahoreCount;
//    var sukkur = msg[0].SukkurCount;
//    var multan = msg[0].MultanCount;
//    var peshawar = msg[0].PeshawarCount;
//    var faisalabad = msg[0].FaisalabadCount;
//    var quetta = msg[0].QuettaCount;

//    $('#nationalcount').text(national);
//    $('#southcount').text(south);
//    $('#northcount').text(north);
//    $('#centralcount').text(central);
//    $('#karachicount').text(karachi);
//    $('#faisalabadcount').text(faisalabad);
//    $('#islamabadcount').text(islamabad);
//    $('#hyderabadcount').text(hyderabad);
//    $('#multancount').text(multan);
//    $('#peshawarcount').text(peshawar);
//    $('#sukkurcount').text(sukkur);
//    $('#quettacount').text(quetta);
//    $('#lahorecount').text(lahore);

//    //Region
//    /*

//    <div class="col-md-6 col-centered text-center">
//             <div class="counterdivs">
//                <div class="regioncount">
//              <h4 class="countheader2">South</h4>
//    <span class="countReg" id="southcount"></span>  </div> </div>   </div>
//    */


//    //City
//    /*

//    <div class="counterdivs"> 
//    <div class="regioncount1">
//        <h4 class="countheader2">Karachi</h4>
// <span class="countReg" id="karachicount"></span>  
// </div>  </div>
//    */

//    for (var i = 0; i < places.length; i++) {

//        $(places[i]).each(function () {
//            $(this).prop('Counter', 0).animate({
//                Counter: $(this).text()
//            }, {
//                duration: 5000,
//                easing: 'swing',
//                step: function (now) {
//                    $(this).text(Math.ceil(now));
//                }
//            });
//        });
//    }

//}

var FillLastCallTime = function () {
    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/LastCallTimming",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "','day':'" + day + "'}",
        success: onSuccessCallTime,
        error: onError,
        cache: false
    });
}
var onSuccessCallTime = function (response) {
    var msg = jQuery.parseJSON(response.d);
    $('#lastcalltime').text('Calls Reported at ' + msg[0].LastTime);
}

var onError = function (data) {
    alert(data);
}

var FillMapWithLocation = function () {
    $.ajax({
        type: "POST",
        url: "SummerizeDashboard.asmx/GetLocations",
        contentType: "application/json; charset=utf-8",
        data: "{'month':'" + month + "','year':'" + year + "','day':'" + day + "'}",
        success: initMap,
        error: onError,
        cache: false
    });
}

var initMap = function(response) {
    //var myLatLng = { lat: parseFloat(lat), lng: parseFloat(long) };
    var msg = jQuery.parseJSON(response.d);
    var newlat = [];
    var newlong = [];
    var employee = [];
    $.each(msg, function (i,option) {
        newlat.push(option.Latitude);
        newlong.push(option.Longitude);
        employee.push(option.EmployeeName);
    })

    var myLatLng = { lat: parseFloat('31.451185'), lng: parseFloat('72.540138') };
    var map = new google.maps.Map($("#mappp")[0], {
        zoom: 6,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    

    for (var i = 0; i < newlat.length; i++) {
        //var data = locations[i];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(newlat[i], newlong[i]),
            map: map,
            icon: '../assets/img/marker.png',
            title: employee[i]
        });
    }
    //Create and open InfoWindow.
    //var infoWindow = new google.maps.InfoWindow();

    //(function (marker, data) {
    //    google.maps.event.addListener(marker, "click", function (e) {
    //        //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
    //        infoWindow.setContent("<div style = 'width:200px;min-height:40px'> <strong>MIO Name: </strong> asd </div>");
    //        infoWindow.open(map, marker);
    //    });
    //})(marker, data);
}


