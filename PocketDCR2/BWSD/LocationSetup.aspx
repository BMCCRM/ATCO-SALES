<%@ Page Title="Geo Scheme Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="LocationSetup.aspx.cs" Inherits="PocketDCR2.Form.LocationSetup" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="LocationSetupJs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                 <input id="hdnMode" type="hidden" value="dataAddMode"/>
                <input id="hdnIdForEditDelete" type="hidden" value="0"/>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/Hierarchy.png" />
                        Geo Scheme  Setup</h1>
                    <asp:HiddenField ID="hdnHierarchyLevel" runat="server" Value="Select" ClientIDMode="Static" />
                    <%--<asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />--%>
                </div>
                <%--table for HierarchyLevel--%>
                <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                    <tr>
                        <th rowspan="3" class="sized">
                            <img src="../images/form/side_shadowleft.jpg" width="20" height="100" alt="" />
                        </th>
                        <th class="topleft"></th>
                        <td id="tbl-border-top">&nbsp;
                        </td>
                        <th class="topright"></th>
                        <th rowspan="3" class="sized">
                            <img src="../Images/Form/side_shadowright.jpg" width="20" height="100" alt="" />
                        </th>
                    </tr>
                    <tr>
                        <td id="tbl-border-left"></td>
                        <td>
                            <!--  start content-table-inner -->
                            <div id="content-table-inner">
                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <!-- start id-form -->
                                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                                <tr>
                                                    <th valign="middle">Filter By Location Hierarchy : &nbsp;
                                                    </th>
                                                    <td>
                                                        <select id="ddlLocationHierarchyLevel" name="ddlLocationHierarchyLevel" class="styledselect_form_1">
                                                             <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl1" runat="server" ClientIDMode="Static" Text="Region : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl2" runat="server" ClientIDMode="Static" Text="Sub Region : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl3" runat="server" ClientIDMode="Static" Text="District : " Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>
                                                    <td>&nbsp;&nbsp;
                                                        <asp:Label ID="lbl4" runat="server" ClientIDMode="Static" Text="Cities : "
                                                            Font-Bold="true" />
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                            <option value="-1">Select...</option>
                                                        </select>
                                                    </td>                                                    
                                                </tr>
                                            </table>
                                            <!-- end id-form  -->
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <div id="divTable" style="float: left; width: 98%; padding-top: 10px;">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                        </td>
                                        <td></td>
                                    </tr>
                                </table>
                                <div class="clear">
                                </div>
                            </div>
                            <!--  end content-table-inner  -->
                        </td>
                        <td id="tbl-border-right"></td>
                    </tr>
                    <tr>
                        <th class="sized bottomleft"></th>
                        <td id="tbl-border-bottom">&nbsp;
                        </td>
                        <th class="sized bottomright"></th>
                    </tr>
                </table>
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
                                <div class="divColumn">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                    </div>
                                    <div>
                                        <input id="btnYes" type="button" value="Yes" /></div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                    </div>
                                    <div>
                                        <input id="btnNo" type="button" value="No" /></div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                  <div id="divGrid" class="popup_box">
                    <%--class="jqmWindow popup_box"--%>
                    <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table">
                        <tr>
                            <th rowspan="3" class="sized">
                                <img src="../images/form/side_shadowleft.jpg" width="20" height="250" alt="" />
                            </th>
                            <th class="topleft">
                            </th>
                            <td id="tbl-border-top">
                                &nbsp;
                            </td>
                            <th class="topright">
                            </th>
                            <th rowspan="3" class="sized">
                                <img src="../Images/Form/side_shadowright.jpg" width="20" height="250" alt="" />
                            </th>
                        </tr>
                        <tr>
                            <td id="tbl-border-left">
                            </td>
                            <td>
                                <!--  start content-table-inner -->
                                <div id="content-table-inner">
                                    <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                        <tr valign="top">
                                            <td>
                                                <!-- start id-form -->
                                                <table border="0" cellpadding="0" cellspacing="0" id="id-form" class="tblForInserLocation">
                                                   
                                                      

                                                    <tr>
                                                        <th valign="top">
                                                            <span id="lblLevelName">Level Name : </span>
                                                        </th>
                                                        <td>
                                                            <input id="txtLevelName" name="txtLevelName" type="text" maxlength="100" class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">
                                                            <span id="lblLevelDescription">Level Description :</span>
                                                        </th>
                                                        <td>
                                                            <input id="txtLevelDescription" name="txtLevelDescription" type="text" maxlength="200"
                                                                class="inp-form" />
                                                            <span class="red">* </span>
                                                        </td>
                                                        <td>
                                                        </td>
                                                    </tr>   
                                                    
                                                    
                                                    <tr id="trMso"> 
                                                         
                                                         <th valign="top">
                                                             <br />
                                                             <div>
                                                         <h3 style="color:#000000 !important; font-size:15px; margin-bottom:10px"> CNG Days</h3>
                                                           </div>  
                                                           
                                                                  <span id="lbltxtMso">Mso :</span>
                                                        </th>
                                                        <td>
                                                            <br /><br /><br /><br />
                                                            <input id="txtMso" name="txtMso" type="text" maxlength="200"
                                                                class="inp-form" />
                                                           
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr>  



                                                    <tr id="trAreaManager"> 
                                                         <th valign="top">
                                                            <span id="lblAreaManager">Area Manager :</span>
                                                        </th>
                                                        <td>
                                                            <input id="txAreaManager" name="txtAreaManager" type="text" maxlength="200"
                                                                class="inp-form" />
                                                            
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr> 


                                                    <tr id="trSalesManager"> 
                                                         <th valign="top">
                                                            <span id="lblSalesManager">Sales Manager :</span>
                                                        </th>
                                                        <td>
                                                            <input id="txtSalesManager" name="txtSalesManager" type="text" maxlength="200"
                                                                class="inp-form" />
                                                            
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr> 

                                                    <tr id="trRTL"> 
                                                         <th valign="top">
                                                            <span id="lblRTL">RTL :</span>
                                                        </th>
                                                        <td>
                                                            <input id="txtRTL" name="txtRTL" type="text" maxlength="200"
                                                                class="inp-form" />
                                                            
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr> 

                                                    <tr id="trCityNDDCODE"> 
                                                         <th valign="top">
                                                            <span id="lblCityNDDCODE">City NDD Code :</span>
                                                        </th>
                                                        <td>
                                                            <input id="txtCityNDDCODE" name="txtCityNDDCODE" type="text" maxlength="200"
                                                                class="inp-form" />
                                                           
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr> 



                                                    <tr id="trIsBigCityAllow"> 
                                                         <th valign="top">
                                                            <span id="lblIsBigCityAllow">Big City:</span>
                                                        </th>
                                                        <td>
                                                            <input id="txtIsBigCityAllow" name="txtIsBigCityAllow" type="checkbox"  />                                                         
                                                        </td>
                                                        <td>
                                                        </td>                                                    
                                                     </tr> 

                                                   
                                                                                                  
                                                    <tr>
                                                        <th>
                                                            &nbsp;
                                                        </th>
                                                        <td valign="top">
                                                            <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                                            <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                                        </td>
                                                        <td>
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
                                <!--  end content-table-inner  -->
                            </td>
                            <td id="tbl-border-right">
                            </td>
                        </tr>
                        <tr>
                            <th class="sized bottomleft">
                            </th>
                            <td id="tbl-border-bottom">
                                &nbsp;
                            </td>
                            <th class="sized bottomright">
                            </th>
                        </tr>
                    </table>
                </div>

                
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

</asp:Content>
