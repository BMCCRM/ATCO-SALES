<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesAnalysis.aspx.cs" Inherits="PocketDCR2.SalesMod.SalesAnalysis" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />

  



    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.js" type="text/javascript"></script>

    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" />
    <%--<link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />--%>
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" />

    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../assets/NewDashboardAssest/icons/themify-icons/themify-icons.css" rel="stylesheet" />




    <style>
        .button-66 {
            background-color: #0069D9;
            border-radius: 50%;
            /*            box-shadow: rgba(108, 117, 125, .2) 0 -25px 18px -14px inset, rgba(108, 117, 125, .15) 0 1px 2px, rgba(108, 117, 125, .15) 0 2px 4px, rgba(108, 117, 125, .15) 0 4px 8px, rgba(108, 117, 125, .15) 0 8px 16px, rgba(108, 117, 125, .15) 0 16px 32px;
*/ color: white;
            cursor: pointer;
            display: inline-block;
            font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
            /*   padding: 7px 20px;*/
            width: 30px;
            height: 30px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 10px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            margin-bottom: 10px;
            font-weight: bold;
        }

            .button-66:hover {
                /*                box-shadow: rgba(108, 117, 125, .35) 0 -25px 18px -14px inset, rgba(108, 117, 125, .25) 0 1px 2px, rgba(108, 117, 125, .25) 0 2px 4px, rgba(108, 117, 125, .25) 0 4px 8px, rgba(108, 117, 125, .25) 0 8px 16px, rgba(108, 117, 125, .25) 0 16px 32px;
*/ transform: scale(1.05) rotate(-1deg);
            }

        .button-61 {
            background-color: #28A745;
            border-radius: 50%;
            /*            box-shadow: rgba(108, 117, 125, .2) 0 -25px 18px -14px inset, rgba(108, 117, 125, .15) 0 1px 2px, rgba(108, 117, 125, .15) 0 2px 4px, rgba(108, 117, 125, .15) 0 4px 8px, rgba(108, 117, 125, .15) 0 8px 16px, rgba(108, 117, 125, .15) 0 16px 32px;
*/ color: white;
            cursor: pointer;
            display: inline-block;
            font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
            /*   padding: 7px 20px;*/
            width: 30px;
            height: 30px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 10px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            margin-bottom: 10px;
            margin-right: 20px;
            font-weight: bold;
        }

            .button-61:hover {
                /*                box-shadow: rgba(108, 117, 125, .35) 0 -25px 18px -14px inset, rgba(108, 117, 125, .25) 0 1px 2px, rgba(108, 117, 125, .25) 0 2px 4px, rgba(108, 117, 125, .25) 0 4px 8px, rgba(108, 117, 125, .25) 0 8px 16px, rgba(108, 117, 125, .25) 0 16px 32px;
*/ transform: scale(1.05) rotate(-1deg);
            }

        .button-62 {
            background-color: #DC3545;
            border-radius: 50%;
            /*            box-shadow: rgba(108, 117, 125, .2) 0 -25px 18px -14px inset, rgba(108, 117, 125, .15) 0 1px 2px, rgba(108, 117, 125, .15) 0 2px 4px, rgba(108, 117, 125, .15) 0 4px 8px, rgba(108, 117, 125, .15) 0 8px 16px, rgba(108, 117, 125, .15) 0 16px 32px;
*/ color: white;
            cursor: pointer;
            display: inline-block;
            font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
            /*   padding: 7px 20px;*/
            width: 30px;
            height: 30px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 10px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            margin-bottom: 10px;
            margin-left: 50px;
            font-weight: bold;
        }

            .button-62:hover {
                /*                box-shadow: rgba(108, 117, 125, .35) 0 -25px 18px -14px inset, rgba(108, 117, 125, .25) 0 1px 2px, rgba(108, 117, 125, .25) 0 2px 4px, rgba(108, 117, 125, .25) 0 4px 8px, rgba(108, 117, 125, .25) 0 8px 16px, rgba(108, 117, 125, .25) 0 16px 32px;
*/ transform: scale(1.05) rotate(-1deg);
            }

        .lds-ellipsis {
            display: inline-block !important;
            position: relative;
            width: 40px;
            height: 40px;
        }

            .lds-ellipsis div {
                position: absolute;
                top: 15px;
                width: 13px;
                height: 13px;
                border-radius: 50%;
                background: red;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
            }

                .lds-ellipsis div:nth-child(1) {
                    left: 8px;
                    animation: lds-ellipsis1 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(2) {
                    left: 8px;
                    animation: lds-ellipsis2 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(3) {
                    left: 32px;
                    animation: lds-ellipsis2 0.6s infinite;
                }

                .lds-ellipsis div:nth-child(4) {
                    left: 56px;
                    animation: lds-ellipsis3 0.6s infinite;
                }

        @keyframes lds-ellipsis1 {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1);
            }
        }

        @keyframes lds-ellipsis3 {
            0% {
                transform: scale(1);
            }

            100% {
                transform: scale(0);
            }
        }

        @keyframes lds-ellipsis2 {
            0% {
                transform: translate(0, 0);
            }

            100% {
                transform: translate(24px, 0);
            }
        }

        .ti-check {
            color: green;
            font-weight: bold;
            font-size: 18px;
            display: block;
            margin: 0 auto;
        }

        #loader {
            position: fixed;
            width: 100%;
            top: 0;
            height: 100vh;
            z-index: 999999;
            overflow: visible;
            background: #fff url(../assets/NewDashboardAssest/images/preloaders/lo1.gif) no-repeat center center;
        }

        .loader {
            position: fixed;
            width: 100%;
            top: 0;
            height: 70vh;
            z-index: 10000;
            overflow: visible;
            background: #fff url(../assets/NewDashboardAssest/images/preloaders/lo1.gif) no-repeat center center;
        }

        .uploader {
            border: 1px solid #ccc;
            padding: 15px;
        }

            .uploader h2 {
                background: #0069d9;
                color: #fff;
                padding: 15px;
            }

        .custom-file-label {
            border: 1px solid #28a745;
        }

            .custom-file-label::after {
                color: #fff;
                background-color: #28a745;
                border-radius: 0;
            }

        .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
            color: #fff;
            background-color: #0069d9;
            border-color: #0069d9 #0069d9 #fff;
            font-weight: bold;
            font-size: 15px;
        }

        .nav-tabs .nav-link {
            color: #0069d9;
            font-weight: bold;
            font-size: 15px;
        }

            .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {
                border-color: #6c757d #6c757d #dee2e6;
                background-color: #6c757d;
                color: #fff;
            }

        .nav-tabs {
            border-bottom: 1px solid #0069d9;
        }

        input[type=checkbox], input[type=radio] {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }

        .custom-checkbox label {
            font-size: 15px;
            margin-bottom: 0px;
        }

        .UCB {
            border-width: 1px;
            /* border-radius: 10px; */
            padding: 5px;
            border-left: 5px solid #007bff;
            border-right: 1px solid #007bff;
            border-top: 1px solid #007bff;
            border-bottom: 1px solid #007bff;
        }

        .UCB1 {
            /*border-style: inset;
            border-width: 1px;
            border-radius: 10px;*/
            /*padding: 5px;*/
            border-width: 1px;
            /* border-radius: 10px; */
            padding: 5px;
            border-left: 5px solid #007bff;
            border-right: 1px solid #007bff;
            border-top: 1px solid #007bff;
            border-bottom: 1px solid #007bff;
        }
        /*.spinner-border {
            
            display: none;
            
        }*/

        .datepicker.dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            float: left;
            display: none;
            min-width: 160px;
            list-style: none;
            background-color: #ffffff;
            border: 1px solid #ccc;
            border: 1px solid rgba(0, 0, 0, 0.2);
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            -webkit-background-clip: padding-box;
            -moz-background-clip: padding;
            background-clip: padding-box;
            *border-right-width: 2px;
            *border-bottom-width: 2px;
            color: #333333;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 13px;
            line-height: 20px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-sm-12">

                <div class="grid_page_heading SaleValHeading" id="getName">
                    <h3>
                        <img alt="" src="../Images/Icon/Product.png" />
                        Sales Analysis</h3>
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-12">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <center>

                            <button type='button' title="Total Uploaded Files" class="button-66" id='totaldata3'></button>
                        </center>
                        <a class="nav-link active" data-toggle="pill" href="#upload">Upload Distributor Files (Step 1)</a>
                    </li>
                    <li class="nav-item">
                        <center>

                            <button type='button' title="Successfully Uploaded Files" class="button-61" id='totaldata4'></button>

                            <button type='button' title="In-Process Files" class="button-62" id='totaldata5'></button>
                        </center>
                        <a class="nav-link" data-toggle="pill" href="#overall" id="overalld">File Inserted in Temp DB (Step 2) </a>
                    </li>
                    <li class="nav-item">
                        <center>
                            <button type='button' title="Total Error Free Files" class="button-66" id='totaldata6'></button>
                        </center>

                        <a class="nav-link" data-toggle="pill" href="#success" id="errorfreed">Error Free Files (Step 3)</a>
                    </li>
                    <li class="nav-item">
                        <center>
                            <button type='button' title="Total Error-INV Files" class="button-66" id='totaldata8'></button>
                        </center>

                        <a class="nav-link" data-toggle="pill" href="#error" id="erroranalysisfile">Sales Files With Errors-INV (Step 4A)</a>
                    </li>
                    <li class="nav-item">

                        <center>
                            <button type='button' title="Total Error-CUST Files" class="button-66" id='totaldata9'></button>
                        </center>

                        <a class="nav-link" data-toggle="pill" href="#errorCust" id="erroranalysisfileCustomer">Sales Files With Errors-CUST (Step 4B)</a>
                    </li>
                    <li class="nav-item">
                        <center>
                            <button type='button' title="Total Inserted Files" class="button-66" id='totaldata7'></button>
                        </center>

                        <a class="nav-link" data-toggle="pill" href="#done" id="UploadDoneFiles">File Inserted in DB (Step 5)</a>
                    </li>
                </ul>




                <div class="tab-content">



                    <div id="upload" class="container-fluid tab-pane active">
                        <br>
                        <%--<h1 class="text-center">Sales Uploader</h1>--%>
                        <br />
                        <div class="row justify-content-center">


                            <div class="col-md-7">



                                <label class="control-label lableblock">Date :</label>
                                <input type="text" id="txtdate4" class="styledselect_form_1" />



                            </div>


                            <div class="col-lg-7">
                                <div class="wrapper-inner" id="id-form">
                                    <div class="uploader">
                                        <h2>Sales Data Upload</h2>
                                        <div class="custom-file">


                                            <%-- <input type="file" class="custom-file-input" name="file_upload" id="file_upload5" value="txt file upload" onchange="myFunction()" />--%>
                                            <input type="file" class="custom-file-input" name="excelfile_upload" id="excelfile_upload" value="txt file upload" onchange="ExcelUploader()" />
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>

                                    <%-- <div class="wrapper-inner-left">
                                        <div class="ghierarchy bottom">
                                            <div class="inner-head">
                                                <h2>Sales TXT Data Upload</h2>
                                            </div>
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <input type="file" name="file_upload" id="file_upload5" value="txt file upload" onchange="myFunction()" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>--%>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div id="overall" class="container-fluid tab-pane fade">

                        <br>

                        <%-- <div class="row">
                            <div class="col-12 col-sm-12 col-md-5">
                                <input type="date" id="date1" class="date-input form-control"/>
                            </div>
                            <div class="col-12 col-sm-12 col-md-3">
                                <button type="button" class="btn btn-primary custom-btn"><i class="ti-angle-double-right"></i></button>
                            </div>
                        </div>--%>

                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="table-responsive">





                                    <table id="example1" class="display" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>FileName</th>
                                                <th>FilePath</th>
                                                <th>FileType</th>
                                                <th>FileRecords</th>
                                                <th>FileUploadDate </th>
                                                <th>IsProccessed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="success" class="container-fluid tab-pane fade">
                        <br>
                        <%--<div class="row">
                            <div class="col-12 col-sm-12 col-md-5">
                                <input type="date" id="date2" class="date-input form-control"/>
                            </div>
                            <div class="col-12 col-sm-12 col-md-3">
                                <button type="button" class="btn btn-primary custom-btn"><i class="ti-angle-double-right"></i></button>
                            </div>
                            <div class="col-12 col-sm-12 col-md-2 text-right my-auto">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="checkAll" name="example1" />
                                    <label class="custom-control-label" for="checkAll">Check All</label>
                                  </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-2">
                                <button type="button" class="btn btn-primary custom-btn">Process All</button>
                            </div>
                        </div>--%>

                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="example2" class="display" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="error" class="container-fluid tab-pane fade">
                        <br>
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-5">
                                <input type="date" id="txtdate3" class="date-input form-control" />
                            </div>
                            <div class="col-12 col-sm-12 col-md-3">
                                <button type="button" onclick="getList();" class="btn btn-primary custom-btn"><i class="ti-angle-double-right"></i></button>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="example3" class="display" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Distributor Code</th>
                                                <th>Distributor Name</th>
                                                <th>Total Errors</th>
                                                <th>Invoice Date</th>
                                                <th>Raw Data</th>
                                                <th>Error Details</th>
                                                <%--<th>Action</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <%--     <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus1" title="Raw Data Details!"><i class="ti-eye"></i></button></td>
                                                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus2" title="Error Details!"><i class="ti-eye"></i></button></td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                                <center>
                                    <div class="spinner-border text-primary" style="display: none;" id="spinner3"></div>
                                </center>
                            </div>
                        </div>
                    </div>

                    <%--For Customers--%>
                    <div id="errorCust" class="container-fluid tab-pane fade">
                        <br>
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-5">
                                <input type="date" id="txtdate3Cust" class="date-input form-control" />
                            </div>
                            <div class="col-12 col-sm-12 col-md-3">
                                <button type="button" onclick="getListCust();" class="btn btn-primary custom-btn"><i class="ti-angle-double-right"></i></button>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="example3Cust" class="display" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Distributor Code</th>
                                                <th>Distributor Name</th>
                                                <th>Total Errors</th>
                                                <th>Invoice Date</th>
                                                <th>Raw Data</th>
                                                <th>Error Details</th>
                                                <%--<th>Action</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <%--     <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus1" title="Raw Data Details!"><i class="ti-eye"></i></button></td>
                                                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus2" title="Error Details!"><i class="ti-eye"></i></button></td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                                <center>
                                    <div class="spinner-border text-primary" style="display: none;" id="spinner3Cust"></div>
                                </center>
                            </div>
                        </div>
                    </div>
                    <%--For Customers--%>

                    <div id="done" class="container-fluid tab-pane fade">
                        <br>
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-5">
                                <input type="date" id="date4" class="date-input form-control" />
                            </div>
                            <div class="col-12 col-sm-12 col-md-3">
                                <button type="button" class="btn btn-primary custom-btn"><i class="ti-angle-double-right"></i></button>
                            </div>
                        </div>

                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table id="example6" class="display" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>File Name</th>
                                                <th>File Path</th>
                                                <th>File Type</th>
                                                <th>File Records</th>
                                                <th>File Upload Date</th>
                                                <th>File Upload Proccessed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <%--   <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011-04-25</td>
                                                <td>$320,800</td>
                                            </tr>--%>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal" id="myModalcus1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Raw Data</h4>
                    <button type="button" id="btn-closed2" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body" id="modal-body">
                    <div id="modal1data" class="table-responsive">
                        <%-- <table id="example4" class="display" style="width:100%">
                            <thead>
                                
                                      <tr>
                                            <th>Distribute Code </th> 
                                            <th>Document No </th> 
                                            <th>DOC DATE</th> 
                                            <th>CUST Code</th>
                                            <th>CT</th>
                                            <th>Brick Code</th> 
                                            <th>Product Id</th> 
                                            <th>Product</th> 
                                            <th>BATCH NO</th> 
                                              <th>PRICE</th> 
                                               <th>QUANITITY</th> 
                                              <th>BONUS</th> 
                                               <th>Discount Amount</th>
                                               <th>Net Amount</th> 
                                               <th>REASON</th>
                                            </tr>
                            
                            </thead>
                            <tbody>
                       
                            </tbody>
                        </table>--%>
                    </div>
                    <center>
                        <div class="spinner-border text-primary" style="display: none;" id="spinner"></div>
                    </center>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btn-closed1" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal" id="myModalcus2">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Error Details</h4>
                    <button type="button" id="btnclosed2" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div id="modal2data" class="table-responsive">
                        <%-- <table id="example5" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Distributor Code</th>
                                    <th>Distributor Name</th>
                                    <th>Comments</th>
                                    <th>Counts</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>--%>
                    </div>
                    <center>
                        <div class="spinner-border text-primary" style="display: none;" id="spinner1"></div>
                    </center>

                </div>
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btnclosed" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal abc" id="myModalcus3">
        <div class="modal-dialog modal-xl">
            <div class="modal-content" id="myModal3">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">View Details</h4>
                    <button type="button" id="btnclosed3" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div id="modal3data">
                        <%--class="table-responsive"--%>
                        <%--<table id="example7" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Customer Code</th>
                                    <th>Customer Name</th>
                                    <th>Brick Code</th>
                                    <th>Brick Name</th>
                                    <th>Product Code</th>
                                    <th>Product Name</th>
                                    <th>System Product</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                 
                            </tbody>
                        </table>--%>
                    </div>
                    <center>
                        <div class="spinner-border text-primary" style="display: none;" id="spinner5"></div>
                    </center>

                    <%-- <div class="row"><div class="col-sm-6"><button type="button" class="btn btn-primary" title="Action!" onclick="getActionDetails();"/>Action</button></div><div class="col-sm-6"><div class="spinner-border text-primary" style="display:none;" id="spinnerAction"></div></div></div>--%>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="btnclosed4" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade md2" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="text-align: center; display: block;">
                    <h5 class="modal-title" style="font-size: 30px; font-weight: 600; color: green;"
                        id="exampleModalLabel">Alert</h5>

                </div>
                <div class="modal-body" style="text-align: center; font-size: 20px;">
                    Are You Sure to Final Insert!
                </div>
                <div class="modal-footer">
                    <button type="button" style="width: 100px;" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" style="width: 100px;" class="btn btn-primary" id="FinalInsertNew">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/jquery.min.js"></script>
    <%--<script src="../assets/js/bootstrap.min.js"></script>--%>
    <script src="../assets/bootstrap/bootstrap.bundle.min.js"></script>
    <%--    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>--%>

    <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <script type="text/javascript" src="../assets/Select2/select2.full.js"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <%--<script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>--%>
    <%-- <script src="FileGridList.js" type="text/javascript"></script>--%>
    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <%--<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>--%>
    <script type="text/javascript" src="SalesAnalysis.js"></script>

</asp:Content>
