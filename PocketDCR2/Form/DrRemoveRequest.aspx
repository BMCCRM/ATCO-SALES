<%@ Page Title="Doctor Removal Process" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DrRemoveRequest.aspx.cs" Inherits="PocketDCR2.Form.DrRemoveRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script type="text/javascript">
        var $old = jQuery.noConflict();
    </script>

    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>

    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jsModalForOldJQ.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="DrRemoveRequest.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/width-full.css" rel="stylesheet" />
    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>


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
        /*table.dataTable tbody tr .even{background-color: #63432a}*/





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
            padding: 5px;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .btnsaless {
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

            .btnsaless:hover {
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
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 80%;
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
    </style>
    <style type="text/css">
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
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Removal Requested Doctor List</h1>
                    <div class="right">
                        <div class="btn" id="ApproveAll">
                            <a id="btnApproveAll" name="btnApproveAll" type="button" class="btnsaless" style="display:none;">Remove All</a>
                        </div>
                        <div class="btn" id="showlistybtn">
                            <a id="btnlastvisits" name="btnlastvisits" type="button" href="#popup1" class="btnsaless">Show My Dr List</a>
                        </div>
                    </div>
                </div>

                <div id="divClassIdAndFrequency" class="jqmConfirmation">
                    <div class="jqmTitle">
                      Are you sure you want to approve all the selected removal requests?
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                           
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


                 <div id="divApproveAllConfirmation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure you want to approve all the selected removal requests?
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
                                Are you sure you want to approve this removal request?
                            </div>
                            <div class="divRow">
                                <div class="divColumn">
                                    <div>
                                        <input id="btnApproveYes" name="btnApprove" type="button" value="Yes" style="margin-left: 55px;" />
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



                <div id="divAddtoListConfirmation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Confirmation Window
                    </div>
                    <div class="divEdit">
                        <div class="divTable">
                            <div class="divRow">
                                Are you sure you want to remove this Dr. to list?
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


                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div class="ghierarchy bottom" id="EmployeeDropDown" style="padding: 10px 10px 10px 10px; display:none;">
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

                <div class="divgrid" id="griddiv" style="border-bottom: 1px solid #e3e2de; background-color: #f6f5f0; border-top: 1px solid #e3e2de; overflow: hidden; position: relative; overflow-x: auto;">
                    <table id="grid-basic" class="dataTables_info dataTables_filter" style="border: 1px solid #616262;"></table>
                </div>


                <div class="outerBox" id="outerboxid">

                    <div id="popup1" style="z-index: 999" class="overlay">
                        <div class="popup">
                            <h2>My Doctor List</h2>
                            <a class="close" href="#">&times;</a>
                            <br />
                            <div class="addToListMultiple">
                                <div class="btn" id="addContainer">
                                    <input value="Remove From List" id="removeListbtn" name="btnAddToListAll" type="button" class="btnsaless" style="display: none;"/>
                                </div>
                            </div>

                            <br />
                            <div class="content" style="overflow-x: auto; overflow-y: auto;">
                                <div id="inlistdivgrid" class="divgrid" style="border-bottom: 1px solid #e3e2de; background-color: #f6f5f0; border-top: 1px solid #e3e2de; overflow-x: auto; overflow-y: auto;">
                                </div>
                            </div>
                        </div>
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

               <script src="../assets/js/jquery.dataTables.min.js"></script>
                <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />


            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

</asp:Content>
