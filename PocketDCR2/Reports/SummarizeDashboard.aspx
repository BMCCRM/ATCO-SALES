<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SummarizeDashboard.aspx.cs" Inherits="PocketDCR2.Reports.SummarizeDashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>National Call Dashboard</title>
    <link href="../assets/css/Nbootstrap.min.css" rel="stylesheet" />

    <style>
        .nHeader {
            margin-top: 0;
            background-color: #283e97;
            color: white;
        }

            .nHeader h1 {
                font-size: 55px;
                font-weight: 700;
            }

        #Separator {
            border-bottom: 4px solid #01adef;
            margin-top: -10px;
        }

        .divheader {
            background-color: #283e97;
            color: white;
            border-radius: 13px;
        }

        .card {
            background: #FFF;
            display: block;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            border: 1px solid #AAA;
            border-bottom: 3px solid #BBB;
            padding: 0px;
            overflow: hidden;
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            font-family: 'Roboto', sans-serif;
            -webkit-transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 23px;
        }

        .card-content {
            width: 100%;
            height: 200px;
        }

        .card-header {
            width: 100%;
            color: #2196F3;
            border-bottom: 3px solid #BBB;
            font-family: 'Roboto', sans-serif;
            padding: 0px;
            margin-top: 0px;
            overflow: hidden;
        }

        .card-header-blue {
            background-color: #283e97;
            color: #FFFFFF;
            /*border-bottom: 3px solid #BBB;*/
            font-family: 'Roboto', sans-serif;
            /*padding: 0px;*/
            /*margin-top: 0px;*/
            overflow: hidden;
        }

        .card-heading {
            display: block;
            font-size: 24px;
            line-height: 28px;
            margin-bottom: 24px;
            margin-left: 1em;
            text-align: center;
            border-bottom: 1px #2196F3;
            color: #fff;
        }

        .card-footer {
            border-top: 1px solid #000;
        }

        .ChampionsContent {
            background-color: #cae0ec;
            border-radius: 11px;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .card-body {
            background-color: #fcfdde;
            /*fcfdde fedab8*/
        }

            .card-body p {
                color: red;
                font-size: 18px;
                font-weight: bolder;
                 font-family: Tahoma;
            }

            .card-body span {
                color: red;
                font-size: 18px;
                font-weight: bolder;
                 font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace;
            }

        .clock {
            margin-left: 5%;
        }

        #TAECount {
            background: #283e97 none repeat scroll 0% 0%;
            border-radius: 25px;
            float: none;
            width: auto;
            padding: 5px;
            font-family: Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif;
        }

        .count {
            color: #FFF;
            font-size: 50px;
            font-weight: 700;
        }

        .countReg {
            color: #FFF;
            font-size: 35px;
            font-weight: 900;
            font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace
       
        }

        .countheader {
            color: #fff;
            font-size: 35px;
            font-weight: 400;
        }

        .countheader2 {
            color: #fff;
            font-size: 18px;
            font-weight: 600;
        }

        .allcountdiv {
            width: 100%;
            border: 2px solid #01adef;
            border-radius: 8px;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #81d3f8;
        }

        .regioncount {
            background: #283e97 none repeat scroll 0% 0%;
            border-radius: 25px;
            padding: 6px;
            font-family: Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif;
        }

        .regioncount1 {
            background: #283e97 none repeat scroll 0% 0%;
            border-radius: 25px;
            padding: 6px;
            font-family: Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif;
        }

        .counterdivs {
            padding: 5px;
            border: 3px solid #283e97;
            background-color: #c3e6f9;
            border-radius: 25px;
        }
    </style>
        <script type="text/javascript">

            var limit = "5:00"
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
                        curtime = "Next Refresh in " + curmin + ":" + cursec + " minutes"
                    else
                        curtime = "Next Refresh in " + cursec + " second"
                    window.status = curtime
                    document.getElementById('foo').innerHTML = curtime;
                    setTimeout("beginrefresh()", 1000)
                }
            }
            window.onload = beginrefresh
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="page-header nHeader">
            <div class="row">
                <!--Clock wala work -->
                <div class="col-md-3">
                    <div style="width: 80%; margin: 0 auto">
                        <p id="currentdiv"></p>
                        <div>
                            <div id="myclock" class="clock"></div>
                        </div>
                    </div>
                </div>
                <!--Center Header-->
                <div class="col-md-6" style="margin-top:1%">
                    <h1 style="text-align: center";>National Call Dashboard</h1>
                </div>
                <!--Live Transmission field Image -->
                <div class="col-md-3">
                    <div style="width: 30%; margin: 0 auto; float: right;">
                        <br />
                        <img src="../assets/img/PBG-CRM-Dashboard-Design-live.jpg" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Separator Line  -->
        <div  id="Separator"></div>
        <!-- Now Real Work is going to Start-->
        <div class="container-fluid" style="margin-top:-10px">
            <div class="row">
                <!-- Left Side Work -->
                <div class="col-lg-5">
                    <div>
                        <div class="divheader">
                            <h1 id="lastcalltime" style="text-align: center">Calls reported at 00:00:00</h1>
                        </div>
                        <div class="row">
                            <h5 id="foo" style="float: right;  margin-top: -10px"></h5>
                        </div>

                        <div class="allcountdiv">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-4" style="margin-top: 20%;">
                                        <div>
                                            <div style="padding: 10px; border: 4px solid #283e97; background-color: #c3e6f9; border-radius: 28px;">
                                                <div class="counter-wrapper">
                                                    <div id="TAECount" class="col-md-2 col-centered text-center">
                                                        <span class="countheader">National</span>
                                                        <p style="font-size: 15px; color: white"># of calls Reported</p>
                                                        <span class="count" id="nationalcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <%--<div class="row" style="margin-top:10px">

                                                <div class="col-md-6 col-centered text-center">
                                                    <div class="counterdivs">
                                                        <div class="regioncount">

                                                            <h4 class="countheader2">South</h4>

                                                            <span class="countReg" id="southcount"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                  <div class="col-md-6  col-centered text-center">
                                                    <div class="counterdivs">
                                                        <div class="regioncount">
                                                            <h4 class="countheader2">Central</h4>

                                                            <span class="countReg" id="centralcount"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6  col-centered text-center">
                                                    <div class="counterdivs">
                                                        <div class="regioncount">
                                                            <h4 class="countheader2">North</h4>

                                                            <span class="countReg" id="northcount"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>--%>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-4  col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Karachi</h4>

                                                        <span class="countReg" id="karachicount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4  col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Faisalabad</h4>

                                                        <span class="countReg" id="faisalabadcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4  col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Islamabad</h4>

                                                        <span class="countReg" id="islamabadcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Hyderabad</h4>

                                                        <span class="countReg" id="hyderabadcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Multan</h4>

                                                        <span class="countReg" id="multancount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Peshawar</h4>

                                                        <span class="countReg" id="peshawarcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Sukkur</h4>

                                                        <span class="countReg" id="sukkurcount"></span>
                                                    </div>
                                                </div>
                                            </div>

                                             <div class="col-md-4 col-centered text-center">
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Sialkot</h4>

                                                        <span class="countReg" id="Sialkotcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center" >
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Lahore</h4>

                                                        <span class="countReg" id="lahorecount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center" >
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Gujranwala</h4>

                                                        <span class="countReg" id="Gujranwalacount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center" >
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Swat</h4>

                                                        <span class="countReg" id="Swatcount"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-centered text-center" >
                                                <div class="counterdivs">
                                                    <div class="regioncount1">
                                                        <h4 class="countheader2">Mardan</h4>

                                                        <span class="countReg" id="Mardancount"></span>
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
                        <div class="row">
                            <div class="col-md-6">
                                <div class="divheader" style="border-radius: 8px">
                                    <h3 style="text-align: center">Brands detailed</h3>
                                </div>
                                <div id="brandchart"></div>

                            </div>
                            <div class="col-md-6">
                                <div class="divheader" style="border-radius: 8px">
                                    <h3 style="text-align: center">Specialists covered</h3>
                                </div>
                                <div id="specialistChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Right Side Work -->
                <div class="col-lg-7">
                    <div>
                        <div class="divheader">
                            <h1 style="text-align: center">Call champion-of-the-month (month to date)</h1>
                        </div>
                        <div class="ChampionsContent">
                            <%--     <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-3" style="margin-left: 5%;">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">1<sup>st</sup></h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <img src="../assets/img/001.jpg" style="height: 100px" />
                                                        </div>
                                                        <div class="col-md-7">
                                                            <p id="empname1"></p>
                                                            <span id="empterritory1"></span>
                                                            <br />
                                                            <p id="totalnumcalls1"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style="margin-left: 5%;">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">2<sup>nd</sup></h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <img src="../assets/img/002.jpg" style="height: 100px" />
                                                        </div>
                                                        <div class="col-md-7">
                                                            <p id="empname2"></p>
                                                            <span id="empterritory2"></span>
                                                            <p id="totalnumcalls2"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3" style="margin-left: 5%;">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">3<sup>rd</sup></h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <img src="../assets/img/03.jpg" style="height: 100px" />
                                                        </div>
                                                        <div class="col-md-7">
                                                            <p id="empname3"></p>
                                                            <span id="empterritory3"></span>
                                                            <p id="totalnumcalls3"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-4">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">First</h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4" id="imageone">
                                                           
                                                        </div>
                                                        <div class="col-md-8" style="padding-top: 10px;">
                                                            <p id="empname1"></p>
                                                            <span id="empterritory1"></span>
                                                            <br />
                                                            <p id="totalnumcalls1"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">Second</h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4" id="imagetwo">
                                                            
                                                        </div>
                                                        <div class="col-md-8" style="padding-left: 25px; padding-top: 10px;">
                                                            <p id="empname2"></p>
                                                            <span id="empterritory2"></span>
                                                            <p id="totalnumcalls2"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card">
                                            <div class="card-content">
                                                <div class="card-header-blue">
                                                    <h1 class="card-heading">Third</h1>
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-4" id="imagethree">
                                        
                                                        </div>
                                                        <div class="col-md-8" style="padding-left: 30px; padding-top: 10px;">
                                                            <p id="empname3"></p>
                                                            <span id="empterritory3"></span>
                                                            <p id="totalnumcalls3"></p>
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
                        <div class="divheader">
                            <h1 style="text-align: center">Sales force in field</h1>
                        </div>
                        <div id="mappp" style=" height:550px; width: 100%; border-radius:10px">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
      <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/moment.js"></script>
    <script src="../assets/js/Nbootstrap.min.js"></script>
    <script src="../assets/js/jquery.thooClock.js"></script>
    <script src="../assets/Highcharts-4.2.5/js/highcharts.js"></script>
    <script src="../assets/Highcharts-4.2.5/js/highcharts-3d.js"></script>
     <script src="http://maps.google.com/maps/api/js?key=AIzaSyCBzlghKAqsuyOqL4lHwXHPzOumqsxnWo8"  type="text/javascript"></script>
    <script src="SummarizeDashboard.js"></script>
    <script>
        $('#myclock').thooClock({
            size: 100,
            dialColor: '#000000',
            dialBackgroundColor: 'White',
            secondHandColor: '#F3A829',
            minuteHandColor: '#222222',
            hourHandColor: '#222222',
            //alarmHandColor:'#FFFFFF',
            //alarmHandTipColor:'#026729',
            hourCorrection: '+0',
            alarmCount: 0,
            showNumerals: true
        });

    </script>
</body>
</html>
