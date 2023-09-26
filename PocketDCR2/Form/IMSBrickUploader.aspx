<%@ Page Title="IMS Brick Uploader" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="IMSBrickUploader.aspx.cs" Inherits="PocketDCR2.Form.IMSBrickUploader" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../themes/smoothness/jquery-ui-1.8.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />

    <script type="text/javascript" src="IMSBrickUploader.js"></script>

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

        .reportcl {
            width: 100%;
            height: 1500px;
        }

        .reportcl2 {
            width: 100%;
            height: 0px;
        }

        #uploadify {
            background: #FFFFFF;
            border-radius: 5px;
        }

            #uploadify:hover {
                background: #FFFFFF;
            }

            #uploadify object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
            }
    </style>


</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <%--progress while uploading--%>
    <div class="pop_box-outer jqmWindow" id="dialog">
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
                    IMS Brick Relation Data</h1>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" Style="display: none;" />

                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
            </div>

            <div style="vertical-align: middle; text-align: center; padding: 5px;">
                <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
            </div>


            <div class="wrapper-inner" id="id-form">
                <div class="wrapper-inner-left">
                    <div class="ghierarchy bottom">
                        <div class="inner-head">
                            <h2>IMS Brick Relation Data</h2>
                        </div>
                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div id="uploadifyDSR" style="position: relative;">
                                        <div id="uploadify_button2" class="customdown">
                                            <span class="uploadify-button-text" style="height: 50px;">UPLOAD FILE </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
            <div class="clear">
            </div>



        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
