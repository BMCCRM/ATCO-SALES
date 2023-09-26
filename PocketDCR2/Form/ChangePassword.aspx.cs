using System;
using System.Web.UI;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;
using System.Collections.Specialized;
using System.Configuration;
using System.Web.Configuration;
using AjaxControlToolkit;

namespace PocketDCR2.Form
{
    public partial class ChangePassword : Page
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;

        #endregion

        #region Private Functions

        private bool IsValidUser()
        {
            try
            {
                if (Session["SystemUser"] != null)
                {
                    Constants.ErrorLog("Session SystemUser Is Not Null : YES " + "Session SystemUser Value : " + Session["SystemUser"].ToString());
                }
                else
                {
                    Constants.ErrorLog("Session SystemUser Is Null : YES");
                }



                _currentUser = (SystemUser)Session["SystemUser"];
                return _currentUser != null;
            }
            catch (Exception exception)
            {
                lblError.Text = "While checking user, it shows " + exception.Message;
                Constants.ErrorLog("Exception In IsValid User Change Password : " + exception.Message);
                mpError.Show();
            }

            return false;
        }

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsValidUser())
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

        protected void btnClose_Click(object sender, EventArgs e)
        {
            mpError.Hide();
        }

        #endregion

        protected void ChangePasswordPushButton_Click(object sender, EventArgs e)
        {
            try
            {
                //((System.Web.UI.WebControls.TextBox)ChangePassword2.FindControl("CurrentPassword")).Text
                //(ChangePassword2.FindControl("NewPassword"))
                //(ChangePassword2.FindControl("Seession"))

                CustomMemebership cm = new CustomMemebership();
                ((System.Web.UI.WebControls.Literal)ChangePassword2.ChangePasswordTemplateContainer.FindControl("FailureText")).Text = "";

                string configPath = "~/web.config";
                Configuration config = WebConfigurationManager.OpenWebConfiguration(configPath);
                MembershipSection section = (MembershipSection)config.GetSection("system.web/membership");
                ProviderSettingsCollection settings = section.Providers;
                NameValueCollection membershipParams = settings[section.DefaultProvider].Parameters;


                cm.Initialize(section.DefaultProvider, membershipParams);



                if (cm.ChangePassword(Session["CurrentUserLoginID"].ToString()
                    , ((System.Web.UI.WebControls.TextBox)ChangePassword2.ChangePasswordTemplateContainer.FindControl("CurrentPassword")).Text
                    , ((System.Web.UI.WebControls.TextBox)ChangePassword2.ChangePasswordTemplateContainer.FindControl("NewPassword")).Text))
                { 
                    // Operation Done Successfully
                    ChangePassword2.SuccessTemplate.InstantiateIn(ChangePassword2);
                }
                else
                {
                    // There Some Credentials Error
                    ((System.Web.UI.WebControls.Literal)ChangePassword2.ChangePasswordTemplateContainer.FindControl("FailureText")).Text = "There's An Error While Changing Password. Please Review Your Credentials";
                }

            }
            catch(Exception ex)
            {
                ((System.Web.UI.WebControls.Literal)ChangePassword2.ChangePasswordTemplateContainer.FindControl("FailureText")).Text = ex.Message;          
            }
        }
    }
}