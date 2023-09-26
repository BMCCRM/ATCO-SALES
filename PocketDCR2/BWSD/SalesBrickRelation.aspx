<%@ Page Title="Sales Brick Relation" Language="C#" MasterPageFile="~/MasterPages/Home.Master"
    AutoEventWireup="true" CodeBehind="SalesBrickRelation.aspx.cs" Inherits="PocketDCR2.Form.Sales_Brick_Relation" %>


<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <link href="../Scripts/jquery-ui.css" rel="stylesheet" />
    <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.12.1.js"  type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
      <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>

       <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
      <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
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
            var height2 = height - 210 + "px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)


        });

    </script>
    <script src="SalesBrickRelation.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>

                <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
             
                <div class="page_heading">
                    <h1>Sales Brick Relations</h1>
                </div>
                <div>
                    <asp:Label ID="lblError" runat="server" ClientIDMode="Static"></asp:Label>
                </div>
                <div id="content-table-inner">
               
                    <div class="clear">
                    </div>
                </div>
                <div class="wrapper-inner">
                    <div style="float: left; padding-left: 25%">
                        <div class="ghierarchy2">
                            <div class="inner-head">

                                <h2>
                                    <span class="spacer">&nbsp;</span>Sales Distributors Brick Relation</h2>
                            </div>
                            <div class="inner-left">
                                <table border="0" cellpadding="0" cellspacing="0" id="id-form">

                                    <tr>
                                        <th valign="top">Region :
                                        </th>
                                        <td>
                                            <select id="ddl1" name="ddl1" class="styledselect_form_1" style="display: inline-block;">
                                                <option value="-1">Select Region</option>
                                            </select>
                                            <span class="red">* </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th valign="top">Sub Region :
                                        </th>
                                        <td>
                                            <select id="ddl2" name="ddl2" class="styledselect_form_1" style="display: inline-block;">
                                                <option value="-1">Select Sub Region</option>
                                            </select>
                                            <span class="red">* </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th valign="top">District :
                                        </th>
                                        <td>
                                            <select id="ddl3" name="ddl3" class="styledselect_form_1" style="display: inline-block;">
                                                <option value="-1">Select District</option>
                                            </select>
                                            <span class="red">* </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th valign="top">City :
                                        </th>
                                        <td>
                                            <select id="ddl4" name="ddl4" class="styledselect_form_1" style="display: inline-block;">
                                                <option value="-1">Select City</option>
                                            </select>
                                            <span class="red">* </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th valign="top">Filter Distributors For Sales Brick:
                                        </th>
                                        <td>
                                            <select id="ddlDistributors" name="ddlDistributors" class="styledselect_form_1" style="display: inline-block;">
                                                <option value="-1">Select Distributor</option>
                                            </select>
                                            <span class="red">* </span>
                                        </td>
                                    </tr>

                                </table>
                                <table style='width: 60%;'>
                                    <tr>
                                        <td style='width: 260px;'>
                                            <b>Sales Brick</b><br />
                                            <select multiple="multiple" id='listbox1' style="height: 250px; width: 270px">
                                                <option value="-1">- Please Select Distributors From Dropdown -</option>
                                            </select>
                                        </td>
                                        <td style='width: 38px; /*text-align: center; vertical-align: middle; */'>
                                            <input type='button' id='btnRight' onclick="SaveData(); return false;" value='  >  ' />
                                            <br />
                                            <input type='button' id='btnLeft' onclick="DeleteData(); return false" value='  <  ' />
                                        </td>
                                        <td style='width: 260px;'>
                                            <b>Selected Sales Brick </b>
                                            <br />
                                            <select multiple="multiple" id='listbox2' style="height: 250px; width: 270px">
                                                <%-- <option value="">- Please Select MSO From Drop Down -</option>--%>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                 
                    <div class="clear">
                    </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

</asp:Content>
