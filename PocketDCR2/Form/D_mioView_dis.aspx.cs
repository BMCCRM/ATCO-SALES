using System;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using PocketDCR2.Classes;
using System.Collections.Specialized;


namespace PocketDCR2.Form
{
    public partial class D_mioView_dis : System.Web.UI.Page
    {
        #region
        private SystemUser _currentUser;
        private DatabaseDataContext _dataContext;
        private string _currentLoginId = "", _currentRole = "", _hierarchyName = "", _smsResponse = "", _mrid;
        private long _employeeId = 0;
        private List<DatabaseLayer.SQL.AppConfiguration> _getHierarchy;
        private int _currentYear = 0, _currentMonth = 0, _currentDay = 0, _daysOfMonth = 0, _level1Id = 0, _level2Id = 0, _smsType = 0,
             _level3Id = 0, _level4Id = 0, _level5Id = 0, _level6Id = 0, _isApproved = 0;

        string Cfirstdate = "";
        string Csecdate = "";

        string CmonthFdate = "";
        string CmonthLdate = "";

        string QMonth1 = "";
        string QMonth2 = "";
        string QMonth3 = "";

        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();


        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                if (!IsPostBack)
                {

                    _employeeId = Convert.ToInt64(_currentUser.EmployeeId);


                    string roleType = Context.Session["CurrentUserRole"].ToString();

                    if (roleType != "rl5")
                    {
                        Response.Redirect("../Reports/Dashboard.aspx");
                    }


                    nv.Add("ManagerId-BIGINT", _employeeId.ToString());
                    DataSet ds1 = dl.GetData("sp_EmployeesSelectByManager", nv);

                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        ddlLevel1.DataSource = ds1;
                        ddlLevel1.DataBind();

                        ddmio.DataSource = ds1; ddmio.DataBind();
                    }

