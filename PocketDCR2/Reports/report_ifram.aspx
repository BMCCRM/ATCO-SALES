<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="report_ifram.aspx.cs" Inherits="PocketDCR2.Reports.report_ifram" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   <script lang="javaScript" type="text/javascript" src="../crystalreportviewers13/js/crviewer/crv.js"></script>

    <style type="text/css">
       #HyperLink1 {
            margin-left:30px;
            margin-top: 50px;
            /*font-family:Georgia, "Times New Roman", Times, serif;
            font-size:large;
            cursor: pointer;
            border:1px solid red;
            border-radius: 5px 5px 5px 5px;
          */
              background: #3498db;
              background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
              background-image: -moz-linear-gradient(top, #3498db, #2980b9);
              background-image: -ms-linear-gradient(top, #3498db, #2980b9);
              background-image: -o-linear-gradient(top, #3498db, #2980b9);
              background-image: linear-gradient(to bottom, #3498db, #2980b9);
              -webkit-border-radius: 28;
              -moz-border-radius: 28;
              border-radius: 28px;
              font-family: Arial;
              color: #ffffff;
              font-size: 20px;
              padding: 10px 20px 10px 20px;
              text-decoration: none;

        }

          #HyperLink1 :hover {
          background: #3cb0fd;
          background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
          background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
          text-decoration: none;
            }
        .Hyper :hover {
          background: #3cb0fd;
          background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
          background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
          text-decoration: none;
        }
        
        </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:HyperLink ID="HyperLink1" class="Hyper" runat="server" Visible="False">Download </asp:HyperLink>

        <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" AutoDataBind="True"
            EnableDatabaseLogonPrompt="False" EnableParameterPrompt="False" Width="450px"
            ToolPanelView="None" onunload="CrystalReportViewer1_Unload" HyperlinkTarget="_blank"></CR:CrystalReportViewer>
    </div>
    </form>
</body>
</html>




