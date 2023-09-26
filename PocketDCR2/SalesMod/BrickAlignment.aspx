<%@ Page Title="Brick Aligment" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="BrickAlignment.aspx.cs" Inherits="PocketDCR2.BWSD.BrickAlignment" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
  <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
<%--    <script src="../assets/js/jquery3.1.0.js" type="text/javascript"></script>

    $2.noConflict();--%>
    <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../assets/js/jquery.dataTables.min.js"></script>

    <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />

    <script src="../assets/js/bootstrap-datepicker.min.js"></script>

    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/Sweetalert/sweetalert2.min.js"></script>

    <script src="../assets/Select2/select2.full.js"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" />

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

    <script src="BrickAlignment.js" type="text/javascript"></script>


    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>
    <style type="text/css">
        .modal-lg {
            width: 1000px;
        }

        .ddlRelatedCity {
            width: 200px !important;
        }

        .ghierarchy {
            width: 870px;
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
    <div class="container-fluid">
        <div class="col-sm-12">

            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/Product.png" />
                    Brick Alignment</h1>
                <div class="right">
                    <div class="btn" style="float: right; display:none;" id="ApproveAll">
                        <a id="btnApproveAll" name="btnApproveAll" type="button" class="btn btn-info" style="display: none;">Approve All</a>
                    </div>
                    <div class="btn" style="float: right; display:none;" id="showlistybtn">
                        <input id="btnlastvisits" name="btnlastvisits" type="button" class="btn btn-info " value="Show Master List" />
                    </div>
                     <div class="btn" style="float: right; display: none;" id="btnBrick">
                        <input id="btnAddNewBrick" name="btnAddNewBrick" type="button" class="btn btn-info " value="Add New Brick" />
                    </div>

                </div>
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
            </div>

            <div id="divBrickMapping" class="modal fade" role="dialog" aria-labelledby="divBrickMapping" aria-hidden="true" data-backdrop="static" title="Brick Mapping">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h1 class="modal-title">Brick Mapping</h1>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="ddlAllDist" class="form-control-label">System Distributor :</label>
                                                <select id="ddlAllDist" name="ddlAllDist" class="form-control selectauto">
                                                    <option value="-1" selected="selected">Select Distributor</option>
                                                </select>

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Brick" class="form-control-label">System Brick :</label>
                                                <select id="ddlAllBrick" name="ddlAllBrick" class="form-control selectauto">
                                                    <option value="-1" selected="selected">Select Brick</option>
                                                </select>

                                            </div>
                                        </div>
                               
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btnAlignBrick" name="btnAlignBrick" type="button" class="btn btn-success">Align Map</button>
                            <button id="btnAlignCancel" name="btnAlignCancel" type="button" class="btn btn-default">Close</button>
                        </div>
                    </div>
                </div>

            </div>

            <div id="divNewBrick" class="modal fade" role="dialog" aria-labelledby="divNewBrick" aria-hidden="true" data-backdrop="static" title="Add New Brick">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h1 class="modal-title">Add New Brick</h1>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="ddlDist" class="form-control-label">Distributor :</label>
                                            <select id="ddlDist" name="ddlDist" class="form-control ">
                                                <option value="-1" selected="selected">Select Distributor</option>
                                            </select>

                                        </div>
                                    </div>

                                      <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtBrick" class="form-control-label">Brick :</label>
                                            <input id="txtBrick" type="text" name="txtBrick"   class="form-control"/>

                                        </div>
                                    </div>


                                </div>
                               


                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btnAddBrick" name="btnAddBrick" type="button" class="btn btn-success">Add Brick </button>
                            <button id="btnAddCancel" name="btnAddCancel" data-dismiss="modal" type="button" class="btn btn-default">Close</button>
                        </div>
                    </div>
                </div>

            </div>



            <div>
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
            </div>
            <div class="ghierarchy bottom" id="EmployeeDropDown" style="padding: 10px 10px 10px 10px;">
                <div class="my-inner-head">
                    <h2>Filters</h2>
                </div>
                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                    <tr>

                        <td style="display:none;"><b>Search By Month : &nbsp;</b></td>
                        <td>
                            <input style="display:none;" type="text" id="txtMonth" name="txtMonth" placeholder="Enter Month" />

                        </td>

                        <td style="width: 125px;"><b>Search By Distributor : &nbsp;</b></td>

                        <td>
                            <select id="ddlDistributor" name="ddlDistributor" class="styledselect_form_1" onchange="OnChangeddlp6();">
                                <option value="-1">Select...</option>
                            </select>
                        </td>
                        <td style="width: 90px;"><b>Map/Un-Map : &nbsp;</b></td>
                        
                            <td>
                               <input id="chkActive" name="chkActive" type="checkbox" value="Active" checked="checked" onchange="OnChangeIsMap();" />
                                            
                            </td>
                    </tr>



                </table>
            </div>

<%--            <div class="divgrid" id="griddiv">
                <table id="grid-basic" class="table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed"></table>
            </div>--%>

                <div class="row">
                        <div id="divBrickGrid" class="col-sm-12"></div>

                    </div>

        </div>
    </div>
</asp:Content>
