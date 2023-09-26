<%@ Page Title="Virtual Feedback Center" Language="C#" MasterPageFile="~/MasterPages/HomeBoot.Master" AutoEventWireup="true" CodeBehind="VirtualFeedBack.aspx.cs" Inherits="PocketDCR2.Form.VirtualFeedBack" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Side Menu</title>
    <link href="../Content/bootstrap.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>--%>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <%-- <script type="text/javascript" src="../assets/js/jquery.js"></script>--%>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <link href="../CSS/styles.css" type="text/css" rel="Stylesheet" />
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <%--<link href="../assets/css/dataTables.bootstrap.min.css" rel="stylesheet" />--%>
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
    <link href="../js/AdminLTE.min.css" rel="stylesheet" />
    <%-- <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>--%>

    <script type="text/javascript" src="VirtualFeedBackJS.js"></script>
    <%--<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://demo.cnanney.com/css-flip-counter2/js/flipcounter.js"></script>--%>

    <style type="text/css">
        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            visibility: hidden;
            opacity: 0;
        }

            .overlay:target {
                visibility: visible;
                opacity: 1;
            }

        .popup {
            margin: 70px auto;
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 55%;
            position: relative;
            transition: all 5s ease-in-out;
        }

            .popup h2 {
                margin-top: 0;
                color: #333;
                font-family: Tahoma, Arial, sans-serif;
            }

            .popup .close {
                position: absolute;
                top: 20px;
                right: 30px;
                transition: all 200ms;
                font-size: 30px;
                font-weight: bold;
                text-decoration: none;
                color: #333;
            }

                .popup .close:hover {
                    color: #06D85F;
                }

            .popup .content {
                max-height: 30%;
                overflow: auto;
            }

        @media screen and (max-width: 700px) {
            .box {
                width: 70%;
            }

            .popup {
                width: 70%;
            }
        }

        #flmname {
            color: #fff;
            font-weight: 900;
            font-size:25px;
        }

        #flmemail p {
            color: #fff !important;
            font-size: 15px !important;
            font-weight: 800 !important;
        }

        #flmphone p {
            color: #fff !important;
            font-size: 19px !important;
            font-weight: 800 !important;
        }

        #flmtitle p {
            color: #fff !important;
            font-size: 25px !important;
            font-weight: 800 !important;
        }
        
        .newreqLabel {
            color: #fff;
            font-size: 17px;
        }

        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff; /* change if the mask should have another color then white */
            opacity: 0.5;
            z-index: 1999; /* makes sure it stays on top */
        }

        #status {
            width: 200px;
            height: 200px;
            position: absolute;
            left: 50%; /* centers the loading animation horizontally one the screen */
            top: 50%; /* centers the loading animation vertically one the screen */
            background-image: url(../img/status.gif); /* path to your loading animation */
            background-repeat: no-repeat;
            background-position: center;
            margin: -100px 0 0 -100px; /* is width and height divided by two */
        }

        .form-group p {
            font-weight: 900;
            font-size: 17px;
        }

        .form-group label {
            font-size: 17px;
        }

        .fflmcards {
            font-weight;
        }

        #TAECount {
            height: 155px;
            background: #6495ED none repeat scroll 0% 0%;
            border-radius: 5px;
            float: none;
            width: auto;
            margin: 5px;
            padding: 30px;
        }

        #TCCount {
            height: 155px;
            background: #6495ED none repeat scroll 0% 0%;
            border-radius: 5px;
            float: none;
            width: auto;
            margin: 5px;
            padding: 30px;
        }

        #CPCount {
            height: 155px;
            background: #6495ED none repeat scroll 0% 0%;
            border-radius: 5px;
            float: none;
            width: auto;
            margin: 5px;
            padding: 30px;
        }

        .count {
            color: #FFF;
            line-height: 100px;
            font-size: 120px;
            font-weight: 700;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="control-sidebar-menu">
        <div class="col-md-2">
            <aside class="main-sidebar" style="z-index: 0;">
     
                    <section class="sidebar">
                      <!-- Sidebar user panel -->
                      <div class="user-panel">
                        <div class="pull-left image">
                          <img src="../js/user2-160x160.jpg"  class="img-circle" alt="User Image">
                        </div>
                        <div class="pull-left info" id ="NSMName">
                        </div>
                      </div>

                      <!-- sidebar menu: : style can be found in Daant Know Where -->
                      <ul class="sidebar-menu" id ="mainlist">
                      </ul>
                    </section>
                    <!-- /.sidebar -->
                  </aside>
        </div>
    </div>
    <br />
    <div class="col-sm-10 container-fluid">
        <div style="display: block;" class="row">
            <h1 style="text-align: center" id="regionheading"></h1>
        </div>
        <div style="display: block;" class="row" id="regionalmanager">

            <div id="maindata" style="display: none; background-color: rgb(100, 149, 237);" class="col-md-12 well col-xlg-12 col-lg-12" id="TreverRegional2">
                <div class=" row">
                    <div class="col-md-2" id="rsmimagediv">
                        <img src="src/George KaplanSmall.png" class="img-circle">
                    </div>
                    <div class="col-md-8 text-center h4" id="flmname"></div>

                </div>
                <div class="row">
                    <div class="col-md-4">
                       
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="col-xs-2"></div>
                           
                            <div class="col-sm-8" id="flmtitle">
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="col-xs-2"></div>
                            <label class="col-xs-2 control-label newreqLabel">Phone:</label>
                            <div class="col-sm-8" id="flmphone">
                            </div>
                        </div>
                         <div class="form-group">
                            <div class="col-xs-2"></div>
                            <label class="col-xs-2 control-label newreqLabel">Email:</label>
                            <div class="col-sm-8" id="flmemail">
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                       
                        
                        <div class="col-xs-6 col-md-3 text-right" id="flmspotcheck">
                        </div>
                        <div class="col-xs-6 col-md-3 text-right"></div>
                        <div class="col-xs-6 col-md-3 text-right" id="flmdetailsbtn">
                        </div>

                    </div>
                </div>
                <div id="flmdetailsclick" style="z-index: 999" class="overlay">
                    <div class="popup" id="flmdetails">
                    </div>
                </div>
                <div id="CPdetailsclick" style="z-index: 999" class="overlay">
                    <div class="popup" id="CPdetails">
                    </div>
                </div>

            </div>

        </div>
        <div style="display: block;" class="row" id="">
            <div class="col-md-4">
                <label class="col-md-12 text-center" id="contactpointtitle" style="font-size: 22px">Contact Point Reported</label>
                <div class="counter-wrapper">
                    <a href="#CPdetailsclick">
                        <div id="CPCount" class="col-md-2 col-centered text-center"></div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <label class="col-md-12 text-center" id="empcounttitle" style="font-size: 22px">Total Active Reps</label>
                <div class="counter-wrapper">
                    <div id="TAECount" class="col-md-2 col-centered text-center"></div>
                </div>
            </div>
            <div class="col-md-4">
                <label class="col-md-12 text-center" id="callscounttitle" style="font-size: 22px">Total Calls Reported</label>
                <div class="counter-wrapper">
                    <div id="TCCount" class="col-md-2 col-centered text-center"></div>
                </div>
            </div>

        </div>

        <div style="display: block;">
            <div class="regional1hierarchy">
                <div style="display: block;" class="row" id="MapPointss">
                    <div class="col-md-12">
                        <div id="mapppp" style="height: 300px; width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
        </br>
           <div style="display: block;" id="employees">
               <div class="regional1hierarchy">
                   <div style="display: block;" class="row" id="MIODetails">
                   </div>
               </div>
           </div>

    </div>
    <div id="preloader">
        <div id="status">&nbsp;</div>
    </div>
    <div id="miodetails"></div>
    <a href="#popup1" id="asd"></a>
    <%--    <script src="../Scripts/jquery-2.2.3.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script src="../js/app.min.js"></script>--%>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
</asp:Content>
