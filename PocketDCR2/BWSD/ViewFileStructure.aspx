<%@ Page Title="Add File Structure" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="ViewFileStructure.aspx.cs" Inherits="PocketDCR2.BWSD.ViewFileStructure" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />

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
            background-color: #3da1fd;
            border-top: 1px solid #3da1fd;
            border-right: 1px solid #3da1fd;
            border-bottom: 1px solid #3da1fd;
            border-left: 1px solid #3da1fd;
            box-shadow: 2px 1px 2px #3da1fd;
            margin: 10px 5px 10px 5px;
        }

        .btnPrimary:hover, .btnPrimary:active, .btnPrimary:visited {
                color: #fff;
                position: relative;
                top: 1px;
                left: 1px;
                background-color: #3da1fd;
                border-top: 1px solid #3da1fd;
                border-right: 1px solid #3da1fd;
                border-bottom: 1px solid #3da1fd;
                border-left: 1px solid #3da1fd;
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
            background-color: #3da1fd;
            color: #FFFFFF;
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            text-align: center;
        }

        .jqmConfirmation {
            background-color: #EEEEEE;
            border: 10px solid #3da1fd;
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

    <div class="container">
  <h2  style="text-align:left" id="dname">Distributor: </h2>
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#divcust">Customer Column</a></li>
    <li><a data-toggle="tab" href="#divinv">Invoice Column</a></li>
    <li><a data-toggle="tab" href="#divstock">Stock Column</a></li>
  
  </ul>

  <div class="tab-content">
 
    <div id="divcust" class="tab-pane fade in active">
   
    </div>

    <div id="divinv" class="tab-pane fade">

    </div>

    
    <div id="divstock" class="tab-pane fade">

    </div>
   
  </div>
</div>

    <div class="container" id="MasterFormFields">
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


    <script type="text/javascript" src="ViewFileStructure.js"></script>

</asp:Content>
