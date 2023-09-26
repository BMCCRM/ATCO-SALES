<%@ Page Title="Active In-active Dashboard" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="ActiveInActiveDashboard.aspx.cs" Inherits="PocketDCR2.Reports.ActiveInActiveDashboard" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts-more.js" type="text/javascript"></script>
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
   <%-- <script src="NewDashboard.js" type="text/javascript"></script>--%>
    <script src="JsDashboard.js" type="text/javascript"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <style type="text/css">
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: absolute;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -125px;
            z-index: 222;
            display: block;
        }

        .loading2 {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: absolute;
            top: 43%;
            left: 50%;
            margin: -197px 0 0 -125px;
            z-index: 222;
            display: block;
        }

        .loding_box_outer {
            width: 100%;
            height: 100%;
            position: relative;
            left: 0px;
            top: 0px;
            z-index: 111;
            background: #e1e1e1;
            opacity: 0.6;
            display: none;
        }


        #ContentPlaceHolder1_tblCalls {
            width: 100%;
        }

            #ContentPlaceHolder1_tblCalls td a {
                color: #EC8026;
            }

        .style1 {
            color: #E44C16;
        }

        .style2 {
            width: 3px;
        }

        .roundedPanel {
            width: 300px;
            background-color: #F5EBD7;
            color: white;
            font-weight: bold;
        }

        .style3 {
            color: #FFFFFF;
            font-size: 13px;
            font-weight: bold;
        }

        .accordionHeader {
            border: 1px solid #2F4F4F;
            color: white;
            background-color: #634329;
            font-family: News Gothic MT Bold;
            font-size: 10px;
            font-weight: bold;
            padding: 5px;
            margin-top: 5px;
        }

        .accordionContent {
            background-color: #F5EBD7;
            border: 1px dashed #2F4F4F;
            border-top: none;
            padding: 5px;
            padding-top: 10px;
        }

        .style4 {
            font-size: x-large;
        }

        .style6 {
            font-size: small;
            font-weight: bold;
            color: White;
        }

        .style7 {
            width: 70px;
            line-height: 30px;
        }

        .style8 {
            width: 70px;
            font-weight: bold;
            line-height: 35px;
        }

        .style9 {
            width: 70px;
            color: #FFFFFF;
            font-weight: bold;
            line-height: 30px;
        }

        .style12 {
            color: #FFFFFF;
            font-weight: bold;
            width: 224px;
        }

        .content_outer {
            background-image: none;
        }

        #content {
            width: 100%;
        }

        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW, .ob_gNRM .ob_gCc1, .ob_gFCont, .ob_gR, .ob_gNRM, .ob_gBCont .ob_gCS, .ob_gBCont .ob_gCS_F {
            background: none !important;
        }

        .ob_gHR {
            background: #A28F7F !important;
            color: #fff !important;
        }

        .ob_gHContWG .ob_gH .ob_gC, .ob_gHContWG .ob_gH .ob_gCW {
            color: #fff !important;
        }

        #counter {
            font-weight: bold;
            font-family: courier new;
            font-size: 12pt;
            color: White;
        }

        table#content3 {
            display: block;
        }

        #foo {
            width: 99%;
            text-align: right;
            padding: 1px 0;
            text-transform: capitalize;
            font-size: 12px;
            color: white;
        }

        #h1callperday {
            font-size: 60px;
            font-family: 'Times New Roman';
            color: #2484C6;
            text-align: center;
            padding-top: 40px;
        }

        #pcallperdayText {
            font-family: 'Times New Roman';
            text-align: center;
        }

        #h1daysinfield {
            font-size: 60px;
            font-family: 'Times New Roman';
            color: #1B1464;
            text-align: center;
            padding-top: 40px;
        }

        #pdaysinfieldText {
            font-family: 'Times New Roman';
            text-align: center;
        }

           .column-options {
	border-collapse: collapse;
	border-bottom: 1px solid #d6d6d6;}
        
.column-options th, .column-options td {
	font-family: Helvetica, Arial, sans-serif;
    font-size: 70%;
	font-weight: normal;
	color: #232323;
	background-color: #f7f7f7;
	border-left:1px solid #ffffff;
	border-right:1px solid #dcdcdc;}

.column-options th {
	font-size: 100%;
	font-weight: normal;
	/*letter-spacing: 0.12em;*/
	text-shadow: -1px -1px 1px #999;
	color: #fff;
	background-color: #2484C6;
	padding: 12px 23px 15px 8px;
	border-bottom: 1px solid #d6d6d6;}

.column-options td {
	text-shadow:1px 1px 0 #fff;
	padding:4px 20px 4px 20px;}

.column-options .odd td {
	background-color: #ededed;}


.column-options th:first-child {
	border-top-left-radius: 7px;
	-moz-border-radius-topleft: 7px;}

.column-options th:last-child {
	border-top-right-radius: 7px;
	-moz-border-radius-topright: 7px;}

.column-options th:last-child, .column-options td:last-child {
	border-right: 0px;}

        .topFiveMedicalRepControl {
        
            width:100% !important;
          
            overflow:auto;
            
        }

                #btnResult {
            background: #6197b8;
            background-image: -webkit-linear-gradient(top, #6197b8, #389ede);
            background-image: -moz-linear-gradient(top, #6197b8, #389ede);
            background-image: -ms-linear-gradient(top, #6197b8, #389ede);
            background-image: -o-linear-gradient(top, #6197b8, #389ede);
            background-image: linear-gradient(to bottom, #6197b8, #389ede);
            -webkit-border-radius: 15;
            -moz-border-radius: 15;
            border-radius: 15px;
            -webkit-box-shadow: 3px 5px 5px #241624;
            -moz-box-shadow: 3px 5px 5px #241624;
            box-shadow: 3px 5px 5px #241624;
            font-family: Arial;
            color: #ffffff;
            padding: 3px 6px 3px 6px;
            text-decoration: none;
            margin-bottom: 10px;
        }

            #btnResult:hover {
                background: #3cb0fd;
                text-decoration: none;
            }


    </style>
    <script type="text/javascript">

        var limit = "10:00"
        if (document.images) {
            var parselimit = limit.split(":")
            parselimit = parselimit[0] * 60 + parselimit[1] * 1
        }
        function beginrefresh() {
            if (!document.images)
                return
            if (parselimit == 1)
                window.location.reload()
            else {
                parselimit -= 1
                curmin = Math.floor(parselimit / 60)
                cursec = parselimit % 60
                if (curmin != 0)
                    curtime = "next refresh in " + curmin + ":" + cursec + " minutes"
                else
                    curtime = "next refresh in " + cursec + " second"
                window.status = curtime
                document.getElementById('foo').innerHTML = curtime;
                setTimeout("beginrefresh()", 1000)
            }
        }
        window.onload = beginrefresh
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div id="content3">
        <div id="foo">
            Div you want to change
        </div>
        <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table"
            style="margin-top: 15px;">
            <tr>
                <th rowspan="3" class="sized">
                    <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                </th>
                <th class="topleft"></th>
                <td id="tbl-border-top">&nbsp;
                </td>
                <th class="topright"></th>
                <th rowspan="3" class="sized">
                    <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
                </th>
            </tr>
            <tr>
                <td id="tbl-border-left"></td>
                <td>
                    <!--  start content-table-inner -->
                    <div id="content-table-inner">
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                            <tr valign="top">
                                <td valign="top">
                                    <!-- start id-form -->
                                    <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                        <tr>

                                            <th valign="top" id="col1">
                                                <div class="divcol">
                                                    <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col2">
                                                <div class="divcol">
                                                    <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col3">
                                                <div class="divcol">
                                                    <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col4">
                                                <div class="divcol">
                                                    <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>

                                            <th valign="top" id="col5">
                                                <div class="divcol">
                                                    <asp:Label ID="Label5" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>

                                            <th valign="top" id="col6">
                                                <div class="divcol">
                                                    <asp:Label ID="Label6" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                          <%--  <th valign="top" id="col5">
                                                <div class="divcol">
                                                </div>
                                            </th>
                                            <th valign="top" id="col6">
                                                <div class="divcol">
                                                </div>
                                            </th>--%>
                                        </tr>
                                        <tr>
                                            <th valign="top" id="col11">
                                                <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col22">
                                                <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col33">
                                                <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col44">
                                                <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col55">
                                                <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                            <th valign="top" id="col66">
                                                <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                    <option value="-1">Select...</option>
                                                </select>
                                            </th>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" id="id-" style="font-weight: bold">
                                        <tr>
                                            <td>Filter By Year - Month :
                                            </td>
                                             <td>Status :
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtDate">
                                                </asp:CalendarExtender>
                                            </td>
                                            <td valign="top" id="colStatus">
                                                <select id="ddlstatus" name="ddlstatus" class="styledselect_form_1">
                                                    <option value="all">All</option>
                                                     <option value="active">Active</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="button" id="btnResult" name="ShowResult" value="Show Result" onclick="OnshowResultClick()">
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- end id-form  -->
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                </td>
                                <td></td>
                            </tr>
                        </table>
                        <div class="clear">
                        </div>
                    </div>
                    <!--  end content-table-inner  -->
                </td>
                <td id="tbl-border-right"></td>
            </tr>
            <tr>
                <th class="sized bottomleft"></th>
                <td id="tbl-border-bottom">&nbsp;
                </td>
                <th class="sized bottomright"></th>
            </tr>
        </table>
        <table width="100%" cellspacing="10" cellpadding="10" border="0" id="content" style="float: left;">
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>National<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="National_Estworkingsdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>National<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="National_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>Acer Team<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Acer_Team_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th> Advance Team<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="AdvanceTeam_Estworkingsdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>Alpha Team<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="AlphaTeam_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>Dynamic Team<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="DynamicTeam_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0 5px;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>Elite Team<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Elite_Team_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Galaxy Team 
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Galaxy_Team_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>

                               <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F;">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Mass Team </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Mass_Team_workingdays" style="width: 300px; height: 350px; margin: 0; padding: 0">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>

                        </tr>
                    </table>
                </td>

            </tr>
            <tr>
                 <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <th>MTD Average Calls
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerAverageCalls" style="width: 300px; height: 350px; margin: 0; padding: 0">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <th>MTD Average Calls
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerAverageCallsForTeam" style="width: 700px; height: 350px; margin: 0; padding: 0">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading2">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        </table>
                     </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Productive Frequency
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="prodfreFornewDb" style="width: 1150px; height: 400px; margin: 0; padding: 0 5px; float: left;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <%--#21668D master color--%>
                    <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                        <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                            <th>Customer Coverage %
                            </th>
                        </tr>
                        <tr>
                            <td style="position: relative;">
                                <div id="customerCovForNewDb" style="width: 1150px; height: 400px; margin: 0; float: left;">
                                </div>
                                <div class="loding_box_outer">
                                    <div class="loading">
                                    </div>
                                    <div class="clear">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
          
          <tr>
              <td>
                  <table width="100%" cellspacing="10" cellpadding="10" border="0">
                      <tr>
                          <tr>
                              <td>
                                  <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                      <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                          <th>Target Vs Actual Calls (MTD)
                                          </th>
                                      </tr>
                                      <tr>
                                          <td style="position: relative;">
                                              <div id="ContainerPlannedvsAcutalCallsForNewCall" style="width: 1150px; height: 400px; margin: 0; float: left;">
                                              </div>
                                              <div class="loding_box_outer">
                                                  <div class="loading">
                                                  </div>
                                                  <div class="clear">
                                                  </div>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </tr>
                  </table>
              </td>

          </tr>
          
        <tr>
            <td>
                <table width="100%" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                    <tr>
                        <td>
                            <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                    <th>Daily Call Trends - Average Calls Per Day
                                    </th>
                                </tr>
                                <tr>
                                    <td style="position: relative;">
                                        <div id="ContanerDailyCallTrendForNewCalls" style="width: 1150px; height: 400px; margin: 0; float: left;">
                                        </div>
                                        <div class="loding_box_outer">
                                            <div class="loading">
                                            </div>
                                            <div class="clear">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                    <tr>
                        <td style="position: relative;">
                            <div id="dailycalldivHeader" style="float: left;">
                            </div>
                            <div id="dailycallforNewDB" style="float: left;">
                            </div>
                        </td>
                    </tr>
                </table>
                </td>
        </tr>
        <tr>
            <td>

                <div class="topFiveMedicalRepControl">
                <table width="600px" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                    <tr>
                        <td>
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="TOP_5_MEDICAL"
                                style="border: 1px solid #c1c1c1;">
                                <tr bgcolor="#2484C6" style="color: #FFFFFF; font-weight: bold;">
                                    <td style="padding: 6px; padding-top:18px" align="center">TOP TEAM CALL AVERAGE
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style="margin-right: 10px; padding: 5px;">
                                        <div id="topdivForNewDb">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                    </div>
            </td>
        </tr>

    </div>
    <%--    <asp:Label ID="hdnMode" runat="server" Text="test" ClientIDMode="Static" />--%>
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
</asp:Content>
