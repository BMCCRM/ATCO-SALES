<%@ Page Title="Reports" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="newReports.aspx.cs" Inherits="PocketDCR2.Reports.newReports" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="../Styles/jquery.ui.base.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />--%>

    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ui.widget.js"></script>
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>   
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="newReports.js" type="text/javascript"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <link href="../assets/Select2/select2.min.css" rel="stylesheet" type="text/css" />
    <script src="../assets/Select2/select2.full.js" type="text/javascript"></script>

    <style type="text/css">
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

    <!--[if gt IE 6]><style type="text/css">
        #content, #content-table{min-height:600px !important;margin:0 !important;position:relative !important;}
        #dsada{padding:10px 5px;}
        #fdform, #Table1{min-height:100px;}
        .iFrameContainer{position:relative;z-index99999999;top:20px;}
    </style>
<![endif]-->
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
            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table" style="margin-top: 15px;">
                <%--position: relative !important; top: 150px;z-index:99999999999;--%>

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
                            <select id="ddlreport" name="ddlreport" class="styledselect_form_1111">
                                <option value="-1">Select Report</option>
                          <option value='97'>Incentive Report</option>
                                <!--<option value="2">Described Products</option>
                                <option value="3">Detailed Products Frequency</option>
                                <option value="4">Detailed Products Frequency By Division</option>
                                <option value="5">Incoming SMS Summary</option>
                                <option value="6">JV By Class</option>-->

<%--                                <option value="7">KPI By Class</option>--%>

                                <!--<option value="8">Message Count</option>-->
                                <!--<option value="10">MR SMS Accuracy</option>-->

                    <%--            <option value="11">MR Doctors</option>
                                <option value="12">MR Report</option>
                                <option value="89">Employees Profile Report</option>--%>

                                <%--<option value="13">Sample Issued To Doctor</option>
                                <option value="14">SMS Status</option>
                                <option value="15">Visit By Time</option>
                                <option value="16">Detailed JV Report</option>
                                <option value="17">JV By Region</option>
                                <option value="18">Planning Monitor Report</option>
                                <option value="19">Monthly Visit Analysis With Planning</option>
                                <option value="21">Planning Report For JV</option>
                                <option value="23">Detail Work Plan Report</option>
                                <option value="24">Forecasted KPI By Class With Planning</option>
                                <option value="25">Monthly Visit Analysis With Draft Planning</option>
                                <option value="26">Coaching Calls With FLM</option>
                                <option value="31">Login Details With DateTime</option>
                                <option value="35">List of Target CustomersExcel</option>
                                <option value="36">Commercial Report Excel</option>
                                <option value="37">Speciality Wise Calls Report</option>
                                <option value="38">Sale Feedback FMO Report</option>
                                <option value="39">Sale Feedback FLM Report</option>
                                <option value="40">Call Status Report With Date</option>
                                <option value="41">Call Status Report With MTD</option>
                                <option value="42">Field Work Report With Date</option>
                                <option value="43">Field Work Report With MTD</option>
                                <option value="44">Samples Inventory Report</option>--%>

<%--                                <option value="45">Employees Summary Report</option>--%>

                                <%--<option value="47">E-Detailing Report</option>
                                <option value="48">MR Doctor Location</option>--%>

<%--                                <option value="49">Doctor Tagging report</option>--%>

                                <%--<option value="50">Sales Officer Call Reason Report</option>--%>

                               <%-- <option value="51">Day View Report</option>
                                <option value="52">Plan Status Report</option>--%>

                                <%--<option value="53">Quiz Test Report</option>
                                <option value="54">Quiz Test Total Attempts Report</option>
                                <option value="55">Quiz Test Ratio Report</option>--%>

<%--                                <option value="56">Zero Call Report</option>
                                <option value="57"><%--MR Other Activity Report--%> <%--Activity Execution Report</option>--%>

                                <%--<option value="58">Call Execution Details Report</option>--%>

                           <%--     <option value="59">MR Call Reason Report</option>--%>

                                <%--<option value="60">MR Best Rating Report</option>
                                <option value="61">Customer Not Visited BY MR</option>--%>

