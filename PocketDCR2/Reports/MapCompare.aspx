<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MapCompare.aspx.cs" Inherits="PocketDCR2.Reports.MapCompare" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Map Compare</title>
    <style>
        html, body, #map-canvas {
            height: 100%;
            margin: 0px;
            padding: 0px;
        }
    </style>
   <%-- <script src="../Scripts/jquery-1.4.1.js"></script>--%>
        <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>
   <%-- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>--%>

      <%--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByB0y2Sn129W7f22dS_TQGcWJzc-X8r3A"></script>--%>

    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI1uIsPqsczE32gb_d9oLyUFZuk-IKTnU&callback=initMap"></script>
    <script  src="MapCompare.js" type="text/javascript"></script>
</head>
<body>
    <div id="map-canvas"></div>
    <form id="form1" runat="server">
       
    </form>
</body>
</html>

