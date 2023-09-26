<%@ Page Title="Sales Dashboard Target Uploader" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesDashboardTargetUploader.aspx.cs" Inherits="PocketDCR2.Form.SalesDashboardTargetUploader" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />

        

    <script type="text/javascript">

        $new = $.noConflict();

    </script>
    <style>
        .loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  right :50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

body {
  background-color: #f1f1f1;
}


    </style>



        <style type="text/css">
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

        .left, .right {
            position: absolute;
            top: 125px;
        }

        .left {
            z-index: 1;
            left: 25px;
            width: 100%;
        }

        .right {
            left: 25px;
        }
             .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

            .upload-btn-wrapper input[type=file] {
                font-size: 100px;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }

        .pre-img {
            padding-left: 17px;
        }
        .btn {
            background-color: #fafafa;
            background-image: linear-gradient(to bottom, #fefefe, #f2f2f2);
            background-repeat: repeat-x;
            border: 1px solid #d5d5d5;
            -webkit-box-shadow: 0 1px 1px #ffffff inset, 0 1px 2px #000000;
            -webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
            -ms-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
            box-shadow: 0 1px 1px #ffffff inset, 0 1px 2px #000000;
            box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
            color: #555;
            display: inline-block;
            font-size: 11px;
            font-weight: bold;
            line-height: 13px;
            margin: 2px 0;
            padding: 8px 12px 7px;
            text-align: center;
            cursor: pointer;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div class="pop_box-outer jqmWindow" id="dialogProgress" style="display:none;">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <Triggers>
        </Triggers>
        <ContentTemplate>
            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                    Sales Target Uploader
                </h1>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" Style="display: none;" />
    
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
            </div>
           <div style="vertical-align: middle; text-align: center; padding: 5px;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
            </div>
            
                        <div id="content-table-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="fdform1">
                                <tr valign="top">
                                    <td valign="top">
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                            <tr>
                                                <th>
                                                    <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label7" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th class="Th112">
                                                    <asp:Label ID="Label13" name="Label13" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label8" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label11" name="Label11" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label12" name="Label12" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th valign="top" id="g1">
                                                    <select id="dG1" name="dG1" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g2">
                                                    <select id="dG2" name="dG2" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>

                                                <th valign="top" id="g3">
                                                    <select id="dG3" name="dG3" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" class="Th12" id="g7">
                                                    <select id="dG7" name="dG7" class="styledselect_form_1">
                                                        <option value="-1">Select Team</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g4">
                                                    <select id="dG4" name="dG4" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g5">
                                                    <select id="dG5" name="dG5" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g6">
                                                    <select id="dG6" name="dG6" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                            </tr>
                                        </table>
                                        <!-- end id-form  -->
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                    </td>
                                    <td></td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                <tr>
                                    <th valign="top" id="col1">
                                        <div class="divcol">
                                            <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col2">
                                        <div class="divcol">
                                            <asp:Label ID="Label2" name="Label2" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>

                                    <th valign="top" id="col3">
                                        <div class="divcol">
                                            <asp:Label ID="Label3" name="Label3" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="divcol Th112">
                                            <asp:Label ID="Label14" name="Label14" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col4">
                                        <div class="divcol">
                                            <asp:Label ID="Label4" name="Label4" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col5">
                                        <div class="divcol">
                                            <asp:Label ID="Label9" name="Label9" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col6">
                                        <div class="divcol">
                                            <asp:Label ID="Label10" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th valign="top" id="col11">
                                        <select id="ddl1" name="ddl1" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col22">
                                        <select id="ddl2" name="ddl2" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="col33">
                                        <select id="ddl3" name="ddl3" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" class="Th12" id="col77">
                                        <select id="ddlTeam" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="col44">
                                        <select id="ddl4" name="ddl4" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col55">
                                        <select id="ddl5" name="ddl5" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col66">
                                        <select id="ddl6" name="ddl6" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>
                            </table>

                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>
                                    <th valign="top" id="Th22" style="display:none">Brands</th>
                                    <th valign="top" id="Th23" style="display:none">Products</th>
                                    </tr>
                                <tr>
                                    <th  valign="top" id="Th2" style="display:none">
                                        <select id="ddlProduct" name="d2" class="styledselect_form_1"   multiple="multiple">
                                            <%-- <option value="-1">Select...</option>--%>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th4" style="display:none">
                                        <select id="ddlsku" name="sku" class="styledselect_form_1" multiple="multiple">
                                        </select>
                                    </th>
                                     <tr>
                                <td>
                                     <div class="upload-btn-wrapper">
                                        <button style="margin:5px 0 0 10px;">Uploader for Sales Target</button>
                                        <input type="file" name="myfile" id="inputFile" accept=".xls,.xlsx" />
                                    </div>
                                </td>
                                <td>
                                    <button type="button" id="btnDownload" style="margin:5px 0 0 10px;">Download Template</button>
                                </td>
                                <td>
                                    <button type="button" id="btnDownloadWithRemarks" style="margin:5px 0 0 10px;">Download Existing Data</button>
                                </td>
                            </tr>
                                </tr>
                            </table>

                            <div class="clear">
                            </div>
                        </div>

                       
            <div class="clear">
            </div>


            <div id="loader" class="loader"></div>


        </ContentTemplate>
    </asp:UpdatePanel>
    
    <script src="../Scripts/jqModal/jqmodal2.js" type="text/javascript"></script>
     <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>   
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="SalesDashboardTargerUploader.js"></script>     
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>


</asp:Content>
