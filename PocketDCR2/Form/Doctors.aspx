<%@ Page Title="Doctors" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="Doctors.aspx.cs" Inherits="PocketDCR2.Form.Doctors" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script src="DoctorsJs.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript">
        var $New = jQuery.noConflict();
    </script>
    <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>

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
            var height2 = height - 160 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
        });

    </script>
    <style type="text/css">
        .ajax__combobox_itemlist {
            position: absolute;
            top: 160px !important;
            top: 168px\9 !important;
            left: 47px !important;
        }

        td.ajax__combobox_textboxcontainer {
            padding-bottom: 2px\9 !important;
        }

        .ajax__combobox_inputcontainer {
            top: -7px\9 !important;
        }

        .excelExportStyle {
            /*display: inline-block;
            padding: 1px 25px;
            font-size: 20px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            outline: none;
            color: #fff;
            background-color: #4CAF50;
            border: none;
            border-radius: 15px;*/
            /* box-shadow: 0 6px #999; */
            /*width: 150px;
            height: 30px;
            float: right;
            margin-bottom: 8px;*/
            display: inline-block;
            /* padding: 1px 25px; */
            font-size: 18px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            outline: none;
            color: #fff;
            background-color: #4CAF50;
            border: none;
            border-radius: 15px;
            /* box-shadow: 0 6px #999; */
            width: 150px;
            height: 30px;
            /* float: right; */
            margin-bottom: 8px;
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
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330777250_doctor.png" />
                        Doctors
                    </h1>
                    <script type="text/javascript">
                        $(function () {
                            initdropdown();
                        })
                        function initdropdown() {
                            $New("#<%=ddlCity1.ClientID%>").select2({
                                dropdownParent: $New('#g1'),
                                placeholder: "Select City",
                                allowClear: true
                            });
                        }

                    </script>
                    <script type="text/javascript">
                        Sys.Application.add_load(initdropdown);
                    </script>
                    <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" OnClick="btnRefresh_Click" Style="display: none;" />
                    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />

                    <div id="g1" style="float: right; padding-right: 30px;">
                        <h4 style="display: block; padding-bottom: 10px;">Search By City</h4>
                        <asp:DropDownList ID="ddlCity1" runat="server" CssClass="styledselect_form_1" DataSourceID="dsCitys" DataTextField="City"
                            DataValueField="City" AppendDataBoundItems="true" AutoPostBack="true">
                        </asp:DropDownList>

                        <asp:SqlDataSource ID="dsCitys" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                            SelectCommand="Sp_GetFilldllCity" SelectCommandType="StoredProcedure"></asp:SqlDataSource>
                        <%--<select runat="server" id="ddlCity" name="ddlCity" class="styledselect_form_1">
                            <option value="-1">Select City</option>
                        </select>--%>
                    </div>
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

                <div id="divDoctorLocation" class="jqmConfirmation">
                    <div class="jqmTitle">
                        Doctor Location Details
                    </div>

                    <div id="divLocationDetails" style="display: none">
                        <div>
                            <br />
                            <center>
                                <b>DoctorName :
                                    <label data-doctorid="" id="lblDoctorName"></label>
                                </b>
                            </center>
                            <br />
                            <br />
                            <label><b>Location Details:  </b></label>
                            <label id="lblMorningAddress"></label>
                            <br />
                            <br />
                            <a id="mapAdressMorning" target="_blank" href="javascript:void(0)">View Location On Map</a>
                        </div>
                    </div>

                    <div id="divNoLocationFound">
                        <br />
                        <br />
                        <h4>Sorry, No Location Details Found For Requested Doctor. </h4>
                        <br />
                        <br />
                    </div>

                    <div style="text-align: right;">
                        <input type="button" value="Close" onclick="$('#divDoctorLocation').jqmHide();" />
                    </div>
                </div>

                <%--    <div class="row" style="width: 100%;">
                    <div id="myinlistdivgrid" class="col-md-12" style="width: 100%;">
                    </div>
                </div>--%>

                <div class="divgrid" style="overflow-x: auto;">

                    <%--<table border="0" cellpadding="10" cellspacing="0" id="Table1" style="float: right; padding-right: 10px">
                        <tr>
                            <th valign="top" id="ThDownload">
                                <div style="position: relative; cursor: pointer;">
                                    <div id="exportExcel" class="uploadify-button " style="height: 25px; line-height: 25px; width: 140px;">
                                        <span>EXPORT</span>
                                    </div>
                                </div>
                            </th>
                            <th valign="top" id="ThUpload">
                                <div id="uploadify" style="position: relative;">
                                    <div id="uploadify_button" type="button">
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </table>--%>

                    <%--<div id="exportExcel" class="excelExportStyle">Export Excel</div>--%>
                    <asp:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                        AllowFiltering="true" AllowSorting="true" AllowPaging="true" AllowAddingRecords="false"
                        FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false" DataSourceID="SqlDataSource1">

                        <Columns>
                            <asp:Column Width="100" DataField="DoctorId" HeaderText="Doctor Id" SortExpression="DoctorId" />
                            <asp:Column Width="100" DataField="DoctorCode" HeaderText="Doctor Code" SortExpression="DoctorCode" />
                            <asp:Column Width="170" DataField="DoctorName" HeaderText="Doctor Name" SortExpression="DoctorName" />
                            <asp:Column Width="150" DataField="Designation" HeaderText="Designation" SortExpression="Designation" />
                            <asp:Column Width="70" DataField="ClassName" HeaderText="Class" SortExpression="Class Name" />
                            <asp:Column Width="150" DataField="Speciality" HeaderText="Speciality" SortExpression="Speciality" />
                            <asp:Column Width="150" DataField="Qualification" HeaderText="Qualification" SortExpression="Qualification" />
                            <asp:Column Width="150" DataField="DoctorBrick" HeaderText="Doctor Brick" SortExpression="DoctorBrick" />
                            <asp:Column Width="150" DataField="DoctorAddress" HeaderText="Doctor Address" SortExpression="DoctorAddress" />
                            <asp:Column Width="80" DataField="City" HeaderText="City" SortExpression="City" />
                            <asp:Column Width="150" DataField="SpoName" HeaderText="MR Name" SortExpression="SpoName" />
                            <asp:Column Width="150" DataField="ZsmName" HeaderText="Sm Name" SortExpression="ZsmName" />
                            <asp:Column Width="130" DataField="MonthofRequest" HeaderText="Month of Request" SortExpression="MonthofRequest" />
                            <%--"<%# GetGoogleMapsLink(Eval(&quot;POIName&quot;),Eval(&quot;Latitude&quot;),Eval(&quot;Longitude&quot;)) %>">--%>
                            <asp:Column Width="80" DataField="IsActive" HeaderText="Status" SortExpression="IsActive" />
                            <asp:Column ID="colActions" runat="server" Width="120">
                                <TemplateSettings TemplateId="ActionTemplate" />
                            </asp:Column>
                            <asp:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </asp:Column>
                            <asp:Column Width="100" AllowDelete="true" />
                        </Columns>
                        <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" OnBeforeClientDelete="oGrid_Delete" />

                        <Templates>
                            <asp:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL" OnClientClick="Grid1.modifyTemporaryRecord(this)"> Edit</asp:LinkButton>
                                </Template>
                            </asp:GridTemplate>
                            <asp:GridTemplate ID="ActionTemplate" runat="server">
                                <Template>
                                    <a onclick='<%# String.Format("DoctorLocationDetails({0})", Container.DataItem["DoctorId"]) %>' id="" class="ob_gAL" href="javascript:void(0)">Location Details</a>
                                    <%--<asp:LinkButton ID="LinkButton2" runat="server" class="ob_gAL" OnClientClick='<%# String.Format("DoctorLocationDetails({0});", Container.RecordIndex) %>; return false;'> Location Details</asp:LinkButton>--%>
                                </Template>
                            </asp:GridTemplate>
                        </Templates>
                    </asp:Grid>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                        SelectCommand="sp_DoctorDetailSelect_New" SelectCommandType="StoredProcedure">
                        <SelectParameters>                            
                            <asp:ControlParameter ControlID="ddlCity1" DefaultValue="" Name="City" PropertyName="SelectedValue" Type="String" 
                                ConvertEmptyStringToNull="true" />
                        </SelectParameters>
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
                                <div class="wrapper-inner-left">
                                    <div class="ghierarchy">
                                        <div class="inner-head">
                                            <h2>Import/Export</h2>
                                        </div>

                                        <div class="inner-left">
                                            <table border="0" cellpadding="10" cellspacing="0" id="Table1" style="float: right; padding-right: 10px">
                                                <tr>
                                                    <th valign="top" id="ThDownload">
                                                        <div style="position: relative; cursor: pointer;">
                                                            <div id="exportExcel" class="uploadify-button " style="height: 25px; line-height: 25px; width: 140px;">
                                                                <span>EXPORT</span>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th valign="top" id="ThUpload">
                                                        <div id="uploadify" style="position: relative;">
                                                            <div id="uploadify_button" type="button">
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </table>
                                            <%--<table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <th id="col1">
                                                        <b>National : &nbsp;</b>
                                                        <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                            <option value="-1" selected="selected">Select...</option>
                                                        </select>
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <td id="col3">
                                                        <select id="ddl3" name="ddl3" class="SelBox_form_1">
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr valign="top">
                                                    <td id="col5">
                                                        <select id="ddl5" name="ddl5" class="SelBox_form_1">
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Doctor Brick :
                                                        
                                                        <asp:DropDownList ID="ddlBrick" runat="server" ClientIDMode="Static" DataTextField="Brick"
                                                            DataValueField="LevelId" AppendDataBoundItems="true"
                                                            class="styledselect_form_1" DataSourceID="sdsBrick">

                                                            <asp:ListItem Value="-1" Selected="True">Select Brick</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <span class="red">* </span>
                                                        <asp:SqlDataSource ID="sdsBrick" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                            SelectCommand="SELECT [LevelId], [LevelCode] + ' - ' + [LevelName] AS Brick FROM	HierarchyLevel6 WHERE LevelId NOT IN (SELECT ChildLevelId FROM RelationLevel5) ORDER BY LevelName"></asp:SqlDataSource>
                                                    </th>
                                                </tr>
                                            </table>--%>
                                        </div>

                                        <%--<div class="inner-right">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <th id="col2">
                                                        <b>Region : &nbsp;</b>
                                                        <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                        </select>
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td id="col4">
                                                        <select id="ddl4" name="ddl4" class="SelBox_form_1">
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td id="col6">
                                                        <select id="ddl6" name="ddl6" class="SelBox_form_1">
                                                        </select>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>--%>
                                    </div>

                                    <div class="clear_with_height">
                                    </div>

                                    <div class="professional-data">
                                        <div class="inner-head">
                                            <h2>Professional Data</h2>
                                        </div>

                                        <div class="inner-left">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <th>Doctor Brick :
                                                        <%--<asp:DropDownList ID="ddlBrick" runat="server" ClientIDMode="Static" DataTextField="Brick"
                                                            DataValueField="LevelId" AppendDataBoundItems="true"
                                                            class="styledselect_form_1" 
                                                            DataSourceID="sdsBrick">
                                                            <asp:ListItem Value="-1" Selected="True">Select Brick</asp:ListItem>
                                                        </asp:DropDownList>--%>
                                                        <select id="ddlBrick" name="ddlBrick" class="SelBox_form_1" style="width: 187px;"></select>
                                                        <span class="red">* </span>
                                                        <%--<asp:SqlDataSource ID="sdsBrick" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                SelectCommand="SELECT [LevelId], [LevelCode] + ' - ' + [LevelName] AS Brick FROM	v_DoctorBrick ORDER BY LevelName">
                                                            </asp:SqlDataSource>--%>
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>

                                        <div id="Row" style="float: left;">
                                            <div class="inner-left">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <th valign="top">Designation :
                                                            <asp:DropDownList ID="ddlDesignation" runat="server" ClientIDMode="Static" DataTextField="DesignationName"
                                                                DataValueField="DesignationId" AppendDataBoundItems="true"
                                                                CssClass="styledselect_form_1" DataSourceID="sdsDesignation">

                                                                <asp:ListItem Value="-1" Selected="True">Select Designation</asp:ListItem>
                                                            </asp:DropDownList>
                                                            <asp:SqlDataSource ID="sdsDesignation" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                                                SelectCommand="SELECT [DesignationId], [DesignationName] FROM [DoctorsDesignation] Order By [DesignationName]"></asp:SqlDataSource>
                                                        </th>
                                                    </tr>
                                                    <tr id="rowExistingQualification">
                                                        <th valign="top">Existing Qualifications :
                                                            <input id="txtExistingQualifications" name="txtExistingQualifications" type="text"
                                                                readonly="readonly" class="inp-form" />
                                                            <span class="red">* </span>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">Qualifications :
                                                            <select id="ddlQualifications" name="ddlQualifications" class="multiselect" multiple="multiple">
                                                            </select>
                                                        </th>
                                                    </tr>
                                                    <tr id="rowExistingSpeciality">
                                                        <th>Existing Specialities :
                                                            <input id="txtExistingSpecialities" name="txtExistingSpecialities" type="text" readonly="readonly"
                                                                class="inp-form" />
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top">Specialities :
                                                            <select id="ddlSpecialities" name="ddlSpecialities" class="styledselect_form_1">
                                                                <option value="-1" selected="selected">Select Speciality</option>
                                                            </select>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th valign="top"></th>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="inner-right">
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <th valign="top">Classes :
                                                            <select id="ddlClass" name="ddlClass" class="styledselect_form_1">
                                                                <option value="-1" selected="selected">Select Class</option>
                                                            </select>
                                                            <span class="red">* </span>
                                                        </th>
                                                    </tr>
                                                    <%--    <tr id="rowExistingProduct">
                                                        <th valign="top">Existing Products :
                                                            <input id="txtExistingProducts" name="txtExistingProducts" class="inp-form" type="text"
                                                                readonly="readonly" />
                                                        </th>
                                                    </tr>--%>
                                                    <%--  <tr>
                                                        <th valign="top">Products :
                                                            <select id="ddlProduct" name="ddlProduct" multiple="multiple" class="multiselect">
                                                            </select>
                                                        </th>
                                                    </tr>--%>
                                                    <%-- <tr>
                                                        <th valign="top">
                                                            <br />
                                                            Kol :
                                                            <input id="chkKol" name="chkKol" type="checkbox" value="Active" />
                                                        </th>
                                                    </tr>--%>
                                                </table>
                                            </div>
                                            <p>
                                                for multiple selections use Ctrl & Left mouse click
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="wrapper-inner-right">
                                    <div class="persoanl-data">
                                        <div class="inner-head">
                                            <h2>Personal Data
                                            </h2>
                                        </div>

                                        <div class="inner-left">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <th>First Name :
                                                        <input id="txtFirstName" name="txtFirstName" type="text" maxlength="50" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Last Name :
                                                        <input id="txtLastName" name="txtLastName" type="text" maxlength="50" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Mobile Number :
                                                        <asp:TextBox ID="txtMobileNumber" runat="server" ClientIDMode="Static" MaxLength="20"
                                                            CssClass="inp-form" />
                                                        <span class="red">* </span>
                                                        <asp:MaskedEditExtender ID="MaskedEditExtender1" runat="server" ClientIDMode="Static"
                                                            Mask="(99) 999-9999999" TargetControlID="txtMobileNumber">
                                                        </asp:MaskedEditExtender>
                                                    </th>
                                                </tr>

                                                <tr valign="top">
                                                    <th>Country :
                                                        <select id="cboCountries" name="cboCountries" class="styledselect_form_1">
                                                            <option value="-1">Select Country</option>
                                                            <option value="PK" selected="selected">Pakistan</option>
                                                        </select>
                                                    </th>
                                                </tr>

                                            </table>
                                        </div>

                                        <div class="inner-right">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr valign="top">
                                                    <th>Middle Name :
                                                        <input id="txtMiddleName" name="txtMiddleName" type="text" maxlength="50" class="inp-form" />
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Gender :
                                                        <select id="ddlGender" name="ddlGender" class="styledselect_form_1">
                                                            <option value="0" selected="selected">Select Gender</option>
                                                            <option value="1">Male</option>
                                                            <option value="2">Female</option>
                                                        </select>
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Office Number :
                                                        <asp:TextBox ID="txtOfficeNumber" runat="server" ClientIDMode="Static" MaxLength="20"
                                                            CssClass="inp-form" />
                                                        <asp:MaskedEditExtender ID="MaskedEditExtender2" runat="server" ClientIDMode="Static"
                                                            Mask="(999) 999-9999" TargetControlID="txtOfficeNumber">
                                                        </asp:MaskedEditExtender>
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th></th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>City :
                                                        <input id="txtCity" name="txtCity" type="text" maxlength="100" class="inp-form" />
                                                        <span class="red">* </span>
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>

                                        <div class="inner-left">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">

                                                <%--<tr valign="top">
                                                        <th>CNIC:   
                                                            <br />
                                                            <asp:TextBox ID="txtCNIC" runat="server" ClientIDMode="Static" MaxLength="20"
                                                                CssClass="inp-form" />
                                                            <span class="red">* </span>
                                                            <asp:MaskedEditExtender ID="MaskedEditExtender3" runat="server" ClientIDMode="Static"
                                                                Mask="99999-9999999-9" TargetControlID="txtCNIC">
                                                            </asp:MaskedEditExtender>
                                                        </th>
                                                    </tr>--%>
                                                <tr valign="top">
                                                    <th>Current Address :
                                                        <input id="txtCurrentAddress" name="txtCurrentAddress" maxlength="200" style="width: 392px"
                                                            class="inp-form-medium" />
                                                    </th>
                                                </tr>
                                                <tr valign="top">
                                                    <th>Permenant Address :
                                                        <input id="txtPermenantAddress" name="txtPermenantAddress" maxlength="200" style="width: 392px;"
                                                            class="inp-form-medium" />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Active :
                                                        <input id="chkActive" name="chkActive" type="checkbox" value="Active" />
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="inner-bottom">
                                        <input id="btnCancel" name="btnCancel" type="button" class="form-reset" />&nbsp;&nbsp;
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
