using System;
using System.Web.UI.WebControls;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using Obout.Grid;

namespace PocketDCR2.Form
{
    public partial class MasterModules : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {

        }

        protected void Grid1_RowDataBound(object sender, Obout.Grid.GridRowEventArgs e)
        {
            GridDataControlFieldCell cell1 = e.Row.Cells[2] as GridDataControlFieldCell;
            LinkButton lb = cell1.FindControl("LinkButton1") as LinkButton;

            int id = int.Parse(e.Row.Cells[0].Text);
            lb.Attributes.Add("onClick", "oGrid_Edit('" + id + "');return false;");
        }
    }
}