<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Map.aspx.cs" Inherits="MyCRMServices.Map" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>--%>
    <%--<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />--%>
    
    <meta http-equiv="refresh" content="0; url=http://www.pharmacrm.com.pk/vikor/Form/Login.aspx" />
    
    <%--<style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>--%>

    <script type="text/javascript">
/*        function initialize() {
            var lati = getParameterByName("lat");
            var longi = getParameterByName("long");

            var mapOptions = {
                center: new google.maps.LatLng(lati, longi),
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var infoWindow = new google.maps.InfoWindow();
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
            var myLatlng = new google.maps.LatLng(lati, longi);
            var marker1 = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: getParameterByName("Doc")
            });
            (function (marker, data) {
                google.maps.event.addListener(marker1, "click", function (e) {
                    infoWindow.setContent("923002725356 is at 76-REHANA KHURSHEED");
                    infoWindow.open(map, marker1);
                });
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);*/

        window.location.replace("http://maps.google.com/?q=" + getParameterByName("lat") + "," + getParameterByName("long"));


        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }


    </script>
    

</head>
<body>
     <div id="map-canvas"/>
</body>
</html>
