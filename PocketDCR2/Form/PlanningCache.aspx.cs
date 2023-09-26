using System;
using DatabaseLayer.SQL;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    public partial class PlanningCache : System.Web.UI.Page
    {
        readonly DAL dl = new DAL();
        readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        protected void Page_Load(object sender, EventArgs e)
        {
          
          
        }
    }
}