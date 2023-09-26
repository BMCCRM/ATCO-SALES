<%@ Page Language="C#" Title="Sales Overview Dashboard" AutoEventWireup="true" MasterPageFile="~/MasterPages/Home.Master" CodeBehind="Overview.aspx.cs" Inherits="PocketDCR2.Reports.Overview" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
 

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>


    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />

    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%--<link href="../Styles/bootstrap.css" rel="stylesheet" type="text/css" />--%>


    <!-- Bootstrap -->

    <link href="../assets/Overview/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/Overview/css/style.css" rel="stylesheet">
    <script src="../assets/Overview/js/vendor/highcharts.js"></script>
    <script src="../assets/Overview/js/moment.js"></script>

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="Overview.js"></script>

    <style>
        .chart-container {
            background-color: white;
        }

        .tab-pane {
            width: 100% !important;
        }

        .panel-heading {
            padding: 5px 10px;
        }

        .overflowWarp {
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
        }


        .barwrapp {
            position: relative;
        }



        hr.strp {
            color: grey;
            width: 70%;
            text-align: center;
            margin: 0 auto;
            margin-bottom: 15px;
            border: 0;
            height: 1px;
            background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
            background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        }



        .loader {
            color: white;
            transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            -webkit-animation: spin 2s linear infinite; /* Safari */
            animation: spin 2s linear infinite;
            width: 120px;
            height: 120px;
            margin: 0 auto;
            margin-top: 25%;
            /*display:inline-block;*/
            /*position: relative;
            top: 50%;
            left: 50%;
            font-size: 50px;*/
        }

        /* Safari */
        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .overlay {
            /*display:none;*/
            position: absolute;
            text-align: center;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            z-index: 2;
            /*cursor: wait;*/
        }

        /*div .loader {
            top: 145px;
            left: 155px;
        }*/


        .stickyFilter {
            height: 0px;
            width: 85px;
            position: fixed;
            right: 0 !important;
            top: 50%;
            z-index: 1000;
            transform: rotate(-90deg);
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -o-transform: rotate(-90deg);
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
        }

            .stickyFilter a {
                display: block;
                background: #000;
                height: 52px;
                padding-top: 10px;
                width: 155px;
                text-align: center;
                color: #fff;
                font-family: Arial, sans-serif;
                font-size: 17px;
                font-weight: bold;
                text-decoration: none;
            }

                .stickyFilter a:hover {
                    background: #00495d;
                }
    </style>


