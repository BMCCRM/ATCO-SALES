<%@ Page Title="Dashboard" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="newDashboard.aspx.cs" Inherits="PocketDCR2.Reports.newDashboard" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />


    <style type="text/css">
        .overlay {
            position: fixed;
            display: none;
            width: 100%;
            height: 100%;
            top: 131px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255, 0.9);
            z-index: 2;
        }

        .centered {
            width: 77px;
            text-align: center;
            /*font-family: arial;*/
            font-size: 14px;
            font-weight: 600;
            color: #4fa8e2;
        }

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
            font-size: 45px;
            font-family: 'Times New Roman';
            color: #00FE00;
            text-align: center;
            padding-top: 10px;
        }

        #h1daysinfield {
            font-size: 35px;
            font-family: 'Times New Roman';
            color: #FD6534;
            text-align: center;
            padding-top: 20px;
        }

        #TotalSpoCount {
            font-size: 33px;
            font-family: 'Times New Roman';
            color: #4572a7;
            text-align: center;
            padding-top: 30px;
        }

        #EmployeesWithNoActivity {
            font-size: 33px;
            font-family: 'Times New Roman';
            color: #aa4643;
            text-align: center;
            padding-top: 30px;
        }

        #pcallperdayText, #pdaysinfieldText, #TotalSpoCountText, #EmployeesWithNoActivityText {
            font-family: 'Times New Roman';
            text-align: center;
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


        main {
            min-width: 320px;
            max-width: 100%;
            padding: 10px;
            background: #fff;
        }

        section {
            display: none;
            padding: 20px 0 0;
            border-top: 1px solid #ddd;
        }

        .inputt {
            display: none;
        }

        .aalabel {
            display: inline-block;
            margin: 0 0 -1px;
            padding: 15px 25px;
            font-weight: 600;
            text-align: center;
            color: #bbb;
            border: 1px solid transparent;
        }

            .aalabel:before {
                font-family: fontawesome;
                font-weight: normal;
                margin-right: 10px;
            }

            .aalabel[for*='1']:before {
                content: '\f1cb';
            }

            .aalabel[for*='2']:before {
                content: '\f17d';
            }

            .aalabel[for*='3']:before {
                content: '\f16b';
            }

            .aalabel[for*='4']:before {
                content: '\f1a9';
            }

            .aalabel:hover {
                color: #888;
                cursor: pointer;
            }

        .inputt:checked + .aalabel {
            color: #555;
            border: 1px solid #ddd;
            border-top: 2px solid orange;
            border-bottom: 1px solid #fff;
        }

        #tab1:checked ~ #content1,
        #tab2:checked ~ #content2,
        #tab3:checked ~ #content3,
        #tab4:checked ~ #content4 {
            display: block;
        }

        @media screen and (max-width: 650px) {
            .aalabel {
                font-size: 0;
            }

                .aalabel:before {
                    margin: 0;
                    font-size: 18px;
                }
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        .spinner {
            animation: rotate 2s linear infinite;
            height: 200px;
            width: 200px;
        }

        .divspinner {
            width: 205px;
            height: 205px;
            position: relative;
            top: 20%;
            left: 43%;
            cursor: pointer;
        }

        .btnProceed {
            padding: 0;
            display: block;
            width: 37%;
            height: auto;
        }

        .imgspinner {
            width: 190px;
            height: auto;
            position: absolute;
            top: 20%;
            left: 31%;
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
                //debugger
                setTimeout("beginrefresh()", 1000)
            }
        }
        window.onload = beginrefresh
    </script>

    <style type="text/css">
        .responstable {
            margin: 1em 0;
            width: 100%;
            overflow: hidden;
            background: #FFF;
            color: #024457;
            border-radius: 10px;
            border: 1px solid #167F92;
        }

            .responstable tr {
                border: 1px solid #D9E4E6;
            }

                .responstable tr:nth-child(odd) {
                    background-color: #EAF3F3;
                }

            .responstable th {
                display: none;
                border: 1px solid #FFF;
                background-color: #167F92;
                color: #FFF;
                padding: 1em;
            }

                .responstable th:first-child {
                    display: table-cell;
                    text-align: center;
                }

                .responstable th:nth-child(2) {
                    display: table-cell;
                }

                    .responstable th:nth-child(2) span {
                        display: none;
                    }

                    .responstable th:nth-child(2):after {
                        content: attr(data-th);
                    }

        @media (min-width: 480px) {
            .responstable th:nth-child(2) span {
                display: block;
            }

            .responstable th:nth-child(2):after {
                display: none;
            }
        }

        .responstable td {
            display: block;
            word-wrap: break-word;
            max-width: 7em;
        }

            .responstable td:first-child {
                display: table-cell;
                text-align: center;
                border-right: 1px solid #D9E4E6;
            }

        @media (min-width: 480px) {
            .responstable td {
                border: 1px solid #D9E4E6;
            }
        }

        .responstable th, .responstable td {
            text-align: left;
            margin: .5em 1em;
        }

        @media (min-width: 480px) {
            .responstable th, .responstable td {
                display: table-cell;
                padding: 1em;
            }
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>--%>
    <div id="content3">
        <div class="overlay">


            <div class="divspinner" onclick="viewCharts()">
                <div class="spinner">

                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0 200,200">
                        <defs>

                            <!-- Ring shape centred on 100, 100 with inner radius 90px, outer
             radius 100px and a 12 degree gap at 348. -->
                            <clipPath id="ring">
                                <path d="M 200, 100
                     A 100, 100, 0, 1, 1, 197.81, 79.21
                     L 188.03, 81.29
                     A 90, 90, 0, 1, 0, 190, 100 z" />
                            </clipPath>

                            <!-- Very simple Gaussian blur, used to visually merge sectors. -->
                            <filter id="blur" x="0" y="0">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                            </filter>

                            <!-- A 12 degree sector extending to 150px. -->
                            <path id="p" d="M 250, 100
                        A 150, 150, 0, 0, 1, 246.72, 131.19
                        L 100, 100
                        A 0, 0, 0, 0, 0, 100, 100 z"
                                fill="#0082d6" />
                        </defs>

                        <!-- Clip the blurred sectors to the ring shape. -->
                        <g clip-path="url(#ring)">

                            <!-- Blur the sectors together to make a smooth shape and rotate
             them anti-clockwise by 6 degrees to hide the seam where the
             fully opaque sector blurs with the fully transparent one. -->
                            <g filter="url(#blur)" transform="rotate(-6 100 100)">

                                <!-- Each successive sector increases in opacity and is rotated
                 by a further 12 degrees. -->
                                <use xlink:href="#p" fill-opacity="0" transform="rotate(  0 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.03" transform="rotate( 12 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.07" transform="rotate( 24 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.1" transform="rotate( 36 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.14" transform="rotate( 48 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.17" transform="rotate( 60 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.2" transform="rotate( 72 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.24" transform="rotate( 84 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.28" transform="rotate( 96 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.31" transform="rotate(108 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.34" transform="rotate(120 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.38" transform="rotate(132 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.41" transform="rotate(144 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.45" transform="rotate(156 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.48" transform="rotate(168 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.52" transform="rotate(180 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.55" transform="rotate(192 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.59" transform="rotate(204 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.62" transform="rotate(216 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.66" transform="rotate(228 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.69" transform="rotate(240 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.7" transform="rotate(252 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.72" transform="rotate(264 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.76" transform="rotate(276 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.79" transform="rotate(288 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.83" transform="rotate(300 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.86" transform="rotate(312 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.93" transform="rotate(324 100 100)" />
                                <use xlink:href="#p" fill-opacity="0.97" transform="rotate(336 100 100)" />
                                <use xlink:href="#p" fill-opacity="1" transform="rotate(348 100 100)" />
                            </g>
                        </g>
                    </svg>


                </div>
                <div class="imgspinner">
                    <img class="btnProceed" src="../Images/AtcoProceed.png" onclick="viewCharts()" />
                    <br />
                    <div class="centered">Click to Load</div>

                </div>
            </div>


        </div>

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
                                                    <asp:Label ID="Label2" name="Label2" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col3">
                                                <div class="divcol">
                                                    <asp:Label ID="Label3" name="Label3" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="Th112">
                                                <div class="divcol">
                                                    <asp:Label ID="Label7" name="Label3" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col4">
                                                <div class="divcol">
                                                    <asp:Label ID="Label4" name="Label4" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col5">
                                                <div class="divcol">
                                                    <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
                                            <th valign="top" id="col6">
                                                <div class="divcol">
                                                    <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label>
                                                </div>
                                            </th>
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
                                            <th valign="top" id="Th12">
                                                <select id="ddlTeam" name="ddlTeam" class="styledselect_form_1">
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
                                            <%--<th valign="top" id="Th112">Teams
                                                </th>--%>
                                            <td>Filter By Year - Month :
                                            </td>
                                            <td>Status :
                                            </td>
                                        </tr>
                                        <tr>
                                            <%--<th valign="top" id="Th12">
                                                    <select id="ddlTeam" name="ddlTeam" class="styledselect_form_1">
                                                    </select>
                                                </th>--%>

                                            <td>
                                                <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtDate">
                                                </asp:CalendarExtender>

                                                <asp:TextBox ID="txtenddate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form" />
                                                <asp:TextBoxWatermarkExtender ID="TextBoxWatermarkExtender1" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtenddate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="CalendarExtender1" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden2"
                                                    OnClientShown="onCalendarShown2" BehaviorID="calendar" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtenddate">
                                                </asp:CalendarExtender>
                                            </td>

                                            <td valign="top" id="colStatus">
                                                <select id="ddlstatus" name="ddlstatus" class="styledselect_form_1">
                                                    <option value="all">All</option>
                                                    <option value="active">Active</option>
                                                </select>
                                            </td>

                                            <td>
                                                <input type="button" id="btnResult" name="ShowResult" value="Show Result" onclick="OnshowResultClick()" />
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
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <%--A28F7F--%>
                                        <th>Estimate Working Days VS Field Working Days<%--Actial Calls (MTD)--%>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="container2" style="width: 350px; height: 350px; margin: 0; padding: 0 5px; float: left;">
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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Productive Frequency
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="prodfre" style="width: 350px; height: 350px; margin: 0; padding: 0 5px; float: left;">
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
                            <td>

                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Customer Coverage %
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="customerCov" style="width: 350px; height: 350px; margin: 0; float: left;">
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
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <%--<table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#A28F7F" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Actial Calls (MTD)
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="container2" style="width: 350px; height: 350px; margin: 0; padding: 0 5px; float: left;">
                                            </div>
                                            <div class="loding_box_outer">
                                                <div class="loading">
                                                </div>
                                                <div class="clear">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>--%>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Complete
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="complete" style="width: 350px; height: 350px; margin: 0; float: left;">
                                                <h1 id="h1callperday"></h1>
                                                <p id="pcallperdayText"></p>

                                                <h1 id="h1daysinfield"></h1>
                                                <p id="pdaysinfieldText"></p>


                                                <h1 id="TotalSpoCount"></h1>
                                                <p id="TotalSpoCountText"></p>


                                                <h1 id="EmployeesWithNoActivity"></h1>
                                                <p id="EmployeesWithNoActivityText"></p>

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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Target Vs Actual Calls (MTD)
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerPlannedvsAcutalCalls" style="width: 350px; height: 350px; margin: 0; float: left;">
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

                            <%--Add New Chart--%>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Doctor Visit Range Analysis
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerVisitFrequency" style="width: 350px; height: 350px; margin: 0; float: left;">
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

                            <%--  <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#A28F7F" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Doctor Visit Range Analysis
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerVisitFrequency" style="width: 350px; height: 350px; margin: 0; float: left;">
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
                            </td>--%>
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
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Brands Detail
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerBrandChart" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
                                                <div id="brandchart"></div>
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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Specialists covered
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerSpecialityChart" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
                                                <div id="specialistChart"></div>
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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Doctor Count Speciality Wise
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerDocCountSpecialityWiseChart" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
                                                <div id="doccountspecialitywisechart"></div>
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
                    <table width="100%" cellspacing="10" cellpadding="10" border="0">
                        <tr>
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Doctor Count Class Wise
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerDocCountClassWiseChart" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
                                                <div id="doccountclasswisechart"></div>
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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <th>Plan Doctors VS Actual Calls (MTD)
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="TotalDoctorsPlannedvsAcutalCalls" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
                                          
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
                            <td>
                                <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                                    <tr bgcolor="#A28F7F" style="color: #FFFFFF; font-weight: bold;">
                                        <th>MTD Average Calls
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="position: relative;">
                                            <div id="ContainerAverageCalls" style="width: 350px; height: 410px; margin: 0; float: left; margin-top: 3%;">
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
                <td align="center">
                    <table cellspacing="0" cellpadding="2" border="0" style="border: 1px solid #A28F7F">
                        <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                            <th>Daily Call Trends - Average Calls Per Day
                            </th>
                        </tr>
                        <tr>
                            <td style="position: relative;">
                                <div id="ContanerDailyCallTrend" style="width: 850px; height: 300px; margin: 0; float: left;">
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

            <tr>
                <td align="center">
                    <table width="100%" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                        <tr>
                            <td align="center" style="position: relative;">
                                <div id="dailycalldiv">
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table width="100%" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                        <tr>
                            <td align="center" style="position: relative;">
                                <div id="dailyratingdiv">
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" cellspacing="10" cellpadding="10" border="0" style="margin-top: -30px;">
                        <tr>
                            <td>
                                <table border="0" width="100%" cellpadding="0" cellspacing="0" id="TOP_5_MEDICAL"
                                    style="border: 1px solid #c1c1c1;">
                                    <tr bgcolor="#21668D" style="color: #FFFFFF; font-weight: bold;">
                                        <td style="padding: 5px;">TOP 5 MEDICAL REPS
                                        </td>
                                        <td>BOTTOM 5 MEDICAL REPS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin-right: 10px; padding: 5px;">
                                            <div id="top5div">
                                            </div>
                                        </td>
                                        <td style="padding: 5px;">
                                            <div id="bottom5div">
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
            </tr>
        </table>
    </div>
    <%--    <asp:Label ID="hdnMode" runat="server" Text="test" ClientIDMode="Static" />--%>
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L7" runat="server" ClientIDMode="Static" />



    <%--new 6.1 version of highchart--%>
    <%--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>--%>
    <%--    <script type="text/javascript" src="https://code.highcharts.com/highcharts.js"></script>
    <script type="text/javascript" src="https://code.highcharts.com/highcharts-more.js"></script>
    <script type="text/javascript" src="https://code.highcharts.com/modules/exporting.js"></script>
    <script type="text/javascript" src="https://code.highcharts.com/modules/export-data.js"></script>--%>



    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts-more.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>

    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>

    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>


    <script src="NewDashboard.js" type="text/javascript"></script>


</asp:Content>
