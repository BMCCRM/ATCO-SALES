using System;
using System.Web.UI.WebControls;
using System.Data;
using PocketDCR2.Classes;
using Obout.Grid;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    public partial class D_depot : System.Web.UI.Page
    {
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                loaddata(); clear();
            }
        }
        private void newid(string employeeId)
        {
            nv.Clear();
            nv.Add("EmployeeId-NVARCHAR-50", employeeId.ToString());
            DataSet ds = dl.GetData("sp_EmployeesSelect_Depot", nv);
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    empid.Value = ds.Tables[0].Rows[0]["EmployeeId"].ToString();
                    string das = ds.Tables[0].Rows[0]["LoginId"].ToString();
                }
            }
        }
        protected void btnsave_Click(object sender, EventArgs e)
        {
            try
            {
                #region

                laberror.Text = "";
                var msg="";


                if (txtName.Text.Trim() == "")
                {
                    laberror.Text = "Depot Name Null!";
                    goto endd;
                }

                if (txtMname.Text.Trim() == "")
                {
                    laberror.Text = "Manager Name Null!";

                    goto endd;
                }


                #endregion

                #region variable

                string Depotname = txtName.Text.Trim();
                string Managername = txtMname.Text.Trim();
                string Address = txtAddress.Text.Trim();
                string Email = txtemail.Text.Trim();
                string Faxeno = txtFaxNo.Text.Trim();
                string Mobileno = txtMobile.Text.Trim();
                string Phoneno = txtPhone.Text.Trim();
                string Description = txtDesctiption.Text.Trim();
                string loginid = txtlogin.Text.Trim();
                bool check = true;

                if (CheckBox1.Checked)
                { check = true; }
                else { check = false; }

                #endregion

                #region NV
                nv.Clear();
                nv.Add("Depotname-nvarchar-50", Depotname);
                nv.Add("Managername-nvarchar-50", Managername);
                nv.Add("Address-nvarchar-200", Address);
                nv.Add("Email-nvarchar-50", Email);
                nv.Add("Faxeno-varchar-20", Faxeno);
                nv.Add("Mobileno-varchar-20", Mobileno);
                nv.Add("Phoneno-varchar-20", Phoneno);
                nv.Add("Description-nvarchar-200", Description);
                nv.Add("loginid-nvarchar-100", loginid);
                nv.Add("IsActive-bit", "1");

                #endregion

                #region Save/Update Depot
                bool result = false;
                DataSet ds11 = new DataSet();
                string recid = "";

                if (hdnMode.Value == "")
                {
                    NameValueCollection nvlogin = new NameValueCollection();
                    nvlogin.Clear();
                    nvlogin.Add("@LoginId-nvarchar-100", loginid);
                    nvlogin.Add("@MobileNumber-nvarchar-20", "NULL");

                    DataSet dsforchck = dl.GetData("sp_EmployeeSelectByCredential", nvlogin);
                    if (dsforchck != null)
                        if (dsforchck.Tables[0].Rows.Count != 0)
                        {
                            laberror.Text = "Duplicate LoginId!";
                            goto endd2;
                        }


                    ds11 = dl.GetData("sp_DepotInsert", nv);
                    recid = ds11.Tables[0].Rows[0]["Rec_No"].ToString();

                    #region SAVE IN Employee Tables

                    #region Employee main
                    NameValueCollection nv1 = new NameValueCollection();
                    NameValueCollection nv2 = new NameValueCollection();
                    nv.Clear(); //sp_EmployeesInsert
                    nv.Add("DesignationId-int", "-1");
                    nv.Add("FirstName-nvarchar-50", Depotname);
                    nv.Add("LastName-nvarchar-50", Managername);
                    nv.Add("MiddleName-nvarchar-50", recid.ToString());
                    nv.Add("LoginId-nvarchar-100", loginid);
                    nv.Add("MobileNumber-nvarchar-20", Mobileno);
                    nv.Add("AppointmentDate-datetime", DateTime.Now.ToString());
                    nv.Add("CreationDate-datetime", DateTime.Now.ToString());
                    nv.Add("LastUpdateDate-datetime", DateTime.Now.ToString());
                    nv.Add("Gender-int", "1");
                    nv.Add("IsActive-bit", "1");
                    nv.Add("ManagerId-bigint", "NULL".ToString());
                    nv.Add("IsSample-bit", "NULL".ToString());
                    nv.Add("DepotID-int", "NULL".ToString());

                    DataSet ds = dl.GetData("sp_EmployeesInsert", nv);
                    #endregion

                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            int employeeId = Convert.ToInt32(ds.Tables[0].Rows[0]["EmployeeId"].ToString());

                            #region Role
                            nv1.Clear(); // sp_EmploeesInRolesInsert
                            nv1.Add("RoleId-int", "11".ToString());
                            nv1.Add("EmployeeId-bigint", employeeId.ToString());
                            DataSet ds1 = dl.GetData("sp_EmploeesInRolesInsert", nv1);
                            #endregion
                            #region Membership
                            nv2.Clear(); // sp_EmployeeMembershipInsert
                            nv2.Add("EmployeeId-bigint", employeeId.ToString());
                            nv2.Add("Password-nvarchar-128", "NA");
                            nv2.Add("PasswordFormat-nvarchar-128", "1");
                            nv2.Add("PasswordSalt-bigint", "NA");
                            nv2.Add("MobilePIN-nvarchar-16", "NA");
                            nv2.Add("Email-nvarchar-256", Email);
                            nv2.Add("LoweredEmail-nvarchar-256", Email.ToLower());
                            nv2.Add("PasswordQuestion-nvarchar-256", "NA");
                            nv2.Add("PasswordAnswer-nvarchar-128", "NA");
                            nv2.Add("IsApproved-bit", true.ToString());
                            nv2.Add("IsLockedOut-bit", false.ToString());
                            nv2.Add("CreateDate-datetime", DateTime.Now.ToString());
                            nv2.Add("LastLoginDate-datetime", DateTime.Now.ToString());
                            nv2.Add("LastPasswordChangedDate-datetime", DateTime.Now.ToString());
                            nv2.Add("LastLockoutDate-datetime", DateTime.Now.ToString());
                            nv2.Add("FailedPasswordAttemptCount-int", "0".ToString());
                            nv2.Add("FailedPasswordAttemptWindowStart-datetime", DateTime.Now.ToString());
                            nv2.Add("FailedPasswordAnswerAttemptCount-int", "0".ToString());
                            nv2.Add("FailedPasswordAnswerAttemptWindowStart-datetime", DateTime.Now.ToString());
                            nv2.Add("Comment-ntext", "-".ToString());
                            DataSet ds2 = dl.GetData("sp_EmployeeMembershipInsert", nv2);
                            #endregion
                        }
                    }

                    #endregion

                    laberror.Text = "Data Save successfully!";

                }
                else if (hdnMode.Value == "EditMode")
                {
                    nv.Add("RecNo-int", hdnRec.Value.ToString());
                    result = dl.InserData("sp_DepotUpdate", nv);
                    newid(hdnRec.Value.ToString());
                    nv.Clear();
                    nv.Add("EmployeeId-bigint", empid.Value.ToString());
                    nv.Add("FirstName-nvarchar-50", Depotname);
                    nv.Add("LastName-nvarchar-50", Managername);
                    nv.Add("MiddleName-nvarchar-50", recid.ToString());
                    nv.Add("LoginId-nvarchar-100", loginid);
                    nv.Add("IsActive-bit", check.ToString());
                    result = dl.InserData("sp_EmployeesUpdateDepot", nv);
                    if (result)
                    {
                        laberror.Text = "Data Update successfully!";
                    }
                }
                #endregion

                hdnMode.Value = "";

                mpError.Show();
                loaddata();
                clear();
                goto endd2;



            }
            catch (Exception ex)
            {
                laberror.Text = ex.Message.ToString();
            }
        endd: { }
        endd2: { }

        }
        private void loaddata()
        {
            DataSet ds = dl.GetData("sp_DepotSelectall", null);
            Grid1.DataSource = ds;
            Grid1.DataBind();
        }
        private void clear()
        {
            hdnMode.Value = "";
            txtName.Text = "";
            txtMname.Text = "";
            txtAddress.Text = "";
            txtemail.Text = "";
            txtFaxNo.Text = "";
            txtMobile.Text = "";
            txtPhone.Text = "";
            txtDesctiption.Text = "";
            txtlogin.Text = "";
            //laberror.Text = "";

        }
        protected void Grid1_RowDataBound(object sender, GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[5] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            GridDataControlFieldCell cell2 = e.Row.Cells[6] as GridDataControlFieldCell;
            LinkButton lb2 = cell2.FindControl("LinkButton2") as LinkButton;
            int id = int.Parse(e.Row.Cells[0].Text);
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
            lb2.Attributes.Add("onClick", "oGrid_Delete('" + id + "');return false;");
        }
        protected void btncancel_Click(object sender, EventArgs e)
        {
            clear();
        }
    }
}