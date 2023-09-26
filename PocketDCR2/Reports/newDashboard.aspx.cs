using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Reports
{
    public partial class newDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["CurrentUserId"] != null)
            {
                int employeeID = int.Parse(HttpContext.Current.Session["CurrentUserId"].ToString());
                int roleID = 0;

                DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
                var roleId = _dataContext.sp_EmploeesInRolesSelect(null, employeeID).ToList();
                if (roleId.Count != 0)
                {
                    roleID = roleId[0].RoleId;
                    string ip = Server.HtmlEncode(Request.UserHostAddress);
                    Constants.GetClientIP("CRM DashBoard", roleID.ToString(), ip, employeeID.ToString());
                }
            }
        }
    }
}