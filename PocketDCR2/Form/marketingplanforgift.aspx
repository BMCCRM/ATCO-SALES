<%@ Page Title="Gift Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="marketingplanforgift.aspx.cs" Inherits="PocketDCR2.Form.marketingplanforgift1" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
 
 <%--<script src="markiting_sample.js" type="text/javascript"></script>--%>
     <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
 <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts-more.js" type="text/javascript"></script>
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
      <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <link href="../Scripts/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
     <script src="marketingplanforgift.js" type="text/javascript"></script>
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
          /* #03429A*/
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
	background-color: #03429A;
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
	background-color:#03429A;
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
	background-color: #03429A; /*#00CCFF;*/
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
	background-color:#03429A;
	border-top: 1px solid #03429A;
	border-right:1px solid #03429A;
	border-bottom:1px solid #03429A;
	border-left: 1px solid #03429A;
	box-shadow: 2px 1px 2px #03429A;
	margin:10px 5px 10px 5px;}

.ani:hover {
	position:relative;
	top:1px;
	left:1px;
	background-color:#03429A; /*#00CCFF;*/
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
      <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
<div id="content">
        <div class="page_heading">
            <h1 style="
    margin-top: 10px;
">
                Marketing Plan for Gifts :&nbsp;&nbsp;&nbsp;
                <asp:Label ID="Labq"  ClientIDMode="Static" runat="server"  ></asp:Label></h1>
           <%-- <label id="Labq" for="date" />--%>

        </div>
        <div class="divgrid">
               <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                <tr>
                                    <th>
                                        <asp:Label ID="Label5" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label6" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label7" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label8" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                </tr>
                                <tr>
                                    <th valign="top" id="g1">
                                        <select id="dG1" name="dG1" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g2">
                                        <select id="dG2" name="dG2" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g3">
                                        <select id="dG3" name="dG3" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g4">
                                        <select id="dG4" name="dG4" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>
                   <tr>
                        <th>
                                        <asp:Label ID="Labeldate" name="Labeldate" ClientIDMode="Static" runat="server">Filter By Year - Month :</asp:Label>
                                    </th>
                   </tr>
                   <tr>
                        <th valign="top" id="g5">
                                      <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form txtbox" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtDate">
                                                </asp:CalendarExtender>
                                    </th>
                         <th valign="top" id="g6" ">
                             <input type='button' id='btnSearch' value=' Search '  class="btnnor ani"  />&nbsp;&nbsp;&nbsp;
                           <%--  <input type='button' id='btnSetbalance' value=' Set balance ' class="btnnor ani"   />--%>
                             </th>

                         
                   </tr>
                            </table>
        
           
          
            <input type="hidden" id="date1"  />
             <input type="hidden" id="date2"  />
          
        </div>
     <div class="inner-left">
                            <div id="gridgift">
                                </div>
                               </div> 
        <asp:Label ID="labmsg" runat="server" Text=""></asp:Label>
    </div>
</asp:Content>
