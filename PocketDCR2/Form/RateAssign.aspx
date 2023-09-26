<%@ Page Title="Assign Rate" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="RateAssign.aspx.cs" Inherits="PocketDCR2.Form.RateAssign" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <%--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" />--%>
    <link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        #ViewAssignedFormList{
            margin :2px;
        }

        thead {
            background: #b73a3c;
            color: #fff;
        }

        .btnPrimary {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #b73a3c;
            border-top: 1px solid #b73a3c;
            border-right: 1px solid #b73a3c;
            border-bottom: 1px solid #b73a3c;
            border-left: 1px solid #b73a3c;
            box-shadow: 2px 1px 2px #b73a3c;
            margin: 10px 5px 10px 5px;
        }

            .btnPrimary:hover, .btnPrimary:active, .btnPrimary:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background-color: #ca4749;
                border-top: 1px solid #ca4749;
                border-right: 1px solid #ca4749;
                border-bottom: 1px solid #ca4749;
                border-left: 1px solid #ca4749;
                box-shadow: -1px -1px 2px #ccc;
            }

        .btnUpdate {
            font-size: 90%;
            text-shadow: none;
            text-decoration: none;
            text-shadow: -1px -1px 1px #72aebd;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 10px 6px 10px;
            border-radius: 5px;
            background-color: #ca393b;
            border-top: 1px solid #ca393b;
            border-right: 1px solid #ca393b;
            border-bottom: 1px solid #ca393b;
            border-left: 1px solid #ca393b;
            box-shadow: 2px 1px 2px #ca393b;
            margin: 10px 5px 10px 5px;
        }

            .btnUpdate:hover, .btnUpdate:active, .btnUpdate:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background-color: #bb3335;
                border-top: 1px solid #bb3335;
                border-right: 1px solid #bb3335;
                border-bottom: 1px solid #bb3335;
                border-left: 1px solid #bb3335;
                box-shadow: -1px -1px 2px #bb3335;
            }

        .jqmTitle {
            background-color: #b73a3c;
            color: #FFFFFF;
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            text-align: center;
        }

        .jqmConfirmation {
            background-color: #EEEEEE;
            border: 10px solid #b73a3c;
            color: #333333;
            display: none;
            left: 60%;
            margin-left: -300px;
            padding: 12px;
            position: fixed;
            top: 40%;
            /*width: 275px;*/
            width: 330px;
        }

        .divColumn {
            width: 75px;
            float: left;
        }

        .row {
    margin-left: -8px;
    }
        .Page_h {
  
    padding: 15px 0px 15px 0px;
}
    </style>

