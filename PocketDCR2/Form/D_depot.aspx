<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="D_depot.aspx.cs" Inherits="PocketDCR2.Form.D_depot" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="D_depot.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/JavaScript">

        curvyCorners.addEvent(window, 'load', initCorners);

        function initCorners() {
            var settings = {
                tl: { radius: 10 },
                tr: { radius: 10 },
                bl: { radius: 10 },
                br: { radius: 10 },
                antiAlias: true
            }
            curvyCorners(settings, "#box");
        }


        $(document).ready(function () {
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
        });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Depot Setup</h1>
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="hdnRec" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="empid" runat="server" ClientIDMode="Static" />
                    <asp:Button ID="btnRefresh" runat="server" ClientIDMode="Static" Text="Button" Visible="False" />
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
                                    <br />
                                    <br />
                                    <input id="btnOk" name="btnOk" type="button" value="OK" /></div>
                            </div>
                        </div>
                    </div>
                    <asp:HiddenField ID="ShowErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:HiddenField ID="HideErrorAlert" runat="server" ClientIDMode="Static" />
                    <asp:ModalPopupExtender ID="mpError" runat="server" CancelControlID="HideErrorAlert"
                        ClientIDMode="Static" TargetControlID="ShowErrorAlert" BackgroundCssClass=""
                        PopupControlID="pnlShowErrorAlert" />
                    <asp:Panel ID="pnlShowErrorAlert" runat="server" Style="display: none;" ClientIDMode="Static">
                        <div class="back-bgr">
                            <div class="email-pop">
                                <div class="email-title">
                                    Confirmation Window
                                </div>
                                <div class="jqmmsg">
                                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                                    <asp:Label ID="laberror" runat="server" Text=""></asp:Label>
                                    <br />
                                    <br />
                                    <asp:Button ID="btnClose" runat="server" Text="OK" CausesValidation="false" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                    </asp:Panel>
                </div>
                <div class="divgrid">
                    <cc1:Grid ID="Grid1" runat="server" AllowAddingRecords="False" AutoGenerateColumns="False"
                        FolderStyle="../Styles/GridCss" OnRowDataBound="Grid1_RowDataBound">
                        <Columns>
                            <cc1:Column HeaderText="" DataField="Rec_No" Index="0" Visible="false">
                            </cc1:Column>
                            <cc1:Column HeaderText="Depot Name" DataField="Depotname" Index="1">
                            </cc1:Column>
                            <cc1:Column HeaderText="Manager Name" DataField="Managername" Index="2">
                            </cc1:Column>
                            <cc1:Column HeaderText="Mobile No" DataField="Mobileno" Index="3">
                            </cc1:Column>
                            <cc1:Column HeaderText="email id" DataField="Email" Index="4">
                            </cc1:Column>
                            <cc1:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </cc1:Column>
                            <cc1:Column ID="ColDel" runat="server" Width="75">
                                <TemplateSettings TemplateId="DelTemplate" />
                            </cc1:Column>
                            <%--<cc1:Column Width="100" AllowDelete="true" />--%>
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <Templates>
                            <cc1:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL"> Edit</asp:LinkButton>
                                </Template>
                            </cc1:GridTemplate>
                            <cc1:GridTemplate ID="DelTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton2" runat="server" class="ob_gAL">Delete</asp:LinkButton>
                                </Template>
                            </cc1:GridTemplate>
                        </Templates>
                    </cc1:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="SELECT  dp.Rec_No,dp.[Depotname],dp.[Managername],dp.[Address],dp.[Email],dp.[Faxeno],dp.[Mobileno],dp.[Phoneno],dp.[Description] ,dp.[IsActive] From  [dbo].[tbl_Depot] as dp">
                    </asp:SqlDataSource>
                </div>
                <div class="outerBox">
                    <div class="box-shadow-left">
                        <img src="../Images/Form/side_shadowleft.jpg" />
                    </div>
                    <div class="box-shadow-right">
                        <img src="../Images/Form/side_shadowright.jpg" />
                    </div>
                    <div id="box" align="center">
                        <div class="innerBox">
                            <div class="wrapper-inner" id="id-form">
                                <div class="wrapper-inner-right">
                                    <div class="persoanl-data">
                                        <div class="inner-head">
                                            <h2>
                                                Depot Data
                                            </h2>
                                        </div>
                                        <div class="inner-left">
                                            <table class="style1">
                                                <tr>
                                                    <th>
                                                        Depot Name :
                                                        <th>
                                                            <asp:TextBox ID="txtName" runat="server" ClientIDMode="Static" MaxLength="50" class="inp-form"></asp:TextBox>
                                                            <span class="red">* </span>
                                                            <%-- <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtName"
                                                    ErrorMessage="Please Enter Only Numbers" ValidationExpression="^[a-zA-Z]"></asp:RegularExpressionValidator>--%>
                                                        </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Manager Name :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtMname" ClientIDMode="Static" runat="server" name="txtMname" class="inp-form"
                                                            MaxLength="50"></asp:TextBox>
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        email :
                                                    </th>
                                                    <th class="style3">
                                                        <asp:TextBox ID="txtemail" ClientIDMode="Static" runat="server" class="inp-form"></asp:TextBox>
                                                        <asp:RegularExpressionValidator ID="regexEmailValid" runat="server" ValidationExpression="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
                                                            ControlToValidate="txtemail" ErrorMessage="Invalid Email Format"></asp:RegularExpressionValidator>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Mobile NO :
                                                    </th>
                                                    <th>
                                                        <%-- <input id="" name="txtMobile" maxlength="100" class="inp-form" />--%>
                                                        <asp:TextBox ID="txtMobile" runat="server" ClientIDMode="Static" class="inp-form"></asp:TextBox>
                                                        <asp:MaskedEditExtender ID="MaskedEditExtender1" runat="server" ClientIDMode="Static"
                                                            Mask="(99) 999-999-9999" TargetControlID="txtMobile">
                                                        </asp:MaskedEditExtender>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Phone NO :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtPhone" runat="server" ClientIDMode="Static" class="inp-form"></asp:TextBox>
                                                        <asp:MaskedEditExtender ID="MaskedEditExtender3" runat="server" ClientIDMode="Static"
                                                            Mask="(99) 999-999-9999" TargetControlID="txtPhone">
                                                        </asp:MaskedEditExtender>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Fax NO :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtFaxNo" runat="server" ClientIDMode="Static" class="inp-form"></asp:TextBox>
                                                        <asp:MaskedEditExtender ID="MaskedEditExtender2" runat="server" ClientIDMode="Static"
                                                            Mask="(99) 999-999-9999" TargetControlID="txtFaxNo">
                                                        </asp:MaskedEditExtender>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Address :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtAddress" runat="server" ClientIDMode="Static" class="inp-form"></asp:TextBox>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Description :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtDesctiption" runat="server" class="inp-form" ClientIDMode="Static"></asp:TextBox>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Login ID :
                                                    </th>
                                                    <th>
                                                        <asp:TextBox ID="txtlogin" runat="server" name="txtlogin" class="inp-form" ClientIDMode="Static"></asp:TextBox>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Status :
                                                    </th>
                                                    <th>
                                                        <asp:CheckBox ID="CheckBox1" runat="server" Checked="True" ClientIDMode="Static" />
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>
                                        <div style="padding: 5px; color: red; float: left; font-size: 12px;">
                                        </div>
                                        <div class="inner-bottom">
                                            <asp:Button ID="btncancel" runat="server" Text="Cencel" class="form-reset" OnClick="btncancel_Click" />
                                            &nbsp;&nbsp;
                                            <asp:Button ID="btnsave" runat="server" Text="Save" OnClick="btnsave_Click" class="form-submit" />
                                        </div>
                                    </div>
                                    <div class="clear">
                                    </div>
                                </div>
                                <div class="clear">
                                </div>
                            </div>
                            <div class="clear">
                            </div>
                            <div id="divGrid" class="popup_box">
                            </div>
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>
