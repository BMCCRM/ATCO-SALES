<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="CallReasons.aspx.cs" Inherits="PocketDCR2.Form.CallReasons" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>

    <script src="CallReasons.js" type="text/javascript"></script>
    <style>
        tr:nth-child(odd) {
            background-color: #efede2;
        }

        tr:nth-child(even) {
            background-color: #f6f5f0;
        }

        .ob_gC_Fc {
            background-image: url("header.gif");
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 33px;
            text-align: left;
        }

        .ob_gAL {
            color: #d99e00;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: bold;
            text-decoration: none;
        }

        .ob_text {
            color: #5e5e70;
            font-family: "Calibri",Verdana;
            font-size: 12px;
            font-weight: normal;
            height: 24px;
            text-align: left;
            vertical-align: middle;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <Triggers>
        </Triggers>
        <ContentTemplate>
            <div class="page_heading">
                <h1>
                    <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                    Reasons Of Calls</h1>
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
            <div class="divgrid">
            </div>
            <div class="wrapper-inner">
                <div style="float: left">
                    <div class="ghierarchy2">
                        <div class="inner-head">
                            <h2>
                                <span class="spacer">&nbsp;</span>View All</h2>
                        </div>
                        <div class="inner-left">
                            <div id="divGrid1">
                            </div>
                            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                SelectCommand="SELECT [ReasonId], [Reason] FROM	ReasonsofCalls ORDER BY ReasonId"></asp:SqlDataSource>
                        </div>
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="wrapper-inner-right">
                    <div class="designation">
                        <div class="inner-head">
                            <h2>
                                <span class="spacer">&nbsp;</span>Add New Reason</h2>
                        </div>
                        <div class="designation-inner">
                            <table border="0" cellpadding="0" cellspacing="0" id="id-form">
                                <tr>
                                    <th valign="top">Reason :
                                    </th>
                                    <td>
                                        <input id="txtName" name="txtName" maxlength="100" class="inp-form" />
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
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
