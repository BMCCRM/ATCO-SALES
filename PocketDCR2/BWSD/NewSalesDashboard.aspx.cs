using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.Reports
{
    public partial class NewSalesDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ddlDist_PreRender(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //ddlDist.Items.Insert(0, new ListItem("Select Distributor", "-1"));
                ((DropDownList)sender).Items.Insert(0, new ListItem("Select From List", "-1"));
            }
        }
    }
}