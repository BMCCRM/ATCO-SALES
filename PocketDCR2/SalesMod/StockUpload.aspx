<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="StockUpload.aspx.cs" Inherits="PocketDCR2.SalesMod.StockUpload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <%-- <script type="text/javascript" src="../Schedular/jquery/jquery-1.7.1.min.js"></script>--%>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="../assets/Sweetalert/sweetalert2.css" rel="stylesheet" />
    <script src="../assets/js/jquery3.1.0.js" type="text/javascript"></script>

    <link href="../Form/assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="../Form/assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>

    <link href="../assets/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />

    <script src="../assets/js/bootstrap-datepicker.min.js"></script>

    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' type='text/css' href='../Styles/LayOut.print.css' media='print' />
    <script src="StockUpload.js"></script>







</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container">

 
        
            <div class="wrapper-inner" id="id-form1">
            <div class="wrapper-inner-left">
                <div class="ghierarchy bottom">
                    <div class="inner-head">
                        <h2>Stock Excel Data Upload</h2>
                    </div>
                  
                    <table border="0" width="100%" cellpadding="0" cellspacing="0">

                        <tr>
                            <td style="padding-left: 10px;">
                                <label>Select Month &nbsp;</label>
                                <input type="text" id="txtdate4" name="txtdate4" placeholder="Enter Month" />
                            </td>

                            <td>
                                <input type="file" name="excelfile_upload" id="excelfile_upload" value="txt file upload" accept=".xls,.xlsx" onchange="ExcelUpload()" />
                            </td>

                        </tr>

                    </table>
                </div>




            </div>
        </div>

    </div>
        


    










</asp:Content>
