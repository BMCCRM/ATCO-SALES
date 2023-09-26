using System;
using System.Collections.Specialized;
using System.Web.Script.Services;
using System.Web.Services;
using PocketDCR2.Classes;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for ZSMDayView1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class ZsmDayView1 : System.Web.Services.WebService
    {
        
        readonly DAL _dl = new DAL();
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetZsmDayView(string day, string ddate, string zsmEmployeeId)
        {
            var stringToReturn = string.Empty;
            var dsZsmDayView = _dl.GetData("ZSMPlanDayView_Select", new NameValueCollection
            {
                { "@ZSMEmployeeID-INT", zsmEmployeeId },
                { "@Day-INT", day },
                { "@ddate-DateTime", Convert.ToDateTime(ddate).ToString()}
            });
            if (dsZsmDayView == null) return "";
            if (dsZsmDayView.Tables[0].Rows.Count > 0)
            {
                stringToReturn = dsZsmDayView.Tables[0].ToJsonString();
            }
            return stringToReturn;
        }
    }
}
