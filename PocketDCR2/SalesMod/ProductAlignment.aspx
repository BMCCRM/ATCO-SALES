<%@ Page Title="Product Alignment" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="ProductAlignment.aspx.cs" Inherits="PocketDCR2.BWSD.ProductAlignment" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <%--  <script src="../assets/js/jquery3.1.0.js"  type="text/javascript"></script>--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>

    <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../assets/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>

    <script type="text/javascript" src="../assets/Select2/select2.full.js"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" />
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <style>
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

        .rounded {
            border-radius: 0.6rem !important;
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

        .color-aliceBlue {
            background-color: aliceblue !important;
        }

        body {
            overflow-y: scroll !important;
        }

        .circleMeUp {
            float: left;
        }

        .border-left-primary {
            border-left: .25rem solid #217ebd !important;
            border-right: .25rem solid #217ebd !important;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#txtMonth').datepicker({
                format: "MM yyyy",
                startView: "months",
                minViewMode: "months",
                orientation: 'top',
                autoclose: true,
                todayHighlight: true
            }).datepicker("setDate", new Date());
        });
    </script>

    <script src="ProductAlignment.js" type="text/javascript"></script>


    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.8.2.js"></script>
    <script type="text/javascript">
        var $old = jQuery.noConflict();
    </script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        .modal-lg {
            width: 1000px;
        }

        .ddlRelatedCity {
            width: 200px !important;
        }

        .ghierarchy {
            width: 1075px;
        }

        .my-inner-head {
            width: 100%;
            background: #217ebd;
            color: #fff;
            line-height: 25px;
            margin-bottom: 15px;
        }
    </style>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading" id="jqmloader">
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="container-fluid">
        <div class="col-sm-12">

            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/Product.png" />
                    Product Alignment</h1>
                <div class="right">
                    <div class="btn" style="float: right;" id="ApproveAll">
                        <a id="btnApproveAll" name="btnApproveAll" type="button" class="btn btn-info" style="display: none;">Approve All</a>
                    </div>
                    <div class="btn" style="float: right;" id="showlistybtn">
                        <input id="btnlastvisits" name="btnlastvisits" type="button" class="btn btn-info " value="Show Master List" />
                    </div>
                </div>
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
            </div>

            <div id="divProductMapping" class="modal fade" role="dialog" aria-labelledby="divProductMapping" aria-hidden="true" data-backdrop="static" title="Product Mapping">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h1 class="modal-title">Product Mapping</h1>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Product" class="form-control-label">System Product :</label>
                                                <select id="ddlAllProduct" name="ddlAllProduct" class="styledselect_form_1">
                                                    <option value="-1" selected="selected">Select Product</option>
                                                </select>

                                            </div>
                                        </div>
                                        <%-- <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="DistProduct" class="form-control-label"> Distributor Product :</label>
                                                    <input id="distProduct" name="distProduct" class="form-control" />
                                                </div>
                                            </div>--%>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btnRemoveAlign" name="btnRemoveAlign" type="button" class="btn btn-success">Remove Map</button>
                            <button id="btnAlignProduct" name="btnAlignProduct" type="button" class="btn btn-success">Align Map</button>
                            <button id="btnAlignCancel" name="btnAlignCancel" type="button" class="btn btn-default">Close</button>
                        </div>
                    </div>
                </div>

            </div>




            <div>
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
            </div>
            <div class="ghierarchy bottom" id="EmployeeDropDown" style="padding: 10px;">
                <div class="my-inner-head">
                    <h2>Filters</h2>
                </div>
                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                    <tr>

                        <%--<td><b>Search By Month : &nbsp;</b></td>
                        --%><td>
                            <input type="text" id="txtMonth" name="txtMonth" placeholder="Enter Month" />
                           </td>

                        <td style="width: 125px;"><b>Search By Distributor : &nbsp;</b></td>

                        <td>
                            <select id="ddlDistributor" name="ddlDistributor" class="styledselect_form_1" onchange="OnChangeddlp6();">
                                <option value="-1">Select...</option>
                            </select>
                        </td>

                        <td style="width: 90px;"><b>Map/Un-Map : &nbsp;</b></td>

                        <td>
                            <input id="chkActive" name="chkActive" type="checkbox" value="Active" onchange="OnChangeIsMap();" />

                        </td>
                        <th valign="top" id="ThDownload">
                            <input id="btnDownloadExcel" type="button" class="btnnor ani" onclick="DownloadExcel()" value="Download Excel For Product Map" />
                        </th>
                        <th valign="top" id="ThUpload">
                            <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                            <input type="file" style="display: none" id="sheetUploader" onselect="uploadFile();"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </th>
                    </tr>



                </table>
            </div>


            <div class="row">
            </div>


            <div class="row">
                <div id="containerteritory1" class="card border-left-primary my-3 p-3 bg-white rounded shadow-sm col-md-12">
                    <div class="card-body" style="margin-top: 10px;">
                        <div id="divProductGrid" class="col-sm-12"></div>
                        <div class="dshload_back">
                            <div id="loader2" class=""></div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    </div>

</asp:Content>