</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="loadingdiv">
        <div id="UpdateProgress1" style="display: none;">
            <div class="loadingdivOuter" id="loadingdivOuter">
                <div class="loadingdivinner">
                    <div class="loadingdivmiddle">
                        <div class="loadingdivimg">
                            <img id="imgLoading" src="../Images/please_wait.gif" alt="Loading..." />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div id="divConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    <span id="assignmsg"></span>
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 45px;">
                        <div>
                            <input id="btnAssignYes" name="btnAssignYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnAssignNo" name="btnAssignNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divDeleteConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    <span id="deletemsg"></span>
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 45px;">
                        <div>
                            <input id="btnDeleteYes" name="btnDeleteYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnDeleteNo" name="btnDeleteYes" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="Divmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnOk" name="btnOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>


    <div id="AttemptDateModal" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <br />
                    <input type="text" id="AssignedIdTxt" name="AssignedIdTxt" value="" hidden="hidden"/>
                    Current Attempte Date: <input type="text" id="currentAttemptDate" name="currentAttemptDate" readonly="readonly" /> 
                    <%--<label id="currentAttemptDate" name="currentAttemptDate"></label>--%>
                    <br />
                    <br />
                    New Attempt Date: <input type="text" id="newAttemptDatetxt" name="newAttemptDatetxt" placeholder="Pick new attempt date" />
                    <br />
                    <br />
                    <input id="BtnAttemptDateChange" name="BtnAttemptDateChange" type="button" value="Change date" />
                    <input id="btnCloseAttemptDateModal" name="btnCloseAttemptDateModal" type="button" value="Close" />
                </div>
            </div>
        </div>
    </div>



    <!-- Summary Modal -->
    <div id="AssignedFormListModal" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h4 class="modal-title">Rating Forms</h4>
                </div>
                <div class="modal-body ">
                    <div class="summaryBody"> 
                         <div class="row">
                             <div class="col-md-12" id="FLMName">
                            <%-- <h4 class="modal-title"><b>Employee Name :</b></h4>
                                 </div>
                                 <div class="col-md-10-">
                             <h4 class="modal-title" id="FLMName"></h4>--%>
                                 </div>
                         </div>
                    </div>
                    <br />
                    <div class="row" id="ViewAssignedFormList">
                   
                   </div>
                
                    </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>

        </div>
    </div>


    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />


    <div class="container" id="MasterFormFields">
        <div class="page_heading row">
            <h1>Rate Assign Form</h1>
        </div>
        <div class="row">
            <div id="col11" class="col-md-6">
                <div class="form-group">
                    <label id="Label1" for="ddl1"></label>
                    <select id="ddl1" name="ddl1" class="form-control">
                        <option value="">Select BUH</option>
                    </select>
                </div>
            </div>
            <div id="col22" class="col-md-6">
                <div class="form-group">
                    <label id="Label2" for="ddl2"></label>
                    <select id="ddl2" name="ddl2" class="form-control" disabled="disabled">
                        <option value="">Select GM</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="col33" class="col-md-6">
                <div class="form-group">
                    <label id="Label3" for="ddl3"></label>
                    <select id="ddl3" name="ddl3" class="form-control" disabled="disabled">
                        <option value="">Select National</option>
                    </select>
                </div>
            </div>

             <div id="col44" class="col-md-6">
                <div class="form-group">
                    <label id="Label4" for="ddl4"></label>
                    <select id="ddl4" name="ddl4" class="form-control" disabled="disabled">
                        <option value="">Select Region</option>
                    </select>
                </div>
            </div>
        </div>
   
        <div class="row" style="display:none;">
            <div id="col55" class="col-md-6">
                <div class="form-group">
                    <label id="Label5" for="ddl5"></label>
                    <select id="ddl5" name="ddl5" class="form-control" disabled="disabled">
                        <option value="">Select Zone</option>
                    </select>
                </div>
            </div>
            <div id="col66" class="col-md-6">
                <div class="form-group">
                    <label id="Label6" for="ddl6"></label>
                    <select id="ddl6" name="ddl6" class="form-control" disabled="disabled">
                        <option value="">Select Territory</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="ddemp">
                        Select Employee: <span class="red">*</span> &nbsp;&nbsp;
                        <label style="cursor: pointer;">
                            <input type="checkbox" id="selectAllEmp" name="selectAllEmp" onclick="SelectAllEmployeeCheckBoxes();" />
                            All</label></label>
                    <div id="divEmployees" style="border: 1px solid gray; min-height: 50px; max-height: 250px; padding: 10px; overflow-y: auto;">
                    </div>
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="ddemp">
                        Select Rate: <span class="red">*</span> &nbsp;&nbsp;
                        <label style="cursor: pointer;">
                            <input type="checkbox" id="selectAllRate" name="selectAllRate" onclick="SelectAllRateCheckBoxes();" />
                            All</label></label>
                    <div id="divRate" style="border: 1px solid gray; min-height: 50px; max-height: 250px; padding: 10px; overflow-y: auto;">
                    </div>
                </div>
            </div>
        </div>

          
       
      
        <div class="row">
            <div class="col-md-4">
                <button type="button" class="btn btnPrimary" id="btnAssignForm"><i class="fa fa-check" id="btnAssignName"></i>&nbsp;&nbsp;Assign</button>
                <%--                <button type="button" class="btn btnUpdate" id="btnUpdateAssignForm" style="display: none;"><i class="fa fa-check"></i>&nbsp;&nbsp;Update</button>--%>
                <button type="button" class="btn btn-default" id="btnClearFields"><i class="fa fa-times"></i>&nbsp;&nbsp;Reset</button>
            </div>
        </div>
    
        <br />

        <div class="page_heading Page_h">
            <h1>Assigned Rate Forms List</h1>
        </div>

        <div class="row" id="AssignedFormList">
        </div>
    </div>




    <script type="text/javascript" src="assets_new/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="assets_new/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="assets_new/responsive.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.validate.min.js"></script>
    <script type="text/javascript" src="assets_new/additional-methods.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery-ui.js"></script>


    <%--<script src="assets_new/printThis.js"></script>--%>

    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>

    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>

    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        var $2 = jQuery.noConflict();

        //function PrintModalResult() {
        //    $("#QuizTestSummaryModal").printThis();
        //}

        //function PrintModalResult() {
        //    printJS('QuizTestSummaryModal', 'html');
        //}


        function PrintModalResult() {
            var contents = $(".summaryBody").html();
            var frame1 = $('<iframe />');
            frame1[0].name = "frame1";
            frame1.css({ "position": "absolute", "top": "-1000000px" });
            $("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Quiz Result</title>');
            frameDoc.document.write('</head><body>');
            //Append the external CSS file.
            frameDoc.document.write('<link href="assets_new/bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />');
            frameDoc.document.write('<link href="assets_new/style.css" rel="stylesheet" type="text/css" />');
            //Append the DIV contents.
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 500);
        }

        function ExportToPDF() {
            //var doc = new jsPDF({
            //    orientation: 'landscape'
            //});

            //doc.fromHTML($('.summaryBody').html());
            //doc.save('QuizResult.pdf');

            var doc = new jsPDF('p', 'pt', 'a4', true);
            doc.fromHTML($('.summaryBody').html(), 15, 15, {
                'width': 1200,
                orientation: 'landscape'
            }, function (dispose) {
                doc.save('QuizResult.pdf');
            });
        }

        //function ExportToEXCEL() {
        //    let file = new Blob([$('.summaryBody').html()], { type: "application/vnd.ms-excel" });
        //    let url = URL.createObjectURL(file);
        //    let a = $("<a />", {
        //        href: url,
        //        download: "QuizResult.xls"
        //    }).appendTo("body").get(0).click();
        //}

    </script>


    <script type="text/javascript" src="RateAssign.js"></script>


</asp:Content>
