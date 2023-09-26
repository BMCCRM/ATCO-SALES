<%@ Page Title="Sales Dashboard" Language="C#" MasterPageFile="~/MasterPages/HomeBoot.Master" AutoEventWireup="true" CodeBehind="NewSalesDashboard.aspx.cs" Inherits="PocketDCR2.Reports.NewSalesDashboard" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <script type="text/javascript"  src="../assets/js/jquery.js"></script>
        <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../assets/css/Nbootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/font-awesome.min.css" rel="stylesheet" />
    <link href="../assets/css/chosen.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/Nbootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/highcharts.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/highcharts-3d.js"></script>
    <script type="text/javascript"  src="../assets/Highcharts-4.2.5/js/highcharts-more.js"></script>
    <script type="text/javascript" src="SaleDashboard.js"></script>
    <script type="text/javascript" src="../assets/js/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../assets/js/chosen.proto.min.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/data.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/solid-gauge.js"></script>
    <script  type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/drilldown.js"></script>
    <style type="text/css">

 
        .MenuCards {
            transition: background-color 0.5s ease;
            background-color: #338dc8;
            color: white;
            width: 150px;
            cursor: pointer;
            margin-bottom: 10px;
            margin-right: 10px;
        }

            .MenuCards:hover {
                background-color: #9ae4a9;
            }

            .MenuCards:active {
                background-color: #9ae4a9;
            }

            .MenuCards:focus {
                background-color: #9ae4a9;
            }

        .Menuicon {
            float: right;
            padding-bottom: 5px;
        }

        th {
            padding-right: 20px;
            padding-bottom:10px;
        }
            
    </style>
        <style  type="text/css">
        .loading
        {
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
        
        .disnon
        {
            display: none;
        }
        .auto-style1 {
            width: 152px;
        }
        .auto-style2 {
            width: 154px;
        }
           .ob_gC {
            background-image: url("../Styles/GridCss/header.gif");
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 40px;
            text-align: center;
            /*border-bottom: 0px solid;
    padding: 1px 1px;*/
    /*border-collapse: separate;*/
        }

        .odd{background-color: #f6f5f0 !important;}
        .even{background-color: #efede2 !important;}
table.dataTable.no-footer {
    border:  0 solid #616262 !important;
}
.ob_gMCont {
    border-bottom: 1px solid #e3e2de;
    border-top: 1px solid #e3e2de;
    overflow: hidden;
    position: relative;
}

 .ob_gAL {
            color: #d99e00;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: bold;
            text-decoration: none;
        }

        .ob_text {
            color: #242500;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: normal;
            height: 24px;
            text-align: center;
            vertical-align: middle;
        }

        .column-options {
	border-collapse: collapse;
	border-bottom: 1px solid #d6d6d6;}
        
.column-options th, .column-options td {
	font-family: Helvetica, Arial, sans-serif;
    font-size: 80%;
	font-weight: normal;
	color: #434343;
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

.column-options a.buttonlink {
	font-size: 90%;
	text-shadow: none;
	text-decoration: none;
	text-align:center;
	text-shadow: -1px -1px 1px #72aebd;
	text-transform:uppercase;
	letter-spacing: 0.10em;
	color:#fff;
	padding: 7px 10px 4px 10px;
	border-radius: 5px;
	background-color:#2484C6;
	border-top: 1px solid #90f2da;
	border-right:1px solid #00a97f;
	border-bottom:1px solid #008765;
	border-left: 1px solid #7dd2bd;
	box-shadow: 2px 1px 2px #ccc;
	margin:10px 5px 10px 5px;
	display:block;}

.column-options a.buttonlink:hover {
	position:relative;
	top:1px;
	left:1px;
	background-color:#00CCFF;
	border-top: 1px solid #9aebff;
	border-right:1px solid #08acd5;
	border-bottom:1px solid #07a1c8;
	border-left: 1px solid #92def1;
	box-shadow: -1px -1px 2px #ccc;}

.btnnor {
	font-size: 90%;
	text-shadow: none;
	text-decoration: none;
	text-shadow: -1px -1px 1px #72aebd;
	text-transform:uppercase;
	color:#fff;
	padding:6px 10px 6px 10px;
	border-radius: 5px;
	background-color:#2484C6;
	border-top: 1px solid #2484C6;
	border-right:1px solid #2484C6;
	border-bottom:1px solid #2484C6;
	border-left: 1px solid #2484C6;
	box-shadow: 2px 1px 2px #2484C6;
	margin:10px 5px 10px 5px;}

.ani:hover {
	position:relative;
	top:1px;
	left:1px;
	background-color:#00CCFF;
	border-top: 1px solid #9aebff;
	border-right:1px solid #08acd5;
	border-bottom:1px solid #07a1c8;
	border-left: 1px solid #92def1;
	box-shadow: -1px -1px 2px #ccc;}

.txtbox
{
width: 200px;
height: 29px;
border-radius: 3px;
border: 1px solid #CCC;
padding: 6px;
font-weight: 200;
font-size: 11px;
font-family: Verdana;
box-shadow: 1px 1px 5px #CCC;
}
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="loading" style="display:none"></div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3"style="display: none;">
                <div class="row" style="padding: 20px">
                  <%--  <div class="col-md-4 MenuCards" tabindex="1" id="TeamMenu" onclick="OnTeammenuClick()">
                        <h3>Teams</h3>
                        <p>Get Teams Data</p>
                        <br />
                        <div class="Menuicon">
                            <i class="fa fa-line-chart fa-3x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-md-2"></div>--%>
                    <div class="col-md-4 MenuCards" tabindex="2" id="BrickMenu" onclick="OnBrickmenuClick()">
                        <h3>Bricks</h3>
                        <p>Get Bricks Data</p>
                        <br />
                        <div class="Menuicon">
                            <i class="fa fa-line-chart fa-3x" aria-hidden="true"></i>
                        </div>
                    </div>
                    
                </div>

                <div class="row" style="padding: 20px">
                </div>
                <br />

            </div>
            <div class="col-lg-9" style="padding-top: 10px">
                <table border="0" width="100%" cellpadding="0"  cellspacing="0" id="content-table"
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
                                <table border="0" width="100%"  cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td valign="top">
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold; margin-bottom: 10px">
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
                                                        </div>
                                                    </th>
                                                    <th valign="top" id="col6">
                                                        <div class="divcol">
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>

                                                    <th valign="top" id="col11">
                                                        <select id="ddl1" name="ddl1" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                    <th valign="top" id="col22">
                                                        <select id="ddl2" name="ddl2" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                    <th valign="top" id="col33">
                                                        <select id="ddl3" name="ddl3" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                    <th valign="top" id="col44">
                                                        <select id="ddl4" name="ddl4" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                    <th valign="top" id="col55">
                                                        <select id="ddl5" name="ddl5" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                    <th valign="top" id="col66">
                                                        <select id="ddl6" name="ddl6" class="styledselect_form_1 txtbox">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </th>
                                                </tr>
                                            </table>
                                            <table border="0" cellpadding="10" cellspacing="0" id="id-" style="font-weight: bold;margin-bottom:1%">
                                                <tr>
                                                    <th>Filter By Year - Month :
                                                    </th>
                                                    <th id="filtertext"> Distributors :
                                                    </th>
                                                     <th > Bricks :
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th >
                                                        <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                            CssClass="txtbox" />
                                                        <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                            TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                        <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                            OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                            TargetControlID="txtDate">
                                                        </asp:CalendarExtender>

                                                    </th>

                                                    <th id="">
                                                         <select id="ddldistrib" class="styledselect_form_1 txtbox" style="float:right;width:200px" > 
                                                                <option value="-1">Select Distributors First</option>
                                                            </select>
                                                        </th>
                                                    <th id="filterBrick"> 
                                                             <select class="styledselect_form_1 txtbox" id="ddlBricks">
                                                                  <option value="-1">Please Select Brick</option>
                                                              </select>
                                                     
                                                    </th>
                                                    <%-- <td>
                                                <input type="button" id="btnResult" name="ShowResult" value="Show Result" onclick="OnshowResultClick()" />
                                            </td>--%>
                                                </tr>

                                                    <%-- <td>
                                                <input type="button" id="btnResult" name="ShowResult" value="Show Result" onclick="OnshowResultClick()" />
                                            </td>--%>

                                            </table>
                                            <table style="padding:10px; width:100%">
                                                <tr>
                                                    <td>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="button" id="btnsubmitdata" onclick="getnewdata()" style="display:none" class="btnnor ani" value=" Submit Data" />
                                                                <input type="button" id="btnsubmitbrickdata" onclick="GetAlldata();" class="btnnor ani" value=" Submit " />
                                                                <%--getnewbrickdata()--%>
                                                                <%--<input type="button" id="btnsubmitdistributordata" onclick="getnewdata()" style="display:none" class="btnnor ani" value=" Submit Data" />--%>
                                                            </div>
                                                        </div>

                                                  
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
            </div>
        </div>
        <div class="row" id="chartssection">
            <div id="teamdetailschart"></div>
 

            <div id="productsalescharts"></div>
             <div id="distributorbricksalescharts"></div>
     
        </div>
    </div>
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
</asp:Content>
