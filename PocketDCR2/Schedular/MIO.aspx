<%@ Page Title="SPO Scheduler" Language="C#" MasterPageFile="~/MasterPages/Home.master" AutoEventWireup="true" CodeBehind="MIO.aspx.cs" Inherits="PocketDCR2.Schedular.MIO" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%--<title>MIO Scheduler</title>
<link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.css' />
<link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.print.css' media='print' />
<script type='text/javascript' src='jquery/jquery-1.7.1.min.js'></script>
<script type='text/javascript' src='jquery/jquery-ui-1.8.17.custom.min.js'></script>
<script src="jquery/curvycorners.src.js" type="text/javascript"></script>
<script type='text/javascript' src='fullcalendar/fullcalendar.js'></script>
<script type="text/javascript" src="fullcalendar/AJAXRequest.js"></script>
<link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />--%>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="jquery/jquery-ui-1.8.17.custom.min.js" type="text/javascript"></script>
    <script src="jquery/curvycorners.src.js" type="text/javascript"></script>
    <script src="fullcalendar/AJAXRequest.js" type="text/javascript"></script>
    <script src="fullcalendar/fullcalendar.js" type="text/javascript"></script>
    <script src="MIO.js" type="text/javascript"></script>
    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.css' />
    <link rel='stylesheet' type='text/css' href='fullcalendar/fullcalendar.print.css' media='print' />
    <link href="Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' type='text/css' href='Styles/LayOut.print.css' media='print' />
    <link rel='stylesheet' type='text/css' href='Styles/style.css'  />
    
    

    <link rel="stylesheet" href="jquery/tingle.min.css">
    <script type="text/javascript" src="jquery/tingle.min.js"></script>

    <style type="text/css">


          #btncopyplan {
            /*background-color: black;
            color: white;
            display: block;
            height: 25px;
            line-height: 25px;
            text-decoration: none;
            width: 188px;
            text-align: center;
            border-radius:5px;*/
            display: block;
            height: 30px;
            width: 180px;
            /*background-image: url('Images/blank_btn_large.png');
            background-repeat: no-repeat;*/
        }

          
        #stdate {
            border: solid 1px #d1c498;
            color: #393939;
            cursor: pointer;
            font-family: "Calibri", Verdana;
            font-size: 12px;
            height: 24px;
            margin: 0px 0px 5px 0px;
            padding: 3px 7px 3px 5px;
            text-align: left;
            width: 188px;
            outline: none;
        }

        body {
            font-family: verdana;
            font-size: 15px;
        }

        a {
            color: #333;
            text-decoration: none;
        }

            a:hover {
                color: #ccc;
                text-decoration: none;
            }

        #mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }

        #boxes .window {
            position: fixed;
            left: 0;
            top: 0;
            width: 440px;
            height: 200px;
            display: none;
            z-index: 9999;
            padding: 20px;
        }

        #boxes #dialog {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }

        #boxes #dialog1 {
            width: 375px;
            height: 203px;
        }

        #dialog1 .d-header {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }

            #dialog1 .d-header input {
                position: relative;
                top: 60px;
                left: 100px;
                border: 3px solid #cccccc;
                height: 22px;
                width: 200px;
                font-size: 15px;
                padding: 5px;
                margin-top: 4px;
            }

        #dialog1 .d-blank {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }

        #dialog1 .d-login {
            float: left;
            width: 108px;
            height: 53px;
        }

        #boxes #dialog2 {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }
    </style>

    <style type='text/css'>
        body {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
        }

        #calendar {
            width: 900px;
            margin: 0 auto;
        }

        a {
            color: #333;
            text-decoration: none;
        }

            a:hover {
                color: #ccc;
                text-decoration: none;
            }

        #mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9000;
            background-color: #000;
            display: none;
        }

        #boxes .window {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 900px;
            height: 200px;
            display: none;
            z-index: 9999;
        }

        #boxes .windowleft {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }

        #boxes .windowright {
            float: left;
            left: 0;
            top: 0;
            width: 400px;
            z-index: 9999;
            padding: 20px;
        }


        #boxes #dialog {
            width: 375px;
            height: 203px;
            padding: 10px;
            background-color: #ffffff;
        }

        #boxes #dialog1 {
            width: 375px;
            height: 203px;
        }

        #dialog1 .d-header {
            background: url(images/login-header.png) no-repeat 0 0 transparent;
            width: 375px;
            height: 150px;
        }

            #dialog1 .d-header input {
                position: relative;
                top: 60px;
                left: 100px;
                border: 3px solid #cccccc;
                height: 22px;
                width: 200px;
                font-size: 15px;
                padding: 5px;
                margin-top: 4px;
            }

        #dialog1 .d-blank {
            float: left;
            background: url(images/login-blank.png) no-repeat 0 0 transparent;
            width: 267px;
            height: 53px;
        }

        #dialog1 .d-login {
            float: left;
            width: 108px;
            height: 53px;
        }

        #boxes #dialog2 {
            background: url(images/notice.png) no-repeat 0 0 transparent;
            width: 326px;
            height: 229px;
            padding: 50px 0 20px 25px;
        }

        #preloader {
            display: none;
        }

        #preloader2 {
            display: none;
        }
    </style>
    
    
    <div id="preloader" class="loadingdivOuter">
        <img src="Images/loading2.gif" alt="Please Wait" title="Please Wait" />
        <br />
        Please wait
    </div>
    <div id="content">
        <div class="page_heading_no_icon">
            <%--<h1> 1- Month view of MIO </h1>--%>
        </div>
        <div class="content_inner">
            <div class="status_area">
                <div class="clear"></div>
                <div class="row">
                    <div class="clear"></div>
                    <label>Plan Status: </label>
                    <label id="labelMyStatus" class="red1" style="height: 25px;"><span id="spanMyStatus"></span></label>
                </div>
                <div class="clear"></div>
                <div class="row">
                    <div class="clear"></div>
                    <label>Filter Brick: </label>
                    <label>
                        <select id="ddlDoctorBrickMain" class="styledselect_form_1">
                            <option></option>
                        </select>
                    </label>
                </div>
                <div class="clear"></div>
                <div class="row">
                    <div class="clear"></div>
                    <label>Filter Doctor: </label>
                    <label>
                        <select id="ddlDoctorMain" class="styledselect_form_1">
                            <option></option>
                        </select>
                    </label>
                </div>
                <div class="clear"></div>
                <div class="row">
                    <div class="clear"></div>
                    <label id="lblRejectComments">Reject Comments: </label>
                    <span id="spanRejectComments"></span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="calender">
                <div class="CalenderHeading"><span id="EmployeeName"></span></div>
                <div id='calendar' style="width: 100%"></div>
                <div class="clear"></div>
                <div class="bottom_area" style="display:inline-flex">
                    <input id="btnPlanStatus" type="button" class="button_grey" value="Plan Status" />
                    <input id="btnApproval" type="button" value="Send Approval to AM" class="button_grey" />
                </div>
            </div>

        </div>
    </div>

    <div>
        <br />
    </div>
    <br />
    <div style="margin-left: 53px; text-align: left">
    </div>
    <a href="#dialog1" name="modal"></a>
    <a href="#DivAdd" name="modalAdd"></a>
    <a href="#DivJVs" name="modalJVs"></a>
    <div id="boxes">

        <div id="dialog" class="window">
            <a href="#" class="close">Close it</a>
        </div>

        <div id="DivJVs" class="window">
            aasdasas
        </div>
        <!-- Start of Login Dialog -->
        <div id="DivAdd" class="window">
            <div id="preloader2" class="loadingdivOuter1">
                <img src="Images/loading2.gif" alt="Please Wait" title="Please Wait" />
                <br />
                Please wait
            </div>
            <div class="windowleft">
                <div class="persoanl-data">
                    <div class="inner-head"></div>
                    <div class="inner-left">

                        <ul class="form_list">
                               <li>
                                <div class="lfloat">
                                    From
                                    <br />
                                    <asp:TextBox CssClass="form-control" ID="stdate" ClientIDMode="Static" runat="server" MaxLength="10"></asp:TextBox>
                                    <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                    </asp:CalendarExtender>
                                </div>
                                <div class="rfloat" style="height: 60px;">
                                    <br />
                                    <%--<a id="music" onclick="PlanCopying();" href="#">Copy Plan</a>--%>
                                    <input id="btncopyplan" onclick="PlanCopying();" class="button_grey" value="Copy Plan" type="button" />
                                    <br />
                                </div>
                            </li>
                            <li>
                                <div class="lfloat">
                                    Bricks
                                    <br />
                                    <select id="ddlBricks" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    Classes
                                    <br />
                                    <select id="ddlClasses" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Doctors
                                <br />
                                <select id="ddlDoctors" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>
                            <li>
                                <div class="lfloat">
                                    Start Time
                                    <br />
                                    <select id="ddlTimeStart" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="rfloat">
                                    End Time
                                    <br />
                                    <select id="ddlTimeEnd" class="styledselect_form_1">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Activity
                                <br />
                                <select id="ddlActivities" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>

                            <%--<li>Products
                                <br />
                                <div id="tdProducts">
                                    <select id="Products0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Products3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Reminders
                                <br />
                                <div id="tdReminders">
                                    <select id="Reminders0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Reminders3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Samples   
                                <br />
                                <div id="tdSamples">
                                    <select id="Sample0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Sample1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Sample2" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Sample3" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>
                            <li>Quantity
                                <br />
                                <div id="tdSQTY">
                                    <input type="text" id="Quantity0" size="2" maxlength="2" style="display: none" />
                                    <input type="text" id="Quantity1" size="2" maxlength="2" style="display: none" />
                                    <input type="text" id="Quantity2" size="2" maxlength="2" style="display: none" />
                                    <input type="text" id="Quantity3" size="2" maxlength="2" style="display: none" />
                                </div>
                            </li>

                            <li>Giveaway     
                                <br />
                                <div id="tdGift">
                                    <select id="Gift0" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                    <select id="Gift1" class="styledselect_form_4">
                                        <option></option>
                                    </select>
                                </div>
                            </li>--%>

                            <li id="divBMD" style="display: none;">BMD Coordinator
                                <br />
                                <select id="ddlBMD" class="styledselect_form_3">
                                    <option></option>
                                </select>
                            </li>
                            <li>Description
                                <br />
                                <input id="txtDescription" type="text" class="inp-form-medium" />
                            </li>
                            <li>Recurring in following dates <br />

                                <input id="chkMon" type="checkbox" style="display: none;" /><%--Mon--%>
                                <input id="chkTue" type="checkbox" style="display: none;" /><%--Tue--%>
                                <input id="chkWed" type="checkbox" style="display: none;" /><%--Wed--%>
                                <input id="chkThu" type="checkbox" style="display: none;" /><%--Thu--%>
                                <input id="chkFri" type="checkbox" style="display: none;" /><%--Fri--%>
                                <input id="chkSat" type="checkbox" style="display: none;" /><%--Sat--%>

                                <select id="dateSelect0" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect1" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect2" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect3" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect4" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect5" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect6" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>
                                <select id="dateSelect7" class="styledselect_form_4" style="display: none;">
                                    <option></option>
                                </select>

                            </li>
                        </ul>
                    </div>

             


                    <div class="inner-bottom" style="display:inline-flex">
                        <input id="btnAdd" type="button" class="button_grey" value="Save event" />
                        <input id="btnReset" type="button" class="button_grey" value="Reset All Fields" />
                    </div>
                </div>
            </div>
            <div class="windowright">
                <ul id="ulRejectComments1" class="form_list" style="display: none">
                    <li>This event has been rejected by AM with following comments:
                    <br />
                        <textarea rows="" cols="" id="txtRejectComments1" readonly="readonly" class="styledtextarea_1"></textarea>
                    </li>
                </ul>
                <div id="dayCalender" style="background-color: White;">
                </div>
                <div class="d-blank">
                </div>
                <div>
                </div>
            </div>
        </div>
        <div id="dialog1" class="window">
            <div class="d-header">
                <input id="txtuser" type="text" value="username" /><br />
                <input id="txtstartdate" type="text" /><br />
                <input id="txtenddate" type="text" /><br />
                <input id="txtcolor" type="text" /><br />
            </div>
            <div class="d-blank"></div>
            <div></div>
        </div>
        <!-- End of Login Dialog -->

        <!-- Start of Sticky Note -->
        <div id="dialog2" class="window">
            So, with this <b>Simple Jquery Modal Window</b>, it can be in any shapes you want! Simple and Easy to modify : )
            <br />
            <br />
            <input type="button" value="Close it" class="close" />
        </div>
        <!-- Mask to cover the whole screen -->
        <div id="mask"></div>
    </div>




</asp:Content>

