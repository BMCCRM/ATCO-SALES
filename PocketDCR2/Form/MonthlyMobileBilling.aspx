<%@ Page Title="Monthly Billing" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="MonthlyMobileBilling.aspx.cs" Inherits="PocketDCR2.Form.MonthlyMobileBilling" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>

    <script type="text/javascript" src="MonthlyMobileBilling.js"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>


    </script>

     <style type="text/css">
        td.ajax__combobox_textboxcontainer
        {
            padding-bottom: 2px\9 !important;
        }
        .ajax__combobox_inputcontainer
        {
            top: -7px\9 !important;
        }
        #uploadify {
            /*background: #FFFFFF;*/
            border-radius: 5px;
        }

        #uploadify:hover {
            /*background: #FFFFFF;*/
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

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <div class="page_heading">
            <h1>
                <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                Monthly Mobile Bill</h1>
            
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            
            <ContentTemplate>
           <div class="outerBox" style="height: 920px; width: 1520px;">
                    <div class="box-shadow-left">
                        <img src="../Images/Form/side_shadowleft.jpg" />
                    </div>
                    <div class="box-shadow-right">
                        <img src="../Images/Form/side_shadowright.jpg" />
                    </div>
                    <div id="box" align="center" style="width: 1150px; z-index: 0;">
                        
                        <div class="clear">
                        </div>
                        <div id="DivforData">
                            <div class="inner-head">
                                <h2>Monthly Bill Data</h2>
                            </div>
                            <div id="TableDiv"><div class="innerBox">
                            <div class="wrapper-inner" id="id-form">
                                <div class="wrapper-inner-left">
                                    <div class="ghierarchy bottom">
                                        <div class="inner-head">
                                            <h2>Montly Bill Data Upload</h2>
                                        </div>
                                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <table border="0" cellpadding="10" cellspacing="0" id="id-" style="font-weight: bold">
                                                    <tr>
                                                        <td>Month - Year :
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtDate" ReadOnly="true" ClientIDMode="Static"  runat="server"
                                                                CssClass="inp-form" />
                                                        

                                                            <asp:CalendarExtender ID="cTextDate" Enabled="True" OnClientShowing="CurrentDateShowing" Format="MMMM-yyyy" TargetControlID="txtDate" OnClientHidden="onCalendarHidden"  OnClientShown="onCalendarShown" BehaviorID="calendar1"
                                                                     PopupButtonID="txtDate" runat="server">
                                                            </asp:CalendarExtender>
                                                           
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <tr>
                                                <td style="margin: 0 60px;">
                                                    <div id="uploadify" style="position: relative;">
                                                        <div id="uploadify_button1" class="customdown">
                                                            <span class="uploadify-button-text" style="height: 50px;">UPLOAD FILE</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div class="clear_with_height">
                                    </div>

                                </div>
                            </div>
                            <div class="clear">
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