<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="MioPlanning.aspx.cs" Inherits="PocketDCR2.Form.MioPlanning1" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/timeline.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="MioPlanning.js" type="text/javascript"></script>
    <script src="../jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.timepicker.min.js" type="text/javascript"></script>
    <style type="text/css">
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
        }

        .tooltip {
            position: relative;
            display: block;
            cursor: help;
            white-space: pre-line;
            border-bottom: 1px dotted #777;
        }

        .tooltip-content {
            opacity: 0;
            visibility: hidden;
            font: 12px Arial, Helvetica;
            border-color: #aaa #555 #555 #aaa;
            border-style: solid;
            border-width: 1px;
            width: 300px;
            padding: 15px;
            white-space: pre-line;
            position: absolute;
            text-align: left;
            bottom: 40px;
            left: 50%;
            margin-left: -76px;
            background-color: #fff;
            background-image: linear-gradient(rgba(0,0,0,.1), rgba(255,255,255,0));
            box-shadow: 1px 1px 0 #555, 2px 2px 0 #555, 3px 3px 1px rgba(0, 0, 0, .3), 0 1px 0 rgba(255,255,255, .5) inset;
            transition: bottom .2s ease, opacity .2s ease;
        }

            .tooltip-content:after,
            .tooltip-content:before {
                border-right: 16px solid transparent;
                border-top: 15px solid #fff;
                bottom: -15px;
                content: "";
                position: absolute;
                left: 50%;
                margin-left: -10px;
            }

            .tooltip-content:before {
                border-right-width: 25px;
                border-top-color: #555;
                border-top-width: 15px;
                bottom: -15px;
            }

        .tooltip:hover .tooltip-content {
            opacity: 1;
            visibility: visible;
            bottom: 30px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input id="Button1" type="button" value="button" style="margin-right: 5px; display: none;" />
    <div class="" id="loadingmain">
        <div id="loadingdiv2" class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="pop_box-outer jqmWindow2" id="diamsg">
        <div class="pop_block-border" style="width: 250px">
            <div class="pop_block-header">
                <h1>Information</h1>
                <samp>
                </samp>
                <span class="jqmClose"></span>
            </div>
            <div id="Div1" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                Data Save succesfully!
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
                <div class="pop_block-actions">
                    <ul class="actions-left">
                        <li>
                            <input class="jqmClose" id="Submit2" type="submit" value="OK" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="pop_box-outer jqmWindow2" id="zsmdialog">
        <div class="pop_block-border" style="width: 410px">
            <div class="pop_block-header">
                <h1>Enter Reason</h1>
                <samp>
                </samp>
                <span class="jqmClose"></span>
            </div>
            <div id="Div3" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                    <tr>
                        <td>
                            <textarea id="txtreason" cols="300" rows="3" class="form-textarea"></textarea>
                        </td>
                    </tr>
                </table>
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
                <div class="pop_block-actions">
                    <ul class="actions-left">
                        <li>
                            <input class="jqmClose" id="Submit3" type="submit" value="Approved" onclick="approvalSave('Approve'); return false;" />
                            <input class="jqmClose" id="Submit4" type="submit" value="Reject" style="margin-left: 258px;"
                                onclick="approvalSave('Draft'); return false;" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="pop_box-outer jqmWindow" id="divjointVisit">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Joint</h1>
                <samp>
                    Visit</samp>
                <span><a href="#" id="A1" onclick="jqmmodelhide('divjointVisit');return false;">X</a></span>
            </div>
            <div id="validate-form" class="pop_block-content form">
                <br />
                Please select the type of Joint Visit
                <br />
                <br />
                <br />
                <input id="rdInformed" name="UI" type="radio" value="1" />
                Informed
                <input id="rdUninformed" name="UI" type="radio" value="0" />
                Uninformed    
                <input id="rdCoaching" name="UI" type="radio" value="2" />
                Coaching 
                <br />
                <br />
                <br />
                <input type="button" title="Save" value="Save" id="btnSaveJointVisit" onclick="saveJVofZSM(); return false;" />
                <input type="hidden" id="hdnPlanInfo" />
            </div>
        </div>
    </div>

    <div class="pop_box-outer jqmWindow" id="dialog" style="z-index: 300;">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Execute</h1>
                <samp>
                    Call</samp>
                <span><a href="#" id="A1" onclick="jqmmodelhide('dialog');return false;">X</a></span>
            </div>
            <div id="validate-form" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <div style="overflow-y: scroll; height: 350px; float: left">
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
                                        <option>0:00</option>
                                        <option>0:15</option>
                                        <option>0:30</option>
                                        <option>0:45</option>
                                        <option>1:00</option>
                                        <option>1:15</option>
                                        <option>1:30</option>
                                        <option>1:45</option>
                                        <option>2:00</option>
                                        <option>2:15</option>
                                        <option>2:30</option>
                                        <option>2:45</option>
                                        <option>3:00</option>
                                        <option>3:15</option>
                                        <option>3:30</option>
                                        <option>3:45</option>
                                        <option>4:00</option>
                                        <option>4:15</option>
                                        <option>4:30</option>
                                        <option>4:45</option>
                                        <option>5:00</option>
                                        <option>5:15</option>
                                        <option>5:30</option>
                                        <option>5:45</option>
                                        <option>6:00</option>
                                        <option>6:15</option>
                                        <option>6:30</option>
                                        <option>6:45</option>
                                        <option>7:00</option>
                                        <option>7:15</option>
                                        <option>7:30</option>
                                        <option>7:45</option>
                                        <option>8:00</option>
                                        <option>8:15</option>
                                        <option>8:30</option>
                                        <option>8:45</option>
                                        <option>9:00</option>
                                        <option>9:15</option>
                                        <option>9:30</option>
                                        <option>9:45</option>
                                        <option>10:00</option>
                                        <option>10:15</option>
                                        <option>10:30</option>
                                        <option>10:45</option>
                                        <option>11:00</option>
                                        <option>11:15</option>
                                        <option>11:30</option>
                                        <option>11:45</option>
                                        <option>12:00</option>
                                        <option>12:15</option>
                                        <option>12:30</option>
                                        <option>12:45</option>
                                        <option>13:00</option>
                                        <option>13:15</option>
                                        <option>13:30</option>
                                        <option>13:45</option>
                                        <option>14:00</option>
                                        <option>14:15</option>
                                        <option>14:30</option>
                                        <option>14:45</option>
                                        <option>15:00</option>
                                        <option>15:15</option>
                                        <option>15:30</option>
                                        <option>15:45</option>
                                        <option>16:00</option>
                                        <option>16:15</option>
                                        <option>16:30</option>
                                        <option>16:45</option>
                                        <option>17:00</option>
                                        <option>17:15</option>
                                        <option>17:30</option>
                                        <option>17:45</option>
                                        <option>18:00</option>
                                        <option>18:15</option>
                                        <option>18:30</option>
                                        <option>18:45</option>
                                        <option>19:00</option>
                                        <option>19:15</option>
                                        <option>19:30</option>
                                        <option>19:45</option>
                                        <option>20:00</option>
                                        <option>20:15</option>
                                        <option>20:30</option>
                                        <option>20:45</option>
                                        <option>21:00</option>
                                        <option>21:15</option>
                                        <option>21:30</option>
                                        <option>21:45</option>
                                        <option>22:00</option>
                                        <option>22:15</option>
                                        <option>22:30</option>
                                        <option>22:45</option>
                                        <option>23:00</option>
                                        <option>23:15</option>
                                        <option>23:30</option>
                                        <option>23:45</option>
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
                                        <option>0:00</option>
                                        <option>0:15</option>
                                        <option>0:30</option>
                                        <option>0:45</option>
                                        <option>1:00</option>
                                        <option>1:15</option>
                                        <option>1:30</option>
                                        <option>1:45</option>
                                        <option>2:00</option>
                                        <option>2:15</option>
                                        <option>2:30</option>
                                        <option>2:45</option>
                                        <option>3:00</option>
                                        <option>3:15</option>
                                        <option>3:30</option>
                                        <option>3:45</option>
                                        <option>4:00</option>
                                        <option>4:15</option>
                                        <option>4:30</option>
                                        <option>4:45</option>
                                        <option>5:00</option>
                                        <option>5:15</option>
                                        <option>5:30</option>
                                        <option>5:45</option>
                                        <option>6:00</option>
                                        <option>6:15</option>
                                        <option>6:30</option>
                                        <option>6:45</option>
                                        <option>7:00</option>
                                        <option>7:15</option>
                                        <option>7:30</option>
                                        <option>7:45</option>
                                        <option>8:00</option>
                                        <option>8:15</option>
                                        <option>8:30</option>
                                        <option>8:45</option>
                                        <option>9:00</option>
                                        <option>9:15</option>
                                        <option>9:30</option>
                                        <option>9:45</option>
                                        <option>10:00</option>
                                        <option>10:15</option>
                                        <option>10:30</option>
                                        <option>10:45</option>
                                        <option>11:00</option>
                                        <option>11:15</option>
                                        <option>11:30</option>
                                        <option>11:45</option>
                                        <option>12:00</option>
                                        <option>12:15</option>
                                        <option>12:30</option>
                                        <option>12:45</option>
                                        <option>13:00</option>
                                        <option>13:15</option>
                                        <option>13:30</option>
                                        <option>13:45</option>
                                        <option>14:00</option>
                                        <option>14:15</option>
                                        <option>14:30</option>
                                        <option>14:45</option>
                                        <option>15:00</option>
                                        <option>15:15</option>
                                        <option>15:30</option>
                                        <option>15:45</option>
                                        <option>16:00</option>
                                        <option>16:15</option>
                                        <option>16:30</option>
                                        <option>16:45</option>
                                        <option>17:00</option>
                                        <option>17:15</option>
                                        <option>17:30</option>
                                        <option>17:45</option>
                                        <option>18:00</option>
                                        <option>18:15</option>
                                        <option>18:30</option>
                                        <option>18:45</option>
                                        <option>19:00</option>
                                        <option>19:15</option>
                                        <option>19:30</option>
                                        <option>19:45</option>
                                        <option>20:00</option>
                                        <option>20:15</option>
                                        <option>20:30</option>
                                        <option>20:45</option>
                                        <option>21:00</option>
                                        <option>21:15</option>
                                        <option>21:30</option>
                                        <option>21:45</option>
                                        <option>22:00</option>
                                        <option>22:15</option>
                                        <option>22:30</option>
                                        <option>22:45</option>
                                        <option>23:00</option>
                                        <option>23:15</option>
                                        <option>23:30</option>
                                        <option>23:45</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtEtime" id="txtEtime" value="01:00 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Territory : &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtterr" id="txtterr" value="Fahad">
                                </td>
                                <th>
                                    <b>Activity Status : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="ddl3" id="Select4">
                                        <option value="-1">Select Activity</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Address : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" name="txtaddress" id="txtaddress" value="Fahad">
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
                                    <b>Sample 4: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="sam4" id="sam4">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtsamq4" id="txtsamq4" value="" />
                                </td>
                            </tr>
                            <tr>
                                <th id="Th5">
                                    <b>Gift : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="gif1" id="gif1">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" name="txtgifq1" type="text" id="txtgifq1" value="" />
                                </td>
                                <th id="Th6">
                                    <b>Remarks: &nbsp;</b>
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
                            <input class="jqmClose" id="btnDilogOK" type="submit" onclick="saveExection(); return false;" value="Save" />
                            <input class="jqmClose" id="Submit1" type="submit" value="Close" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="pop_box-outer jqmWindow" id="divUninformed" style="z-index: 300;">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Un Planned
                    <samp>
                        Call</samp>
                    Execution</h1>

                <span><a href="#" id="A2" onclick="jqmmodelhide('divUninformed');return false;">X</a></span>
            </div>
            <div id="Div6" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <div style="overflow-y: scroll; height: 350px; float: left">
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
                                    <asp:TextBox ID="txtUIdate" name="txtupdate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                        CssClass="inp-form" Width="140" />
                                    <div style="margin-left: 162px; margin-top: -28px;">
                                        <img alt="Icon" src="../Images/DatePicker/icon2.gif" id="Img2" />
                                    </div>
                                    <asp:CalendarExtender ID="CalendarExtender3" TargetControlID="txtUIdate" PopupButtonID="Img2"
                                        runat="server">
                                    </asp:CalendarExtender>
                                </td>
                                <th>
                                    <b>Start Time: &nbsp;</b> <span class="red">* </span>
                                </th>
                                <td>
                                    <select id="ddUIStartTime" class="styledselect_form_1">
                                        <option>0:00</option>
                                        <option>0:15</option>
                                        <option>0:30</option>
                                        <option>0:45</option>
                                        <option>1:00</option>
                                        <option>1:15</option>
                                        <option>1:30</option>
                                        <option>1:45</option>
                                        <option>2:00</option>
                                        <option>2:15</option>
                                        <option>2:30</option>
                                        <option>2:45</option>
                                        <option>3:00</option>
                                        <option>3:15</option>
                                        <option>3:30</option>
                                        <option>3:45</option>
                                        <option>4:00</option>
                                        <option>4:15</option>
                                        <option>4:30</option>
                                        <option>4:45</option>
                                        <option>5:00</option>
                                        <option>5:15</option>
                                        <option>5:30</option>
                                        <option>5:45</option>
                                        <option>6:00</option>
                                        <option>6:15</option>
                                        <option>6:30</option>
                                        <option>6:45</option>
                                        <option>7:00</option>
                                        <option>7:15</option>
                                        <option>7:30</option>
                                        <option>7:45</option>
                                        <option>8:00</option>
                                        <option>8:15</option>
                                        <option>8:30</option>
                                        <option>8:45</option>
                                        <option>9:00</option>
                                        <option>9:15</option>
                                        <option>9:30</option>
                                        <option>9:45</option>
                                        <option>10:00</option>
                                        <option>10:15</option>
                                        <option>10:30</option>
                                        <option>10:45</option>
                                        <option>11:00</option>
                                        <option>11:15</option>
                                        <option>11:30</option>
                                        <option>11:45</option>
                                        <option>12:00</option>
                                        <option>12:15</option>
                                        <option>12:30</option>
                                        <option>12:45</option>
                                        <option>13:00</option>
                                        <option>13:15</option>
                                        <option>13:30</option>
                                        <option>13:45</option>
                                        <option>14:00</option>
                                        <option>14:15</option>
                                        <option>14:30</option>
                                        <option>14:45</option>
                                        <option>15:00</option>
                                        <option>15:15</option>
                                        <option>15:30</option>
                                        <option>15:45</option>
                                        <option>16:00</option>
                                        <option>16:15</option>
                                        <option>16:30</option>
                                        <option>16:45</option>
                                        <option>17:00</option>
                                        <option>17:15</option>
                                        <option>17:30</option>
                                        <option>17:45</option>
                                        <option>18:00</option>
                                        <option>18:15</option>
                                        <option>18:30</option>
                                        <option>18:45</option>
                                        <option>19:00</option>
                                        <option>19:15</option>
                                        <option>19:30</option>
                                        <option>19:45</option>
                                        <option>20:00</option>
                                        <option>20:15</option>
                                        <option>20:30</option>
                                        <option>20:45</option>
                                        <option>21:00</option>
                                        <option>21:15</option>
                                        <option>21:30</option>
                                        <option>21:45</option>
                                        <option>22:00</option>
                                        <option>22:15</option>
                                        <option>22:30</option>
                                        <option>22:45</option>
                                        <option>23:00</option>
                                        <option>23:15</option>
                                        <option>23:30</option>
                                        <option>23:45</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtSTime" id="txtSTime" value="12:29 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Doctor: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td style="padding-bottom: 5px">
                                    <select id="ddlUIDoctors">
                                        <option></option>
                                    </select>

                                </td>
                                <th>
                                    <b>End Time: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <select id="ddUIEndTime" class="styledselect_form_1">
                                        <option>0:00</option>
                                        <option>0:15</option>
                                        <option>0:30</option>
                                        <option>0:45</option>
                                        <option>1:00</option>
                                        <option>1:15</option>
                                        <option>1:30</option>
                                        <option>1:45</option>
                                        <option>2:00</option>
                                        <option>2:15</option>
                                        <option>2:30</option>
                                        <option>2:45</option>
                                        <option>3:00</option>
                                        <option>3:15</option>
                                        <option>3:30</option>
                                        <option>3:45</option>
                                        <option>4:00</option>
                                        <option>4:15</option>
                                        <option>4:30</option>
                                        <option>4:45</option>
                                        <option>5:00</option>
                                        <option>5:15</option>
                                        <option>5:30</option>
                                        <option>5:45</option>
                                        <option>6:00</option>
                                        <option>6:15</option>
                                        <option>6:30</option>
                                        <option>6:45</option>
                                        <option>7:00</option>
                                        <option>7:15</option>
                                        <option>7:30</option>
                                        <option>7:45</option>
                                        <option>8:00</option>
                                        <option>8:15</option>
                                        <option>8:30</option>
                                        <option>8:45</option>
                                        <option>9:00</option>
                                        <option>9:15</option>
                                        <option>9:30</option>
                                        <option>9:45</option>
                                        <option>10:00</option>
                                        <option>10:15</option>
                                        <option>10:30</option>
                                        <option>10:45</option>
                                        <option>11:00</option>
                                        <option>11:15</option>
                                        <option>11:30</option>
                                        <option>11:45</option>
                                        <option>12:00</option>
                                        <option>12:15</option>
                                        <option>12:30</option>
                                        <option>12:45</option>
                                        <option>13:00</option>
                                        <option>13:15</option>
                                        <option>13:30</option>
                                        <option>13:45</option>
                                        <option>14:00</option>
                                        <option>14:15</option>
                                        <option>14:30</option>
                                        <option>14:45</option>
                                        <option>15:00</option>
                                        <option>15:15</option>
                                        <option>15:30</option>
                                        <option>15:45</option>
                                        <option>16:00</option>
                                        <option>16:15</option>
                                        <option>16:30</option>
                                        <option>16:45</option>
                                        <option>17:00</option>
                                        <option>17:15</option>
                                        <option>17:30</option>
                                        <option>17:45</option>
                                        <option>18:00</option>
                                        <option>18:15</option>
                                        <option>18:30</option>
                                        <option>18:45</option>
                                        <option>19:00</option>
                                        <option>19:15</option>
                                        <option>19:30</option>
                                        <option>19:45</option>
                                        <option>20:00</option>
                                        <option>20:15</option>
                                        <option>20:30</option>
                                        <option>20:45</option>
                                        <option>21:00</option>
                                        <option>21:15</option>
                                        <option>21:30</option>
                                        <option>21:45</option>
                                        <option>22:00</option>
                                        <option>22:15</option>
                                        <option>22:30</option>
                                        <option>22:45</option>
                                        <option>23:00</option>
                                        <option>23:15</option>
                                        <option>23:30</option>
                                        <option>23:45</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtEtime" id="txtEtime" value="01:00 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Doctor Code: &nbsp;</b><span class="red">* </span>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtUIdrcode" id="txtUIdrcode" />
                                </td>
                                <th>
                                    <b>Activity Status : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="ddl3" id="ddlUIActivity">
                                        <option value="-1">Select Activity</option>
                                    </select>
                                    <%--<input class="inp-form" maxlength="20" name="txtEtime" id="txtEtime" value="01:00 PM">--%>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Territory : &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="20" name="txtterr" id="txtUIterr" />
                                </td>
                                <th>
                                    <b>Address : &nbsp;</b>
                                </th>
                                <td colspan="3">
                                    <input class="inp-form" maxlength="20" name="txtaddress" id="txtUIaddress" />
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
                                    <select class="styledselect_form_1" name="uipro1" id="uipro1">
                                    </select>
                                </td>
                                <th>
                                    <b>Product 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uipro2" id="uipro2">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th id="Th7">
                                    <b>Product 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uipro3" id="uipro3">
                                    </select>
                                </td>
                                <th id="Th8">
                                    <b>Product 4: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_1" name="uipro4" id="uipro4">
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <b>Sample 1: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="uisam1" id="uisam1">
                                    </select>
                                    <input class="inp-form_r" type="text" maxlength="20" name="txtUIsamq1" id="txtUIsamq1" value="" />
                                </td>
                                <th>
                                    <b>Sample 2: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="uisam2" id="uisam2">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtUIsamq2" id="txtUIsamq2" value="" />
                                </td>
                            </tr>
                            <tr>
                                <th id="Th9">
                                    <b>Sample 3: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="uisam3" id="uisam3">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtUIsamq3" id="txtUIsamq3" value="" />
                                </td>
                                <th id="Th10">
                                    <b>Sample 4: &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="uisam4" id="uisam4">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" type="text" name="txtUIsamq4" id="txtUIsamq4" value="" />
                                </td>
                            </tr>
                            <tr>
                                <th id="Th11">
                                    <b>Gift : &nbsp;</b>
                                </th>
                                <td>
                                    <select class="styledselect_form_r" name="uigif1" id="uigif1">
                                    </select>
                                    <input class="inp-form_r" maxlength="20" name="txtUIgifq1" type="text" id="txtUIgifq1" value="" />
                                </td>
                                <th id="Th12">
                                    <b>Remarks: &nbsp;</b>
                                </th>
                                <td>
                                    <input class="inp-form" maxlength="200" name="txtUIremarks" id="txtUIremarks" value="" />
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
                            <input class="jqmClose" id="UISubmit5" type="submit" onclick="saveUPExecution(); return false;" value="Save" />
                            <input class="jqmClose" id="UISubmit6" type="submit" value="Close" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="pop_box-outer jqmWindow2" id="diaRecurrenc">
        <div class="pop_block-border" style="width: 250px">
            <div class="pop_block-header">
                <h1>Recurrence</h1>
                <samp>
                </samp>
                <span class="jqmClose"></span>
            </div>
            <div id="Div4" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                    <tr>
                        <td>

                            <%--<input
        id="txtSmonth" class="inp-form" type="text" />--%>
                            From Month :
                            <asp:TextBox ID="txtSmonth" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                CssClass="inp-form" />
                            <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                TargetControlID="txtSmonth" WatermarkText="Enter Year - Month" />
                            <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                TargetControlID="txtSmonth">
                            </asp:CalendarExtender>
                        </td>
                        <td>To Month :
                            <asp:TextBox ID="txtEmonth" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                CssClass="inp-form" />
                            <asp:TextBoxWatermarkExtender ID="weTextDate" runat="server" ClientIDMode="Static"
                                TargetControlID="txtEmonth" WatermarkText="Enter Year - Month" />
                            <asp:CalendarExtender ID="ceTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden2"
                                OnClientShown="onCalendarShown2" BehaviorID="calendar2" Enabled="True" Format="MMMM-yyyy"
                                TargetControlID="txtEmonth">
                            </asp:CalendarExtender>
                        </td>
                    </tr>
                </table>
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
                <div class="pop_block-actions">
                    <ul class="actions-left">
                        <li>
                            <input id="btnExecuteRecurrence" type="submit" value="Recurrence" onclick="ExecuteRecurrence(); return false;" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="pop_box-outer jqmWindow" id="dayview" style="z-index: 200">
        <div class="pop_block-border">
            <div class="pop_block-header">
                <h1>Day</h1>
                <samp>
                    View</samp>
                <span><a href="#" id="jqmcloses" onclick="jqmmodelhide('dayview');return false;">X</a></span>
            </div>
            <div id="Div5" class="pop_block-content form">
                <div class="clear_with_height">
                </div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0" class="formcss">
                    <tbody>
                        <tr>
                            <th style="color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0">Today's Plan
                                <div id="dtdate">
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
                            <th id="totaldr" style="text-align: right; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"></th>
                        </tr>
                        <tr>
                            <th style="color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"></th>
                            <th style="text-align: right; color: #EC8026; border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #C0C0C0"><a href="#" style="color: #EC8026" onclick="UnplannedVisitPopup();return false;">Un Planned Visit</a> </th>
                        </tr>

                    </tbody>
                </table>
                <div id="drlist" style="overflow-y: scroll; height: 200px; margin-top: 5px">
                </div>
                <div class="clear">
                </div>
                <div class="clear_with_height">
                </div>
            </div>
        </div>
        <div class="clear">
        </div>
    </div>
    <!--Dialog Box on Save Button and Refresh Grid End-->
    <div class="page_heading">
        <h1>
            <img alt="" src="../Images/Icon/planning.png" />
            FMO Calls Planning</h1>
        <div class="clsfil">
            <div id="dtime" class="timeline_arrows">
            </div>

            <select id="selNSM" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select NSM</option>
            </select>
            
            <select id="selRSM" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select SM</option>
            </select>
            
            <select id="selZSM" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select AM</option>
            </select>

            <select id="selmio" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select FMO</option>
            </select>
            <input id="btnsubmit" class="form" type="button" value="Show Plan" onclick="showplan(); return false; ">
            <input id="btnsave" class="form" type="button" value="Save Plan" onclick="saveplan(); return false; ">
            <input id="btnApproval" class="form" type="button" value="Send to Approval" onclick="mioPlanStatusupdate('Pending', ''); return false; ">
            <input id="btnzsm" class="form" type="button" value="Approve/Reject" onclick="callApproval(); return false;">
            <input id="btnRecurrenc" class="form" type="button" value="Monthly Plan Recurrence"
                onclick="PlanRecurrence(); return false;">
        </div>
        <div id="filter" class="clsfil">
            <select id="selBrick" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select Brick</option>
            </select>
            <select id="selClass" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select Class</option>
            </select>
            <select id="selSpecialty" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select Specialty</option>
            </select>
            <select id="selDoctor" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select Doctor</option>
            </select>
            <%--<input id="btnsendapp" class="formSubapp" type="button" value="button">--%>
        </div>
        <div class="clsfil">
            <div id="PlanStatus" class="">
            </div>
            <div id="planReason" class="planReason">
            </div>
        </div>
    </div>
    <div id="wrap">
        <div class="timeline" id="timeline">
        </div>
    </div>
</asp:Content>
