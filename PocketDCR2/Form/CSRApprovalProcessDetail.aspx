<%@ Page Title="CSR Approval Process Detail" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" 
    CodeBehind="CSRApprovalProcessDetail.aspx.cs" Inherits="PocketDCR2.Form.CSRApprovalProcessDetail" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

  <link rel="stylesheet" href="assets_new/bower_components/bootstrap/dist/css/bootstrap.min.css"/>

  <link rel="stylesheet" href="assets_new/dist/css/AdminLTE.min.css"/>

  <link rel="stylesheet" href="assets_new/dist/css/skins/_all-skins.min.css"/>

      <style type="text/css">
         .ModelConfirm {
            margin-left: 493px;
            margin-top: 200px;
            width: 335px;
        }
        .ModelConfirmBody{
            padding: 20px;
        }
        #btnRejectNo{
              margin: 16px;  
        }
         #btnApprovedNo{
              margin: 16px;  
        }
      
      </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <section class="invoice">
          <!-- title row -->
         <div class="row">
        <div class="col-xs-12">
          <h2 class="page-header">
              <small class="pull-left"><b>MTD Calls:</b> <u><label id="CallsCount">10</label></u></small>
      
              <label id="EmployeeName">Test Employee Name</label>
            <small class="pull-right"><b>Requested Date:</b> <u><label id="RequestedDate">2/10/2014</label></u></small>
            <small class="pull-right" style="margin-right: 58px;"><b>CSR Status:</b> <u><label id="CSRStatus">Pending</label></u></small>
          </h2>
        </div>
        <!-- /.col -->
      </div>
         <!-- info row -->
         <div class="row">
          <div class="page-header">
             <h3 style="font-size: 20px;"><b style="border-bottom: 2px solid black;"> Doctors Detail</b></h3>

          </div>
    </div>
         <div class="well" style="border: 2px solid #03429a;">
                <div class="row">
                <div class="col-sm-2 invoice-col" style="padding-right: 0px;height: 10px;width: 126px;">
                    <h4><b style="font-size: 16px;">Doctor Name : </b></h4>
                </div>
   
                <div class="col-sm-2 invoice-col">
          
                  <h4><u><div id="DoctorName" style="font-size: 16px;">Dr Arshad</div></u></h4>
          
                </div>
 
   
        
                <div class="col-sm-2 invoice-col" style="padding-right: 0px;height: 10px;width: 126px;">
                    <h4><b style="font-size: 16px;">Qualification : </b></h4>
                </div>
   
                <div class="col-sm-2 invoice-col">
          
                  <h4><u><div id="Qualification" style="font-size: 16px;">MBBS</div></u></h4>
          
                </div>
                       <div class="col-sm-2 invoice-col" style="padding-right: 0px;height: 10px;width: 126px;">
                    <h4><b style="font-size: 16px;">Speciality : </b></h4>
                </div>
   
                <div class="col-sm-2 invoice-col">
          
                  <h4><u><div id="Specialty" style="font-size: 16px;">Physician</div></u></h4>
          
                </div>

      
 
             </div>
                <div class="row">
                       <div class="col-sm-2 invoice-col" style="padding-right: 0px;height: 10px;width: 126px;">
                    <h4><b style="font-size: 16px;">Class : </b></h4>
                </div>
   
                <div class="col-sm-2 invoice-col">
          
                  <h4><u><div id="Class" style="font-size: 16px;">A</div></u></h4>
          
                </div>

                      <div class="col-sm-2 invoice-col" style="padding-right: 0px;height: 10px;width: 126px;">
                    <h4><b style="font-size: 16px;">Cell No. : </b></h4>
                </div>
   
                <div class="col-sm-2 invoice-col">
          
                  <h4><u><div id="CellNo" style="font-size: 16px;">0300-1234567</div></u></h4>
          
                </div>
                </div>
        </div>
   
         <div class="row">
          <div class="page-header">
             <h3 style="font-size: 20px;"><b style="border-bottom: 2px solid black;"> Product Detail</b></h3>

          </div>
    </div>
         <!-- Table row -->
         <div class="row">
        <div class="col-xs-10 table-responsive">
          <table id="ProductDetail" class="table table-bordered well">
            <thead>
            <tr style="border-top: 3px solid #03429a;border-bottom: 3px solid #03429a;">
              <th style="width: 70px;">S.No</th>
              <th style="width: 300px;">Product</th>
              <th style="width: 300px;">SKU</th>
              <th style="width: 170px;">Last Incr. Units</th>
              <th style="width: 160px;">Incr. Units</th>
              <th style="width: 160px;">Expec Units</th>
            
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <!-- /.col -->
      </div>
         <!-- /.row -->
         <div class="row">
          <div class="page-header">
             <h3 style="font-size: 20px;"><b style="border-bottom: 2px solid black;">Item Request</b></h3>

          </div>
    </div>
         <div class="row">
        <div class="col-xs-10 table-responsive">
          <table class="table table-bordered well" style="font-size: 15px;border: 2px solid #03429a;">
               <tbody>
                   <tr>
              <th style="width: 70px;">Items</th>
              <td><u><div id="ItemName">Refrigerator,LED</div> </u></td>
              <th style="width: 120px;">Cost</th>
              <td><u><div id="RequiredCost">100</div></u></td>
              <th style="width: 110px;">Required On</th>
              <td><u><div id="RequiredOn">12-01-2019</div></u></td>
                      
                   
            </tr>   
                           <tr>
              <th>SE Ratio</th>
              <td><u><div id="SERatio">0%</u></td>
              <th>Instruct 4 Exec</th>
              <td><u><div id="InstructName">test data</div></u></td>
              <th>Act. Duration</th>
              <td><u><div id="ActDuration">6 Month</div></u></td>
            </tr>     
               </tbody>
          </table>
            </div>
            </div>
         <div class="row">
          <div class="page-header">
             <h3 style="font-size: 20px;"><b style="border-bottom: 2px solid black;">Sales Detail</b></h3>

          </div>
    </div>
         <div class="row">
        <div class="col-xs-9 table-responsive">
          <table id="SalesDetail" class="table table-bordered well">
            <thead>
            <tr style="border-top: 3px solid #03429a;border-bottom: 3px solid #03429a;">
              <th style="width: 70px;">S.No</th>
              <th style="width: 300px;">Product</th>
              <th style="width: 300px;">Brick</th>
              <th style="width: 200px;">Pharmacy</th>
              <th style="width: 50px;">Percentage</th>  
            
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <!-- /.col -->
      </div>
         <div class="row">
          <div class="page-header">
             <h3 style="font-size: 20px;"><b style="border-bottom: 2px solid black;">Approval Comments</b></h3>

          </div>
    </div>
         <div class="row">
        <div class="col-xs-8 table-responsive">
          <table class="table table-bordered well" style="font-size: 15px;border: 2px solid #03429a;">
               <tbody>
                   <tr>
              <th>	<div id="Level1">GM Manager</div></th>
              <td><textarea id="Level1Comment" style="margin: 0px; width: 465px; height: 50px;">test</textarea></td>
              <td><button id="AppBtnLevel1" type="button" class="btn btn-primary pull-right" onclick="ApprovedCSR()">  Approved</button><button id="RejBtnLevel1" type="button" class="btn btn-danger" onclick="RejectCSR()">
             Reject
          </button></td>
            </tr>
                    <tr>
              <th >	<div id="Level2">BUH Manager</div></th>
              <td><textarea id="Level2Comment" style="margin: 0px; width: 465px; height: 50px;">test</textarea></td>
              <td><button id="AppBtnLevel2" type="button" class="btn btn-primary pull-right" onclick="ApprovedCSR()">  Approved</button><button id="RejBtnLevel2" type="button" class="btn btn-danger" onclick="RejectCSR()">
             Reject
          </button></td>
            </tr>
                    <tr>
              <th >	<div id="Level3">National Manager</div></th>
              <td><textarea id="Level3Comment" style="margin: 0px; width: 465px; height: 50px;">test</textarea></td>
              <td><button id="AppBtnLevel3" type="button" class="btn btn-primary pull-right" onclick="ApprovedCSR()">  Approved</button><button id="RejBtnLevel3" type="button" class="btn btn-danger" onclick="RejectCSR()">
             Reject
          </button></td>
            </tr>
                    <tr>
              <th ><div id="Level4">	Region Manager</div></th>
              <td><textarea id="Level4Comment" style="margin: 0px; width: 465px; height: 50px;">test</textarea></td>
              <td><button id="AppBtnLevel4" type="button" class="btn btn-primary pull-right" onclick="ApprovedCSR()">  Approved</button><button id="RejBtnLevel4" type="button" class="btn btn-danger" onclick="RejectCSR()">
             Reject
          </button></td>
            </tr>
                    <tr>
              <th ><div id="Level5">	Zone Manager</div></th>
              <td><textarea id="Level5Comment" style="margin: 0px; width: 465px; height: 50px;">test</textarea></td>
              <td><button id="AppBtnLevel5" type="button" class="btn btn-primary pull-right" onclick="ApprovedCSR()">  Approved</button><button id="RejBtnLevel5" type="button" class="btn btn-danger" onclick="RejectCSR()">
             Reject
          </button></td>
            </tr>
                      
                   
           
               </tbody>
          </table>
            </div>
            </div>
         <div id="divConfirmation" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog ModelConfirm">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h5 class="modal-title"> Confirmation Window</h5>
                </div>
                <div class="modal-body ModelConfirmBody">
                 

                         <div class="divEdit">
            <div class="divTable">
                <center>
                <div class="divRow">
                    Are you sure to approved this record(s)?
                </div>
                  
                <div class="divRow">
                   <table>
                       <tr>
                           <th>  <div>
                            <input id="btnApprovedYes" name="btnApprovedYes" type="button" value="Yes" />
                        </div></th>
                            <th> <div>
                            <input id="btnApprovedNo" name="btnApprovedNo" type="button" value="No" />
                        </div></th>
                       </tr>
                   </table>
                      
                   
                       
                    
                </div>
                      </center>
            </div>
        </div>
                    </div>

                
              
            </div>

        </div>
    </div>
         <div id="divConfirmationReject" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog ModelConfirm">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h5 class="modal-title"> Confirmation Window</h5>
                </div>
                <div class="modal-body ModelConfirmBody">
                 

                         <div class="divEdit">
            <div class="divTable">
                <center>
                <div class="divRow">
                    Are you sure to Reject this record(s)?
                </div>
                  
                <div class="divRow">
                   <table>
                       <tr>
                           <th>  <div>
                            <input id="btnRejectYes" name="btnRejectYes" type="button" value="Yes" />
                        </div></th>
                            <th> <div>
                            <input id="btnRejectNo" name="btnRejectNo" type="button" value="No" />
                        </div></th>
                       </tr>
                   </table>
                      
                   
                       
                    
                </div>
                      </center>
            </div>
        </div>
                    </div>

                
              
            </div>

        </div>
    </div>

      </section>

    <script type="text/javascript" src="assets_new/bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="assets_new/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/dist/js/adminlte.min.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script src="CSRApprovalRequisitionDetail.js" type="text/javascript"></script>

   
</asp:Content>

