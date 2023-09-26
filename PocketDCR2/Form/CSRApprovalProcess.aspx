<%@ Page Title="CSR Approval Process" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" 
    CodeBehind="CSRApprovalProcess.aspx.cs" Inherits="PocketDCR2.Form.CSRApprovalProcess" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />

    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link href="assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

   
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal1.css" rel="stylesheet" type="text/css" />


   
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
        th{
            padding:5px;
        }
        #ModelLevels{
            width:auto;
            margin: 141px;
        }
        #ModelConfirm {
            margin-left: 493px;
            margin-top: 200px;
            width: 335px;
        }
        #ModelConfirmBody{
            padding: 20px;
        }
        .divgrid{
            width:1300px;
            overflow:auto;
        }
        /*#tbl-border-top{
           z-index :1 !important;
        }*/

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
                                    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>

                <div class="jqmOverlay" id="jqmOverlay" style="height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 2999; opacity: 0.6;"></div>
                <div class="pop_box-outer jqmWindow jqmID1" id="dialosag" style="display: block; z-index: 3000;">
        <div class="loading">
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="pop_box-outer jqmWindow" id="">
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
                                        <asp:Label ID="Label5" name="Label5" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label6" name="Label6" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label7" name="Label7" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label8" name="Label8" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label11" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
                                    </th>
                                    <th>
                                        <asp:Label ID="Label12" name="Label10" ClientIDMode="Static" runat="server"></asp:Label>
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
                            </table>

                            <table border="0" cellpadding="10" cellspacing="0" id="Table1">
                                <tr>

                                    <th valign="top" id="Th55">Starting Date
                                    </th>
                                    <th valign="top" id="Th66">Ending Date
                                    </th>

                                    <th valign="top" id="Th77">Status</th>
                                    <th></th>

                                </tr>
                                <tr>


                                    <th valign="top" id="Th5">
                                        <%--<input id="stdate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />--%>
                                        <asp:TextBox ID="stdate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender1" TargetControlID="stdate" runat="server">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th6">
                                        <%--<input id="enddate" type="text" class="inp-form" runat="server" clientidmode="Static"
                                            readonly="readonly" />--%>
                                        <asp:TextBox ID="enddate" ClientIDMode="Static" runat="server"></asp:TextBox>
                                        <asp:CalendarExtender ID="CalendarExtender2" TargetControlID="enddate" runat="server">
                                        </asp:CalendarExtender>
                                    </th>
                                    <th valign="top" id="Th7">
                                        <select id="FormStatus" name="FormStatus" class="styledselect_form_1">
                                            <option value="-1">All</option>
                                            <option value="1">Approved</option>
                                            <option value="2">Not Approved</option>
                                        </select>
                                    </th>
                                    <th>
                                         <asp:Button ID="btnSearch" runat="server" ClientIDMode="Static" Text="Search" OnClick="btnSearch_Click" OnClientClick="assignvalues()"/>
                                       <%-- <button id="dsada" onclick="btnCSRData();return false;">
                                            Search
                                        </button>--%>
                                        <%--<asp:HiddenField ID="level1" runat="server" />
                                        <asp:HiddenField ID="level2" runat="server" />
                                        <asp:HiddenField ID="level3" runat="server" />
                                        <asp:HiddenField ID="level4" runat="server" />
                                        <asp:HiddenField ID="level5" runat="server" />
                                        <asp:HiddenField ID="level6" runat="server" />
                                        <asp:HiddenField ID="employeeID" runat="server" />
                                        <asp:HiddenField ID="SstartDate" runat="server" />
                                        <asp:HiddenField ID="SendDate" runat="server" />--%>
                                    </th>

                                </tr>
                            </table>                                    <%--<asp:UpdatePanel ID="UpdatePanel2" runat="server">
            <Triggers>
            </Triggers>
            <ContentTemplate>
                </ContentTemplate>
                                </asp:UpdatePanel>--%>

                                       

                            <div class="divgrid">
                                <obout:Grid ID="yay" runat="server" Serialize="false" AutoGenerateColumns="false"
                                    AllowFiltering="true" AllowSorting="true" AllowPaging="true" AllowAddingRecords="false"
                                    FolderStyle="../Styles/GridCss" AllowPageSizeSelection="false" OnRowDataBound="Grid1_RowDataBound">


                                    <Columns>
                                           <obout:Column ID="colEdit" runat="server" Width="75">
                                <TemplateSettings TemplateId="EditedTemplate" />
                            </obout:Column>
                                        
                                          <obout:Column ID="colApproved" runat="server" Width="75">
                                <TemplateSettings TemplateId="ApprovedTemplate" />
                            </obout:Column>
                                         <obout:Column Width="120" DataField="csrmaindataid" HeaderText="CSR-No" SortExpression="csrmaindataid"/>
                                           <obout:Column Width="120" DataField="RequiredOn" HeaderText="Required On" SortExpression="RequiredOn" />
                                        <obout:Column Width="120" DataField="EmployeeName" HeaderText="Employee Name" SortExpression="EmployeeName" />
                                          <obout:Column Width="120" DataField="DoctorId" HeaderText="Doctor ID" SortExpression="DoctorId" />
                                        <obout:Column Width="120" DataField="DoctorCode" HeaderText="Doctor Code" SortExpression="DoctorCode" />
                                        <obout:Column Width="120" DataField="DoctorName" HeaderText="Doctor Name" SortExpression="DoctorName" />


                                        <obout:Column Width="170" DataField="Designation" HeaderText="Designation" SortExpression="Designation" />
                                        <obout:Column Width="140" DataField="DoctorSpeciality" HeaderText="Doctor Speciality" SortExpression="DoctorSpeciality" />


                                      

                                          <obout:Column Width="120" DataField="Level1IdStatus" HeaderText="Division" SortExpression="Level1IdStatus" />
                                          <obout:Column Width="140" DataField="Level1IdComments" HeaderText="Division Comments" SortExpression="Level1IdComments" />
                                          <obout:Column Width="120" DataField="Level2IdStatus" HeaderText="HMS/GM" SortExpression="Level2IdStatus" />
                                          <obout:Column Width="140" DataField="Level2IdComments" HeaderText="HMS/GM Comments" SortExpression="Level2IdComments" />
                                          <obout:Column Width="120" DataField="Level3IdStatus" HeaderText="Team" SortExpression="Level3IdStatus" />
                                          <obout:Column Width="140" DataField="Level3IdComments" HeaderText="Team Comments" SortExpression="Level3IdComments" />
                                          <obout:Column Width="120" DataField="Level4IdStatus" HeaderText="Region" SortExpression="Level4IdStatus" />
                                          <obout:Column Width="140" DataField="Level4IdComments" HeaderText="Region Comments" SortExpression="Level4IdComments" />
                                          <obout:Column Width="120" DataField="Level5IdStatus" HeaderText="District" SortExpression="Level5IdStatus" />
                                          <obout:Column Width="140" DataField="Level5IdComments" HeaderText="District Comments" SortExpression="Level5IdComments" />
                                     
                                       
                                        <obout:Column Width="120" DataField="BTNVisible" HeaderText="BTNVisible" SortExpression="BTNVisible" Visible="false"/>
                                        
                                       
                                        
                            <%--<obout:Column ID="colDeactiveEmployee" runat="server" Width="80">
                                <TemplateSettings TemplateId="DeactiveEmployeeTemplate" />
                            </obout:Column>
                            <obout:Column Width="120" DataField="hrLevel1LevelId" HeaderText="hrLevel1LevelId" SortExpression="hrLevel1LevelId" Visible="false"/>
                            <obout:Column Width="120" DataField="hrLevel2LevelId" HeaderText="hrLevel2LevelId" SortExpression="hrLevel2LevelId" Visible="false"/>
                             --%>           

                                        <%-- <obout:Column Width="100" AllowDelete="true" />--%>
                                    </Columns>
                                      <%--  <ClientSideEvents OnBeforeClientEdit="oGrid_Edit" />--%>
                       <GroupingSettings AllowChanges="false" />
                                    <Templates>
                            <obout:GridTemplate ID="EditedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButton1" runat="server" class="ob_gAL">View</asp:LinkButton>

                                </Template>
                            </obout:GridTemplate>

                            <obout:GridTemplate ID="ApprovedTemplate" runat="server" ControlID="" ControlPropertyName="">
                                <Template>
                                    <asp:LinkButton ID="LinkButtonApproved" runat="server" class="ob_gAL">Approve</asp:LinkButton>
                                </Template>
                            </obout:GridTemplate>
                        </Templates>
                                </obout:Grid>
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

            </ContentTemplate>
                                        </asp:UpdatePanel>
      <!-- View Region Modal -->
    <div id="FTMRegionsModal" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog" id="ModelLevels">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h4 class="modal-title">View</h4>
                </div>
                <div class="modal-body ">
                    <div class="summaryBody"></div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>


      <div id="divConfirmation" class="modal fade" role="dialog" style="display: none;">
        <div class="modal-dialog" id="ModelConfirm">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background: #b73a3c; color: #fff;">
                    <h5 class="modal-title"> Confirmation Window</h5>
                </div>
                <div class="modal-body " id="ModelConfirmBody">
                 

                         <div class="divEdit">
            <div class="divTable">
                 <div class="divRow">
                   <textarea id="LevelComment" style="margin: 0px; width: 288px; height: 50px;" placeholder="Comment...."></textarea>
                </div>
                <center>
                <div class="divRow">
                    Are you sure to approved this record(s)?
                </div>
                  
                <div class="divRow">
                   <table>
                       
                       <tr>
                           <th>  <div>
                            <input id="btnApprovedYes" name="btnApprovedYes" type="button" value="Yes" />
                        </div></th>
                            <th> <div>
                            <input id="btnApprovedNo" name="btnApprovedNo" type="button" value="No" />
                        </div></th>
                       </tr>
                   </table>
                      
                   
                       
                    
                </div>
                      </center>
            </div>
        </div>
                    </div>

                
              
            </div>

        </div>
    </div>
   <%--   <div id="divConfirmation" class="jqmConfirmation">
        <div class="jqmTitle">
            Confirmation Window
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="divRow">
                    Are you sure to delete this record(s)?
                </div>
                <div class="divRow">
                    <div class="divColumn" style="margin-left: 70px;">
                        <div>
                            <input id="btnDeleteYes" name="btnDeleteYes" type="button" value="Yes" />
                        </div>
                    </div>
                    <div class="divColumn">
                        <div>
                            <input id="btnDeleteNo" name="btnDeleteNo" type="button" value="No" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>

  
    <%--  <script type="text/javascript" src="assets_new/jquery-1.12.4.js"></script>--%>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>

    <script type="text/javascript" src="assets_new/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script type="text/javascript" src="assets_new/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script type="text/javascript" src="assets_new/bower_components/fastclick/lib/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script type="text/javascript" src="assets_new/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
 
  <%-- <script type="text/javascript" src="assets_new/bootstrap.min.js"></script>--%>
 
    <script type="text/javascript" src="assets_new/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="assets_new/responsive.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.validate.min.js"></script>
    <script type="text/javascript" src="assets_new/additional-methods.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery-ui.js"></script>
<%--     <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>--%>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
     <script type="text/javascript" src="../Scripts/jquery-1.4.4.js"></script>
            <script type="text/javascript" src="assets_new/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script type="text/javascript" src="assets_new/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<%--      <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>--%>
    <script src="CSRApprovalRequisition.js" type="text/javascript"></script>

   
</asp:Content>

