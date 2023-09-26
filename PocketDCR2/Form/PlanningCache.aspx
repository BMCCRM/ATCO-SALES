<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PlanningCache.aspx.cs" Inherits="PocketDCR2.Form.PlanningCache" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script type="text/javascript">

        $(function() {

            var userDevice;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                userDevice = "mobile";
            } else {
                userDevice = "system";
            }
            $.ajax({
                type: "POST",
                url: "PlanningCache.asmx/LoadCache",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'userDevice':'" + userDevice + "' }",
                success: function (data) {
                    if (data.d != "") {
                        if(userDevice == "mobile") {
                            window.location = "MioPlanning2.aspx";
                            } else {
                            window.location = "MioPlanning.aspx";
                            }
                    }

                },
                cache: false,
                async:false
            });
        });

        
    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
