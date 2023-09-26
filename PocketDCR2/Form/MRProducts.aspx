<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="MRProducts.aspx.cs" Inherits="PocketDCR2.Form.MRProducts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!--[if lt IE 9]>
<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
<![endif]-->
    <link href="../Scripts/JqueryList/listbox.css" rel="stylesheet" />
    <script src="../Scripts/JqueryList/listbox.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="MRProducts.js" type="text/javascript"></script>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
            margin-top: 20px;
        }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <table class="auto-style1">
        <tr>
            <td>Med Reps</td>
            <td>Products</td>
        </tr>
        <tr>
            <td>
                <select id="ddlMedReps">
                </select>
            </td>
            <td>
                <select id="products" multiple>
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input type="button" id="btnSave" value="Save/Update" onclick="saveorupdate();" />
            </td>
        </tr>
    </table>

</asp:Content>
