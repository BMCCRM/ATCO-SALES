<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ROIReport.aspx.cs" MasterPageFile="~/MasterPages/Home.Master" Title="ROI Report"
    Inherits="PocketDCR2.Reports.ROIReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <style>
        .highcharts-credits {
            display: none !important;
        }

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

        #csrCalenderDetails th {
            text-align: center;
        }


        /*@media print {

            body > * { display: none }
            .print { display: block !important }

        }*/
    </style>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.src.js"></script>


</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="overlayDiv" style="display: none">
        <div style="height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 15; opacity: 0.6; background-color: black;" class="jqmOverlay"></div>
        <div class="loading"></div>
    </div>


    <div id="content3">

        <hr />

        <div class="container .no-print">

            <h2>ROI From Doctors</h2>

            <div class="row">

                <div class="col-md-3" id="col1">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl1" name="ddl1" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3" id="col2">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label2" name="Label2" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl2" name="ddl2" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3" id="col3">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label3" name="Label3" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl3" name="ddl3" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3" id="col4">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label4" name="Label4" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl4" name="ddl4" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3" id="col5">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl5" name="ddl5" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3" id="col6">
                    <div class="form-group">
                        <label>
                            <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label></label>
                        <select id="ddl6" name="ddl6" class="form-control">
                            <option value="-1"></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label>Select Doctor</label>
                        <select id="ddlDoctors" class="form-control">
                            <option value="-1">Select Doctor</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label>Select CSR Activity</label>
                        <select id="ddlCSRActivities" class="form-control">
                            <option value="-1">Select CSR</option>
                        </select>
                    </div>
                </div>

            </div>




        <div id="csrSelectOne" class="">

            <h1 class="text-center">Please Select A CSR Activity.</h1>

        </div>
        <div id="reportContainer" style="display:none" class="print">

            <div class="container">

                <div class="card">
                    <div class="card-body">

                        <h3 class="card-title text-center">CSR Details</h3>
                        <%--<h4 class="card-title">Card title</h4>--%>
                        <div class="row">
                            <div class=" col-md-4">
                                <table class="table table-user-information">

                                    <tr>
                                        <th>Doctor Name</th>
                                        <td id="csrDName">Dr. Arsal Hussain</td>
                                    </tr>
                                    <tr>
                                        <th>Brick</th>
                                        <td id="csrBrick">Heya</td>
                                    </tr>
                                    <tr>
                                        <th>Speciality</th>
                                        <td id="csrDSpeciality">asa</td>
                                    </tr>


                                </table>


                            </div>
                            <div class=" col-md-4">
                                <table class="table table-user-information">

                                    <tr>
                                        <th>City</th>
                                        <td id="csrCity">Karachi</td>
                                    </tr>
                                    <tr>
                                        <th>Brick 2</th>
                                        <td id="csrBrick2">Heyyoa</td>
                                    </tr>
                                    <tr>
                                        <th>Activity Month</th>
                                        <td id="csrActMonth">1-Jan-2019</td>
                                    </tr>


                                </table>


                            </div>
                            <div class=" col-md-4">
                                <table class="table table-user-information">

                                    <tr>
                                        <th>Ref#</th>
                                        <td id="csrRefNo">48656222</td>
                                    </tr>

                                    <tr>
                                        <th>Brick3</th>
                                        <td id="csrBrick3">Hey</td>
                                    </tr>

                                    <tr>
                                        <th>Duration</th>
                                        <td id="csrDuration">3 Month</td>
                                    </tr>


                                </table>


                            </div>
                        </div>
                    </div>
                </div>

                <hr />



            </div>

            <div class="">

                <table id="csrCalenderDetails" class="table table-bordered table-hover table-responsive table-striped thead-dark text-center">

                    <tr>
                        <th colspan="2" rowspan="3">Targeted Products</th>
                        <th colspan="2">Commitment Per Month</th>
                        <th colspan="12">Monthwise Sales Trend</th>
                        <th rowspan="3">Total Units</th>
                        <th rowspan="3">Total Sales</th>
                    </tr>
                    <tr>
                        <td rowspan="2">Units</td>
                        <td rowspan="2">Value</td>
                        <td id="year1" colspan="6">2017</td>
                        <td id="year2" colspan="6">2018</td>
                    </tr>
                    <tr>
                        <td id="datesStart">Jul</td>
                        <td>Aug</td>
                        <td>Sep</td>
                        <td>Oct</td>
                        <td>Nov</td>
                        <td>Dec</td>
                        <td>Jan</td>
                        <td>Feb</td>
                        <td>Mar</td>
                        <td>Apr</td>
                        <td>May</td>
                        <td>Jun</td>
                    </tr>


                </table>


            </div>

            <div class="page-break">
                <div class="row">

                    <div class=" col-md-6">
                        <div class="chartHolder" id="pieChart">
                        </div>

                    </div>

                    <div class=" col-md-6">
                        <h3>Business And Employees Details</h3>
                        <table class="table table-user-information">

                            <tr>
                                <th>Division</th>
                                <td id="csrDivision">007520</td>
                            </tr>
                            <tr>
                                <th>SM Name</th>
                                <td id="csrSMName">ID</td>
                            </tr>
                            <tr>
                                <th>Concern Person</th>
                                <td id="csrSPO">3 Month</td>
                            </tr>

                            <tr>
                                <th>Total Business</th>
                                <td id="csrBusinessTotal">3 Month</td>
                            </tr>
                            <tr>
                                <th>Total Commitment</th>
                                <td id="csrCommitmentTotal">3 Month</td>
                            </tr>

                        </table>

                        <hr />

                        <h3>Doctor Visit Details</h3>
                        <table class="table table-user-information">

                            <tr>
                                <th>TM</th>
                                <td id="csrTM">-</td>
                            </tr>

                            <tr>
                                <th>GCM/ZSM</th>
                                <td id="csrZSM">-</td>
                            </tr>

                            <tr>
                                <th>SM</th>
                                <td id="csrSM">-</td>
                            </tr>

                            <tr>
                                <th>NSM</th>
                                <td id="csrNSM">-</td>
                            </tr>

                        </table>



                    </div>

                </div>

                <hr />


                <div class="row">
                    <div class=" col-md-10 col-md-offset-1 col-sm-12">
                        <h3>Details By Chemists</h3>
                        <table class="table table-user-information" id="csrPharmacyDetails">

                            <tr>
                                <th>Affiliated Chemist</th>
                                <th>ID</th>
                                <th>%</th>
                            </tr>


                        </table>


                    </div>
                </div>

            </div>
        </div>
        </div>
    </div>
    <input type="hidden" id="ddlstatus" value="all" />
    <asp:HiddenField ID="L1" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L2" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L3" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L4" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L5" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="L6" runat="server" ClientIDMode="Static" />


    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="ROIReport.js"></script>
</asp:Content>
