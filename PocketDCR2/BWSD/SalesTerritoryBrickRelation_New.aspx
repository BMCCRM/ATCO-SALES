<%@ Page Title="Sales Territory Brick Relation" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesTerritoryBrickRelation.aspx.cs" Inherits="PocketDCR2.BWSD.SalesTerritoryBrickRelation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" type="text/css" />
    <%--<link rel="stylesheet" href="http://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" type="text/css" />--%>
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <%--<link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/clockface/css/clockface.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <%--<script type="text/javascript" src="../assets/js/jquery3.1.0.js"></script>--%>
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <%--<script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>--%>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <link href="../assets/global/plugins/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
    <script src="SalesTerritoryBrickRelation_New.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/fancybox/source/jquery.fancybox.pack.js" type="text/javascript"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
    <%--<script type="text/javascript" src="RegionToBrickRelationData.js"></script>--%>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Charts/core.js"></script>
    <script type="text/javascript" src="../Scripts/Charts/charts.js"></script>


    <script type="text/javascript" src="../Scripts/Charts/dataviz.js"></script>
    <script type="text/javascript" src="../Scripts/Charts/animated.js"></script>
    <script type="text/JavaScript">

        curvyCorners.addEvent(window, 'load', initCorners);

        function initCorners() {
            var settings = {
                tl: { radius: 10 },
                tr: { radius: 10 },
                bl: { radius: 10 },
                br: { radius: 10 },
                antiAlias: true
            }
            curvyCorners(settings, "#box");
        }

        $(document).ready(function () {
            var height = $('#box').innerHeight();
            //var height2 = height - 50 + "px"
            var height2 = "870px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
        });

    </script>
    <style type="text/css">
        #id-form th {
            width: 212px;
        }

        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
            color: white;
            padding: 2%;
            /*background: #000;*/
        }

        .pre-txt {
            padding: 2%;
            text-align: center;
            font-size: 20px;
        }

        .pre-img {
            padding-left: 17px;
        }

        .loading1 {
             /*background: #000 url('../Images/loading_bar.gif') no-repeat 20px 22px;*/
            width: 254px;
            height: 50px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
            color: white;
            padding: 2%;
            background: #000;
        }

        .back {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            z-index: 9999;
        }

        .lableblock {
            display: block;
            flex: 1;
        }

        .justify-content-center .autowidht {
            width: 14.285% !important;
        }

        .justify-content-start .autowidht {
            width: 14.285% !important;
        }

        .justify-content-center .autowidht span.select2 {
            width: 100% !important;
        }

        .justify-content-start .autowidht span.select2 {
            width: 100% !important;
        }

        #uploadify {
            /*background: #FFFFFF;*/
            border-radius: 5px;
        }

            #uploadify:hover {
                /*background: #FFFFFF;*/
            }

            #uploadify object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
            }

        #ContentPlaceHolder1_cTextDate_body {
            height: 175px !important;
        }


        .more {
            cursor: pointer;
        }

        .customdown {
            background-color: #505050;
            background-image: -moz-linear-gradient(center bottom, #505050 0%, #707070 100%);
            background-position: center top;
            background-repeat: no-repeat;
            border: 2px solid #808080;
            border-radius: 30px;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            /*height: 50px;*/
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            width: 143px;
            padding: 4px 0;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }

        .dshload_back {
            /*position: absolute;*/
            top: 0px;
            left: 0px;
            right: 15px;
            bottom: 0px;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0);
            /*width: 100%;*/
            z-index: 9999;
            width: 94%;
            border-radius: 5px;
        }

        .dshloader {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: relative;
            top: 50%;
            left: 50%;
            margin: -30px 0 0 -125px;
            /*z-index: 222;*/
            /*display: block;*/
        }

        .rounded {
            border-radius: 0.6rem !important;
        }

        .loader {
            color: white;
            transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            border: 16px solid #dd5c66;
            border-radius: 50%;
            border-top: 16px solid #3b9ddbe6;
            -webkit-animation: spin 2s linear infinite; /* Safari */
            animation: spin 2s linear infinite;
            width: 180px;
            height: 180px;
            margin: 0 auto;
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

        .color-aliceBlue {
            background-color: aliceblue !important;
        }

        body {
            overflow-y: scroll !important;
        }

        .circleMeUp {
            float: left;
        }

        .container-fluid {
            background-color: #f4f6f7;
        }

        .border-left-primary {
            border-left: .25rem solid #217ebd !important;
            border-right: .25rem solid #217ebd !important;

        }
        .h-divider {
            margin: auto;
            margin-top: 35px;
            margin-bottom: 30px;
            position: relative;
        }

            .h-divider .shadow {
                overflow: hidden;
             height: 3px;
            }

                .h-divider .shadow:after {
                    content: '';
                    display: block;
                    margin: -25px auto 0;
                    width: 100%;
                    height: 25px;
                    border-radius: 125px/12px;
                    box-shadow: 0 0 8px black;
                }
                 /*Upload button working*/

        .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

        .btn {
            border: 2px solid gray;
            color: black;
            background-color: #e7e7e7;
            padding: 2px 40px;
            /*border-radius: 8px;*/
            font-size: 14px;
            /*font-weight: bold;*/
            text-align: center;
            margin: 0px 20px;
        }

        .upload-btn-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
        }

        .btnnor {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            /* text-shadow: -1px -1px 1px #72aebd; */
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #217ebd;
            border-top: 1px solid #217ebd;
            border-right: 1px solid #217ebd;
            border-bottom: 1px solid #217ebd;
            border-left: 1px solid #217ebd;
            box-shadow: 2px 1px 2px #217ebd;
            margin: 10px 5px 10px 5px;
        }

        .ani:hover {
            position: relative;
            top: 1px;
            left: 1px;
            background-color: ##217ED3;
            border-top: 1px solid ##217ED3;
            border-right: 1px solid ##217ED3;
            border-bottom: 1px solid ##217ED3;
            border-left: 1px solid ##217ED3;
            box-shadow: -1px -1px 2px #ccc;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <input id="h1" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level1 -->
    <input id="h2" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level2 -->
    <input id="h3" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level3 -->
    <input id="h4" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level4 -->
    <input id="h5" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--employee ID -->
    <input id="h6" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--DR id -->
    <input id="h7" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--PROduct ID -->
    <input id="h8" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!-- VT -->
    <input id="h9" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--JV -->
    <input id="h10" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--DR class -->
    <input id="h11" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level5 -->
    <input id="h12" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <!--Level6 -->
    <input id="h13" type="hidden" runat="server" clientidmode="Static" value="-1" />
    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    <div class="pop_box-outer jqmWindow" id="dialog_1">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>

    <%--progress while uploading--%>
    <div class="pop_box-outer back" style="display: none;" id="dialog">
        <div class="loading" style="font-family: Arial; font-size: larger;">
            <p class="pre-txt">Region to Brick Data Uploading...</p>
            <div class="pre-img">
                <img src="../Images/loading_bar.gif" />
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <%--process while processing--%>
    <div class="pop_box-outer back" style="display: none;" id="dialog1">
        <div class="loading1" style="font-family: Arial; font-size: larger;">
            <p class="pre-txt">Region to Brick Processing...</p>
            <div class="pre-img">
                <img src="../Images/loading_bar.gif" />
            </div>
        </div>
        <div class="clear">
        </div>
    </div>
    <div style="height: 15px"></div>
    <div class="page-head">
        <div class="container-fluid">
            <div class="page-title">
                <h1><small>Sales Territory Brick Relation</small> </h1>
            </div>
              <div class="row">
                <div class="col-lg-8"></div>
                <div class="col-lg-4 upload-btn-wrapper" id="uploadify_button2">
                    <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                    <input type="file" style="display: none" id="sheetUploader" onselect="uploadFile();" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

                    <%--<input type="button" class="btn btn-primary" value="Upload a file"/>
                    <input type="file" name="myfile" id="inputFile" accept=".xls,.xlsx" />--%>
                    <%-- </div>
                <div class="col-lg-2">--%>
                    <div class="clear"></div>
                    <input id="exportExcel2" type="button" class="btnnor ani" value="Download Data" />
                </div>
            </div>
          <%--  <div class="row">
                <div class="col-lg-8"></div>
                <div class="col-lg-2" id="uploadifyDSR">
                    <div id="uploadify_button2" class="customdown pull-right" style="float: right !important;">
                        <span class="uploadify-button-text" style="height: 50px; float: right;"></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div id="exportExcel2" class="uploadify-button more" style="height: 25px; line-height: 25px; width: 140px;">
                        <span>Download Data</span>
                    </div>
                </div>
            </div>--%>

        </div>
    </div>
    <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <%-- <div class="container-fluid">
            <div class="portlet light bordered">
                <div id="table" class="form-body">
                    <div class="d-flex justify-content-center">
                        <div class="p-1 autowidht">
                            <div id="g11" class="form-group">
                                <label id="Label111" class="control-label">BUH Manager :</label>
                                <select id="dG11" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g22" class="form-group">
                                <label id="Label222" class="control-label">GM Manager :</label>
                                <select id="dG22" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g33" class="form-group">
                                <label id="Label333" class="control-label">National :</label>
                                <select id="dG33" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g44" class="form-group">
                                <label id="Label444" class="control-label">Region :</label>
                                <select id="dG44" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g55" class="form-group">
                                <label id="Label555" class="control-label">Zone :</label>
                                <select id="dG55" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g66" class="form-group">
                                <label id="Label666" class="control-label">Terrritory :</label>
                                <select id="dG66" class="form-control  w-100">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="p-1 autowidht">
                            <div id="g77" class="form-group">
                                <label id="Labelimit" class="control-label">Percentage :</label>
                                <select id="ddlimit" class="form-control w-100">
                                    <option value="-1">Select..</option>
                                    <option value="0">All</option>
                                    <option value="1">Equal 100</option>
                                    <option value="2">Less than 100</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">

                        <div class="col-lg-1 col-md-2 col-sm-6 col-12">
                            <div id="collim" class="form-group">
                                <label id="Labelim" class="control-label"></label>
                                <input id="btnsubmitbrickdata" name="ShowResult" class="btn btn-primary  input-sm" value="Show Result" onclick="GetAlldata()" type="button" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div id="teritorydetail" class="col-sm-12"></div>
                </div>
            </div>
        </div>--%>
        <div class="portlet light bordered">
            <div id="hirarchy" class="form-body">

                <div class="d-flex justify-content-start">
                    <div class="p-1 autowidht">
                        <div id="g1" class="form-group">
                            <label id="Label5" class="control-label lableblock"></label>
                            <select id="dG1" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g2" class="form-group">
                            <label id="Label6" class="control-label lableblock"></label>
                            <select id="dG2" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht" id="gs3">
                        <div id="g3" class="form-group">
                            <label id="Label7" class="control-label lableblock"></label>
                            <select id="dG3" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g7" class="form-group Th12">
                            <label id="Label13" class="control-label lableblock"></label>
                            <select id="dG7" class="form-control">
                                <option value="-1">Select Team</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g4" class="form-group">
                            <label id="Label8" class="control-label lableblock"></label>
                            <select id="dG4" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g5" class="form-group">
                            <label id="Label11" class="control-label lableblock"></label>
                            <select id="dG5" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g6" class="form-group">
                            <label id="Label12" class="control-label lableblock"></label>
                            <select id="dG6" class="form-control">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-start">
                    <div class="p-1 autowidht">
                        <div id="col11" class="form-group">
                            <label id="Label1" class="control-label lableblock"></label>
                            <select id="ddl1" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col22" class="form-group">
                            <label id="Label2" class="control-label lableblock"></label>
                            <select id="ddl2" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht" id="cols33">
                        <div id="col33" class="form-group">
                            <label id="Label3" class="control-label lableblock"></label>
                            <select id="ddl3" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col77" class="form-group">
                            <label id="Label14" class="control-label lableblock Th112"></label>
                            <select id="ddlTeam" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col44" class="form-group">
                            <label id="Label4" class="control-label lableblock"></label>
                            <select id="ddl4" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col55" class="form-group">
                            <label id="Label9" class="control-label lableblock"></label>
                            <select id="ddl5" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col66" class="form-group">
                            <label id="Label10" class="control-label lableblock"></label>
                            <select id="ddl6" class="form-control w-100">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div class="d-flex justify-content-start">
                    <div class="p-1 autowidht">
                        <div id="col1Region" class="form-group">
                            <label id="Label1Region" class="control-label lableblock">Region :</label>
                            <select id="ddl1Region" class="form-control input-sm">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col2SubRegion" class="form-group">
                            <label id="Label2SubRegion" class="control-label lableblock">Sub Region :</label>
                            <select id="ddl2SubRegion" class="form-control input-sm">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col3District" class="form-group">
                            <label id="Label3District" class="control-label lableblock">District :</label>
                            <select id="ddl3District" class="form-control input-sm">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="col4City" class="form-group">
                            <label id="Label4City" class="control-label lableblock">City :</label>
                            <select id="ddl4City" class="form-control input-sm">
                                <option value="-1">Select..</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-1 autowidht">
                        <div id="col5dist" class="form-group">
                            <label id="Label4dist" class="control-label lableblock">Distributors :</label>
                            <select id="ddlDistributors" class="form-control input-sm">
                                <option value="-1">Select Distributors First</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-1 autowidht">
                        <div id="g77" class="form-group">
                            <label id="Labelimit" class="control-label lableblock">Percentage :</label>
                            <select id="ddlimit" class="form-control w-100">
                                <option value="-1">Select..</option>
                                <option value="0">All</option>
                                <option value="1">Equal 100</option>
                                <option value="2">Less than 100</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="p-1 autowidht">
                    <div id="collim1" class="form-group">
                        <label id="Labelim1" class="control-label lableblock"></label>
                        <input id="btnsubmitbrickdata1" name="btnsubmitbrickdata1" class="btn btn-primary " value="Show Result" onclick="GetBrickAllocation_NonApproval(); GetTerritoryBrickDetail();" type="button" />
                    </div>
                </div>

                <div class="row">                    
                    <div class="col-lg-12 ">
                        <div id="containerteritory1" class="card border-left-primary my-3 p-3 bg-white rounded shadow-sm col-md-12">
                            <div class="card-body">
                                <div class="card-text" id="teritorydetail"></div>
                                <div class="dshload_back">
                                    <div id="loader2" class=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-divider">
                    <div class="shadow"></div>
                </div>
                <div class="row">
                    <div class="btn" style="float: right;" id="ApproveAllForAddTolist">
                        <a id="btnApproveAllForAddTolist" name="btnApproveAllForAddTolist" type="button" class="btn btn-info" style="display: none;">Approve All</a>
                        <a id="btnRejectAllForAddTolist" name="btnRejectAllForAddTolist" type="button" class="btn btn-info" style="display: none;">Reject All</a>
                    </div>
                    <div class="col-lg-12 ">
                        <div id="containerteritory" class="card border-left-primary my-3 p-3 bg-white rounded shadow-sm col-md-12">
                            <div class="card-body">
                                <div class="card-text" id="griddivForDistributorSaleBrickdetail"></div>
                                <div class="dshload_back">
                                    <div id="loader1" class=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <%--    <div class="row">
                    <div id="List1" class="col-sm-3">
                        <select multiple="" id='listbox1' class="form-control" style="height: 250px;">
                            <option value="-1">- Please Select Distributors From Dropdown -</option>
                        </select>
                    </div>
                    <div class="col-sm-1" style="padding-top: 50px; padding-left: 50px;">
                        <input class="btn blue" id="btnRight" type="button" onclick="SaveData(); return false;" value=" > " />
                        <div style="padding: 5px 0;"></div>
                        <input class="btn blue " id="btnLeft" type="button" onclick="DeleteData(); return false;" value=" < " style="display: block;" />
                    </div>
                    <div class="col-sm-3">
                        <select multiple="" id='listbox2' class="form-control" style="height: 250px;">
                            <option value="-1">- Territory Sale Brick -</option>
                        </select>
                    </div>

                    <div class="col-sm-2">
                        <div id="col44per" class="form-group ">
                            <label id="Label44per" class="control-label">Brick Percentage % :</label>
                            <input id="inpSalesPercent" placeholder="Enter Percentage %" class="form-control" onkeypress="return check(event,value)" onkeyup="checkLength()" type="text" />

                        </div>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>
</asp:Content>
