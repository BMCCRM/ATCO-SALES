using System;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.Common;
using System.Data.SqlClient;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for BrickManagementService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class BrickManagementService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();

        #endregion

        #region Public Methods

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertBrick(string name, string description, bool isActive)
        {
            string returnString = "";

            try
            {

                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorBrickCheck(null, name.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var insertBrick = _dataContext.sp_HierarchyLevel6Insert(name, description, isActive).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBrick(int levelId)
        {
            string returnString = "";

            try
            {
                var doctorBrick = _dataContext.sp_DoctorBrickSelect(levelId).Select(
                    p =>
                        new DatabaseLayer.SQL.HierarchyLevel6()
                        {
                            LevelId = p.LevelId,
                            LevelName = p.LevelName,
                            LevelDescription = p.LevelDescription,
                            IsActive = p.IsActive
                        }).ToList();
                returnString = _jss.Serialize(doctorBrick);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateBrick(int levelId, string name, string description, bool isActive)
        {
            string returnString = "";

            try
            {
                #region Validate Name

                var isValidateName = _dataContext.sp_DoctorBrickCheck(null, name.Trim()).ToList();

                #endregion

                if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                {
                    returnString = "Duplicate Name!";
                }
                else
                {
                    var doctorBrick = _dataContext.sp_HierarchyLevel6Update(levelId, name, description, isActive).ToList();
                    returnString = "OK";
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteBrick(int levelId)
        {
            DbTransaction deleteTransaction = null;
            string returnString = "";

            try
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Closed)
                {
                    _dataContext.Connection.Open();
                }

                deleteTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = deleteTransaction;

                _dataContext.sp_HierarchyLevel6Delete(levelId);
                returnString = "OK";

                deleteTransaction.Commit();
            }
            catch (SqlException exception)
            {
                if (deleteTransaction != null)
                {
                    deleteTransaction.Rollback();
                }

                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this level due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
            }

            return returnString;

        }

        #endregion
    }
}