                    getdate();
                    //   getEmployeedata();
                    //  viewdata();

                }
            }
        }

        private void getdate()
        {
            int CurrentMonth = System.DateTime.Today.Month;
            int CurrentMonthdays = System.DateTime.DaysInMonth(System.DateTime.Today.Year, System.DateTime.Today.Month);

            string firstdate = DateTime.Today.ToShortDateString();
            string secdate = DateTime.Today.ToShortDateString();

            CmonthFdate = Convert.ToDateTime(CurrentMonth + "/01/" + System.DateTime.Today.Year).ToShortDateString();
            CmonthLdate = Convert.ToDateTime(CurrentMonth + "/" + CurrentMonthdays + "/" + System.DateTime.Today.Year).ToShortDateString();


            if (CurrentMonth >= 1 && CurrentMonth <= 3)
            {
                firstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "1"; QMonth2 = "2"; QMonth3 = "3"; ddlQuarter.SelectedIndex = 0;
            }
            else if (CurrentMonth >= 4 && CurrentMonth <= 6)
            {
                firstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "4"; QMonth2 = "5"; QMonth3 = "6"; ddlQuarter.SelectedIndex = 1;
            }
            else if (CurrentMonth >= 7 && CurrentMonth <= 9)
            {
                firstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "7"; QMonth2 = "8"; QMonth3 = "9"; ddlQuarter.SelectedIndex = 2;
            }
            else if (CurrentMonth >= 10 && CurrentMonth <= 11)
            {
                firstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                secdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
                QMonth1 = "10"; QMonth2 = "11"; QMonth3 = "12"; ddlQuarter.SelectedIndex = 3;
            }

            Cfirstdate = firstdate;
            Csecdate = secdate;
        }

        private void getEmployeedata()
        {
            getdate();
            string secdate = DateTime.Today.ToShortDateString();

            #region Variable

            string userid = _employeeId.ToString(), EMPname = "", SKUname = "", DisDate = "", MIORec = "0", Recdate = "";
            int? Qut_Qty = null, Planqty = null, MIOid = null, SKUID = null, IssueQty = null, RecQty = null, IssueBQty = null, BalQty = null, RecNo = null, issqty = null;

            #endregion

            #region Create DataTable
            DataTable dt = new DataTable();
            dt.Columns.Add("RecNo"); dt.Columns.Add("EmployeeName"); dt.Columns.Add("SKUID"); dt.Columns.Add("SKUname");
            dt.Columns.Add("IssueQty"); dt.Columns.Add("IssueBQty"); dt.Columns.Add("DisQty"); dt.Columns.Add("DisDate");
            dt.Columns.Add("Recdate"); dt.Columns.Add("RecQty"); dt.Columns.Add("BalQty"); dt.Columns.Add("MIORec");
            #endregion

            DataSet ds1 = dl.GetData("sp_ProductsSelect_all", null);
            MIOid = Convert.ToInt32(_currentUser.EmployeeId); // ZSM ID

            #region GET ALL SKU
            if (ds1 != null)
            {
                if (ds1.Tables[0].Rows.Count > 0)
                {
                    for (int ii = 0; ii <= ds1.Tables[0].Rows.Count - 1; ii++) // ALL SKU
                    {
                        SKUID = Convert.ToInt32(ds1.Tables[0].Rows[ii]["ProductId"]); // from Product Table
                        SKUname = ds1.Tables[0].Rows[ii]["Skuname"].ToString();
                        IssueQty = null; Planqty = null; Qut_Qty = null;

                        DisDate = DateTime.Today.Date.ToShortDateString();
                        Recdate = DateTime.Today.Date.ToShortDateString();

                        #region GET ALL SKU + Markting Plan with Date
                        nv.Clear();
                        nv.Add("Skuid-int", SKUID.ToString());


                        nv.Add("FromDate-date", Cfirstdate.ToString());
                        nv.Add("ToDate-date", Csecdate.ToString());
                        DataSet ds3 = dl.GetData("sp_M_Team_EnterySelect", nv);
                        if (ds3 != null)
                        {
                            if (ds3.Tables[0].Rows.Count > 0)
                            {
                                Planqty = Convert.ToInt32(ds3.Tables[0].Rows[0]["Qty"]); // tbl_M_team_entery
                                Qut_Qty = Convert.ToInt32(ds3.Tables[0].Rows[0]["Qty"]); // tbl_M_team_entery
                                Planqty = Planqty / 3;
                                BalQty = Qut_Qty;

                                #region GET ALL issuance with Date
                                nv.Clear();
                                nv.Add("Skuid-int", SKUID.ToString());
                                nv.Add("mioid-int", MIOid.ToString()); // ZSM ID
                                nv.Add("FromDate-date", CmonthFdate.ToString());
                                nv.Add("ToDate-date", CmonthLdate.ToString());

                                DataSet ds4 = dl.GetData("sp_issue_EnterySelect2", nv);
                                DataSet ds5 = dl.GetData("sp_issue_EnterySelect", nv);
                                DataSet dsissueMIO = dl.GetData("sp_issuemio_EnterySelect", nv);



                                int mbqty = 0; int mbqty2 = 0; issqty = 0;

                                if (ds4 != null)
                                {
                                    if (ds4.Tables[0].Rows.Count > 0)
                                    {
                                        //if (ds5 != null)
                                        //{
                                        //    if (ds5.Tables[0].Rows.Count > 0)
                                        //    {
                                        //       // BalQty = Convert.ToInt32(ds5.Tables[0].Rows[0]["QtrBal"]);
                                        //        //IssueBQty = Convert.ToInt32(ds5.Tables[0].Rows[0]["QtrBal"]);
                                        //    }
                                        //}

                                        for (int o = 0; o <= ds4.Tables[0].Rows.Count - 1; o++) // ALL SKU
                                        {
                                            mbqty = mbqty + Convert.ToInt32(ds4.Tables[0].Rows[o]["issueQty"]);
                                            mbqty2 = mbqty2 + Convert.ToInt32(ds4.Tables[0].Rows[o]["issueQty"]); //Stock.Qty;
                                        }

                                        for (int oo = 0; oo <= dsissueMIO.Tables[0].Rows.Count - 1; oo++) // ALL SKU
                                        {
                                            issqty = issqty + Convert.ToInt32(dsissueMIO.Tables[0].Rows[oo]["issueQty"]);
                                        }


                                        BalQty = BalQty - mbqty2;
                                        mbqty = Convert.ToInt32(Planqty) - Convert.ToInt32(mbqty);
                                        string Fdate = "";
                                        int? FQty = 0;
                                        RecNo = null;

                                        for (int iii = 0; iii <= ds4.Tables[0].Rows.Count - 1; iii++) // ALL SKU
                                        {
                                            Fdate = Convert.ToDateTime(ds4.Tables[0].Rows[iii]["Dis_Date"]).Date.ToShortDateString();
                                            FQty = Convert.ToInt32(ds4.Tables[0].Rows[iii]["issueQty"]);
                                            RecNo = Convert.ToInt32(ds4.Tables[0].Rows[iii]["Recno"].ToString());

                                            if (ds4.Tables[0].Rows[iii]["Mio_Qty"].ToString() != "")
                                            {
                                                RecQty = RecQty + Convert.ToInt32(ds4.Tables[0].Rows[iii]["Mio_Qty"]);
                                            }
                                            MIORec = "";
                                        }

                                        if (Convert.ToInt32(FQty) > 0)
                                        {
                                            IssueQty = mbqty2 - issqty;//Stock.Qty;
                                            DisDate = Fdate;
                                            dt.Rows.Add(RecNo, EMPname, SKUID, SKUname, Planqty, mbqty, IssueQty, DisDate, Recdate, RecQty, BalQty, MIORec);
                                        }
                                    }
                                }
                                #endregion
                            }
                        }
                        #endregion
                    }
                }
            }
            #endregion


            DataSet final = new DataSet("aaa");
            final.Tables.Add(dt);

            GridView1.DataSource = final;
            GridView1.DataBind();

        }

        private void viewdata()
        {

            #region Variable
            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            string userid = _employeeId.ToString();
            #endregion

            #region Set Date

            if (ddlQuarter.SelectedValue == "1")
            {
                Cfirstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "2")
            {
                Cfirstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "3")
            {
                Cfirstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "4")
            {
                Cfirstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
            }
            #endregion

            nv.Clear();
            nv.Add("mioid-int", userid.ToString());
            nv.Add("FromDate-date", Cfirstdate.ToString());
            nv.Add("ToDate-date", Csecdate.ToString());
            nv.Add("@FLMId-int", ddmio.SelectedValue.ToString());
            nv.Add("@Skuid-int", "NULL");
            DataSet ds1as = dl.GetData("sp_issuemio_EnterySelect2", nv);


            GridView2.DataSource = ds1as;
            GridView2.DataBind();

        }

        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            laberror.Text = "";
            if (e.CommandName == "Save")
            {
                #region Get Row Index
                int inRowIndex = Convert.ToInt32(e.CommandArgument);
                if (GridView1.PageIndex != 0)
                {
                    if (inRowIndex >= GridView1.PageSize)
                    {
                        inRowIndex = inRowIndex - (GridView1.PageSize * GridView1.PageIndex);
                    }
                }
                #endregion

                Label labrecno = GridView1.Rows[inRowIndex].Cells[0].FindControl("labrecno") as Label;
                TextBox txtdate = GridView1.Rows[inRowIndex].Cells[7].FindControl("txtdate") as TextBox;
                TextBox txtqty = GridView1.Rows[inRowIndex].Cells[8].FindControl("txtqty") as TextBox;
                Label labSkuid = GridView1.Rows[inRowIndex].Cells[3].FindControl("labSkuid") as Label;
                int cdate = DateTime.Compare(Convert.ToDateTime(txtdate.Text), DateTime.Today.Date);
                bool result = false;
                if (txtqty.Text.Trim() != "")
                {
                    if (txtdate.Text.Trim() != "")
                    {
                        if (cdate <= 0)
                        {
                            nv.Clear();
                            nv.Add("FLMId-int", _currentUser.EmployeeId.ToString());
                            nv.Add("MIOId-int", ddlLevel1.SelectedValue.ToString());
                            nv.Add("SKUId-int", labSkuid.Text.ToString());
                            nv.Add("issueQty-int", txtqty.Text.ToString());
                            nv.Add("Dis_Date-date", txtdate.Text.ToString());
                            nv.Add("System_date-date", DateTime.Today.Date.ToShortDateString());
                            nv.Add("MIO_rec-bit", "0");
                            nv.Add("Rec_date-date", txtdate.Text.ToString());
                            nv.Add("Rec_sysDate-date", txtdate.Text.ToString());

                            result = dl.InserData("sp_issuemio_EnterySave", nv);
                            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);

                            getdate();
                            getEmployeedata();
                            viewdata();
                        }
                        else { laberror.Text = "Date is later than today"; }
                    }
                    else { laberror.Text = "Date must be select"; }
                }
                else { laberror.Text = "Quantity must be entered"; }
            }
        }

        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                // lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        protected void btnview_Click(object sender, EventArgs e)
        {
            if (Panel1.Visible == false)
            {
                Panel1.Visible = true; Panel2.Visible = false;
                btnview.Text = "Distribution List";
            }
            else
            {
                Panel1.Visible = false; Panel2.Visible = true; btnview.Text = " Distributed List";
               

            }
        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {

        }

        protected void ddlQuarter_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlQuarter.SelectedValue == "1")
            {
                Cfirstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "2")
            {
                Cfirstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "3")
            {
                Cfirstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
            }
            else if (ddlQuarter.SelectedValue == "4")
            {
                Cfirstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();
            }

            viewdata();
        }

        protected void ddlLevel1_SelectedIndexChanged(object sender, EventArgs e)
        {
            getEmployeedata();
        }

        protected void ddmio_SelectedIndexChanged(object sender, EventArgs e)
        {
            viewdata();
        }
    }
}