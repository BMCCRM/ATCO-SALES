<%@ Page Title="Expense Report" Language="C#" MasterPageFile="~/MasterPages/Home.Master" 
    AutoEventWireup="true" CodeBehind="ReportExpenseDetails.aspx.cs" Inherits="PocketDCR2.Form.ReportExpenseDetails" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
<script type="text/javascript" src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.js"></script>
    <link href="../assets/css/Nbootstrap.min.css" rel="stylesheet" />
    <link href="../assets/css/bootstrap-table-expandable.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquerycookie.js"></script>
    <script src="../assets/js/Nbootstrap.min.js"></script>
    <script>
        var $i = jQuery.noConflict();
    </script>
    <script  src="ReportExpenseDetails.js"></script>
     <style type="text/css">
         body {
            font-size: 12px !important;
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
         .margin{
             padding-left: 2px;
             padding-right: 2px;
         }
        .txtbox
            {
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
        .smallbox {
            width:60%;
        }
        .txtboxx
            {
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
        .smallboxx {
            width:60%;
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
.red{
	width:130px;	
	float:left;
	font-size:14px;
	background:#cc0000;
	color:#fff;
	padding:2px 0px;
	border:solid 1px #333;
}

.yellow{
	width:130px;	
	float:left;
	font-size:14px;
	background:#ffcc00;
	color:#000;
	padding:2px 0px;
	border:solid 1px #333;
}

.green{
	width:130px;	
	float:left;
	font-size:14px;
	background:#008000;
	color:#fff;
	padding:2px 0px;
	border:solid 1px #333;
}
input[type=radio] {
		display:none;
	}

	input[type=radio] + label {
		display:inline-block;
		margin:-2px;
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
			background-color:#e0e0e0;
	}
         .tble {
            margin-bottom:5px;
         }

         .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
             padding: 5px  !important;
             text-align:center;
         }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div id="content">
        <div class="pop_box-outer jqmWindow" id="dialog" style="obrder:0;background-color:transparent !important">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
    
                <div id="divforprint">
                  <div class="container-fluid">
         <div class="row">
             <div class="col-md-10">
             <%--<h3 style="text-align: center; margin-bottom:0px" >Monthly Field Expense</h3>
             <h4 style="text-align: center; margin:0px;" id="expensemonth">Month Print</h4>
             <div class="col-md-10 text-right" style="display:none"><strong>Report Status</strong></div>
             <div class="col-md-2" id="labelStatus" style="height:23px;text-align: center;display:none"></div>
             --%>
             </div>
             <div class="col-md-2">
                 <div class="box-tools pull-right" id="divprintExport" style="margin-top: 30px;">
             <input type="button" id="btnExport" class="btn btn-success" onclick="ProductCallPlannerExport();" value=" Export " style="display:none">
             <div class="box-tools pull-right">
                  <%--<input type="button" id="btnExcel" class="btn btn-success" onclick="exportTableToExcel('editexpensedata', 'members-data');" style="margin-left: 5px;" value=" Excel ">         
                 <input type="button" id="btnPrint" class="btn btn-success" onclick="printdiv('divforprint');" style="margin-left: 5px;" value=" Print ">--%>
<%--                  <input type="button" id="btnPDF" class="btn btn-danger" onclick="exportTableTopdf();" style="margin:5px;" value=" PDF ">--%>
                  <button type="button" id="btnPDF" class="btn btn-danger" onclick="exportTableTopdf();" style="margin:5px;">PDF </button>
                 <input type="button" id="btnPrint" class="btn btn-success d-block ml-auto" onclick="printdiv('divforpdf');" style="display: inline-block !important;" value=" Print ">
                 
                  </div>

         </div>
             </div>
         </div>
                
                      <%--  <div class="col-md-10">
                            <h3 style="text-align: center; margin-bottom: 0px">Monthly Field Expense</h3>
                            <h4 style="text-align: center; margin: 0px;" id="expensemonth">Month Print</h4>
                            <div class="col-md-10 text-right" style="display: none"><strong>Report Status</strong></div>
                            <div class="col-md-2" id="labelStatus" style="height: 23px; text-align: center; display: none"></div>

                        </div>--%>
                      </div></div>
    <div id="divforpdf" class="container-fluid">
           <div class="col-md-10">
             <h3 style="text-align: center; margin-bottom:0px" >Monthly Field Expense</h3>
             <h4 style="text-align: center; margin:0px;" id="expensemonth">Month Print</h4>
             <div class="col-md-10 text-right" style="display:none"><strong>Report Status</strong></div>
             <div class="col-md-2" id="labelStatus" style="height:23px;text-align: center;display:none"></div>
             
             </div>
         <div class="row" style="border: 1px solid #b7b7b7;    margin:0px;">
             <div class="col-md-12" style=" border-bottom: 1px solid #b7b7b7;margin-bottom: 10px;">
                 <div class="col-md-10">
                 <h3 style="font-size: 18px; font-weight: 700;margin: 0px; text-align:center">Employee Details</h3>
                 </div>
                 <div class="col-md-2"></div>
             </div>
             <div style=" padding:0px;">
         <div class="row" style="display: contents;">
            
             <div class="col-md-2"><strong>Login ID</strong></div>
             <div class="col-md-2" id="emploginID"></div>
             
             <div class="col-md-2"><strong>Employee Code</strong></div>
             <div class="col-md-2" id="empCode" style="font-size: 16px;font-weight: bold;"></div>
  
             <div class="col-md-2"><strong>Team</strong></div>
             <div class="col-md-2" id="empteam"></div>
         </div>

        <div class="row" style="display: contents;">
            <div class="col-md-2"><strong>Employee Name</strong></div>
            <div class="col-md-2" id="empName" style="font-size: 16px;font-weight: bold;"></div>

            <div class="col-md-2"><strong>Designation</strong></div>
            <div class="col-md-2" id="empdesignation"></div>

            <div class="col-md-2"><strong>City</strong></div>
            <div class="col-md-2" id="empcity"></div>
            <%--<div class="col-md-2"><strong>Month</strong></div>
            <div class="col-md-2" id="expensemonth">October - 2016</div>--%>
        </div>
        <div class="row" style="display: contents;">

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
             <div class="col-md-12" style="border-top: 1px solid #b7b7b7;margin:0px;border-bottom: 1px solid #b7b7b7;">
                 <div class="col-md-10">
                 <h2 style="font-size: 18px; font-weight: 700;margin: 0px; padding:10px 0px;">Working Days</h2>
                 </div>
                 <div class="col-md-2"></div>
             </div>
                 
        
         
        <div class="row" style="display: contents;">
            <div class="col-md-2"><strong>Total</strong></div>
            <div class="col-md-2" id="totalworkingdays" style="font-size: 16px;font-weight: bold;"></div>

            <div class="col-md-2"><strong>Local</strong></div>
            <div class="col-md-2" id="localworkingdays" style="font-size: 16px;font-weight: bold;"></div>

            <div class="col-md-2"><strong>Outstation</strong></div>
            <div class="col-md-2" id="outstandworkingdays" style="font-size: 16px;font-weight: bold;"></div>
            
        </div>
        <div class="row" style="display: contents;">
            <div class="col-md-2"><strong>Out Back</strong></div>
            <div class="col-md-2" id="empoutback"></div>

            <div class="col-md-2"><strong>Night Stay</strong></div>
            <div class="col-md-2" id="empnightstay"></div>

            <div class="col-md-2"><strong>Sunday/Special</strong></div>
            <div class="col-md-2" id="satsunworkingdays"></div>
        </div>
                 <div class="row" style="display: contents;">
            <%--<div class="col-md-2"><strong>IBA</strong></div>--%>
            <%--<div class="col-md-2" id="empIBA"></div>--%>

            <div class="col-md-2" ><strong>ADDA</strong></div>
            <div class="col-md-2" id="empADDA"></div>
        </div>
                 </div>
             </div>
   
                  <div class="container-fluid" style="padding-right:0px; padding-left:0px;">
        <div class="table-responsive" id="editexpensedata">
         
        </div>
         <div class="row col-md-12" style="margin-bottom:0.5%" id="CNGDataRow">
        <div class=" col-md-06" style="display :none;">
            <label class="control-label col-md-2" for="CngChargedDays">CNG Charged Days</label>
            <div class="col-md-2" id="CngChargedDays">
                
            </div>
        </div>
        <div class="col-md-03">
            <label class="control-label col-md-2" for="CngAllowance">Vehicle Allowance</label>
            <div class="col-md-1" id="CngAllowance">
                
            </div>
        </div>
             <div class="col-md-06">
            <label class="control-label col-md-2" for="Reimbursment">Reimbursement</label>
            <div class="col-md-2" id="Reimbursment">
                
            </div>
        </div>
</div>
         
         <div class=" row col-md-12" style="display :none; margin-bottom:0.5%" id="BikeDataRow">
        
        <div class=" col-md-06">
            <label class="control-label col-md-2" for="MonthlyExpenseTownBased">Bike Expense</label>
            <div class="col-md-2" id="BikeExpense">
                
            </div>
        </div>
             <div class="col-md-06">
            <label class="control-label col-md-2" for="BikeDeduction">Bike Deduction</label>
            <div class="col-md-2" id="BikeDeduction">
                
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

                      <div class="row col-md-12" style="margin-bottom:0.5% ;">
        
        <div class="col-md-03" style="display:none;">
            <label class="control-label col-md-2" for="MonthlyNonTouringAllowance">Non Touring Allowance</label>
            <div class="col-md-1" id="MonthlyNonTouringAllowance">
            </div>
        </div>
<div class="col-md-03">
            <label class="control-label col-md-2" for="CellPhoneBillAmount">Mobile Bill</label>
            <div class="col-md-1" id="CellPhoneBillAmount">
                
            </div>
        </div>

            
              <div class="col-md-03">
                            <label class="control-label col-md-2" for="fuelAllowance">Fuel Allowance adjustment<%--CNG Allowance--%></label>
                            <div class="col-md-2" >
                                <%--<input readonly="readonly"  data-val="true"  data-val-required="The FuelAllowance field is required." id="fuelAllowance" name="fuetallowance" type="text" style="border:none;">--%>
                                 <span id="fuelAllowance"></span>
                                <span  data-valmsg-for="fuelAllowance" data-valmsg-replace="true"></span>
                            </div>
                        </div>

                          <div class="col-md-03" style="display:none;">
            <label class="control-label col-md-2" for="CellPhoneBillAmountCorrection">Mobile Bill Correction</label>
            <div class="col-md-1" id="CellPhoneBillAmountCorrection">
                
            </div>
        </div>

             <div class="col-md-03" style="display:none;">
            <label class="control-label col-md-2" for="MonthlyExpenseTownBased">Medical + Misc Allowance<%--Monthly Expense--%></label>
            <div class="col-md-1" id="MonthlyExpenseTownBaseds">
                
            </div>
        </div>


             </div>


         <div class="row col-md-12">
        <div class="col-md-03">
            <label class="control-label col-md-2" for="MiscExpense">Misc Allowance<%--Misc. Expense--%></label>
            <div class="col-md-1" id="MonthlyExpenseTownBased">
                
            </div>
        </div>
             <div class="col-md-03" style="display:none;">
            <label class="control-label col-md-2" for="MonthlyAllowance_BigCity">Monthly Allowance for Big City<%--Monthly Expense--%></label>
            <div class="col-md-1" id="MonthlyAllowance_BigCity">
            </div>
             
             </div>
        
             <div class="col-md-03">
            <label class="control-label col-md-2" for="MiscExpense">Grand Total</label>
            <div class="col-md-1" id="GrandTotal">
                
            </div>
        </div>

</div>


                      <div class="row col-md-12" style="margin-bottom:0.5%">
        



         <div class="row col-md-12">
            <label class="control-label col-md-2" for="AdjExpense">Expense Note</label>
            <div class="col-md-8" id="ExpenseNote">

            </div>
        </div>


        <%-- <div class="row col-md-12">
        
        <div class="col-md-06" style="margin-top: 10px;">
                     <label class="control-label col-md-2"></label>
            <div class="col-md-2">
                <a class="txtboxx" style="display: block;text-align: center;cursor: pointer;" id="saveExpenseReport">Save Expense Report</a>
                </div>      
                           
        </div>
        </div>--%> 
        <div class="row col-md-12" style="margin-bottom:1%;display:none;">
            <div class="col-md-06">
                                                        <div id="saveExpenseReport" class="customdown" style="cursor: pointer;"> <!--style="margin-right: auto;margin-left: auto;"-->
                                                            <span class="uploadify-button-text">Save Expense Report</span>
                                                        </div>
            </div>
            <div class="col-md-06">
                                                        <div id="submit_button" class="customdown" style="cursor: pointer;"> <!--style="margin-right: auto;margin-left: auto;"-->
                                                            <span class="uploadify-button-text">Send For Approval</span>
                                                        </div>
            </div>
        </div>

       <div class="row col-md-12" style="margin-bottom:3%;display:none">
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

        <div class=" col-md-12" style="border: 1px solid #b7b7b7;">
        <div class=" col-md-12" style=" border-bottom: 1px solid #b7b7b7;" id="ApprovalLevelHeaders">
            <div class="col-md-2"><label>Approval Level</label></div>
            <div class="col-md-2 center-block"><label for="AmVerified">Status</label></div>
            <div class="col-md-2"><label>Remarks</label></div>
            <div class="col-md-2"><label>Total Amount</label></div>
            <div class="col-md-2"><label>Date</label></div>
            <div class="col-md-1"><label></label></div>
        </div>
        
        <div class=" col-md-12" style="border-bottom: 1px solid #b7b7b7;" id="Level5Approval">
            <div class="col-md-2">
                <label>DSM</label>
            </div>
            <div class="col-md-2" id="Level5ApprovalAction">
                
            </div>
            <div class="col-md-2" id="Level5ApprovalRemarks">

            </div>
            <div class="col-md-2" id="Level5ApprovalAmount">

            </div>
            <div class="col-md-2" id="Level5ApprovalDate"></div>
            <div class="col-md-1" style="display:none">
                <a class='txtboxx' onClick='' id="Level5ApprovalSubmit">Submit</a>
            </div>
        </div>
        <div class=" col-md-12" style="border-bottom: 1px solid #b7b7b7;" id="Level4Approval">
            <div class="col-md-2">
                <label>Sales Manager</label>
            </div>
            <div class="col-md-2" id="Level4ApprovalAction">
                
            </div>
            <div class="col-md-2" id="Level4ApprovalRemarks">

            </div>
            <div class="col-md-2" id="Level4ApprovalAmount">

            </div>
            <div class="col-md-2" id="Level4ApprovalDate"></div>
            <div class="col-md-1" style="display:none">
                <a class='txtboxx' onClick='' id="Level4ApprovalSubmit">Submit</a>
            </div>
        </div>
        <div class=" col-md-12" style="border-bottom: 1px solid #b7b7b7;" id="Level3Approval">
            <div class="col-md-2">
                <label>Head</label>
            </div>
            <div class="col-md-2" id="Level3ApprovalAction">
                
            </div>
            <div class="col-md-2" id="Level3ApprovalRemarks">

            </div>
            <div class="col-md-2" id="Level3ApprovalAmount">

            </div>
            <div class="col-md-2" id="Level3ApprovalDate"></div>
            <div class="col-md-1" style="display:none">
                <a class='txtboxx' onClick='' id="Level3ApprovalSubmit">Submit</a>
            </div>
        </div>
        <div class=" col-md-12" style="" id="Level2Approval">
            <div class="col-md-2">
                <label>Expense Admin</label>
            </div>
            <div class="col-md-2" id="Level2ApprovalAction">
                
            </div>
            <div class="col-md-2" id="Level2ApprovalRemarks">

            </div>
            <div class="col-md-2" id="Level2ApprovalAmount">

            </div>
            <div class="col-md-2" id="Level2ApprovalDate"></div>
            <div class="col-md-1" style="display:none">
                <a class='txtboxx' onClick='' id="Level2ApprovalSubmit">Submit</a>
            </div>
        </div>
         </div>
               
                </div>
                </div>
                        </div>
                      
          
            </ContentTemplate>
    </asp:UpdatePanel>
        </div>
</asp:Content>
