<%@ Page Title="E-Detailing Setup" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="PDFUploader.aspx.cs" Inherits="PocketDCR2.Form.PDFUploaderNew" %>


<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>--%>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="PDFUploader.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" type="text/javascript"></script>

    <script type="text/JavaScript"></script>

    <style type="text/css">
        div.error {
            color: rgba(233, 1, 1, 0.87);
            font-size: 13px;
            margin-bottom: 5px;
        }

        .divgrid {
            font-family: "Calibri", Verdana;
            font-size: 14px;
            color: #000;
            width: 104%;
            padding-top: 0px;
            padding-bottom: 10px;
            padding-right: 0px;
            padding-left: 0px;
            border: solid 0px #616262;
            text-align: left;
            float: left;
        }

        #grid-basic_wrapper {
            padding: 10px 10px 10px 10px;
        }

        #ddlTeam:disabled {
            background: #dddddd;
            cursor: not-allowed;
        }

        #ddlProducts:disabled {
            background: #dddddd;
            cursor: not-allowed;
        }

        .page_heading img {
            padding-right: 15px;
            margin-top: 30px;
        }

        #id-form td {
            padding: 0 0 10px 7px;
            font-size: 13px;
            float: none;
            text-align: left;
            /*text-align: center;*/
        }

        .wrapper-inner-left {
            float: left;
            width: 1030px;
        }

        #loading-img {
            background: url(http://preloaders.net/preloaders/360/Velocity.gif) center center no-repeat;
            height: 100%;
            z-index: 20;
        }

        .overlay {
            background: #e9e9e9;
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0.5;
        }

        .grid-basic_length {
            display: none;
            width: 0 !important;
        }

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

        .ob_gC {
            background-image: url("../Styles/GridCss/header.gif");
            color: #242500;
            cursor: pointer;
            font-family: "Calibri",Verdana;
            font-size: 14px;
            font-weight: bold;
            height: 33px;
            text-align: left;
            /*border-bottom: 0px solid;
    padding: 1px 1px;*/
            /*border-collapse: separate;*/
        }

        .odd {
            background-color: #f6f5f0 !important;
        }

        .even {
            background-color: #efede2 !important;
        }

        table.dataTable.no-footer {
            border: 0 solid #616262 !important;
        }

        .ob_gMCont {
            border-bottom: 1px solid #e3e2de;
            border-top: 1px solid #e3e2de;
            overflow: hidden;
            position: relative;
        }

        #grid-basi td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        #grid-lastdoc td {
            background-color: #e3e2de;
            font-size: 1px;
            position: absolute;
            top: 0;
            width: 1px;
            z-index: 10;
        }

        table.dataTable thead th, table.dataTable thead td {
            padding: 10px 5px !important;
        }
        /*table.dataTable tbody tr .even{background-color: #63432a}*/





        .headerr .wrap {
            width: 200px;
            margin: 0 auto;
            margin-top: 10px;
            text-align: center;
            position: relative;
        }

            .headerr .wrap .img_1, .header .wrap .img_2 {
                border: 1px solid #0f0;
                position: absolute;
                height: 20px;
                width: 20px;
                top: 25px;
            }

            .headerr .wrap .img_1 {
                left: 0;
            }

            .headerr .wrap .img_2 {
                right: 0;
            }

        .styled-select {
            background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
            overflow: hidden;
            width: 240px;
        }

            .styled-select select {
                background: transparent;
                border: none;
                font-size: 14px;
                padding: 5px; /* If you add too much padding here, the options won't show in IE */
                width: 268px;
            }

        .semi-square {
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
        }

        .blue {
            background-color: whitesmoke;
        }

            .blue select {
                color: black;
            }

        .wrap {
            width: 80%;
            margin: 0 auto;
            margin-top: 15px;
        }

        .parent {
            margin-bottom: 15px;
            padding: 10px;
            color: #0A416B;
            clear: both;
            width: 100%;
        }

        .left {
            float: left;
            width: 12%;
            padding: 5px;
            height: 360px;
        }

        .center {
            float: left;
            width: 65%;
            padding: 5px;
            height: 350px;
        }

        .right {
            float: right;
            padding: 5px;
        }

        textarea {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .btnsaless {
            border: 1px solid black;
            display: inline-block;
            border-radius: 3px;
            padding: 8px 20px 8px 20px;
            font-size: 15px;
            cursor: pointer;
            color: black;
            text-decoration: none;
            background-color: white;
        }

            .btnsaless:hover {
                background-color: black;
                color: white;
            }

        textarea#styleid {
            color: #666;
            font-size: 14px;
            -moz-border-radius: 8px;
            -webkit-border-radius: 8px;
            margin: 5px 0px 10px 0px;
            padding: 10px;
            height: 75px;
            width: 250px;
            border: #999 1px solid;
            font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
            transition: all 0.25s ease-in-out;
            -webkit-transition: all 0.25s ease-in-out;
            -moz-transition: all 0.25s ease-in-out;
            box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
            -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 0);
        }

            textarea#styleid:focus {
                color: #000;
                outline: none;
                border: wheat 1px solid;
                font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -webkit-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
                -moz-box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            }

        .button-secondary {
            font-size: 15px;
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            background: #03429a;
            padding: 6px 20px 6px 20px;
        }

        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            transition: opacity 500ms;
            visibility: hidden;
            opacity: 0;
            overflow-y: auto;
        }

            .overlay:target {
                visibility: visible;
                opacity: 1;
            }

        .popup {
            margin: 70px auto;
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 80%;
            position: relative;
            transition: all 5s ease-in-out;
        }

            .popup h2 {
                margin-top: 0;
                color: #333;
                font-family: Tahoma, Arial, sans-serif;
            }

            .popup .close {
                position: absolute;
                top: 20px;
                right: 30px;
                transition: all 200ms;
                font-size: 30px;
                font-weight: bold;
                text-decoration: none;
                color: #333;
            }

                .popup .close:hover {
                    color: #06D85F;
                }

            .popup .content {
                max-height: 30%;
                overflow: auto;
            }

        @media screen and (max-width: 700px) {
            .box {
                width: 70%;
            }

            .popup {
                width: 70%;
            }
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="page_heading">
        <h1>
            <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
            E-Detailing Products PDF/Videos</h1>
        <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    </div>
    <div style="vertical-align: middle; text-align: center; padding: 5px;">
        <asp:Label ID="lblError" runat="server" ClientIDMode="Static" />
    </div>

    <div class="overlay">
        <div id="loading-img"></div>
    </div>

    <div class="outerBox">
        <div class="box-shadow-left">
            <img src="../Images/Form/side_shadowleft.jpg" />
        </div>
        <div class="box-shadow-right">
            <img src="../Images/Form/side_shadowright.jpg" />
        </div>
        <div id="box" align="center">
            <div class="innerBox" style="width: 1350px;">
                <div class="wrapper-inner" id="id-form">
                    <div class="wrapper-inner-left" style="width: 244px;">
                        <div class="ghierarchy bottom" id="rowRole" style="width: 225px;">
                            <div class="inner-head">
                                <h2>Upload PDF/Video</h2>
                            </div>
                            <div class="inner-left">

                                <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                    <tr valign="top">
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <th valign="top" id="col1">
                                                        <div class="divcol">
                                                            Team &nbsp;<span style="color: red;">*</span>
                                                        </div>
                                                        <select id="ddlTeam" name="ddlTeam" class="styledselect_form_1">
                                                            <option value="">--Select Product--</option>
                                                        </select>
                                                       <%-- <asp:DropDownList ID="ddlTeam" runat="server" class="styledselect_form_1" AutoPostBack="false" ClientIDMode="Static"></asp:DropDownList>
                                                 --%>   </th>
                                                </tr>
                                                <tr>
                                                    <th valign="top" id="col2">
                                                        <div class="divcol">
                                                            Products&nbsp;<span style="color: red;">*</span>
                                                        </div>

                                                        <asp:HiddenField ID="productID" runat="server" ClientIDMode="Static" />

                                                        <select id="ddlProducts" name="ddlProducts" class="styledselect_form_1">
                                                            <option value="">--Select Product--</option>
                                                        </select>


                                                        <%--<asp:DropDownList ID="ddlProducts" class="styledselect_form_1" ClientIDMode="Static" runat="server">
                                                    <asp:ListItem Value="-1" Text="--Select Product--" />
                                                </asp:DropDownList>--%>

                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th valign="top" id="col1">
                                                        <div class="divcol">
                                                            File Name &nbsp;<span style="color: red;">*</span>
                                                        </div>
                                                        <input type="text" id="FileName" name="FileName" class="inp-form" placeholder="Enter File Name" />
                                                        <asp:HiddenField ID="pdfid" runat="server" ClientIDMode="Static" />
                                                        <%--<asp:TextBox placeholder="Enter File Name" ID="FileName" runat="server" CssClass="inp-form" ClientIDMode="Static"></asp:TextBox>--%>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th valign="top" id="col2">
                                                        <div class="divcol">
                                                            Description
                                                        </div>
                                                        <input type="text" id="FileDescription" name="FileDescription" class="inp-form" placeholder="Enter Description" />
                                                        <%--<asp:TextBox ID="FileDescription" placeholder="Enter Description" runat="server" CssClass="inp-form" ClientIDMode="Static"></asp:TextBox>--%>
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th valign="top" id="col2">

                                                        <div class="divcol">
                                                            <span style="margin-right: 30px;">Start Date &nbsp;<span style="color: red;">*</span></span>
                                                        </div>

                                                        <input type="text" id="txtPickStartDate" name="txtPickStartDate" class="inp-form" placeholder="Start Date" />

                                                        <%--<asp:TextBox ID="txtPickStartDate" placeholder="Start Date" runat="server" Width="36%" ClientIDMode="Static" CssClass="inp-form"></asp:TextBox>--%>

                                                        <%--<asp:TextBox ID="txtPickEndDate" placeholder="End Date" runat="server" Width="36%" ClientIDMode="Static" CssClass="inp-form"></asp:TextBox>--%>

                                                        
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th valign="top" id="col2">

                                                        <div class="divcol">
                                                            <span>End Date &nbsp;<span style="color: red;">*</span></span>
                                                        </div>

                                                        <input type="text" id="txtPickEndDate" name="txtPickEndDate" class="inp-form" placeholder="End Date" />

                                                        <%--<asp:TextBox ID="TextBox2" placeholder="End Date" runat="server" Width="36%" ClientIDMode="Static" CssClass="inp-form"></asp:TextBox>--%>


                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th valign="top" id="col2">
                                                        <div class="divcol">
                                                            Status 
                                                                    <asp:CheckBox ID="status" runat="server" ClientIDMode="Static" />
                                                            <div style="color: grey; display: inline; font-weight: 300; font-size: small">mark if active</div>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr class="fileUpload">
                                                    <th valign="top" id="col2">
                                                        <div class="divcol">
                                                            Select File &nbsp;<span style="color: red;">*</span>
                                                        </div>
                                                        <%--<asp:FileUpload ID="Uploadfile" runat="server" ToolTip="Select Only Excel File" ClientIDMode="Static" />--%>
                                                        <input type="file" id="Uploadfile" name="Uploadfile" />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th valign="top" id="col2">
                                                        <div class="inner-bottom" style="width: 164px;">
                                                            <%--<asp:Button ID="Button" runat="server" Text="Upload" OnClientClick="resetall()" CssClass="form-reset" />--%>
                                                            <button id="btnFileCancel" type="button" name="btnFileCancel" class="form-reset">Cancel</button>
                                                            <%--<asp:Button ID="Button1" runat="server" Text="Upload" OnClientClick="return validate();" OnClick="Button1_Click" CssClass="form-submit" />--%>
                                                            <button id="btnFileSave" type="button" name="btnFileSave" class="form-submit ignoreField">Upload</button>
                                                        </div>

                                                    </th>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>



                    <div class="wrapper-inner-left" id="">

                        <div class="divgrid" id="griddiv" style="border-bottom: 1px solid #e3e2de; background-color: #f6f5f0; border-top: 1px solid #e3e2de; overflow: hidden; position: relative; overflow-x: auto;">

                            <table id="grid-basic" class="dataTables_info dataTables_filter" style="border: 1px solid #616262;"></table>
                        </div>

                        <%--<div class="divgrid">
                            <obout:Grid ID="Grid1" runat="server" Serialize="false" AutoGenerateColumns="false"
                                AllowFiltering="true" AllowSorting="true" AllowPaging="true" AllowAddingRecords="false"
                                FolderStyle="../Styles/GridCss" OnRowDataBound="Grid1_RowDataBound" AllowPageSizeSelection="false">
                                <Columns>
                                    <obout:Column Width="100" DataField="ID"          HeaderText="ID" SortExpression="ID" Visible="False" />
                                    <obout:Column Width="100" DataField="TeamId"      HeaderText="TeamId" SortExpression="TeamId" Visible="False" />
                                    <obout:Column Width="150" DataField="FileName"    HeaderText="FileName" SortExpression="FileName" />
                                    <obout:Column Width="150" DataField="Product"     HeaderText="Product" />
                                    <obout:Column Width="150" DataField="Team"        HeaderText="Team" SortExpression="Team" />
                                    <obout:Column Width="250" DataField="Description" HeaderText="Description" SortExpression="Description" />
                                    <obout:Column Width="80"  DataField="NumofPages"  HeaderText="Pages" SortExpression="NumofPages" />
                                    <obout:Column Width="80"  DataField="Status"      HeaderText="Status" SortExpression="Status" />
                                    <obout:Column runat="server" HeaderText="productID" DataField="productID" Visible="False" Index="8" SortExpression="Status" Width="80" />
                                    <obout:Column DataField="startDate" HeaderText="startDate" Index="11" Visible="False" />
                                    <obout:Column  DataField="endDate"   HeaderText="endDate" Index="10" Visible="False" />
                                    <obout:Column Width="100" HeaderText="Action" TemplateId="EditedTemplate" ID="colEdit">
                                    
                                    <TemplateSettings TemplateId="EditedTemplate"></TemplateSettings></obout:Column>

                                </Columns>
                                <GroupingSettings AllowChanges="false" />
                                <Templates>
                                    <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                        <Template>
                                            <asp:LinkButton  ID="LinkButton1" runat="server" class="ob_gAL">Edit</asp:LinkButton>
                                            &nbsp;
                                           <asp:LinkButton ID="LinkButton2" runat="server" class="ob_gAL">Delete</asp:LinkButton>
                                        </Template>
                                    </obout:GridTemplate>
                                </Templates>
                            </obout:Grid>
                        </div>--%>
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


    <script src="../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <link href="../Styles/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />


</asp:Content>

