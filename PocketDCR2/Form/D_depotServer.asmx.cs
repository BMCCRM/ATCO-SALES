using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for D_depotServer
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [ScriptService]
    public class D_depotServer : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDepot(int DepotId)
        {
            string returnString = ""; 

            try
            {
                var Depot = _dataContext.sp_DepotSelect(DepotId).Select(
                    p =>
                        new DatabaseLayer.SQL.tbl_Depot()
                        {
                            Rec_No = p.Rec_No,
                            Depotname = p.Depotname,
                            Managername = p.Managername,
                            Address = p.Address,
                            Email = p.Email,
                            Faxeno = p.Faxeno,
                            Mobileno = p.Mobileno,
                            Phoneno = p.Phoneno,
                            Description = p.Description,
                            IsActive = p.IsActive,
                            loginid = p.loginid

                        }).ToList();
                returnString = _jss.Serialize(Depot);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteDepot(int DepotId)
        {
            string returnString = "";

            try
            {
                var res = _dataContext.sp_DepotDelete(DepotId);
                returnString = "OK";

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }
    }
}