</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="pop_box-outer jqmWindow" id="dialog" style="display:none">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="stickyFilter" style="display:none">
        <a href="javascript:void(0)">Filter Area</a>
    </div>


    <div class="content_outer">

        <div class="row">
            <div class="col-lg-12">
                <h1 class="text-center">Sales Overview Dashboard</h1>
                <hr class="strp" />
            </div>
        </div>

        <div id="content">
            <div class="main">
                <div class="wrapper">
                    <div class="container-fluid">



                        <div class="row">
                               
                             <div class="col-md-3"><label>Select City</label>
                                
                                    <select id="ddlCity" class="form-control form-control">
                                        <option value="0">Select City</option>
                                    </select>
                                
                            </div>
                             <div class="col-md-3"><label>Select Distributor</label>
                                
                                    <select id="ddlDistributor" class="form-control form-control">
                                        <option value="0">Select Distributor</option>
                                    </select>
                                
                            </div>
                             <div class="col-md-3"><label>Select Brick</label>
                                
                                    <select id="ddlBrick" class="form-control form-control">
                                        <option value="0">Select Brick</option>
                                    </select>
                                
                            </div>
                   
                            <div class="col-md-3">
                                <label>&nbsp;</label>
                                <div>
                                 <button type="button" class="btn btn-primary" onclick="createReport(FILTER_DAILY, true)">
                                     Update Dashboard
                                      <span style="color: white;">
                                          <i class="fa fa-refresh"></i>
                                      </span> 
                                 </button>
                            </div>

                            </div>
                        </div>

                        <hr />

                        <div class="row">
                            <%--   <div class="overlay" style="display: none">
                                <div class="loader"></div>
                            </div>--%>

                            <div class="col-md-12">
                                <div class="well" style="background-color: #81d4fa">
                                    <div class="row">
                                        <div class="col-lg-12" id="divCardTop">

                                            <div class="col-lg-3 col-md-6">
                                                <div class="overlay" style="background-color: #81d4fa"></div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="media">

                                                            <label>Total Sales Today</label>

                                                            <div class="media-left">
                                                                <span style="font-size: 3em; color: white;">
                                                                    <i class="fa fa-line-chart"></i>
                                                                </span>
                                                            </div>
                                                            <div class="media-body">
                                                                <h2 class="media-heading text-left overflowWarp"><span id="lblSalesToday"></span>
                                                                    <span style="font-size: 1em; color: green;">
                                                                        <i id="iconUpdDown" class="fa  fa-sort-asc"></i>
                                                                    </span>
                                                                </h2>
                                                                Yesterday Sales: 
                                                                <span id="lblSalesBefore"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        Total Sales Done Against Yesterday
                                                        <div class="barwrapp">
                                                            <div class="progress">
                                                                <div class="progress-bar progress-bar-striped progress-bar-success" role="progressbar" id="divProgressSalesToday" style="width: 95%">
                                                                    <span class="sr-only">45% Complete</span>
                                                                </div>
                                                            </div>
                                                            <div id="divProgressSalesYesterday" data-toggle="tooltip"  style="width: 8px; height: 20px; position: absolute; background: Yellow; top: 0; right: 40%;" title="Yesterday Sales"></div>
                                                            <div id="divProgressSalesTargetAvg" data-toggle="tooltip"  style="width: 8px; height: 20px; position: absolute; background: red; top: 0; right: 50%;" title="Average Target Today"></div>

                                                        </div>
                                                    </div>

                                                </div>

                                                <hr />
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        MTD Target Achieved: <span id="lblTargetAchievedPercent"></span>%
                                                       
                                                            <div class="progress">
                                                                <div class="progress-bar progress-bar-striped progress-bar-success" id="divProgressSalesMTDTarget" role="progressbar" style="width: 5%">
                                                                    <span class="sr-only">45% Complete</span>
                                                                </div>
                                                            </div>
                                                        <span id="lblTargetAchieved"></span> Achieved Out Of Target <span id="lblTargetTotal"></span>
                                                    </div>


                                                </div>


                                            </div>

                                            <div class="col-lg-6 col-md-6">
                                                <div class="overlay" style="background-color: #81d4fa">
                                                    <div class="loader"></div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div id="divChartMTDSales"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-3 col-md-6">
                                                <div class="overlay" style="background-color: #81d4fa"></div>
                                                <div class="row">
                                                    <div class="col-md-12">

                                                        <div class="panel panel-default" id="togglePanel">
                                                            <div class="panel-heading">
                                                                <div class="btn-group btn-group-xs btn-toggle pull-right">
                                                                    <button class="togglebtnAchieves btn btn-default btn-info " data-toggle="tab" onclick="achieversTabStyler(this)" data-target="#paneTodayAchieves" type="button">Todays</button>
                                                                    <button class="togglebtnAchieves btn btn-default" data-toggle="tab" onclick="achieversTabStyler(this)" data-target="#paneMonthlyAchieves" type="button">Month</button>
                                                                </div>
                                                                <h3 class="panel-title">High Achievers <span style="color: #FFD700;"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></h3>
                                                            </div>
                                                            <div class="panel-body tab-content">
                                                                <div class="tab-pane active" id="paneTodayAchieves">
                                                                    <div class="col-md-12">
                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-bar-chart-o"></i>
                                                                                    </span>
                                                                                </div>

                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblDailyTopTeam">NSM-Elite</h3>
                                                                                    Top Group Today. 
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />

                                                                        <div class="row">

                                                                            <div class="media">


                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-star"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblDailyTopProduct">Lice O Nil Cream</h3>
                                                                                    Top Sold Product. 
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />

                                                                        <div class="row">
                                                                            <div class="media">

                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-mortar-board"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblDailyTopCity">Top City Name</h3>
                                                                                    tempus viverra turpis. 
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <hr />

                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-area-chart"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblDailyTopDistributor">Top Distributor</h3>
                                                                                    Cras sit amet nibh libero, 
                                                                                </div>

                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane" id="paneMonthlyAchieves">

                                                                    <div class="col-md-12">
                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-bar-chart-o"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblMonthlyTopTeam">NSM-Elite</h3>
                                                                                    Top Group For Current Month. 
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />

                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-star"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblMonthlyTopProduct">Lice O Nil Cream</h3>
                                                                                    Most Sold Product In Current Month. 
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />

                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-mortar-board"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblMonthlyTopCity">Karachi</h3>
                                                                                    City With Most Sales . 
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />


                                                                        <div class="row">
                                                                            <div class="media">
                                                                                <div class="media-left">
                                                                                    <span style="font-size: 3em; color: #81d4fa;">
                                                                                        <i class="fa fa-area-chart"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="media-body">
                                                                                    <h3 class="media-heading text-left" id="lblMonthlyTopDistributor">Top Distributor</h3>
                                                                                    Distributor With Most Sales 
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <hr />
                        <!--- AHMER NEW -->
                        <div class="row">
                            <div class="col-lg-12">
                                <h3 class="text-center">Month To Date Sales Summary</h3>
                                <hr class="strp" />
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column2" style="min-height: 300px">

                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>

                                        <div id="divChartMTDSalesRunRate" class="chart-holder">
                                        </div>

                                    </div>
                                    <!--chart div ends-->
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartGrandTotalMTDRunRate" class="chart-holder"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartGroupExpetedSalesTotal" class="chart-holder"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div class="row" style="display: none">
                            <div class="col-md-4" id="col1">
                                <div class="divcol">
                                    <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col11">
                                    <select id="ddl1" name="ddl1" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-md-4" id="col2">
                                <div class="divcol">
                                    <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col22">
                                    <select id="ddl2" name="ddl2" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" id="col3">
                                <div class="divcol">
                                    <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col33">
                                    <select id="ddl3" name="ddl3" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" id="col4">
                                <div class="divcol">
                                    <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col44">
                                    <select id="ddl4" name="ddl4" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-md-4" id="col5">
                                <div class="divcol">
                                    <asp:Label ID="Label5" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col55">
                                    <select id="ddl5" name="ddl5" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" id="col6">
                                <div class="divcol">
                                    <asp:Label ID="Label6" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                </div>
                                <div id="col66">
                                    <select id="ddl6" name="ddl6" class="form-control form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div style="display: none">
                                <div class="col-md-4">
                                    <div class="divcol">
                                        <div>Filter By </div>
                                    </div>

                                    <select id="ddlFilterType" class="form-control form-control">
                                        <option value="1">Daily</option>
                                        <option value="2">Monthly</option>
                                        <option value="2">Yearly</option>
                                    </select>

                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="content-table-inner">
                                            <table border="0">
                                                <tr>
                                                    <td>
                                                        <!-- start id-form -->
                                                        <table border="0" id="id-fo" style="font-weight: bold">

                                                            <tr>
                                                            </tr>
                                                        </table>
                                                        <table border="0" style="font-weight: bold">
                                                            <tr>
                                                                <td>
                                                                    <div class="tit-box-hr">Filter By Year - Month :</div>
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

                                                                    <asp:TextBox ID="txtenddate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                                        CssClass="inp-form" />
                                                                    <asp:TextBoxWatermarkExtender ID="TextBoxWatermarkExtender1" runat="server" ClientIDMode="Static"
                                                                        TargetControlID="txtenddate" WatermarkText="Enter Year - Month" />
                                                                    <asp:CalendarExtender ID="CalendarExtender1" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden2"
                                                                        OnClientShown="onCalendarShown2" BehaviorID="calendar" Enabled="True" Format="MMMM-yyyy"
                                                                        TargetControlID="txtenddate">
                                                                    </asp:CalendarExtender>
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

                                    </div>
                                </div>
                            </div>




                            <div class="col-lg-12">
                                <h3 class="text-center">Graph On Daily Records According To Selected Time Range</h3>
                                <hr class="strp" />
                            </div>


                            <div class="col-lg-9 col-md-12 col-sm-3 col-xs-3 ">
                                <div class="overlay">
                                    <div class="loader"></div>
                                </div>
                                <div class="chart-wrapper">
                                    <div class="chart-container">
                                        <div class="chart-div">
                                            <div id="divSalesGraph" class="chart-holder"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 sidebar-column ">
                                <div class="panel with-nav-tabs">
                                    <div class="panel-heading">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="#tabDaily" data-toggle="tab" aria-expanded="true">Daily</a></li>
                                            <li><a href="#tabWeekly" data-toggle="tab" aria-expanded="false">Weekly</a></li>
                                            <li><a href="#tabMonthly" data-toggle="tab" aria-expanded="false">Monthly</a></li>
                                            <li><a href="#tabCustom" data-toggle="tab" aria-expanded="false">Custom</a></li>

                                        </ul>
                                    </div>
                                    <div class="panel-body">
                                        <div class="tab-content">
                                            <div class="tab-pane fade active in" id="tabDaily">
                                                <div class="row">
                                                    <div class="col-md-12">

                                                        <div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYTODAY" name="rdCompareDailyStart" checked="checked">Today</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYYESTERDAY" name="rdCompareDailyStart">Yesterday</label>
                                                            </div>

                                                            <hr style="width: 80%">

                                                            <h6>Compare With: </h6>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYPREVIOUSDAY" name="rdCompareDailyEnd" checked="checked">Previous Day</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYSAMEDAYLASTWEEK" name="rdCompareDailyEnd">Same day Last Week</label>
                                                            </div>
                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYSAMEDATELASTYEAR" name="rdCompareDailyEnd">Same Date Last Year</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="DAILYSAMEDAYOFLASTYEAR" name="rdCompareDailyEnd">Same Day Of Week Last Year</label>
                                                            </div>

                                                            <hr style="width: 80%;">
                                                            <button type="button" onclick="createReport(FILTER_DAILY, false)" class="btn btn-primary pull-right">Create Daily Report</button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div class="tab-pane fade" id="tabWeekly">

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="WEEKLYLAST7DAYS" name="rdCompareWeeklyStart" checked="checked">Last 7 Days</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="WEEKLYTHISWEEK" name="rdCompareWeeklyStart">This Week</label>
                                                            </div>
                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="WEEKLYLASTWEEK" name="rdCompareWeeklyStart">Last Week</label>
                                                            </div>

                                                            <hr style="width: 80%">

                                                            <h6>Compare With: </h6>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="WEEKLYPREVIOUSWEEK" name="rdCompareWeeklyEnd" checked="checked">Previous Week</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="WEEKLYFOURWEEKSAGO" name="rdCompareWeeklyEnd">Four Weeks Ago</label>
                                                            </div>

                                                            <hr style="width: 80%;">
                                                            <button type="button" onclick="createReport(FILTER_WEEKLY, false)" class="btn btn-primary pull-right">Create Weekly Report</button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="tab-pane fade" id="tabMonthly">
                                                <div class="row">
                                                    <div class="col-md-12">

                                                        <div>
                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLYLAST30DAYS" name="rdCompareMonthlyStart" checked="checked">Last 30 Days</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLYTHISMONTH" name="rdCompareMonthlyStart">This Month</label>
                                                            </div>
                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLYLASTMONTH" name="rdCompareMonthlyStart">Last Month</label>
                                                            </div>

                                                            <hr style="width: 80%">

                                                            <h6>Compare With: </h6>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLYPREVIOUSPERIOD" name="rdCompareMonthlyEnd" checked="checked">Previous Period</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLYFOURWEEKSAGO" name="rdCompareMonthlyEnd">Four Weeks Ago</label>
                                                            </div>

                                                            <%--<div class="radio"> // Hiding As Calculation Is Ambigious 
                                                                <label>
                                                                    <input type="radio" value="MONTHLYPREVIOUSYEARWEEK" name="rdCompareMonthlyEnd">Previous Year</label>
                                                            </div>--%>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="MONTHLY52WEEKSAGO" name="rdCompareMonthlyEnd">52 Weeks Ago</label>
                                                            </div>

                                                            <hr style="width: 80%;">
                                                            <button type="button" onclick="createReport(FILTER_MONTHLY, false)" class="btn btn-primary pull-right">Create Monthly Report</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div class="tab-pane fade" id="tabCustom">

                                                <div class="row">
                                                    <div class="col-md-12">

                                                        <div>
                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="" name="rdCompareCustomEnd" checked="checked">Previous Week</label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input type="radio" value="" name="rdCompareCustomEnd">Four Weeks Ago</label>
                                                            </div>

                                                            <hr style="width: 80%;">
                                                            <button type="button" onclick="createReport(FILTER_CUSTOM, false)" class="btn btn-primary pull-right">Create Custom Range Report</button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--chart-wrapper end-->
                        </div>

                        <hr />

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column3">


                                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 chart-container">

                                    <div class="chart-div">

                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divProductRangeValue" class="chart-holder"></div>

                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">

                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divProductRangeUnit" class="chart-holder"></div>


                                    </div>
                                    <!--chart div ends-->
                                </div>







                            </div>
                            <!---  -->
                        </div>

                        <hr />

                        <div class="row">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column2">


                                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">

                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divTopProductSKU" class="chart-holder"></div>


                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-3 chart-container">
                                    <div class="chart-div">

                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divProductSKUUnit" class="chart-holder"></div>


                                    </div>
                                    <!--chart div ends-->
                                </div>



                            </div>

                        </div>

                        <hr />


                    </div>



                </div>


            </div>
        </div>
    </div>


    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L7" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L8" runat="server" ClientIDMode="Static" />


    <%--<script src="../assetrview/js/jquery-3.3.1.min.js"></script>--%>
    <script src="../assets/Overview/js/bootstrap.min.js"></script>

</asp:Content>
      