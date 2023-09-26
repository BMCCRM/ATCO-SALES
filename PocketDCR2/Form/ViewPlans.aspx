<%@ Page Title="View Plans" Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPages/Home.Master" CodeBehind="ViewPlans.aspx.cs" Inherits="PocketDCR2.Form.ViewPlans" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <link href="../Styles/datepicker_new.css" rel="stylesheet" type="text/css" />
      <script type="text/javascript" src="../Scripts/jquery.ui.datepicker.js"></script>
    <%--<script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>--%>
    <%--<link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="AppConfigurationJs.js" type="text/javascript"></script>--%>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <style type="text/css">
        .pagination-ys {
            /*display: inline-block;*/
            padding-left: 0;
            margin: 20px 0;
            border-radius: 4px;
        }

            .pagination-ys table > tbody > tr > td {
            }

                .pagination-ys table > tbody > tr > td > a,
                .pagination-ys table > tbody > tr > td > span {
                    position: relative;
                    float: left;
                    padding: 8px 12px;
                    line-height: 1.42857143;
                    text-decoration: none;
                    color: #dd4814;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    margin-left: -1px;
                }

                .pagination-ys table > tbody > tr > td > span {
                    position: relative;
                    float: left;
                    padding: 8px 12px;
                    line-height: 1.42857143;
                    text-decoration: none;
                    margin-left: -1px;
                    z-index: 2;
                    color: #aea79f;
                    background-color: #f5f5f5;
                    border-color: #dddddd;
                    cursor: default;
                }

                .pagination-ys table > tbody > tr > td:first-child > a,
                .pagination-ys table > tbody > tr > td:first-child > span {
                    margin-left: 0;
                    border-bottom-left-radius: 4px;
                    border-top-left-radius: 4px;
                }

                .pagination-ys table > tbody > tr > td:last-child > a,
                .pagination-ys table > tbody > tr > td:last-child > span {
                    border-bottom-right-radius: 4px;
                    border-top-right-radius: 4px;
                }

                .pagination-ys table > tbody > tr > td > a:hover,
                .pagination-ys table > tbody > tr > td > span:hover,
                .pagination-ys table > tbody > tr > td > a:focus,
                .pagination-ys table > tbody > tr > td > span:focus {
                    color: #97310e;
                    background-color: #eeeeee;
                    border-color: #dddddd;
                }

        /*a {
                  color: #337ab7;
                  text-decoration: none;
}*/
    </style>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />

    <!-- Latest compiled and minified JavaScript -->
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style type="text/css">
        table.blueTable {
            border: 1px solid #1C6EA4;
            background-color: #EEEEEE;
            width: 100%;
            text-align: left;
            border-collapse: collapse;
        }

            table.blueTable td, table.blueTable th {
                border: 1px solid #AAAAAA;
                padding: 3px 2px;
            }

            table.blueTable tbody td {
                font-size: 13px;
            }

            table.blueTable tr:nth-child(even) {
                background: #EFEDE2;
            }

            table.blueTable thead {
                background: #F7F7F7;
                background: -moz-linear-gradient(top, #f9f9f9 0%, #f7f7f7 66%, #F7F7F7 100%);
                background: -webkit-linear-gradient(top, #f9f9f9 0%, #f7f7f7 66%, #F7F7F7 100%);
                background: linear-gradient(to bottom, #f9f9f9 0%, #f7f7f7 66%, #F7F7F7 100%);
                border-bottom: 2px solid #D99E00;
            }

                table.blueTable thead th {
                    font-size: 15px;
                    font-weight: bold;
                    color: #000000;
                    text-align: center;
                    border-left: 2px solid #D0E4F5;
                }

                    table.blueTable thead th:first-child {
                        border-left: none;
                    }

            table.blueTable tfoot {
                font-size: 14px;
                font-weight: bold;
                color: #FFFFFF;
                background: #EFEDE2;
                background: -moz-linear-gradient(top, #f3f1e9 0%, #f0eee5 66%, #EFEDE2 100%);
                background: -webkit-linear-gradient(top, #f3f1e9 0%, #f0eee5 66%, #EFEDE2 100%);
                background: linear-gradient(to bottom, #f3f1e9 0%, #f0eee5 66%, #EFEDE2 100%);
                border-top: 2px solid #444444;
            }

                table.blueTable tfoot td {
                    font-size: 14px;
                }

                table.blueTable tfoot .links {
                    text-align: right;
                }

                    table.blueTable tfoot .links a {
                        display: inline-block;
                        background: #D99E00;
                        color: #FFFFFF;
                        padding: 2px 8px;
                        border-radius: 5px;
                    }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <Triggers>
            </Triggers>

            <ContentTemplate>
                <asp:Button ID="btnRefresh" runat="server" Text="Relaod" ClientIDMode="Static" Style="display: none;" />
                <div class="page_heading">
                    <h1>
                        <img alt="" src="../Images/Icon/1330776545_product-sales-report.png" />
                        View Plans</h1>
                </div>

                <!-- !-!------------------------PAGE START----------------------------------------!-! -->


                <div class="wrapper-inner">

                    <!-- !-!------------------------TABLE START------------ -->
                    <div class="inner-head">
                        <h2>
                            <span class="spacer">&nbsp;</span>FMO Plans Management</h2>
                    </div>
                    <div class="container">
                        <div class="row">


                            <div class="col-md-12">


                                <h4>Plans Listed For The Current Month</h4>
                                <div class=""></div>
                                <div class="container">
                                    <div class="row">
                                        <%-- <select class="dropdown">
                                            <option selected="selected">Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>--%>
                                          
                                      
                                        <asp:DropDownList runat="server" AutoPostBack="true" OnSelectedIndexChanged="refreshGrid" ID="employeesList"
                                            DataSourceID="dsFillRespectiveEmployees" DataTextField="EmployeeName" DataValueField="EmployeeId">
                                        </asp:DropDownList>
                                        <asp:SqlDataSource runat="server" ID="dsFillRespectiveEmployees" ConnectionString='<%$ ConnectionStrings:PocketDCRConnectionString %>'
                                            SelectCommand="sp_GetMSONamesByMangerLoginID" SelectCommandType="StoredProcedure">
                                            <SelectParameters>
                                                <asp:ControlParameter ControlID="controlLoginID" PropertyName="Value" Name="LoginID" Type="String"></asp:ControlParameter>
                                            </SelectParameters>
                                        </asp:SqlDataSource>
                                        <asp:TextBox ID="stdate"  ClientIDMode="Static" runat="server" OnTextChanged="refreshGrid" AutoPostBack="true" ></asp:TextBox>
                                          <asp:CalendarExtender ID="CalendarExtender1" DefaultView="Months"  TargetControlID="stdate" runat="server">
                                        </asp:CalendarExtender>
                                        <asp:DropDownList runat="server" ID="statusFilter" AutoPostBack="true" OnSelectedIndexChanged="refreshGrid">
                                            <asp:ListItem Value="" Text="Show From Any Status" />
                                            <asp:ListItem Value="Appr" Text="Approved" />
                                            <asp:ListItem Value="Rej" Text="Rejected" />
                                            <asp:ListItem Value="Dra" Text="Draft" />
                                            <asp:ListItem Value="Sub" Text="Submitted" />
                                            <asp:ListItem Value="Resu" Text="Resubmitted" />
                                        </asp:DropDownList>
                                         
                                    </div>
                                </div>

                                <hr />
                                <div class="table-responsive">


                                    <asp:GridView runat="server" AllowPaging="True" ID="plansGrid" CssClass="blueTable" AutoGenerateColumns="False" DataSourceID="dsPlans" AllowSorting="True" DataKeyNames="planID" HeaderStyle-VerticalAlign="NotSet" OnRowDataBound="plansGrid_RowDataBound">
                                        <Columns>

                                            <asp:TemplateField HeaderText="No.">
                                                <ItemTemplate>
                                                    <%# Container.DataItemIndex + 1 %>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:BoundField DataField="planID" HeaderText="planID" InsertVisible="False" ReadOnly="True" SortExpression="planID" Visible="False" />
                                            <asp:BoundField DataField="EmpName" HeaderText="Employee Name" ReadOnly="True" SortExpression="EmpName" />
                                            <asp:BoundField DataField="status" HeaderText="Status" SortExpression="status"/>
                                            <asp:BoundField DataField="CPM_PlanMonth" HeaderText="Date" SortExpression="CPM_PlanMonth" />
                                            <asp:BoundField DataField="Comments" HeaderText="Comments" ReadOnly="True" SortExpression="Comments" />
                                            <asp:TemplateField HeaderText="Approve/Reject">
                                                <ItemTemplate>
                                                    <asp:Button ID="ActionApprv" CssClass="btn btn-success" OnClick="Action_Click" OnClientClick="return asktoConfirm()" Text='Approve It' CommandArgument='<%#(Eval("planID"))%>' CommandName="ApproveIt" runat="server"
                                                        Enabled='<%#((Eval("status").ToString() == "Approved") ? false : true)%>' />
                                                    <asp:Button ID="ActionRej" CssClass="btn btn-danger" OnClick="Action_Click" OnClientClick="return asktoConfirm()" Text='Reject It' CommandArgument='<%#(Eval("planID"))%>' CommandName="RejectIt" runat="server"
                                                        Enabled='<%#((Eval("status").ToString() == "Rejected") ? false : true)%>' />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                        <PagerStyle CssClass="pagination-ys" />
                                        <EmptyDataTemplate>
                                            <div>Sorry, no plans are available.</div>
                                        </EmptyDataTemplate>
                                    </asp:GridView>
                                    <%--Enabled='<%#((Eval("status").ToString() == "Submitted") ? true : false)%>'--%>
                                    <asp:SqlDataSource CancelSelectOnNullParameter="false" ID="dsPlans" runat="server" ConnectionString="<%$ ConnectionStrings:PocketDCRConnectionString %>"
                                        SelectCommand="sp_GetMSOPlansByLoginID" SelectCommandType="StoredProcedure">
                                        <SelectParameters>
                                            <asp:ControlParameter ControlID="controlLoginID" DefaultValue="1" Name="LoginID" PropertyName="Value" Type="String" />
                                        </SelectParameters>
                                        <SelectParameters>
                                            <asp:ControlParameter ControlID="employeesList" ConvertEmptyStringToNull="true" DefaultValue="" Name="employeesList" PropertyName="SelectedValue" Type="String" />
                                        </SelectParameters>
                                        <SelectParameters>
                                            <asp:ControlParameter ControlID="statusFilter" ConvertEmptyStringToNull="true" DefaultValue="" Name="status" PropertyName="SelectedValue" Type="String" />
                                        </SelectParameters>
                                        <SelectParameters>
                                            <asp:ControlParameter ControlID="stdate" ConvertEmptyStringToNull="true"  Name="month" PropertyName="Text" Type="DateTime" />
                                        </SelectParameters>
                                    </asp:SqlDataSource>
                                </div>

                                <asp:HiddenField ID="controlLoginID" runat="server" />
                            </div>
                        </div>
                    </div>


                </div>



                <!-- !-!------------------------TABLE END---------------- -->

                </div>

                <!-- !-!--------------------------PAGE END--------------------------------------!-! -->

            </ContentTemplate>

        </asp:UpdatePanel>
    </div>
    <script type="text/javascript">

        function asktoConfirm() { return confirm("Are You Sure?") }


        $(document).ready(function () {

            //var cdt = new Date();
            //var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            //var current_mint = cdt.getMinutes();
            //var current_hrs = cdt.getHours();
            //var current_date = cdt.getDate();
             
            //if (current_date == 1) {
            //    var current_date2 = current_date;
            //}
            //else {
            //    var current_date2 = current_date - 1;
            //}

            //var current_month = cdt.getMonth();
            //var current_month = current_month + 1;
            //var month_name = monthNames[current_month];
            //var current_year = cdt.getFullYear();

            //$('#stdate').val(current_month + '/' + current_date2 + '/' + current_year);
          
                       $("#mytable #checkall").click(function () {
                           if ($("#mytable #checkall").is(':checked')) {
                               $("#mytable input[type=checkbox]").each(function () {
                                   $(this).prop("checked", true);
                               });

                           } else {
                               $("#mytable input[type=checkbox]").each(function () {
                                   $(this).prop("checked", false);
                               });
                           }
                       });

                       // $("[data-toggle=tooltip]").tooltip();
                   });
                 
                  
                   </script>
</asp:Content>
