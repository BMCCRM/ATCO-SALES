<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="MioPlanning2.aspx.cs" Inherits="PocketDCR2.Form.MioPlanning2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/timeline.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="MioPlanning2.js" type="text/javascript"></script>
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

        .timeline {
            width: 60% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="" id="loadingmain">
        <div id="loadingdiv2" class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="pop_box-outer jqmWindow2" id="zsmdialog">
        <div class="pop_block-border" style="width: 410px">
            <div class="pop_block-header">
                <h1>Enter Resons</h1>
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



    <div class="page_heading">
        <h1>
            <img alt="" src="../Images/Icon/planning.png" />
            FMO Calls Planning</h1>
        <div class="clsfil">
            <div id="dtime" class="timeline_arrows">
            </div>
            <select id="seldays" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px; display: none">
                <option value="1">show 1 to 10</option>
                <option value="2">show 2 to 20</option>
                <option value="3">show 21 to end day of month </option>
            </select>
            <select id="selmio" class="styledselect_form_1" style="margin-left: 10px; margin-right: 10px">
                <option>Select FMO</option>
            </select>
            <input id="btnsubmit" class="form" type="button" value="Show Plan" onclick="showplan(); return false; " style="display: none">
            <input id="btnsave" class="form" type="button" value="Save Plan" onclick="saveplan(); return false; ">
            <input id="btnApproval" class="form" type="button" value="Send to Approval" onclick="mioPlanStatusupdate('Pending', ''); return false; ">
            <input id="btnzsm" class="form" type="button" value="Save Plan" onclick="callApproval(); return false;">
            <input id="btnRecurrenc" class="form" type="button" value="Monthly Plan Recurrence" onclick="PlanRecurrence(); return false;">
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
            <input id="Radio1" type="radio" value="1" checked="checked" onclick="clickradio(1); return false; " />Show Plan 1 to 10 
            <input id="Radio2" type="radio" value="2" onclick="clickradio(2); return false; " />Show Plan 11 to 20
            <input id="Radio3" type="radio" value="3" onclick="clickradio(3); return false; " />Show Plan 21 to end day of month 
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