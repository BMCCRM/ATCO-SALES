<%@ Page Title="Sales Upload" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesUpload.aspx.cs" Inherits="PocketDCR2.Form.SalesUpload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
   <%-- <script type="text/javascript" src="../Schedular/jquery/jquery-1.7.1.min.js"></script>--%>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script src="../assets/js/jquery3.1.0.js"  type="text/javascript"></script>

    <link href="../Form/assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.fontAwesome.css" rel="stylesheet" />
    
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
 
        <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />

     <script src="../assets/js/bootstrap-datepicker.min.js"></script>

    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' type='text/css' href='../Styles/LayOut.print.css' media='print' />
    <script src="saletxtupload.js" type="text/javascript"></script>
         
     <script type="text/javascript">


         var $j = jQuery.noConflict();
        // $j("#datepicker").datepicker();

         $j(document).ready(function () {


             $j('#txttMonth').datepicker({
                 format: "MM yyyy",
                 startView: "months",
                 minViewMode: "months",
                 orientation: 'top',
                 autoclose: true,
                 todayHighlight: true
             }).datepicker("setDate", new Date());

             $j('#txtpMonth').datepicker({
                 format: "MM yyyy",
                 startView: "months",
                 minViewMode: "months",
                 orientation: 'top',
                 autoclose: true,
                 todayHighlight: true
             }).datepicker("setDate", new Date());


             $j('#txtMDate').datepicker({
                 format: "MM yyyy",
                 startView: "months",
                 minViewMode: "months",
                 orientation: 'top',
                 autoclose: true,
                 todayHighlight: true
             }).datepicker("setDate", new Date());

             $j('#txtMYDate').datepicker({
                 format: "MM yyyy",
                 startView: "months",
                 minViewMode: "months",
                 orientation: 'top',
                 autoclose: true,
                 todayHighlight: true
             }).datepicker("setDate", new Date());

         });
         


    </script>
   

    <style type="text/css">
              #preloader {
            display: none;
        }
         
        .loading
        {
           /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;*/
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
        .pre-txt {
            padding: 2%;
            text-align: center;
            font-size: 20px;
             }
        .pre-img {
                padding-left: 17px;
            }
          .loading1
        {
           /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 22px;*/
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

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div class="pop_box-outer back" id="dialog" >
        <div class="loading" style="font-family:Arial;font-size:larger;">
            <p class="pre-txt">Sale Data Uploading...</p>
            <div class="pre-img"><img src="../Images/loading_bar.gif" /></div>
        </div>
        <div class="clear">
        </div>
    </div>
    
  <div class="pop_box-outer back" id="dialog1" >
        <div class="loading1" style="font-family:Arial;font-size:larger;">
            <p class="pre-txt">Sale Data Processing...</p>
            <div class="pre-img"><img src="../Images/loading_bar.gif" /></div>
        </div>
        <div class="clear">
        </div>
    </div>
 <%--   <div id="preloader" class="loadingdivOuter">
        <img src="../Images/loading2.gif" alt="Please Wait" title="Please Wait" />
        <br />

        Please wait
    </div>--%>
    
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <Triggers>
        </Triggers>
        <ContentTemplate>
            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                    Sales Data Upload</h1>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" Style="display: none;" />
                <!--OnClick="btnRefresh_Click"-->

                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
            </div>


            <div style="vertical-align: middle; text-align: center; padding: 5px;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
            </div>


           
              <div class="container">
  <h2  style="text-align:left" id="dname">Sales Data Upload Process: </h2>
  <ul class="nav nav-tabs">
    <%--<li class="active"><a data-toggle="tab" href="#divupload">Distributor TXT Attachment</a></li>--%>
<%--    <li><a data-toggle="tab" href="#divbrick">Brick Alignment</a></li>
    <li><a data-toggle="tab" href="#divproduct">Product Alignment</a></li>--%>
     <li class="active"><a data-toggle="tab" href="#divexcelupload">Distributor Excel Attachment</a></li> 
    <li><a data-toggle="tab" href="#divprocess">Proceed</a></li> 
    <li><a data-toggle="tab" href="#divtruncate">Truncate</a></li> 
  </ul>

  <div class="tab-content">
 
    <%--<div id="divupload" class="tab-pane fade in active">
    <div class="wrapper-inner" id="id-form">
                <div class="wrapper-inner-left">
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




                </div>
            </div>
    </div>--%>

      
    <div id="divexcelupload" class="tab-pane fade in active">
    <div class="wrapper-inner" id="id-form1">
                <div class="wrapper-inner-left">
                    <div class="ghierarchy bottom">
                        <div class="inner-head">
                            <h2>Sales Excel Data Upload</h2>
                        </div>
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">

                            <tr>
                                <td style="padding-left:10px;">
                                    <label>Select Date &nbsp;</label>
                                    <input type="text" id="txtMYDate" name="txtMYDate" placeholder="Enter Month">
                                </td>
                                <td>
                                    <input type="file" name="excelfile_upload" id="excelfile_upload" value="txt file upload" onchange="ExcelUploader()" />
                                </td>

                            </tr>
                            
                        </table>
                    </div>




                </div>
            </div>
    </div>


    <div id="divbrick" class="tab-pane fade">
         <div class="container-fluid">
        <div class="col-sm-12">
      
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Product.png" />
                        Brick Alignment</h1>
                  
                    <asp:HiddenField ID="HiddenField1" runat="server" ClientIDMode="Static" />
                </div>

                <div id="divBrickMapping" class="modal fade" role="dialog" aria-labelledby="divBrickMapping" aria-hidden="true" data-backdrop="static" title="Brick Mapping">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h1 class="modal-title"> Brick Mapping</h1>
                            </div>
                            <div class="modal-body">
                                 <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="ddlAllDist" class="form-control-label"> System Distributor :</label>
                                                    <select id="ddlAllDist" name="ddlAllDist" class="form-control selectauto" >
                                                             <option value="-1" selected="selected">Select Distributor</option>
                                                    </select>
                                                   
                                                </div>
                                            </div>
                                             <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="Brick" class="form-control-label"> System Brick :</label>
                                                    <select id="ddlAllBrick" name="ddlAllBrick" class="form-control selectauto" >
                                                             <option value="-1" selected="selected">Select Brick</option>
                                                    </select>
                                                   
                                                </div>
                                            </div>

                                            </div>
                                        </div>
                                     </form>
                            </div>
                            <div class="modal-footer">
                                <button  id="btnAlignBrick" name="btnAlignBrick"  type="button" class="btn btn-success">Align Map</button>
                                <button  id="btnbrickAlignCancel" name="btnbrickAlignCancel"  type="button" class="btn btn-default" >Close</button>
                            </div>
                        </div>
                    </div>
                  
                </div>


                <div>
                    <asp:Label ID="Label1" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div  >
                    <div >
                        <h2>Filters</h2>
                    </div>
                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                    
                            <td><b>Search By Month : &nbsp;</b></td>
                            <td>
                                <input  type="text" id="txtMonth" name="txtMonth"   placeholder="Enter Month"/>
                            
                            </td>
                            
                               <td><b>Search By Distributor : &nbsp;</b></td>
                         
                            <td>
                                <select id="ddlDistributor" name="ddlDistributor" class="styledselect_form_1" onchange="OnChangeddlp6();">
                                    <option value="-1">Select...</option>
                                </select>
                            </td>
                        </tr>

                           
                        
                    </table>
                </div>

                <div class="divgrid" id="griddiv" >
                    <table id="grid-basic" class="table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed" ></table>
                </div>


              
    </div>
</div>
    </div>

    
    <div id="divproduct" class="tab-pane fade">
         <div class="container-fluid">
        <div class="col-sm-12">
      
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Product.png" />
                        Product Alignment</h1>
                   
                    <asp:HiddenField ID="HiddenField2" runat="server" ClientIDMode="Static" />
                </div>

                <div id="divProductMapping" class="modal fade" role="dialog" aria-labelledby="divProductMapping" aria-hidden="true" data-backdrop="static" title="Product Mapping">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h1 class="modal-title"> Product Mapping</h1>
                            </div>
                            <div class="modal-body">
                                 <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="Product" class="form-control-label"> System Product :</label>
                                                    <select id="ddlAllProduct" name="ddlAllProduct" class="form-control" >
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
                                <button  id="btnAlignProduct" name="btnAlignProduct"  type="button" class="btn btn-success">Align Map</button>
                                <button  id="btnAlignCancel" name="btnAlignCancel"  type="button" class="btn btn-default" >Close</button>
                            </div>
                        </div>
                    </div>
                  
                </div>


                <div>
                    <asp:Label ID="Label2" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div >
                    <div >
                        <h2>Filters</h2>
                    </div>
                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                        
                            <td><b>Search By Month : &nbsp;</b></td>
                            <td>
                                <input  type="text" id="txtMonth" name="txtMonth"   placeholder="Enter Month"/>
                           
                            </td>
                            
                               <td><b>Search By Distributor : &nbsp;</b></td>
                        
                            <td>
                                <select id="ddlproductDistributor" name="ddlproductDistributor" class="styledselect_form_1" onchange="OnChangeddlforProduct();">
                                    <option value="-1">Select...</option>
                                </select>
                            </td>
                        </tr>

                           
                        
                    </table>
                </div>

                <div class="divgrid" id="prodgriddiv" >
                    <table id="prodgrid-basic" class="table table-striped table-bordered table-hover dt-responsive dataTable no-footer dtr-inline collapsed" ></table>
                </div>

    </div>
  
   
  </div>
</div>
        
        <div id="divprocess" class="tab-pane fade">
                <input  type="text" id="txtMDate" name="txtMDate"   placeholder="Enter Month" />
                            
             <button  name="btn_upload" id="btn_upload" value="Proceed" onclick="ProcessDATADSR()"  >Proceed</button>
                      
    </div>
      <div id="divtruncate" class="tab-pane fade">

          <input  type="text" id="txttMonth" name="txttMonth"   placeholder="Enter Month" />
                            
             <button  name="btn_truncate" id="btn_truncate" value="Proceed" onclick="ProcessTruncateDSR()"  >Truncate</button>
                      
    </div>
          <div class="clear">
            </div>



        </ContentTemplate>
    </asp:UpdatePanel>
     
   <%--  <input type="file" name="file_upload" id="file_upload" />--%>
  
 <%--<input id="btnUpload" type="button" onclick="gethit()" value="Upload Excel of Sales" />--%>

        <script src="../assets/js/jquery3.1.0.js"  type="text/javascript"></script>

     <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
    

<%--     <script type="text/javascript" src="../Form/assets_new/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="../Form/assets_new/bootstrap.min.js"></script>--%>
</asp:Content>
