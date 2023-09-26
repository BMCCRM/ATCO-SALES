<%@ Page Title="Leave Management" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true"
    CodeBehind="datagrid2.aspx.cs" Inherits="PocketDCR2.Reports.datagrid2" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../Styles/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/normalize.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo_table_jui.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/LayOut.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/default/jsdialog.css" rel="stylesheet" type="text/css" />
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

    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script src="../Scripts/default/jsdialog.min.js" type="text/javascript"></script>
    <script src="griddata2.js" type="text/javascript"></script>
    <%-- <script src="NewDashboard.js" type="text/javascript"></script>--%>
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

        #btndlt, #btnSEarch, #btnSave {
            color: wheat;
            border: 0px;
            padding: 10px 25px;
            border-radius: 4px;
            margin-bottom: 10px;
            margin-right: 10px;
        }

            #btndlt:hover, #btnSEarch:hover, #btnSave:hover {
                cursor: pointer;
            }

        #btndlt {
            background: #D40019;
        }

        #btnSave {
            background: #85C249;
        }

        #btnSEarch {
            background: #18A5D5;
        }

        .mainContentLoader {
            margin: 30px;
        }

        input#Sdatee {
    width: 11rem;
    height: 29px;
}

        input#txtDescription {
    height: 29px;
font-weight:bold;
}
        input#btnn {
    width: 8rem;
    height: 29px;
    background-color: #24a0ed;
    font-weight: bold;
    color: white;
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
    <div class="divLodingGrid" style="height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 2999; opacity: 0.6; background: rgb(0, 0, 0); display: none;"></div>
    <div class="page_heading">
        <h1>Leave Plan Management</h1>

        <asp:HiddenField ID="HiddenField1" runat="server" ClientIDMode="Static" />
    </div>
    <div class="pop_box-outer jqmWindow" id="dialog" style="z-index: 29999">

        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div id="content" style="margin-top: -14px;">
        <div class="clear">
        </div>
        <div id="divGrid1" class="popup_box">
            <table border="0" width="100%" cellpadding="0" cellspacing="0" id="content-table"
                style="margin-top: 15px;">
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
                        </div>



                        <!--  start content-table-inner -->
                        <div id="content-table-inner">


                            <table border="0" cellpadding="10" cellspacing="0" id="fdform">
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
                                        <select id="ddl1" name="ddl1" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col22">
                                        <select id="ddl2" name="ddl2" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col33">
                                        <select id="ddl3" name="ddl3" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col44">
                                        <select id="ddl4" name="ddl4" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col55">
                                        <select id="ddl5" name="dd5" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="col66">
                                        <select id="ddl6" name="dd6" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <asp:Label ID="Label5" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label6" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label7" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label8" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <%-- <th>
                                        <asp:Label ID="Label9" name="Label9" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label10" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>--%>
                                    <th>
                                        <asp:Label ID="Label11" name="Label11" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label12" name="Label12" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                </tr>
                                <tr>
                                    <th valign="top" id="g1">
                                        <select id="dG1" name="dG1" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g2">
                                        <select id="dG2" name="dG2" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g3">
                                        <select id="dG3" name="dG3" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g4">
                                        <select id="dG4" name="dG4" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g5">
                                        <select id="dG5" name="dG5" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="g6">
                                        <select id="dG6" name="dG6" class="styledselect_form_1 txtbox">
                                            <option value="-1">Select...</option>
                                        </select>
                                    </th>
                                </tr>
                                <%--                   <tr>
                        <th>
                                        <asp:Label ID="Labeldate" name="Labeldate" ClientIDMode="Static" runat="server">Filter By Year - Month :</asp:Label>
                                    </th>
                   </tr>--%>
                                <%--   <tr>
                        <th valign="top" id="g5">
                                      <asp:TextBox ID="txtDate" runat="server" ClientIDMode="Static" AutoPostBack="false"
                                                    CssClass="inp-form txtbox" />
                                                <asp:TextBoxWatermarkExtender ID="wTextDate" runat="server" ClientIDMode="Static"
                                                    TargetControlID="txtDate" WatermarkText="Enter Year - Month" />
                                                <asp:CalendarExtender ID="cTextDate" runat="server" ClientIDMode="Static" OnClientHidden="onCalendarHidden"
                                                    OnClientShown="onCalendarShown" BehaviorID="calendar1" Enabled="True" Format="MMMM-yyyy"
                                                    TargetControlID="txtDate">
                                                </asp:CalendarExtender>
                                    </th>
                         <th valign="top" id="g6" ">
                             <input type='button' id='btnSearch' value=' Search '  class="btnnor ani"  />&nbsp;&nbsp;&nbsp;
                           <%--  <input type='button' id='btnSetbalance' value=' Set balance ' class="btnnor ani"   />
                             </th>

                         
                   </tr>--%>
                            </table>


                            <%--   <table border="0" width="100%" cellpadding="0" cellspacing="0" id="fdform1">
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
                                                        sdf
                                                    </div>
                                                </th>
                                                <th valign="top" id="col6">
                                                    <div class="divcol">
                                                        rr
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
                                                    <select id="ddl6" name="ddl6" class="styledselect_form_1">
                                                        <option value="-1">Select...</option>
                                                    </select>
                                                </th>
                                            </tr>
                                        </table>
                                        <!-- end id-form  -->
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../images/form/blank.gif" width="695" height="1" alt="blank" />
                                    </td>
                                    <td>
                                    </td>
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
                                      <span>five</span>
                                    </th>
                                    <th>
                                      <span>six</span>
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
                            </table>--%>







                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>

                                    <th style="display:none">
                                        <span>Filter by ZSM/MIO</span>
                                    </th>
                                    <th>
                                        <span>Leave Type</span>
                                    </th>
                                    <th valign="top" id="Th23" class="auto-style2">Date
                                    </th>
                                    <th valign="top" id="Th22" class="auto-style2" style="display:none;">Date To
                                    </th>
                                    <th valign="top" id="Th22" class="auto-style3">Description</th>




                                </tr>
                                <tr>
                                    <%--<th valign="top" id="Th1">
                                        <select id="ddlMio" name="ddlMio" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>--%>

                                    <th valign="top" id="g51" style="display:none">
                                        <select id="ddl7" name="ddl7" class="styledselect_form_1">
                                            <option value="-1">Select Filter</option>
                                            <option value="1">All</option>
                                            <option value="2">ZSM</option>
                                            <option value="3">MIO</option>
                                        </select>
                                    </th>

                                    <th valign="top" id="g61">
                                        <select id="ddl8" name="ddl8" class="styledselect_form_1" onchange="OnChangeddl8()">
                                            <option value="-1">Select Leave Type</option>
                                            <option value="1">Public Holiday</option>
                                            <option value="2">Leave</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th2">

                                        <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server" onchange="ValidateDate()"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th3" style="display:none;">
                                        <%--<input id="stdate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />--%>
                                        <asp:TextBox ID="stdateto" ClientIDMode="Static" runat="server" onchange="ValidateDate()"></asp:TextBox>
                                        <asp:CalendarExtender ID="stdateto_CalendarExtender" TargetControlID="stdateto" runat="server">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th4">
                                        <asp:TextBox ID="description" ClientIDMode="Static" runat="server" Height="40px" TextMode="MultiLine" MaxLength="250" Rows="5" Columns="40"></asp:TextBox>

                                    </th>
                                    <th valign="top" id="Th6">
                                        <input type="button" name="btnSEarch" id="btnSEarch" value="Search" onclick="onclick_btnSearch();" />
                                    </th>
                                    <th valign="top" id="Th7">
                                        <input type="button" name="btnSave" id="btnSave" value="Save" onclick="onclick_btn();" />
                                    </th>
                                </tr>
                                    <tr>
                                    
                                    <th>
                                                                                <label for="html" id="lbdesc">Date:</label>   

                                    </th>

                                    <th>
                                                                                <label for="html" id="lbdate">Description:</label>        
     
                                    </th>                                  
                                </tr>

                                <tr>
                                    
                                    <th>
                                        <input type="date" id="Sdatee" name="Holiday" />
                                    </th>

                                    <th>
                                        <input type="text" id="txtDescription" value="Public Holiday" readonly name="Description"  />
                                    </th>


                                    <td>
                                       <input type="button"  name="btn" id="btnn" value="Submit" onclick="onclick_btn1();" />
                                   </td>
                                </tr>
                                



                            </table>
                            <div class="clear">
                            </div>
                        </div>
                        <!--  end content-table-inner  -->




                        <%--     <div id="content-table-inner">
                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>
                                    <th valign="top" id="Th11">
                                        Employees :
                                    </th>
                                    <th valign="top" id="Th22">
                                        Date
                                    </th>
                                </tr>
                                <tr>
                                    <th valign="top" id="Th1">
                                        <select id="ddlMio" name="ddlMio" class="styledselect_form_1">
                                            <option value="0">Select...</option>
                                        </select>
                                    </th>
                                    <th valign="top" id="Th2">
                                      
                                        <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th6">
                                        <input type="button" name="btnSEarch" id="btnSEarch" value="Search" onclick="onclick_btnSearch();" />
                                    </th>
                                    <th valign="top" id="Th3">
                                        <input type="button" name="btnSave" id="btnSave" value="Save" onclick="onclick_btn();" />
                                    </th>
                                </tr>
                            </table>
                            <div class="clear">
                            </div>
                        </div>--%>
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

    <div class="mainContentLoader">
        <h1>Total Month Plan
        </h1>
        <div id="dltbtn" style="float: right; margin-right: 0px; display: none;">
            <input type="button" name="btndlt" id="btndlt" value="Delete ALL" onclick="onclick_deketeall();" /></div>
        <div id="SuccessSMS">
        </div>

    </div>

    <div id="#imgLoading"></div>
</asp:Content>
