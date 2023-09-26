<%@ Page Title="New Doctor Request" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="NewDoctorRequest.aspx.cs" Inherits="PocketDCR2.Form.NewDoctorRequest" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
        var $old = jQuery.noConflict();
    </script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jsModalForOldJQ.js" type="text/javascript"></script>
    <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.12.1.js" type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByB0y2Sn129W7f22dS_TQGcWJzc-X8r3A"></script>
    <script type="text/javascript" src="../Scripts/Charts/core.js"></script>
    <script type="text/javascript" src="../Scripts/Charts/charts.js"></script>

    <script type="text/javascript" src="../Scripts/Charts/dataviz.js"></script>
    <script type="text/javascript" src="../Scripts/Charts/animated.js"></script>
    <script src="NewDoctorRequest.js" type="text/javascript"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
    <style type="text/css">
        td, th {
            padding: 10px;
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
        }


        .aprrove {
            background-color: #9acd32 !important;
        }


        .odd {
            background-color: #f6f5f0 !important;
        }

        .even {
            background-color: #efede2 !important;
        }


        .column-options {
            border-collapse: collapse;
            border-bottom: 1px solid #d6d6d6;
        }

            .column-options th, .column-options td {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 90%;
                font-weight: normal;
                color: #434343;
                background-color: #f7f7f7;
                border-left: 1px solid #ffffff;
                border-right: 1px solid #dcdcdc;
            }

            .column-options th {
                font-size: 100%;
                font-weight: normal;
                /* letter-spacing: 0.12em;*/
                text-shadow: -1px -1px 1px #999;
                color: #fff;
                background-color: #2484C6;
                padding: 12px 23px 15px 8px;
                border-bottom: 1px solid #d6d6d6;
            }




            .column-options td {
                text-shadow: 1px 1px 0 #fff;
                padding: 4px 20px 4px 20px;
            }

            .column-options .odd td {
                background-color: #ededed;
            }


            .column-options th:first-child {
                border-top-left-radius: 7px;
                -moz-border-radius-topleft: 7px;
            }

            .column-options th:last-child {
                border-top-right-radius: 7px;
                -moz-border-radius-topright: 7px;
            }

            .column-options th:last-child, .column-options td:last-child {
                border-right: 0px;
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

            .column-options a.buttonlinkred {
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
                background-color: #ff0817;
                border-top: 1px solid #90f2da;
                border-right: 1px solid #00a97f;
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

        .btnnor {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #2484C6;
            border-top: 1px solid #2484C6;
            border-right: 1px solid #2484C6;
            border-bottom: 1px solid #2484C6;
            border-left: 1px solid #2484C6;
            box-shadow: 2px 1px 2px #2484C6;
            margin: 2px 5px 10px 5px;
        }

        .ani:hover {
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

        .txtbox {
            width: 200px;
            height: 20px;
            border-radius: 3px;
            border: 1px solid #CCC;
            padding: 6px;
            font-weight: 200;
            font-size: 11px;
            font-family: Verdana;
            box-shadow: 1px 1px 5px #CCC;
        }

        .ui-dialog-titlebar {
            background: #2484C6;
        }


        .ui-widget-header {
            color: #fff;
        }

        .dataTables_length {
            padding-bottom: 10px;
        }

        .auto-style1 {
            width: 136px;
            font-weight: bold;
        }

        #load {
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

        .firstHeading {
            font-size: 18px;
        }

        .not-active {
            pointer-events: none;
            cursor: default;
        }


        .ga-disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }


        .buttonlinkgreen {
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
          .loader_div{
             position: absolute;
             top: 0;
             bottom: 0%;
             left: 0;
             right: 0%;
             z-index: 99;
             opacity:0.7;
             display:none;
             background: lightgrey url('../../../images/youloadergif.gif') center center no-repeat;
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

        .page_heading h1 {
            float: none !important;
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
    <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>

    <div class="portlet light bordered" style="margin: 10px;">
        <div class="page_heading" style="float: none !important">
            <h1 style="margin-top: 20px;">New Doctor Request</h1>
        </div>
        <br />
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
                        <label class="control-label lableblock">Date :</label>
                        <input type="text" id="datemonth" class="styledselect_form_1" />
                    </div>
                </div>

                <div class="p-1 autowidht">
                    <div class="form-group">
                        <button id="btnSearch" type='button' class="btnnor ani">Show Filter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row" style="display: inline-flex; width: 100% !important;">
        <div class="col-lg-12 ">
            <div class="card-text" id="gridDoctorRequest" style="overflow: hidden; position: relative; overflow-x: auto;"></div>
        </div>
    </div>

    <asp:Label ID="labmsg" runat="server" Text=""></asp:Label>

    <div class="modal fade" id="my_alert" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Alert</h4>
                </div>
                <div class="modal-body">
                    <p id="alert_text"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div id="divApprovalConfirmation" class="modal fade" role="dialog" aria-labelledby="myModaldivApprovalConfirmation" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group no-margin">
                                <label for="field-7" class="control-label">Comments <i>(optional)</i></label>
                                <textarea class="form-control autogrow" id="commentBox" placeholder="Write comments" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 104px;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button id="btnApprovalYes" type="button" _value="0" name="btnYes" aria-hidden="true" class="btn waves-effect waves-light"></button>
                            <button id="btnApprovalAllYes" type="button" _value="0" name="btnYesAll" aria-hidden="true" class="btn waves-effect waves-light"></button>
                            <button id="btnApprovalNo" name="btnNo" data-dismiss="modal" aria-hidden="true" class="btn btn-default waves-effect">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="dialog1" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Doctor Location</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group no-margin">
                                Address :
                                <label for="field-7" id="padd" class="control-label"></label>
                            </div>
                        </div>

                        <div class="col-12">
                            <div id="dvMap" style="height: 450px; width: auto;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div id="dialog2" class="modal fade" role="dialog" aria-labelledby="dialog2" aria-hidden="true" title="Approval Details">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Approval Details</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="AdminDetails" style="margin-top: 10px; margin-bottom: 10px">
                                <label>Admin Approval/Rejection</label>
                                <div class="form-group no-margin">
                                    Status:  
                                    <label for="field-7" id="AdminStatus" class="control-label">Comments </label>
                                </div>
                                <div class="form-group no-margin">
                                    Date:
                                    <label id="AdminDate"></label>
                                </div>
                                <div class="form-group no-margin">
                                    Comment: 
                                    <label id="AdminComment"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="dialog3" class="modal fade" role="dialog" aria-labelledby="dialog3" aria-hidden="true" title="Doctor Details">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h1 class="modal-title">Doctor Details</h1>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="Doctor-Name" class="form-control-label">Doctor Name :</label>
                            <input type="text" id="docname" class="form-control" />
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="field-7" class="form-control-label">Address1 :</label>
                                    <input type="text" id="Address1" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="field-7" class="form-control-label">Address2 :</label>
                                    <input type="text" id="Address2" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label for="field-7" class="form-control-label">City :</label>
                            <input type="text" id="City" class="form-control" />
                        </div>
                        <div class="form-group no-margin">
                            <label for="field-7" class="form-control-label">Country :</label>
                            <input type="text" id="Country" class="form-control" />
                        </div>
                        <div class="form-group no-margin">
                            <label for="field-7" class="form-control-label">Mobile Number 1 :</label>
                            <input type="text" id="MobileNumber1" class="form-control" />
                        </div>
                        <div class="form-group no-margin">
                            <label for="field-7" class="form-control-label">Mobile Number 2 :</label>
                            <input type="text" id="MobileNumber2" class="form-control" />
                        </div>
                        <div class="form-group no-margin">
                            <label for="field-7" class="form-control-label">Designation :</label>
                            <select id="ddlDesignation" name="ddlDesignation" class="form-control"></select>
                            <div class="form-group no-margin">
                                <label for="field-7" class="form-control-label">Speciality :</label>
                                <select id="ddlSpeciality" name="ddlSpeciality" class="form-control"></select>
                            </div>
                            <div class="form-group no-margin">
                                <label for="field-7" class="form-control-label">Qualification :</label>
                                <select id="ddlQualification" name="ddlQualification" class="form-control"></select>
                            </div>
                            <div class="form-group no-margin">
                                <label for="field-7" class="form-control-label">Class :</label>
                                <select id="ddlClass" name="ddlClass" class="form-control"></select>

                            </div>
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <button id="UpdateDetail" name="UpdateDetail" class="btn btn-success">Update</button>

                                    <button id="sqbtnApprovalNo" name="btnNo" data-dismiss="modal" aria-hidden="true" class="btn btn-default waves-effect">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
