<%@ Page Title="TradeActivityFLM" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="TradeActivityFLM.aspx.cs" Inherits="PocketDCR2.Form.TradeActivityFLM1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="TradeActivityFLM.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" 
                    Style="display: none;" />
                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
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
                                        <input id="btnYes" name="btnYes" type="button" value="Yes" /></div>
                                </div>
                                <div class="divColumn">
                                    <div>
                                        <input id="btnNo" name="btnNo" type="button" value="No" /></div>
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
                                <br /><br />
                                <input id="btnOk" name="btnOk" type="button" value="OK" /></div>
                        </div>
                    </div>
                </div>

                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Trade Activity</h1>
                </div>
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div class="wrapper-inner">
                    <div style="float: left">
                        <div class="ghierarchy2">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>View All</h2>
                            </div>
                             <div class="inner-left">
                            <div id="GridTradeActivityFLM">
                                </div>
                               </div> 
                        <%--    <div class="inner-left">
                                <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                                    DataSourceID="SqlDataSource1" AllowFiltering="true" AllowSorting="true" AllowPaging="true"
                                    AllowAddingRecords="false" AllowPageSizeSelection="false" FolderStyle="../Styles/GridCss"
                                    OnRowDataBound="Grid1_RowDataBound">
                                    <Columns>
                                        <obout:Column Width="35" DataField="ClassId" HeaderText="ClassId" SortExpression="ClassId"
                                            Visible="false" />
                                        <obout:Column Width="125" DataField="ClassName" HeaderText="Class" SortExpression="ClassName" />
                                        <obout:Column Width="100" DataField="ClassFrequency" HeaderText="Frequency" SortExpression="ClassFrequency" />
                                        <obout:Column ID="colEdit" runat="server" Width="75">
                                            <TemplateSettings TemplateId="EditedTemplate" />
                                        </obout:Column>
                                        <obout:Column Width="100" AllowDelete="true" />
                                    </Columns>
                                    <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                                    <GroupingSettings AllowChanges="false" />
                                    <Templates>
                                        <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                            <Template>
                                                <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL">Edit</asp:LinkButton>
                                            </Template>
                                        </obout:GridTemplate>
                                    </Templates>
                                </obout:Grid>
                                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                    SelectCommand="SELECT [ClassId], [ClassName], [ClassFrequency] FROM [DoctorClasses] ORDER BY [ClassName]">
                                </asp:SqlDataSource>
                            </div>--%>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="wrapper-inner-right">
                        <div class="designation">
                            <div class="inner-head">
                                <h2>
                                    <span class="spacer">&nbsp;</span>Add New Trade Activity FLM</h2>
                            </div>
                            <div class="designation-inner">
                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                    <tr>
                                        <th valign="top">
                                           Trade Activity FLM :
                                        </th>
                                        <td>
                                            <input id="txtTradeActivityFLM" name="txtTradeActivityFLM" maxlength="100" class="inp-form" />
                                            <span class="red">* </span>
                                        </td>
                                    </tr>
                                    
                                </table>
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
                <div class="clear">
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>
