<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MobileDashboard.aspx.cs" Inherits="PocketDCR2.Reports.MobileDashboard" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Src="~/UserControls/mobileMenu.ascx" TagName="MenuControl" TagPrefix="uc1" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>Pharma::Dashboard</title>
    <link rel="shortcut icon" href="../assets/img/favicon.png" />

    <meta name="description" content="">
    <link href="../assets/css/preload.css" rel="stylesheet">
    <link href="../assets/css/vendors.css" rel="stylesheet">
    <link href="../assets/css/syntaxhighlighter/shCore.css" rel="stylesheet">
    <link href="../assets/css/style-blue.css" rel="stylesheet" title="default">
    <link href="../assets/css/width-full.css" rel="stylesheet" title="default">

    <script src="../Scripts/jquery-2.1.4.js"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts.js" type="text/javascript"></script>
    <script src="../Scripts/Charts/highcharts-more.js" type="text/javascript"></script>
    <script src="MobileDashboard.js" type="text/javascript"></script>
    <style>
        #h1callperday {
            font-size: 60px;
            font-family: 'Times New Roman';
            color: #00FE00;
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
            color: #FD6534;
            text-align: center;
            padding-top: 40px;
        }

        #pdaysinfieldText {
            font-family: 'Times New Roman';
            text-align: center;
        }

        select {
            width: 100%;
            margin-bottom: 10px;
        }
        #calendar1_today{
            padding-top: 0px !important;
            background-color: #fff;
            width: 100%;
        }
        #calendar1_body{
            width: 100%;
        }
        /*#txtDate {
            margin-top:50px !important;
            z-index:1000 !important;
        }*/
    </style>
</head>
<body>
   
    <form id="form1" runat="server">
           <asp:ScriptManager runat="server"></asp:ScriptManager>
            <div id="sb-site">
                <div class="boxed">
                    <header id="header-full-top" class="hidden-xs header-full">
                        <div class="container">
                            <div class="header-full-title">
                                <h1 class="animated fadeInRight"><a href="index-2.html">Pharma <span>CRM</span></a></h1>
                                <p class="animated fadeInRight">Building a world-class IT Solution for a world-class Healthcare company</p>
                            </div>
                        </div>
                        <!-- container -->
                    </header>
                    <!-- header-full -->
                    <nav class="navbar navbar-default navbar-header-full navbar-dark yamm navbar-static-top" role="navigation" id="header">
                        <div class="container">
                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span class="sr-only"></span>
                                    <i class="fa fa-bars"></i>
                                </button>
                                <a id="ar-brand" class="navbar-brand hidden-lg hidden-md hidden-sm" href="index-2.html">Pharma <span>CRM</span></a>
                            </div>
                            <!-- navbar-header -->

                            <!-- Collect the nav links, forms, and other content for toggling -->

                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <uc1:MenuControl ID="MenuControl1" runat="server" />
                                <!--<ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">Pages</a>
                     <ul class="dropdown-menu dropdown-menu-left">
                        <li class="dropdown-submenu">
                                <a href="javascript:void(0);" class="has_children">About us &amp; Team</a>
                                <ul class="dropdown-menu dropdown-menu-left">
                                <li><a href="page_about.html">About us Option 1</a></li>
                                <li><a href="page_about2.html">About us Option 2</a></li>
                                <li><a href="page_about3.html">About us &amp; Team</a></li>
                                <li class="divider"></li>                                        
                                <li><a href="page_team.html">Our Team Option 1</a></li>
                                <li><a href="page_team2.html">Our Team Option 2</a></li>
                            </ul>
                        </li>
                    </li>
                </ul>-->

                            </div>
                            <!-- navbar-collapse -->
                        </div>
                        <!-- container -->
                    </nav>

                    <section class="carousel-section">
                        <div id="carousel-example-generic" class="carousel carousel-razon slide" data-ride="carousel" data-interval="5000">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                            </ol>



                            <!-- Controls -->
                            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </section>
                    <!-- carousel -->

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title"></h4>

                                        <div class="col-md-3 col-sm-6" id="col11">
                                            <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                            <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>

                                        </div>
                                        <div class="col-md-3 col-sm-6" id="col22">
                                            <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                            <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 col-sm-6" id="col33">
                                            <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                            <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 col-sm-6" id="col44">
                                            <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                            <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 col-sm-6" id="col55">
                                            <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 col-sm-6" id="col66">
                                            <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                <option value="-1">Select...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 col-sm-6" style="height:220px;">
                                            <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                CssClass="inp-form"/>
                                            <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                            <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                TargetControlID="txtDate">
                                            </asp:CalendarExtender>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-12">

                                        <h4 class="content-box-title">Estimate Working Days VS Field Working Days
                       
                                        </h4>
                                        <div id="container2"></div>
                                        <div class="loding_box_outer">
                                            <div class="loading">
                                            </div>
                                            <div class="clear"></div>

                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">

                                        <h4 class="content-box-title">Productive Frequency By Classification&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        </h4>

                                        <div id="prodfre"></div>

                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-16">
                                        <h4 class="content-box-title">Customer Coverage According to Classification %
                                        </h4>
                                        <div id="customerCov"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-10">
                                        <h4 class="content-box-title">Days in field % and Call per day</h4>
                                        <div id="complete">
                                            <h1 id="h1callperday"></h1>
                                            <p id="pcallperdayText"></p>

                                            <h1 id="h1daysinfield"></h1>
                                            <p id="pdaysinfieldText"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">Target Vs Actual Calls (MTD)</h4>
                                        <div id="ContainerPlannedvsAcutalCalls"></div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-16">
                                        <h4 class="content-box-title">Doctor Visit Range Analysis</h4>
                                        <div id="ContainerVisitFrequency"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-10">
                                        <h4 class="content-box-title">Daily Call Trends - Average Calls Per Day</h4>
                                        <div id="ContanerDailyCallTrend"></div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">MTD Average Calls</h4>
                                        <div id="ContainerAverageCalls"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-10">
                                        <h4 class="content-box-title"></h4>

                                        <div id="dailycalldiv"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">TOP 5 MEDICAL REPS</h4>

                                        <div id="top5div"></div>

                                    </div>
                                </div>

                                <div class="col-md-6 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">BOTTOM 5 MEDICAL REPS</h4>

                                        <div id="bottom5div"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">Daily Call Trends - Correct & Incorrect SMS</h4>

                                        <div id="SMSCorrectInCorrect"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="margin-bottom">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-6">
                                    <div class="content-box box-default animated fadeInUp animation-delay-14">
                                        <h4 class="content-box-title">Visits By Speciality</h4>

                                        <div id="specilityChart"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer id="footer">
                        <p>&copy; 2015 <a href="http://www.wwwpharmacrm.com.pk">Pharma CRM</a>, inc. All rights reserved.</p>
                    </footer>

                </div>
                <!-- boxed -->
            </div>
            <!-- sb-site -->

            <div id="back-top">
                <a href="#header"><i class="fa fa-chevron-up"></i></a>
            </div>
            <script src="../assets/js/vendors.js"></script>

            <script src="../assets/js/styleswitcher.js"></script>

            <!-- Syntaxhighlighter -->
            <script src="../assets/js/syntaxhighlighter/shCore.js"></script>
            <script src="../assets/js/syntaxhighlighter/shBrushXml.js"></script>
            <script src="../assets/js/syntaxhighlighter/shBrushJScript.js"></script>

            <script src="../assets/js/app.js"></script>
            <script src="../assets/js/index.js"></script>
            <asp:Label ID="hdnMode" runat="server" Text="" ClientIDMode="Static" />
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
    </form>
</body>
</html>
