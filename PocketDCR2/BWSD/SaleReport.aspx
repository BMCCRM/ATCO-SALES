<%@ Page Title="Sale Report" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SaleReport.aspx.cs" Inherits="PocketDCR2.BWSD.SaleReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.12.4.js" type="text/javascript"></script>


    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>

    <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
    <script src="SaleReport.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="height: 15px"></div>


    <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <div class="container-fluid">
            <div class="portlet light bordered">
                <div id="hirarchy" class="form-body">

                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="report" class="form-group">
                                <label id="labelreport" class="control-label">Report</label>
                                <select id="ddlreport" class="form-control input-sm">
                                    <option value="-1">Select Report</option>
                             
                                    <option value="1">Brick Wise Sale Report</option>
                                    <option value="4">Product Wise Sale Report</option>
                                    <%--<option value="5">Customer Wise Sale Report</option>--%>
                                    <option value="6">Daily Sale Report</option>
                                     <option value="7">MTD Current & Last Month Sale Report</option>
                                    <%--  <option value="8">City Wise Sale Report</option>

                                       <option value="9">Range Unit Sale Report</option>
                                     <option value="10">Range Value Sale Report</option>--%>
                                     <option value="11">Product Unit Sale Report(Current vs Last)</option>
                                     <option value="12">Product Value Sale Report(Current vs Last)</option>
                                    <%--  <option value="13">Top Product Value  Report</option>
                                    <option value="14">Bonus Claim Report</option>
                                     <option value="15">Discount Claim Report</option>
                                    <option value="16">Sales & Stock Report</option>--%>
                                    <option value="17">Team Wise Stock Report</option>
                                     <option value="18">Distributor Wise Sales Report</option>
                                     <option value="19">Dist-Team-Prod Wise Sale Units</option>
                                      <%-- <option value="2">Customer Wise Sale Report</option>
                                    <option value="3">Incentive Wise Report</option>--%>
                                     <option value="21">Brick & Products Sales</option>
                                     <option value="22">Products Sales Per Pharmacy</option>
                                     <option value="20">MD Format</option>
                                     <option value="23">Local Vs Upcountry </option>
                                    <option value="24">Distributor Profile Report</option>
                                    <%--<option value="25">Customer Wise Daily Sales Report</option>--%>
                                    <option value="26">SPO Wise Brick Sales Report </option>
                                    <option value="27">TM Doctors Pharmacy Sales Report </option>
                                    <option value="28">Customer Wise Sales Report </option>
                                    <option value="29">Invoice Voice Sales Report </option>
                                    <option value="30">Distributor File Upload Updates Report </option>
<%--                                    <option value="31">Brick Allocation Report </option>--%>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7" id="divHierarchyContainer">
                            <div  id="divDDL1" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col1" class="form-group">
                                    <label id="Label1" class="control-label"></label>
                                    <select id="ddl1" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div id="divDDL2" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col2" class="form-group">
                                    <label id="Label2" class="control-label"></label>
                                    <select id="ddl2" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div id="divDDL3" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col3" class="form-group">
                                    <label id="Label3" class="control-label"></label>
                                    <select id="ddl3" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                             <div id="divTeam" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="colTeam" class="form-group">
                                    <label id="LabelTeam" class="control-label">Team</label>
                                    <select id="ddlTeam" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>


                            <div id="divDDL4" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col4" class="form-group">
                                    <label id="Label4" class="control-label"></label>
                                    <select id="ddl4" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div id="divDDL5" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col5" class="form-group">
                                    <label id="Label5" class="control-label"></label>
                                    <select id="ddl5" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                            <div id="divDDL6" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col6" class="form-group">
                                    <label id="Label6" class="control-label"></label>
                                    <select id="ddl6" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>

                              <div id="divDDL7" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                <div id="col7Doc" class="form-group">
                                    <label id="Label7Doc" class="control-label"></label>
                                    <select id="ddl7Doc" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                    </select>
                                </div>
                            </div>


                        </div>

                        <div class="col-md-5" id="divSalesGeographyContainer">
                            <%-- Distributor Area Break --%>
                            <div id="divDist"  class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col5dist" class="form-group">
                                    <label id="Label4dist" class="control-label">Distributors :</label>
                                    <select id="ddldistrib" class="form-control input-sm">
                                        <option value="-1">Select Distributors First</option>
                                    </select>
                                </div>
                            </div>

                            <div  id="divBrick"  class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col6brick" class="form-group">
                                    <label id="Label4Bricks" class="control-label">Bricks : </label>
                                    <select class="form-control input-sm" id="ddlBricks">
                                        <option value="-1">Please Select Brick</option>
                                    </select>
                                </div>
                            </div>

                            <div id="divCust" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col6customer" class="form-group">
                                    <label id="Label4customer" class="control-label">Customer : </label>
                                    <select class="form-control input-sm" id="ddlcustomer">
                                        <option value="-1">Please Select Customer</option>
                                    </select>
                                </div>
                            </div>



                             <div id="divProd" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="col6Pro" class="form-group">
                                    <label id="Label4Pro" class="control-label">Product : </label>
                                    <select class="form-control input-sm" id="ddlPro">
                                        <option value="-1">Please Select Product</option>
                                    </select>
                                </div>
                            </div>


                           <%-- <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="report" class="form-group">
                                    <label id="labelreport" class="control-label">Report</label>
                                    <select id="ddlreport" class="form-control input-sm">
                                        <option value="-1">Select..</option>
                                        <option value="1">Brick Wise Sale Report</option>
                                        <option value="2">Customer Wise Sale Report</option>
                                    </select>
                                </div>
                            </div>--%>
                        </div>
                    </div>



                    <div class="row">
                        <div id="lblMonth" class="col-lg-3">
                            <div   class="col-md-3">
                                <label class="control-label ">Filter by Month</label>
                            </div>   
                        </div>
                

                         <div  id="lblYear"  class="col-lg-3" >
                            <div class="col-md-3">
                                <label class="control-label ">Filter by Year</label>
                            </div>
                        </div>
                        <div  id="lblYearfromdate"  class="col-lg-3" >
                            <div class="col-md-3">
                                <label class="control-label ">Start Date</label>
                            </div>
                        </div>
                        <div  id="lblYeartodate"  class="col-lg-3" >
                            <div class="col-md-3">
                                <label class="control-label ">End Date</label>
                            </div>
                        </div>
                        
                    </div>



                    <div class="row pull">
                        <div class="col-lg-12">

                            <div id="divMonth" class="col-md-3">
                                <input id="txtDate" class="form-control input-sm" type="text" />
                            </div>
                            <div id="divYear" class="col-md-3" >
                                <input id="txtYear" class="form-control input-sm" type="text" />
                            </div>

                            <div id="divYearfromday" class="col-md-3" >
                                <input id="stdate" class="form-control input-sm" type="text" />
                            </div>

                            <div id="divYeartomday" class="col-md-3" >
                                <input id="enddate" class="form-control input-sm" type="text" />
                            </div>

                            <div id="divTeams" class="col-md-4" style="display:none">
                                <select class="form-control input-sm" id="ddlteam">
                                    <option value="-1">Please Select Team</option>
                                </select>
                            </div>

                            <div class="col-md-4 margin-top-10">
                                <input id="btnsubmitbrickdata" name="ShowResult" class="btn btn-primary  input-sm" value=" Generate " onclick="GetAlldata()" type="button"/>                 
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="page-content-inner">
                <div class="mt-content-body">

                    <div id="contain" class="portlet light bordered">
                        <div class="row">
                            <div id="RenderReport" class="col-md-12"></div>
                        </div>
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
</asp:Content>
