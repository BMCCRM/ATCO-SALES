using System;
using System.Web.UI.WebControls;
using PocketDCR.CustomMembershipProvider;
using System.Data;
using PocketDCR2.Classes;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    public partial class D_distributionview : System.Web.UI.Page
    {
        #region
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        string Cfirstdate = "";
        string Csecdate = "";
        string QMonth1 = "";
        string QMonth2 = "";
        string QMonth3 = "";
        private long _employeeId = 0;
        private SystemUser _currentUser;
        private string _currentLoginId = "", _currentRole = "", _hierarchyName = "", _smsResponse = "";
        private string _SMioID = "NULL", _SskuID = "NULL", _Saddress = "NULL";

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                if (!IsPostBack)
                {
                    _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    getdate();
                    newid(_employeeId.ToString());

                    nv.Clear();
                    nv.Add("DepotId-int", _employeeId.ToString());
                    nv.Add("MioId-int", "NULL");
                    nv.Add("MIOaddress-varchar-200", "NULL");
                    DataSet ds = dl.GetData("sp_DeportEmployeesSelect", nv);
                    DDMiolist.DataSource = ds;
                    DDMiolist.DataBind();


                    ddemp.DataSource = ds;
                    ddemp.DataBind();
                    ddemp.Items.Insert(0, new ListItem("Select Employee", "-1"));

                    nv.Clear();
                    nv.Add("ProductId-int", "NULL");
                    DataSet ds1 = dl.GetData("sp_DeportProductsSelect", nv);
                    DDskuLisk.DataSource = ds1;
                    DDskuLisk.DataBind();

                    nv.Clear(); nv.Add("DepotId-int", _employeeId.ToString());
                    DataSet ds2 = dl.GetData("sp_DeportEmployeesAddressSelect", nv);
                    DDMioAddress.DataSource = ds2;
                    DDMioAddress.DataBind();

                }
            }
        }




        private void getEmployeedata()
        {
            string secdate = DateTime.Today.ToShortDateString();

            #region
            string userid = _employeeId.ToString(), EMPname = "", SKUname = "", empAddress = "", DisDate = "", MIORec = "0";
            int? Qut_Qty = null, Planqty = null, MIOid = null, SKUID = null, IssueQty = null, DisQty = null, BalQty = null, RecNo = null;

            #endregion

            DataTable dt = new DataTable();
            dt.Columns.Add("RecNo"); dt.Columns.Add("EmployeeId"); dt.Columns.Add("EmployeeName"); dt.Columns.Add("SKUID"); dt.Columns.Add("SKUname");
            dt.Columns.Add("IssueQty"); dt.Columns.Add("IssueBQty"); dt.Columns.Add("DisQty"); dt.Columns.Add("DisDate"); dt.Columns.Add("BalQty"); dt.Columns.Add("Address"); dt.Columns.Add("MIORec");

            nv.Clear();
            nv.Add("DepotId-int", userid);
            nv.Add("MioId-int", _SMioID.ToString());
            nv.Add("MIOaddress-varchar-200", _Saddress.ToString());
            DataSet ds = dl.GetData("sp_DeportEmployeesSelect", nv);


            nv.Clear(); nv.Add("ProductId-int", _SskuID.ToString());
            DataSet ds1 = dl.GetData("sp_DeportProductsSelect", nv);
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                   // ddemp.Items.Clear();

                    #region  GET ALL EMPLOYEES
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++) //ALL Emp with Depot
                    {
                        MIOid = Convert.ToInt32(ds.Tables[0].Rows[i]["EmployeeId"]); // from EMP Table
                        EMPname = ds.Tables[0].Rows[i]["EmployeeName"].ToString();
                        empAddress = ds.Tables[0].Rows[i]["Eaddress"].ToString();

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

                                    //DateTime.Today.Date.ToShortDateString();

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
                                            int mbqty = Convert.ToInt32(Planqty);

                                            #region GET ALL issuance with Date
                                            nv.Clear();
                                            nv.Add("Skuid-int", SKUID.ToString());
                                            nv.Add("mioid-int", MIOid.ToString());
                                            nv.Add("FromDate-date", Cfirstdate.ToString());
                                            nv.Add("ToDate-date", Csecdate.ToString());

                                            DataSet ds4 = dl.GetData("sp_issue_EnterySelect", nv);

                                            if (ds4 != null)
                                            {
                                                if (ds4.Tables[0].Rows.Count > 0)
                                                {
                                                    mbqty = 0;
                                                    BalQty = Convert.ToInt32(ds4.Tables[0].Rows[0]["QtrBal"]);

                                                    for (int o = 0; o <= ds4.Tables[0].Rows.Count - 1; o++) // ALL SKU
                                                    {
                                                        mbqty = mbqty + Convert.ToInt32(ds4.Tables[0].Rows[o]["issueQty"]);
                                                    }
                                                    mbqty = Convert.ToInt32(Planqty) - mbqty;
                                                }
                                            }
                                            #endregion



                                            dt.Rows.Add(RecNo, MIOid, EMPname, SKUID, SKUname, Planqty, mbqty, IssueQty, DisDate, BalQty, empAddress, MIORec);


                                        }
                                    }
                                    #endregion

                                }
                            }
                        }
                        #endregion

                    }
                    #endregion

                    DataSet final = new DataSet("aaa");
                    final.Tables.Add(dt);

                    GridView1.DataSource = final;
                    GridView1.DataBind();
                }
            }






        }
        private void getdate()
        {
            int CurrentMonth = System.DateTime.Today.Month;
            string firstdate = DateTime.Today.ToShortDateString();
            string secdate = DateTime.Today.ToShortDateString();

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

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {

            }
        }
        protected void GridView1_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            #region Save/Update

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

                #region Find Control

                Label labrecno = GridView1.Rows[inRowIndex].Cells[0].FindControl("labrecno") as Label;
                Label labmioid = GridView1.Rows[inRowIndex].Cells[1].FindControl("labmioid") as Label;
                Label labSkuid = GridView1.Rows[inRowIndex].Cells[3].FindControl("labSkuid") as Label;
                Label labissue = GridView1.Rows[inRowIndex].Cells[5].FindControl("labissue") as Label;
                TextBox txtqty = GridView1.Rows[inRowIndex].Cells[6].FindControl("txtqty") as TextBox;
                TextBox txtdate = GridView1.Rows[inRowIndex].Cells[7].FindControl("txtdate") as TextBox;
                Label labBqty = GridView1.Rows[inRowIndex].Cells[8].FindControl("labBqty") as Label;


                #endregion
                bool result = false;
                nv.Clear();

                #region Validation/Parameter


                if (txtqty.Text.Trim() != "")
                {
                    nv.Add("MIOId-int", labmioid.Text.ToString());
                    nv.Add("SKUId-int", labSkuid.Text.ToString());
                    nv.Add("issueQty-int", txtqty.Text.ToString());
                    nv.Add("balQty-int", (Convert.ToInt32(labBqty.Text) - Convert.ToInt32(txtqty.Text)).ToString());
                    nv.Add("Dis_Date-date", txtdate.Text.ToString());

                    nv.Add("System_date-date", DateTime.Today.Date.ToShortDateString());
                    nv.Add("MIO_rec-bit", "0");
                    nv.Add("Rec_date-date", txtdate.Text.ToString());
                    nv.Add("Rec_sysDate-date", txtdate.Text.ToString());

                    result = dl.InserData("sp_issue_EnterySave", nv);


                    _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
                    getdate();
                    newid(_employeeId.ToString());

                }

                #endregion
            }


            #endregion

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

        private void newid(string employeeId)
        {
            nv.Clear();
            nv.Add("EmployeeId-int", _employeeId.ToString());
            DataSet ds = dl.GetData("sp_EmployeesSelect", nv);
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    _employeeId = Convert.ToInt64(ds.Tables[0].Rows[0]["EmployeeId"].ToString());

                    getEmployeedata();
                }
            }
        }

        protected void ddemp_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddemp.SelectedItem.Value != "-1")
            {
                getviw();
            }
            else
            {
                GridView2.Visible = false;

            }
        }

        protected void btnview_Click(object sender, EventArgs e)
        {
            if (Panel1.Visible == false)
            {
                Panel1.Visible = true;
                Panel2.Visible = false;
                btnview.Text = "Distribution View";
            }
            else
            {
                getdate();
                Panel1.Visible = false; Panel2.Visible = true;
                btnview.Text = "MIO Distribution Details";

            }
        }

        protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            //  GridView1.PageIndex = e.NewPageIndex;
            //getEmployeedata();
            //  GridView1.DataBind();
        }

        protected void DDMiolist_SelectedIndexChanged(object sender, EventArgs e)
        {
            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            newid(_employeeId.ToString());
            getdate();


            _Saddress = "NULL";


            if (DDMiolist.SelectedValue != "-1")
            {
                _SMioID = DDMiolist.SelectedValue.ToString();

                if (DDskuLisk.SelectedValue.ToString() != "-1")
                {
                    _SskuID = DDskuLisk.SelectedValue.ToString();
                }
                else
                {
                    _SskuID = "NULL";

                }

            }
            else
            {
                _SMioID = "NULL";
                if (DDskuLisk.SelectedValue.ToString() != "-1")
                {
                    _SskuID = DDskuLisk.SelectedValue.ToString();
                }
                else
                {
                    _SskuID = "NULL";

                }
            }

            getEmployeedata();
        }

        protected void DDskuLisk_SelectedIndexChanged(object sender, EventArgs e)
        {
            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            newid(_employeeId.ToString());
            getdate();

            if (DDskuLisk.SelectedValue.ToString() != "-1")
            {
                _SskuID = DDskuLisk.SelectedValue.ToString();
                if (DDMiolist.SelectedValue != "-1")
                {
                    _SMioID = DDMiolist.SelectedValue.ToString();
                }
                else
                {
                    _SMioID = "NULL";

                    if (DDMioAddress.SelectedValue != "-1")
                    {
                        _Saddress = DDMioAddress.SelectedValue.ToString();
                    }
                    else
                    {
                        _Saddress = "NULL";

                    }
                }

            }
            else
            {
                _SskuID = "NULL";
                if (DDMiolist.SelectedValue != "-1")
                {
                    _SMioID = DDMiolist.SelectedValue.ToString();
                }
                else
                {
                    _SMioID = "NULL";

                    if (DDMioAddress.SelectedValue != "-1")
                    {
                        _Saddress = DDMioAddress.SelectedValue.ToString();
                    }
                    else
                    {
                        _Saddress = "NULL";
                    }
                }
            }

            getEmployeedata();

        }

        protected void DDMioAddress_SelectedIndexChanged(object sender, EventArgs e)
        {
            _employeeId = Convert.ToInt64(_currentUser.EmployeeId);
            newid(_employeeId.ToString());
            getdate();
            _SMioID = "NULL";

            if (DDMioAddress.SelectedValue.ToString() != "-1")
            {
                _Saddress = DDMioAddress.SelectedItem.Text.ToString();


                if (DDskuLisk.SelectedValue.ToString() != "-1")
                {
                    _SskuID = DDskuLisk.SelectedValue.ToString();
                }
                else
                {
                    _SskuID = "NULL";
                }

            }
            else
            {

                _Saddress = "NULL";

                if (DDskuLisk.SelectedValue.ToString() != "-1")
                {
                    _SskuID = DDskuLisk.SelectedValue.ToString();
                }
                else
                {
                    _SskuID = "NULL";
                }

            }
            getEmployeedata();
        }

        protected void ddlQuarter_SelectedIndexChanged(object sender, EventArgs e)
        {
            getviw();
        }


        private void getviw()
        {
            DataSet ds1as = new DataSet(); nv.Clear(); GridView2.Visible = true; string userid = ddemp.SelectedItem.Value.ToString();

            nv.Add("mioid-int", userid.ToString());

            if (ddlQuarter.SelectedValue == "1")
            {
                Cfirstdate = Convert.ToDateTime("01/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("03/31/" + System.DateTime.Today.Year).ToShortDateString();

                nv.Add("FromDate-date", Cfirstdate.ToString());
                nv.Add("ToDate-date", Csecdate.ToString());
            }
            else if (ddlQuarter.SelectedValue == "2")
            {
                Cfirstdate = Convert.ToDateTime("04/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("06/30/" + System.DateTime.Today.Year).ToShortDateString();
                nv.Add("FromDate-date", Cfirstdate.ToString());
                nv.Add("ToDate-date", Csecdate.ToString());
            }
            else if (ddlQuarter.SelectedValue == "3")
            {

                Cfirstdate = Convert.ToDateTime("07/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("09/30/" + System.DateTime.Today.Year).ToShortDateString();
                nv.Add("FromDate-date", Cfirstdate.ToString());
                nv.Add("ToDate-date", Csecdate.ToString());
            }
            else if (ddlQuarter.SelectedValue == "4")
            {
                Cfirstdate = Convert.ToDateTime("10/01/" + System.DateTime.Today.Year).ToShortDateString();
                Csecdate = Convert.ToDateTime("12/31/" + System.DateTime.Today.Year).ToShortDateString();

                nv.Add("FromDate-date", Cfirstdate.ToString());
                nv.Add("ToDate-date", Csecdate.ToString());

            }

            ds1as = dl.GetData("sp_issue_EnterySelect_view", nv);
            GridView2.DataSource = ds1as;
            GridView2.DataBind();
        }
    }
}