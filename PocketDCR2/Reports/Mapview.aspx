<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Mapview.aspx.cs" Inherits="PocketDCR2.Reports.Mapview" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Map Viewer</title>
    <style>
        html, body, #map-canvas {
            height: 100%;
            margin: 0px;
            padding: 0px;
        }
    </style>
    <script src="../Scripts/jquery-1.4.1.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI1uIsPqsczE32gb_d9oLyUFZuk-IKTnU&callback=initMap"
  type="text/javascript"></script>
    <%--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>--%>
    <script>
        var map;

        function initialize(data) {
            if (data.length == 0) {
                alert("location not found");
            }
            var mapDiv = document.getElementById('map-canvas');
            map = new google.maps.Map(mapDiv, {
                center: new google.maps.LatLng(data[0].Latitude, data[0].Longitude),
                zoom: 12
            });
            //var latLng = new google.maps.LatLng(parseFloat(dms_d(31, 21, 21, "N")), parseFloat(dms_d(69, 27, 36, "E")));

            $.each(data, function (index, ndx) {
                new google.maps.Marker({
                    position: new google.maps.LatLng(ndx.Latitude, ndx.Longitude),
                    map: map
                });
            });
        }

        $(function () {
            var queryString = window.location.search;
            queryString = queryString.replace("?", "");
            queryString = queryString.replace("%20", " ");
            queryString = queryString.split("&");

            $.ajax({
                type: "POST",
                url: "NewDashboard.asmx/getLocationByEmpId",
                contentType: "application/json; charset=utf-8",
                data: "{'date':'" + queryString[0].split("=")[1] + "-01','empid':'" + queryString[1].split("=")[1] + "'}",
                success: function (data) {
                    var latlon = JSON.parse(data.d);
                    initialize(latlon);
                },
                error: function () {
                    alert("An Error occurd");
                },
                cache: false
            });
        });
    </script>
</head>
<body>
    <div id="map-canvas"></div>
    <form id="form1" runat="server">
    </form>
</body>
</html>

