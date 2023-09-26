<%@ Page Title="Doctor List" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DrAddToList.aspx.cs" Inherits="PocketDCR2.Form.DrAddToList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
    <script type="text/javascript">
        var $old = jQuery.noConflict();
    </script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jsModalForOldJQ.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="DrAddToListJS.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>
    <link href="assets_new/jquery-ui.css" rel="stylesheet" />
    <script src="assets_new/jquery-ui.js" type="text/javascript"></script>
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyByB0y2Sn129W7f22dS_TQGcWJzc-X8r3A"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
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
            var height2 = height - 20 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
            $('.outerBox').css('margin-bottom', '30px');
        });




    <%--//-------------------------------------------------------------------- For Address Visiblity ------------------------------------------------------//--%>
        function toggleAddress() {
            var checkbox = document.getElementById("chk_box");
            var addressContainer = document.getElementById("addressContainer");

            if (checkbox.checked) {
                addressContainer.style.display = "block";
            } else {
                addressContainer.style.display = "none";
            }
        }





    </script>

  


    <style type="text/css">
        .grid-basic_length {
            display: none;
            width: 0 !important;
        }

        .ajax__combobox_itemlist {
            position: absolute;
            top: 160px !important;
            top: 168px\9 !important;
            left: 47px !important;
        }

        td.ajax__combobox_textboxcontainer {
            padding-bottom: 2px\9 !important;
        }

        .ajax__combobox_inputcontainer {
            top: -7px\9 !important;
        }

        .ob_gC {
            background-image: url("../Styles/GridCss/header.gif");
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 33px;
            text-align: left;
        }

        .odd {
            background-color: #f6f5f0 !important;
        }

        .even {
            background-color: #efede2 !important;
        }

        table.dataTable.no-footer {
            border: 0 solid #616262 !important;
        }

        .ob_gMCont {
            border-bottom: 1px solid #e3e2de;
            border-top: 1px solid #e3e2de;
            overflow: hidden;
            position: relative;
        }

        #grid-basi td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        #grid-lastdoc td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        table.dataTable thead th, table.dataTable thead td {
            padding: 10px 5px !important;
        }

        .headerr .wrap {
            width: 200px;
            margin: 0 auto;
            margin-top: 10px;
            text-align: center;
            position: relative;
        }

            .headerr .wrap .img_1, .header .wrap .img_2 {
                border: 1px solid #0f0;
                position: absolute;
                height: 20px;
                width: 20px;
                top: 25px;
            }

            .headerr .wrap .img_1 {
                left: 0;
            }

            .headerr .wrap .img_2 {
                right: 0;
            }

        .styled-select {
            background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
            overflow: hidden;
            width: 240px;
        }

            .styled-select select {
                background: transparent;
                border: none;
                font-size: 14px;
                padding: 5px; /* If you add too much padding here, the options won't show in IE */
                width: 268px;
            }

        .semi-square {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }

        .blue {
            background-color: whitesmoke;
        }

            .blue select {
                color: black;
            }

        .wrap {
            width: 80%;
            margin: 0 auto;
            margin-top: 15px;
        }

        .parent {
            margin-bottom: 15px;
            padding: 10px;
            color: #0A416B;
            clear: both;
            width: 100%;
        }

        .left {
            float: left;
            width: 12%;
            padding: 5px;
            height: 360px;
        }

        .center {
            float: left;
            width: 65%;
            padding: 5px;
            height: 350px;
        }

        .right {
            float: right;
            padding: 0px 30px 0px 0px;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .btnsalessApprove {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: white;
        }

            .btnsalessApprove:hover {
                background-color: #217ebd;
                color: white !important;
            }

        .btnsalessReject {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: white;
        }

            .btnsalessReject:hover {
                background-color: #dc3545;
                color: white !important;
            }


        .btnAddMultiple {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: white;
        }

            .btnAddMultiple:hover {
                background-color: black;
                color: white;
            }

        textarea#styleid {
            color: #666;
            font-size: 14px;
            -moz-border-radius: 8px;
            -webkit-border-radius: 8px;
            margin: 5px 0px 10px 0px;
            padding: 10px;
            height: 75px;
            width: 250px;
            border: #999 1px solid;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
            transition: all 0.25s ease-in-out;
            -webkit-transition: all 0.25s ease-in-out;
            -moz-transition: all 0.25s ease-in-out;
            box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
        }

            textarea#styleid:focus {
                color: #000;
                outline: none;
                border: wheat 1px solid;
                font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            }

        .button-secondary {
            font-size: 15px;
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            background: #03429a;
            padding: 6px 20px 6px 20px;
        }

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
            overflow-y: auto;
        }

            .overlay:target {
                visibility: visible;
                opacity: 1;
            }

        .popup {
            margin: 70px auto;
            padding: 15.5px;
            background: #fff;
            border-radius: 5px;
            width: 90%;
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

        @media (min-width: 1200px) {
            .maxwidht {
                max-width: 100%;
                padding-right: 0px !important;
            }
        }

        .auto-style1 {
            width: 136px;
            font-weight: bold;
        }

        .column-options a.buttonlink {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-align: center;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            letter-spacing: 0.10em;
            color: #fff;
            padding: 3px 10px 4px 10px;
            border-radius: 5px;
            background-color: #2484C6;
            border-top: 1px solid #90f2da;
            border-right: 1px solid #00a97f;
            border-bottom: 1px solid #008765;
            border-left: 1px solid #7dd2bd;
            box-shadow: 2px 1px 2px #ccc;
            margin: 3px 5px 10px 5px;
            display: block;
        }

        .column-options a.buttonlinkgreen {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-align: center;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            letter-spacing: 0.10em;
            color: #fff;
            padding: 3px 10px 4px 10px;
            border-radius: 5px;
            background-color: #00a97f;
            border-top: 1px solid #90f2da;
            border-right: 1px solid #00a97f;
            border-bottom: 1px solid #008765;
            border-left: 1px solid #7dd2bd;
            box-shadow: 2px 1px 2px #ccc;
            margin: 3px 5px 10px 5px;
            display: block;
        }

        .column-options a.buttonlinkRed {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-align: center;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            letter-spacing: 0.10em;
            color: #fff;
            padding: 3px 10px 4px 10px;
            border-radius: 5px;
            background-color: #dc3545;
            border-top: 1px solid #90f2da;
            border-right: 1px solid #dc3545;
            border-bottom: 1px solid #008765;
            border-left: 1px solid #7dd2bd;
            box-shadow: 2px 1px 2px #ccc;
            margin: 3px 5px 10px 5px;
            display: block;
        }

        .column-options a.buttonlink:hover {
            position: relative;
            top: 1px;
            left: 1px;
            background-color: #00CCFF;
            border-top: 1px solid #9aebff;
            border-right: 1px solid #08acd5;
            border-bottom: 1px solid #07a1c8;
            border-left: 1px solid #92def1;
            box-shadow: -1px -1px 2px #ccc;
        }

        #uploadify {
            background: #FFFFFF;
            border-radius: 5px;
        }

            #uploadify:hover {
                background: #FFFFFF;
            }

            #uploadify object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
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




   <div class="pop_box-outer jqmwindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
  <%--  <div class="pop_box-outer jqmwindow"  id="dialog">
               <div class="loding_box_outer d-none">
                               <div class="loading">
                                </div>
                                <div class="clear">
                                </div>
                            </div>--%>

     <%--   <div class="divLodingGrid" style="height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 2999; opacity: 0.6;background:#000;display:none">
                                <div class="loading">
                                </div>
                                <div class="clear">
                                </div>
                            </div>--%>

    <div class="portlet light bordered" style="margin: 10px;">
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

            <div class="p-1 autowidht">
                <div id="collim1" class="form-group">
                    <label id="Labelim1" class="control-label lableblock"></label>
                    <input id="btnShowResult" name="btnShowResult" class="btn btn-primary " value="Show Result" onclick="LoadData()" type="button" />
                </div>
            </div>
        </div>
    </div>
    <div id="divClassIdAndFrequency" class="jqmConfirmation">
        <div class="jqmTitle">
            More Details
        </div>
        <div class="divEdit">
            <div class="divTable">
                <span class="requireError" style="color: #d52525; display: none;">
                    <br />
                    <center>Please fill all the details</center>
                </span>
                <div class="divRow">
                    Class:
                    <select id="singleClass" name="ddlAllClass" class="styledselect_form_1" style="width: 142px; margin-left: 30px;">
                        <option value="-1" selected="selected">Select Class</option>
                    </select>
                </div>
                <div class="divRow">
                    Frequency:
                    <input id="frequency" name="frequency" type="text" placeholder="Frequency" style="width: 140px;" />
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 27px;">
                        <div>
                            <input id="btnDetailsSubmit" name="btnDetailsSubmit" type="button" value="Submit" style="margin-left: 60px;" />
                        </div>
                    </div>
                    <div class="divColumn" style="width: 55px;">
                        <div>
                            <input id="btnDetailsCancel" name="btnDetailsCancel" type="button" value="Cancel" style="margin-left: 25px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divClassIdAndFrequencyUpdate" class="jqmConfirmation" style="width: 425px;">
        <div class="jqmTitle">
            More Details
        </div>
        <div class="divEditUpdate">
            <div class="divTableUpdate">
                <span class="requireErrorUpdate" style="color: #d52525; display: none;">
                    <br />
                    <center>Please fill all the details</center>
                </span>
                <div class="divRow">
                    <label style="width: 60px;" id="singleClassUpdate1" >Class:</label>
                    <select id="singleClassUpdate" name="singleClassUpdate" class="styledselect_form_1" style="width: 142px;">
                        <option value="-1" selected="selected">Select Class</option>
                    </select>
                </div>
                <div class="divRow">
                    <label style="width: 60px;">Frequency:</label>
                    <input id="frequencyUpdate" name="frequencyUpdate" type="text" placeholder="Frequency" style="width: 140px;" />
                </div>
          
                <%-- //--------------------------------------------- Addresss ------------------------------------------------------//--%>


                 <div class="divRow">
                    <label id="addAddressLabel">Add Address</label>
                      <input id="chk_box" name="chk_box" type="checkbox" onchange="toggleAddress()" />
                   
                </div>


                <div class="divRow" id="addressContainer" style="display: none;">
                    <label id="addressLabel">Address</label>
                    <input id="Address2" name="Address2" type="text" placeholder="Address" style="width: 250px;" />
                </div>

               


                <div class="divRow">
                    <label style="display: none;">Distributor:</label>
                    <select id="DistributorUpdate" name="DistributorUpdate" class="styledselect_form_1" style="display:none">
                        <option value="-1" selected="selected">Select Distributor</option>
                    </select>
                </div>
                <div class="divRow">
                    <label style="display:none">Brick:</label>
                    <select id="singleBrickUpdate" name="singleBrickUpdate" class="styledselect_form_1" style="display: none;">
                        <option value="-1" selected="selected">Select Brick</option>
                    </select>

                    <input id="CityID" name="CityID" type="text" style="display: none;" />
                </div>
                <div class="divRow">
                    <label style="display: none;">City:</label>
                    <input id="CityName" name="CityName" type="text" style="display: none;" disabled />
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 27px;">
                        <div>
                            <input id="btnDetailsUpdate" name="btnDetailsUpdate" type="button" value="Submit" style="margin-left: 60px;" />
                        </div>
                    </div>
                    <div class="divColumn" style="width: 55px;">
                        <div>
                            <input id="btnDetailsCancel1" name="btnDetailsCancel1" type="button" value="Cancel" style="margin-left: 25px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="multipleClassandFrequencyUpdate" class="jqmConfirmation" style="width: 425px;">
        <div class="jqmTitle">
            Multi Update
        </div>
        <div class="divEditMultiUpdate">
            <div class="divTableMultiUpdate">
                <span class="requireErrorMultiUpdate" style="color: #d52525; display: none;">
                    <br />
                    <center>Please fill all the details</center>
                </span>
                <div class="divRow">
                    <label style="width: 60px;">Class:</label>
                    <select id="MultiClassUpdate" name="MultiClassUpdate" class="styledselect_form_1" style="width: 142px;">
                        <option value="-1" selected="selected">Select Class</option>
                    </select>
                </div>
                <div class="divRow">
                    <label style="width: 60px;">Frequency:</label>
                    <input id="frequencyMultiUpdate" class="frequencyMultiUpdate" name="frequencyMultiUpdate" type="text" placeholder="Frequency" style="width: 140px;" />
                </div>
                <div class="divRow">
                    <label style="width: 60px;">Distributor:</label>
                    <select id="DistributorMultiUpdate" name="DistributorMultiUpdate" class="styledselect_form_1" style="width: 290px;">
                        <option value="-1" selected="selected">Select Distributor</option>
                    </select>
                </div>
                <div class="divRow">
                    <label style="width: 60px;">Brick:</label>
                    <select id="BrickMultiUpdate" name="singleBrickMultiUpdate" class="styledselect_form_1" style="width: 290px;">
                        <option value="-1" selected="selected">Select Brick</option>
                    </select>

                    <input id="CityIDMulti" name="CityIDMulti" type="text" style="display: none;" />
                </div>
                <div class="divRow">
                    <label style="width: 60px;">City:</label>
                    <input id="CityNameMulti" name="CityNameMulti" type="text" style="width: 140px;" disabled />
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 27px;">
                        <div>
                            <input id="btnDetailsMultiUpdate" name="btnDetailsMultiUpdate" type="button" value="Submit" style="margin-left: 60px;" />
                        </div>
                    </div>
                    <div class="divColumn" style="width: 55px;">
                        <div>
                            <input id="btnDetailsMultiCancel1" name="btnDetailsMultiCancel1" type="button" value="Cancel" style="margin-left: 25px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="multipleClassandFrequency" class="jqmConfirmation">
        <div class="jqmTitle">
            More Details
        </div>
        <div class="divEdit">
            <div class="divTable">
                <span class="requireError" style="color: #d52525; display: none;">
                    <br />
                    <center>Please fill all the details</center>
                </span>
                <div class="divRow">
                    Class:
                    <select id="multipleClass" name="ddlAllClass" class="styledselect_form_1" style="width: 142px; margin-left: 30px;">
                        <option value="-1" selected="selected">Select Class</option>
                    </select>
                </div>
                <div class="divRow">
                    Frequency:
                    <input class="frequency" name="frequency" type="text" placeholder="Frequency" style="width: 140px;" />
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 27px;">
                        <div>
                            <input class="btnDetailsSubmit" name="btnDetailsSubmit" type="button" value="Submit" style="margin-left: 60px;" />
                        </div>
                    </div>
                    <div class="divColumn" style="width: 55px;">
                        <div>
                            <input class="btnDetailsCancel" name="btnDetailsCancel" type="button" value="Cancel" style="margin-left: 25px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divApproveAllConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to approve all the selected requests?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnApproveAllYes" name="btnApproveAllYes" type="button" value="Yes" style="margin-left: 55px;" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnApproveAllNo" name="btnApproveAllNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divApproveConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to approve this request?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnApproveYes" name="btnApprove" type="button"  value="Yes" style="margin-left: 55px;" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnApproveNo" name="btnNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="ApproveOkDivmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnApprovedOk" name="btnApprovedOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <div id="divRemoveConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to Remove this request?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnRemoveYes" name="btnRemoveYes" type="button" value="Yes" style="margin-left: 55px;" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnRemoveNo" name="btnRemoveNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divAdminRemoveConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to Remove this request?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnAdminRemoveYes" name="btnAdminRemoveYes" type="button" value="Yes" style="margin-left: 55px;" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnAdminRemoveNo" name="btnAdminRemoveNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divAddtoListConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to add this Dr. to list?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnAddListYes" name="btnApprove" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnAddListNo" name="btnNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="AddListOkDivmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnAddListOk" name="btnApprovedOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <div id="divRemoveAllConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure you want to Remove all the selected requests?
                </div>
                <div class="divRow">
                    <div class="divColumn">
                        <div>
                            <input id="btnRemoveAllYes" name="btnRemoveAllYes" type="button" value="Yes" style="margin-left: 55px;" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnRemoveAllNo" name="btnRemoveAllNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="RemoveOkDivmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg1" name="hlabmsg1">
                    </label>
                    <br />
                    <br />
                    <input id="btnApprovedOk1" name="btnApprovedOk1" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <%--   <div id="Hierarchy">
        <div class="row col-lg-12">
            <div class="page_heading">
                <h1 style="margin-top: 20px;">Hierarchy Select
                    <asp:Label ID="Labq" ClientIDMode="Static" runat="server"></asp:Label></h1>
            </div>
        </div>
        <div class="row col-lg-12" style="margin-left: 0px;">
            <table border="0" cellpadding="10" cellspacing="0" id="fdform">
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
                    <th valign="top" id="col77">
                        <button id="btnShowFilter" type='button' onclick="LoadData()">Show Filter </button>
                    </th>
                </tr>

            </table>
        </div>
    </div>--%>

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

    <div id="dialog1" title="Location">
        <p style="font-weight: bold; font-size: 20px;">location.</p>
        <table style="width: 100%;">
            <tr>
                <td class="auto-style1">location :</td>
                <td>
                    <label id="padd"></label>
                </td>
            </tr>
        </table>
        <div id="dvMap" style="height: 450px; width: 780px;">
        </div>
    </div>

    <div class="container mt-3 maxwidht">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="nav-item"><a class="nav-link active" data-toggle="tab" id="DoctorList" href="#content2">Dr. Addition Request From Master List</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" id="DistributorList" href="#content2Tab">Dr. Mapping Request</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" id="DoctorRemove" href="#content2Remove">Doctor Removal Request</a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <div id="content2" class="container tab-pane active maxwidht">
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        My Requested Doctor List
                    </h1>
                    <div class="right">
                        <a id="btnApproveAllAddTolist" name="btnApproveAllAddTolist" type="button" class="btnsalessApprove" style="display: none;">Approve All</a>
                        <a id="btnRejectAllAddTolist" name="btnRejectAllAddTolist" type="button" class="btnsalessReject" style="display: none;">Reject All</a>

                        <a id="btnmylist" name="btnmylist" type="button" href="#popupMyDrList" class="btnsalessApprove">Show My Dr List</a>
                        <a id="showlistybtn" name="showlistybtn" type="button" href="#popup1" class="btnsalessApprove">Show Master List</a>
                    </div>
                </div>

                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>

                <div class="ghierarchy bottom" id="EmployeeDropDown" style="padding: 10px 10px 10px 10px; display: none;">
                    <div class="inner-head">
                        <h2>Filters</h2>
                    </div>
                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <b>Search By Employee : &nbsp;</b>
                            <td>
                                <select id="ddl3p" name="ddl3p" class="styledselect_form_1" onchange="OnChangeddlp6();">
                                    <option value="-1">Select...</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="row" style="display: inline-flex; width: 100% !important;">
                    <div class="col-lg-12 ">
                        <div class="card-text" id="griddiv" style="overflow: hidden; position: relative; overflow-x: auto;"></div>
                    </div>
                </div>

                <div id="popup1" style="z-index: 999" class="overlay">
                    <div class="popup">
                        <h2>Master List</h2>
                        <a class="close" href="#">&times;</a>
                        <br />
                        <label>Filter Doctors by Speciality</label>
                        <select id="ddlSpeciality" name="ddlSpeciality" style="display: none;" class="styledselect_form_1" onchange="specialityselectchange();">
                            <option value="-1">Select...</option>
                        </select>

                        <label>Filter Doctors by City</label>
                        <select id="ddlRelatedCity" name="ddlRelatedCity" class="styledselect_form_1" onchange="cityselectchange();">
                            <option value="-1">Select...</option>
                        </select>
                        <div class="addToListMultiple" style="display: inline-block;">
                            <div class="btn" id="addContainer">
                                <input id="addToListbtn" value="Add To List" name="btnAddToListAll" type="button" class="btnAddMultiple" style="display: none;" />
                            </div>
                        </div>
                        <div id="inlistdivgrid" class="card border-left-primary my-3 p-3 bg-white rounded shadow-sm col-md-12">
                            <div class="card-body">
                                <div class="card-text" id="teritorydetail43"></div>
                                <div class="dshload_back">
                                    <div id="loader2" class=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="popupMyDrList" style="z-index: 999" class="overlay">
                    <div class="popup">
                        <h2>Show My Dr List</h2>
                        <a class="close" href="#">&times;</a>
                        <br />
                        <br />
                        <label>Filter by Month: </label>
                        &nbsp;&nbsp;
                        <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server" ReadOnly="true"></asp:TextBox>
                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                        </asp:CalendarExtender>
                        <br />
                        <br />
                        <div class="UpdateToListMultiple" style="display: inline-block;">
                            <div class="btn" id="UpdateContainer">
                                <input id="UpdateListbtn" value="Add From Update List" name="UpdateListbtn" type="button" class="btnAddMultiple" style="display: none;" />
                            </div>
                        </div>

                        <div class="RemoveToListMultiple" style="display: inline-block;">
                            <div class="btn" id="addContainerRemove">
                                <input value="Remove From List" id="removeListbtn" name="btnAddToListAll" type="button" class="btnsaless" style="display: none;" />
                            </div>
                        </div>
                        <br />
                        <form action="post">
                            <div class="row" style="width: 100%;">
                                <div id="myinlistdivgrid" class="col-md-12" style="width: 100%;">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="divConfirmation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure to delete this record(s)?
                            </div>
                            <div class="divRow">
                                <div class="divColumn">
                                    <div>
                                        <input id="btnYes" name="btnYes" type="button" value="Yes" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnNo" name="btnNo" type="button" value="No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<%--            //--------------------------- tab 2 ----------------------------------------------------------//--%>


            <div id="content2Tab" class="container tab-pane fade maxwidht">
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        My Requested Doctor Distributor List 
                    </h1>
                    <div class="right">
                        <a id="btnApproveUpdateAll" name="btnApproveUpdateAll" type="button" class="btnsalessApprove">Approve All</a>
                        <a id="btnRejectUpdateAll" name="btnRejectUpdateAll" type="button" class="btnsalessReject">Reject All</a>
                    </div>
                </div>

                <div id="divApproveUpdateAllConfirmation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure you want to approve all the selected requests?
                            </div>
                            <div class="divRow">
                                <div class="divColumn">
                                    <div>
                                        <input id="btnApproveUpdateAllYes" name="btnApproveUpdateAllYes" type="button" value="Yes" style="margin-left: 55px;" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnApproveUpdateAllNo" name="btnApproveUpdateAllNo" type="button" value="No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="ApproveUpdateOkDivmessage" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="jqmmsg">
                                <label id="hlabmsg5" name="hlabmsg">
                                </label>
                                <br />
                                <br />
                                <input id="btnUpdateApprovedOk" name="btnApprovedOk" type="button" value="OK" />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="divRequestApproveConfirmation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure you want to approve this request?
                            </div>
                            <div class="divRow">
                                <div class="divColumn">
                                    <div>
                                        <input id="btnRequestYes" name="btnRequestYes" type="button" value="Yes" style="margin-left: 55px;" />
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnRequestNo" name="btnRequestNo" type="button" value="No" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="RequestOkDivmessage" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="jqmmsg">
                                <label id="hlabmsg2" name="hlabmsg2">
                                </label>
                                <br />
                                <br />
                                <input id="btnRequestOk" name="btnRequestOk" type="button" value="OK" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="display: inline-flex; width: 100% !important;">
                    <div class="col-lg-12 ">
                        <div class="card-text" id="griddiv1" style="overflow: hidden; position: relative; overflow-x: auto;"></div>
                    </div>
                </div>
            </div>


            <div id="content2Remove" class="container tab-pane fade maxwidht">
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Removal Requested Doctor List
                    </h1>
                    <div class="right">
                        <a id="btnApproveRemoveAll" name="btnApproveRemoveAll" type="button" class="btnsalessApprove">Remove All</a>
                        <a id="btnRejectRemoveAll" name="btnRejectRemoveAll" type="button" class="btnsalessReject">Reject All</a>
                    </div>
                </div>

                <div class="row" style="display: inline-flex; width: 100% !important;">
                    <div class="col-lg-12 ">
                        <div class="card-text" id="griddivRemove" style="overflow: hidden; position: relative; overflow-x: auto;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
