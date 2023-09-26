<%@ Page Title="Expense Details" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="EditExpenseDetails.aspx.cs" Inherits="PocketDCR2.Form.EditExpenseDetails" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
    <script type="text/javascript" src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <script type="text/javascript" src="..divConfirmation/assets/js/jquerycookie.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.js"></script>
    <link href="../assets/css/Nbootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/bootstrap-table-expandable.css" rel="stylesheet" />
     <link rel="stylesheet" href="assets_new/jquery-ui.css" />
    <script src="../assets/global/plugins/moment.min.js" type="text/javascript"></script>
    <script src="../assets/js/Nbootstrap.min.js" type="text/javascript"></script>
       <script type="text/javascript">
           var $i = jQuery.noConflict();
    </script>
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../assets/js/jquery.dataTables.min.js" type="text/javascript"></script>

<%--    <script>
        var $i = jQuery.noConflict();
    </script>--%>
   
     <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/Sweetalert/sweetalert2.min.js"></script>
    <script src="EditExpense.js" type="text/javascript"></script>
    <style type="text/css">


        #totrow{
            /*background-color: #f5efa5;*/
            background-color: #c5c4c4;
        }
        .focused {
            border: solid 1px red;
        }

        #header {
            background: #666;
            padding: 3px;
            padding: 10px 20px;
            padding-left: 28px;
            color: #fff;
        }

        .fixed {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 99;
        }

        #header.fixed tr {
            display: table-cell;
        }

        #header.fixed {
            display: table;
            left: 25px;
            width: calc(100% - 49px);
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

        .margin {
            padding-left: 2px;
            padding-right: 2px;
        }

        .txtbox {
            width: 150px;
            height: 29px;
            border-radius: 3px;
            border: 1px solid #CCC;
            padding: 6px;
            font-weight: 200;
            font-size: 11px;
            font-family: Verdana;
            box-shadow: 1px 1px 5px #CCC;
        }

        .smallbox {
            width: 60%;
        }

        .txtboxx {
            /*width: 200px;*/
            height: 29px;
            border-radius: 3px;
            border: 1px solid #CCC;
            padding: 6px;
            font-weight: 200;
            font-size: 11px;
            font-family: Verdana;
            box-shadow: 1px 1px 5px #CCC;
        }

        .modal:nth-of-type(even) {
            z-index: 1052 !important;
        }

        .modal-backdrop.show:nth-of-type(even) {
            z-index: 1051 !important;
        }
        .smallboxx {
            width: 60%;
        }

        .customdown {
            background-color: #505050;
            background-image: -moz-linear-gradient(center bottom, #505050 0%, #707070 100%);
            background-position: center top;
            background-repeat: no-repeat;
            border: 2px solid #808080;
            border-radius: 30px;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            /*height: 50px;*/
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            width: 200px;
            padding: 4px 0;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }

        #submit_button {
            background: #6197b8;
            background-image: -webkit-linear-gradient(top, #6197b8, #389ede);
            background-image: -moz-linear-gradient(top, #6197b8, #389ede);
            background-image: -ms-linear-gradient(top, #6197b8, #389ede);
            background-image: -o-linear-gradient(top, #6197b8, #389ede);
            background-image: linear-gradient(to bottom, #6197b8, #389ede);
            -webkit-border-radius: 15;
            -moz-border-radius: 15;
            border-radius: 15px;
            -webkit-box-shadow: 3px 5px 5px #241624;
            -moz-box-shadow: 3px 5px 5px #241624;
            box-shadow: 3px 5px 5px #241624;
            font-family: Arial;
            color: #ffffff;
            padding: 3px 6px 3px 6px;
            text-decoration: none;
            margin-bottom: 10px;
        }

            #submit_button:hover {
                background: #3cb0fd;
                text-decoration: none;
            }

        #saveExpenseReport {
            background: #6197b8;
            background-image: -webkit-linear-gradient(top, #6197b8, #389ede);
            background-image: -moz-linear-gradient(top, #6197b8, #389ede);
            background-image: -ms-linear-gradient(top, #6197b8, #389ede);
            background-image: -o-linear-gradient(top, #6197b8, #389ede);
            background-image: linear-gradient(to bottom, #6197b8, #389ede);
            -webkit-border-radius: 15;
            -moz-border-radius: 15;
            border-radius: 15px;
            -webkit-box-shadow: 3px 5px 5px #241624;
            -moz-box-shadow: 3px 5px 5px #241624;
            box-shadow: 3px 5px 5px #241624;
            font-family: Arial;
            color: #ffffff;
            padding: 3px 6px 3px 6px;
            text-decoration: none;
            margin-bottom: 10px;
        }

            #saveExpenseReport:hover {
                background: #3cb0fd;
                text-decoration: none;
            }

        .red {
            border-radius: 5px;
            width: 130px;
            float: left;
            font-size: 14px;
            background: #cc0000;
            color: #fff;
            padding: 2px 0px;
            border: solid 1px #333;
            background-color: #d9534f;
    border-color: #d43f3a;
        }

        .yellow {
            width: 130px;
            float: left;
            font-size: 14px;
            background: #ffcc00;
            color: #000;
            padding: 2px 0px;
            border: solid 1px #333;
        }

        .green {
            width: 130px;
            float: left;
            font-size: 14px;
            background: #008000;
            color: #fff;
            padding: 2px 0px;
            border: solid 1px #333;
        }

        input[type=radio] {
            display: none;
        }

            input[type=radio] + label {
                display: inline-block;
                margin: -2px;
                padding: 4px 12px;
                margin-bottom: 0;
                font-size: 14px;
                line-height: 20px;
                color: #333;
                text-align: center;
                text-shadow: 0 1px 1px rgba(255,255,255,0.75);
                vertical-align: middle;
                cursor: pointer;
                background-color: #f5f5f5;
                background-image: -moz-linear-gradient(top,#fff,#e6e6e6);
                background-image: -webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
                background-image: -webkit-linear-gradient(top,#fff,#e6e6e6);
                background-image: -o-linear-gradient(top,#fff,#e6e6e6);
                background-image: linear-gradient(to bottom,#fff,#e6e6e6);
                background-repeat: repeat-x;
                border: 1px solid #ccc;
                border-color: #e6e6e6 #e6e6e6 #bfbfbf;
                border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
                border-bottom-color: #b3b3b3;
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);
                filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
                -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
            }

            input[type=radio]:checked + label {
                background-image: none;
                outline: 0;
                -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
                -moz-box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);
                background-color: #e0e0e0;
            }
               .upload-options {
            position: relative;
            height: 40px;
            background-color: cadetblue;
            cursor: pointer;
            overflow: hidden;
            text-align: center;
            transition: background-color ease-in-out 150ms;
        }

            .upload-options:hover {
                background-color: #7fb1b3;
            }

            .upload-options input {
                width: 0.1px;
                height: 0.1px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                z-index: -1;
            }

            .upload-options label {
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
                font-weight: 400;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                overflow: hidden;
            }

                .upload-options label::after {
                    content: "add";
                    font-family: "Material Icons";
                    position: absolute;
                    font-size: 2rem;
                    color: #e6e6e6;
                    left: calc(50% - 1.25rem);
                    z-index: 0;
                }

                .upload-options label span {
                    display: inline-block;
                    width: 50%;
                    height: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    vertical-align: middle;
                    text-align: center;
                }

                    .upload-options label span:hover i.material-icons {
                        color: lightgray;
                    }

        .js--image-preview {
            height: 100px;
            width: 100%;
            position: relative;
            overflow: hidden;
            /*background-image: url("/assets/img/add-new.png");*/
            background-color: white;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
        }

            .js--image-preview::after {
                /*content: "photo_size_select_actual";*/
                font-family: "Material Icons";
                position: relative;
                font-size: 4.5em;
                color: #e6e6e6;
                top: calc(50% - 3rem);
                left: calc(50% - 2.25rem);
                z-index: 0;
            }

            .js--image-preview.js--no-default::after {
                display: none;
            }

            .js--image-preview:nth-child(2) {
                /*background-image: url("/assets/img/add-new.png");*/
            }

        .btn-AddFile {
            background-image: url(/assets/img/add-new.png);
               height: 39px;
    display: block;
    width: 39px;
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0px 10px;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="content">
        <div class="pop_box-outer jqmWindow" id="dialog" style="border: 0; background-color: transparent !important">
            <div class="loading">
            </div>
            <div class="clear">
            </div>
        </div>

        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                 <%--Talha Work For pdf--%>
                <div id="divforpdf" class="container-fluid">
                <div class="page_heading">
                    <h1 style="font-size: 22px; font-weight: bold; color: #3e3d3d; float: left; padding-bottom: 10px;">
                        <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                        Expense Management</h1>
                    <%--<div class="right">
                        <div class="btn"> 
                             <a id="btnlastvisits" name="btnlastvisits" type="button" href="#popup1" class="btnsaless" >Show Doctors List</a>
                        </div>
                    </div>--%>
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                </div>

                <asp:HiddenField ID="UserRole" runat="server" ClientIDMode="Static" />
                <div class="container-fluid">
                    <div class="row">
                        <h2 id="expensemonth">Month Print</h2>
                        <button type="button" id="btnPDF" class="btn btn-danger" onclick="exportTableTopdf();" style="margin:5px; padding: 1px 20px; margin-top: 0px !important;">PDF </button>
                        <div class="col-md-10 text-right"><strong>Report Status</strong></div>
                        <div class="col-md-2" id="labelStatus" style="height: 23px; text-align: center;"></div>
                    </div>
                    <br />
              
                    <div class="row" style="border: 1px solid #b7b7b7; margin: 10px 0 10px 0;">
                        <div class="col-md-12" style="padding: 0 0 5px 0; border-bottom: 1px solid #b7b7b7; margin-bottom: 10px;">
                            <h2 style="font-size: 18px; font-weight: 700;">Employee Details</h2>
                        </div>
                        <div style="padding: 10px 0 10px 0;">
                            <div class="row">

                                <div class="col-md-2"><strong>Login ID</strong></div>
                                <div class="col-md-2" id="emploginID"></div>

                                <div class="col-md-2"><strong>Employee Code</strong></div>
                                <div class="col-md-4" id="empCode" style="font-size: 16px; font-weight: bold;"></div>

                                <div class="col-md-2" style="display: none"><strong>Team</strong></div>
                                <div class="col-md-2" id="empteam" style="font-size: 16px; font-weight: bold; display: none"></div>

                            </div>
                            <div id="divConfirmation" class="jqmConfirmation modal-md  " style="border: 10px solid #2929294d; overflow: scroll !important; margin-left: 0px; left: 25%; top: 9%; bottom: 9%; width: 50%;">
                                <div class="jqmTitle row" style="background-color: #292929ed; width: 80%; float: left">
                                    Attachements
                                </div>
                                <div style="float: right;">
                                    <a class="txtboxx" onclick="$('#divConfirmation').jqmHide();" style="display: block; text-align: center; cursor: pointer;">X</a>
                                </div>
                                <div class="row" style="margin-left: 10%;">

                                    <div class="col-lg-4" style="text-align: center">
                                        <h3><u>Attachements</u></h3>
                                        <div class="taxattach ">
                                            <p class="tax">No Attachement Available</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="divConfirmationfile1" class="jqmConfirmation modal-md  " style="border: 10px solid #2929294d; overflow: scroll !important; margin-left: 0px; left: 20%; top: 18%; bottom: 30%; width: 60%;">
                                <div class="jqmTitle row" style="background-color: #292929ed; width: 80%; float: left">
                                    Attachements
                                </div>
                                <div style="float: right;">
                                    <a class="txtboxx" onclick="$('#divConfirmationfile1').jqmHide();" style="display: block; text-align: center; cursor: pointer;">X</a>
                                </div>
                                <div class="row" style="margin-left: 10%;">

                                    <div class="col-lg-4" style="text-align: center">
                                        <h3><u>Attach File</u></h3>

                                    </div>

                                    <div class="modal-body">
                                        <p>Amount</p>
                                        <input type="text" name="amount" placeholder="Add amount" autocomplete="off" class="form-control placeholder-no-fix">
                                    </div>


                                </div>
                            </div>

                            <div id="divReimbursement" class="jqmConfirmation modal-md  " style="border: 10px solid #2929294d; overflow: scroll !important; margin-left: 0px; left: 20%; top: 18%; bottom: 30%; width: 60%;">
                            </div>
                            <div class="row">
                                <div class="col-md-2"><strong>Employee Name</strong></div>
                                <div class="col-md-2" id="empName"></div>

                                <div class="col-md-2"><strong>Designation</strong></div>
                                <div class="col-md-2" id="empdesignation"></div>

                                <div class="col-md-2"><strong>City</strong></div>
                                <div class="col-md-2" id="empcity"></div>
                                <%--<div class="col-md-2"><strong>Month</strong></div>
            <div class="col-md-2" id="expensemonth">October - 2016</div>--%>
                            </div>
                            <div class="row">

                                <%--<div class="col-md-2"><strong>Emp Code</strong></div>
            <div class="col-md-2" id="empcode">2237</div>

            <div class="col-md-2"><strong>Emp ID</strong></div>
            <div class="col-md-2" id="empid">100725</div>--%>





                                <div class="col-md-2"><strong>DOJ</strong></div>
                                <div class="col-md-2" id="dateofjoining"></div>

                                <div class="col-md-2"><strong>Manager</strong></div>
                                <div class="col-md-2" id="empmanager"></div>
                            </div>
                            <!-- <div class="row">
            <%--<div class="col-md-2"><strong>Designation</strong></div>
            <div class="col-md-2" id="empdesignation">Area Manager</div>

            <div class="col-md-2" id="empcity">
                <strong>City :</strong>
                Bahawalpur
            </div>--%>
            <%--<div class="col-md-2" id="dateofjoining">
                <strong>DOJ :</strong>
                05/09/2011
            </div>
    
            <div class="col-md-2"><strong>Manager</strong></div>
            <div class="col-md-2" id="empmanager">Muhammad Khurram Shahzad</div>--%>
        </div>
        <br />-->
                            <div class="col-md-12" style="border-top: 1px solid #b7b7b7; margin: 10px 0 10px 0; padding: 0 0 5px 0; border-bottom: 1px solid #b7b7b7;">
                                <h2 style="font-size: 18px; font-weight: 700;">Working Days</h2>
                            </div>


                            <div class="row">
                                <div class="col-md-2"><strong>Total</strong></div>
                                <div class="col-md-2" id="totalworkingdays" style="font-size: 16px; font-weight: bold;"></div>

                                <div class="col-md-2"><strong>Local</strong></div>
                                <div class="col-md-2" id="localworkingdays" style="font-size: 16px; font-weight: bold;"></div>

                                <div class="col-md-2"><strong>Total Outstation</strong></div>
                                <div class="col-md-2" id="outstandworkingdays" style="font-size: 16px; font-weight: bold;"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-2"><strong>Out Back</strong></div>
                                <div class="col-md-2" id="empoutback"></div>

                                <div class="col-md-2"><strong>Night Stay</strong></div>
                                <div class="col-md-2" id="empnightstay"></div>

                                <div class="col-md-2"><strong>Sunday/Special</strong></div>
                                <div class="col-md-2" id="satsunworkingdays"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-2"><strong>IBA</strong></div>
                                <div class="col-md-2" id="empIBA"></div>

                                <div class="col-md-2" style="display: none;"><strong>ADDA</strong></div>
                                <div class="col-md-2" id="empADDA"></div>
                            </div>
                        </div>
                    </div>
              


                   <div class="modal" id="divConfirmationfile">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Attach Files</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <div class="container"></div>
                            <div class="modal-body">

                                <div class="modal-body" id="modalData">
                                </div>

                            </div>
                            <div class="modal-footer" id="modal-Footer">
                                <a href="#" data-dismiss="modal" class="btn">Close</a>
                            </div>
                        </div>
                    </div>
                </div>

               <%-- <div class="modal" id="myModal2" data-backdrop="static">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Attachements</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <div class="container"></div>
                            <div class="modal-body">
                                <div class="taxattach ">
                                    <p class="tax">No Attachement Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--%>

                <div class="container-fluid">
                    <h3 style="margin-top: 50px;">Expenses Details</h3>
                    <div class="table-responsive" id="editexpensedata">
                        <table class="table table-hover table-expandable table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Purpose Of Visit/Town Visited</th>
                                    <th>Mileage Km </th>
                                    <th>Fare </th>
                                    <th>Special Allownce<%--Institution Based Allowance--%></th>
                                    <th>Tour Day Closing</th>
                                    <th>Night Stay</th>
                                    <th>Out Back </th>
                                    <th>*DA</th>
                                    <th>**ADDA (Big City)</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <%--    <tr>
        <td>1</td>
        <td>Sat</td>
        <td>
            <select class="txtbox">
                <option value="-1">Doctor Visited</option>
            </select></td>
        <td>
            <input type="text" class="smallbox" disabled id="txtmileage" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtfare" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtda" />
        </td>
          <td>
              <select class="txtbox">
                  <option value="-1"></option>
              </select>
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtnightstay" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtoutback" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtbigcity" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txttotal" />
        </td>
      </tr>
      <tr>
        <td colspan="5"><h4>Insert City</h4></td>
          <td>
                <select class="txtbox">
                    <option value="value">city</option>
                </select> 
            </td>
            <td>
                <select class="txtbox">
                    <option value="value">city</option>
                </select> 
            </td>
            <td>
                <input type="text" class="smallbox" disabled id="txitamount"/>
            </td>
      </tr>
        <tr>
        <td>1</td>
        <td>Sat</td>
        <td>
            <select class="txtbox">
                <option value="-1">Doctor Visited</option>
            </select></td>
        <td>
            <input type="text" class="smallbox" disabled id="txtmiileage" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtifare" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txitda" />
        </td>
          <td>
              <select class="txtbox">
                  <option value="-1"></option>
              </select>
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtnigihtstay" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtoutbaick" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txtbigciity" />
        </td>
          <td>
            <input type="text" class="smallbox" disabled id="txttotali" />
        </td>
      </tr>
      <tr>
        <td colspan="5"><h4>Insert City</h4></td>
          <td>
                <select class="txtbox">
                    <option value="value">city</option>
                </select> 
            </td>
            <td>
                <select class="txtbox">
                    <option value="value">city</option>
                </select> 
            </td>
            <td>
                <input type="text" class="smallbox" disabled id="txtamounti"/>
            </td>
      </tr>
                                --%>
                            </tbody>
                        </table>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%" id="CNGDataRow">
                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="CngChargedDays">CNG Charged Days</label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field CNG Charged Days must be a number." id="CngChargedDays" name="CngChargedDays" value="0" type="text">

                                <span class="field-validation-valid text-danger" data-valmsg-for="CngChargedDays" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="CngAllowance">Vehicle Allowance<%--CNG Allowance--%></label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field CNG Allowance must be a number." data-val-required="The CNG Allowance field is required." id="CngAllowance" name="CngAllowance" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="CngAllowance" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="ReimBursment">Reimbursment<%--CNG Allowance--%></label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Reimbursment must be a number." data-val-required="The Reimbursment field is required." id="Reimbursment" name="Reimbursment" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="Reimbursment" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                       

                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%" id="BikeDataRow">

                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="MonthlyExpenseTownBased">
                                <%--Bike Expense--%> Additional City Allownce

                            </label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Bike Expense must be a number." data-val-required="The Bike Expense field is required." id="BikeExpense" name="BikeExpense" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="BikeExpense" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <%--  <div class="col-md-06">
            <label class="control-label col-md-2" for="BikeDeduction">Bike Deduction</label>
            <div class="col-md-2">
                <input  class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Mobile Deduction must be a number." data-val-required="The Mobile Deduction field is required." id="BikeDeduction" name="BikeDeduction" value="0" type="text">
            <span class="field-validation-valid text-danger" data-valmsg-for="BikeDeduction" data-valmsg-replace="true"></span>
            </div>
        </div>--%>
                        <%--<div class="col-md-06">
            <label class="control-label col-md-2" for="MobileAllowanceCorrection">Mobile Allowance Correction</label>
            <div class="col-md-2">
                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Mobile Allowance Correction must be a number." id="MobileAllowanceCorrection" name="MobileAllowanceCorrection" value="0" type="text">
            <span class="field-validation-valid text-danger" data-valmsg-for="MobileAllowanceCorrection" data-valmsg-replace="true"></span>
            </div>
        </div>--%>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%">

                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="MonthlyNonTouringAllowance">Non Touring Allowance</label>
                            <div class="col-md-4">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="" data-val-required="" id="MonthlyNonTouringAllowance" name="MonthlyNonTouringAllowance" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="MonthlyNonTouringAllowance" data-valmsg-replace="true">* Only Applicable when 0 tours in the month</span>
                            </div>
                        </div>

                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%">

                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="CellPhoneBillAmount">Mobile Bill</label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Mobile Bill must be a number." data-val-required="The Mobile Bill field is required." id="CellPhoneBillAmount" name="CellPhoneBillAmount" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="CellPhoneBillAmount" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                         <%--FUEL ALLOWANCE--%>
                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="fuelAllowance">Fuel Allowance adjustment<%--CNG Allowance--%></label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field FuelAllowance must be a number." data-val-required="The FuelAllowance field is required." id="fuelAllowance" name="fuetallowance" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="fuelAllowance" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <%--FUEL ALLOWANCE--%>
                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="CellPhoneBillAmountCorrection">Mobile Bill Correction</label>
                            <div class="col-md-2">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Mobile Bill Correction must be a number." data-val-required="The Mobile Bill Correction field is required." id="CellPhoneBillAmountCorrection" name="CellPhoneBillAmountCorrection" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="CellPhoneBillAmountCorrection" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <%--<div class="col-md-06">
            <label class="control-label col-md-2" for="MobileAllowanceCorrection">Mobile Allowance Correction</label>
            <div class="col-md-2">
                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Mobile Allowance Correction must be a number." id="MobileAllowanceCorrection" name="MobileAllowanceCorrection" value="0" type="text">
            <span class="field-validation-valid text-danger" data-valmsg-for="MobileAllowanceCorrection" data-valmsg-replace="true"></span>
            </div>
        </div>--%>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%">
                        <div class=" col-md-06">
                            <label class="control-label col-md-2" for="MonthlyExpenseTownBased">Misc Allowance<%--Monthly Expense--%></label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field MonthlyExpenseTownBased must be a number." data-val-required="The MonthlyExpenseTownBased field is required." id="MonthlyExpenseTownBased" name="MonthlyExpenseTownBased" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="MonthlyExpenseTownBased" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="MiscExpense">Adj. Expense<%--Misc. Expense--%></label>
                            <div class="col-md-2">
                                <input disabled="disabled" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Misc. Expense must be a number." id="MiscExpense" name="MiscExpense" value="0" type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 ">
                                <span class="field-validation-valid text-danger" data-valmsg-for="MiscExpense" data-valmsg-replace="true"></span>
                            </div>
                        </div>

                    </div>

                    <div class="row col-md-12" style="margin-bottom: 0.5%">
                        <div class="HideField col-md-06">
                            <label class="control-label col-md-2" for="MonthlyAllownace_BigCity">Monthly Allowance Big City</label>
                            <div class="col-md-2">
                                <input readonly="readonly" class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field MonthlyExpenseTownBased must be a number." data-val-required="The Monthly Allownace Big City field is required." id="MonthlyAllownace_BigCity" name="MonthlyAllownace_BigCity" value="0" type="text">
                                <span class="field-validation-valid text-danger" data-valmsg-for="MonthlyAllownace_BigCity" data-valmsg-replace="true"></span>
                            </div>
                        </div>

                    </div>

                    <div class="row col-md-12" style="display: none; margin-bottom: 0.5%">

                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="AdjExpense">Expense Note</label>
                            <div class="col-md-6">
                                <textarea class="form-control text-box multi-line ea-triggers-bound" data-val="true" data-val-length="The field Remarks must be a string with a maximum length of 500." data-val-length-max="500" id="ExpenseNote" style="resize: none;"></textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="Remarks" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 1%">
                        <div class="col-md-06">
                            <label class="control-label col-md-2" for="MiscExpense">Grand Total</label>
                            <div class="col-md-2">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="" id="GrandTotal" value="0" type="text" disabled="disabled">
                                <span class="field-validation-valid text-danger" data-valmsg-for="MiscExpense" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div class="col-md-06" style="margin-top: 10px;">
                            <%--<label class="control-label col-md-2"></label>
            <div class="col-md-2">
                <a class="txtboxx" style="display: block;text-align: center;cursor: pointer;" id="saveExpenseReport">Save Expense Report</a>
                </div> --%>
                        </div>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 1%">
                        <div class="col-md-06">
                            <div id="saveExpenseReport" class="customdown" style="cursor: pointer;">
                                <!--style="margin-right: auto;margin-left: auto;"-->
                                <span class="uploadify-button-text">Save Expense Report</span>
                            </div>
                        </div>
                        <div class="col-md-06">
                            <div id="submit_button" class="customdown" style="cursor: pointer;">
                                <!--style="margin-right: auto;margin-left: auto;"-->
                                <span class="uploadify-button-text">Send For Approval</span>
                            </div>
                        </div>
                    </div>

                    <div class="row col-md-12" style="margin-bottom: 3%; display: none">
                        <div class="col-md-3">
                            <strong>Last 3 Months Expense Amount</strong>
                        </div>
                        <div class="col-md-2">
                            <strong>July :</strong>
                            0
                        </div>
                        <div class="col-md-2">
                            <strong>August :</strong>
                            0
                        </div>
                        <div class="col-md-2">
                            <strong>September :</strong>
                            0
                        </div>
                    </div>

                    <div class=" col-md-12" style="border: 1px solid #b7b7b7; margin: 0 0 20px 0;">
                        <div class=" col-md-12" style="margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #b7b7b7; padding-bottom: 15px;" id="ApprovalLevelHeaders">
                            <div class="col-md-2">
                                <label>Approval Level</label></div>
                            <div class="col-md-2 center-block">
                                <label for="AmVerified">Status</label></div>
                            <div class="col-md-3">
                                <label>Remarks</label></div>
                            <div class="col-md-2" style="display: none;">
                                <label>Total Amount</label></div>
                            <div class="col-md-2">
                                <label>Date</label></div>
                            <div class="col-md-1">
                                <label></label>
                            </div>
                            <div class="col-md-1">
                                <label>Reimbursment</label>
                            </div>
                        </div>

                        <div class=" col-md-12" style="margin-bottom: 1%; border-bottom: 1px solid #b7b7b7; padding-bottom: 15px;" id="Level5Approval">
                            <div class="col-md-2">
                                <label>DSM</label>
                            </div>
                            <div class="col-md-2">
                                <select class="form-control ea-triggers-bound" id="Level5ApprovalAction">
                                    <option value="-1">-- Select --</option>
                                   <option selected="selected" value="Pending">Pending</option>--%> 
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <textarea class="form-control text-box multi-line ea-triggers-bound" data-val="true" data-val-length="The field Remarks must be a string with a maximum length of 500." data-val-length-max="500" id="Level5ApprovalRemarks" style="resize: none;"></textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="Remarks" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" style="display: none;">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Total Amount must be a number." data-val-required="The Total Amount field is required." id="Level5ApprovalAmount" value="" type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 ">
                                <span class="field-validation-valid text-danger" data-valmsg-for="TotalAmount" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" id="Level5ApprovalDate"></div>
                            <div class="col-md-1"><a class='txtboxx' onclick='' id="Level5ApprovalSubmit" style="cursor: pointer;">Submit</a></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level5ReimbursApprovalSubmit" style="display: none; cursor: pointer;">Submit</a></div>
                        </div>
                        <div class=" col-md-12" style="margin-bottom: 1%; border-bottom: 1px solid #b7b7b7; padding-bottom: 15px;" id="Level4Approval">
                            <div class="col-md-2">
                                <label>SM</label>
                            </div>
                            <div class="col-md-2">
                                <select class="form-control ea-triggers-bound" id="Level4ApprovalAction">
                                    <option value="-1">-- Select --</option>
                                    <option selected="selected" value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <textarea class="form-control text-box multi-line ea-triggers-bound" data-val="true" data-val-length="The field Remarks must be a string with a maximum length of 500." data-val-length-max="500" id="Level4ApprovalRemarks" style="resize: none;"></textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="Remarks" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" style="display: none;">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Total Amount must be a number." data-val-required="The Total Amount field is required." id="Level4ApprovalAmount" value="" type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 ">
                                <span class="field-validation-valid text-danger" data-valmsg-for="TotalAmount" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" id="Level4ApprovalDate"></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level4ApprovalSubmit" style="cursor: pointer;">Submit</a></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level4ReimbursApprovalSubmit" style="display: none; cursor: pointer;">Submit</a></div>
                        </div>
                        <div class=" col-md-12" style="margin-bottom: 1%; border-bottom: 1px solid #b7b7b7; padding-bottom: 15px;" id="Level3Approval">
                            <div class="col-md-2">
                                <label>Head</label>
                            </div>
                            <div class="col-md-2">
                                <select class="form-control ea-triggers-bound" id="Level3ApprovalAction">
                                    <option value="-1">-- Select --</option>
                                    <option selected="selected" value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <textarea class="form-control text-box multi-line ea-triggers-bound" data-val="true" data-val-length="The field Remarks must be a string with a maximum length of 500." data-val-length-max="500" id="Level3ApprovalRemarks" style="resize: none;"></textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="Remarks" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" style="display: none;">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Total Amount must be a number." data-val-required="The Total Amount field is required." id="Level3ApprovalAmount" value="" type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 ">
                                <span class="field-validation-valid text-danger" data-valmsg-for="TotalAmount" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" id="Level3ApprovalDate"></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level3ApprovalSubmit" style="cursor: pointer;">Submit</a></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level3ReimbursApprovalSubmit" style="display: none; cursor: pointer;">Submit</a></div>
                        </div>
                        <div class=" col-md-12" style="margin-bottom: 1%;" id="Level2Approval">
                            <div class="col-md-2">
                                <label>Expense Admin</label>
                            </div>
                            <div class="col-md-2">
                                <select class="form-control ea-triggers-bound" id="Level2ApprovalAction">
                                    <option value="-1">-- Select --</option>
                                    <option selected="selected" value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <textarea class="form-control text-box multi-line ea-triggers-bound" data-val="true" data-val-length="The field Remarks must be a string with a maximum length of 500." data-val-length-max="500" id="Level2ApprovalRemarks" style="resize: none;"></textarea>
                                <span class="field-validation-valid text-danger" data-valmsg-for="Remarks" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" style="display: none;">
                                <input class="form-control decimal-input ea-triggers-bound" data-val="true" data-val-number="The field Total Amount must be a number." data-val-required="The Total Amount field is required." id="Level2ApprovalAmount" value="" type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) ||  event.charCode == 46 || event.charCode == 0 ">
                                <span class="field-validation-valid text-danger" data-valmsg-for="TotalAmount" data-valmsg-replace="true"></span>
                            </div>
                            <div class="col-md-2" id="Level2ApprovalDate"></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level2ApprovalSubmit" style="cursor: pointer;">Submit</a></div>
                            <div class="col-md-1"><a class='txtboxx' id="Level2ReimbursApprovalSubmit" style="display: none; cursor: pointer;">Submit</a></div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

