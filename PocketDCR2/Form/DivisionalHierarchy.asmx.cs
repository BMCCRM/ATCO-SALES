using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Services;
using DatabaseLayer.SQL;
using System.Data.Common;
using System.Web.Script.Serialization;
using PocketDCR2.Classes;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Specialized;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for DivisionalHierarchy1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DivisionalHierarchy1 : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        List<HierarchyLevel1> _getHierarchyLevel1;
        List<HierarchyLevel2> _getHierarchyLevel2;
        List<HierarchyLevel3> _getHierarchyLevel3;
        List<HierarchyLevel4> _getHierarchyLevel4;
        List<HierarchyLevel5> _getHierarchyLevel5;
        List<HierarchyLevel6> _getHierarchyLevel6;
        private int _levelId = 0;
        NameValueCollection nv = new NameValueCollection();

        private System.Data.DataSet GetData(String SpName, NameValueCollection NV)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                if (NV != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < NV.Count; i++)
                    {
                        string[] arraySplit = NV.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = NV[i].ToString();
                        }
                    }
                }

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                return null;
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }

        #endregion

        #region Web Method with old work

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string ShowCurrentLevel(int parentLevelId, string levelName)
        //{
        //    string returnString = "";

        //    try
        //    {
        //        if (levelName == "Level3")
        //        {
        //            #region Level3

        //            if (parentLevelId == 0)
        //            {
        //                _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
        //                    p =>
        //                        new HierarchyLevel3()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            IsActive = p.IsActive,
        //                            LevelDescription = p.LevelDescription                                    
        //                        }).ToList();

        //                if (_getHierarchyLevel3.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel3);
        //                }                        
        //            }
        //            else
        //            {
        //               _getHierarchyLevel4 = _dataContext.sp_Level4SelectByLevel3(parentLevelId).Select(
        //                    p =>
        //                       new HierarchyLevel4()
        //                       {
        //                           LevelId = p.LevelId,
        //                           LevelName = p.LevelName,
        //                           LevelCode = p.LevelCode,
        //                           LevelDescription = p.LevelDescription,
        //                           IsActive = p.IsActive
        //                       }).ToList();

        //               if (_getHierarchyLevel4.Count > 0)
        //               {
        //                   returnString = _jss.Serialize(_getHierarchyLevel4);
        //               }                       
        //            }

        //            #endregion
        //        }
        //        else if (levelName == "Level4")
        //        {
        //            #region Level4

        //            if (parentLevelId == 0)
        //            {
        //                _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
        //                    p =>
        //                        new HierarchyLevel4()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                if (_getHierarchyLevel4.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel4);
        //                }
        //            }
        //            else
        //            {
        //                _getHierarchyLevel5 = _dataContext.sp_Level5SelectByLevel4(parentLevelId).Select(
        //                    p =>
        //                      new DatabaseLayer.SQL.HierarchyLevel5()
        //                      {
        //                          LevelId = p.LevelId,
        //                          LevelName = p.LevelName,
        //                          LevelCode = p.LevelCode,
        //                          LevelDescription = p.LevelDescription,
        //                          IsActive = p.IsActive
        //                      }).ToList();

        //                if (_getHierarchyLevel5.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel5);
        //                }
        //            }

        //            #endregion
        //        }
        //        else if (levelName == "Level5")
        //        {
        //            #region Level5

        //            if (parentLevelId == 0)
        //            {
        //                _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
        //                    p =>
        //                        new HierarchyLevel5()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                if (_getHierarchyLevel5.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel5);
        //                }                        
        //            }
        //            else
        //            {
        //                _getHierarchyLevel6 = _dataContext.sp_Level6SelectByLevel5(parentLevelId).Select(
        //                    p =>
        //                       new HierarchyLevel6()
        //                       {
        //                           LevelId = p.LevelId,
        //                           LevelName = p.LevelName,
        //                           LevelCode = p.LevelCode,
        //                           LevelDescription = p.LevelDescription,
        //                           IsActive = p.IsActive
        //                       }).ToList();

        //                if (_getHierarchyLevel6.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel6);
        //                }
        //            }

        //            #endregion
        //        }
        //        else if (levelName == "Level6")
        //        {
        //            #region Level6

        //            if (parentLevelId == 0)
        //            {
        //                _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
        //                    p =>
        //                        new HierarchyLevel6()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                if (_getHierarchyLevel6.Count > 0)
        //                {
        //                    returnString = _jss.Serialize(_getHierarchyLevel6);
        //                }
        //            }

        //            #endregion
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string FillDropDownList(string levelName)
        //{
        //    string returnString = "";

        //    try
        //    {
        //        if (levelName == "Level3")
        //        {
        //            #region Level3

        //            _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
        //                p =>
        //                    new HierarchyLevel3()
        //                    {
        //                        LevelId = p.LevelId,
        //                        LevelName = p.LevelName
        //                    }).ToList();
        //            returnString = _jss.Serialize(_getHierarchyLevel3);

        //            #endregion
        //        }
        //        else if (levelName == "Level4")
        //        {
        //            #region Level4

        //            _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
        //                p =>
        //                    new HierarchyLevel4()
        //                    {
        //                        LevelId = p.LevelId,
        //                        LevelName = p.LevelName
        //                    }).ToList();
        //            returnString = _jss.Serialize(_getHierarchyLevel4);

        //            #endregion
        //        }
        //        else if (levelName == "Level5")
        //        {
        //            #region Level5

        //            _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
        //                p =>
        //                    new HierarchyLevel5()
        //                    {
        //                        LevelId = p.LevelId,
        //                        LevelName = p.LevelName
        //                    }).ToList();
        //            returnString = _jss.Serialize(_getHierarchyLevel5);

        //            #endregion
        //        }
        //        else if (levelName == "Level6")
        //        {
        //            #region Level6

        //            _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
        //                p =>
        //                    new HierarchyLevel6()
        //                    {
        //                        LevelId = p.LevelId,
        //                        LevelName = p.LevelName
        //                    }).ToList();

        //            returnString = _jss.Serialize(_getHierarchyLevel6);

        //            #endregion
        //        } 
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}
        
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string InsertHierarchy(string levelName, string levelDescription, bool isActive, int parentLevelId, string LevelName) 
        //{
        //    string returnString = "";
        //    DbTransaction insertTransaction = null;

        //    try
        //    {
        //        _dataContext.Connection.Open();
        //        insertTransaction = _dataContext.Connection.BeginTransaction();
        //        _dataContext.Transaction = insertTransaction;                

        //        if (LevelName == "Level3")
        //        {
        //            #region Level3

        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel3Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var hierarchyLevel3 =
        //                    _dataContext.sp_HierarchyLevel3Insert(levelName, levelDescription, isActive).ToList();

        //                if (parentLevelId != -1)
        //                {
        //                    var relationLevel2 =
        //                        _dataContext.sp_RelationLevel2Insert(parentLevelId, hierarchyLevel3[0].LevelId).ToList();
        //                }

        //                _levelId = Convert.ToInt32(hierarchyLevel3[0].LevelId);

        //                var selectHierarchyLevel3 =
        //                    _dataContext.sp_HierarchyLevel3Select(_levelId, null).Select(
        //                    p =>
        //                        new HierarchyLevel3()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                returnString = _jss.Serialize(selectHierarchyLevel3);
        //            }

        //            insertTransaction.Commit();

        //            #endregion
        //        }
        //        else if (LevelName == "Level4")
        //        {
        //            #region Level4

        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel4Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var insertHierarchyLevel4 =
        //                    _dataContext.sp_HierarchyLevel4Insert(levelName, isActive, levelDescription).ToList();

        //                if (parentLevelId != -1)
        //                {
        //                    var insertRelationLevel3 =
        //                        _dataContext.sp_RelationLevel3Insert(parentLevelId, insertHierarchyLevel4[0].LevelId).ToList();
        //                }

        //                _levelId = Convert.ToInt32(insertHierarchyLevel4[0].LevelId);

        //                var selectHierarchyLevel4 =
        //                    _dataContext.sp_HierarchyLevel4Select(_levelId, null).Select(
        //                    p =>
        //                        new HierarchyLevel4()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                returnString = _jss.Serialize(selectHierarchyLevel4);
        //            }

        //            insertTransaction.Commit();

        //            #endregion
        //        }
        //        else if (LevelName == "Level5")
        //        {
        //            #region Level5

        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel5Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var insertHierarchyLevel5 =
        //                    _dataContext.sp_HierarchyLevel5Insert(levelName, levelDescription, isActive).ToList();

        //                if (parentLevelId != -1)
        //                {
        //                    var insertRelationLevel4 =
        //                        _dataContext.sp_RelationLevel4Insert(parentLevelId, insertHierarchyLevel5[0].LevelId).ToList();
        //                }

        //                _levelId = Convert.ToInt32(insertHierarchyLevel5[0].LevelId);

        //                var selectHierarchyLevel5 =
        //                    _dataContext.sp_HierarchyLevel5Select(_levelId, null).Select(
        //                    p =>
        //                        new HierarchyLevel5()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                returnString = _jss.Serialize(selectHierarchyLevel5);
        //            }

        //            insertTransaction.Commit();

        //            #endregion
        //        }
        //        else if (LevelName == "Level6")
        //        {
        //            #region Level6

        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel6Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var insertHierarchyLevel6 =
        //                    _dataContext.sp_HierarchyLevel6Insert(levelName, levelDescription, isActive).ToList();

        //                if (parentLevelId != -1)
        //                {
        //                    var insertRelationLevel5 =
        //                        _dataContext.sp_RelationLevel5Insert(parentLevelId, insertHierarchyLevel6[0].LevelId).ToList();
        //                }

        //                _levelId = Convert.ToInt32(insertHierarchyLevel6[0].LevelId);

        //                var selectHierarchyLevel6 =
        //                    _dataContext.sp_HierarchyLevel6Select(_levelId, null).Select(
        //                    p =>
        //                        new HierarchyLevel6()
        //                        {
        //                            LevelId = p.LevelId,
        //                            LevelCode = p.LevelCode,
        //                            LevelName = p.LevelName,
        //                            LevelDescription = p.LevelDescription,
        //                            IsActive = p.IsActive
        //                        }).ToList();

        //                returnString = _jss.Serialize(selectHierarchyLevel6);
        //            }

        //            insertTransaction.Commit();

        //            #endregion
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //        insertTransaction.Rollback();
        //    }
        //    finally
        //    {
        //        if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
        //        {
        //            _dataContext.Connection.Close();
        //        }
        //    }

        //    return returnString;
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string GetHierarchyLevel(int levelId, string levelName)
        //{
        //    string returnString = "";

        //    try
        //    {
        //        if (levelName == "Level3")
        //        {
        //            #region Level3

        //            var getHierarchyLevel3 =
        //                _dataContext.sp_HierarchyLevel3Select(levelId, null).Select(
        //                p =>
        //                    new HierarchyLevel3()
        //                    {
        //                        LevelId = p.LevelId,
        //                        LevelName = p.LevelName,
        //                        LevelCode = p.LevelCode,
        //                        LevelDescription = p.LevelDescription,
        //                        IsActive = p.IsActive
        //                    }).ToList();
        //            returnString = _jss.Serialize(getHierarchyLevel3);

        //            #endregion
        //        }
        //        else if (levelName == "Level4")
        //        {
        //            #region Level4

        //            var getHierarchyLevel4 =
        //                _dataContext.sp_HierarchyLevel4Select(levelId, null).Select(
        //                p =>
        //                   new HierarchyLevel4()
        //                   {
        //                       LevelId = p.LevelId,
        //                       LevelName = p.LevelName,
        //                       LevelCode = p.LevelCode,
        //                       LevelDescription = p.LevelDescription,
        //                       IsActive = p.IsActive
        //                   }).ToList();
        //            returnString = _jss.Serialize(getHierarchyLevel4);

        //            #endregion
        //        }
        //        else if (levelName == "Level5")
        //        {
        //            #region Level5

        //            var getHierarchyLevel5 =
        //                _dataContext.sp_HierarchyLevel5Select(levelId, null).Select(
        //                p =>
        //                  new HierarchyLevel5()
        //                  {
        //                      LevelId = p.LevelId,
        //                      LevelName = p.LevelName,
        //                      LevelCode = p.LevelCode,
        //                      LevelDescription = p.LevelDescription,
        //                      IsActive = p.IsActive
        //                  }).ToList();
        //            returnString = _jss.Serialize(getHierarchyLevel5);

        //            #endregion
        //        }
        //        else if (levelName == "Level6")
        //        {
        //            #region Level6

        //            var getHierarchyLevel6 =
        //                _dataContext.sp_HierarchyLevel6Select(levelId, null).Select(
        //                p =>
        //                   new HierarchyLevel6()
        //                   {
        //                       LevelId = p.LevelId,
        //                       LevelName = p.LevelName,
        //                       LevelCode = p.LevelCode,
        //                       LevelDescription = p.LevelDescription,
        //                       IsActive = p.IsActive
        //                   }).ToList();
        //            returnString = _jss.Serialize(getHierarchyLevel6);

        //            #endregion
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}        

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string UpdateHierarchy(int levelId, string levelName, string levelDescription, bool isActive, string LevelName) 
        //{
        //    string returnString = "";

        //    try
        //    {
        //        if (LevelName == "Level3")
        //        {
        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel3Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var updateHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Update(levelId, levelName, levelDescription, isActive).ToList();
        //            }
        //        }
        //        else if (LevelName == "Level4")
        //        {
        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel4Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var updateHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Update(levelId, levelName, isActive, levelDescription).ToList();
        //            }
        //        }
        //        else if (LevelName == "Level5")
        //        {
        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel5Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var updateHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Update(levelId, levelName, levelDescription, isActive).ToList();
        //            }
        //        }
        //        else if (LevelName == "Level6")
        //        {
        //            #region Validate Name

        //            var isValidateName = _dataContext.sp_HierarchyLevel6Select(null, levelName.Trim()).ToList();

        //            #endregion

        //            if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
        //            {
        //                returnString = "Duplicate Name!";
        //            }
        //            else
        //            {
        //                var updateHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Update(levelId, levelName, levelDescription, isActive).ToList();
        //            }
        //        }

        //        if (returnString != "Duplicate Name!")
        //        {
        //            returnString = "OK";
        //        }
        //    }
        //    catch (Exception exception)
        //    {
        //        returnString = exception.Message;
        //    }

        //    return returnString;
        //}

        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public string DeleteHierarchyLevel(int levelId, string levelName) 
        //{
        //    DbTransaction deleteTransaction = null;
        //    string returnString = "";

        //    try
        //    {
        //        if (_dataContext.Connection.State == System.Data.ConnectionState.Closed)
        //        {
        //            _dataContext.Connection.Open();
        //        }

        //        deleteTransaction = _dataContext.Connection.BeginTransaction();
        //        _dataContext.Transaction = deleteTransaction;
                                
        //        if (levelName == "Level3")
        //        {
        //            _dataContext.sp_RelationLevel2Delete(levelId);
        //            _dataContext.sp_HierarchyLevel3Delete(levelId);                    
        //        }
        //        else if (levelName == "Level4")
        //        {
        //            _dataContext.sp_RelationLevel3Delete(levelId);
        //            _dataContext.sp_HierarchyLevel4Delete(levelId);
        //        }
        //        else if (levelName == "Level5")
        //        {
        //            _dataContext.sp_RelationLevel4Delete(levelId);
        //            _dataContext.sp_HierarchyLevel5Delete(levelId);
        //        }
        //        else if (levelName == "Level6")
        //        {
        //            _dataContext.sp_RelationLevel5Delete(levelId);
        //            _dataContext.sp_HierarchyLevel6Delete(levelId);
        //        }

        //        returnString = "OK";
        //        deleteTransaction.Commit();
        //    }
        //    catch (SqlException exception)
        //    {
        //        if (deleteTransaction != null)
        //        {
        //            deleteTransaction.Rollback();
        //        }

        //        if (exception.Number == 547)
        //        {
        //            returnString = "Not able to delete this level due to linkup.";
        //        }
        //        else
        //        {
        //            returnString = exception.Message;
        //        }
        //    }
        //    finally 
        //    {
        //        if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
        //        {
        //            _dataContext.Connection.Close();
        //        }
        //    }

        //    return returnString;
        //}

        #endregion

        #region Web Method with new levels

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ShowCurrentLevel(int parentLevelId, string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level1")
                {
                    #region Level1

                    if (parentLevelId == 0)
                    {

                        _getHierarchyLevel1 = _dataContext.sp_HierarchyLevel1Select(null, null).Select(
                         p =>
                             new HierarchyLevel1()
                             {
                                 LevelId = p.LevelId,
                                 LevelCode = p.LevelCode,
                                 LevelName = p.LevelName,
                                 IsActive = p.IsActive,
                                 LevelDescription = p.LevelDescription
                             }).ToList();

                        if (_getHierarchyLevel1.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel1);
                        }
                    }
                    else
                    {

                        _getHierarchyLevel2 = _dataContext.sp_Level2SelectByLevel1(parentLevelId).Select(
                         p =>
                             new HierarchyLevel2()
                             {
                                 LevelId = p.LevelId,
                                 LevelCode = p.LevelCode,
                                 LevelName = p.LevelName,
                                 IsActive = p.IsActive,
                                 LevelDescription = p.LevelDescription
                             }).ToList();

                        if (_getHierarchyLevel2.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel2);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level2")
                {
                    #region Level2

                    if (parentLevelId == 0)
                    {

                        _getHierarchyLevel2 = _dataContext.sp_HierarchyLevel2Select(null, levelName.Trim()).Select(
                         p =>
                             new HierarchyLevel2()
                             {
                                 LevelId = p.LevelId,
                                 LevelCode = p.LevelCode,
                                 LevelName = p.LevelName,
                                 IsActive = p.IsActive,
                                 LevelDescription = p.LevelDescription
                             }).ToList();

                        if (_getHierarchyLevel2.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel2);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel3 = _dataContext.sp_Level3SelectByLevel2(parentLevelId).Select(
                         p =>
                             new HierarchyLevel3()
                             {
                                 LevelId = p.LevelId,
                                 LevelCode = p.LevelCode,
                                 LevelName = p.LevelName,
                                 IsActive = p.IsActive,
                                 LevelDescription = p.LevelDescription
                             }).ToList();

                        if (_getHierarchyLevel3.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel3);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level3")
                {
                    #region Level3

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
                            p =>
                                new HierarchyLevel3()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    IsActive = p.IsActive,
                                    LevelDescription = p.LevelDescription
                                }).ToList();

                        if (_getHierarchyLevel3.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel3);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel4 = _dataContext.sp_Level4SelectByLevel3(parentLevelId).Select(
                             p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelName = p.LevelName,
                                    LevelCode = p.LevelCode,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level4")
                {
                    #region Level4

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
                            p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel4.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel4);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel5 = _dataContext.sp_Level5SelectByLevel4(parentLevelId).Select(
                            p =>
                              new DatabaseLayer.SQL.HierarchyLevel5()
                              {
                                  LevelId = p.LevelId,
                                  LevelName = p.LevelName,
                                  LevelCode = p.LevelCode,
                                  LevelDescription = p.LevelDescription,
                                  IsActive = p.IsActive
                              }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level5")
                {
                    #region Level5

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
                            p =>
                                new HierarchyLevel5()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel5.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel5);
                        }
                    }
                    else
                    {
                        _getHierarchyLevel6 = _dataContext.sp_Level6SelectByLevel5(parentLevelId).Select(
                            p =>
                               new HierarchyLevel6()
                               {
                                   LevelId = p.LevelId,
                                   LevelName = p.LevelName,
                                   LevelCode = p.LevelCode,
                                   LevelDescription = p.LevelDescription,
                                   IsActive = p.IsActive
                               }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
                }
                else if (levelName == "Level6")
                {
                    #region Level6

                    if (parentLevelId == 0)
                    {
                        _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
                            p =>
                                new HierarchyLevel6()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        if (_getHierarchyLevel6.Count > 0)
                        {
                            returnString = _jss.Serialize(_getHierarchyLevel6);
                        }
                    }

                    #endregion
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
        public string FillDropDownList(string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level1")
                {
                    #region Level1

                    _getHierarchyLevel1 = _dataContext.sp_HierarchyLevel1Select(null, null).Select(
                        p =>
                            new HierarchyLevel1()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel1);

                    #endregion
                }
                else if (levelName == "Level2")
                {
                    #region Level2

                    _getHierarchyLevel2 = _dataContext.sp_HierarchyLevel2Select(null, null).Select(
                        p =>
                            new HierarchyLevel2()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel2);

                    #endregion
                }
                else if (levelName == "Level3")
                {
                    #region Level3

                    _getHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Select(null, null).Select(
                        p =>
                            new HierarchyLevel3()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel3);

                    #endregion
                }
                else if (levelName == "Level4")
                {
                    #region Level4

                    _getHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Select(null, null).Select(
                        p =>
                            new HierarchyLevel4()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel4);

                    #endregion
                }
                else if (levelName == "Level5")
                {
                    #region Level5

                    _getHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Select(null, null).Select(
                        p =>
                            new HierarchyLevel5()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();
                    returnString = _jss.Serialize(_getHierarchyLevel5);

                    #endregion
                }
                else if (levelName == "Level6")
                {
                    #region Level6

                    _getHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Select(null, null).Select(
                        p =>
                            new HierarchyLevel6()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName
                            }).ToList();

                    returnString = _jss.Serialize(_getHierarchyLevel6);

                    #endregion
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
        public string InsertHierarchy(string levelName, string levelDescription, bool isActive, int parentLevelId, string LevelName)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;

            try
            {
                _dataContext.Connection.Open();
                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;

                if (LevelName == "Level1")
                {
                    #region Level1

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel1Select(parentLevelId, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var hierarchyLevel1 =
                            _dataContext.sp_HierarchyLevel1Insert("", levelName, levelDescription, isActive).ToList();

                        if (parentLevelId != -1)
                        {
                            var relationLevel1 =
                                _dataContext.sp_RelationLevel1Insert(parentLevelId, hierarchyLevel1[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(hierarchyLevel1[0].LevelId);

                        var selectHierarchyLevel1 =
                            _dataContext.sp_HierarchyLevel1Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel1()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel1);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
                else if (LevelName == "Level2")
                {
                    #region Level2

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel2Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var hierarchyLevel2 =
                            _dataContext.sp_HierarchyLevel2Insert("", levelName, levelDescription, isActive).ToList();

                        if (parentLevelId != -1)
                        {
                            var relationLevel2 =
                                _dataContext.sp_RelationLevel1Insert(parentLevelId, hierarchyLevel2[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(hierarchyLevel2[0].LevelId);

                        var selectHierarchyLevel2 =
                            _dataContext.sp_HierarchyLevel2Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel2()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel2);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
                else if (LevelName == "Level3")
                {
                    #region Level3

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel3Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var hierarchyLevel3 =
                            _dataContext.sp_HierarchyLevel3Insert(levelName, levelDescription, isActive).ToList();

                        if (parentLevelId != -1)
                        {
                            var relationLevel2 =
                                _dataContext.sp_RelationLevel2Insert(parentLevelId, hierarchyLevel3[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(hierarchyLevel3[0].LevelId);

                        var selectHierarchyLevel3 =
                            _dataContext.sp_HierarchyLevel3Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel3()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel3);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
                else if (LevelName == "Level4")
                {
                    #region Level4

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel4Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var insertHierarchyLevel4 =
                            _dataContext.sp_HierarchyLevel4Insert(levelName, isActive, levelDescription).ToList();

                        if (parentLevelId != -1)
                        {
                            var insertRelationLevel3 =
                                _dataContext.sp_RelationLevel3Insert(parentLevelId, insertHierarchyLevel4[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(insertHierarchyLevel4[0].LevelId);

                        var selectHierarchyLevel4 =
                            _dataContext.sp_HierarchyLevel4Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel4()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel4);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
                else if (LevelName == "Level5")
                {
                    #region Level5

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel5Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var insertHierarchyLevel5 =
                            _dataContext.sp_HierarchyLevel5Insert(levelName, levelDescription, isActive).ToList();

                        if (parentLevelId != -1)
                        {
                            var insertRelationLevel4 =
                                _dataContext.sp_RelationLevel4Insert(parentLevelId, insertHierarchyLevel5[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(insertHierarchyLevel5[0].LevelId);

                        var selectHierarchyLevel5 =
                            _dataContext.sp_HierarchyLevel5Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel5()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel5);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
                else if (LevelName == "Level6")
                {
                    #region Level6

                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel6Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var insertHierarchyLevel6 =
                            _dataContext.sp_HierarchyLevel6Insert(levelName, levelDescription, isActive).ToList();

                        if (parentLevelId != -1)
                        {
                            var insertRelationLevel5 =
                                _dataContext.sp_RelationLevel5Insert(parentLevelId, insertHierarchyLevel6[0].LevelId).ToList();
                        }

                        _levelId = Convert.ToInt32(insertHierarchyLevel6[0].LevelId);

                        var selectHierarchyLevel6 =
                            _dataContext.sp_HierarchyLevel6Select(_levelId, null).Select(
                            p =>
                                new HierarchyLevel6()
                                {
                                    LevelId = p.LevelId,
                                    LevelCode = p.LevelCode,
                                    LevelName = p.LevelName,
                                    LevelDescription = p.LevelDescription,
                                    IsActive = p.IsActive
                                }).ToList();

                        returnString = _jss.Serialize(selectHierarchyLevel6);
                    }

                    insertTransaction.Commit();

                    #endregion
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
                insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetHierarchyLevel(int levelId, string levelName)
        {
            string returnString = "";

            try
            {
                if (levelName == "Level1")
                {
                    #region Level1

                    var getHierarchyLevel1 =
                        _dataContext.sp_HierarchyLevel1Select(levelId, null).Select(
                        p =>
                            new HierarchyLevel1()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName,
                                LevelCode = p.LevelCode,
                                LevelDescription = p.LevelDescription,
                                IsActive = p.IsActive
                            }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel1);

                    #endregion
                }
                else if (levelName == "Level2")
                {
                    #region Level2

                    var getHierarchyLevel2 =
                        _dataContext.sp_HierarchyLevel2Select(levelId, null).Select(
                        p =>
                            new HierarchyLevel2()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName,
                                LevelCode = p.LevelCode,
                                LevelDescription = p.LevelDescription,
                                IsActive = p.IsActive
                            }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel2);

                    #endregion
                }
                else if (levelName == "Level3")
                {
                    #region Level3

                    var getHierarchyLevel3 =
                        _dataContext.sp_HierarchyLevel3Select(levelId, null).Select(
                        p =>
                            new HierarchyLevel3()
                            {
                                LevelId = p.LevelId,
                                LevelName = p.LevelName,
                                LevelCode = p.LevelCode,
                                LevelDescription = p.LevelDescription,
                                IsActive = p.IsActive
                            }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel3);

                    #endregion
                }
                else if (levelName == "Level4")
                {
                    #region Level4

                    var getHierarchyLevel4 =
                        _dataContext.sp_HierarchyLevel4Select(levelId, null).Select(
                        p =>
                           new HierarchyLevel4()
                           {
                               LevelId = p.LevelId,
                               LevelName = p.LevelName,
                               LevelCode = p.LevelCode,
                               LevelDescription = p.LevelDescription,
                               IsActive = p.IsActive
                           }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel4);

                    #endregion
                }
                else if (levelName == "Level5")
                {
                    #region Level5

                    var getHierarchyLevel5 =
                        _dataContext.sp_HierarchyLevel5Select(levelId, null).Select(
                        p =>
                          new HierarchyLevel5()
                          {
                              LevelId = p.LevelId,
                              LevelName = p.LevelName,
                              LevelCode = p.LevelCode,
                              LevelDescription = p.LevelDescription,
                              IsActive = p.IsActive
                          }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel5);

                    #endregion
                }
                else if (levelName == "Level6")
                {
                    #region Level6

                    var getHierarchyLevel6 =
                        _dataContext.sp_HierarchyLevel6Select(levelId, null).Select(
                        p =>
                           new HierarchyLevel6()
                           {
                               LevelId = p.LevelId,
                               LevelName = p.LevelName,
                               LevelCode = p.LevelCode,
                               LevelDescription = p.LevelDescription,
                               IsActive = p.IsActive
                           }).ToList();
                    returnString = _jss.Serialize(getHierarchyLevel6);

                    #endregion
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
        public string UpdateHierarchyWithOtherDetails(int ShiftlevelId, int levelId, string levelName, string levelDescription, bool isActive, string LevelName)
        {

            string returnString = "";
            try
            {

                nv.Clear();
                nv.Add("@ShiftlevelId-varchar(100)", ShiftlevelId.ToString());
                nv.Add("@LevelId-int", levelId.ToString());
                nv.Add("@LevelName-nvarchar(100)", levelName.ToString());
                nv.Add("@LevelDescription-nvarchar(200)", levelDescription.ToString());
                nv.Add("@IsActive-bit", isActive ? "1" : "0");
                nv.Add("@RoleName-varchar(100)", LevelName.ToString());
                DataSet ds = GetData("sp_HierarchyLevelUpdatewithcallDetail", nv);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].Rows[0][0].ToString();
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
        public string UpdateHierarchy(int levelId, string levelName, string levelDescription, bool isActive, string LevelName)
        {
            string returnString = "";

            try
            {
                if (LevelName == "Level1")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel1Select(levelId, null).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel1 = _dataContext.sp_HierarchyLevel1Update(levelId, "", levelName, levelDescription, isActive).ToList();
                    }
                }
                else if (LevelName == "Level2")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel2Select(levelId, null).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel2 = _dataContext.sp_HierarchyLevel2Update(levelId, "", levelName, levelDescription, isActive).ToList();
                    }
                }
                else if (LevelName == "Level3")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel3Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel3 = _dataContext.sp_HierarchyLevel3Update(levelId, levelName, levelDescription, isActive).ToList();
                    }
                }
                else if (LevelName == "Level4")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel4Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel4 = _dataContext.sp_HierarchyLevel4Update(levelId, levelName, isActive, levelDescription).ToList();
                    }
                }
                else if (LevelName == "Level5")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel5Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel5 = _dataContext.sp_HierarchyLevel5Update(levelId, levelName, levelDescription, isActive).ToList();
                    }
                }
                else if (LevelName == "Level6")
                {
                    #region Validate Name

                    var isValidateName = _dataContext.sp_HierarchyLevel6Select(null, levelName.Trim()).ToList();

                    #endregion

                    if (isValidateName.Count != 0 && Convert.ToInt32(isValidateName[0].LevelId) != levelId)
                    {
                        returnString = "Duplicate Name!";
                    }
                    else
                    {
                        var updateHierarchyLevel6 = _dataContext.sp_HierarchyLevel6Update(levelId, levelName, levelDescription, isActive).ToList();
                    }
                }

                if (returnString != "Duplicate Name!")
                {
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
        public string DeleteHierarchyLevel(int levelId, string levelName)
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

                if (levelName == "Level1")
                {
                    //_dataContext.sp_RelationLevel1Delete(levelId);
                    _dataContext.sp_HierarchyLevel1Delete(levelId);
                }
                else if (levelName == "Level2")
                {
                    _dataContext.sp_RelationLevel1Delete(levelId);
                    _dataContext.sp_HierarchyLevel2Delete(levelId);
                }
                else if (levelName == "Level3")
                {
                    _dataContext.sp_RelationLevel2Delete(levelId);
                    _dataContext.sp_HierarchyLevel3Delete(levelId);
                }
                else if (levelName == "Level4")
                {
                    _dataContext.sp_RelationLevel3Delete(levelId);
                    _dataContext.sp_HierarchyLevel4Delete(levelId);
                }
                else if (levelName == "Level5")
                {
                    _dataContext.sp_RelationLevel4Delete(levelId);
                    _dataContext.sp_HierarchyLevel5Delete(levelId);
                }
                else if (levelName == "Level6")
                {
                    _dataContext.sp_RelationLevel5Delete(levelId);
                    _dataContext.sp_HierarchyLevel6Delete(levelId);
                }

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
            finally
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        #endregion
    }
}