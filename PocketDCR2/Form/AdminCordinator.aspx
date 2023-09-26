<%@ Page Title="Admin Coordinator" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="AdminCordinator.aspx.cs" Inherits="PocketDCR2.Form.AdminCordinator" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="AdminCordinator.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
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
            var height = $('#box').innerHeight();
            var height2 = height - 130 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
        });

    </script>
    <style>
        body {
            font-family: "Calibri", Verdana, Helvetica, sans-serif;
            font-size: 12px !important;
            margin: 0 !important;
            color: #000000 !important;
        }

        .page_heading {
            padding: 15px 0px 15px 20px;
        }

        body {
            margin: 0px !important;
            padding: 0px !important;
        }

        .deActiveEmployeeConfirmationTopConver {
            top: 0px;
            width: 100%;
            height: 100%;
            background: #000000;
            position: absolute;
            opacity: 0.9;
            z-index: 339;
            overflow: hidden;
        }

        .deActiveEmployeeConfirmation {
            width: 1010px;
            height: 400px;
            background: #fff;
            position: relative;
            z-index: 400;
            opacity: 1;
            margin: 50px auto;
            border-radius: 4px;
        }
        .professional-data{
            overflow:scroll;
        }
        /*button {
  background: #000;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px 30px;
  border-radius: 3px;	
}*/


        .btn {
            display: inline-block;
            padding: 9px 12px;
            padding-top: 7px;
            margin-bottom: 0;
            font-size: 14px;
            line-height: 20px;
            color: #5e5e5e;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            background-color: #d1dade;
            -webkit-border-radius: 3px;
            -webkit-border-radius: 3px;
            -webkit-border-radius: 3px;
            background-image: none !important;
            border: none;
            text-shadow: none;
            box-shadow: none;
            transition: all 0.12s linear 0s !important;
            font: 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;
        }

        .btn-cons {
            margin-right: 5px;
            min-width: 120px;
            margin-bottom: 8px;
        }

        .btn-default {
            color: #333;
            background-color: #fff;
            border-color: #ccc;
        }

        .btn-primary {
            color: #fff;
            background-color: #428bca;
            border-color: #357ebd;
        }

        .btn-success {
            color: #fff;
            background-color: #5cb85c;
            border-color: #4cae4c;
        }

        .btn-info {
            color: #fff;
            background-color: #5bc0de;
            border-color: #46b8da;
        }

        .btn-warning {
            color: #fff;
            background-color: #f0ad4e;
            border-color: #eea236;
        }

        .btn-danger {
            color: #fff;
            background-color: #d9534f;
            border-color: #d43f3a;
        }

        .btn-white {
            color: #5e5e5e;
            background-color: #fff;
            border: 1px solid #e5e9ec;
        }

        .btn-link, .btn-link:active, .btn-link[disabled], fieldset[disabled] .btn-link {
            background-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
        }

            .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {
                border-color: transparent;
            }

        .btn-link {
            color: #5e5e5e;
            background-color: transparent;
            border: none;
        }

            .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {
                border-color: transparent;
            }

        .btn-default, .btn-primary, .btn-success, .btn-info, .btn-warning, .btn-danger {
            text-shadow: 0 -1px 0 rgba(0,0,0,0.2);
            -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),0 1px 1px rgba(0,0,0,0.075);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),0 1px 1px rgba(0,0,0,0.075);
        }


        #overlay {
            position: fixed;
            height: 100%;
            width: 100%;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.8);
            display: none;
            z-index: 338;
        }

        #popup {
            max-width: 1000px;
            width: 100%;
            max-height: 200px;
            height: 80%;
            padding: 20px;
            position: relative;
            background: #fff;
            margin: 200px auto;
            border-radius: 4px;
            -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
        }

        #close {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: #000;
        }


        .RegModelHeader {
            border-bottom: 1px solid #ece6e6;
            padding-bottom: 10px;
        }

        .RegModelFooter {
            padding-top: 10px;
            height: 50px;
            position: absolute;
            bottom: 12px;
            width: 96%;
            border-top: 1px solid #ece6e6;
        }

        .BtnLeftPull {
            float: right;
        }
        #txtResignationDateDeactive {       
        height: 28px;
        width: 300px;
        border-radius: 4px;
        }
        .divgrid
        {
            overflow: scroll;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>



                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                        User Setup</h1>
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

                  <div id="overlay">
                    <div id="popup">
                        <div id="close">X</div>
                        <div class="RegModelHeader">
                            <h1>EmployeeName : <span id="DeActiveEmployeeName">(Ather Ali Khan) </span><span id="DeActiveEmployeeCode"></span></h1>
                            <h3 style="color:#5e5e5e">Are you sure to add resignation date of Employee?</h3>
                        </div>
                        <div class="RegModelContent">
                            <span style="display:inline-block;margin-top:30px; margin-bottom:20px; font-size:16px;"> Resignation Date :</span>
                            

                            <asp:TextBox ID="txtResignationDateDeactive" runat="server" ClientIDMode="Static" CssClass="inp-form"
                                ReadOnly="true"></asp:TextBox>
                            <asp:CalendarExtender ID="CalendarExtender3" runat="server" PopupButtonID="txtResignationDateDeactive"
                                PopupPosition="BottomLeft" TargetControlID="txtResignationDateDeactive" ClientIDMode="Static">
                            </asp:CalendarExtender>
                        </div>
                        <div class="RegModelFooter">
                            <button type="button" class="btn btn-danger btn-cons BtnLeftPull CloseBTNPopup">Close</button>
                            <button type="button" class="btn btn-primary btn-cons BtnLeftPull " onclick="resignationDateAcceptedOfEmployee()">OK</button>

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
                <div style="vertical-align: middle; text-align: center; padding: 5px;">
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
                </div>


                <div class="divgrid">
                    <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        AllowFiltering="true" AllowSorting="true" AllowPaging="true" AllowAddingRecords="false"
                        FolderStyle="../Styles/GridCss" OnRowDataBound="Grid1_RowDataBound" AllowPageSizeSelection="false">
                        <Columns>
                            <obout:Column Width="90" DataField="EmployeeCode" HeaderText="User Code" SortExpression="EmployeeCode" />
                            <obout:Column Width="100" DataField="EmployeeId" HeaderText="Emp ID" SortExpression="EmployeeId"
                                Visible="false" />
                            <obout:Column Width="170" DataField="Name" HeaderText="Name" SortExpression="EmployeeName" />
                            <obout:Column Width="140" DataField="LoginId" HeaderText="LoginId" SortExpression="LoginId" />
                            <obout:Column Width="90" DataField="Designation" HeaderText="Designation" SortExpression="Designation" />

                            <obout:Column Width="120" DataField="hrLevel3LevelId" HeaderText="hrLevel3LevelId" SortExpression="hrLevel3LevelId" Visible="false"/>
                            <obout:Column Width="120" DataField="hrLevel4LevelId" HeaderText="hrLevel4LevelId" SortExpression="hrLevel4LevelId" Visible="false"/>
                            <obout:Column Width="120" DataField="hrLevel5LevelId" HeaderText="hrLevel5LevelId" SortExpression="hrLevel5LevelId" Visible="false"/>
                            <obout:Column Width="120" DataField="hrLevel6LevelId" HeaderText="hrLevel6LevelId" SortExpression="hrLevel6LevelId" Visible="false"/>

                            <obout:Column Width="120" DataField="GM" HeaderText="GM" SortExpression="GM" />
                            <obout:Column Width="120" DataField="BUH" HeaderText="BUH" SortExpression="BUH" />
                            <obout:Column Width="120" DataField="Division" HeaderText="Division" SortExpression="Division" />
                            <obout:Column Width="120" DataField="Region" HeaderText="Region" SortExpression="Region" />
                            <obout:Column Width="120" DataField="Zone" HeaderText="Zone" SortExpression="Zone" />
                            <obout:Column Width="120" DataField="Territory" HeaderText="Territory" SortExpression="Territory" />
                            <obout:Column Width="90" DataField="AppointmentDate" HeaderText="D.O.J" SortExpression="AppointmentDate" />
                            <obout:Column Width="90" DataField="ResignDate" HeaderText="D.O.R" SortExpression="ResignDate" />
                            <obout:Column Width="70" DataField="Status" HeaderText="Status" SortExpression="Status" />
                            <obout:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </obout:Column>
                            <obout:Column ID="colDeactiveEmployee" runat="server" Width="80">
                                <TemplateSettings TemplateId="DeactiveEmployeeTemplate" />
                            </obout:Column>
                            <obout:Column Width="120" DataField="hrLevel1LevelId" HeaderText="hrLevel1LevelId" SortExpression="hrLevel1LevelId" Visible="false"/>
                            <obout:Column Width="120" DataField="hrLevel2LevelId" HeaderText="hrLevel2LevelId" SortExpression="hrLevel2LevelId" Visible="false"/>
                          

                            <%-- <obout:Column Width="100" AllowDelete="true" />--%>
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />
                        <GroupingSettings AllowChanges="false" />
                        <Templates>
                            <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL">Edit</asp:LinkButton>

                                </Template>
                            </obout:GridTemplate>

                            <obout:GridTemplate ID="DeactiveEmployeeTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButtonDeactiveEmp" runat="server" class="ob_gAL">Deactive</asp:LinkButton>
                                </Template>
                            </obout:GridTemplate>
                        </Templates>
                    </obout:Grid>
                </div>



                <div class="outerBox" style="     height: 800px;width: 1035px;">
                    <div class="box-shadow-left">
                        <img src="../Images/Form/side_shadowleft.jpg" />
                    </div>
                    <div class="box-shadow-right">
                        <img src="../Images/Form/side_shadowright.jpg" />
                    </div>
                    <div id="box" align="center">
                        <div class="innerBox">
                            <div class="wrapper-inner" id="id-form">
                                <div class="wrapper-inner-left">
                                    <div class="ghierarchy bottom" id="rowRole">
                                        <div class="inner-head">
                                            <h2>
                                                System Role</h2>
                                        </div>
                                        <div class="inner-left">
                                            <select id="ddlRole" name="ddlRole" class="styledselect_form_1">
                                                <option value="-1" selected="selected">Sales Force Team</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="ghierarchy">
                                        <div class="inner-head">
                                            <h2>
                                                Hierarchy</h2>
                                        </div>
                                        <div class="inner-left">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <td>
                                                        <!-- start id-form -->
                                                        <asp:Label ID="lblGeographicalHierarchy" runat="server" Text="Geographical Hierarchy"
                                                            ClientIDMode="Static" Font-Bold="True" />
                                                         <table border="0" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <th valign="top" id="col1">
                                                                    <div class="divcol">
                                                                        BUH
                                                                    </div>
                                                                    <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top" id="col2">
                                                                    <div class="divcol">
                                                                        GM
                                                                    </div>
                                                                    <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top" id="col3">
                                                                    <div class="divcol">
                                                                        National
                                                                    </div>
                                                                    <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top" id="col4">
                                                                    <div class="divcol">
                                                                       Region
                                                                    </div>
                                                                    <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top" id="col5">
                                                                    <div class="divcol">
                                                                        Zone
                                                                    </div>
                                                                    <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top" id="col6">
                                                                    <div class="divcol">
                                                                        Territory
                                                                    </div>
                                                                    <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                                        <option value="-1">Select...</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                        <!-- end id-form  -->
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="inner-right">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <td>
                                                        <asp:Label ID="lblUserHierarchy" runat="server" Text="User Hierarchy" ClientIDMode="Static"
                                                            Font-Bold="True" />
                                                     <table border="0" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <th id="col11">
                                                                    <div class="divcol">
                                                                        BUH Manager
                                                                    </div>
                                                                    <select id="ddl11" name="ddl11" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="col22">
                                                                    <div class="divcol">
                                                                        General  Manager
                                                                    </div>
                                                                    <select id="ddl22" name="ddl22" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="col33">
                                                                    <div class="divcol">
                                                                        National Manager
                                                                    </div>
                                                                    <select id="ddl33" name="ddl33" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="col44">
                                                                    <div class="divcol">
                                                                        Regional Manager
                                                                    </div>
                                                                    <select id="ddl44" name="ddl44" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="col55">
                                                                    <div class="divcol">
                                                                        Zonal Manager
                                                                    </div>
                                                                    <select id="ddl55" name="ddl55" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="col66">
                                                                    <select id="ddl66" name="ddl66" class="styledselect_form_1">
                                                                        <option value="-1">Select Employee</option>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th id="colType">
                                                                    <div class="divcol">
                                                                        Employee Type
                                                                    </div>
                                                                    <asp:DropDownList ID="ddlType" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                                        DataValueField="TypeId" DataTextField="TypeName" DataSourceID="sdsType" class="styledselect_form_1">
                                                                        <asp:ListItem Value="-1" Selected="True">Select Employee Type</asp:ListItem>
                                                                    </asp:DropDownList>
                                                                    <asp:SqlDataSource ID="sdsType" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                        SelectCommand="SELECT [TypeId], [TypeName] FROM [EmployeesType] Order By [TypeName]">
                                                                    </asp:SqlDataSource>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="clear_with_height">
                                    </div>
                                    <div class="professional-data">
                                        <div class="inner-head">
                                            <h2>
                                                Administration</h2>
                                        </div>
                                        <div id="Row" style="float: left;">
                                            <div class="inner-left">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr valign="top">
                                                        <td>
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <th valign="top">
                                                                        Official Mobile Number :
                                                                        <asp:TextBox ID="txtMobileNumber" name="txtMobileNumber" runat="server" ClientIDMode="Static" MaxLength="12"
                                                                            CssClass="inp-form" />
                                                                        <span class="red">* </span>
                                                                        <asp:MaskedEditExtender ID="MaskedEditExtender1" runat="server" ClientIDMode="Static"
                                                                            Mask="(99) 999-999-9999" TargetControlID="txtMobileNumber">
                                                                        </asp:MaskedEditExtender>
                                                                    </th>
                                                                </tr>
                                                                 <tr>
                                                                    <th valign="top">
                                                                        Employee Code :
                                                                        <input ID="txtEmpCode" name="txtEmpCode" class="inp-form" />
                                                                        <span class="red">* </span>
                                                                     
                                                                    </th>
                                                                </tr>
                                                                 <tr>
                                                                    <th id="Teamhide">
                                                                        Team Name :
                                                                    
                                                                             <asp:DropDownList ID="ddlTeam" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                                                    DataValueField="ID" DataTextField="TeamName" DataSourceID="sdsTeam" class="styledselect_form_1">
                                                                                    <asp:ListItem Value="-1" Selected="True">Select Team</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                                <asp:SqlDataSource ID="sdsTeam" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                    SelectCommand="Select  PK_TSID As ID ,TeamMastertName TeamName from tbl_TeamMaster  where IsActive = 1 order by TeamMastertName">
                                                                                </asp:SqlDataSource>
                                                                                <span class="red" style="height: 501px;">* </span>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th valign="top">
                                                                        Status :<br />
                                                                        <input id="chkActive" name="chkActive" type="checkbox" value="Active" checked="checked" />
                                                                    </th>
                                                                </tr>

                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="inner-right">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr valign="top">
                                                        <th>
                                                            <table border="0" cellpadding="0" cellspacing="0">
                                                                <tr>
                                                                    <th valign="top">
                                                                        <div id="rowLogin">
                                                                            Login Id :
                                                                            <input id="txtLoginId" name="txtLoginId" type="text" maxlength="100" value="" class="inp-form" />
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        GDBID :
                                                                        <input type="number" id="txtGDBID" name="txtGDBID" class="inp-form" />
                                                                    </th>
                                                                </tr>
                                                                 <tr>
                                                                        <th valign="top">
                                                                            Previus Days:<br />
                                                                            <input id="days" name="days" class="inp-form" />
                                                                           
                                                                        </th>
                                                                    </tr>
                                                            </table>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                        </th>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                         <div id="Div2" style="float: left; display:none;">
                                            <div id="Coldepot">
                                                <div class="inner-left">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr valign="top">
                                                            <th>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <th valign="top">
                                                                            <div id="Div1">
                                                                                Select Depot :
                                                                                <asp:DropDownList ID="dlDepot" runat="server" ClientIDMode="Static" AppendDataBoundItems="true"
                                                                                    DataValueField="Rec_No" DataTextField="Depotname" DataSourceID="sdsDepot" class="styledselect_form_1">
                                                                                    <asp:ListItem Value="-1" Selected="True">Select Depot</asp:ListItem>
                                                                                </asp:DropDownList>
                                                                                <asp:SqlDataSource ID="sdsDepot" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                                    SelectCommand="SELECT [Rec_No],[Depotname] FROM [dbo].[tbl_Depot] where [IsActive] = 1 order by [Depotname]">
                                                                                </asp:SqlDataSource>
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div id="Coldepot1">
                                                <div class="inner-right">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr valign="top">
                                                            <th>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr style="display:none;">
                                                                        <th valign="top">
                                                                            Block Sample Distribution:<br />
                                                                            <input id="IsSample" name="chkActive" type="checkbox" value="sad" />
                                                                        </th>
                                                                    </tr>
                                                                                                                                                 

                                                                </table>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="inner-left">
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr valign="top">
                                                            <th>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr style="display:none;">
                                                                        <th valign="top">
                                                                            Distribution Address :
                                                                            <input id="txtPermenantAddress" name="txtPermenantAddress" maxlength="200" class="inp-form-medium" />
                                                                        </th>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="wrapper-inner-right">
                                <div class="persoanl-data">
                                    <div class="inner-head">
                                        <h2>
                                            Personal Data
                                        </h2>
                                    </div>
                                    <div class="inner-left">
                                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <th valign="top">
                                                                First Name :
                                                                <input id="txtFirstName" name="txtFirstName" type="text" maxlength="50" class="inp-form" />
                                                                <span class="red">* </span>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Last Name :
                                                                <input id="txtLastName" name="txtLastName" type="text" maxlength="50" class="inp-form" />
                                                                <span class="red">* </span>
                                                            </th>
                                                        </tr>
                                                        <tr id="rowAppointmentDate">
                                                            <th valign="top">
                                                                Appointment Date :
                                                                <asp:TextBox ID="txtAppointmentDate" name="txtAppointmentDate" runat="server" ClientIDMode="Static" CssClass="inp-form"
                                                                    ReadOnly="true"></asp:TextBox>
                                                                <span class="red">* </span>
                                                                <asp:CalendarExtender ID="CalenderExtender1" runat="server" PopupButtonID="txtAppointmentDate"
                                                                    PopupPosition="BottomLeft" TargetControlID="txtAppointmentDate" ClientIDMode="Static">
                                                                </asp:CalendarExtender>
                                                            </th>
                                                        </tr>
                                                        <tr id="rowResignationDate">
                                                            <th valign="top">
                                                                Resignation Date :
                                                                <asp:TextBox ID="txtResignationDate" runat="server" ClientIDMode="Static" CssClass="inp-form"
                                                                    ReadOnly="true"></asp:TextBox>
                                                                <asp:CalendarExtender ID="CalendarExtender2" runat="server" PopupButtonID="txtResignationDate"
                                                                    PopupPosition="BottomLeft" TargetControlID="txtResignationDate" ClientIDMode="Static">
                                                                </asp:CalendarExtender>
                                                            </th>
                                                        </tr>

                                                        <tr>
                                                            <th valign="top">
                                                                Phone Number :
                                                                <asp:TextBox ID="txtContactNumber2" runat="server" ClientIDMode="Static" MaxLength="20"
                                                                    CssClass="inp-form" />
                                                                <asp:MaskedEditExtender ID="MaskedEditExtender3" runat="server" ClientIDMode="Static"
                                                                    Mask="(99) 999-999-9999" TargetControlID="txtContactNumber2">
                                                                </asp:MaskedEditExtender>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Country :
                                                                <select id="cboCountries" name="cboCountries" class="styledselect_form_1">
                                                                    <option value="-1">Select Country</option>
                                                                    <option value="PK" selected="selected">Pakistan</option>
                                                                </select>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="inner-right">
                                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0" id="Table1">
                                                        <tr>
                                                            <th valign="top">
                                                                Middle Name :
                                                                <input id="txtMiddleName" name="txtMiddleName" type="text" maxlength="50" class="inp-form" />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Gender :
                                                                <select id="ddlGender" name="ddlGender" class="styledselect_form_1">
                                                                    <option value="0" selected="selected">Select Gender</option>
                                                                    <option value="1">Male</option>
                                                                    <option value="2">Female</option>
                                                                </select>
                                                            </th>
                                                        </tr>
                                                        <tr id="rowDesignation">
                                                            <th valign="top">
                                                                Designation :
                                                                <select id="ddlDesignation" name="ddlDesignation" class="styledselect_form_1">
                                                                    <option value="-1" selected="selected">Select Designation</option>
                                                                </select>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Office Number :
                                                                <asp:TextBox ID="txtContactNumber1" runat="server" ClientIDMode="Static" MaxLength="20"
                                                                    CssClass="inp-form" />
                                                                <asp:MaskedEditExtender ID="MaskedEditExtender2" runat="server" ClientIDMode="Static"
                                                                    Mask="(99) 999-999-9999" TargetControlID="txtContactNumber1">
                                                                </asp:MaskedEditExtender>
                                                            </th>
                                                        </tr>
                                                        <%--<tr>
                                                            <th valign="top">
                                                                City :
                                                                <input id="txtCity" name="txtCity" type="text" maxlength="50" class="inp-form" />
                                                                <span class="red">* </span>
                                                            </th>
                                                        </tr>--%>
                                                        <tr>
                                                                <th valign="top">City :
                                                                    <select id="ddlCity" name="ddlCity" class="styledselect_form_1">
                                                                        <%--<option value="0">Select City</option>--%>
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                        
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="inner-left">
                                        <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <th valign="top">
                                                                Current Address :
                                                                <input id="txtCurrentAddress" name="txtCurrentAddress" maxlength="200" class="inp-form-medium" />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Email @ :
                                                                <input id="txtEmail" name="txtEmail" maxlength="250" class="inp-form-medium" />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th valign="top">
                                                                Remarks :
                                                                <input id="txtRemarks" name="txtRemarks" class="inp-form-medium" />
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                                <th valign="top">Related City :
                                                                    <select id="ddlRelatedCity" name="ddlRelatedCity" multiple="multiple" style="width: 407px; height: 100px;">
                                                                    </select>
                                                                </th>
                                                        </tr>
                                                        <tr>
                                                                <th valign="top">IBA Applicable :<br />
                                                                <input id="chkIBA" name="chkIBA" type="checkbox"  value="IBA Applicable" />
                                                                </th>
                                                            </tr>
                                                        <tr>
                                                                <th valign="top">CNG Applicable :<br />
                                                                <input id="chkCarAllowance" name="chkCarAllowance" type="checkbox"  value="Car Allowance" />
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th valign="top">Bike Allowance :<br />
                                                                <input id="chkBikeAllowance" name="chkBikeAllowance" type="checkbox"  value="Bike Allowance" />
                                                                </th>
                                                            </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="inner-bottom">
                                    <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />
                                    <input id="btnSave" name="btnSave" type="button" class="form-submit" />
                                </div>
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
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</asp:Content>

