using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.Form
{
    public partial class MonthlyDoctorManagement : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["CurrentUserId"] != null)
            {
                 currentUserID.Value = Session["CurrentUserId"].ToString();
            }
            else
            {
                Response.Redirect("../Form/Login.aspx");
            }



           
        }
    }
}