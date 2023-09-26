using System;
using System.Data;
using System.Linq;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    public partial class ManthlyoffdayPlanning : System.Web.UI.Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        private string _currentRole = "";

        #endregion

        #region Private Functions

        private bool IsValidUser()
        {
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                lblError.Text = "While checking user, it shows " + exception.Message;
            }

            return false;
        }

        private void getdata(int totalday, int month, int year)
        {
            #region Initialize

            DataTable dt = new DataTable("Month");
            string description = "", mdate = "", Chkva = "0";
            bool present = false;

            #endregion

            #region Creating DataTable Columns

            dt.Columns.Add("ck");
            dt.Columns.Add("Day");
            dt.Columns.Add("Reason");

            #endregion

            var selPlan = _dataContext.sp_OffDayPlanningSelect(year, month, null).ToList();

            for (int i = 1; i <= totalday; i++)
            {
                description = ""; mdate = ""; Chkva = "0";

                if (selPlan.Count > 0)
                {
                    #region GetData from Database

                    present = false;

                    foreach (var item in selPlan)
                    {
                        description = item.Description.ToString();
                        Chkva = "1";
                        mdate = item.TiemStamp.Day.ToString();

                        if (Convert.ToInt32(mdate) == i)
                        {
                            present = true;
                            dt.Rows.Add(Chkva, i, description);
                        }
                    }

                    if (present == false)
                    {
                        dt.Rows.Add("0", i, "");
                    }

                    #endregion
                }
                else
                {
                    dt.Rows.Add("0", i, "");
                }
            }

            description = ""; Chkva = "0";
            gvPlan.DataSource = dt;
            gvPlan.DataBind();
        }

        private void savedata()
        {
            #region Initialize

            int day = 0;
            int month = 0;
            int year = 0;
            DateTime dt = Convert.ToDateTime(TextBox1.Text);

            #endregion
            try
            {
                month = Convert.ToInt32(Convert.ToDateTime(TextBox1.Text).Month);
                year = Convert.ToInt32(Convert.ToDateTime(TextBox1.Text).Year);

                _dataContext.sp_OffDayPlanningDelete(year, month);

                for (int i = 0; i <= gvPlan.Rows.Count - 1; i++)
                {
                    TextBox txtrea = (TextBox)gvPlan.Rows[i].FindControl("txtReason");
                    CheckBox Chkval = (CheckBox)gvPlan.Rows[i].FindControl("ckCheck");
                    Label labsday = (Label)gvPlan.Rows[i].FindControl("labday");
                    day = Convert.ToInt32(labsday.Text);
                    DateTime dt1 = Convert.ToDateTime(dt.Month + "-" + day + "-" + dt.Year);
                    string Reason = txtrea.Text;

                    if (Chkval.Checked)
                    {
                        var insertPlan = _dataContext.sp_OffDayPlanningInsert(dt1, Reason).ToList();
                    }
                }

                lblError.Text = "Calender Setup save successfully...!";
            }
            catch { lblError.Text = "error in saveing data!"; }

        }

        protected void TextBox1_TextChanged(object sender, EventArgs e)
        {
            Label3.Text = Convert.ToDateTime(TextBox1.Text).Date.ToString();
            int totalday = DateTime.DaysInMonth(Convert.ToDateTime(TextBox1.Text).Year, Convert.ToDateTime(TextBox1.Text).Month);
            lblError.Text = "";
            Calendar1.TodaysDate = Convert.ToDateTime(TextBox1.Text).Date;
            this.getdata(totalday, Convert.ToDateTime(TextBox1.Text).Month, Convert.ToDateTime(TextBox1.Text).Year);
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                if (!IsPostBack)
                {
                    _currentRole = Context.Session["CurrentUserRole"].ToString();

                    if (_currentRole != "admin")
                    {
                        if (_currentRole != "headoffice")
                        {
                            Response.Redirect("../Reports/Dashboard.aspx");
                        }
                    }

                    if (_currentRole == "admin" || _currentRole == "headoffice")
                    {
                        int totalday = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
                        TextBox1.Text = DateTime.Today.Date.ToString("MMMM-yyyy");
                        getdata(totalday, DateTime.Now.Month, DateTime.Now.Year);
                    }
                }
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void Calendar1_SelectionChanged(object sender, EventArgs e)
        {

        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            savedata();
            lblError.Text = "";
        }

        protected void gvPlan_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            try
            {
                if (e.Row.RowType == DataControlRowType.DataRow)
                {
                    CheckBox ck = (CheckBox)e.Row.FindControl("ckCheck");
                    TextBox txtrea = (TextBox)e.Row.FindControl("txtReason");
                    string ckvalue = Convert.ToString(((DataRowView)e.Row.DataItem).Row.ItemArray[0].ToString());
                    if (ckvalue == "0")
                    {
                        ck.Checked = false;
                    }
                    else
                    {
                        ck.Checked = true;
                    }
                    string date = TextBox1.Text;
                    DateTime dt = Convert.ToDateTime(date);
                    int daysinmnth = System.DateTime.DaysInMonth(dt.Year, dt.Month);

                    int j = e.Row.RowIndex + 1;
                    DateTime dt2 = new DateTime(dt.Year, dt.Month, j);
                    string dayname = dt2.ToString("dddd");

                    if (dayname == "Sunday")
                    {
                        ck.Checked = true;
                    }
                    txtrea.Text = dayname;
                }
            }
            catch (Exception) { }
        }

        #endregion
    }
}