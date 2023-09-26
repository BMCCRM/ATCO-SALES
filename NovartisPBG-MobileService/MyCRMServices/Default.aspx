<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MyCRMServices.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="jquery-1.9.1.js"></script>
    <script src="jquery.dataTables.js"></script>
    <link href="datatable.css" rel="stylesheet" />
    <style type="text/css">
        .cont_grid {
            width: 100%;
            line-height: 30px;
            text-align: center;
        }

            .cont_grid td {
                border: dashed 1px #626262;
            }
    </style>
    <script type="text/javascript">
        $(function () {
            var myData = '';
            $.ajax({
                type: "POST",
                url: "Service.asmx/getallcalls",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                async: false,
                success: function (data) {
                    $('#grid .dataTables_wrapper').remove();
                    $('#grid').prepend($('<table id="dtcallsGrid" class="cont_grid"><thead><tr><th>Mobile Number</th><th>Doctor</th><th>P1</th><th>P2</th><th>P3</th><th>R1</th><th>R2</th><th>R3</th><th>S1</th><th>SQ1</th><th>G1</th><th>GQ1</th><th>Latitude</th><th>Longitude</th><th>View On Map</th></tr></thead><tbody>'));
                    $.each(data.d, function (i, option) {
                        var paradoc = option.DoctorID;
                        paradoc = paradoc.toString().replace(" ", "+");
                        $('#dtcallsGrid').append($('<tr><td>' + option.MobileNumber + '</td><td>' + option.DoctorID +
                            '</td><td>' + option.P1 + '</td><td>' + option.P2 + '</td><td>' + option.P3 + '</td><td>' + option.R1 + '</td><td>' +
                            option.R2 + '</td><td>' + option.R3 + '</td><td>' + option.S1 + '</td><td>' + option.SQ1 + '</td><td>' + option.G1 +
                            '</td><td>' + option.GQ1 + '</td><td>' + option.Latitude + '</td><td>' + option.Longitude + '</td><td>' +
                            '<a href="#" onclick=window.open("./Map.aspx?MobileNumber=' + option.MobileNumber + '&Doc=' +
                            paradoc + '&lat=' + option.Latitude + '&long=' + option.Longitude + '")>View On Map</a></td></tr>'));
                    });
                    $('#grid').append($('</tbody></table>'));
                },
                cache: false
            });


            $('#dtcallsGrid').dataTable({
                "sPaginationType": "full_numbers",
                "bJQueryUI": true,
                "bSort": true,
                "bSearchable": true,
                "iDisplayLength": 10,
                "bFilter": true,
                "bLengthChange": true,
                "iDataSort": 0, "bScrollCollapse": false
            });
        });

        function openPopup(mobilenumber, Doc, lat, longi) {

            window.showModalDialog("./Map.aspx?MobileNumber=" + mobilenumber + "&Doc=" + Doc + "&lat=" + lat + "&long=" + longi, "dialogHeight:" + (screen.Height - 60) + "px; dialogWidth: " + (screen.width - 20) + "px; dialogTop: px; dialogLeft: px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
        }

    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="grid">
        </div>
    </form>
</body>
</html>
