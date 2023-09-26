<%@ Page Title="Distributor Wise File Structure" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DistFileStructure.aspx.cs" Inherits="PocketDCR2.BWSD.DistFileStructure" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

   
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link href="../Form/assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <link rel="stylesheet" href="../Form/assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">
        #container {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
        }

        thead {
            background:#3a78b7;
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
                    Are you sure to delete this record(s)?
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnDeleteYes" name="btnDeleteYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnDeleteNo" name="btnDeleteNo" type="button" value="No" />
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

    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />

    <div id="divGradingModal" class="jqmConfirmation" style="width: 400px; left: 55%; top: 25%;">
        <div class="jqmTitle">
            Quiz Grading
        </div>
        <br />
        <div id="DivGrading">
            <div class="row text-center gradeField1">
                <div class="col-md-5" style="margin-left: 13px;">
                    <input type="text" class="form-control validateGrade gradeValue" placeholder="Grade" />
                </div>
                <div class="col-md-6">
                    <input type="number" class="form-control validateGrade scoreValue" placeholder="Min Score" />
                </div>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-md-6" style="margin-left: 15px;">
                <button type="button" class="btn btn-sm btn-success btnAppendGradeField" onclick="AppendDivGrading()" data-toggle="tooltip" title="Add More Field"><i class="fa fa-plus"></i></button>
                <button type="button" class="btn btn-sm btn-danger btnRemoveGradeField" onclick="RemoveDivGrading()" data-toggle="tooltip" title="Remove Field" style="display: none;"><i class="fa fa-minus"></i></button>
            </div>
            <div class="col-md-5 text-right">
                <button type="button" id="btnSaveGrading" name="btnSaveGrading" value="Save">Save</button>
                <button type="button" id="btnUpdateGrading" name="btnUpdateGrading" value="Update" style="display: none;">Update</button>
                <button type="button" id="btnCancelGrading" name="btnCancelGrading" value="Cancel">Cancel</button>
            </div>
        </div>

    </div>



    <div class="container" id="MasterFormFields">
        <div class="page_heading row">
            <h1>Distributor File Structure</h1>
        </div>

           <div class="container">
         
            <div class="row" id="DistList">
            </div>
        </div>


   <%--    <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label for="frmName">Distributor Name: <span class="red"></span></label>
                   
                     <asp:DropDownList ID="ddlDistributor" class="form-control"  name="ddlDistributor" runat="server" ClientIDMode="Static"  DataSourceID="dsDistributor" DataTextField="Distributor" DataValueField="ID"></asp:DropDownList>
                      <asp:SqlDataSource runat="server" ID="dsDistributor" ConnectionString='<%$ ConnectionStrings:PocketDCRConnectionString %>' 
                        SelectCommand="Select '-1' Id, 'Select A Distributor' Distributor UNION Select   ID ,DistributorName Distributor from tbl_SalesDistributor where isactive=1" ></asp:SqlDataSource>
                   
                </div>
            </div>
        </div>
        
        
      
        <div class="row">    
            <div class="col-md-3" id="divFile">
                <div class="form-group">
                    <label for="ddlFile">Select File</label>
                    <select class="form-control" id="ddlFile" name="ddlFile">
                        <option value="">Select</option>
                        <option value="STOCK">STOCK</option>
                        <option value="INV">INVOICE</option>
                        <option value="CUST">CUSTOMER</option>
                    </select>
                </div>
            </div>  
 
         
        </div>--%>
     <%--
        <br />

        <div class="row">
            <div class="col-md-4">
                <button type="button" class="btn btnPrimary" id="btnSaveQuiz"><i class="fa fa-check"></i>&nbsp;&nbsp;Submit</button>
                <button type="button" class="btn btnUpdate" id="btnUpdateQuiz" style="display: none;"><i class="fa fa-check"></i>&nbsp;&nbsp;Update</button>
                <button type="button" class="btn btn-default" id="btnClearQuiz"><i class="fa fa-times"></i>&nbsp;&nbsp;Reset</button>
            </div>
        </div>--%>

        <br />

     
    </div>




    <script type="text/javascript" src="../Form/assets_new/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="../Form/assets_new/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/responsive.bootstrap.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/additional-methods.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="../Form/assets_new/jquery-ui.js"></script>

    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>

    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>


    <script type="text/javascript" src="DistFileStructure.js"></script>

</asp:Content>
