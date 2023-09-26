<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DayView.aspx.cs" Inherits="PocketDCR2.Form.DayView" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<%--<%@ Register TagPrefix="asp" Namespace="AjaxControlToolkit" Assembly="AjaxControlToolkit, Version=4.1.7.1005, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e" %>--%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/timeline.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>

    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
    <script src="DayView.js" type="text/javascript"></script>

    <style>
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
                    <th style="text-align: left; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"><a id="A1" href="#" style="color: #EC8026">Un Planned Visit</a> </th>
                </tr>

            </tbody>
        </table>
        <div id="drlist" style="overflow-y: scroll; height: auto; margin-top: 5px">
        </div>

    </div>


    <div id="dialog" class="right" style="display: none">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Execute</h1>
                <samp>
                    Call</samp>
            </div>
            <div id="validate-form" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <div style="overflow-y: scroll; height: auto; float: left">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                        <tbody>
                            <tr>
                                <th colspan="4" style="padding: 5px; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Key Call Information
                                </th>
                            </tr>
                            <tr>
                                <th colspan="4" style="padding: 5px;"></th>
                            </tr>
                            <tr>
                                <th>
                                    <b>DCR DT: &nbsp;</b> <span class="red">* </span>
                                </th>
                                <td>
                                    <asp:TextBox ID="txtdate" name="txtdate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                        CssClass="inp-form" Width="140" />
                                    <div style="margin-left: 162px; margin-top: -25px;">
                                        <img alt="Icon" src="../Images/DatePicker/icon2.gif" id="Img1" />
                                    </div>
                                    <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="txtdate" PopupButtonID="Img1"
                                        runat="server">
                                    </asp:CalendarExtender>
                                </td>
                                <th>
                                    <b>Start Time: &nbsp;</b> <span class="red">* </span>
                                </th>
                                <td>
                                    <select id="txtSTime" class="styledselect_form_1">
                                        <option value="-1">Select</option>
                                        <option>8:00:00</option>
                                        <option>8:15:00</option>
                                        <option>8:30:00</option>
                                        <option>8:45:00</option>
                                        <option>9:00:00</option>
                                        <option>9:15:00</option>
                                        <option>9:30:00</option>
                                        <option>9:45:00</option>
                                        <option>10:00:00</option>
                                        <option>10:15:00</option>
                                        <option>10:30:00</option>
                                        <option>10:45:00</option>
                                        <option>11:00:00</option>
                                        <option>11:15:00</option>
                                        <option>11:30:00</option>
                                        <option>11:45:00</option>
                                        <option>12:00:00</option>
                                        <option>12:15:00</option>
                                        <option>12:30:00</option>
                                        <option>12:45:00</option>
                                        <option>13:00:00</option>
                                        <option>13:15:00</option>
                                        <option>13:30:00</option>
                                        <option>13:45:00</option>
                                        <option>14:00:00</option>
                                        <option>14:15:00</option>
                                        <option>14:30:00</option>
                                        <option>14:45:00</option>
                                        <option>15:00:00</option>
                                        <option>15:15:00</option>
                                        <option>15:30:00</option>
                                        <option>15:45:00</option>
                                        <option>16:00:00</option>
                                        <option>16:15:00</option>
                                        <option>16:30:00</option>
                                        <option>16:45:00</option>
                                        <option>17:00:00</option>
                                        <option>17:15:00</option>
                                        <option>17:30:00</option>
                                        <option>17:45:00</option>
                                        <option>18:00:00</option>
                                        <option>18:15:00</option>
                                        <option>18:30:00</option>
                                        <option>18:45:00</option>
                                        <option>19:00:00</option>
                                        <option>19:15:00</option>
                                        <option>19:30:00</option>
                                        <option>19:45:00</option>
                                        <option>20:00:00</option>
                                        <option>20:15:00</option>
                                        <option>20:30:00</option>
                                        <option>20:45:00</option>
                                        <option>21:00:00</option>
                                        <option>21:15:00</option>
                                        <option>21:30:00</option>
                                        <option>21:45:00</option>
                                        <option>22:00:00</option>
                                        <option>22:15:00</option>
                                        <option>22:30:00</option>
                                        <option>22:45:00</option>
                                        <option>23:00:00</option>
                                        <option>23:15:00</option>
                                        <option>23:30:00</option>
                                        <option>23:45:00</option>
                                        <option>23:59:00</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtSTime" id="txtSTime" value="12:29 PM">--%>
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <b>Doctor Code: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtdrcode" id="txtdrcode">
                                </td>
                                <th>
                                    <b>End Time: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <select id="txtEtime" class="styledselect_form_1">
                                        <option value="-1">Select</option>
                                        <option>8:00:00</option>
                                        <option>8:15:00</option>
                                        <option>8:30:00</option>
                                        <option>8:45:00</option>
                                        <option>9:00:00</option>
                                        <option>9:15:00</option>
                                        <option>9:30:00</option>
                                        <option>9:45:00</option>
                                        <option>10:00:00</option>
                                        <option>10:15:00</option>
                                        <option>10:30:00</option>
                                        <option>10:45:00</option>
                                        <option>11:00:00</option>
                                        <option>11:15:00</option>
                                        <option>11:30:00</option>
                                        <option>11:45:00</option>
                                        <option>12:00:00</option>
                                        <option>12:15:00</option>
                                        <option>12:30:00</option>
                                        <option>12:45:00</option>
                                        <option>13:00:00</option>
                                        <option>13:15:00</option>
                                        <option>13:30:00</option>
                                        <option>13:45:00</option>
                                        <option>14:00:00</option>
                                        <option>14:15:00</option>
                                        <option>14:30:00</option>
                                        <option>14:45:00</option>
                                        <option>15:00:00</option>
                                        <option>15:15:00</option>
                                        <option>15:30:00</option>
                                        <option>15:45:00</option>
                                        <option>16:00:00</option>
                                        <option>16:15:00</option>
                                        <option>16:30:00</option>
                                        <option>16:45:00</option>
                                        <option>17:00:00</option>
                                        <option>17:15:00</option>
                                        <option>17:30:00</option>
                                        <option>17:45:00</option>
                                        <option>18:00:00</option>
                                        <option>18:15:00</option>
                                        <option>18:30:00</option>
                                        <option>18:45:00</option>
                                        <option>19:00:00</option>
                                        <option>19:15:00</option>
                                        <option>19:30:00</option>
                                        <option>19:45:00</option>
                                        <option>20:00:00</option>
                                        <option>20:15:00</option>
                                        <option>20:30:00</option>
                                        <option>20:45:00</option>
                                        <option>21:00:00</option>
                                        <option>21:15:00</option>
                                        <option>21:30:00</option>
                                        <option>21:45:00</option>
                                        <option>22:00:00</option>
                                        <option>22:15:00</option>
                                        <option>22:30:00</option>
                                        <option>22:45:00</option>
                                        <option>23:00:00</option>
                                        <option>23:15:00</option>
                                        <option>23:30:00</option>
                                        <option>23:45:00</option>
                                        <option>23:59:00</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtEtime" id="txtEtime" value="01:00 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Territory : &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtterr" id="txtterr" value="">
                                </td>
                                <th>
                                    <b>Activity Status : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="ddl3" id="ddlActivities">
                                        <option value="-1">Select Activity</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Address : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" name="txtaddress" id="txtaddress" value="\">
                                </td>
                                <th>
                                    <b>Reasons : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <select id="ddlplanReason" class="styledselect_form_1"></select>
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <b>Account Name : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" disabled name="txtaccountname" id="txtaccountname" value="\">
                                </td>
                                <th>
                                    <b>Account Type : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input type="text" id="txtacounttype" disabled class="inp-form" />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <b>Account Sub Type : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input type="text" id="txtacountsub" disabled class="inp-form" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                        <tbody>
                            <tr>
                                <th colspan="4" style="padding: 5px; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Additional Information
                                </th>
                            </tr>
                            <tr>
                                <th colspan="4" style="padding: 5px;"></th>
                            </tr>
                            <tr>
                                <th>
                                    <b>Product 1: &nbsp;</b><span class="red" style="height: 539px;">* </span>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="pro1" id="pro1">
                                    </select>
                                </td>
                                <th>
                                    <b>Product 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="pro2" id="pro2">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th id="Th2">
                                    <b>Product 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="pro3" id="pro3">
                                    </select>
                                </td>
                                <th id="Th3">
                                    <b>Product 4: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="pro4" id="pro4">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Sample 1: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam1" id="sam1">
                                    </select>
                                    <input class="inp-form_r" type="text" maxlength="20" name="txtsamq1" id="txtsamq1" value="" />
                                </td>
                                <th>
                                    <b>Sample 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam2" id="sam2">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtsamq2" id="txtsamq2" value="" />
                                </td>
                            </tr>
                            <tr>
                                <th id="Th1">
                                    <b>Sample 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam3" id="sam3">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtsamq3" id="txtsamq3" value="" />
                                </td>
                                <th id="Th4">
                                    <b>Joint Visit: &nbsp;</b>
                                </th>
                                <td>
                                    <input type="checkbox" id="chbFLM" value="FLM" title="FLM" />
                                    FLM
                                    <input type="checkbox" id="chbSLM" value="FLM" title="SLM" />
                                    SLM
                                    <input type="checkbox" id="chbCoaching" value="Coaching" title="Coaching" />
                                    Coaching
                                </td>
                            </tr>
                            <tr>
                                <th id="Th5">
                                    <b>Give Aways : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="gif1" id="gif1">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" name="txtgifq1" type="text" id="txtgifq1" value="" />
                                </td>
                                <th id="Th6">
                                    <b>Call Notes: &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="200" name="txtremarks" id="txtremarks" value="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
                <div class="pop_block-actions">
                    <ul class="actions-left">
                        <li>
                            <input class="jqmClose" id="btnplannedDilogOK" type="button" onclick="PlannedSaveCall(); return false;" value="Save" />
                            <input class="jqmClose" value="Close" type="button" onclick="closeWindow(); return false;" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>


    <div id="unPlannedDialog" class="right" style="display: none">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Execute</h1>
                <samp>
                    Un Planned Call</samp>
            </div>
            <div id="validate-upform" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <div style="overflow-y: scroll; height: auto; float: left">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                        <tbody>
                            <tr>
                                <th colspan="4" style="padding: 5px; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Key Call Information
                                </th>
                            </tr>
                            <tr>
                                <th colspan="4" style="padding: 5px;"></th>
                            </tr>
                            <tr>
                                <th>
                                    <b>DCR DT: &nbsp;</b> <span class="red">* </span>
                                </th>
                                <td>
                                    <asp:TextBox ID="txtupdate" name="" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                        CssClass="inp-form" Width="140" />
                                    <div style="margin-left: 162px; margin-top: -25px;">
                                        <img alt="Icon" src="../Images/DatePicker/icon2.gif" id="upImg1" />
                                    </div>
                                    <asp:CalendarExtender ID="CalendarExtender3" TargetControlID="txtupdate" PopupButtonID="upImg1"
                                        runat="server">
                                    </asp:CalendarExtender>
                                </td>
                                <th>
                                    <b>Start Time: &nbsp;</b> <span class="red">* </span>
                                </th>
                                <td>
                                    <select id="txtupSTime" class="styledselect_form_1">
                                        <option value="-1">Select</option>
                                        <option>8:00:00</option>
                                        <option>8:15:00</option>
                                        <option>8:30:00</option>
                                        <option>8:45:00</option>
                                        <option>9:00:00</option>
                                        <option>9:15:00</option>
                                        <option>9:30:00</option>
                                        <option>9:45:00</option>
                                        <option>10:00:00</option>
                                        <option>10:15:00</option>
                                        <option>10:30:00</option>
                                        <option>10:45:00</option>
                                        <option>11:00:00</option>
                                        <option>11:15:00</option>
                                        <option>11:30:00</option>
                                        <option>11:45:00</option>
                                        <option>12:00:00</option>
                                        <option>12:15:00</option>
                                        <option>12:30:00</option>
                                        <option>12:45:00</option>
                                        <option>13:00:00</option>
                                        <option>13:15:00</option>
                                        <option>13:30:00</option>
                                        <option>13:45:00</option>
                                        <option>14:00:00</option>
                                        <option>14:15:00</option>
                                        <option>14:30:00</option>
                                        <option>14:45:00</option>
                                        <option>15:00:00</option>
                                        <option>15:15:00</option>
                                        <option>15:30:00</option>
                                        <option>15:45:00</option>
                                        <option>16:00:00</option>
                                        <option>16:15:00</option>
                                        <option>16:30:00</option>
                                        <option>16:45:00</option>
                                        <option>17:00:00</option>
                                        <option>17:15:00</option>
                                        <option>17:30:00</option>
                                        <option>17:45:00</option>
                                        <option>18:00:00</option>
                                        <option>18:15:00</option>
                                        <option>18:30:00</option>
                                        <option>18:45:00</option>
                                        <option>19:00:00</option>
                                        <option>19:15:00</option>
                                        <option>19:30:00</option>
                                        <option>19:45:00</option>
                                        <option>20:00:00</option>
                                        <option>20:15:00</option>
                                        <option>20:30:00</option>
                                        <option>20:45:00</option>
                                        <option>21:00:00</option>
                                        <option>21:15:00</option>
                                        <option>21:30:00</option>
                                        <option>21:45:00</option>
                                        <option>22:00:00</option>
                                        <option>22:15:00</option>
                                        <option>22:30:00</option>
                                        <option>22:45:00</option>
                                        <option>23:00:00</option>
                                        <option>23:15:00</option>
                                        <option>23:30:00</option>
                                        <option>23:45:00</option>
                                        <option>23:59:00</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <b>Doctor Code: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <%--<input class="inp-form" maxlength="20" name="txtdrcode" id="txtdrcode">--%>
                                    <select id="dlDoctorsofMR" class="styledselect_form_1">
                                        <option value="-1">Select Doctor</option>
                                    </select>
                                </td>
                                <th>
                                    <b>End Time: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <select id="txtupEtime" class="styledselect_form_1">
                                        <option value="-1">Select</option>
                                        <option>08:00:00</option>
                                        <option>08:15:00</option>
                                        <option>08:30:00</option>
                                        <option>08:45:00</option>
                                        <option>09:00:00</option>
                                        <option>09:15:00</option>
                                        <option>09:30:00</option>
                                        <option>09:45:00</option>
                                        <option>10:00:00</option>
                                        <option>10:15:00</option>
                                        <option>10:30:00</option>
                                        <option>10:45:00</option>
                                        <option>11:00:00</option>
                                        <option>11:15:00</option>
                                        <option>11:30:00</option>
                                        <option>11:45:00</option>
                                        <option>12:00:00</option>
                                        <option>12:15:00</option>
                                        <option>12:30:00</option>
                                        <option>12:45:00</option>
                                        <option>13:00:00</option>
                                        <option>13:15:00</option>
                                        <option>13:30:00</option>
                                        <option>13:45:00</option>
                                        <option>14:00:00</option>
                                        <option>14:15:00</option>
                                        <option>14:30:00</option>
                                        <option>14:45:00</option>
                                        <option>15:00:00</option>
                                        <option>15:15:00</option>
                                        <option>15:30:00</option>
                                        <option>15:45:00</option>
                                        <option>16:00:00</option>
                                        <option>16:15:00</option>
                                        <option>16:30:00</option>
                                        <option>16:45:00</option>
                                        <option>17:00:00</option>
                                        <option>17:15:00</option>
                                        <option>17:30:00</option>
                                        <option>17:45:00</option>
                                        <option>18:00:00</option>
                                        <option>18:15:00</option>
                                        <option>18:30:00</option>
                                        <option>18:45:00</option>
                                        <option>19:00:00</option>
                                        <option>19:15:00</option>
                                        <option>19:30:00</option>
                                        <option>19:45:00</option>
                                        <option>20:00:00</option>
                                        <option>20:15:00</option>
                                        <option>20:30:00</option>
                                        <option>20:45:00</option>
                                        <option>21:00:00</option>
                                        <option>21:15:00</option>
                                        <option>21:30:00</option>
                                        <option>21:45:00</option>
                                        <option>22:00:00</option>
                                        <option>22:15:00</option>
                                        <option>22:30:00</option>
                                        <option>22:45:00</option>
                                        <option>23:00:00</option>
                                        <option>23:15:00</option>
                                        <option>23:30:00</option>
                                        <option>23:45:00</option>
                                        <option>23:59:00</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtEtime" id="txtEtime" value="01:00 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Territory : &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtterr" id="txtupterr" value="" />
                                </td>
                                <th>
                                    <b>Activity Status : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="ddl3" id="SelectActivityUP">
                                        <option value="-1">Select Activity</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Address : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" name="txtaddress" id="txtupaddress" value="">
                                </td>
                                <th>
                                    <b>Call Reason : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <select id="upddlplanReason" class="styledselect_form_1"></select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Account Name : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" disabled name="txtUnAccountname" id="txtUnAccountname" value="\">
                                </td>
                                <th>
                                    <b>Account Type : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input type="text" id="UAcctype" disabled class="inp-form" />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <b>Account Sub Type : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input type="text" id="UAccSubtype" disabled class="inp-form" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                        <tbody>
                            <tr>
                                <th colspan="4" style="padding: 5px; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Additional Information
                                </th>
                            </tr>
                            <tr>
                                <th colspan="4" style="padding: 5px;"></th>
                            </tr>
                            <tr>
                                <th>
                                    <b>Product 1: &nbsp;</b><span class="red" style="height: 539px;">* </span>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uppro1" id="uppro1">
                                    </select>
                                </td>
                                <th>
                                    <b>Product 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uppro2" id="uppro2">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th id="Th2">
                                    <b>Product 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uppro3" id="uppro3">
                                    </select>
                                </td>
                                <th id="Th3">
                                    <b>Product 4: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uppro4" id="uppro4">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Sample 1: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam1" id="upsam1">
                                    </select>
                                    <input class="inp-form_r" type="text" maxlength="20" name="txtsamq1" id="txtupsamq1" value="" />
                                </td>
                                <th>
                                    <b>Sample 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam2" id="upsam2">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtsamq2" id="txtupsamq2" value="" />
                                </td>
                            </tr>
                            <tr>
                                <th id="Th1">
                                    <b>Sample 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam3" id="upsam3">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtsamq3" id="txtupsamq3" value="" />
                                </td>
                                <th id="Th4">
                                    <b>Joint Visit: &nbsp;</b>
                                </th>
                                <td>
                                    <input type="checkbox" id="chbupFLM" value="FLM" title="FLM" />
                                    FLM
                                    <input type="checkbox" id="chbupSLM" value="FLM" title="SLM" />
                                    SLM
                                    <input type="checkbox" id="chbupCoaching" value="Coaching" title="Coaching" />
                                    Coaching
                                </td>
                            </tr>
                            <tr>
                                <th id="Th5">
                                    <b>Give aways : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="gif1" id="gifup1">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" name="txtgifq1" type="text" id="txtupgifq1" value="" />
                                </td>
                                <th id="Th6">
                                    <b>Call Notes: &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="200" name="txtremarks" id="txtupremarks" value="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
                <div class="pop_block-actions">
                    <ul class="actions-left">
                        <li>
                            <input class="jqmClose" id="btnDilogOK" type="button" onclick="unPlannedSaveCall(); return false;" value="Save" />
                            <input class="jqmClose" value="Close" type="button" onclick="closeWindow(); return false;" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="clear">
    </div>
    <div class="clear_with_height">
    </div>

</asp:Content>
