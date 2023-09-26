using System.Web.Services;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for Login1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Login1 : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string UserDevice(string source)
        {
            Session["user-device"] = source;

           
            return "";
        }
    }
}
