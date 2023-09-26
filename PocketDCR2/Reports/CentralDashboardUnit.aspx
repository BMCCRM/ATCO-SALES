<%@ Page Title="Central Dashboard (Unit)" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="CentralDashboardUnit.aspx.cs" Inherits="PocketDCR2.Reports.CentralDashboardUnit" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />

    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />

    <link href="../assets/Overview/css/bootstrap.min.css" rel="stylesheet">
    <link href="../assets/Overview/css/style.css" rel="stylesheet">
    <link href="../assets/Overview/css/animate.css" rel="stylesheet">
    <link href="../assets/circliful/css/jquery.circliful.css" rel="stylesheet" />

    <link href="../assets/Overview/css/BootSideMenu.css" rel="stylesheet" />
    <link href="../assets/Overview/css/style.css" rel="stylesheet">
    <link href="../assets/Overview/SimsListCheckbox/simsCheckbox.css" rel="stylesheet" />
    <link href="../assets/Overview/BootsrtrapDateTime/css/bootstrap-datepicker.css" rel="stylesheet" />


    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>

    <script src="../assets/Overview/js/vendor/highcharts.js"></script>
    <script src="../assets/Overview/js/moment.js"></script>
    <script src="../assets/Overview/BootsrtrapDateTime/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/Overview/js/BootSideMenu.js"></script>
    <script src="../assets/Overview/SimsListCheckbox/simsCheckbox.js"></script>

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/circliful/js/jquery.circliful.js"></script>
    <script src="../assets/js/justgage.js"></script>
    <script src="../assets/js/raphael-2.1.4.min.js"></script>
    <script src="CentralDashboardUnit.js"></script>


    <style>

        .display-none {
        

            display:none !important;
        }


        .bottomMainNav {
            background-color: aliceblue;
            border-top-style: solid !important;
            border: 3px;
            border-color: #1278a7;
        }

        .bottomHeading {
            margin-left: 30px;
        }


            .bottomHeading > h4 {
                font-weight: 600;
                color: #1f66a1;
            }

        .maxHeight {
            height: 100%;
        }

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
            margin-top: 30px;
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
            left: 0 !important;
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


        .color-aliceBlue {
            background-color: aliceblue !important;
        }

        body {
            overflow-y: scroll !important;
        }


        .circleMeUp { float:left; }
        



    </style>

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="stickyFilter" style="display: none">
        <a href="javascript:void(0)">Filter Area</a>
    </div>

    <div style="display: none">

        <%-- Do Not Remove Line Below, Including Hidden Hierarchy Snippet If Needed Ever --Arsal --%>

        <!--#include file="../assets/Resources/BootstrapedHierarchyMarkup.inc"-->
        <%--  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  --%>
    
    
    </div>

    <div class="content_outer">
        <div class="container-fluid">
            <hr />
            <div class="tab-content" id="divChartsTabsContainer">

                <div class="tab-pane active" id="divTabMainScreen">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well" style="background-color: #81d4fa;">
                                <div class="row">
                                    <div class="col-lg-12" id="divCardTop">

                                        <div class="col-lg-3 col-md-6">
                                            <div class="overlay" style="background-color: #81d4fa"></div>

                                            

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="media">

                                                        <label>Today Sales</label>

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
                                                            Sales Day Before: 
                                                                    <span id="lblSalesBefore"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />

                                            <div class="row">
                                                <div class="col-md-12">
                                                    Today's Sales VS Yesterday
                                                            <div class="barwrapp">
                                                                <div class="progress">
                                                                    <div class="progress-bar progress-bar-striped progress-bar-success" role="progressbar" id="divProgressSalesToday" style="width: 95%">
                                                                        <span class="sr-only">45% Complete</span>
                                                                    </div>
                                                                </div>
                                                                <div id="divProgressSalesYesterday" data-toggle="tooltip" style="width: 8px; height: 20px; position: absolute; background: Yellow; top: 0; right: 40%;" title="Yesterday Sales"></div>
                                                                <div id="divProgressSalesTargetAvg" data-toggle="tooltip" style="width: 8px; height: 20px; position: absolute; background: red; top: 0; right: 50%;" title="Average Target Today"></div>

                                                            </div>
                                                </div>

                                            </div>

                                            <hr />
                                            <div class="row">
                                                <div class="col-md-12">

                                                    MTD Sales: <span id="lblTargetAchieved"></span>
                                                   
                                                       
                                                                <div class="progress">
                                                                    <div class="progress-bar progress-bar-striped progress-bar-success" id="divProgressSalesMTDTarget" role="progressbar" style="width: 5%">
                                                                        <span class="sr-only">45% Complete</span>
                                                                    </div>
                                                                </div>
                                                   Target Achieved: <span id="lblTargetAchievedPercent"></span>% <br />
                                                       Month Target: <span id="lblTargetTotal"></span>
                                                </div>


                                            </div>

                                            <hr />
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="MTDInputDate" class="input-group date" style="z-index: 0;">
                                                        <input type="text" onchange="reloadGraphs('0', 'MTDCharts')" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                                                    </div>
                                                    View Data For Month (Will Impact On Current Overview And MTD Sales Summary)
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
                                                                                <h3 class="media-heading text-left" id="lblDailyTopTeam">Top Team</h3>
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
                                                                                <h3 class="media-heading text-left" id="lblDailyTopProduct">Top Product</h3>
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
                                                                                City With Most Sales(Today). 
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
                                                                                Distributor With Most Sales(Today)
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
                                                                                <h3 class="media-heading text-left" id="lblMonthlyTopTeam">Top Team</h3>
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
                                                                                <h3 class="media-heading text-left" id="lblMonthlyTopProduct">Top Product</h3>
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
                                                                                <h3 class="media-heading text-left" id="lblMonthlyTopCity">Top City</h3>
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

                </div>

                
                <div class="tab-pane" id="divTabYTDMainScreen">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="well" style="background-color: #81d4fa;">
                                <div class="row">
                                    <div class="col-lg-12" id="divYTDCardTop">


                                        <div class="col-lg-12 col-md-12">
                                            <div class="overlay" style="background-color: #81d4fa">
                                                <div class="loader"></div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="divChartYTDSales"></div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                
                <div class="tab-pane" id="divTabMTDSalesScreen">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column2" style="min-height: 300px">

                            <div class="col-lg-8 col-md-12 chart-container">
                                <div class="chart-div">
                                    <div class="overlay">
                                        <div class="loader"></div>
                                    </div>

                                    <div id="divChartMTDSalesRunRate" class="chart-holder">
                                    </div>

                                </div>
                                <!--chart div ends-->
                            </div>
                         <%--   <div class="col-lg-4 col-md-12 chart-container">
                                <div class="chart-div">
                                    <div class="overlay">
                                        <div class="loader"></div>
                                    </div>
                                    <div id="divChartGrandTotalMTDRunRate" class="chart-holder"></div>
                                </div>
                            </div>--%>
                            <div class="col-lg-4 col-md-12 chart-container">
                                <div class="chart-div">
                                    <div class="overlay">
                                        <div class="loader"></div>
                                    </div>
                                    <div id="divChartGroupExpetedSalesTotal" class="chart-holder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="divTabSalesWiseData">

                    <div class="col-lg-12">
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
                    <div class="col-lg-3" style="display: none">

                        <h3 class="header text-center">Sales Details</h3>

                        <hr />
                        <div class="row">
                            <div class="media">
                                <div class="media-left">
                                    <span style="font-size: 3em; color: #81d4fa;">
                                        <i class="fa fa-bar-chart-o"></i>
                                    </span>
                                </div>

                                <div class="media-body">
                                    <h3 class="media-heading text-left" id="lblDailyTopTeamExtra">NSM-Noble A</h3>
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
                                    <h3 class="media-heading text-left" id="lblDailyTopProductExtra">Sofvasc-V 5/80</h3>
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
                                    <h3 class="media-heading text-left" id="lblDailyTopCityExtra">ABBOTABAD</h3>
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
                                    <h3 class="media-heading text-left" id="lblDailyTopDistributorExtra">General Distributors Plus</h3>
                                    Cras sit amet nibh libero, 
                                                                           
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div class="tab-pane" id="divTabBrandWiseData">
                   
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column3">


                            <div class="col-lg-6 col-md-12 chart-container">

                                <div class="chart-div">

                                    <div class="overlay">
                                        <div class="loader"></div>
                                    </div>
                                    <div id="divProductRangeValue" class="chart-holder"></div>

                                </div>
                                <!--chart div ends-->
                            </div>


                            <div class="col-lg-6 col-md-12 chart-container">
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

                     <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-column2">

                            <div class="col-lg-6 col-md-12 chart-container">
                                <div class="chart-div">

                                    <div class="overlay">
                                        <div class="loader"></div>
                                    </div>
                                    <div id="divTopProductSKU" class="chart-holder"></div>

                                </div>
                                <!--chart div ends-->
                            </div>


                            <div class="col-lg-6 col-md-12 chart-container">
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
                    <hr />
                    <hr />
                </div>

                <div class="tab-pane" id="divTabDistrictWise">
                    <div class="row">
                        <div class="col-md-12">

                            <div class="row">

                                <div class="col-lg-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartDistrictWiseSales" class="chart-holder"></div>
                                    </div>
                                </div>

                            </div>

                            <hr class="strp" />
                            <div class="row">

                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartTopSalesDistrictsFirst" class="chart-holder"></div>

                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartTopSalesDistrictsSecond" class="chart-holder"></div>
                                    </div>
                                    <!--chart div ends-->
                                </div>


                            </div>

                            <hr class="strp" />
                            <div class="row">
                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartBottomSalesDistrictsFirst" class="chart-holder"></div>

                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartBottomSalesDistrictsSecond" class="chart-holder"></div>
                                    </div>
                                    <!--chart div ends-->
                                </div>

                            </div>

                            <hr />
                            <hr />
                            <hr />

                        </div>
                    </div>
                </div>
                
                <div class="tab-pane" id="divTabDistributorWise">
                    <div class="row">
                        <div class="col-md-12">

                            <div class="row">

                                <div class="col-lg-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartDistributorWiseSales" class="chart-holder"></div>
                                    </div>
                                </div>

                            </div>

                            
                          <%--  <div class="row">

                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartTopSalesDistrictsFirst" class="chart-holder"></div>

                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartTopSalesDistrictsSecond" class="chart-holder"></div>
                                    </div>
                                    <!--chart div ends-->
                                </div>


                            </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartBottomSalesDistrictsFirst" class="chart-holder"></div>

                                    </div>
                                    <!--chart div ends-->
                                </div>


                                <div class="col-lg-6 col-md-12 chart-container">
                                    <div class="chart-div">
                                        <div class="overlay">
                                            <div class="loader"></div>
                                        </div>
                                        <div id="divChartBottomSalesDistrictsSecond" class="chart-holder"></div>
                                    </div>
                                    <!--chart div ends-->
                                </div>

                            </div>--%>

                            <hr />
                            <hr />
                            <hr />

                        </div>
                    </div>
                </div>
                                
                <div class="tab-pane" id="divTabChartsSummmary">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                
                                <div class="col-md-5">
                                    <div id="chartRegionalSalesSummary"></div>

                                    

                                    </div>

                                    <div class="col-md-3">

                                        <div id="chartUnknown2" style="width:100%;height:100%"></div>


                                    </div>

                                    <div class="col-md-4 ">

                                        <div id="chartPieRegionSalesContribution"></div>

                                        

                                    </div>

                                    <div class="col-md-12">

                                        <div class="jumbotron" style="text-align: center;" id="percentCollector"></div>

                                    </div>
                                
                                    <hr />

                                </div>



                            <div class="row">

                                <div class="col-md-8">
                                    <table class="table table-striped table-hover">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                            <th>Region</th>
                                            <th>Sales</th>
                                            <th>Target Sales</th>
                                            <th>Achieved Percent</th>
                                            <th>Avg Sales</th>
                                            <th>Avg Target</th>
                                            <th>GOLM</th>
                                            <th>Target Remaining</th>
                                        </tr>
                                      </thead>
                                      <tbody id="tblRegionSalesDataTable">
                                        
                                      </tbody>
                                    </table>


                                </div>
                            </div>               
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                            
                            
                             </div>


                        </div>
                    </div>
                
            </div>

        </div>
        <div class="col-lg-12">
            <ul class="nav nav-tabs navbar-fixed-bottom bottomMainNav">

                <li class="bottomHeading">
                    <h4>Central Dashboard Units</h4>
                </li>
                <%--<li class="pull-right"><a href="#divTabTeamWiseData" data-toggle="tab">Team Wise Data</a></li>--%>
                <li class="pull-right"><a href="javascript:void(0)" data-toggle="tab">&nbsp;</a></li>
                <%--<li class="pull-right active"><a href="#divTabChartsSummmary" data-toggle="tab">Mixed Wise</a></li>--%>
                <%--<li class="pull-right"><a href="#divTabDistributorWise" data-toggle="tab">Distributor Sales Comparison</a></li>--%>
                <li class="pull-right"><a href="#divTabDistrictWise" data-toggle="tab">District Wise</a></li>
                <li class="pull-right"><a href="#divTabBrandWiseData" data-toggle="tab">Brand Wise Data</a></li>
                <li class="pull-right"><a href="#divTabSalesWiseData" data-toggle="tab">Sales Wise Data</a></li>
               <%-- <li class="pull-right"><a href="#divTabYTDMainScreen" data-toggle="tab">YTD  Sales Summary</a></li>--%>
                <li class="pull-right"><a href="#divTabMTDSalesScreen" data-toggle="tab">Month to Date Sales Summary</a></li>
                <li class="pull-right"><a href="#divTabMainScreen" data-toggle="tab">Current Overview</a></li>

            </ul>

        </div>
    </div>



    <div id="divFilterPanel" class="toggled color-aliceBlue">
        <div class="col-lg-12">
            <div class="row">

                <div class="well" style="background-color: #337ab7; padding: 0px !important">
                    <h2 style="color: white">Filter Data </h2>
                
                </div>

                <div class="panel-body">

                 <%--    <div class="row">


                        <div class="col-md-4 maxHeight" >
                           
                            <h3>Uploaded Price </h3>
                            <input id="isUploaded" type="checkbox" checked="checked" onchange="createReport(CurrentFilterRange, true);" />
                        </div>
                         </div>--%>




                    <div class="row">


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>GM </h3>
                            <div id="divSelectLevel1"></div>
                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>BUH </h3>
                            <div id="divSelectLevel2"></div>
                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>National </h3>
                            <div id="divSelectLevel3"></div>
                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Region </h3>
                            <div id="divSelectLevel4"></div>
                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Zone </h3>
                            <div id="divSelectLevel5"></div>
                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Territory </h3>
                            <div id="divSelectLevel6"></div>
                        </div>

                         <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>TM Brick </h3>
                            <div id="divSelectLevel6Brick"></div>
                        </div>

                            <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>TM Pharmacy </h3>
                            <div id="divSelectLevel6Pharmacy"></div>
                        </div>

                    </div>


                    <hr class="strp" />

                    <div class="row">

                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Teams </h3>
                            <div id="divSelectTeams"></div>

                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Brand</h3>
                            <div id="divSelectProducts"></div>

                        </div>


                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>SKU </h3>
                            <div id="divSelectProductSKUs"></div>

                        </div>




                    </div>

                    <hr class="strp" />

                    <div class="row">


                        <div class="col-md-4 maxHeight">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>

                            <h3>City </h3>
                            <div id="divSelectCities"></div>
                        </div>

                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Distributor </h3>
                            <div id="divSelectDistributor"></div>
                        </div>

                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Brick </h3>
                            <div id="divSelectBrick"></div>
                        </div>

                        <div class="col-md-4 maxHeight" style="display: none">
                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Pharmacy </h3>
                            <div id="divSelectPharmacy"></div>
                        </div>





                    </div>


                    <div class="row">

                        <div class="col-md-4 maxHeight" style="display: none">
                            <hr class="strp" />

                            <div class="overlay" style="background-color: #81d4fa">
                                <div class="loader"></div>
                            </div>
                            <h3>Employees </h3>
                            <div id="divSelectEmployees"></div>

                        </div>



                    </div>

                

                </div>

                <hr />
            </div>
        </div>
    </div>

    <div id="divFilterTimePanel" class="toggled">

        <div class="col-lg-12">
            <div class="row">
                <div class="well" style="background-color: #337ab7; padding: 0px !important">
                    <h2 style="color: white">Filter Time Period </h2>
                </div>
                <div class="col-lg-12">
                    <div class="panel with-nav-tabs">
                        <div class="panel-heading">
                            <ul class="nav nav-tabs">
                                <li ><a href="#tabDaily" data-toggle="tab" aria-expanded="false">Daily</a></li>
                                <li class="active"><a href="#tabWeekly" data-toggle="tab" aria-expanded="true">Weekly</a></li>
                                <li><a href="#tabMonthly" data-toggle="tab" aria-expanded="false">Monthly</a></li>
                                <li><a href="#tabYearly" data-toggle="tab" aria-expanded="false">Yearly</a></li>
                                <li><a href="#tabCustom" data-toggle="tab" aria-expanded="false">Custom</a></li>

                            </ul>
                        </div>
                        <div class="panel-body">
                            <div class="tab-content">

                                <div class="tab-pane fade" id="tabDaily">
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
                                <div class="tab-pane fade active in" id="tabWeekly">

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
                                                        <input type="radio" value="MONTHLYPREVIOUSPERIOD" name="rdCompareMonthlyEnd" checked="checked">Previous Month Period</label>
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
                                <div class="tab-pane fade" id="tabYearly">
                                    <div class="row">
                                        <div class="col-md-12">

                                            <div>
                                               
                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" value="YEARLYTHISYEAR" name="rdCompareYearlyStart">This Year</label>
                                                </div>
                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" value="YEARLYLASTYEAR" name="rdCompareYearlyStart">Last Year</label>
                                                </div>

                                                <hr style="width: 80%">

                                                <h6>Compare With: </h6>

                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" value="YEARLYPREVIOUSPERIOD" name="rdCompareYearlyEnd" checked="checked">Previous Period</label>
                                                </div>

                                                <div class="radio">
                                                    <label>
                                                        <input type="radio" value="YEARLYFOURWEEKSAGO" name="rdCompareYearlyEnd">Four Weeks Ago</label>
                                                </div>


                                                <hr style="width: 80%;">
                                                <button type="button" onclick="createReport(FILTER_YEARLY, false)" class="btn btn-primary pull-right">Create Yearly Report</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="tabCustom">

                                    <div class="row">
                                        <div class="col-md-12">

                                            <label class="text-center">First Range</label>
                                            <div class="input-daterange input-group" id="datepicker">
                                                <input id="datePickRangeFirstStart" type="text" class="input-sm form-control" name="start" />
                                                <span class="input-group-addon">to</span>
                                                <input id="datePickRangeFirstEnd" type="text" class="input-sm form-control" name="end" />
                                            </div>

                                            <h5 class="text-center margin-bottom-5">(Compare With)</h5>

                                            <label class="text-center display-none">Second Range</label>
                                            <div class="input-daterange input-group">
                                                <input id="datePickRangeSecondStart" type="text" class="input-sm form-control" name="start" />
                                                <span class="input-group-addon">to</span>
                                                <input id="datePickRangeSecondEnd" type="text" class="input-sm form-control" name="end" />
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

        </div>

    </div>


    <div>
        <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L7" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="L8" runat="server" ClientIDMode="Static" />

    </div>


    <script src="../assets/Overview/js/bootstrap.min.js"></script>

    <script>


        $(document).ready(function () {

            $('#divFilterPanel').BootSideMenu({
                side: "left",
                duration: 200,
                pushBody: true,
                width: '60%'
            });


            $('#divFilterTimePanel').BootSideMenu({
                side: "right",
                pushBody: false,
                duration: 100,
                width: '25%'
            });

            $(".simsList").simsCheckbox(simConfig);


            //$('.overlay').delay(4000).hide();

            $('li > a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var tab = $(this).attr('href'); // Adding Animations To Tab Switching --Arsal
                $(tab).addClass('animated fadeIn faster');
            });


            $('#tabCustom .input-daterange').datepicker({
                format: GLOBAL_DATE_FORMAT_FOR_PICKER,
                autoclose: true
            });
            
            $('#MTDInputDate').datepicker({
                format: GLOBAL_DATE_FORMAT_FOR_PICKER,
                //minViewMode: 1,
                autoclose: true
            });
            
            $('#datePickRangeFirstStart, #datePickRangeFirstEnd, #datePickRangeSecondStart, #datePickRangeSecondEnd, #MTDInputDate')
                .datepicker('setDate', moment(new Date()).format(GLOBAL_DATE_FORMAT));

            
});


            


    </script>

</asp:Content>



      