<%--                                <option value="62">MTD Call Report</option>
                                <option value='90'>ATTENDANCE REPORT</option><%--MTD Call Report For Excel--%>
                               <%-- <option value="65">MR Doctor Count</option>
                                <option value="66">SFE Performance Summary Report</option>
                                <option value="67">SFE Performacne Detail Report</option>
                                <option value="68">Monthly Visit Report (Detailed)</option>
                                <option value="69">Unvisited Doctor Report</option>
                                <option value="71">Monthly Expense Report</option>
                                <option value="72">Contact Point Report</option>
                                <option value="73">Monthly Visit Analysis (Summary)</option>--%>

                                <%--<option value="74">Expense Team Summary Report</option>
                                <option value="75">Expense Summary of Deduction Report</option>
                                <option value="76">Master Expense Report</option>
                                <option value="77">Summary Selling Expense Report</option>
                                <option value="78">Summary Marketing Expense Report</option>--%>

                                

<%--                                <option value="79">Territory Coverage Report</option>--%>
                                <%--<option value='80'>Expense Tally Report</option>
                                <option value="70">Fake GPS User Report Details</option>
                                <option value="63">Product Wise Priority Calls Details</option>
                                <option value="64">MR Best Rating Report Details</option>
                                <option value="46">FMO Feedback Report</option>
                                <option value="28" id="rptUserList">CRM User List</option>--%>

<%--                                <option value='81'>No Contact Point Report</option>
                                <option value='83'>Joint Visit Report</option>
                                <option value='88'>Up country Vs Local Working</option>
                                <option value='91'>Work Plan By SPO in Excel</option>
                                <option value='92'>Work Plan By DSM in Excel</option>
                                <option value='93'>Work Plan By SM in Excel</option>--%>
                                <%--<option value='94'>Distributor Profiling</option>--%>
<<<<<<< HEAD
                                 <option value='95'>Leave Report For HR</option>
                                <option value='96'>Meeting By Admin</option>
                                <option value='97'>Incentive Report</option>
=======
<%--                                 <option value='95'>Leave Report For HR</option>
                                <option value='96'>Meeting By Admin</option>--%>
                                
