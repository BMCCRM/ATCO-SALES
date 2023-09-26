<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="MasterModules.aspx.cs" Inherits="PocketDCR2.Form.MasterModules" %>



<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>

    <script src="../Scripts/json-minified.js" type="text/javascript"></script>





</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="page_heading">
        <h1>
            <img alt="" src="../Images/Icon/Product Form.png" />
            Module</h1>
        
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click"
                        Style="display: none;" />
        <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
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
                    <div class="divColumn">
                        <div>
                            <input id="btnYes" name="btnYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnNo" name="btnNo" type="button" value="No" />
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

    <div>
        <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
    </div>


    <div class="wrapper-inner">
        <div style="float: left;">
            <div class="ghierarchy2">
                <div class="inner-head">
                    <h2>
                        <span class="spacer">&nbsp;</span>View All</h2>
                </div>
                <div class="inner-left">
                    <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                        AllowAddingRecords="false" FolderStyle="../Styles/GridCss" OnRowDataBound="Grid1_RowDataBound" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="100" DataField="ID" HeaderText="ID" SortExpression="ID"
                                Visible="false" />
                            <obout:Column Width="300" DataField="ModuleName" HeaderText="Modules" SortExpression="ModuleName" />
                            <obout:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </obout:Column>
                            <obout:Column Width="150" AllowDelete="true" />
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <GroupingSettings AllowChanges="false" />
                        <Templates>
                            <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL"> Edit</asp:LinkButton>
                                </Template>
                            </obout:GridTemplate>
                        </Templates>
                    </obout:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="SELECT [ID], [ModuleName] FROM [tbl_ModulesMaster] ORDER BY [ModuleName]"></asp:SqlDataSource>
                </div>

            </div>

            <div class="wrapper-inner-right">
                <div class="designation">
                    <div class="inner-head">
                        <h2>
                            <span class="spacer">&nbsp;</span>Add New Module</h2>
                    </div>
                    <div class="designation-inner">

                        <form>
                            <div class="form-group">
                                <label class="control-label col-sm-2">Module :</label>
                                <input id="txtModuleName" name="txtModuleName" type="text" maxlength="100" class="inp-form" />
                                <span class="red">* </span>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <div class="checkbox" style="padding-top: 10px;">
                                        <label class="control-label col-sm-2">Active :</label>

                                        <input id="chkActive" name="chkActive" type="checkbox" checked="checked" />
                                    </div>
                                </div>
                            </div>
                            <div class="inner-bottom" style="padding: 20px;">
                                <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />&nbsp;&nbsp;
                         <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                            </div>

                        </form>
                        <%-- <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                    <tr>
                        <th valign="top">Module :
                        </th>
                        <td>
                            <input id="txtModuleName" name="txtModuleName" type="text" maxlength="100" class="inp-form" />
                            <span class="red">* </span>
                        </td>
                        <td></td>
                    </tr>
                </table>--%>
                        <div class="designation-bg-right">
                        </div>
                        <div class="designation-bg-left">
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            var $2 = jQuery.noConflict();
        </script>


        <script src="MasterModules.js" type="text/javascript"></script>
</asp:Content>
