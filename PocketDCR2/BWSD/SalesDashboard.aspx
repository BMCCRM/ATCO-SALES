<%@ Page Title="Sale Dashboard" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesDashboard.aspx.cs" Inherits="PocketDCR2.BWSD.SalesDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/clockface/css/clockface.css" rel="stylesheet" type="text/css" />
    
      <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/counterup/jquery.waypoints.min.js"></script>
    <script src="../assets/counter/jquery.countup.min.js"></script>

    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/highcharts.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/highcharts-3d.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/highcharts-more.js"></script>

      <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="SaleDashboard.js"></script>


    <%-- <script type="text/javascript" src="../assets/js/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../assets/js/chosen.proto.min.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/data.js"></script>
    <script type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/solid-gauge.js"></script>
    <script  type="text/javascript" src="../assets/Highcharts-4.2.5/js/modules/drilldown.js"></script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="height: 15px"></div>
    <div class="page-head">
        <div class="container-fluid">
            <div class="page-title">
                <h1><small>Dashboard & Statistics</small> </h1>
            </div>
        </div>
    </div>

    <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <div class="container-fluid">
            <div class="portlet light bordered">
                <div id="hirarchy" class="form-body">

                   
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col1" class="form-group">
                                    <label id="Label1" class="control-label"></label>
                                    <select id="ddl1" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col2" class="form-group">
                                    <label id="Label2" class="control-label"></label>
                                    <select id="ddl2" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col3" class="form-group">
                                    <label id="Label3" class="control-label"></label>
                                    <select id="ddl3" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col4" class="form-group">
                                    <label id="Label4" class="control-label"></label>
                                    <select id="ddl4" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col5" class="form-group">
                                    <label id="Label5" class="control-label"></label>
                                    <select id="ddl5" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col6" class="form-group">
                                    <label id="Label6" class="control-label"></label>
                                    <select id="ddl6" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-5">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col5dist" class="form-group">
                                    <label id="Label4dist" class="control-label">Distributors :</label>
                                    <select id="ddldistrib" class="form-control input-sm">
                                        <option value="-1">Select Distributors First</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col6brick" class="form-group">
                                    <label id="Label4Bricks" class="control-label">Bricks : </label>
                                    <select class="form-control input-sm" id="ddlBricks">
                                        <option value="-1">Please Select Brick</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="control-label ">Filter by Month</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <input id="txtDate" class="form-control input-sm" type="text" />
                                    </div>

                                    <div class="col-md-6 pull-right">
                                        <input id="btnsubmitbrickdata" name="ShowResult" class="btn btn-primary  input-sm" value="Show Result" onclick="GetAlldata()" type="button"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                     <div class="row">
                        <div class="col-lg-7">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="colPro" class="form-group">
                                    <label id="LabelPro" class="control-label">Product</label>
                                    <select id="ddlPro" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="colProsku" class="form-group">
                                    <label id="LabelProsku" class="control-label">Product Sku</label>
                                    <select id="ddlProsku" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style="height: 10px;"></div>



                </div>
                <div class="dshload_back" style="display: none;">
                    <div class="loading"></div>
                </div>
            </div>

            <div class="page-content-inner">
                <div class="mt-content-body">

                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 id="totalsale" class="font-green-sharp"><%--data-counter="counterup" data-value="7800"--%>
                                            <%--     <span  class="counter" >7800</span>--%>
                                            <%--   <small class="font-green-sharp">$</small>--%>
                                        </h3>
                                        <small>TOTAL SALE</small>
                                    </div>
                                    <div class="icon">
                                        <i class="icon-pie-chart"></i>
                                    </div>
                                </div>
                                <%--  <div class="progress-info">
                                                        <div class="progress">
                                                            <span style="width: 76%;" class="progress-bar progress-bar-success green-sharp">
                                                                <span class="sr-only">76% progress</span>
                                                            </span>
                                                        </div>
                                                        <div class="status">
                                                            <div class="status-title"> progress </div>
                                                            <div class="status-number"> 76% </div>
                                                        </div>
                                                    </div>--%>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 id="TotalUnits" class="font-red-haze">
                                            <%-- <span data-counter="counterup" data-value="1349">1349</span>--%>
                                        </h3>
                                        <small>TOTAL UNITS</small>
                                    </div>
                                    <div class="icon">
                                        <i class="icon-like"></i>
                                    </div>
                                </div>
                                <%-- <div class="progress-info">
                                                        <div class="progress">
                                                            <span style="width: 85%;" class="progress-bar progress-bar-success red-haze">
                                                                <span class="sr-only">85% change</span>
                                                            </span>
                                                        </div>
                                                        <div class="status">
                                                            <div class="status-title"> change </div>
                                                            <div class="status-number"> 85% </div>
                                                        </div>
                                                    </div>--%>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 id="TotalProduct" class="font-blue-sharp">
                                            <%--<span data-counter="counterup" data-value="567">567</span>--%>
                                        </h3>
                                        <small>TOTAL PRODUCT</small>
                                    </div>
                                    <div class="icon">
                                        <i class="icon-basket"></i>
                                    </div>
                                </div>
                                <%--  <div class="progress-info">
                                                        <div class="progress">
                                                            <span style="width: 45%;" class="progress-bar progress-bar-success blue-sharp">
                                                                <span class="sr-only">45% grow</span>
                                                            </span>
                                                        </div>
                                                        <div class="status">
                                                            <div class="status-title"> grow </div>
                                                            <div class="status-number"> 45% </div>
                                                        </div>
                                                    </div>--%>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div class="dashboard-stat2 ">
                                <div class="display">
                                    <div class="number">
                                        <h3 id="TotalDistributor" class="font-purple-soft">
                                            <%--<span data-counter="counterup" data-value="276">276</span>--%>
                                        </h3>
                                        <small>Total DISTRIBUTOR</small>
                                    </div>
                                    <div class="icon">
                                        <i class="icon-user"></i>
                                    </div>
                                </div>
                                <%--  <div class="progress-info">
                                                        <div class="progress">
                                                            <span style="width: 57%;" class="progress-bar progress-bar-success purple-soft">
                                                                <span class="sr-only">56% change</span>
                                                            </span>
                                                        </div>
                                                        <div class="status">
                                                            <div class="status-title"> change </div>
                                                            <div class="status-number"> 57% </div>
                                                        </div>
                                                    </div>--%>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div id="distributorbricksalescharts"></div>
                        <div id="productsalescharts"></div>


                    </div>
                    <div class="row">
                        <div id="allproductwisecharts"></div>
                    </div>
                </div>

            </div>


        </div>
    </div>

    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L7" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L8" runat="server" ClientIDMode="Static" />

     <asp:HiddenField ID="L9" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="L10" runat="server" ClientIDMode="Static" />
</asp:Content>
