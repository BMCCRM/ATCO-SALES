<%@ Page Title="Doctor Brick Relation" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DoctorBrickRel.aspx.cs" Inherits="PocketDCR2.Form.DoctorBrickRel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/dataTables.buttons.min.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.flash.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js" type="text/javascript"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.0/js/buttons.html5.min.js" type="text/javascript"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>
    <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>

    <script src="DocBrickRel.js" type="text/javascript"></script>
    <style type="text/css">
        .loading {
            background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;
            width: 254px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -7px 0 0 -125px;
            z-index: 222;
            display: block;
        }

        .loding_box_outer {
            top: 0px;
            left: 0px;
            right: 15px;
            bottom: 0px;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0);
            z-index: 9999;
            width: 94%;
            border-radius: 5px;
            display: none;
            opacity: 0.6;
            background: #e1e1e1;
        }

        .width {
            width: auto !important;
        }

        .justify-content-center .autowidht {
            width: 16.6666% !important;
        }

        .justify-content-start .autowidht {
            width: 16.6666% !important;
        }

        .justify-content-center .autowidht span.select2 {
            width: 100% !important;
        }

        .justify-content-start .autowidht span.select2 {
            width: 100% !important;
        }
        /*Loader*/
        .preloader-it {
            background: #fff;
            position: fixed;
            z-index: 10001;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .loader-pendulums {
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
            display: block;
            margin: 0 auto;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 4rem;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            border: 0.1em solid #e0e3e4;
        }

            .loader-pendulums:before, .loader-pendulums:after {
                content: '';
                width: 1em;
                height: 1em;
                left: -.1em;
                top: -.1em;
                padding: .1em;
                display: block;
                border-radius: 50%;
                position: absolute;
                -webkit-transform-origin: center center;
                transform-origin: center center;
                border: .1em solid;
                border-color: #adb3b6 transparent transparent transparent;
                -webkit-animation: pendulum infinite 2s cubic-bezier(0.3, 1.65, 0.7, -0.65);
                animation: pendulum infinite 2s cubic-bezier(0.3, 1.65, 0.7, -0.65);
            }

            .loader-pendulums:before {
                border-color: #324148 transparent transparent transparent;
                -webkit-animation-delay: -1s;
                animation-delay: -1s;
                -webkit-animation-name: pendulum2;
                animation-name: pendulum2;
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

            .btnnor:hover {
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

        @-webkit-keyframes pendulum {
            from {
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -ms-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(359deg);
                -moz-transform: rotate(359deg);
                -ms-transform: rotate(359deg);
                -o-transform: rotate(359deg);
                transform: rotate(359deg);
            }
        }

        @keyframes pendulum {
            from {
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -ms-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(359deg);
                -moz-transform: rotate(359deg);
                -ms-transform: rotate(359deg);
                -o-transform: rotate(359deg);
                transform: rotate(359deg);
            }
        }

        @-webkit-keyframes pendulum2 {
            from {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            to {
                -webkit-transform: rotate(520deg);
                -moz-transform: rotate(520deg);
                -ms-transform: rotate(520deg);
                -o-transform: rotate(520deg);
                transform: rotate(520deg);
            }
        }

        @keyframes pendulum2 {
            from {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
            }

            to {
                -webkit-transform: rotate(520deg);
                -moz-transform: rotate(520deg);
                -ms-transform: rotate(520deg);
                -o-transform: rotate(520deg);
                transform: rotate(520deg);
            }
        }

        .buttonload {
            background-color: #FFF; /* Green background */
            border: none; /* Remove borders */
            color: #000; /* White text */
            padding: 12px 24px; /* Some padding */
            font-size: 16px; /* Set a font-size */
        }

        /* Add a right margin to each icon */
        .fa {
            margin-left: -12px;
            margin-right: 8px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-xl-12">
        <div id="content">
            <div class="preloader-it" id="preloader" style="display: none;">
                <div class="loader-pendulums"></div>
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
            <asp:HiddenField ID="HiddenField1" runat="server" ClientIDMode="Static" />
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <Triggers>
                </Triggers>
                <ContentTemplate>
                    <div class="page_heading">
                        <h1>Doctor Brick Relation
                        </h1>
                        <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                    </div>
                    <section class="hk-sec-wrapper">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header card-header-action">
                                        <h4>View All</h4>
                                    </div>
                                    <div class="card-body">
                                        <div id="gridDocBrick" style="height: 100px">
                                            <%-- <div class="loader"></div>--%>
                                            <div class="loding_box_outer">
                                                <div class="loading">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="Loding" style="height: 60px; display: none;">
                                <button class="buttonload" style="margin-left: 500px;">
                                    <i class="fa fa-circle-o-notch fa-spin"></i>Loading
                                </button>
                            </div>
                            <div class="container" style="height: 100vh;">
                                <h3>Change Brick City</h3>
                                <div class="row">
                                    <div class="col-md-3" style="margin-top: 20px;">
                                        <p style="font-size: 18px;">DISTRIBUTOR</p>
                                    </div>
                                    <div id="distdiv" class="col-md-3" style="margin-top: 20px;">
                                        <select id="ddldist" class="form-control w-100" disabled="disabled">
                                            <option value="-1">Select Distributor</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3" style="margin-top: 20px;">
                                        <p style="font-size: 18px;">BRICK</p>
                                    </div>
                                    <div id="BrickDiv" class="col-md-3" style="margin-top: 20px;">
                                        <select id="ddlBrick" class="form-control w-100" disabled="disabled">
                                            <option value="-1">Select Brick</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3" style="margin-top: 20px;">
                                        <p style="font-size: 18px;">CITY</p>
                                    </div>
                                    <div id="CityDiv" class="col-md-3" style="margin-top: 20px;">
                                        <select id="ddlCity" class="form-control w-100">
                                            <option value="-1">Select City</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3" style="margin-top: 20px;"></div>
                                    <div class="col-md-3" style="margin-top: 20px;">
                                        <button type="button" class="btn btn-primary" id="btnCancel" style="margin-right: 25px;">Cancel</button>
                                        <button type="button" class="btn btn-primary" id="btnSave" onclick="updateCity()">Submit</button>
                                    </div>
                                </div>
                            </div>
                    </section>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
</asp:Content>
