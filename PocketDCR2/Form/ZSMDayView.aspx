<%@ Page Title="AM Day View" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="ZSMDayView.aspx.cs" Inherits="PocketDCR2.Form.ZSMDayView" %>
<%@ Register TagPrefix="asp" Namespace="AjaxControlToolkit" Assembly="AjaxControlToolkit, Version=4.1.7.1005, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/timeline.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>

    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
    <script src="ZSMDayView.js" type="text/javascript"></script>

    <style type="text/css">
        .left, .right {
            position: absolute;
            top: 125px;
        }

        .left {
            z-index: 1;
            left: 25px;
            width: 100%;
        }

        .right {
            left: 25px;
        }

        .btn {
            background-color: #fafafa;
            background-image: linear-gradient(to bottom, #fefefe, #f2f2f2);
            background-repeat: repeat-x;
            border: 1px solid #d5d5d5;
            box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
            color: #555;
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            line-height: 13px;
            margin: 2px 0;
            padding: 8px 12px 7px;
            text-align: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="pageone" class="left">

        <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
            <tbody>
                <tr>
                    <th style="color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Today's Plan
                                <div id="dtdate" style="width: 100px;">
                                    <asp:TextBox ID="txtDaydate" name="txtDaydate" runat="server" ClientIDMode="Static"
                                        AutoPostBack="false" CssClass="inp-form" onchange="onchange_daytextbox()" ReadOnly="True" />
                                    <div style="margin-left: 190px; margin-top: -29px;">
                                        <img alt="Icon" src="../Images/DatePicker/icon2.gif" id="Image1" />
                                    </div>
                                    <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="txtDaydate" PopupButtonID="Image1"
                                        runat="server">
                                    </asp:CalendarExtender>

                                </div>
                    </th>
                    <th id="totaldr" style="text-align: left; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0; margin-left: -50px;"></th>
                </tr>
                <tr>
                    <th style="color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"></th>
                    <th style="text-align: left; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"> </th>
                </tr>

            </tbody>
        </table>
        <div id="drlist" style="overflow-y: scroll; height: auto; margin-top: 5px">
        </div>

    </div>
</asp:Content>
