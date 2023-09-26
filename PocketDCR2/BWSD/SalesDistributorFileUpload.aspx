<%@ Page Title=" Distributor File Upload Status" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="SalesDistributorFileUploadFileUpload.aspx.cs" Inherits="PocketDCR2.Form.SalesDistributorFileUpload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/clockface/css/clockface.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.12.1.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <script src="SalesDistributorFileUpload.js" type="text/javascript"></script>

    <style type="text/css">
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

            
        .input-group{
            display: flex;
           }

        .input-group > #txtDate {
          flex-grow: 2
        }

        .input-group > #addButton {
          flex-grow: 1
        }

            .column-options th {
                font-size: 100%;
                font-weight: normal;
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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="height: 15px"></div>
    <div class="page-head">
        <div class="container-fluid">
            <div class="page-title">
                <h1><small>Distributor File Upload Status</small> </h1>
            </div>
        </div>
    </div>

    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <div class="container-fluid">
            <div class="portlet light bordered">
                <div class="col-sm-1 col-md-4"></div>
                 <div class="col-sm-1 col-md-4">
                   <label id="Label1" style="font-size: 18px; display: inline;" class="control-label">Invoice Month:</label> 
                   <input id="txtDate" class="form-control input-sm w-25 d-inline-block" style="display: inline; width:  120px;" type="text" />
                   <button type="button" id="btnInvMonth" style="text-align: center; padding: 5px 10px !important;  margin-left: 6px" class="btn btn-primary input-sm w-25 d-inline-block">Filter Month</button>
                </div>
               <div class="col-sm-1 col-md-4"></div>
                <div id="table" class="form-body">
                    <div class="row">
                        <div id="divdistrib" class="col-sm-12"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
