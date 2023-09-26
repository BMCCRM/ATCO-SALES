<%@ Page Title="Sales Customer" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesClient.aspx.cs" Inherits="PocketDCR2.BWSD.SalesClient" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.12.1.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../assets/global/toastr/toastr.min.js"></script>

        <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>

    <script src="SalesClient.js" type="text/javascript"></script>
    <style type="text/css">
        .table td, .table th {
            font-size: 12px;
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
    <div style="height: 15px"></div>
    <div class="page-head">
        <div class="container-fluid">

            <div class="page-title">
                <h1><small>Sales Customer</small> </h1>
            </div>
        </div>
    </div>


    <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />

        <div class="container-fluid">

           <%-- <div class="portlet light bordered">--%>
            <br />
                    <div class="ghierarchy bottom" id="EmployeeDropDown" style="padding: 10px; margin-left: 10px;margin-top: 10px;">
                        <div class="my-inner-head">
                            <h2>Filters</h2>
                        </div>
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                            <tr>

                                <td><b>Select Distributor :</b></td>
                                <td style="width:250px;">
                                    <select id="ddlDistributor" name="ddlDistributor" class="form-control">
                                        <option value="-1">Select...</option>
                                    </select>

                                </td>


                                <td ><b>&nbsp; Select Brick : &nbsp;</b></td>

                                <td >
                                    <select id="ddlBrickFilter" name="ddlBrick" class="form-control">
                                        <option value="-1">Select...</option>
                                    </select>
                                </td>


                                <td>
                                    <input id="btnGenerate" type="button" class="btnnor ani" onclick="GetClientData()" value="Show Result" />

                                </td>
                                <%--         <th valign="top" id="ThDownload">
                               <input id="btnDownloadExcel" type="button" class="btnnor ani" onclick="DownloadExcel()" value="Download Excel For Product Map" />
                        </th>
                        <th valign="top" id="ThUpload">
                            <input type="button" value="Upload Sheet" class="btnnor ani" onclick="$('#sheetUploader').click()" />
                            <input type="file" style="display: none" id="sheetUploader" onselect="uploadFile();"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </th>--%>
                            </tr>



                        </table>
                    </div>
          <%--      </div>--%>
                <%--   <div id="hirarchyf" class="form-body">
                    <div class="row">
                        <b>Select Distributor : &nbsp;</b>
                        <select id="ddlDistributor" name="ddlDistributor" class="styledselect_form_1">
                            <option value="-1">Select...</option>
                        </select>
                        &nbsp;
                        <b>Select Brick : &nbsp;</b>
                        <select id="ddlBrickFilter" name="ddlBrick" class="styledselect_form_1">
                            <option value="-1">Select...</option>
                        </select>
                        &nbsp;
                              <input id="btnGenerate" type="button" class="btnnor ani" onclick="GetClientData()" value="Generate Data" />
                    </div>
                </div>--%>
        <div class="portlet light bordered">

            <div id="hirarchyg" class="form-body">
                <div id="tableg" class="form-body">
                    <div class="row">
                        <div id="grid" class="col-sm-12 ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="portlet light bordered">
            <div id="hirarchy" class="form-body">

                <div id="table" class="form-body">
                    <h4>Add New Customer</h4>
                    <div class="row">

                        <div class="form-horizontal col-sm-6 ">
                            <div class="form-group">
                                <div class="col-sm-6 ">

                                    <label id="Label1" class="col-md-3 control-label">Region :</label>
                                    <div class="col-md-9">
                                        <select id="ddl1" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="col-sm-6 ">

                                    <label id="Label2" class="col-md-3 control-label">Sub Region :</label>
                                    <div class="col-md-9">
                                        <select id="ddl2" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-6 ">

                                    <label id="Label3" class="col-md-3 control-label">District :</label>
                                    <div class="col-md-9">
                                        <select id="ddl3" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="col-sm-6 ">

                                    <label id="Label4" class="col-md-3 control-label">City :</label>
                                    <div class="col-md-9">
                                        <select id="ddl4" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-6 ">

                                    <label id="Label4dist" class="col-md-3 control-label">Distributor :</label>
                                    <div class="col-md-9">
                                        <select id="ddlDistributors" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>

                                </div>
                                <div id="colbrick" class="col-sm-6 ">
                                    <label id="Labelbrick" class="col-md-3 control-label">Brick :</label>
                                    <div class="col-md-9">
                                        <select id="ddlbrick" class="form-control input-sm">
                                            <option value="-1">Select..</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <div id="colcode" class="col-sm-6 ">
                                    <label id="Labelcode" class="col-md-3 control-label">Code :</label>
                                    <div class="col-md-9">
                                        <input id="clientcode" class="form-control input-sm" />
                                    </div>
                                </div>

                                <div id="colname" class="col-sm-6 ">
                                    <label id="Labelname" class="col-md-3 control-label">Name :</label>
                                    <div class="col-md-9">
                                        <input id="clientName" class="form-control input-sm" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-6 ">
                                    <label id="Lab" class="col-md-3 control-label"></label>
                                    <input class="btn blue" id="btnSubmit" type="button" onclick="SaveData(); return false;" value=" Submit " />
                                    <input class="btn blue" id="btnUpdate" type="button" onclick="UpdateData(); return false;" value=" Update " style="display: none;" />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
</asp:Content>
