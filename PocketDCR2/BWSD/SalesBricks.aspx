<%@ Page Title="Sales Brick Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesBricks.aspx.cs" Inherits="PocketDCR2.BWSD.SalesBricks" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/clockface/css/clockface.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css"  />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />

      <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>
        <script src="../Scripts/jquery-ui-1.12.1.js"  type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
     <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
      <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>

    <script src="SalesBrick.js" type="text/javascript"></script>

    <style type="text/css">
           .loading
        {
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
              .back {
             position: fixed;
            top: 0;
            left: 0;
            bottom:0;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            z-index:9999;
        }
         </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div style="height:15px"></div>
    <div class="page-head">
        <div class="container-fluid">
            <div class="page-title">
                <h1><small>Sales Bricks Setup</small> </h1>
            </div>
        </div>
    </div>
   
       <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
     <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <div class="container-fluid">
            <div class="portlet light bordered">
                <div id="table" class="form-body">
                    <div class="row">
                        <div id="Salebrick" class="col-sm-12"></div>

                    </div>
                </div>
            </div>
              <div class="portlet light bordered">
                <div id="hirarchy" class="form-body">

                    <div id="table1" class="form-body">
                        <h4>Add New Sales Brick</h4>
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
                                    <div id="colcity" class="col-sm-6 ">

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

                                   <label id="Label5" class="col-md-3 control-label">Distributor :</label>
                                  <div class="col-md-9">
                                         <select id="ddl5" class="form-control input-sm">
                                           <option value="-1">Select Distributor</option>
                                            </select>
                                        </div>

                                    </div>
                                    
                               
                                  

                                  <div class="col-sm-6 ">

                                   <label id="Label6" class="col-md-3 control-label">Brick Type :</label>
                                  <div class="col-md-9">
                                       <select id="ddl6" name="ddl6" class="form-control input-sm" style="display: inline-block;">
                                                                <option value="-1">Select Type</option>
                                                            </select>
                                        </div>

                                    </div>
                                    
                                </div>
                              

                                <div class="form-group">
                                    <div id="colcode" class="col-sm-6 ">
                                        <label id="Labelcode" class="col-md-3 control-label">Code :</label>
                                        <div class="col-md-9">
                                             
                                            <input id="txtCode" class="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div id="colname" class="col-sm-6 ">
                                        <label id="Labelname" class="col-md-3 control-label">Name :</label>
                                        <div class="col-md-9">
                                            <input id="txtName" class="form-control input-sm" />
                                        </div>
                                    </div>
                                </div>
                                 <div class="form-group">
                                    <div id="colcodechk" class="col-sm-6 ">
                                        <label id="Labelchk" class="col-md-3 control-label">Status  :</label>
                                        <div class="col-md-9">
                                              <input id="chkActive" name="chkActive" type="checkbox" value="Active" checked="checked" />
                                            
                                        </div>
                                    </div>
                                     </div>
                                <div class="form-group">
                                    <div class="col-sm-6 ">
                                        <label id="Lab" class="col-md-3 control-label"></label>
                                        <input class="btn blue" id="btnSave" type="button"   value=" Submit " />
                                        <input class="btn blue" id="btnCancel" type="button" value=" Cancel "  />
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
