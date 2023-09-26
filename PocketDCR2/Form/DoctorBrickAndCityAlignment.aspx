<%@ Page Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DoctorBrickAndCityAlignment.aspx.cs" Inherits="PocketDCR2.Form.DoctorBrickAndCityAlignment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />--%>

    <!-- Select2 CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
    <!-- Select2 CSS -->

    <!-- Sweet Alert CSS -->
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <!-- Sweet Alert CSS -->

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script>
        $i = jQuery.noConflict();
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <%--<link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />--%>

    <style type="text/css">
        .lblPadding {
            padding: 0px 0px 1ch 0px;
        }

        .restat {
            position: absolute;
            width: 100%;
            top: 0;
            height: 100vh;
            z-index: 999999;
            overflow: visible;
            background: #fff url(../../NewDashboardAssest/images/preloaders/lo1.gif) no-repeat center center;
        }

        .modal-open .modal {
            overflow-y: auto;
        }

        .modal-fill .modal-content {
            background: rgba(255, 255, 255, 0.97);
            width: 100%;
            max-width: 900px;
            box-shadow: none;
            top: 150px !important;
            max-height: 400px !important;
            overflow-x: scroll !important;
        }

        .hiddenRow {
            padding: 0 !important;
        }

        .select2-container {
            width: 100% !important;
        }

        .fade:not(.show) {
            opacity: 1;
        }

        .show {
            display: block !important;
        }

        .fade {
            opacity: 1;
        }

        input.select2-search__field {
            width: 100% !important;
            padding: 0px 10px !important;
            line-height: 28px !important;
        }

        .theme-danger .select2-container--default .select2-selection--multiple .select2-selection__choice {
            background-color: #ed3237;
            border-color: #eb3237;
        }

        .select2-container--default .select2-selection--multiple .select2-selection__rendered {
            box-sizing: border-box;
            list-style: none;
            margin: 0;
            padding: 0 5px;
            width: 100%;
            display: block;
        }

        .theme-danger .select2-container--default.select2-container--focus .select2-selection--multiple {
            border-color: #ed3237 !important;
        }

        .content-wrapper {
            min-height: 100%;
            -moz-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            border-radius: 0;
            margin-right: 0px;
            margin-left: 0px;
        }

        .form-group {
            margin-bottom: 0rem;
        }

        .theme-danger .bg-primary {
            background-color: #17b3a3 !important;
            color: #ffffff;
        }

        .theme-danger .border-primary {
            border-color: #17b3a3 !important;
        }

        .theme-danger .bg-primary {
            background-color: #17b3a3 !important;
            color: #ffffff;
        }

        div#basic-pie {
            margin: -15px 0px 0px 0px;
        }

        .highcharts-figure, .highcharts-data-table table {
            min-width: 310px;
            max-width: 500px;
            margin: 0em auto;
        }

        .highcharts-data-table table {
            font-family: Verdana, sans-serif;
            border-collapse: collapse;
            border: 1px solid #EBEBEB;
            margin: 10px auto;
            text-align: center;
            width: 100%;
            max-width: 500px;
        }

        .highcharts-data-table caption {
            padding: 1em 0;
            font-size: 1.2em;
            color: #555;
        }

        .highcharts-data-table th {
            font-weight: 600;
            padding: 0.5em;
        }

        .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
            padding: 0.5em;
        }

        .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
            background: #f8f8f8;
        }

        .highcharts-data-table tr:hover {
            background: #f1f7ff;
        }

        .table > thead > tr > td, .table > thead > tr > th {
            border-top: 1px solid #f3f6f9 !important;
            padding: 1rem 1rem !important;
            text-align: center !important;
            vertical-align: middle !important;
        }

        .box {
            position: relative;
            margin-bottom: 20px;
            width: 100%;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 10px;
        }

        .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto, .col-xxl-1, .col-xxl-2, .col-xxl-3, .col-xxl-4, .col-xxl-5, .col-xxl-6, .col-xxl-7, .col-xxl-8, .col-xxl-9, .col-xxl-10, .col-xxl-11, .col-xxl-12, .col-xxl, .col-xxl-auto, .col-xxxl-1, .col-xxxl-2, .col-xxxl-3, .col-xxxl-4, .col-xxxl-5, .col-xxxl-6, .col-xxxl-7, .col-xxxl-8, .col-xxxl-9, .col-xxxl-10, .col-xxxl-11, .col-xxxl-12, .col-xxxl, .col-xxxl-auto {
            position: relative;
            width: 100%;
            padding-right: 5px;
            padding-left: 5px;
        }

        .box {
            position: relative;
            margin-bottom: 10px;
        }

        .fixed .content-wrapper {
            padding-top: 0px;
        }

        .select2-container .select2-selection--single {
            box-sizing: border-box;
            cursor: pointer;
            display: block;
            height: 34px;
        }


        .select2-container--default .select2-selection--multiple .select2-selection__rendered li {
            list-style: none;
            width: 100%;
        }

        .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
            color: #fff;
        }

        .MGLoader-Wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2999;
        }

        .MGLoader-Wrapper {
            background-color: rgb(238 238 238);
        }

        .Tblloader {
            position: relative;
            min-height: 350px;
        }

        .Tblloader1 {
            position: relative;
            min-height: 200px;
        }

            .Tblloader1 .MGLoader {
                height: 180px;
            }

        .MGLoader {
            background-color: transparent;
        }

        .MGLoader {
            display: block;
            position: relative;
            margin: 0px auto;
            width: 150px;
            height: 350px;
            border-radius: 50%;
            z-index: 3999;
            background: url(../Images/pre.svg);
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            -webkit-animation-name: spin;
            -webkit-animation-duration: 4000ms;
            -webkit-animation-iteration-count: infinite;
            -webkit-animation-timing-function: linear;
            -moz-animation-name: spin;
            -moz-animation-duration: 4000ms;
            -moz-animation-iteration-count: infinite;
            -moz-animation-timing-function: linear;
            -ms-animation-name: spin;
            -ms-animation-duration: 4000ms;
            -ms-animation-iteration-count: infinite;
            -ms-animation-timing-function: linear;
            animation-name: spin;
            animation-duration: 4000ms;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        @-ms-keyframes spin {
            from {
                -ms-transform: rotate(0deg);
            }

            to {
                -ms-transform: rotate(360deg);
            }
        }

        @-moz-keyframes spin {
            from {
                -moz-transform: rotate(0deg);
            }

            to {
                -moz-transform: rotate(360deg);
            }
        }

        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }


        .fade-in-image {
            animation: fadeIn 5s;
            -webkit-animation: fadeIn 5s;
            -moz-animation: fadeIn 5s;
            -o-animation: fadeIn 5s;
            -ms-animation: fadeIn 5s;
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @-moz-keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @-webkit-keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @-o-keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @-ms-keyframes fadeIn {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        table.dataTable {
            width: 100% !important;
        }

            table.dataTable td.dataTables_empty {
                text-align: center !important;
                column-span: all !important;
            }

        .nav-tabs {
            font-size: large;
            border-bottom: 1px solid #ddd;
        }

            .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
                color: #217ebd !important;
                background-color: #fff;
                border-color: #217ebd #217ebd #ffffff;
            }

        .nav-tabs {
            font-size: large;
            border-bottom: 1px solid #217ebd;
        }

            .nav-tabs .nav-link {
                color: black !important;
            }

                .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
                    border-color: #217ebd #217ebd #217ebd;
                }

        .dataTables_wrapper .dataTables_filter input {
            margin-left: 0.5em !important;
            border: 1px solid #217ebd !important;
            border-radius: 10px !important;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
            color: #fff !important;
            border: 1px solid #217ebd !important;
            background: linear-gradient(to bottom, #217ebda3 0%, #217ebd 100%) !important;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
            color: #fff !important;
            border: 1px solid #217ebd !important;
            background: linear-gradient(to bottom, #217ebda3 0%, #217ebd 100%) !important;
        }

        .btn-blueedit {
            background-color: #217ebd;
            border-color: #217ebd;
            color: white;
            padding: 2px 8px;
            border-radius: 5px;
            border: 1px solid #217ebd;
        }

        .btn-Rededit {
            background-color: #d51e1e;
            border-color: #d51e1e;
            color: white;
            padding: 2px 8px;
            border-radius: 5px;
            border: 1px solid #d51e1e;
        }

        .modal-header {
            padding: 15px;
            border-bottom: 1px solid #e5e5e5;
            background: #217ebd;
            color: white;
        }

        .table > thead > tr > td, .table > thead > tr > th {
            border-top: 1px solid #f3f6f9 !important;
            padding: 1rem 1rem !important;
            text-align: center !important;
            vertical-align: middle !important;
        }

        .btn-primary {
            color: #fff;
            background-color: #337ab7 !important;
            border-color: #337ab7 !important;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Modal -->
    <div class="modal" id="DoctorBrickAndCityAlignmentModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Brick And City</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="color: white;">&times;</span>
                    </button>
                </div>

                <div class="modal-body" style="padding: 0rem 1.5rem !important;">
                    <div class="" style="display: inline;">
                        <div class="box-body" style="padding: 0.5rem;">
                            <div class="row">
                                <div class="col-md-6 p-2" style="border-right: 1px solid #8080807a;">
                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Distributor</label>
                                                    <select id="ddlDistributorUpdate2" name="ddlDistributorUpdate2" class="js-states form-control" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Brick</label>
                                                    <select id="ddlBrickUpdate2" name="ddlBrickUpdate" class="js-states form-control" onchange="" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Brick City</label>
                                                    <select id="ddlCityUpdate2" name="ddlCityUpdate" class="js-states form-control" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g4">
                                                    <label class="my-0 font-weight-700 lblPadding">Speciality</label>
                                                    <select id="ddlSpeciality2" name="ddlSpeciality" class="js-states form-control" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g5">
                                                    <label class="my-0 font-weight-700 lblPadding">Designation</label>
                                                    <select id="ddlDesignation2" name="ddlDesignation" class="js-states form-control" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g5">
                                                    <label class="my-0 font-weight-700 lblPadding">Qualification</label>
                                                    <select id="ddlQualification2" name="ddlQualification" class="js-states form-control" disabled="disabled">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label for="message-text" class="col-form-label lblPadding">Address</label>
                                                    <textarea class="form-control" id="txtAddress2" disabled="disabled"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 p-2">
                                    <input type="text" class="form-control" id="txtDoctorID" style="display: none;" />
                                    <input type="text" class="form-control" id="txtStatus" style="display: none;" />
                                    <input type="text" class="form-control" id="txtPK_ID" style="display: none;" />

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Distributor</label>
                                                    <select id="ddlDistributorUpdate" name="ddlDistributorUpdate" class="js-states form-control">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Brick</label>
                                                    <select id="ddlBrickUpdate" name="ddlBrickUpdate" class="js-states form-control" onchange="">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label class="my-0 font-weight-700 lblPadding">Brick City</label>
                                                    <select id="ddlCityUpdate" name="ddlCityUpdate" class="js-states form-control">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g4">
                                                    <label class="my-0 font-weight-700 lblPadding">Speciality</label>
                                                    <select id="ddlSpeciality" name="ddlSpeciality" class="js-states form-control">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g5">
                                                    <label class="my-0 font-weight-700 lblPadding">Designation</label>
                                                    <select id="ddlDesignation" name="ddlDesignation" class="js-states form-control">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group" id="g5">
                                                    <label class="my-0 font-weight-700 lblPadding">Qualification</label>
                                                    <select id="ddlQualification" name="ddlQualification" class="js-states form-control">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12" style="padding: 0px 5px;">
                                        <div class="box-body" style="padding: 1ch;">
                                            <div class="align-items-start">
                                                <div class="form-group">
                                                    <label for="message-text" class="col-form-label lblPadding">Address</label>
                                                    <textarea class="form-control" id="txtAddress"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button id="btnUpdate" type="button" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->

    <!-- Main content -->
    <div id="gridLoader">
        <section class="content">
            <div class="box" style="margin-bottom: 10px;">
                <div class="box-body" style="padding: 1rem 1rem 0rem 1rem;">
                    <div class="row">
                        <%--     <div class="col-sm-2" style="padding: 0px 5px;">
                        <div class="box" style="margin-bottom: 10px; box-shadow: 0 0 30px 0 rgb(59 48 72 / 12%);">
                            <div class="box-body" style="padding: 1rem;">
                                <div class="align-items-start">
                                    <div class="form-group" id="g1">
                                        <label class="my-0 font-weight-700">City</label>
                                        <select id="ddlCity" name="ddlCity" class="js-states form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>

                        <div class="col-sm-3" style="padding: 0px 5px;">
                            <div class="box" style="margin-bottom: 10px; box-shadow: 0 0 30px 0 rgb(59 48 72 / 12%);">
                                <div class="box-body" style="padding: 1rem;">
                                    <div class="align-items-start">
                                        <div class="form-group" id="g2">
                                            <label class="my-0 font-weight-700 lblPadding">Distributor</label>
                                            <select id="ddlDistributor" name="ddlDistributor" class="js-states form-control">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <%--<div class="col-sm-2" style="padding: 0px 5px;">
                        <div class="box" style="margin-bottom: 10px; box-shadow: 0 0 30px 0 rgb(59 48 72 / 12%);">
                            <div class="box-body" style="padding: 1rem;">
                                <div class="align-items-start">
                                    <div class="form-group" id="g3">
                                        <label class="my-0 font-weight-700">Brick</label>
                                        <select id="ddlBrick" name="ddlBrick" class="js-states form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--%>

                        <div class="col-sm-2" style="padding: 0px 5px;">
                            <div class="box" style="margin-bottom: 10px; box-shadow: 0 0 30px 0 rgb(59 48 72 / 12%);">
                                <div class="box-body" style="padding: 1rem 0rem;">
                                    <div class="d-block align-items-start">
                                        <div class="form-group">
                                            <label class="my-0 font-weight-700 lblPadding" style="visibility: hidden;">asdasdasdasd</label>
                                            <input type="button" id="btnResult" name="ShowResult" value="Show Result" class="btn btn-sm btn-rounded btn-success" style="width: 100%; display: block; margin: 0px auto;" />
                                            <%--<button id="btnResult" type="submit" onclick="OnshowResultClick()">Show Result</button>--%>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Doctor Master Data</a>
                            <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Doctor Request in Process</a>
                        </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" style="width: 100% !important;">
                            <div class="row">
                                <div class="col-md-12 col-12">
                                    <div class="box box-solid" style="padding: 0px;">
                                        <div class="box-body" style="padding: 0.5rem 1.5rem;">
                                            <div class="row Tblloader">
                                                <div class="col-sm-12 mt-1 mb-1">
                                                    <div class="table-responsive" id="griddiv">
                                                        <table id='Grid_DoctorBrickAndCityAlignment' class='table b-1 table-striped table-hover dt-responsive dataTable no-footer dtr-inline collapsed'>
                                                            <thead>
                                                                <tr style='background-color: #217ebd; color: white;'>
                                                                    <th>Doctor Code</th>
                                                                    <th>Doctor Name</th>
                                                                    <th>Designation</th>
                                                                    <th>Speciality</th>
                                                                    <th>Qualification</th>
                                                                    <th>Address</th>
                                                                    <th>Doctor City</th>
                                                                    <th>Distributor Code</th>
                                                                    <th>Distributor Name</th>
                                                                    <th>Brick Code</th>
                                                                    <th>Brick Name</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <%--<tbody id='values'></tbody>--%>
                                                        </table>
                                                    </div>

                                                    <div id="griddivMGLW" class="">
                                                        <div id="griddivMGL" class=""></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" style="width: 100% !important;">
                            <div class="row">
                                <div class="col-md-12 col-12">
                                    <div class="box box-solid" style="padding: 0px;">
                                        <div class="box-body" style="padding: 0.5rem 1.5rem;">
                                            <div class="row Tblloader">
                                                <div class="col-sm-12 mt-1 mb-1">
                                                    <div class="table-responsive" id="griddiv1">
                                                    </div>

                                                    <div id="griddiv1MGLW" class="">
                                                        <div id="griddiv1MGL" class=""></div>
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
        </section>
    </div>
    <!-- /.content -->

    <script src="DoctorBrickAndCityAlignment.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        $2 = jQuery.noConflict();
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
    <%--<script src="../assets/js/jquery.dataTables.min.js"></script>--%>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/r/dt/dt-1.10.22/datatables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/r/dt/dt-1.10.22/datatables.min.js"></script>
    <script type="text/javascript" src="https://editor.datatables.net/extensions/Editor/js/dataTables.editor.min.js"></script>
</asp:Content>
