using System;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using PocketDCR2.Classes;
using System.Collections.Specialized;


namespace PocketDCR2.Form
{
    public partial class D_mioView : System.Web.UI.Page
    {
        #region
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        string Cfirstdate = "";
        string Csecdate = "";

        string CmonthFdate = "";
        string CmonthLdate = "";

        string QMonth1 = "";
        string QMonth2 = "";
        string QMonth3 = "";

        private long _employeeId = 0;
        private SystemUser _currentUser;
        private string _currentLoginId = "", _currentRole = "", _hierarchyName = "", _smsResponse = "";
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                if (!IsPostBack)
                {
                    _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    getdate();
                    getEmployeedata();
                    viewdata();

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
            string secdate = DateTime.Today.ToShortDateString();

            #region Variable
            string userid = _employeeId.ToString(), EMPname = "", SKUname = "", DisDate = "", MIORec = "0", Recdate = "";
            int? Qut_Qty = null, Planqty = null, MIOid = null, SKUID = null, IssueQty = null, RecQty = null, IssueBQty = null, BalQty = null, RecNo = null;

            #endregion

            #region Create DataTable
            DataTable dt = new DataTable();
            dt.Columns.Add("RecNo"); dt.Columns.Add("EmployeeName"); dt.Columns.Add("SKUID"); dt.Columns.Add("SKUname");
            dt.Columns.Add("IssueQty"); dt.Columns.Add("IssueBQty"); dt.Columns.Add("DisQty"); dt.Columns.Add("DisDate");
            dt.Columns.Add("Recdate"); dt.Columns.Add("RecQty"); dt.Columns.Add("BalQty"); dt.Columns.Add("MIORec");
            #endregion

            DataSet ds1 = dl.GetData("sp_ProductsSelect_all", null);
            MIOid = Convert.ToInt32(userid);

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
                                nv.Add("mioid-int", MIOid.ToString());
                                nv.Add("FromDate-date", CmonthFdate.ToString());
                                nv.Add("ToDate-date", CmonthLdate.ToString());

                                DataSet ds4 = dl.GetData("sp_issue_EnterySelect1", nv);
                                DataSet ds5 = dl.GetData("sp_issue_EnterySelect", nv);

                                int mbqty = 0;

                                if (ds4 != null)
                                {
                                    if (ds4.Tables[0].Rows.Count > 0)
                                    {
                                        if (ds5 != null)
                                        {
                                            if (ds5.Tables[0].Rows.Count > 0)
                                            {
                                                BalQty = Convert.ToInt32(ds5.Tables[0].Rows[0]["QtrBal"]);
                                                //IssueBQty = Convert.ToInt32(ds5.Tables[0].Rows[0]["QtrBal"]);
                                            }
                                        }

                                        for (int o = 0; o <= ds4.Tables[0].Rows.Count - 1; o++) // ALL SKU
                                        {
                                            mbqty = mbqty + Convert.ToInt32(ds4.Tables[0].Rows[o]["issueQty"]);
                                        }


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
                                                RecQty = Convert.ToInt32(ds4.Tables[0].Rows[iii]["Mio_Qty"]);
                                            }
                                            else { RecQty = FQty; }
                                            MIORec = "";


                                            if (Convert.ToInt32(FQty) > 0)
                                            {
                                                IssueQty = FQty;
                                                DisDate = Fdate;
                                                dt.Rows.Add(RecNo, EMPname, SKUID, SKUname, Planqty, mbqty, IssueQty, DisDate, Recdate, RecQty, BalQty, MIORec);
                                            }
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

            nv.Clear();
            nv.Add("mioid-int", userid.ToString());
            nv.Add("FromDate-date", Cfirstdate.ToString());
            nv.Add("ToDate-date", Csecdate.ToString());
            DataSet ds1as = dl.GetData("sp_issue_EnterySelect_view", nv);


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

                int cdate = DateTime.Compare(Convert.ToDateTime(txtdate.Text), DateTime.Today.Date);


                bool result = false;
                if (txtqty.Text.Trim() != "")
                {
                    if (txtdate.Text.Trim() != "")
                    {
                        if (cdate <= 0)
                        {
                            nv.Clear();
                            nv.Add("Recno-int", labrecno.Text.ToString());
                            nv.Add("Rec_date-date", txtdate.Text.ToString());
                            nv.Add("qty-int", txtqty.Text.ToString());
                            result = dl.InserData("sp_issue_EnteryUpdate2", nv);
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
                Panel1.Visible = true;
                GridView1.Visible = false;
                btnview.Text = "Recived Sample List";
            }
            else
            {
                Panel1.Visible = false; GridView1.Visible = true;
                btnview.Text = " Pending Sample List";
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

    }
}