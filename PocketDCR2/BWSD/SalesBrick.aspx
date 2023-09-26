<%@ Page Title="Sales Brick Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="SalesBrick.aspx.cs" Inherits="PocketDCR2.Form.SalesBrick" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.12.1.js"  type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
  <%--  <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>--%>
    <%--<link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />--%>
   
      <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>

       <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
      <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="SalesBrick.js" type="text/javascript"></script>
      <style type="text/css">
           .loading
        {
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

        .column-options {
            border-collapse: collapse;
            border-bottom: 1px solid #d6d6d6;
        }

          .column-options th, .column-options td {
                font-family: Helvetica, Arial, sans-serif;
                font-size: 90%;
                font-weight: normal;
                color: #434343;
                background-color: #f7f7f7;
                border-left: 1px solid #ffffff;
                border-right: 1px solid #dcdcdc;
            }
           .column-options th {
                font-size: 100%;
                font-weight: normal;
               /* letter-spacing: 0.12em;*/
                text-shadow: -1px -1px 1px #999;
                color: #fff;
                background-color: #2484C6;
                padding: 12px 23px 15px 8px;
                border-bottom: 1px solid #d6d6d6;
            }

            
              
          
            .column-options td {
                text-shadow: 1px 1px 0 #fff;
                padding: 4px 20px 4px 20px;
            }

            .column-options .odd td {
                background-color: #ededed;
            }


            .column-options th:first-child {
                border-top-left-radius: 7px;
                -moz-border-radius-topleft: 7px;
            }

            .column-options th:last-child {
                border-top-right-radius: 7px;
                -moz-border-radius-topright: 7px;
            }

            .column-options th:last-child, .column-options td:last-child {
                border-right: 0px;
            }
              .back {
             position: fixed;
            top: 0;
            left: 0;
            bottom:0;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            z-index:9999;
        }
         </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="pop_box-outer back" id="dialog" >
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate><%--OnClick="btnRefresh_Click"--%>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" 
                    Style="display: none;" />
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
             
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Brick Setup</h1>
                </div>
                <div class="wrapper-inner">
                    <div style="float: left; ">
                        <div class="ghierarchy2">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>View All</h2>
                            </div>
                            <div class="inner-left">
                                <div id="Salebrick">
                                    </div>
                          
                            </div>
                      
                            
                              </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="wrapper-inner-right">
                        <div class="designation">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>Add New Brick</h2>
                            </div>
                            <div class="designation-inner">
                                <div id="content-table-inner">
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                        <tr valign="top">
                                            <td>
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                        <tr>
                                                        <th valign="top">
                                                            Region :
                                                        </th>
                                                        <td>
                                                            <select id="ddl1" name="ddl1" class="styledselect_form_1" style="display: inline-block;">
                                                                <option value="-1"> Select Region</option>
                                                                </select>
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>

                                                      <tr>
                                                        <th valign="top">
                                                            Sub Region :
                                                        </th>
                                                        <td>
                                                            <select id="ddl2" name="ddl2" class="styledselect_form_1" style="display: inline-block;">
                                                                <option value="-1"> Select Sub Region</option>
                                                                </select>
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>

                                                      <tr>
                                                        <th valign="top">
                                                            District :
                                                        </th>
                                                        <td>
                                                           <select id="ddl3" name="ddl3" class="styledselect_form_1" style="display: inline-block;">
                                                                <option value="-1"> Select District</option>
                                                                </select>
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>

                                                      <tr>
                                                        <th valign="top">
                                                            City :
                                                        </th>
                                                        <td>
                                                              <select id="ddl4" name="ddl4" class="styledselect_form_1" style="display: inline-block;">
                                                                <option value="-1"> Select City</option>
                                                                </select>
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>
                                                      <tr>
                                                        <th valign="top">
                                                            Distributor :
                                                        </th>
                                                        <td>
                                                              <select id="ddl5" name="ddl4" class="styledselect_form_1" style="display: inline-block;">
                                                                <option value="-1"> Select Distributor</option>
                                                                </select>
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th valign="top">
                                                            Brick Code :
                                                        </th>
                                                        <td>
                                                            <input id="txtCode" name="txtCode" maxlength="100" class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">
                                                            Brick Name :
                                                        </th>
                                                        <td>
                                                            <input id="txtName" name="txtName" maxlength="100" class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                    </tr>
                                                
                                                      <tr>
                                                        <th valign="top">
                                                            Status :
                                                        </th>
                                                        <td align="left">
                                                            <input id="chkActive" name="chkActive" type="checkbox" value="Active" checked="checked" />
                                                        </td>
                                                    </tr>
                                                   
                                                </table>
                                                <!-- end id-form  -->
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="clear">
                                    </div>
                                </div>
                                <div class="designation-bg-right">
                                </div>
                                <div class="designation-bg-left">
                                </div>
                                <div class="inner-bottom">
                                    <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                    &nbsp;&nbsp;
                                    <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <!--  start content-table-inner -->
                <!--  end content-table-inner  -->
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>