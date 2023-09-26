<%@ Page Title="Region To Brick Uploader" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="RegionToBrickRelationData.aspx.cs" Inherits="PocketDCR2.BWSD.RegionToBrickRelationData" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <script src="../assets/global/toastr/toastr.min.js"></script>
    <%--<script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />--%>
    <script type="text/javascript" src="RegionToBrickRelationData.js"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
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
            /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;*/
            width: 254px;
            height: 80px;
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

        .pre-txt {
            padding: 2%;
            text-align: center;
            font-size: 20px;
        }

        .pre-img {
            padding-left: 17px;
        }

        .loading1 {
            /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 22px;*/
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
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <%--progress while uploading--%>
    <div class="pop_box-outer back" id="dialog">
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
    <div class="pop_box-outer back" id="dialog1">
        <div class="loading1" style="font-family: Arial; font-size: larger;">
            <p class="pre-txt">Region to Brick Processing...</p>
            <div class="pre-img">
                <img src="../Images/loading_bar.gif" />
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <Triggers>
        </Triggers>
        <ContentTemplate>
            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                    Region To Brick Relation Data</h1>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" Style="display: none;" />


                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
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
            <div id="Divmessage" class="jqmConfirmation">
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
                            <input id="btnOk" name="btnOk" type="button" value="OK" />
                        </div>
                    </div>
                </div>
            </div>
            <div style="vertical-align: middle; text-align: center; padding: 5px;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
            </div>
            <div class="wrapper-inner" id="id-form">
                <div class="wrapper-inner-left">
                    <div class="ghierarchy bottom">
                        <div class="inner-head">
                            <h2>Region To Brick Relation Data</h2>
                        </div>
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                            <td>
                                <div style="position: relative;">
                                    <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                                    <input type="file" style="display: none" id="sheetUploader" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                </div>

                                <%--<div id="uploadifyDSR" style="position: relative;">
                                    <div id="uploadify_button2" class="customdown">
                                        <span class="uploadify-button-text" style="height: 50px;">UPLOAD FILE </span>
                                    </div>
                                </div>--%>
                            </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
