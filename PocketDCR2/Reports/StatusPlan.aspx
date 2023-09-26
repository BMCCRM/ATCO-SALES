<%@ Page Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" Title="View Plan Status" CodeBehind="StatusPlan.aspx.cs" Inherits="PocketDCR2.Reports.StatusPlan" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />

    <%--<link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />--%>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="StatusPlan.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>


<style type="text/css">
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
            input#txtdes {
    height: 19px;
    width: 180px;
}
            input#btnn {
    width: 10rem;
}
        .loading {
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

        .reportcl {
            width: 100%;
            height: 1500px;
        }

        .reportcl2 {
            width: 100%;
            height: 0px;
        }
    </style>

    <script type="text/javascript">
        $('#dsada').live('click', function () {
            $('#Reportifram').load(function () {
                $('#dialog').jqmHide();
            });
        })
    </script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="pop_box-outer jqmWindow" id="dialog">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div id="content" style="margin-top: -14px;">
        <div class="clear">
        </div>
        <div id="divGrid1" class="popup_box">
            <table border="0" width:"100%" cellpadding:"0" cellspacing:"0" id="content-table" style="margin-top: 15px;">
                <%--                position: relative !important;
                                top: 150px;z-index:99999999999;--%>
                <tr>
                    <th rowspan="3" class="sized">
                        <img src="../images/form/side_shadowleft.jpg" width="20" height="200" alt="" />
                    </th>
                    <th class="topleft"></th>
                    <td id="tbl-border-top">&nbsp;
                    </td>
                    <th class="topright"></th>
                    <th rowspan="3" class="sized">
                        <img src="../Images/Form/side_shadowright.jpg" width="20" height="200" alt="" />
                    </th>
                </tr>
                <tr>
                    <td id="tbl-border-left"></td>
                    <td>
                        <!--  start content-table-inner -->
                        <!-- ddl Report ID  -->
                        <input id="h1" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level1 -->
                        <input id="h2" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level2 -->
                        <input id="h3" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level3 -->
                        <input id="h4" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level4 -->
                        <input id="h5" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--employee ID -->
                        <input id="h6" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--DR id -->
                        <input id="h7" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--PROduct ID -->
                        <input id="h8" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!-- VT -->
                        <input id="h9" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--JV -->
                        <input id="h10" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--DR class -->
                        <input id="h11" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level5 -->
                        <input id="h12" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <!--Level6 -->
                        <input id="h13" type="hidden" runat="server" clientidmode="Static" value="-1" />
                        <div>
                            <%--<select id="ddlreport" name="ddlreport" class="styledselect_form_1111">
                                <option value="-1">Select Report</option>
                                <option value="1">Daily Calls Report</option>
                                <option value="2">Described Products</option>
                                <option value="3">Detailed Products Frequency</option>
                                <option value="4">Detailed Products Frequency By Division</option>
                                <option value="5">Incoming SMS Summary</option>
                                <option value="6">JV By Class</option>
                                <option value="7">KPI By Class</option>
                                <option value="8">Message Count</option>
                                <option value="9">Monthly Visit Analysis</option>
                                <option value="10">MR SMS Accuracy</option>
                                <option value="11">MR Doctors</option>
                                <option value="12">MRs List</option>
                                <option value="13">Sample Issued To Doctor</option>
                                <option value="14">SMS Status</option>
                                <option value="15">Visit By Time</option>
                                <option value="16">Detailed JV Report</option>
                                <option value="17">JV By Region</option>
                                <option value="18">Planning Monitor Report</option>
                                <option value="19">Monthly Visit Analysis With Planning</option>
                                <option value="25">Monthly Visit Analysis With Draft Planning</option>
                                <option value="20">KPI by Class With Planning</option>
                                <option value="21">Planning Report For JV</option>
                                <option value="22">Planning Report For BMD</option>
                                <option value="23">Detail Work Plan Report</option>
                                <option value="24">Forecasted KPI By Class With Planning</option>
                                <option value="26">Login Summary Report</option>
                                <option value="27">Login Details Report</option>
                                <option value="28">MIO Plan Status Report</option>
                                 <option value="29">SKU Report</option>
                                 <%--<option value="30">Detailed Work Plan Report test</option>
                                <option value="16">Sample Management Report</option>
                             <option value="31">Journey Plan Report</option>
                                <option value="33">RSM Plan Status Report</option>
                                <option value="32">ZSM Plan Status Report</option>
                            </select>
                            <input id="btnGreports" type="button" value="button" onclick="btnGreports()" />
                            <button id="dsada" onclick="btnGreports();return false; ">
                                Generate Report
                            </button>--%>
                        </div>
                        <div id="content-table-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="fdform1">
                                <tr valign="top">
                                    <td valign="top">
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                            <tr>
                                                <th valign="top" id="col1">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col2">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label2" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col3">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label3" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col4">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label4" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col5">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label9" name="Label9" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>
                                                <th valign="top" id="col6">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label10" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>

                                                 <th valign="top" id="col7">
                                                    <div class="divcol">
                                                        <asp:Label ID="Label15" name="Label11" ClientIDMode="Static" runat="server"></asp:Label>
                                                    </div>
                                                </th>

                                            </tr>
                                            <tr>
                                                <th valign="top" id="col11">
                                                    <select id="ddl1" name="ddl1" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col22">
                                                    <select id="ddl2" name="ddl2" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col33">
                                                    <select id="ddl3" name="ddl3" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col44">
                                                    <select id="ddl4" name="ddl4" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col55">
                                                    <select id="ddl5" name="ddl5" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="col66">
                                                    <select class="styledselect_form_1" id="ddl6" name="ddl6" >
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>

                                                 <%--<th valign="top" id="col77">
                                                    <select id="ddl7" name="ddl7" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>--%>

                                            </tr>
                                        </table>
                                        <!-- end id-form  -->
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                <tr>
                                    <th>
                                        <asp:Label ID="Label5" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label6" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label7" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label8" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label11" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label12" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label13" name="Label10" ClientIDMode="Static" runat="server"  multiple="multiple"> </asp:Label>
                                    </th>

                                   </tr>
                                <tr>
                                    
                                    <th valign="top" id="g1">
                                        <select id="dG1" name="dG1" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g2">
                                        <select id="dG2" name="dG2" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g3">
                                        <select id="dG3" name="dG3" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g4">
                                        <select id="dG4" name="dG4" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g5">
                                        <select id="dG5" name="dG5" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g6">
                                        <select id="dG6" name="dG6" class="styledselect_form_1" >
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                     <%-- <th valign="top" id="g7">
                                        <select id="dG7" name="dG7" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>--%>
                                

                                </tr>
                               <tr>
                                       <th valign="top" id="g69">
                                        <select id="devent" name="dEvent" class="styledselect_form_1">
                                            <option value="-1">Select Meeting</option>
                                            <option value="9">Meeting</option>
                                        </select>
                                    </th>    
                                         <th valign="top" id="g70">
                                            <input type="text" placeholder="Description " id="txtdes"
                                       
                                    </th>  
                                                                      
                                     <th> <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server" ReadOnly="true"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                    </asp:CalendarExtender></th>
                                   <th>
                                       <input type="button"  name="btn" id="btnn" value="Submit" onclick="onclick_btn1();" />
                                   </th>
                               </tr>
                            </table>
                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                 <tr>
                            <%--<th valign="top" id="Th11">Status :
                                    </th>
                                    <th valign="top" id="Th22">&nbsp;</th>
                                    <th valign="top" id="Th33">&nbsp;</th>
                                    <th valign="top" id="Th44">&nbsp;</th>--%>
                                </tr>
                                <%-- <tr>
                                    <th valign="top" id="Th2">
                                        <input type="button" name="btn" id="btn" value="Generate" onclick="onclick_btn();" />
                                    </th>--%>
                                <%--<th valign="top" id="Th3">&nbsp;</th>
                                    <th valign="top" id="Th4">&nbsp;</th>
                                    <th valign="top" id="Th5">--%>
                                <%--<input id="stdate" type="text" class="inp-form" runat="server" clientidmode="Static" readonly="readonly" />--%>
                                <%--<asp:TextBox ID="stdate" ClientIDMode="Static" runat="server" ReadOnly="true"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server" Format="dd/MM/yyyy">
                                        </asp:CalendarExtender>
                                    </th>--%>
                                <%-- <th><label id="label13" style="bottom:540px; font-weight:bold; margin-left:80px; position:absolute;"> SM-DSM </label></th>  --%>            
                                <%--</tr>--%>
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
        </div>
    </div>

 
    <div id="multipleStatusApprove" class="jqmConfirmation">
        <div class="jqmTitle">
            Plan Status Approval
        </div>
        <div class="divEdit">
            <div class="divTable">
                <span class="requireError" style="color: #d52525; display: none;">
                    <br />
                    <center>Please select an option</center>
                </span>
                <div class="divRow">
                    Action:
                    <%--                    <div id="statusActionDiv">

                    </div>--%>
                    <select id="statusAction" name="statusDropDown" class="styledselect_form_1" style="width: 100px; margin-left: 30px;">
                    </select>
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 27px;">
                        <div>
                            <input class="btnDetailsSubmit" name="btnDetailsSubmit" type="button" value="Approve" style="margin-left: 60px;" />
                        </div>
                    </div>
                    <div class="divColumn" style="width: 55px;">
                        <div>
                            <input class="btnDetailsCancel" name="btnDetailsCancel" type="button" value="Cancel" style="margin-left: 25px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<%--    <div>
        <h1>Total Month Plan</h1>
        <p style="float: right; position: relative; right: 10px; top: -10px;">
            <input type="button" value="Approve All Plans" id="ApproveMultiplePlansBtn" name="btnApprove" class="btnsaless" style="visibility: hidden" />
        </p>
    </div>--%>

    <div id="SuccessSMS" style="width:100%">
    </div>
<%--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>--%>
</asp:Content>
