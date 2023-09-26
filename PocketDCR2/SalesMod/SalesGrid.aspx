<%@ Page Title="SalesValidation" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesGrid.aspx.cs" Inherits="PocketDCR2.SalesMod.SalesGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../assets/NewDashboardAssest/icons/themify-icons/themify-icons.css" rel="stylesheet" />



   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>

    <style>

        .grid_page_heading {
            width: 100%;
            margin-top: 5px;
            padding: 15px 0px 15px 20px;
        }

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

        /*.ProductGrid {
            position: absolute;
        }*/

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
            z-index: 999999;
            overflow: visible;
            background: #fff url(../assets/NewDashboardAssest/images/preloaders/lo1.gif) no-repeat center center;
        }

        .modal-lg {
            width: 1000px;
        }

        .ddlRelatedCity {
            width: 200px !important;
        }

        .ghierarchy {
            width: 100%;
        }

        .my-inner-head {
            width: 100%;
            background: #217ebd;
            color: #fff;
            line-height: 25px;
            margin-bottom: 15px;
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

        .SaleValHeading h1{
            font-size: 1.5rem;
        }

        .select2-container {
            width: 48.9% !important;
            margin-top: -5px;
        }

        span.select2-selection.select2-selection--single {
            height: 38px;
            line-height: 38px;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 37px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 38px;
        }

        .btn-primary {
            background: #217ebd;
        }

          .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

        .btn1 {
            border: 2px solid gray;
            color: black;
            background-color: #e7e7e7;
            padding: 2px 40px;
            /*border-radius: 8px;*/
            font-size: 14px;
            /*font-weight: bold;*/
            text-align : center;
            margin: 0px 20px;
        }
   
        .upload-btn-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
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

        <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
      
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Edit/View Invoice</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                  <div class="row">
                       <input type="hidden" id="fkFileId" />
                      <div class="col-sm-12 col-md-3">
                          <div class="form-group">
                            <label for="id">ID:</label>
                            <input type="text" class="form-control" id="id" disabled />
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                          <div class="form-group">
                            <label for="distributorcode">Distributor Code:</label>
                            <input type="text" class="form-control" id="distributorcode"/>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                            <div class="form-group">
                            <label for="customerid">Customer ID:</label>
                            <input type="text" class="form-control" id="customerid"/>
                          </div>
                      </div>
                       <div class="col-sm-12 col-md-1 mt-4">
                          <%--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus">...</button>--%>
                      </div>
                  </div>

                   <div class="row">
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="product">Product:</label>
                            <input type="text" class="form-control" id="product"/>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-5">
                            <div class="form-group">
                            <label for="productsid">Product Code:</label>
                            <input type="text" class="form-control" id="productsid"/>
                          </div>
                      </div>
                         <div class="col-sm-12 col-md-1 mt-4">
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalPro">...</button>
                      </div>
                  </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-3">
                          <div class="form-group">
                            <label for="batchno">Batch No:</label>
                            <input type="text" class="form-control" id="batchno"/>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-3">
                          <div class="form-group">
                            <label for="ct">CT:</label>
                            <input type="text" class="form-control" id="ct"/>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-5">
                          <div class="form-group">
                            <label for="townid">Town ID:</label>
                            <input type="text" class="form-control" id="townid"/>
                          </div>
                      </div>
                           <div class="col-sm-12 col-md-1 mt-4">
                          <%--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModaltown">...</button>--%>
                      </div>
                  </div>

                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer" id="divAddMeeting">
                  <button type="button" class="btn btn-primary">Update</button>
                </div>
        
              </div>
            </div>
          </div>

        <div class="modal fade" id="myModal1" role="dialog" aria-labelledby="myModal1" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
      
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Edit/View Customer</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                  <div class="row">
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="id">ID:</label>
                            <input type="text" class="form-control" id="Id" disabled />
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="cusdistributorcode">Distributor Code:</label>
                            <input type="text" class="form-control" id="cusdistributorcode" />
                          </div>
                      </div>
                  </div>

                   <div class="row">
                       <div class="col-sm-12 col-md-3">
                        
                             <div class="form-group">
                            <label for="cusct">CT:</label>
                            <input type="text" class="form-control" id="cusct" />
                          </div>

                      </div>
                      <div class="col-sm-12 col-md-4">
                           <div class="form-group">
                            <label for="cuscustomerid">Customer ID:</label>
                            <input type="text" class="form-control" id="cuscustomerid" />
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                       <div class="form-group">
                            <label for="customername">Customer Name:</label>
                            <input type="text" class="form-control" id="customername" />
                          </div>
                      </div>
                       <div class="col-sm-12 col-md-1 mt-4">
                          <%--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalcus">...</button>--%>
                      </div>
                  </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-5">
                          <div class="form-group">
                            <label for="custownid">Town ID:</label>
                            <input type="text" class="form-control" id="custownid" />
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="ct">Town:</label>
                            <input type="text" class="form-control" id="town" />
                          </div>
                      </div>
                        <input type="hidden" id="DistId" />
                      <div class="col-sm-12 col-md-1 mt-4">
                          <%--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModaltown">...</button>--%>
                      </div>
                  </div>

                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer" id="CustError" >
                    <div class="" id="divAddCustomer">
                         <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                    <div class="" id="divAddCustomer1">
                         <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                    <div class="" id="divAddCustomer2">
                        <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                     <div class="" id="divAddCustomer3">
                        <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                </div>
                <div class="modal-footer" id="BrickError">
                    <div class="" id="divAddBrick">
                         <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                    <div class="" id="divAddBrick1">
                         <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div>
                    <div class="" id="divAddBrick2">
                         <button type="button" class="btn btn-sm btn-primary">Update</button>
                    </div> 
                </div>
        
        
              </div>
            </div>
          </div>

        <div class="modal" id="myModal2">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
      
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Edit/View Stock </h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                  <div class="row">
                      <div class="col-sm-12 col-md-4">
                          <div class="form-group">
                            <label for="id">ID:</label>
                            <input type="text" class="form-control" id="stockid" disabled>
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                          <div class="form-group">
                            <label for="stkdistributorcode">Distributor Code:</label>
                            <input type="text" class="form-control" id="stkdistributorcode">
                          </div>
                      </div>
                      <div class="col-sm-12 col-md-4">
                          <div class="form-group">
                            <label for="stkproductid">Prroduct ID:</label>
                            <input type="text" class="form-control" id="stkproductid">
                          </div>
                      </div>
                  </div>

                   <div class="row">
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="stkproduct">Product:</label>
                            <input type="text" class="form-control" id="stkproduct">
                          </div>
                      </div>
                           <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="stkbatchno">Batch No:</label>
                            <input type="text" class="form-control" id="stkbatchno">
                          </div>
                      </div>
                    <%--  <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="cldate">CT:</label>
                            <input type="date" class="form-control" id="cldate">
                          </div>
                      </div>--%>
                  </div>

                <%--    <div class="row">
                      <div class="col-sm-12 col-md-6">
                          <div class="form-group">
                            <label for="closing">Closing:</label>
                            <input type="text" class="form-control" id="closing">
                          </div>
                      </div>
                  </div>--%>

                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer" id="divAddStock">
                  <button type="button" class="btn btn-primary">Update</button>
                </div>
        
              </div>
            </div>
          </div>

 <!-- The Modal Town-->
  <div class="modal" id="myModaltown">
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Town List</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>

        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
        
             <div class="row">
                 <div class="col-sm-12">
                      <button class="btn-primary  mr-2 my-2 btn-sm float-right" onclick="RedircetAddBrick();">Add New Brick</button>
                  </div>
                 <div class="col-sm-12">
                     <div id="CustomerGrid1" class="table-responsive-sm"></div>
                 </div>   
        </div>

        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

 <!-- The Modal Town END -->

 <!-- The Modal Cust-->
  <div class="modal" id="myModalcus">
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Client List</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
        
             <div class="row">
               <div class="col-sm-12">
                      <button class="btn-primary  mr-2 my-2 btn-sm float-right" onclick="RedircetAddCustomer();">Add New Customer</button>
                  </div>
            <div class="col-sm-12">
                <div id="ClientGrid1" class="table-responsive-sm"></div>
            </div>   
        </div>

        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

 <!-- The Modal Cust END -->


  <!-- The Modal Product-->
  <div class="modal" id="myModalPro">
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Product List</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
        
         
             <div class="row">
                      <div class="col-sm-12">
                      <button class="btn-primary  mr-2 my-2 btn-sm float-right" onclick="RedircetAddProduct();">Add New Product</button>
                  </div>
            <div class="col-sm-12">
                <div id="ProductGrid1" class="table-responsive-sm"></div>
            </div>   
        </div>

        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

 <!-- The Modal Product END -->






        <div class="row">
            <div class="col-sm-12">

                <div class="grid_page_heading SaleValHeading" id="getName">
                    <h1>
                    <img alt="" src="../Images/Icon/Product.png" />
                    Sales Validation Pages</h1>
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>
            </div>
        </div>

        <div class="row" id="col6Date">
            <div class="col-sm-0 col-md-2"></div>
            <div class="col-sm-0 col-md-8">
                <input id="txtDate" class="form-control input-sm w-25 d-inline-block" type="text" />
                <select id="ddlDistributor" name="ddlDistributor" class="styledselect_form_1 input-sm">
                    <option value="-1">Select...</option>
                </select>
                <button type="button" id="addButton" onclick="getList();" style="text-align: center; float: right; margin-left: 6px" class="btn btn-primary input-sm w-25 d-inline-block">Filter Month</button>
            </div>
            <div class="col-sm-0 col-md-2"></div>
        </div>
        <div class="row">
            <div class="col-sm-0 col-md-4">
                <div class="upload-btn-wrapper">
                    <button class="btn1">Upload a file</button>
                    <input type="file" name="myfile" id="inputFile" accept=".xls,.xlsx"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                 <input type="hidden" id="fileName"/>
                <button class="btn-primary show-btn mr-2 mt-2 u-btn-3d btn-sm d-none float-right" id="shw-btn">Show Grid</button>
                <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right " id="ReValidateInvoice" style="font-size:16px;" onclick="ReValidateeInvoice();">ReValidate Invoice</button>
                <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right " id="FinalInsertInvoice" style="font-size:16px;" onclick="FinalInsertInvoicee();">Final Insert Invoice</button>
                <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right btninv" id="ReValidateCustomer" style="font-size:16px;" onclick="ReValidateeCustomer();">ReValidate Customer</button>
                <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right btninv" id="ErrorCustomerExcel" style="font-size:16px;" onclick="ErrorCustomerExcell('xlsx');">Excel Download</button>
                <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right btninv" id="ErrorInvoiceExcel" style="font-size:16px;" onclick="ErrorInvoiceExcell('xlsx');">Excel Download</button>
                  <button type="button" class="btn btn-primary mr-2 btn-sm mt-2 u-btn-3d float-right" id="ReValidateStock" style="font-size:16px;" onclick="ReValidateeStock();">ReValidate Stock</button>
            </div>
        </div>

        <div id="cmt-grid" class="row mt-3">
            <div class="col-sm-12">
                <div id="divProductGrid" class="table-responsive-sm ProductGrid"></div>
            </div>  
        </div>

        <div class="row mt-3">
            <div id="loader" class="loader"></div>
        </div>
         <div class="row">
            
            <div class="col-sm-12">
               
            </div>   
        </div>
        <div class="row">
           
            <div class="col-sm-12">
                <div id="InvoiceGrid" class="table-responsive-sm" style="overflow-x:auto;"></div>
            </div>   
        </div>

        <div class="row">
              
            <div class="col-sm-12">
                <div id="CustomerGrid" class="table-responsive-sm" style="overflow-x:auto;"></div>
            </div>   
        </div>

      
        <div class="row">
            
            <div class="col-sm-12">
                <div id="StockGrid" class="table-responsive-sm"></div>
            </div>   
        </div>
   

    </div>



    <%--  <script src="../assets/js/jquery3.1.0.js"  type="text/javascript"></script>--%>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<%--    <script src="../assets/js/jquery.min.js"></script>--%>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
<%--    <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" />
    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="../assets/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <script type="text/javascript" src="../assets/Select2/select2.full.js"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
   <%-- <script src="FileGridList.js" type="text/javascript"></script>--%>
    <script src="../assets/js/jquery.numeric.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>

    <script type="text/javascript" src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>

    <script type="text/javascript">
        var $old = jQuery.noConflict();
    </script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#txtMonth').datepicker({
                format: "MM-yyyy",
                startView: "months",
                minViewMode: "months",
                orientation: 'top',
                autoclose: true,
                todayHighlight: true
            }).datepicker("setDate", new Date());
        });
    </script>

    <script>
        /// <reference path="CustomerListValidation.asmx" />
        /// <reference path="CustomerListValidation.asmx" />
        /// <reference path="SalesErrorLogsServices.asmx" />
        // Global Variables
        var EmployeeId = 0, tempLevelId = 0
        var CurrentUserLoginId = "", CurrentUserRole = "", myData = "", value = "", name = "", levelName = "", modeValue = "", msg = "", mode = "";
        var jsonObj = null;

        var ids = [];
        var docIds = [];
        var checkedboxes;
        var BtnId = 0;

        var date = "";


        // Page Load Event
        function pageLoad()
        {
            $("#inputFile").change(ButtonUpload);
            var cdts = new Date();
            var day = cdts.getDate();

            if (day < 32) {
                $('#ThUpload').show();
            }
            else {
                $('#ThUpload').hide();
            }
            //GetCurrentUser();
            //FillDistributor();
            // FillProduct();

            //if (CurrentUserRole == "rl6") {
            //    $('#showlistybtn').show();
            //    $('#ApproveAll').hide();
            //    $('#btnApproveAll').hide();
            //} else {
            //    $('#showlistybtn').hide();
            //}


            //$('#showlistybtn').click(FillProductGrid);
            //$('#btnAlignProduct').click(btnAlignProductClicked);
            //$('#btnAlignProduct_ById').click(btnAlignProduct_ById_Clicked);

            //$('#btnAlignCancel').click(btnAlignCancelClicked);

            //$('#btnDownload').click(btnDownloadClicked);
            //$('#btnCancel').click(btnCancelClicked);

            //$("input:file").change(function () {


            //  uploadFile();
            // GetDataInGrid();

            //});

            //$("#btnclosedrmaster").click(function () {
            //    FillProductGrid(EmployeeId);
            //});


            //$('.selectauto').select2();
            //$('.selectauto').select2({
            //    dropdownParent: $("#divProductMapping"),
            //    width: '250px'

            //});

        }
        $(document).ready(function () {

            var cdt = new Date();
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var current_mint = cdt.getMinutes();
            var current_hrs = cdt.getHours();
            var current_date = cdt.getDate();

            var current_month = cdt.getMonth();
            var month_name = monthNames[current_month];
            var current_year = cdt.getFullYear();

            date = month_name + '-' + current_year;
            $('#txtDate').val(month_name + '-' + current_year);
            //   $('#txtenddate').val(month_name + '-' + current_year);

            $("#ddlDistributor").select2({

            });

            $('#txtDate').datepicker({
                showOn: "focus",
                showMonthAfterYear: false,
                dateFormat: "dd.mm.yy"
            }).datepicker();

            FillDistributor();
            getList();
            //getCustomer();

          
        });

        function ButtonUpload() {



            var formdata = new FormData();

            var files1 = $("#inputFile").get(0).files;

            formdata.append("Filedata", files1[0]);

            $.ajax({
                type: "POST",
                url: "../Handler/CustomerBrickUploader.ashx?date=" + date + "&Type=U",
                contentType: "application/json; charset=utf-8",
                data: formdata,
                success: function () {
                    //$('#dialog').jqm({ modal: true });
                    //$('#dialog').jqm();
                    //$('#dialog').jqmShow();

                    $.ajax({
                        url: "../Handler/CustomerBrickUploader.ashx?date=" + date + "&Type=" + 'PF' + '&FileName=' + files1[0].name,
                        contentType: "application/json; charset=utf-8",
                        success: OnCompleteDownload,
                        beforeSend: startingAjax,
                        complete: ajaxCompleted,
                        error: onError
                    });

                    //$('#dialog').jqmHide();
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                contentType: false,
                processData: false,
                async: false,
                cache: false
            });

        }


        function OnCompleteDownload(data, status) {
            var returndata = data;
            //$('#dialog').jqmHide();

            alert(returndata);
        }


        function startingAjax() {

            // $('#UpdateProgress1').show();
        }

        function ajaxCompleted() {

            // $('#UpdateProgress1').hide();
        }

        function DownloadExcel() {

            var monthlist = $("input[name*='txtMonth']").val();
            var Distributor = $("#ddlDistributor").val();

            if (Distributor != '-1') {

                CallHandler(monthlist, 'D', Distributor);
                //"<a onClick=\"MapProduct('" + jsonObj[i].SalesDistID + "','" + jsonObj[i].ProductCode + "');\" href='javascript:;' style='vertical-align: text-top;' >Map</a>" 
            }
            else {
                divProductType(monthlist, 'D', Distributor);
            }
        }

        function ProcessUpdate() {

            var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/ProcessUpdate",//sp_getalldistributor
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: OnsuccessProcessUpdate,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                error: onError,
                async: false,
                cache: false
            });
        }

        function OnsuccessProcessUpdate(data) {
            setTimeout(function () {
                $('#dialog').jqmHide();
            }, 1000);
            setTimeout(function () {
                if (data.d == "Already Exist!") {
                    $("#divProductMapping").modal('hide');
                    swal("warning", "already exists", "warning")
                }
                else {
                    swal("success!", "Mapping Process Update!", "success")
                    FillProductGrid(EmployeeId);
                }
            }, 1500);
        }


        function CallHandler(monthlist, type, Distributor) {

            var requestObject = {};

            requestObject['date'] = monthlist;
            requestObject['Type'] = type;
            requestObject['Distributor'] = Distributor;
            requestObject['CountryType'] = '';

            var mapForm = document.createElement("form");
            mapForm.target = "Map";
            mapForm.method = "POST";
            mapForm.action = "../Handler/GetExcelForProductAlignment.ashx";

            var mapInput = document.createElement("input");
            mapInput.type = "hidden";
            mapInput.name = "requestObject";
            mapInput.value = JSON.stringify(requestObject);
            mapForm.appendChild(mapInput);

            document.body.appendChild(mapForm);

            map = window.open("", "Map", "status=0,title=Downloading File...,height=300,width=400,scrollbars=1");

            if (map) {

                mapForm.submit();

            } else {
                alert('You Must Allow Popups For Sheet To Download.');
            }
        }

        function divProductType(monthlist, type, Distributor) {
            $("#divProductType").modal('show');
            $("#divProductType").css("z-index", 999999);
            $('#divProductType').find('#btnDownload').attr({ '_monthlist': monthlist, '_type': type, '_Distributor': Distributor });
        };

        function btnDownloadClicked() {

            var thisbtn = $(this);
            var monthlist = $(this).attr('_monthlist');
            var type = $(this).attr('_type');
            var Distributor = $(this).attr('_Distributor');
            var pid = $('#ddlProductType').val();

            if (pid != '-1') {
                var requestObject = {};

                requestObject['date'] = monthlist;
                requestObject['Type'] = 'D';
                requestObject['Distributor'] = Distributor;
                requestObject['CountryType'] = pid;

                var mapForm = document.createElement("form");
                mapForm.target = "Map";
                mapForm.method = "POST";
                mapForm.action = "../Handler/GetExcelForProductAlignment.ashx";

                var mapInput = document.createElement("input");
                mapInput.type = "hidden";
                mapInput.name = "requestObject";
                mapInput.value = JSON.stringify(requestObject);
                mapForm.appendChild(mapInput);

                document.body.appendChild(mapForm);

                map = window.open("", "Map", "status=0,title=Downloading File...,height=300,width=400,scrollbars=1");

                if (map) {

                    mapForm.submit();

                } else {
                    alert('You Must Allow Popups For Sheet To Download.');
                }

                //if (type = 'D') {
                //    window.open("../Handler/GetExcelForProductAlignment.ashx?date=" + monthlist + "&Type=" + type + "&Distributor=" + Distributor + "&CountryType=" + pid);
                //}
            }
            else {
                alert('Please Select Type');
                return false;
                // swal("warning", "Select Product", "warning")
            }
        }

        function btnCancelClicked() {
            $(this).parents('.divTable').find('.requireError').hide();
            $(this).attr('_docid', '');
            $(this).parents('.divTable').find('#ddlProductType').val('-1');
            $("#divProductType").modal('hide');
        }

        function uploadFile() {

            var date = new Date();

            //// Get form
            var form = $('#fileForm')[0];

            // Create an FormData object 
            var data = new FormData(form);

            var formData = new FormData();

            formData.append('file', $('#sheetUploader')[0].files[0]);

            $.ajax({

                type: "POST",
                url: '../Handler/GetExcelForProductAlignment.ashx?date=' + ('-' + (date.getMonth() + 1) + '-' + (date.getFullYear())) + '&Type=U',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data, status) {
                    $('#jqmloader').html("<p style=\"color: white;padding-left: 20px;\">Please Wait, Uploading Sheet</p>");
                    $old('#dialog').jqm({ modal: true });
                    $old('#dialog').jqm();
                    $old('#dialog').jqmShow();


                    $.ajax({
                        url: "../Handler/GetExcelForProductAlignment.ashx?&Type=" + 'Read' + '&FileName=' + data,
                        contentType: "text/plain; charset=utf-8",
                        success: function (data, response) {

                            setTimeout(function () {
                                $('#dialog').jqmHide();


                            }, 1000);

                            setTimeout(function () {
                                if (data == "ERROR") {
                                    alert("Sheet Upload Has Some Corrupted Data, Please Do Not Modify Any Columns Generated By Server");
                                    window.location.reload();

                                }
                                else {
                                    alert('File Uploaded Successfully');
                                    window.location.reload();
                                }
                            }, 1500);
                        },

                        error: onError
                    });
                },
                error: onError,
                beforeSend: startingAjax,
                complete: ajaxCompleted,
                async: false,
                cache: false
            });
        }


        function ShowLoaderMG(DivID) {
            $('#' + DivID + 'MGLW').addClass('MGLoader-Wrapper');
            $('#' + DivID + 'MGLW div').addClass('MGLoader');
        }

        function HideLoaderMG(DivID) {

            $('#' + DivID + 'MGLW').removeClass('MGLoader-Wrapper');
            $('#' + DivID + 'MGLW div').removeClass('MGLoader');
        }


        //Start My New Work Here!


        function getList() {
            var date = $('#txtDate').val();
            var distbutorId = $('#ddlDistributor').val();


            myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetFilesGridList",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessfillFileGrid,
                //beforeSend: startingAjax,
                beforeSend: function () {
                    $('#loader').show();
                    $('#col6Date').hide();
                },
                complete: function () {
                    $('#loader').hide();
                    $('#col6Date').show();
                },
                //complete: ajaxCompleted,
                error: function (err) {
                    alert(err);
                },
                async: false,
                cache: false
            })
        }

        function OnsuccessfillFileGrid(response) {

            $('#ReValidateInvoice').hide();
            $('#ReValidateCustomer').hide();
            $('#ReValidateStock').hide();
            $('#FinalInsertInvoice').hide();
            $('#ErrorCustomerExcel').hide();
            $('#ErrorInvoiceExcel').hide();

            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);

                var tablestring = "<table id='datatablesgrid' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                             "<th data-column-id='Id' > Id </th> " +
                                             "<th data-column-id='FileName' > FileName </th> " +
                                               "<th data-column-id='FilePath' > FilePath </th> " +
                                            "<th data-column-id='FileType' >FileType</th> " +
                                            "<th data-column-id='FileRecords' >FileRecords</th> " +
                                            "<th data-column-id='CreateTime'  >CreateTime</th> " +
                                           "<th data-column-id='Action' >Action</th> " +
                                           "<th data-column-id='status' >Process</th> " +
                                           "<th data-column-id='status' >Error Flag</th> " +


                     "</tr></thead>" +
                    "<tbody id='values'>";

                $("#divProductGrid").empty();
                $("#divProductGrid").append(tablestring);
                for (var i = 0; i < jsonObj.length ; i++) {
                    //var FileStatus = jsonObj[i].IsInserted == 1 ? 'Complete' : 'Process Pending';

                    $('#values').append($('<tr>' +
                           "<td>" + jsonObj[i].ID + "</td>" +
                           "<td>" + jsonObj[i].FileName + "</td>" +
                           "<td>" + jsonObj[i].FilePath + "</td>" +
                           "<td>" + jsonObj[i].FileType + "</td>" +
                           "<td>" + jsonObj[i].FileRecords + "</td>" +
                           "<td>" + jsonObj[i].CreateTime + "</td>" +
                           //"<td><a onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "');\" style='vertical-align: text-top;' id='btnView'>View</a></td>" +
                           "<td><button type='button' class='btn btn-primary' id='btnView' onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "','" + jsonObj[i].FileName + "');\"><i class='ti-eye'></i></button></td>" +
                           //  "<td><button type='button' class='btn btn-primary' id='btnView' onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "','" + jsonObj[i].FileName + "');\"><i class='ti-eye'></i></button> <button type='button' class='btn btn-primary ml-3' id='btnView' onClick=\"SendValidateData('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "');\"><i class='ti-share'></i></button></td>" +
                           //"<td>" + jsonObj[i].IsInserted + "</td>" +
                           "<td>" + jsonObj[i].FileStatus + "</td>" +
                           "<td>" + jsonObj[i].ErrorFree + "</td>" +

                   "</tr>"));
                }

                $("#divProductGrid").append('</tbody></table>');
                $('#datatablesgrid').DataTable();


            }
            else {
                var tablestring = "<table id='datatablesgrid' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                           "<th data-column-id='Id' > Id </th> " +
                                           "<th data-column-id='FileName' > FileName </th> " +
                                           "<th data-column-id='FilePath' > FilePath </th> " +
                                           "<th data-column-id='FileType' >FileType</th> " +
                                           "<th data-column-id='FileRecords' >FileRecords</th> " +
                                           "<th data-column-id='CreateTime'  >CreateTime</th> " +
                      "</tr></thead>" +
                     "<tbody id='values'>";

                $("#divProductGrid").empty();
                $("#divProductGrid").append(tablestring);
                $('#datatablesgrid').DataTable();

                AlertMsg('Data Not Found.');


            }

        }


        function ViewTxtFile(Id, FileType, fileName) {

            $('#loader').show();
            var file = fileName.split('.');
            var splitFileName = file[0];
            var strFileName = splitFileName.substr("", 3)
            $('#DistId').val(strFileName);
            myData = "{'id':'" + Id + "','DistributeId':'" + strFileName + "' }";

            BtnId = Id;

            if (FileType == "INVOICE" || FileType == "INV") {
                $.ajax({
                    type: "POST",

                    url: "FileGridList.asmx/GetInvoiceListValidation",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: OnsuccessfillInvoicegrid,
                    error: function (err) {
                        alert(err);
                    },
                });


            }
            else if (FileType == "CUSTOMER" || FileType == "CUS") {

                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/GetCustomerListValidation",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: OnsuccessfillCustgrid,

                    error: function (err) {
                        alert(err);
                    }
                })
            }
            else if (FileType == "STOCK" || FileType == "STOCK") {
                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/GetStockListValidation",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: OnsuccessfillStockgrid,

                    error: function (err) {
                        alert(err);
                    }
                })
            }

        }


        function OnsuccessfillInvoicegrid(response) {

            $('#ReValidateInvoice').show();
            $('#ReValidateCustomer').hide();
            $('#ReValidateStock').hide();
            $('#FinalInsertInvoice').show();
            $('#ErrorCustomerExcel').hide();
            $('#ErrorInvoiceExcel').show();


            $(".invTitle").remove();
            $("#getName").html("").append("<h1 class='invTitle'><img alt='' src='../Images/Icon/Product.png' /> Invoice Validation Pages</h1>");

            $('#col6Date').hide();
            if (response.d != '') {


                var jsonObj = $.parseJSON(response.d);

                var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='DocumentNo' > DocumentNo </th> " +
                                            "<th data-column-id='Product Id' >Product Id</th> " +
                                            "<th data-column-id='Product' >Product</th> " +
                                            "<th data-column-id='CUSTID'  >CUSTID</th> " +
                                            "<th data-column-id='BATCHNO' >BATCHNO</th> " +
                                            "<th data-column-id='TOWNID' > TOWNID </th> " +
                                            "<th data-column-id='InvoiceDate' > InvoiceDate </th> " +
                                            "<th data-column-id='Lineno' > LineNo </th> " +
                                            "<th data-column-id='Comments' > Comments </th> " +
                                            //"<th data-column-id='Comments' > Edit </th> " +
                                "</tr></thead>" +
                                "<tbody id='values1'>";

                $("#InvoiceGrid").empty();
                $("#InvoiceGrid").append(tablestring);


                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values1').append($('<tr>' +
                           "<td>" + jsonObj[i].PK_InvoiceID + "</td>" +
                           "<td>" + jsonObj[i].DistributeID + "</td>" +
                           "<td>" + jsonObj[i].DocumentNo + "</td>" +
                            "<td>" + jsonObj[i].ProductId + "</td>" +
                            "<td>" + jsonObj[i].Product + "</td>" +
                            "<td>" + jsonObj[i].CUSTCode + "</td>" +
                            "<td>" + jsonObj[i].BATCHNO + "</td>" +
                            "<td>" + jsonObj[i].TOWNCode + "</td>" +
                            "<td>" + jsonObj[i].InvoiceDate + "</td>" +
                            "<td style='color:green'>" + jsonObj[i].RecordNo + "</td>" +
                            "<td style='color:red'>" + jsonObj[i].Comments + "</td>" +
                            //"<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal' onclick='LoadingEditInvoiceData(" + jsonObj[i].PK_InvoiceID + ")'><i class='ti-pencil-alt'></i></button></td>" +
                             //<button type="button" class="btn btn-primary deadline-btn" data-toggle="modal" data-target="#myViewModal" onclick="LoadingViewData(6)">View</button>


                   "</tr>"));

                    var ErrorMonth = jsonObj[i].MonthError;

                    if (ErrorMonth == "1") {
                        $('#FinalInsertInvoice').hide();
                        $('#ErrorInvoiceExcel').hide();
                    }
                }



                $("#InvoiceGrid").append('</tbody></table>');
                $('#datatables').DataTable();

            }
            else {
                var tablestring = "<table id='datatables' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='Product Id' >Product Id</th> " +
                                            "<th data-column-id='Product' >Product</th> " +
                                            "<th data-column-id='CLDATE'  >CLDATE</th> " +
                                            "<th data-column-id='BATCHNO' >BATCHNO</th> " +
                                            "<th data-column-id='CLOSING' > CLOSING </th> " +
                                            "<th data-column-id='Comments' > Comments </th> " +
                                            "<th data-column-id='Suspect' > Suspect </th> " +
                      "</tr></thead>" +
                     "<tbody id='values1'>";

                $("#InvoiceGrid").empty();
                $("#InvoiceGrid").append(tablestring);
                $('#datatables').DataTable();

                AlertMsg('Congratulations! Error Not Found.');


            }

            $('#loader').hide();

        }


        function OnsuccessfillCustgrid(response) {

            $('#ReValidateInvoice').hide();
            $('#ReValidateCustomer').show();
            $('#ErrorCustomerExcel').show();
            $('#ReValidateStock').hide();
            $('#FinalInsertInvoice').hide();
            $('#ErrorInvoiceExcel').hide();
            $(".custTitle").remove();
            $("#getName").html("").append("<h1 class='custTitle'><img alt='' src='../Images/Icon/Product.png' /> Customer Validation Pages</h1>");
            $('#col6Date').hide();
            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,

                var tablestring = "<table id='datatables2' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='Customer ID' >Customer ID</th> " +
                                            "<th data-column-id='Customer Name' >Customer Name</th> " +
                                            "<th data-column-id='CT' >CT</th> " +
                                            "<th data-column-id='TOWNID' > TOWNID </th> " +
                                            "<th data-column-id='TOWN' > TOWN </th> " +
                                            "<th data-column-id='Lineno' > LineNo </th> " +
                                            "<th data-column-id='Comments' > Comments </th> " +
                                            "<th data-column-id='Actions' > Actions </th> " +

                                            //"<th data-column-id='Comments' > Edit </th> " +
                     "</tr></thead>" +
                    "<tbody id='values2'>";

                $("#CustomerGrid").empty();
                $("#CustomerGrid").append(tablestring);
                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values2').append($('<tr>' +
                           "<td>" + jsonObj[i].PK_CustID + "</td>" +
                           "<td>" + jsonObj[i].DSTBID + "</td>" +
                              "<td>" + jsonObj[i].CUSTID + "</td>" +
                              "<td>" + jsonObj[i].CUSTNAME + "</td>" +
                              "<td>" + jsonObj[i].CT + "</td>" +
                              "<td>" + jsonObj[i].TOWNID + "</td>" +
                                "<td>" + jsonObj[i].TOWN + "</td>" +
                                 "<td style='color:green'>" + jsonObj[i].RecordNo + "</td>" +
                                  "<td style='color:red'>" + jsonObj[i].Comments + "</td>" +
                                  "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal1' onclick='LoadingEditCustomerData(" + jsonObj[i].PK_CustID + ")'><i class='ti-pencil-alt'></i></button></td>" +
                   "</tr>"));
                }

                $("#CustomerGrid").append('</tbody></table>');
                $('#datatables2').DataTable();

            }
            else {
                var tablestring = "<table id='datatables2' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                                 "<th data-column-id='Id' > Id </th> " +
                                             "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='Customer ID' >Customer ID</th> " +
                                            "<th data-column-id='Customer Name' >Customer Name</th> " +
                                            "<th data-column-id='CT' >CT</th> " +
                                           "<th data-column-id='TOWNID' > TOWNID </th> " +
                                            "<th data-column-id='TOWN' > TOWN </th> " +
                                             "<th data-column-id='Comments' > Comments </th> " +

                      "</tr></thead>" +
                     "<tbody id='values2'>";

                $("#CustomerGrid").empty();
                $("#CustomerGrid").append(tablestring);
                $('#datatables2').DataTable();

                AlertMsg('Congratulations! Error Not Found.');


            }
            $('#loader').hide();
        }


        function OnsuccessfillStockgrid(response) {

            $('#ReValidateInvoice').hide();
            $('#ReValidateCustomer').hide();
            $('#ReValidateStock').show();
            $('#FinalInsertInvoice').hide();
            $(".stockTitle").remove();
            $("#getName").html("").append("<h1 class='stockTitle'><img alt='' src='../Images/Icon/Product.png' /> Stock Validation Pages</h1>");
            $('#col6Date').hide();
            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,
                var tablestring = "<table id='datatables3' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                             "<th data-column-id='Id' > Id </th> " +
                                             "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='Product Id' >Product Id</th> " +
                                            "<th data-column-id='Product' >Product</th> " +
                                            //"<th data-column-id='CLDATE'  >CLDATE</th> " +
                                            "<th data-column-id='BATCHNO' >BATCHNO</th> " +
                                           "<th data-column-id='CLOSING' > CLOSING </th> " +
                                            "<th data-column-id='Comments' > Comments </th> " +
                                            // "<th data-column-id='Suspect' > Suspect </th> " +
                                             "<th data-column-id='Comments' > Edit </th> " +
                     "</tr></thead>" +
                    "<tbody id='values3'>";

                $("#StockGrid").empty();
                $("#StockGrid").append(tablestring);

                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values3').append($('<tr>' +
                           "<td>" + jsonObj[i].Pk_StockID + "</td>" +
                           "<td>" + jsonObj[i].DSTBID + "</td>" +
                              "<td>" + jsonObj[i].ProductId + "</td>" +
                              "<td>" + jsonObj[i].Product + "</td>" +
                             // "<td>" + jsonObj[i].CLDATE + "</td>" +
                              "<td>" + jsonObj[i].BATCHNO + "</td>" +
                              "<td>" + jsonObj[i].CLOSING + "</td>" +
                                "<td style='color:red'>" + jsonObj[i].Comments + "</td>" +
                                 // "<td>" + jsonObj[i].Suspect + "</td>" +
                                  "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal2' onclick='LoadingEditStockData(" + jsonObj[i].Pk_StockID + ")'><i class='ti-pencil-alt'></i></button></td>" +


                   "</tr>"));
                }

                $("#StockGrid").append('</tbody></table>');
                $('#datatables3').DataTable();

            }
            else {
                var tablestring = "<table id='datatables3' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                                   "<th data-column-id='Id' > Id </th> " +
                                             "<th data-column-id='Distributor Code' > Distributor Code </th> " +
                                            "<th data-column-id='Product Id' >Product Id</th> " +
                                            "<th data-column-id='Product' >Product</th> " +
                                           // "<th data-column-id='CLDATE'  >CLDATE</th> " +
                                            "<th data-column-id='BATCHNO' >BATCHNO</th> " +
                                           "<th data-column-id='CLOSING' > CLOSING </th> " +
                                            "<th data-column-id='Comments' > Comments </th> " +
                                           //  "<th data-column-id='Suspect' > Suspect </th> " +
                      "</tr></thead>" +
                     "<tbody id='values3'>";

                $("#StockGrid").empty();
                $("#StockGrid").append(tablestring);
                $('#datatables3').DataTable();

                AlertMsg('Congratulations! Error Not Found.');



                //  $("<div title='Alert'>Not Found.</div>").dialog();
            }
            $('#loader').hide();

        }


        function LoadingEditInvoiceData(id) {
            console.log("Id", id);
            myData = "{'id':'" + id + "' }";
            $(".updateInvoice").remove();
            $("#divAddMeeting").html("").append(" <button type='button' class='btn btn-primary create-task my-auto ml-auto updateInvoice' id='updateInvoice' onclick='UpdateInvoiceData(" + id + ");'>Update</button>");

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetByIdInvoice",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessInvoiceData,
                error: function (err) {
                    alert(err);
                },
            });
            getPrduct();
            getCustomer();
            getClient();
        }

        function onSuccessInvoiceData(data) {
            var jsonObj = $.parseJSON(data.d);

            $('#id').val(jsonObj[0].PK_InvoiceID);
            if (jsonObj[0].distSuspect == "" || jsonObj[0].distSuspect == "False") {
                $('#distributorcode').val(jsonObj[0].DistributeID).attr('disabled', true);
            } else {
                $('#distributorcode').val(jsonObj[0].DistributeID).attr('disabled', false);
            }
            if (jsonObj[0].ProductSuspect == "False" || jsonObj[0].ProductSuspect == "") {

                $('#product').val(jsonObj[0].Product).attr('disabled', true);
            } else {
                $('#product').val(jsonObj[0].Product).attr('disabled', false);
            }

            if (jsonObj[0].ProductISuspect == "False" || jsonObj[0].ProductISuspect == "") {

                $('#productsid').val(jsonObj[0].ProductId).attr('disabled', true);

            } else {

                $('#productsid').val(jsonObj[0].ProductId).attr('disabled', false);
            }

            if (jsonObj[0].CustSuspect == "" || jsonObj[0].CustSuspect == "False") {
                $('#customerid').val(jsonObj[0].CUSTID).attr('disabled', true);
            } else {
                $('#customerid').val(jsonObj[0].CUSTID).attr('disabled', false);
            }


            if (jsonObj[0].BatchCommentsSuspect == "") {
                $('#batchno').val(jsonObj[0].BATCHNO).attr('disabled', true);
            } else {
                $('#batchno').val(jsonObj[0].BATCHNO).attr('disabled', false);
            }


            if (jsonObj[0].TOWNIDSuspect == "False" || jsonObj[0].TOWNIDSuspect == "") {
                $('#townid').val(jsonObj[0].TOWNID).attr('disabled', true);
            } else {
                $('#townid').val(jsonObj[0].TOWNID).attr('disabled', false);
            }

            if (jsonObj[0].CTSuspect == "" || jsonObj[0].CTSuspect == "False") {
                $('#ct').val(jsonObj[0].CT).attr('disabled', true);
            } else {
                $('#ct').val(jsonObj[0].CT).attr('disabled', false);
            }


        }

        function UpdateInvoiceData(id) {

            var distributorcode = $('#distributorcode').val();
            var Productsid = $('#productsid').val();
            var product = $('#product').val();
            var customerid = $('#customerid').val();
            var batchno = $('#batchno').val();
            var townid = $('#townid').val();
            var ct = $('#ct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','productsid':'" + Productsid + "','product':'" + product + "','customerid':'" + customerid + "','batchno':'" + batchno + "','townid':'" + townid + "','ct':'" + ct + "' }";

            //$('#myModal').modal('hide');

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateInvoiceData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateInvoice,
                error: function (err) {
                    alert(err);
                },
            });


        }

        function onSuccessUpdateInvoice(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {

                    $('.loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        // $('#myModal').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);

                    //location.reload(true);
                }
                else {
                    $('.loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        // $('#myModal').modal('hide');
                        swal("error!", "Error occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        // location.reload(true);
                        window.location.href = "";
                    }, 1500);
                }

            }
        }


        function LoadingEditCustomerData(id) {

            console.log("Id", id);
            myData = "{'id':'" + id + "' }";
            //$(".updateCustomer").remove();
            //For Customers 
            $("#divAddCustomer").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto updateCustomer' id='updateCustomer' onclick='UpdateCustomerData(" + id + ");'>Update Uploded Customers</button>");
            $("#divAddCustomer1").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto updateCustomer1' id='updateCustomer1' onclick='UpdateCustomerData1(" + id + ");'>Update Master Customer</button>");
            $("#divAddCustomer2").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto updateCustomer2' id='updateCustomer2' onclick='UpdateCustomerData2(" + id + ");'>Open New Customers</button>");
            $("#divAddCustomer3").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto updateCustomer3' id='updateCustomer3' onclick='UpdateCustomerData3(" + id + ");'>Mapped Customer With a different Bricks</button>");

            //For Bricks

            $("#divAddBrick").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto updateCustomer' id='updateCustomer' onclick='UpdateBricksData(" + id + ");'>Update Uploded Bricks</button>");
            $("#divAddBrick1").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto UpdateBricksData1' id='updateCustomer1' onclick='UpdateBricksData1(" + id + ");'>Update Master Bricks</button>");
            $("#divAddBrick2").html("").append(" <button type='button' class='btn btn-sm btn-primary create-task my-auto ml-auto UpdateBricksData2' id='updateCustomer2' onclick='UpdateBricksData2(" + id + ");'>Open New Bricks</button>");

            
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetByIdCustomer",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessCustomerData,
                error: function (err) {
                    alert(err);
                },
            });
            CustAndBrickErrorStatus(id);
            getCustomer();
            getClient();
        }

        function onSuccessCustomerData(data) {

            var jsonObj = $.parseJSON(data.d);

            $('#Id').val(jsonObj[0].PK_CustID);
            if (jsonObj[0].distSuspect == "False" || jsonObj[0].distSuspect == "") {
                $('#cusdistributorcode').val(jsonObj[0].DSTBID).attr('disabled', true);
            } else {
                $('#cusdistributorcode').val(jsonObj[0].DSTBID).attr('disabled', false);
            }
            if (jsonObj[0].CustNameSuspect == "" || jsonObj[0].CustNameSuspect == "False") {
                $('#customername').val(jsonObj[0].CUSTNAME).attr('disabled', true);
            } else {
                $('#customername').val(jsonObj[0].CUSTNAME).attr('disabled', false);
            }

            if (jsonObj[0].CustSuspect == "" || jsonObj[0].CustSuspect == "False") {
                $('#cuscustomerid').val(jsonObj[0].CUSTID).attr('disabled', true);
            }
            else {
                $('#cuscustomerid').val(jsonObj[0].CUSTID).attr('disabled', false);
            }
            if (jsonObj[0].TOWNSuspect == "" || jsonObj[0].TOWNSuspect == "False") {

                $('#town').val(jsonObj[0].TOWN).attr('disabled', true);

            } else {

                $('#town').val(jsonObj[0].TOWN).attr('disabled', false);
            }
            if (jsonObj[0].TOWNIDSuspect == "" || jsonObj[0].TOWNIDSuspect == "False") {
                $('#custownid').val(jsonObj[0].TOWNID).attr('disabled', true);
            } else {
                $('#custownid').val(jsonObj[0].TOWNID).attr('disabled', false);
            }

            if (jsonObj[0].CTSuspect == "" || jsonObj[0].CTSuspect == "False") {

                $('#cusct').val(jsonObj[0].CT).attr('disabled', true);
            }
            else {
                $('#cusct').val(jsonObj[0].CT).attr('disabled', false);
            }


        }

        function CustAndBrickErrorStatus(id)
        {
            myData = "{'id':'" + id + "' }";
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/ErrorStatusCustBrick",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessErrorStatusCustBrick,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessErrorStatusCustBrick(data) {
            var jsonObj = $.parseJSON(data.d);
            if(jsonObj[0].CustIDSuspect == 1)
            {
                $('#BrickError').hide();
                $('#CustError').show();
            }
            else if (jsonObj[0].TOWNIDSuspect == 1)
            {
                $('#CustError').hide();
                $('#BrickError').show();
            }
            else {
                $('#BrickError').hide();
                $('#CustError').hide();
            }

        }

        function UpdateCustomerData(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateCustomerData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateCustomer,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateCustomer(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function UpdateCustomerData1(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateCustomerDataMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateCustomer1,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateCustomer1(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else if (jsonObj == "SameCode") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("alert!", "Not Updated Due to Different Bricks!", "alert")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function UpdateCustomerData2(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/AddCustomerDataMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateCustomer2,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateCustomer2(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else if (jsonObj == "already") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("alert!", "Customer is Already inserted!", "alert")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function UpdateCustomerData3(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/AddCustomerDataMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateCustomer2,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateCustomer3(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else if (jsonObj == "already") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("alert!", "Customer is Already inserted!", "alert")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        //For bricks
        
        function UpdateBricksData(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateBricksData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBricks,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBricks(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }
        function UpdateBricksData1(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateBricksMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBrick1,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBrick1(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function UpdateBricksData2(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/AddBricksDataMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBricks2,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBricks2(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else if (jsonObj == "SameCode") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("alert!", "Already Brick is Open!", "alert")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        //For bricks
        
        function UpdateBricksData(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateBricksData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBricks,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBricks(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }
        function UpdateBricksData1(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateBricksMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBrick1,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBrick1(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function UpdateBricksData2(id) {

            var distributorcode = $('#cusdistributorcode').val();
            var customername = $('#customername').val();
            var cuscustomerid = $('#cuscustomerid').val();
            var town = $('#town').val();
            var custownid = $('#custownid').val();
            var cusct = $('#cusct').val();
            myData = "{'id':'" + id + "','distributorcode':'" + distributorcode + "','customername':'" + customername + "','cuscustomerid':'" + cuscustomerid + "','town':'" + town + "','custownid':'" + custownid + "','cusct':'" + cusct + "'}";

            //$('#myModal1').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/AddBricksDataMaster",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateBricks2,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateBricks2(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("success!", "Your work has been Updated!", "success")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else if (jsonObj == "SameCode") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("alert!", "Already Brick Added!", "alert")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        // $('#myModal1').modal('hide');
                        swal("error!", "Error Occurs!", "error")
                        //OnsuccessfillInvoicegrid();
                        //location.reload(true);
                    }, 1500);
                }
            }
        }

        function LoadingEditStockData(id) {

            myData = "{'id':'" + id + "' }";
            $(".updateStock").remove();
            $("#divAddStock").html("").append(" <button type='button' class='btn btn-primary create-task my-auto ml-auto updateStock' id='updateStock' onclick='UpdateStockData(" + id + ");'>Update</button>");

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetByIdStock",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessStockData,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessStockData(data) {

            var jsonObj = $.parseJSON(data.d);

            $('#stockid').val(jsonObj[0].Pk_StockID);
            if (jsonObj[0].distSuspect == "False" || jsonObj[0].distSuspect == "") {
                $('#stkdistributorcode').val(jsonObj[0].DSTBID).attr('disabled', true);
            } else {
                $('#stkdistributorcode').val(jsonObj[0].DSTBID).attr('disabled', false);
            }

            if (jsonObj[0].productSuspect == "False" || jsonObj[0].productSuspect == "") {
                $('#stkproduct').val(jsonObj[0].Product).attr('disabled', true);
            } else {
                $('#stkproduct').val(jsonObj[0].Product).attr('disabled', false);
            }

            if (jsonObj[0].productIdSuspect == "False" || jsonObj[0].productIdSuspect == "") {
                $('#stkproductid').val(jsonObj[0].ProductId).attr('disabled', true);
            } else {
                $('#stkproductid').val(jsonObj[0].ProductId).attr('disabled', false);

            }
            if (jsonObj[0].batchSuspect == "False" || jsonObj[0].batchSuspect == "") {

                $('#stkbatchno').val(jsonObj[0].BATCHNO).att('disabled', false);
            } else {

                $('#stkbatchno').val(jsonObj[0].BATCHNO).att('disabled', false);
            }
        }

        function UpdateStockData(id) {

            var stkdistributorcode = $('#stkdistributorcode').val();
            var stkproduct = $('#stkproduct').val();
            var stkproductid = $('#stkproductid').val();
            var stkbatchno = $('#stkbatchno').val();

            myData = "{'id':'" + id + "','stkdistributorcode':'" + stkdistributorcode + "','stkproduct':'" + stkproduct + "','stkproductid':'" + stkproductid + "','stkbatchno':'" + stkbatchno + "'}";

            // $('#myModal2').modal('hide');
            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/updateStockData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: onSuccessUpdateStock,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function onSuccessUpdateStock(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("success!", "Your work has been Updated!", "success")
                        location.reload(true);
                    }, 1500);
                }
                else {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("error!", "Error Occurs!", "error")
                        location.reload(true);
                    }, 1500);
                }
            }
        }

        function FillDistributor() {

            var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/GetAllDistributor",//sp_getalldistributor
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    if (response.d != '' && response.d != '[]') {
                        var msg = $.parseJSON(response.d);
                        $('#ddlDistributor').empty();
                        $('#ddlDistributor').append('<option value="-1" selected="selected">Select...</option>');
                        for (var i = 0; i < msg.length ; i++) {
                            //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                            if (i < 1) {
                                $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                            } else {
                                $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                            }
                        }
                    }
                },
                error: onError,
                async: false,
                cache: false
            });
        }

        function ReValidateeInvoice() {

            $('#loader').show();

            myData = "{'id':'" + BtnId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/RevalidateInvoiceData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessRevalidate,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function OnsuccessRevalidate(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        //$('#col6Date').hide();
                        swal("success!", "Your work has been Revalidate!", "success")
                        location.reload(true);
                    }, 1500);
                }
                else {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("error!", "Error Occurs!", "error")
                        location.reload(true);
                    }, 1500);
                }
            }
        }

        function ErrorCustomerExcell(type, fn, dl) {
            var elt = document.getElementById('datatables2');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "Error List" });
            return dl ?
              XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
              XLSX.writeFile(wb, fn || ('CustomerValidation.' + (type || 'xlsx')));
        }

        function ErrorInvoiceExcell(type, fn, dl) {
            var elt = document.getElementById('datatables');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "Error List" });
            return dl ?
              XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
              XLSX.writeFile(wb, fn || ('InvoiceValidation.' + (type || 'xlsx')));

        }

        function ReValidateeCustomer() {
            $('#loader').show();
            myData = "{'id':'" + BtnId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/RevalidateCustomerData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessRevalidateCustomer,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function OnsuccessRevalidateCustomer(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        //$('#col6Date').show();
                        swal("success!", "Your work has been Revalidate!", "success");
                        location.reload(true);
                    }, 1500)
                }
                else {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("error!", "Error Occure!", "error");
                        location.reload(true);
                    }, 1500)
                }
            }
        }

        function ReValidateeStock() {
            $('#loader').show();
            myData = "{'id':'" + BtnId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/RevalidateStockData",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessRevalidateStock,
                error: function (err) {
                    alert(err);
                },
            });
        }

        function OnsuccessRevalidateStock(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("success!", "Your work has been Revalidate!", "success")
                        location.reload(true);
                    }, 1500)
                }
                else {
                    //$('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').show();
                        swal("error!", "Error Occures!", "error")
                        location.reload(true);
                    }, 1500)
                }
            }
        }



        function getCustomer() {

            var distId = $('#DistId').val();
            myData = "{'id':'" + distId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetTownList",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessCustomerGrid,

                error: function (err) {
                    alert(err);
                }
            })
        }

        function OnsuccessCustomerGrid(response) {


            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,

                var tablestring = "<table id='datatables4' class='cell-border display  nowrap dataTable dtr-inline' style='width: 100% !important;' ><thead>" +// class='column-options' 
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='BrickCode' > BrickCode </th> " +
                                            "<th data-column-id='BrickName' >BrickName</th> " +
                                             "<th data-column-id='Edit' > Select </th> " +
                     "</tr></thead>" +
                    "<tbody id='values4'>";

                $("#CustomerGrid1").empty();
                $("#CustomerGrid1").append(tablestring);
                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values4').append($('<tr>' +
                           "<td>" + jsonObj[i].ID + "</td>" +
                           "<td>" + jsonObj[i].BrickCode + "</td>" +
                              "<td>" + jsonObj[i].BrickName + "</td>" +
                                  "<td><button type='button' class='btn btn-primary'  onClick=\"LoadingSelectCustomerData('" + jsonObj[i].ID + "','" + jsonObj[i].BrickCode + "','" + jsonObj[i].BrickName + "');\"><i class='ti-pencil-alt'></i></button></td>" +

                                  //"<td><button type='button' class='btn btn-primary'  onclick='LoadingSelectCustomerData('" + jsonObj[i].ID + "' ,'" + jsonObj[i].BrickCode + "','" + jsonObj[i].BrickName + "');'><i class='ti-pencil-alt'></i></button></td>" +
                   "</tr>"));
                }

                $("#CustomerGrid1").append('</tbody></table>');
                $('#datatables4').DataTable();
            }
            else {
                var tablestring = "<table id='datatables4' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                                 "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='BrickCode' > BrickCode </th> " +
                                            "<th data-column-id='BrickName' >BrickName</th> " +


                      "</tr></thead>" +
                     "<tbody id='values4'>";

                $("#CustomerGrid1").empty();
                $("#CustomerGrid1").append(tablestring);
                $('#datatables4').DataTable();

                AlertMsg('Data Not Found.');


            }


        }

        function LoadingSelectCustomerData(id, brickCode, brickName) {
            $('#myModaltown').hide();
            $('#town').val(brickName);
            $('#custownid').val(brickCode);
            $('#townid').val(brickCode);

        }


        function getClient() {

            var distId = $('#DistId').val();
            myData = "{'id':'" + distId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetClientList",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessClientGrid,

                error: function (err) {
                    alert(err);
                }
            })
        }

        function OnsuccessClientGrid(response) {


            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,

                var tablestring = "<table id='datatables5' class='cell-border display  nowrap dataTable dtr-inline' style='width: 100% !important;' ><thead>" +// class='column-options' 
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='PharmacyCode' > PharmacyCode </th> " +
                                            "<th data-column-id='PharmacyName' >PharmacyName</th> " +
                                            "<th data-column-id='Edit' > Select </th> " +
                     "</tr></thead>" +
                    "<tbody id='values5'>";

                $("#ClientGrid1").empty();
                $("#ClientGrid1").append(tablestring);
                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values5').append($('<tr>' +
                           "<td>" + jsonObj[i].ID + "</td>" +
                           "<td>" + jsonObj[i].PharmacyCode + "</td>" +
                              "<td>" + jsonObj[i].PharmacyName + "</td>" +

                                  "<td><button type='button' class='btn btn-primary'  onClick=\"LoadingSelectClientData('" + jsonObj[i].ID + "','" + jsonObj[i].PharmacyCode + "','" + jsonObj[i].PharmacyName + "');\"><i class='ti-pencil-alt'></i></button></td>" +
                   "</tr>"));
                }

                $("#ClientGrid1").append('</tbody></table>');
                $('#datatables5').DataTable();
            }
            else {
                var tablestring = "<table id='datatables5' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                                 "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='PharmacyCode' > PharmacyCode </th> " +
                                            "<th data-column-id='PharmacyName' >PharmacyName</th> " +


                      "</tr></thead>" +
                     "<tbody id='values5'>";

                $("#ClientGrid1").empty();
                $("#ClientGrid1").append(tablestring);
                $('#datatables5').DataTable();

                AlertMsg('Data Not Found.');


            }


        }

        function LoadingSelectClientData(id, PharmacyCode, PharmacyName) {

            $('#myModalcus').hide();
            $('#cuscustomerid').val(PharmacyCode);
            $('#customername').val(PharmacyName);
            $('#customerid').val(PharmacyCode);


        }



        function getPrduct() {

            var distId = $('#DistId').val();
            myData = "{'id':'" + distId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetProductList",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessProductGrid,

                error: function (err) {
                    alert(err);
                }
            })
        }

        function OnsuccessProductGrid(response) {

            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);// ID,BrickCode,	BrickName,

                var tablestring = "<table id='datatables6' class='cell-border display  nowrap dataTable dtr-inline' style='width: 100% !important;' ><thead>" +// class='column-options' 
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='SysProductName' > SysProductName </th> " +
                                            "<th data-column-id='DistProductCode' >DistProductCode</th> " +
                                            "<th data-column-id='Edit' > Select </th> " +
                     "</tr></thead>" +
                    "<tbody id='values6'>";

                $("#ProductGrid1").empty();
                $("#ProductGrid1").append(tablestring);
                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values6').append($('<tr>' +
                           "<td>" + jsonObj[i].pk_ProductMapId + "</td>" +
                           "<td>" + jsonObj[i].SysProductName + "</td>" +
                              "<td>" + jsonObj[i].DistProductCode + "</td>" +

                                  "<td><button type='button' class='btn btn-primary'  onClick=\"LoadingSelectProductData('" + jsonObj[i].pk_ProductMapId + "','" + jsonObj[i].SysProductName + "','" + jsonObj[i].DistProductCode + "');\"><i class='ti-pencil-alt'></i></button></td>" +
                   "</tr>"));
                }

                $("#ProductGrid1").append('</tbody></table>');
                $('#datatables6').DataTable();
            }
            else {
                var tablestring = "<table id='datatables6' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                                  "<th data-column-id='SysProductName' > SysProductName </th> " +
                                            "<th data-column-id='DistProductCode' >DistProductCode</th> " +
                                            "<th data-column-id='BrickName' >BrickName</th> " +


                      "</tr></thead>" +
                     "<tbody id='values6'>";

                $("#ProductGrid1").empty();
                $("#ProductGrid1").append(tablestring);
                $('#datatables6').DataTable();

                AlertMsg('Data Not Found.');


            }


        }

        function LoadingSelectProductData(id, SysProductName, DistProductCode) {
            $('#myModalPro').hide();
            $('#productsid').val(DistProductCode);
            $('#product').val(SysProductName);

        }


        function RedircetAddBrick() {
            var url = "../BWSD/SalesBricks.aspx"
            window.open(url, '_blank');

        }

        function RedircetAddCustomer() {
            var url = "../BWSD/Salesclient.aspx"
            window.open(url, '_blank');
        }

        function RedircetAddProduct() {
            var url = "../Form/ProductSku.aspx"
            window.open(url, '_blank');
        }


        function FinalInsertInvoicee() {

            var Check = confirm("Are You Sure To Insert The Records!");
            if (Check == true) {

                $('#loader').show();
                myData = "{'id':'" + BtnId + "' }";

                $.ajax({
                    type: "POST",
                    url: "FileGridList.asmx/SendDbDataInInvoice",
                    contentType: "application/json; charset=utf-8",
                    data: myData,
                    dataType: "json",
                    success: OnsuccessDbData,
                    error: function (err) {
                        alert(err);
                    }
                })
            }
        }

        function OnsuccessDbData(data, status) {
            if (data.d != "") {
                var jsonObj = data.d;
                if (jsonObj == "OK") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        swal("success!", "Your Invoice data has been Send For Process!", "success")
                        //location.reload(true);
                    }, 1500)
                    // location.reload(true);
                }
                else if (jsonObj == "Already inserted") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        swal("warning!", "Already inserted!", "warning")
                        //location.reload(true);
                    }, 1500)
                    // location.reload(true);
                }
                else if (jsonObj == "Error In inserted") {
                    $('#loader').show();
                    $('#col6Date').hide();
                    setTimeout(function () {
                        $('#dialog').jqmHide();
                    }, 1000);
                    setTimeout(function () {
                        $('#loader').hide();
                        $('#col6Date').hide();
                        swal("error!", "Error In inserted!", "error")
                        //location.reload(true);
                    }, 1500)
                    // location.reload(true);
                }
            }
        }



        function getdiffrenceShowData() {
            var date = $('#txtDate').val();
            var distbutorId = $('#ddlDistributor').val();


            myData = "{'date':'" + date + "','distbutorId':'" + distbutorId + "' }";

            $.ajax({
                type: "POST",
                url: "FileGridList.asmx/GetFilesGridList",
                contentType: "application/json; charset=utf-8",
                data: myData,
                dataType: "json",
                success: OnsuccessshowData,
                //beforeSend: startingAjax,
                beforeSend: function () {
                    $('#loader').show();
                    $('#col6Date').hide();
                },
                complete: function () {
                    $('#loader').hide();
                    $('#col6Date').show();
                },
                //complete: ajaxCompleted,
                error: function (err) {
                    alert(err);
                },
                async: false,
                cache: false
            })
        }

        function OnsuccessshowData(response) {

            $('#ReValidateInvoice').hide();
            $('#ReValidateCustomer').hide();
            $('#ReValidateStock').hide();
            $('#FinalInsertInvoice').hide();

            if (response.d != '') {

                var jsonObj = $.parseJSON(response.d);

                var tablestring = "<table id='datatablesgrid' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +
                               "<tr style='background-color: #217ebd;color: white;' >" +
                                             "<th data-column-id='Id' > Id </th> " +
                                             "<th data-column-id='FileName' > FileName </th> " +
                                               "<th data-column-id='FilePath' > FilePath </th> " +
                                            "<th data-column-id='FileType' >FileType</th> " +
                                            "<th data-column-id='FileRecords' >FileRecords</th> " +
                                            "<th data-column-id='CreateTime'  >CreateTime</th> " +
                                           "<th data-column-id='Action' >Action</th> " +

                     "</tr></thead>" +
                    "<tbody id='values'>";

                $("#divProductGrid").empty();
                $("#divProductGrid").append(tablestring);

                for (var i = 0; i < jsonObj.length ; i++) {
                    $('#values').append($('<tr>' +
                           "<td>" + jsonObj[i].ID + "</td>" +
                           "<td>" + jsonObj[i].FileName + "</td>" +
                           "<td>" + jsonObj[i].FilePath + "</td>" +
                           "<td>" + jsonObj[i].FileType + "</td>" +
                           "<td>" + jsonObj[i].FileRecords + "</td>" +
                           "<td>" + jsonObj[i].CreateTime + "</td>" +
                           //"<td><a onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "');\" style='vertical-align: text-top;' id='btnView'>View</a></td>" +
                           "<td><button type='button' class='btn btn-primary' id='btnView' onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "','" + jsonObj[i].FileName + "');\"><i class='ti-eye'></i></button></td>" +
                           //  "<td><button type='button' class='btn btn-primary' id='btnView' onClick=\"ViewTxtFile('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "','" + jsonObj[i].FileName + "');\"><i class='ti-eye'></i></button> <button type='button' class='btn btn-primary ml-3' id='btnView' onClick=\"SendValidateData('" + jsonObj[i].ID + "','" + jsonObj[i].FileType + "');\"><i class='ti-share'></i></button></td>" +


                   "</tr>"));
                }

                $("#divProductGrid").append('</tbody></table>');
                $('#datatablesgrid').DataTable();


            }
            else {
                var tablestring = "<table id='datatablesgrid' class='cell-border display  nowrap dataTable dtr-inline' ><thead>" +// class='column-options' 
                                "<tr style='background-color: #217ebd;color: white;' >" +
                                           "<th data-column-id='Id' > Id </th> " +
                                           "<th data-column-id='FileName' > FileName </th> " +
                                           "<th data-column-id='FilePath' > FilePath </th> " +
                                           "<th data-column-id='FileType' >FileType</th> " +
                                           "<th data-column-id='FileRecords' >FileRecords</th> " +
                                           "<th data-column-id='CreateTime'  >CreateTime</th> " +
                      "</tr></thead>" +
                     "<tbody id='values'>";

                $("#divProductGrid").empty();
                $("#divProductGrid").append(tablestring);
                $('#datatablesgrid').DataTable();

                AlertMsg('Data Not Found.');


            }

        }




        //Send data work

        //function SendValidateData(Id, fileName) {

        //    myData = "{'id':'" + Id + "' }";

        //    if (fileName == "INV") {
        //        $.ajax({
        //            type: "POST",

        //            url: "FileGridList.asmx/SendInvoiceData",
        //            contentType: "application/json; charset=utf-8",
        //            data: myData,
        //            dataType: "json",
        //            success: OnsuccessSendInvoice,
        //            error: function (err) {
        //                alert(err);
        //            },
        //        });
        //    }
        //    else if (fileName == "CUST") {

        //        $.ajax({
        //            type: "POST",
        //            url: "FileGridList.asmx/SendCustomerData",
        //            contentType: "application/json; charset=utf-8",
        //            data: myData,
        //            dataType: "json",
        //            success: OnsuccessSendCustomer,

        //            error: function (err) {
        //                alert(err);
        //            }
        //        })
        //    }
        //    else if (fileName == "STOCK") {
        //        $.ajax({
        //            type: "POST",
        //            url: "FileGridList.asmx/SendStockData",
        //            contentType: "application/json; charset=utf-8",
        //            data: myData,
        //            dataType: "json",
        //            success: OnsuccessSendStock,

        //            error: function (err) {
        //                alert(err);
        //            }
        //        })
        //    }

        //}

        //function OnsuccessSendInvoice() {
        //    setTimeout(function () {
        //        $('#dialog').jqmHide();
        //    }, 1000);
        //    setTimeout(function () {
        //        swal("success!", "Your Invoice data has been Send!", "success")
        //        this.getList();
        //    }, 1500)
        //    // location.reload(true);
        //}


        //function OnsuccessSendCustomer() {
        //    setTimeout(function () {
        //        $('#dialog').jqmHide();
        //    }, 1000);
        //    setTimeout(function () {
        //        swal("success!", "Your Customer data has been Send!", "success")
        //        this.getList();

        //    }, 1500)
        //    // location.reload(true);
        //}


        //function OnsuccessSendStock() {
        //    setTimeout(function () {
        //        $('#dialog').jqmHide();
        //    }, 1000);
        //    setTimeout(function () {
        //        swal("success!", "Your Stock has been Send!", "success")
        //        this.getList();

        //    }, 1500)
        //    // location.reload(true);
        //}


        //end




        //End My New Work Here !

        function filproductdata(data) {

            $("#prodgriddiv").empty();
            $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
            $("#prodgrid-basic").empty();
            $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr >" +
                                "<th data-column-id='Delete' ></th>" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='DistributorName' > Distributor Name </th> " +
                                            "<th data-column-id='ProductCode' >Product Code</th> " +
                                            "<th data-column-id='ProductName' >Product Name</th> " +
                                            "<th data-column-id='SysProductCode'  >System Product Code</th> " +
                                            "<th data-column-id='SystemProduct' >System Product</th> " +


                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' >");

            if (data != "") {

                var msg = "";
                if (data.d == undefined) {
                    msg = $.parseJSON(data);
                }
                else {
                    if (data.d != "")
                        msg = $.parseJSON(data.d);
                    else
                        msg = 0;
                }

                if (CurrentUserRole == 'Admin' || CurrentUserRole == 'admin') {

                    $("#prodgriddiv").empty();
                    $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                    $("#prodgrid-basic").empty();
                    $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                        "<tr >" +


                                   //     DistributorName	ProductCode	ProductName	SysProductCode	SystemProduct
                                            //"<th data-column-id='DocCode' >Doctor Code</th>" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                            "<th data-column-id='Product Code' >Product Code</th> " +
                                            "<th data-column-id='Product Name' >Product Name</th> " +
                                            "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                            "<th data-column-id='System Product' >System Product</th> " +
                                           // "<th data-column-id='Addres1' >Address</th> " +
                                          //  "<th data-column-id='Qualification' >Qualification</th> " +
                                          //  "<th data-column-id='Speciality' > Speciality</th> " +
                                           "<th data-column-id='Product Map' > Product Map </th> " +
                                           //<input style='vertical-align: middle;margin-top: 0px;' type='checkbox' style='vertical-align: middle;margin-top: 0px;margin-left: 10px;' name='ApproveAll' onClick=\"SelectAllApproveCheckBoxes();\">
                                          // "<th data-column-id='Reject' >Reject</th>" +
                                         //"<th data-column-id='VerifiedByFlm' >Verified by AM</th>" +
                                          //"<th data-column-id='VerifiedByRSM' >Verified by SM</th>" +
                                          //"<th data-column-id='VerifiedByNSM' >Verified by RTL</th>" +
                                          //"<th data-column-id='AprovedByAdmin' >Aproved by Admin</th>" +
                                          //"<th data-column-id='Edit'></th>" +
                                          //"<th data-column-id='Delete'></th>" +

                                        "</tr>" +
                                      "</thead>" +
                                      "<tbody id='values' >");
                    var val = '';
                    if (msg.length > 0) {

                        for (var i = 0; i < msg.length ; i++) {
                            val = "<tr>" +

                             "<td>" + msg[i].Id + "</td>" +
                             "<td>" + msg[i].DistributorName + "</td>" +
                              "<td>" + msg[i].ProductCode + "</td>" +
                              "<td>" + msg[i].ProductName + "</td>" +
                              "<td>" + msg[i].SysProductCode + "</td>" +
                              "<td class='sysName" + jsonObj[i].Id + "'>" + msg[i].SystemProduct + "</td>" +

                               "<td><a onClick=\"MapProduct_ById('" + msg[i].Id + "');\" href='javascript:;' class='mapped'  value='" + jsonObj[i].Id + "' style='vertical-align: text-top;' >Map</a></td>" +
                              "</tr></tbody>"
                            $('#values').append(val);
                        }
                    }

                    $("#prodgrid-basic").DataTable({
                        columnDefs: [{ orderable: false, "targets": -1 }]
                    });
                }
                else {
                    $("#prodgriddiv").empty();
                    $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                    $("#prodgrid-basic").empty();
                    $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                        "<tr>" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                            "<th data-column-id='Product Code' >Product Code</th> " +
                                            "<th data-column-id='Product Name' >Product Name</th> " +
                                            "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                            "<th data-column-id='System Product' >System Product</th> " +

                                        "</tr>" +
                                      "</thead>" +
                                      "<tbody id='values'>");
                    var val = '';
                    for (var i = 0; i < msg.length ; i++) {
                        val = "<tr>" +


                            //SalesDistID	DistributorName	ProductCode	ProductName	SysProductCode	SystemProduct
                            "<td>" + msg[i].Id + "</td>" +
                            "<td>" + msg[i].DistributorName + "</td>" +
                          "<td>" + msg[i].ProductCode + "</td>" +
                          "<td>" + msg[i].ProductName + "</td>" +
                          "<td>" + msg[i].SysProductCode + "</td>" +
                          "<td class='sysName" + jsonObj[i].Id + "'>" + msg[i].SystemProduct + "</td>" +


                        $('#values').append(val);
                    }
                    $("#prodgrid-basic").DataTable({
                        columnDefs: [{ orderable: false, "targets": -1 }]
                    });
                }
            }
            else {

                $("#prodgriddiv").empty();
                $("#prodgriddiv").append("<table id='prodgrid-basic' class='table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed'></table>");
                $("#prodgrid-basic").append("<thead style='background: darkgray;'>" +
                                "<tr >" +
                                "<th data-column-id='Delete' ></th>" +
                                            "<th data-column-id='Id' > Id </th> " +
                                            "<th data-column-id='Distributor Name' > Distributor Name </th> " +
                                            "<th data-column-id='Product Code' >Product Code</th> " +
                                            "<th data-column-id='Product Name' >Product Name</th> " +
                                            "<th data-column-id='System Product Code'  >System Product Code</th> " +
                                            "<th data-column-id='System Product' >System Product</th> " +


                                "</tr>" +
                              "</thead>" +
                              "<tbody id='values' >");
                $("#prodgrid-basic").DataTable({
                    columnDefs: [{ orderable: false, "targets": -1 }]
                });
            }
        }

        function AlertMsg(text) {
            swal("warning!", text, "warning")
            //toastr.info(text, 'Alert', {
            //    "closeButton": true,
            //    "debug": false,
            //    "positionClass": "toast-top-center",
            //    "onclick": null,
            //    "showDuration": "5000",
            //    "hideDuration": "9000",
            //    "timeOut": "30000",
            //    "extendedTimeOut": "1000",
            //    "showEasing": "swing",
            //    "hideEasing": "linear",
            //    "showMethod": "fadeIn",
            //    "hideMethod": "fadeOut"
            //});
        }



        // OnPage Load Multiple Selection DropdownList


        function FillDistributor() {

            var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/GetAllDistributor",//sp_getalldistributor
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    if (response.d != '' && response.d != '[]') {
                        var msg = $.parseJSON(response.d);
                        $('#ddlDistributor').empty();
                        $('#ddlDistributor').append('<option value="-1" selected="selected">Select...</option>');
                        for (var i = 0; i < msg.length ; i++) {
                            //$('#ddlSpeciality').append('<option value="' + msg[i].Speciality + '">' + msg[i].Speciality + '</option>');
                            if (i < 1) {
                                $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                            } else {
                                $('#ddlDistributor').append('<option value="' + msg[i].ID + '">' + msg[i].Distributor + '</option>');
                            }
                        }
                    }
                },
                error: onError,
                async: false,
                cache: false
            });
        }

        function FillProduct() {

            var mydata = "{'EmployeeId':'" + EmployeeId + "'}";

            $.ajax({
                type: "POST",
                url: "ProductAlignmentService.asmx/GetAllProduct",//sp_getalldistributor  ddlAllProduct
                data: mydata,
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    if (response.d != '' && response.d != '[]') {
                        var msg = $.parseJSON(response.d);
                        $('#ddlAllProduct').empty();
                        $('#ddlAllProduct').append('<option value="-1" selected="selected">Select...</option>');
                        for (var i = 0; i < msg.length ; i++) {

                            if (i < 1) {
                                $('#ddlAllProduct').append('<option value="' + msg[i].ID + '">' + msg[i].ProductSku + '</option>');
                            } else {
                                $('#ddlAllProduct').append('<option value="' + msg[i].ID + '">' + msg[i].ProductSku + '</option>');
                            }
                        }
                    }
                },
                error: onError,
                async: false,
                cache: false
            });
        }

        function GetProduct() {

            $.ajax({
                type: "POST",
                url: "DoctorsService.asmx/GetProduct",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: FillddlProduct,
                error: onError,
                cache: false,
                async: false
            });
        }

        function FillddlProduct(data, status) {

            if (data.d != "") {

                jsonObj = jsonParse(data.d);

                $.each(jsonObj, function (i, tweet) {
                    $("#ddlProduct").append("<option value='" + jsonObj[i].ProductId + "'>" + jsonObj[i].ProductName + "</option>");
                });
            }
        }




        // Functions
        function onSuccess(data, status) {

            var msg = '';

            if (data.d == "OK") {

                var mode = $('#hdnMode').val();

                if (mode === "AddMode") {

                    msg = 'Data inserted succesfully!';
                }
                else if (mode === "EditMode") {

                    msg = 'Data updated succesfully!';
                }
                else if (mode === "DeleteMode") {

                    msg = 'Data deleted succesfully!';
                    // $('#divConfirmation').jqmHide();
                }
                else if (mode === "V") {

                    msg = 'Doctor Verified succesfully!';
                }
                else if (mode === "R") {

                    msg = 'Doctor Request Rejected succesfully!';
                }

                ClearFields();
                $('#hdnMode').val("");

                window.alert(msg);
                $('#btnOk').click();
                // $('#hlabmsg').append(msg);
                // $('#Divmessage').jqmShow();
            }
            else if (data.d == "Not able to delete this record due to linkup.") {

                // $('#divConfirmation').jqmHide();
                msg = 'Not able to delete this record due to linkup.';

                //$('#hlabmsg').append(msg);

                window.alert(msg);
                $('#btnOk').click();
                // $('#Divmessage').jqmShow();
            } else if (data.d == "Already Exist!") {
                msg = 'Already Exist in Your Doctor List!';
                ClearFields();
                $('#hdnMode').val("");


                window.alert(msg);
                $('#btnOk').click();
                //$('#hlabmsg').append(msg);
                //$('#Divmessage').jqmShow();
            }
            //FillProductGrid(EmployeeId);
        }
        function onError(request, status, error) {

            //$('#divConfirmation').hide();
            msg = 'Error is occured';


            window.alert(msg);
            $('#btnOk').click();
            //$('#hlabmsg').append(msg);
            //$('#Divmessage').jqmShow();
        }
        function startingAjax() {

            $('#loader').show();
        }
        function ajaxCompleted() {

            $('#loader').hide();
        }

        $(document).ready(function () {

            $(document).on('click', '#btnView', function (e) {

                if ($('#divProductGrid').hasClass('d-none')) {
                    $('#divProductGrid').removeClass("d-none");
                    $('#cmt-grid').addClass("d-none");
                    $('#shw-btn').removeClass("d-none");
                }
                else {
                    $('#cmt-grid').removeClass("d-none");
                    $('#shw-btn').removeClass("d-none");
                    $('#divProductGrid').addClass("d-none");
                }
            });

            $(document).on('click', '#shw-btn', function (e) {

                if ($('#cmt-grid').hasClass('d-none')) {
                    $('#cmt-grid').removeClass("d-none");
                    $('#shw-btn').addClass('d-none');
                    $('#InvoiceGrid').addClass("d-none");
                    $('#CustomerGrid').addClass("d-none");
                    $('#StockGrid').addClass("d-none");
                    $('#divProductGrid').removeClass("d-none");
                }
                else {
                    $('#cmt-grid').addClass("d-none");
                }
            });

        });
    </script>
</asp:Content>