>>>>>>> 731d9c45c72dda7aeb3eff45367cc39c934b7b7d

                            </select>

                            <%--<input id="btnGreports" type="button" value="button" onclick="btnGreports()" />--%>

                            <button id="dsada" onclick="btnGreports();return false; ">
                                Generate Report
                            </button>
                        </div>

                        <div id="content-table-inner">
                            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="fdform1">
                                <tr valign="top">
                                    <td valign="top">
                                        <!-- start id-form -->
                                        <table border="0" cellpadding="10" cellspacing="0" id="fdform">
                                            <tr>
                                                <th>
                                                    <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label7" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th class="Th112">
                                                    <asp:Label ID="Label13" name="Label13" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label8" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label11" name="Label11" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                                <th>
                                                    <asp:Label ID="Label12" name="Label12" ClientIDMode="Static" runat="server"></asp:Label>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th valign="top" id="g1">
                                                    <select id="dG1" name="dG1" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g2">
                                                    <select id="dG2" name="dG2" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>

                                                <th valign="top" id="g3">
                                                    <select id="dG3" name="dG3" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" class="Th12" id="g7">
                                                    <select id="dG7" name="dG7" class="styledselect_form_1">
                                                        <option value="-1">Select Team</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g4">
                                                    <select id="dG4" name="dG4" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g5">
                                                    <select id="dG5" name="dG5" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                                <th valign="top" id="g6">
                                                    <select id="dG6" name="dG6" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
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

                            <table border="0" cellpadding="10" cellspacing="0" id="id-fo" style="font-weight: bold">
                                <tr>
                                    <th valign="top" id="col1">
                                        <div class="divcol">
                                            <asp:Label ID="Label1" name="Label1" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col2">
                                        <div class="divcol">
                                            <asp:Label ID="Label2" name="Label2" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>

                                    <th valign="top" id="col3">
                                        <div class="divcol">
                                            <asp:Label ID="Label3" name="Label3" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="divcol Th112">
                                            <asp:Label ID="Label14" name="Label14" ClientIDMode="Static" runat="server"></asp:Label>
                                        </div>
                                    </th>
                                    <th valign="top" id="col4">
                                        <div class="divcol">
                                            <asp:Label ID="Label4" name="Label4" ClientIDMode="Static" runat="server"></asp:Label>
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
                                </tr>
                                <tr>
                                    <th valign="top" id="col11">
                                        <select id="ddl1" name="ddl1" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col22">
                                        <select id="ddl2" name="ddl2" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="col33">
                                        <select id="ddl3" name="ddl3" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" class="Th12" id="col77">
                                        <select id="ddlTeam" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="col44">
                                        <select id="ddl4" name="ddl4" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col55">
                                        <select id="ddl5" name="ddl5" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col66">
                                        <select id="ddl6" name="ddl6" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>
                            </table>

                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>
                                    <th valign="top" id="Th11">Doctor</th>
                                    <th valign="top" id="Th22">Product</th>
                                    <th valign="top" id="Th33">Visit Time</th>
                                    <th valign="top" id="Th88" style="display: none;">Select Freeze Status</th>
                                    <th valign="top" id="Th99">Leave Type </th>
                                    <th valign="top" id="Th44">Joint Visit</th>
                                    <th valign="top" id="Th55">Starting Date</th>
                                    <th valign="top" id="Th66">Ending Date</th>
                                    <th valign="top" id="Th77" style="display: none;">Select Quiz Status :</th>
                                    <th valign="top" id="ThStatus" style="display: none;">Emp Status</th>
                                    <th valign="top" id="ThEmpType" style="display: none;">Emp Type</th>
                                    <th valign="top" id="ThDesign" style="display: none;">Designation</th>
                                </tr>
                                <tr>
                                    <th valign="top" id="Th1">
                                        <select id="ddlDR" name="ddlDR" class="styledselect_form_1">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th2">
                                        <select id="ddlProduct" name="d2" class="styledselect_form_1">
                                            <%-- <option value="-1">Select...</option>--%>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th3">
                                        <select id="VT" name="VT" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">M</option>
                                            <option value="2">E</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th4">
                                        <select id="Jv" name="b2" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">Joint </option>
                                            <option value="2">Un-Joint </option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th8" style="display: none;">
                                        <select id="FreezeStatus" name="FreezeStatus" class="styledselect_form_1">
                                            <option value="Freeze">Freeze Date</option>
                                            <option value="Unreeze">Unfreeze Date</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th9">
                                        <select id="LeaveDLL" name="LeaveDLL" class="styledselect_form_1" style="display: none;">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th5">
                                        <%--<input id="stdate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />--%>
                                        <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server" Format="dd/MM/yyyy">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th6">
                                        <%--<input id="enddate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />--%>
                                        <asp:TextBox ID="enddate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="enddate" runat="server" Format="dd/MM/yyyy">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th7" style="display: none;">
                                        <select id="FormStatus" name="FormStatus" class="styledselect_form_1">
                                            <option value="Not Submitted">Not Submitted</option>
                                            <option value="Started">Started but not submitted</option>
                                            <option value="Finished">Submitted</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="ThStatuss" style="display: none;">
                                        <select id="EmpStatus" name="EmpStatus" class="styledselect_form_1">
                                            <option value="-1">Select</option>
                                            <option value="1">Active</option>
                                            <option value="0">Deactive</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="ThEmpTypee" style="display: none;">
                                        <select id="EmpType" name="EmpType" class="styledselect_form_1">
                                            <option value="-1">Select</option>
                                            <option value="All">All</option>
                                            <option value="DSM">DSM</option>
                                            <option value="SM">SM</option>
                                            <option value="SPO">SPO</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="Th10" style="display: none;">
                                        <select id="visitshift" name="visitshift" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">Morning</option>
                                            <option value="2">Evening</option>
                                            <option value="3">Both</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="thDesig" style="display: none;">
                                        <select id="ddlDesig" name="ddlDesig" class="styledselect_form_1" style="width: 200px">
                                            <option value="-1">Select...</option>
                                            <option value="SPO">SPO</option>
                                            <option value="Vacant">Vacant</option>
                                            <option value="DSM">DSM</option>
                                            <option value="SM">SM</option>
                                        </select>
                                    </th>
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
        </div>
    </div>

    <div class="iFrameContainer">
        <asp:Label ID="lblError" runat="server" Text=""></asp:Label>
        <iframe id="Reportifram" height="100%" width="100%" frameborder="0"></iframe>
    </div>
</asp:Content>
