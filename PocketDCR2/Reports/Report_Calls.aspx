﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Report_Calls.aspx.cs" Inherits="PocketDCR2.Reports.Report_Calls" %>


<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" ScriptMode="Release" runat="server">
    </asp:ScriptManager>
    <div>
        <rsweb:ReportViewer ID="ReportViewer1" runat="server"  Height="780px" Width="100%">
        <LocalReport ReportPath="./Reports_Dashboard/NewCallReport.rdlc"></LocalReport>
        </rsweb:ReportViewer>

    </div>
    </form>
</body>
</html>
