using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using DatabaseLayer.SQL;
using System.Data.Common;
using System.Data;
using System.Web.Script.Serialization;
using System.ComponentModel;
using System.Data.SqlClient;
using System.Collections.Specialized;
using PocketDCR2.Classes;
using System.Net.Mail;
using System.Net;
using System.Configuration;
using System.Text;
using System.Net.Mime;
using System.IO;
using PocketDCR.CustomMembershipProvider;

namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for DoctorsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    [ScriptService]
    public class DoctorsService : System.Web.Services.WebService
    {
        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nvCollection = new NameValueCollection();

        private Boolean _status = true;

        private static string smtphost = ConfigurationManager.AppSettings["AutoEmailSMTP"].ToString();
        private static string smtpPort = ConfigurationManager.AppSettings["smtpPort"].ToString();
        private static string fromAddress = ConfigurationManager.AppSettings["AutoEmailID"].ToString();
        private static string smtppassword = ConfigurationManager.AppSettings["AutoEmailIDpass"].ToString();
        private static bool smtpSSL = Convert.ToBoolean(ConfigurationManager.AppSettings["AutosmtpSSL"].ToString());
        private static string CCAddress = ConfigurationManager.AppSettings["CCAddress"].ToString();

        private SystemUser _currentUser;

        #endregion

        #region Web Methods
        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDoctorsLocationDetails(int DoctorID)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@DoctorID-int", DoctorID.ToString());
                DataSet ds = GetData("sp_GetDoctorLocationDetailsByID", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ResetDoctorLocationByID(int DoctorID, string Shift)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();

                _nvCollection.Clear();
                _nvCollection.Add("@DoctorID-int", DoctorID.ToString());
                _nvCollection.Add("@Shift-int", Shift);
                DataSet ds = GetData("sp_ResetDoctorLocationByID", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string InsertDoctor(string firstName, string lastName, string middleName, int gender, int designation, bool kol, string country,
            string city, string mobileNumber, string officeNumber, string currentAddress, string permenantAddress, bool isActive, string qualificationId, string specialityId,
            int classId, string productId,
            //int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id, 
            string levelName, int brickId)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _dataContext.Connection.Open();
                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;

                #region Insert Doctor

                var doctor = _dataContext.sp_DoctorsInsert(designation, firstName, lastName, middleName, gender, kol, currentAddress, permenantAddress, city, country,
                    mobileNumber, officeNumber, isActive, DateTime.Now).ToList();

                if (doctor.Count > 0)
                {
                    doctorId = Convert.ToInt64(doctor[0].DoctorId);
                }

                #endregion

                #region Insert Qualification

                string[] qualificationNos = qualificationId.Trim().Split(new char[] { ',' });

                foreach (string t in qualificationNos)
                {
                    if (t != "" && t != "null")
                    {
                        var qualificationid = Convert.ToInt32(t);
                        var insertQualification = _dataContext.sp_QualificationsOfDoctorsInsert(doctorId, qualificationid).ToList();
                    }
                }

                #endregion

                #region Insert Speciality

                string[] specialityNos = specialityId.Trim().Split(new char[] { ',' });

                foreach (string t in specialityNos)
                {
                    if (t != "" && t != "null")
                    {
                        int specialityid = Convert.ToInt32(t);

                        var insertSpeciality =
                            _dataContext.sp_DoctorSpecialityInsert(doctorId, specialityid).ToList();
                    }
                }

                #endregion

                #region Insert Product Relation

                //string[] productNos = productId.Trim().Split(new char[] { ',' });

                //foreach (string t in productNos)
                //{
                //    if (t != "" && t != "null")
                //    {
                //        int productid = Convert.ToInt32(t);

                //        var insertDoctorProductRelation =
                //            _dataContext.sp_DoctorProductRelationInsert(doctorId, productid).ToList();
                //    }
                //}

                #endregion

                #region Insert Class

                if (classId > 0)
                {
                    var insertClass = _dataContext.sp_ClassOfDoctorInsert(doctorId, classId).ToList();
                }

                #endregion

                #region Insert Hierarchy

                //var insertDoctorHierarchy =
                //    _dataContext.sp_DoctorHierarchyInsert(level1Id, level2Id, level3Id, level4Id, level5Id, level6Id, doctorId).ToList();

                #endregion

                #region Insert Brick

                if (brickId > 0)
                {
                    var insertDoctorBrick = _dataContext.sp_DoctorInBrickInsert(brickId, doctorId).ToList();
                }

                #endregion

                returnString = "OK";
                insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/InsertDoctor : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GeBricks()
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                //  _nvCollection.Add("@LevelId-int", "-1");
                //    _nvCollection.Add("@DoctorId-bigint", "-1");
                DataSet ds = GetData("sp_BrickAllSelect", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetClass()
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DoctorClass> selectClass =
                    _dataContext.sp_DoctorClassesSelect(null, null).Select(
                    p =>
                        new DoctorClass()
                        {
                            ClassId = p.ClassId,
                            ClassName = p.ClassName
                        }).ToList();

                returnString = _jss.Serialize(selectClass);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetQualification()
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DoctorQulification> selectQualification =
                    _dataContext.sp_DoctorQulificationSelectActive(null).Select(
                    p =>
                        new DoctorQulification()
                        {
                            QulificationId = p.QulificationId,
                            QualificationName = p.QualificationName,
                        }).ToList();

                returnString = _jss.Serialize(selectQualification);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSpeciality()
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<DatabaseLayer.SQL.Speciality> selectSpeciality =
                    _dataContext.sp_SpecialitySelect(null, null).Select(
                    p =>
                        new DatabaseLayer.SQL.Speciality()
                        {
                            SpecialityId = p.SpecialityId,
                            SpecialiityName = p.SpecialiityName
                        }).ToList();

                returnString = _jss.Serialize(selectSpeciality);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetProduct()
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<Product> selectProduct =
                    _dataContext.sp_ProductsSelect(null, null).Select(
                    p =>
                        new Product()
                        {
                            ProductId = p.ProductId,
                            ProductName = p.ProductName
                        }).ToList();

                returnString = _jss.Serialize(selectProduct);
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDoctor(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<Doctor> doctor = _dataContext.sp_DoctorsSelect(doctorId, null, null, null).Select(
                    p =>
                        new Doctor()
                        {
                            DesignationId = p.DesignationId,
                            FirstName = p.FirstName,
                            LastName = p.LastName,
                            MiddleName = p.MiddleName,
                            Gender = p.Gender,
                            KOL = p.KOL,
                            Address1 = p.Address1,
                            Address2 = p.Address2,
                            City = p.City,
                            Country = p.Country,
                            MobileNumber1 = p.MobileNumber1,
                            MobileNumber2 = p.MobileNumber2,
                            IsActive = p.IsActive
                        }).ToList();

                if (doctor.Count > 0)
                {
                    returnString = _jss.Serialize(doctor);
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
        public string GetQualificationById(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<v_DoctorQualification> getQualificationOfDoctor =
                    _dataContext.sp_QualificationsOfDoctorsSelect(doctorId).Select(
                    p =>
                        new v_DoctorQualification()
                        {
                            DoctorId = p.DoctorId,
                            QualificationName = p.QualificationName
                        }).ToList();

                if (getQualificationOfDoctor.Count > 0)
                {
                    returnString = _jss.Serialize(getQualificationOfDoctor);
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
        public string GetSpeacialityById(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<v_DoctorSpeciality> getDoctorSpeciality =
                    _dataContext.sp_DoctorSpecialitySelect(doctorId).Select(
                    p =>
                    new v_DoctorSpeciality()
                    {
                        DoctorId = p.DoctorId,
                        SpecialityName = p.SpecialityName
                    }).ToList();

                if (getDoctorSpeciality.Count > 0)
                {
                    returnString = _jss.Serialize(getDoctorSpeciality);
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
        public string GetSpeacialityByIdNew(long doctorId)
        {
            string returnString = "";
            NameValueCollection _nvCollection = new NameValueCollection();

            try
            {

                _nvCollection.Clear();
                _nvCollection.Add("@DoctorId-INT", doctorId.ToString());


                DataSet getDoctorSpec = GetData("sp_DoctorSpecialitySelectByDoctor", _nvCollection);



                if (getDoctorSpec.Tables[0].Rows.Count > 0)
                {
                    returnString = getDoctorSpec.Tables[0].ToJsonString();
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
        public string GetClassById(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<v_DoctorClass> getClassOfDoctor =
                    _dataContext.sp_DoctorClassSelectByDoctor(doctorId).Select(
                    p =>
                        new v_DoctorClass()
                        {
                            DoctorId = p.DoctorId,
                            ClassId = p.ClassId
                        }).ToList();

                if (getClassOfDoctor.Count > 0)
                {
                    returnString = _jss.Serialize(getClassOfDoctor);
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
        public string GetProductById(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                List<v_DoctorProductRelation> getDoctorProductRelation =
                    _dataContext.sp_DoctorProductRelationSelect(doctorId).Select(
                    p =>
                        new v_DoctorProductRelation()
                        {
                            DoctorId = p.DoctorId,
                            ProductName = p.ProductName
                        }).ToList();

                if (getDoctorProductRelation.Count > 0)
                {
                    returnString = _jss.Serialize(getDoctorProductRelation);
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
        public string GetDoctorHierarchyLevel(long doctorId)
        {
            string returnString = "";

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                var getSetLevel = _dataContext.sp_ParameterSelect("DoctorLevel").ToList();

                if (getSetLevel.Count != 0)
                {
                    var getDoctorHierarchyLevel = _dataContext.sp_DoctorHierarchySelect(doctorId).Select(
                        p =>
                        new DoctorHierarchy()
                            {
                                Level1LevelId = p.Level1LevelId,
                                Level2LevelId = p.Level2LevelId,
                                Level3LevelId = p.Level3LevelId,
                                Level4LevelId = p.Level4LevelId,
                                Level5LevelId = p.Level5LevelId,
                                Level6LevelId = p.Level6LevelId
                            }).ToList();

                    if (getDoctorHierarchyLevel.Count > 0)
                    {
                        returnString = _jss.Serialize(getDoctorHierarchyLevel);
                    }
                }
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDoctorBrick(long doctorId)
        {
            string returnString = "";
            NameValueCollection _nvCollection = new NameValueCollection();

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());


                _nvCollection.Clear();
                _nvCollection.Add("@DoctorId-INT", doctorId.ToString());


                DataSet getDoctorBrick = GetData("sp_BrickDoctorSelect", _nvCollection);


                //var getDoctorBrick = _dataContext.sp_DoctorInBrickSelect(null, doctorId).Select(
                //    p =>
                //    new v_DoctorBrick()
                //    {
                //        LevelId = p.LevelId,
                //        LevelCode = p.LevelCode, 
                //        LevelName = p.LevelName,
                //        LevelDescription = p.LevelDescription, 
                //        IsActive = p.IsActive
                //    }).ToList();

                if (getDoctorBrick.Tables[0].Rows.Count > 0)
                {
                    returnString = getDoctorBrick.Tables[0].ToJsonString();
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
        public string UpdateDoctor(long doctorId, string firstName, string lastName, string middleName, int gender, int designation, bool kol, string country,
            string city, string mobileNumber, string officeNumber, string currentAddress, string permenantAddress, bool isActive, string qualificationId, string specialityId,
            int classId, string productId, int level1Id, int level2Id, int level3Id, int level4Id, int level5Id, int level6Id, string levelName, int type, int brickId)
        {
            string returnString = "";
            DbTransaction updateTransaction = null;

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _dataContext.Connection.Open();
                updateTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = updateTransaction;

                #region Update Doctor

                List<Doctor> doctor =
                    _dataContext.sp_DoctorsUpdate(doctorId, designation, firstName, lastName, middleName, gender, kol, currentAddress, permenantAddress, city, country,
                    mobileNumber, officeNumber, isActive, DateTime.Now).ToList();

                #endregion

                #region Update Qualification

                if (qualificationId != "0" && qualificationId != "null")
                {
                    _dataContext.sp_QualificationsOfDoctorsDelete(doctorId);
                    string[] qualificationNos = qualificationId.Trim().Split(new char[] { ',' });

                    for (int i = 0; i < qualificationNos.Length; i++)
                    {
                        if (qualificationNos[i] != "" && qualificationNos[i] != "null")
                        {
                            int qualificationid = Convert.ToInt32(qualificationNos[i]);

                            List<QualificationsOfDoctor> insertQualification =
                                _dataContext.sp_QualificationsOfDoctorsInsert(doctorId, qualificationid).ToList();
                        }
                    }
                }

                #endregion

                #region Update Speciality & Presales speciality

                if (specialityId != "0" && specialityId != "null")
                {
                    // _dataContext.sp_DoctorSpecialityDelete(doctorId);
                    //  string[] specialityNos = specialityId.Trim().Split(new char[] { ',' });
                    //for (int i = 0; i < specialityNos.Length; i++)
                    //{
                    //    if (specialityNos[i] != "" && specialityNos[i] != "null")
                    //    {
                    //        int specialityid = Convert.ToInt32(specialityNos[i]);

                    //List<DoctorSpeciality> insertSpeciality =
                    //        _dataContext.sp_DoctorSpecialityInsert(doctorId, Convert.ToInt32(specialityId)).ToList();
                    //        }
                    //    }
                    //}

                    _nvCollection.Clear();
                    _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                    _nvCollection.Add("@SpecialityId-INT", specialityId.ToString());

                    DataSet DoctorSpec = GetData("sp_psc_DoctorSpecialityUpdate", _nvCollection);

                }


                #endregion

                #region Update Product Relation

                //if (productId != "0" && productId != "null")
                //{
                //    _dataContext.sp_DoctorProductRelationDelete(doctorId);
                //    string[] productNos = productId.Trim().Split(new char[] { ',' });
                //    for (int i = 0; i < productNos.Length; i++)
                //    {
                //        if (productNos[i] != "" && productNos[i] != "null")
                //        {
                //            int productid = Convert.ToInt32(productNos[i]);

                //            List<DoctorProductRelation> insertDoctorProductRelation =
                //                _dataContext.sp_DoctorProductRelationInsert(doctorId, productid).ToList();
                //        }
                //    }
                //}

                #endregion

                #region Update Class

                List<ClassOfDoctor> updateClass = _dataContext.sp_ClassOfDoctorUpdate(doctorId, classId).ToList();

                #endregion

                #region Update Hierarchy

                if (type == 1)
                {
                    var updateDoctorHierarchy = _dataContext.sp_DoctorHierarchyUpdate(level1Id, level2Id, level3Id,
                        level4Id, level5Id, level6Id, doctorId).ToList();
                }

                #endregion

                #region Update Brick

                if (brickId > 0)
                {
                    var isBrickPresent = _dataContext.sp_DoctorInBrickSelect(null, doctorId).ToList();

                    if (isBrickPresent.Count > 0)
                    {
                        var updateDoctorBrick = _dataContext.sp_DoctorInBrickUpdate(brickId, doctorId).ToList();
                    }
                    else
                    {
                        var insertDoctorBrick = _dataContext.sp_DoctorInBrickInsert(brickId, doctorId).ToList();
                    }
                }

                #endregion

                returnString = "OK";
                updateTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/UpdateDoctor : " + exception.Message));
                returnString = exception.Message;
                if (updateTransaction != null) updateTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DeleteDoctor(long doctorId)
        {
            string returnString = "";
            DbTransaction deleteTransaction = null;

            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _dataContext.Connection.Open();
                deleteTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = deleteTransaction;

                _dataContext.sp_DoctorHierarchyDelete(doctorId);
                _dataContext.sp_ClassOfDoctorDelete(doctorId);
                _dataContext.sp_QualificationsOfDoctorsDelete(doctorId);
                _dataContext.sp_DoctorSpecialityDelete(doctorId);
                _dataContext.sp_DoctorProductRelationDelete(doctorId);
                _dataContext.sp_DoctorsOfSpoDelete(doctorId);
                _dataContext.sp_PreSalesCallsDeleteByDoctor(doctorId);
                _dataContext.sp_MRPlanningDeleteBydoctor(doctorId);
                _dataContext.sp_DoctorInBrickDelete(null, doctorId);
                _dataContext.sp_DoctorsDelete(doctorId);

                returnString = "OK";
                deleteTransaction.Commit();
            }
            catch (SqlException exception)
            {
                if (exception.Number == 547)
                {
                    returnString = "Not able to delete this record due to linkup.";
                }
                else
                {
                    returnString = exception.Message;
                }
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/DeleteDoctor : " + exception.Message));
                deleteTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        //Umer work

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllClasses()
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();

                DataSet ds = GetData("sp_SelectAllClasses", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllBricks(string DistributorId)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@DistributorId-varchar(250)", DistributorId.ToString());

                DataSet ds = GetData("sp_SelectAllBricks_ForBricksAndDistributor", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllCity(string BrickId)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@BrickId-varchar(250)", BrickId.ToString());

                DataSet ds = GetData("[sp_SelectAllCity_ForBricksAndDistributor]", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetBricks(string singleBrick)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@ID-varchar(250)", singleBrick.ToString());

                DataSet ds = GetData("sp_SelectOneBricks_ForBricksAndDistributor", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDistributors()
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();

                DataSet ds = GetData("sp_SelectAllDistributor_ForBricksAndDistributor", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataOfAddToListProcess(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role)
        {
            string returnString = "";
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                string role = Context.Session["CurrentUserRole"].ToString();

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", Level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", Level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", Level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", Level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", Level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", Level6Id.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());

                DataSet ds = GetData("sp_AddToListProccessDoctorSelect", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetDataOfAddListToProcess : " + exception.Message));
                returnString = exception.Message;
            }
            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDataWithoutNewRequest(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role)
        {
            _currentUser = (SystemUser)Session["SystemUser"];
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", Level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", Level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", Level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", Level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", Level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", Level6Id.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                DataSet ds = GetData("sp_DoctorDetailSelect_level6_WithoutNewRequest", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetAllDataWithoutRequest : " + exception.Message));
                returnString = exception.Message;
            }

            return returnString;
        }

        //----------------------------------------------- List Doctors ---------------------------------------------------------- //


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDCRDoctor(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role, string date)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1id.ToString());
                _nvCollection.Add("@Level2id-INT", level2id.ToString());
                _nvCollection.Add("@Level3id-INT", level3id.ToString());
                _nvCollection.Add("@Level4id-INT", level4id.ToString());
                _nvCollection.Add("@Level5id-INT", level5id.ToString());
                _nvCollection.Add("@Level6id-INT", level6id.ToString());
                _nvCollection.Add("@EmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                _nvCollection.Add("@date-INT", date.ToString());

                DataSet ds = GetData("sp_DCRSelectForRemoveRequest_ForBricksAndDistributor", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();

                }

            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetAllDCRDoctor : " + exception.Message));
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUnListedDocs(int empid, string speciality, string city)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1id.ToString());
                _nvCollection.Add("@Level2id-INT", level2id.ToString());
                _nvCollection.Add("@Level3id-INT", level3id.ToString());
                _nvCollection.Add("@Level4id-INT", level4id.ToString());
                _nvCollection.Add("@Level5id-INT", level5id.ToString());
                _nvCollection.Add("@Level6id-INT", level6id.ToString());
                _nvCollection.Add("@EmployeeId-INT", (empid.ToString() == "0" ? Session["CurrentUserId"].ToString() : empid.ToString()));
                _nvCollection.Add("@City-varchar(50)", city);
                _nvCollection.Add("@speciality-varchar(100)", speciality);
                DataSet ds = GetData("sp_UnlistedDoctorSelect", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetUnlistedDocs : " + exception.Message));
                returnString = exception.Message;
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddTolist(string docid, string empid, string classId, string frequency)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;

            try
            {
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                //_dataContext.Connection.Open();
                //insertTransaction = _dataContext.Connection.BeginTransaction();
                //_dataContext.Transaction = insertTransaction;

                #region Get Hierarchy

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(Convert.ToInt32(empid)).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    //levelId1 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    //levelId2 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                var MIOId = Convert.ToInt32(empid);
                doctorId = Convert.ToInt32(docid);

                //List<v_DoctorOfSpoLikeDCR> doctorvf = _dataContext.v_DoctorOfSpoLikeDCRs.Select(
                //    p => p).Where(p => p.DoctorId == doctorId && p.EmployeeId == MIOId).ToList();

                _nvCollection.Clear();
                _nvCollection.Add("@empID-bigint", MIOId.ToString());
                _nvCollection.Add("@docId-bigint", doctorId.ToString());
                DataSet doctorvf = GetData("sp_CheckDoctorOfSpoLikeDCR", _nvCollection);

                if (doctorvf.Tables[0].Rows.Count > 0)
                {
                    returnString = "Already Exist!";
                }
                else
                {
                    //var doctorverification = _dataContext.sp_DoctorVerificationInsert(Convert.ToInt32(doctorId), levelId1, levelId2, levelId3, levelId4, levelId5, levelId6, 0,
                    //    Convert.ToInt32(empid), DateTime.Now).ToList();

                    _nvCollection.Clear();
                    _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                    _nvCollection.Add("@HLevel1-INT", levelId1.ToString());
                    _nvCollection.Add("@HLevel2-INT", levelId2.ToString());
                    _nvCollection.Add("@HLevel3-INT", levelId3.ToString());
                    _nvCollection.Add("@HLevel4-INT", levelId4.ToString());
                    _nvCollection.Add("@HLevel5-INT", levelId5.ToString());
                    _nvCollection.Add("@HLevel6-INT", levelId6.ToString());
                    _nvCollection.Add("@DocCode-INT", "0");
                    _nvCollection.Add("@EmpId-INT", empid.ToString());
                    _nvCollection.Add("@classId-INT", classId.ToString());
                    _nvCollection.Add("@frequency-varchar(50)", frequency.ToString());
                    _nvCollection.Add("@CreateDate-DateTime", DateTime.Now.ToString());
                    _nvCollection.Add("@UpdateDate-DateTime", DateTime.Now.ToString());
                    DataSet doctorverification = GetData("sp_DoctorVerificationInsert", _nvCollection);

                    if (doctorverification.Tables[0].Rows.Count > 0)
                    {
                        var dvfID = Convert.ToInt64(doctorverification.Tables[0].Rows[0]["ID"]);
                    }
                    returnString = "OK";

                }

                #endregion

                //insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/AddToList : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }


            NameValueCollection nv = new NameValueCollection();
            nv.Clear();
            nv.Add("@SPO-int", empid.ToString());
            nv.Add("@MessageTitle-varchar(500)", "Addition Doctor Request");

            var dss = GetData("InsertNotification", nv);

            return returnString;





        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddTolistUpdateRequest(string docid, string empid, string classId, string singleBrick, string CityID, string Distributer, string frequency)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;

            try
            {
                #region Get Hierarchy

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                var MIOId = Convert.ToInt32(empid);
                doctorId = Convert.ToInt32(docid);

                _nvCollection.Clear();
                _nvCollection.Add("@DoctorID-nvarchar(250)", doctorId.ToString());
                _nvCollection.Add("@HLevel1-Bigint", levelId1.ToString());
                _nvCollection.Add("@HLevel2-Bigint", levelId2.ToString());
                _nvCollection.Add("@HLevel3-Bigint", levelId3.ToString());
                _nvCollection.Add("@HLevel4-Bigint", levelId4.ToString());
                _nvCollection.Add("@HLevel5-Bigint", levelId5.ToString());
                _nvCollection.Add("@HLevel6-Bigint", levelId6.ToString());
                _nvCollection.Add("@classId-Bigint", classId.ToString());
                _nvCollection.Add("@EmpId-Bigint", empid.ToString());
                _nvCollection.Add("@city-varchar(250)", CityID.ToString());
                _nvCollection.Add("@Bricks-varchar(250)", singleBrick.ToString());
                _nvCollection.Add("@Distributors-varchar(250)", Distributer.ToString());
                _nvCollection.Add("@frequency-varchar(250)", frequency.ToString());
                _nvCollection.Add("@CreateDate-DateTime", DateTime.Today.ToString());
                DataSet doctorverification = GetData("sp_DoctorBrickRequest_ForBricksAndDistributor", _nvCollection);

                if (doctorverification.Tables[0].Rows.Count > 0)
                {
                    returnString = doctorverification.Tables[0].Rows[0][0].ToString();
                }
                //returnString = "ok";

                #endregion

                //insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/AddToList : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddTolistUpdate(string docid, string empid, string classId, string singleBrick, string Distributer, string frequency)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;

            try
            {
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                //_dataContext.Connection.Open();
                //insertTransaction = _dataContext.Connection.BeginTransaction();
                //_dataContext.Transaction = insertTransaction;

                #region Get Hierarchy

                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(Convert.ToInt32(empid)).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    //levelId1 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    //levelId2 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                var MIOId = Convert.ToInt32(empid);
                doctorId = Convert.ToInt32(docid);

                _nvCollection.Clear();
                _nvCollection.Add("@DoctorID-varchar(250)", doctorId.ToString());
                _nvCollection.Add("@classID-varchar(250)", classId.ToString());
                _nvCollection.Add("@BrickID-varchar(250)", singleBrick.ToString());
                _nvCollection.Add("@DistributerID-varchar(250)", Distributer.ToString());
                _nvCollection.Add("@frequencyID-varchar(250)", frequency.ToString());
                _nvCollection.Add("@EmployeeID-varchar(250)", empid.ToString());
                DataSet doctorverification = GetData("sp_UpdateDoctorRequest_ForBricksAndDistributor", _nvCollection);

                if (doctorverification.Tables[0].Rows.Count > 0)
                {
                    var dvfid = Convert.ToInt64(doctorverification.Tables[0].Rows[0]["id"]);
                }
                returnString = "ok";

                //List<v_DoctorOfSpoLikeDCR> doctorvf = _dataContext.v_DoctorOfSpoLikeDCRs.Select(
                //    p => p).Where(p => p.DoctorId == doctorId && p.EmployeeId == MIOId).ToList();

                //_nvCollection.Clear();
                //_nvCollection.Add("@empID-bigint", MIOId.ToString());
                //_nvCollection.Add("@docId-bigint", doctorId.ToString());
                //DataSet doctorvf = GetData("sp_CheckDoctorOfSpoLikeDCR", _nvCollection);

                //if (doctorvf.Tables[0].Rows.Count > 0)
                //{
                //    returnString = "Already Exist!";
                //}
                //else
                //{
                //    //var doctorverification = _dataContext.sp_DoctorVerificationInsert(Convert.ToInt32(doctorId), levelId1, levelId2, levelId3, levelId4, levelId5, levelId6, 0,
                //    //    Convert.ToInt32(empid), DateTime.Now).ToList();

                //    _nvCollection.Clear();
                //    _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                //    _nvCollection.Add("@HLevel1-INT", levelId1.ToString());
                //    _nvCollection.Add("@HLevel2-INT", levelId2.ToString());
                //    _nvCollection.Add("@HLevel3-INT", levelId3.ToString());
                //    _nvCollection.Add("@HLevel4-INT", levelId4.ToString());
                //    _nvCollection.Add("@HLevel5-INT", levelId5.ToString());
                //    _nvCollection.Add("@HLevel6-INT", levelId6.ToString());
                //    _nvCollection.Add("@DocCode-INT", "0");
                //    _nvCollection.Add("@EmpId-INT", empid.ToString());
                //    _nvCollection.Add("@classId-INT", classId.ToString());
                //    _nvCollection.Add("@frequency-varchar(50)", frequency.ToString());
                //    _nvCollection.Add("@CreateDate-DateTime", DateTime.Now.ToString());
                //    _nvCollection.Add("@UpdateDate-DateTime", DateTime.Now.ToString());
                //    DataSet doctorverification = GetData("sp_DoctorVerificationInsert", _nvCollection);

                //    if (doctorverification.Tables[0].Rows.Count > 0)
                //    {
                //        var dvfID = Convert.ToInt64(doctorverification.Tables[0].Rows[0]["ID"]);
                //    }
                //    returnString = "OK";

                //}

                #endregion

                //insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/AddToList : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ApproveThis(string id, string docid, string empid, string date, string Status, string CurrentUserRole)
        {
            string returnString = "";
            string EmployeeName="";
            string SpoNamewithTerritory = "", ManagerName = "", BUH = "", msg = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-varchar(250)", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());
                DataSet result = GetData("SP_InsertIntoDCR_DoctorVerification_bulkUploaderApprove", _nvCollection);

                if (CurrentUserRole.ToUpper() == "RL4")
                {
                    if (result.Tables[1].Rows.Count != 0)
                    {
                        SpoNamewithTerritory = String.Join(" ,<br/>", result.Tables[0].AsEnumerable().Select(x => x.Field<string>("SpoNamewithTerritory").ToString()).ToArray());
                     
                        //String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "Doctor AddTolist");
                        string emailAddresses = result.Tables[1].Rows[0][1].ToString();
                        EmployeeName = result.Tables[0].Rows[0]["SpoName"].ToString();
                        //SpoNamewithTerritory = result.Tables[0].Rows[0]["SpoNamewithTerritory"].ToString();
                        ManagerName = result.Tables[0].Rows[0]["ManagerName"].ToString();
                        BUH = result.Tables[0].Rows[0]["Rl3Name"].ToString();
                        msg = "Addition of Doctors  from Master list";
                        foreach (String emailAddress in emailAddresses.Split(';'))
                        {
                            try
                            {
                                
                                    ErrorLog("Code will enter in SendMail pf ApproveThis Method");
                                
                             

                                SendMail("SFE Approval Request", emailAddress, empid, id, "0", "0", "0", "excelURL", EmployeeName, SpoNamewithTerritory, BUH, ManagerName, msg);
                                //PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: Doctors Add To List Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + "excelURL");
                            }
                            catch (Exception ex)
                            {
                                ErrorLog("Code failed in SendMail of ApproveThis Method. (" + ex.Message + ")");
                                throw ex;
                            }
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                ErrorLog("Code failed in ApproveThis Method. (" + exception.Message + ")");
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/ApproveThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string AddTolistReject(string id, string docid, string empid, string date, string Status, string CurrentUserRole)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-varchar(250)", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());
                DataSet result = GetData("SP_InsertIntoDCR_DoctorVerification_bulkUploaderReject", _nvCollection);
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/AddTolistReject : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDataOfRemovalRequest(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role)
        {
            string returnString = "";
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", Level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", Level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", Level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", Level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", Level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", Level6Id.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                DataSet ds = GetData("sp_DoctorDetailSelectForRemoveRquest", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();

                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoctorRemoveApproveThis(string id, string docid, string date, string empid, string Status)
        {
            string CurrentUserRole = Context.Session["CurrentUserRole"].ToString();
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            string EmployeeName = "", SpoNamewithTerritory = "", ManagerName = "", BUH = "", msg = "";
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-varchar(50)", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());
                DataSet result = GetData("sp_RemovefromDCR_DoctorRemoval_bulkUploaderApprove", _nvCollection);

                if (CurrentUserRole.ToUpper() == "RL4")
                {
                    if (result.Tables[1].Rows.Count != 0)
                    {
                        SpoNamewithTerritory = String.Join(" ,<br/>", result.Tables[0].AsEnumerable().Select(x => x.Field<string>("SpoNamewithTerritory").ToString()).ToArray());

                        //String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "Doctor Remove Request");
                        string emailAddresses = result.Tables[1].Rows[0][1].ToString();
                        EmployeeName = result.Tables[0].Rows[0]["SpoName"].ToString();
                        //SpoNamewithTerritory = result.Tables[0].Rows[0]["SpoNamewithTerritory"].ToString();
                        ManagerName = result.Tables[0].Rows[0]["ManagerName"].ToString();
                        BUH = result.Tables[0].Rows[0]["Rl3Name"].ToString();
                        msg = "Deletion of Doctors from list";
                        foreach (String emailAddress in emailAddresses.Split(';'))
                        {
                            try
                            {
                                ErrorLog("Code will enter in SendMail of DoctorRemoveApproveThis Method");
                                SendMail("SFE Approval Request", emailAddress, empid, "0", id, "0", "0", "excelURL", EmployeeName, SpoNamewithTerritory, BUH, ManagerName, msg);
                                PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: Doctors Add To List Proccessed And Email Send " + emailAddresses + "");
                            }
                            catch (Exception ex)
                            {
                                ErrorLog("Code failed in SendMail of DoctorRemoveApproveThis Method. " + ex.Message + ")");
                                throw ex;
                            }
                        }
                    }
                }
            }


            //string returnString = "";
            //DbTransaction insertTransaction = null;

            //try
            //{
            //    string[] pkIds = id.Split(',');
            //    string[] docIds = docid.Split(',');
            //    string[] dates = date.Split(',');
            //    //string[] empIds = empid.Split(',');

            //    for (int i = 0; i < pkIds.Count(); i++)
            //    {
            //        string pkID = pkIds[i];
            //        string docID = docIds[i];
            //        string monthdate = dates[i];
            //        //string mioid = empIds[i];


            //        #region Get Doc Removal Record

            //        NameValueCollection _nvCollection = new NameValueCollection();
            //        _nvCollection.Clear();
            //        _nvCollection.Add("@ID-BIGINT", pkID.ToString());
            //        _nvCollection.Add("@DocID-BIGINT", docID.ToString());
            //        _nvCollection.Add("@EmpID-BIGINT", empid.ToString());
            //        //  _nvCollection.Add("@date-BIGINT", date.ToString());
            //        DataSet getDocVerificationRecord = GetData("sp_DoctorRemovalSelect", _nvCollection);

            //        #endregion

            //        #region InsertDoctorVerification

            //        if (getDocVerificationRecord.Tables[0].Rows.Count > 0)
            //        {
            //            var DocVerificationId = getDocVerificationRecord.Tables[0].Rows[0]["ID"];
            //            var DocId = getDocVerificationRecord.Tables[0].Rows[0]["DoctorId"];
            //            var MIOID = getDocVerificationRecord.Tables[0].Rows[0]["MIOID"];
            //            var DocCode = getDocVerificationRecord.Tables[0].Rows[0]["DocCode"];


            //            _nvCollection.Clear();
            //            _nvCollection.Add("@MIOID-bigint", MIOID.ToString());
            //            _nvCollection.Add("@DocId-bigint", DocId.ToString());
            //            _nvCollection.Add("@DocCode-bigint", DocCode.ToString());
            //            _nvCollection.Add("@DocVerificationId-int", DocVerificationId.ToString());
            //            _nvCollection.Add("@date-int", monthdate.ToString());
            //            DataSet docVerDetails = GetData("sp_RemovefromDCR_DoctorRemoval", _nvCollection);

            //            if (docVerDetails.Tables[0].Rows.Count > 0)
            //            {
            //                returnString = "OK";
            //                //returnString = docVerDetails.Tables[0].ToJsonString();
            //            }
            //        }

            //    }

            //        #endregion

            //    //insertTransaction.Commit();

            catch (Exception exception)
            {
                ErrorLog("Code failed in DoctorRemoveApproveThis Method. " + exception.Message + ")");

                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/DoctorRemoveApproveThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string DoctorRemoveRejectThis(string id, string docid, string date, string empid, string Status)
        {
            string CurrentUserRole = Context.Session["CurrentUserRole"].ToString();
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);
                //var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchySelect_PharmEVO(empid).ToList();

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-int", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());
                DataSet result = GetData("sp_RemovefromDCR_DoctorRemoval_bulkUploaderReject", _nvCollection);
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/DoctorRemoveRejectThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MultipleAddTolist(string multipleDocIDs, string empid, string classId, string frequency)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0;

            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();

                string[] docids = multipleDocIDs.Split(',');

                #region Get Hierarchy

                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                for (int i = 0; i < docids.Count(); i++)
                {
                    var doc_id = docids[i];


                    var MIOId = Convert.ToInt32(empid);
                    doctorId = Convert.ToInt32(doc_id);

                    _nvCollection.Clear();
                    _nvCollection.Add("@empID-bigint", MIOId.ToString());
                    _nvCollection.Add("@docId-bigint", doctorId.ToString());
                    DataSet doctorvf = GetData("sp_CheckDoctorOfSpoLikeDCR", _nvCollection);

                    if (doctorvf.Tables[0].Rows.Count > 0)
                    {
                        returnString = "Already Exist!";
                    }
                    else
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                        _nvCollection.Add("@HLevel1-INT", levelId1.ToString());
                        _nvCollection.Add("@HLevel2-INT", levelId2.ToString());
                        _nvCollection.Add("@HLevel3-INT", levelId3.ToString());
                        _nvCollection.Add("@HLevel4-INT", levelId4.ToString());
                        _nvCollection.Add("@HLevel5-INT", levelId5.ToString());
                        _nvCollection.Add("@HLevel6-INT", levelId6.ToString());
                        _nvCollection.Add("@DocCode-INT", "0");
                        _nvCollection.Add("@EmpId-INT", empid.ToString());
                        _nvCollection.Add("@classId-INT", classId.ToString());
                        _nvCollection.Add("@frequency-varchar(50)", frequency.ToString());
                        _nvCollection.Add("@CreateDate-DateTime", DateTime.Now.ToString());
                        _nvCollection.Add("@UpdateDate-DateTime", DateTime.Now.ToString());
                        DataSet doctorverification = GetData("sp_DoctorVerificationInsert", _nvCollection);

                        if (doctorverification.Tables[0].Rows.Count > 0)
                        {
                            var dvfID = Convert.ToInt64(doctorverification.Tables[0].Rows[0]["ID"]);
                        }
                        returnString = "OK";

                    }
                }

                #endregion

            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/MultipleAddTolist : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;
        }


        //------------------------------------------------------------------ Submitt Btn ------------------------------------------//

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MultipleUpdateTolist(string multipleDocIDs, string multieReqStatus, string empid, string classId, string frequency, string City, string Distributor, string BricK, string Date , string Address)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0, BatchID = 0;

            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();

                string[] docids = multipleDocIDs.Split(',');
                string[] docreqids = multieReqStatus.Split(',');

                #region Get Hierarchy

                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    levelId1 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    levelId2 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                _nvCollection.Clear();
                DataSet getBatchID = GetData("BrickAndDistributorBulkUploadBatchID", _nvCollection);
                if (getBatchID.Tables[0].Rows.Count > 0)
                {
                    BatchID = Convert.ToInt32(getBatchID.Tables[0].Rows[0]["batchID"]);
                }
                BatchID += 1;
                DataTable dt = new DataTable();
                dt.Columns.Add(new DataColumn("BatchID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("DoctorID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("empid", typeof(Int64)));
                dt.Columns.Add(new DataColumn("classId", typeof(Int64)));
                dt.Columns.Add(new DataColumn("frequency", typeof(string)));
                dt.Columns.Add(new DataColumn("City", typeof(String)));
                dt.Columns.Add(new DataColumn("Distributor", typeof(Int64)));
                dt.Columns.Add(new DataColumn("BricK_ID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel1", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel2", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel3", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel4", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel5", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel6", typeof(Int64)));
                dt.Columns.Add(new DataColumn("UpdateDate", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("CreateDate", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("RequestDate", typeof(String)));
                dt.Columns.Add(new DataColumn("Status", typeof(String)));
                dt.Columns.Add(new DataColumn("Flag", typeof(String)));
                dt.Columns.Add(new DataColumn("ReqStatus", typeof(String)));
                dt.Columns.Add(new DataColumn("Remarks", typeof(String)));
                dt.Columns.Add(new DataColumn("Form", typeof(String)));

                //-------------------- ADD Adresss-----------------------------------------------------------//
             //   dt.Columns.Add(new DataColumn("Address", typeof(String)));
                //--------------------End-----------------------------------------------------------//

                for (int i = 0; i < docids.Count(); i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["BatchID"] = BatchID.ToString();
                    dr["DoctorID"] = docids[i];
                    dr["empid"] = empid;
                    dr["classId"] = classId;
                    dr["frequency"] = frequency;
                    dr["City"] = City.ToString();
                    dr["Distributor"] = Distributor;
                    dr["BricK_ID"] = BricK;
                    dr["HLevel1"] = levelId1.ToString();
                    dr["HLevel2"] = levelId2.ToString();
                    dr["HLevel3"] = levelId3.ToString();
                    dr["HLevel4"] = levelId4.ToString();
                    dr["HLevel5"] = levelId5.ToString();
                    dr["HLevel6"] = levelId6.ToString();
                    dr["UpdateDate"] = DateTime.Now.ToString();
                    dr["CreateDate"] = DateTime.Now.ToString();
                    dr["RequestDate"] = Date.ToString();
                    dr["Status"] = "False";
                    dr["Flag"] = "U";
                    dr["ReqStatus"] = docreqids[i].ToString();
                    dr["Remarks"] = "";
                    dr["Form"] = "Request From Brick And Distributors";
                    //-------------------- ADD Adresss-----------------------------------------------------------//
                   // dr["Address"] = Address;

                    dt.Rows.Add(dr);
                }
                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("RecordValues", dt);

                DataSet results = GetData("sp_BrickAndDistributorBulkUploads", command, true);
                Int64 dvfID = 0;
                if (dt.Rows.Count > 0)
                {
                    dvfID = Convert.ToInt64(dt.Rows[0]["BatchID"]);
                }
                returnString = "OK";

                _nvCollection.Clear();
                _nvCollection.Add("@batch-bigint", dvfID.ToString());
                _nvCollection.Add("@Address-varchar(200)", Address.ToString());
                DataSet doctorverification = GetData("sp_BrickAndDistributorBulkUploadsCursor", _nvCollection);

                //DataSet doctorverification = GetData("sp_DoctorVerificationInsert", _nvCollection);
                //for (int i = 0; i < docids.Count(); i++)
                //{
                //    var doc_id = docids[i];


                //    var MIOId = Convert.ToInt32(empid);
                //    doctorId = Convert.ToInt32(doc_id);

                //    _nvCollection.Clear();
                //    _nvCollection.Add("@empID-bigint", MIOId.ToString());
                //    _nvCollection.Add("@docId-bigint", doctorId.ToString());
                //    DataSet doctorvf = GetData("sp_CheckDoctorOfSpoLikeDCR", _nvCollection);

                //    if (doctorvf.Tables[0].Rows.Count > 0)
                //    {
                //        returnString = "Already Exist!";
                //    }
                //    else
                //    {
                //        _nvCollection.Clear();
                //        _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                //        _nvCollection.Add("@HLevel1-INT", levelId1.ToString());
                //        _nvCollection.Add("@HLevel2-INT", levelId2.ToString());
                //        _nvCollection.Add("@HLevel3-INT", levelId3.ToString());
                //        _nvCollection.Add("@HLevel4-INT", levelId4.ToString());
                //        _nvCollection.Add("@HLevel5-INT", levelId5.ToString());
                //        _nvCollection.Add("@HLevel6-INT", levelId6.ToString());
                //        _nvCollection.Add("@DocCode-INT", "0");
                //        _nvCollection.Add("@EmpId-INT", empid.ToString());
                //        _nvCollection.Add("@classId-INT", classId.ToString());
                //        _nvCollection.Add("@frequency-varchar(50)", frequency.ToString());
                //        _nvCollection.Add("@CreateDate-DateTime", DateTime.Now.ToString());
                //        _nvCollection.Add("@UpdateDate-DateTime", DateTime.Now.ToString());
                //        DataSet doctorverification = GetData("sp_DoctorVerificationInsert", _nvCollection);

                //        if (doctorverification.Tables[0].Rows.Count > 0)
                //        {
                //            var dvfID = Convert.ToInt64(doctorverification.Tables[0].Rows[0]["ID"]);
                //        }
                //        returnString = "OK";

                //    }
                //}








                string message = Notification(empid);


                #endregion


           


            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/MultipleAddTolist : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }



            return returnString;
        }


        //-------------------------------------- syed faraz Code -------------------------------------------

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string Notification(string empid)
        {
            string Frequency = "Frequency";
            _nvCollection.Clear();
            _nvCollection.Add("@SPO-INT", empid);
            _nvCollection.Add("@MessageTitle-varchar(500)", Frequency);
            DataSet dt = GetData("InsertNotification", _nvCollection);
            string message = dt.Tables[0].ToString();
            return message;
        }



        //---------------------------------------- End ----------------------------------------------------------


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserRoleByEmpId(int EmpId)
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeId-INT", EmpId.ToString());

                DataSet ds = GetData("sp_GetUserRoleByEmpId", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string RemoveDocRequest(string Docid, string EmployeeId, string date)
        {
            _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
            // bool val = false;
            string returnString = "";
            try
            {
                string[] doclist = Docid.Split(',');
                string val = "";

                foreach (var item in doclist)
                {
                    if (item != "")
                    {

                        NameValueCollection _nvCollection = new NameValueCollection();
                        _nvCollection.Clear();


                        _nvCollection.Clear();
                        _nvCollection.Add("@DoctorId-INT", item);
                        _nvCollection.Add("@Role-varchar(50)", "");
                        _nvCollection.Add("@EmpId-int", EmployeeId.ToString());
                        _nvCollection.Add("@date-int", date.ToString());
                        DataSet ds = GetData("sp_DoctorRemoveRequest", _nvCollection);
                        val = ds.Tables[0].Rows[0][0].ToString();


                    }

                }

            if (val == "OK")
                {
                    NameValueCollection nv = new NameValueCollection();
                    nv.Clear();
                    nv.Add("@SPO-int", EmployeeId.ToString());
                    nv.Add("@MessageTitle-varchar(500)", "Doctor Removable");

                    var dss = GetData("InsertNotification", nv);

                    returnString = "OK";
                }
                else if (val == "YourDoctorRemoveRequestAlreadyEixst")
                {
                    returnString = "AlreadyEixst";
                }

                //returnString = val;


      

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string removeMultipleDocs(string Docids, string EmployeeId, string multieReqStatus, string date)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;
            long doctorId = 0;
            int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0, BatchID = 0;

            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();

                string[] doclist = Docids.Split(',');
                string[] docreqStatuslist = multieReqStatus.Split(',');

                #region Get Hierarchy

                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", EmployeeId.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    levelId3 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    levelId4 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    levelId5 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    levelId6 = Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                #endregion

                #region InsertDoctorVerification

                _nvCollection.Clear();
                DataSet getBatchID = GetData("BrickAndDistributorBulkUploadBatchID", _nvCollection);
                if (getBatchID.Tables[0].Rows.Count > 0)
                {
                    BatchID = Convert.ToInt32(getBatchID.Tables[0].Rows[0]["batchID"]);
                }
                BatchID += 1;
                DataTable dt = new DataTable();
                dt.Columns.Add(new DataColumn("BatchID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("DoctorID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("empid", typeof(Int64)));
                dt.Columns.Add(new DataColumn("classId", typeof(Int64)));
                dt.Columns.Add(new DataColumn("frequency", typeof(string)));
                dt.Columns.Add(new DataColumn("City", typeof(Int64)));
                dt.Columns.Add(new DataColumn("Distributor", typeof(Int64)));
                dt.Columns.Add(new DataColumn("BricK_ID", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel1", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel2", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel3", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel4", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel5", typeof(Int64)));
                dt.Columns.Add(new DataColumn("HLevel6", typeof(Int64)));
                dt.Columns.Add(new DataColumn("UpdateDate", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("CreateDate", typeof(DateTime)));
                dt.Columns.Add(new DataColumn("RequestDate", typeof(String)));
                dt.Columns.Add(new DataColumn("Status", typeof(String)));
                dt.Columns.Add(new DataColumn("Flag", typeof(String)));
                dt.Columns.Add(new DataColumn("ReqStatus", typeof(String)));
                dt.Columns.Add(new DataColumn("Remarks", typeof(String)));
                dt.Columns.Add(new DataColumn("Form", typeof(String)));
                for (int i = 0; i < doclist.Count(); i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["BatchID"] = BatchID.ToString();
                    dr["DoctorID"] = doclist[i];
                    dr["empid"] = EmployeeId.ToString();
                    dr["classId"] = DBNull.Value;
                    dr["frequency"] = DBNull.Value;
                    dr["City"] = DBNull.Value;
                    dr["Distributor"] = DBNull.Value;
                    dr["BricK_ID"] = DBNull.Value;
                    dr["HLevel1"] = levelId1.ToString();
                    dr["HLevel2"] = levelId2.ToString();
                    dr["HLevel3"] = levelId3.ToString();
                    dr["HLevel4"] = levelId4.ToString();
                    dr["HLevel5"] = levelId5.ToString();
                    dr["HLevel6"] = levelId6.ToString();
                    dr["UpdateDate"] = DateTime.Now.ToString();
                    dr["CreateDate"] = DateTime.Now.ToString();
                    dr["RequestDate"] = date.ToString();
                    dr["Status"] = "False";
                    dr["Flag"] = "D";
                    dr["ReqStatus"] = docreqStatuslist[i].ToString();
                    dr["Remarks"] = "";
                    dr["Form"] = "Remove Doctor Request";
                    dt.Rows.Add(dr);
                }
                SqlCommand command = new SqlCommand();

                command.Parameters.AddWithValue("RecordValues", dt);

                DataSet results = GetData("sp_BrickAndDistributorBulkUploads", command, true);
                Int64 dvfID = 0;
                if (dt.Rows.Count > 0)
                {
                    dvfID = Convert.ToInt64(dt.Rows[0]["BatchID"]);
                }
                returnString = "OK";

                _nvCollection.Clear();
                _nvCollection.Add("@batch-bigint", dvfID.ToString());
                DataSet doctorverification = GetData("sp_BrickAndDistributorBulkUploadsCursor", _nvCollection);
                returnString = "OK";
                #endregion

            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/RemoveThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return returnString;

            //int doctorId = 0;
            //_dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
            //// bool val = false;
            //string returnString = "";
            //try
            //{
            //    string[] doclist = Docids.Split(',');
            //    string val = "";
            //    NameValueCollection _nvCollection = new NameValueCollection();


            //    for (int i = 0; i < doclist.Count(); i++)
            //    {
            //        var doc_id = doclist[i];


            //        doctorId = Convert.ToInt32(doc_id);

            //        _nvCollection.Clear();
            //        _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
            //        _nvCollection.Add("@Role-varchar(50)", "");
            //        _nvCollection.Add("@EmpId-int", EmployeeId.ToString());
            //        DataSet ds = GetData("sp_DoctorRemoveRequest", _nvCollection);
            //        val = ds.Tables[0].Rows[0][0].ToString();




            //    }

            //    if (val == "OK")
            //    { returnString = "OK"; }
            //    returnString = val;



            //}
            //catch (Exception exception)
            //{
            //    returnString = exception.Message;
            //}

            //return returnString;
        }

        [WebMethod]
        public string GetSpecialityByEmpId(string EmployeeId)
        {

            string returnString = "";

            try
            {
                NameValueCollection nv = new NameValueCollection();
                nv.Clear();
                nv.Add("@EmployeeId-int", EmployeeId.ToString());

                var ds = GetData("sp_GetEmployeeSpecialityDetailsByID", nv);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetSpecialityByEmpId : " + exception.Message));
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDesignation()
        {
            string returnString = "";
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();

                DataSet ds = GetData("sp_SelectAllDrDesignation", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    returnString = ds.Tables[0].ToJsonString();
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
        public string GetCityByEmpId(string EmployeeId)
        {

            string returnString = "";

            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();

                _nvCollection.Add("@EmployeeId-int", EmployeeId.ToString());

                var ds = GetData("sp_GetEmployeeCities", _nvCollection);
                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        returnString = ds.Tables[0].ToJsonString();
                    }
                }

            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        public string FilldropdownCity()
        {
            string returnstring = string.Empty;
            try
            {
                _nvCollection.Clear();
                var data = GetData("sp_getcitiesfordoctorddl", _nvCollection);
                returnstring = data.Tables[0].ToJsonString();
            }
            catch (Exception ex)
            {
                returnstring = ex.Message;
            }
            return returnstring;
        }



        //----------------------------------- Approve All By Level 3 etc -----------------------------------------------------------//



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateDoctorDistributorApproveThis(string id, string docid, string empid, string date, string Status, string CurrentUserRole)
        {
            string returnString = "";
            string EmployeeName = "", SpoNamewithTerritory = "", ManagerName = "", BUH = "", msg = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-varchar(250)", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());

                DataSet result = GetData("SP_UpdateDoctorRequest_ForBricksAndDistributorbulkUploaderApproved", _nvCollection);






                //if (CurrentUserRole.ToUpper() == "RL4")
                //{
                //    if (result.Tables[1].Rows.Count != 0)
                //    {
                //        //String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "Doctor AddTolist");
                //        string emailAddresses = result.Tables[1].Rows[0][1].ToString();
                //        EmployeeName = result.Tables[0].Rows[0]["SpoName"].ToString();
                //        SpoNamewithTerritory = result.Tables[0].Rows[0]["SpoNamewithTerritory"].ToString();
                //        ManagerName = result.Tables[0].Rows[0]["ManagerName"].ToString();
                //        BUH = result.Tables[0].Rows[0]["Rl3Name"].ToString();
                //        msg = "Addition of Doctors  from Master list";
                //        foreach (String emailAddress in emailAddresses.Split(';'))
                //        {
                //            try
                //            {
                //                SendMail("Doctors Add To List Sheet, Please Review", emailAddress, empid, id, "0", "0", "0", "excelURL", EmployeeName, SpoNamewithTerritory, BUH, ManagerName, msg);
                //                //PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: Doctors Add To List Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + "excelURL");
                //            }
                //            catch (Exception ex)
                //            {
                //                throw ex;
                //            }
                //        }
                //    }
                //}

                if (CurrentUserRole.ToUpper() == "RL4")
                {
                    if (result.Tables[1].Rows.Count != 0)
                    {
                        String excelURL = ExcelHelper.DataTableToExcelAddToListForEmailResult(result, "Bricks And Distributor");
                        string emailAddresses = result.Tables[1].Rows[0][1].ToString();

                        string msg1 = "Addition of New doctors";
                        foreach (String emailAddress in emailAddresses.Split(';'))
                        {
                            try
                            {
                                ErrorLog("Code will enter SendMail of UpdateDoctorDistributorApproveThis Method");
                              


                                SendMail("Update Doctor Distributor Sheet, Please Review", emailAddress, empid, "0", "0", id, "0", excelURL, null, null, null, null, msg1);
                                PocketDCR2.Classes.Constants.ErrorLog("SUCCESS :: Update Doctor Distributor Proccessed And Email Send " + emailAddresses + ". Emailed Sheet Is:" + excelURL);
                            }
                            catch (Exception ex)
                            {
                                ErrorLog("Error occured in DoctorService.asmx/UpdateDoctorDistributorApproveThis : " + ex.Message);
                                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/UpdateDoctorDistributorApproveThis : " + ex.Message));
                                throw ex;
                            }
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                ErrorLog("Error occured in DoctorService.asmx/UpdateDoctorDistributorApproveThis : " + exception.Message);
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/UpdateDoctorDistributorApproveThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string UpdateDoctorDistributorRejectThis(string id, string docid, string empid, string date, string Status, string CurrentUserRole)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            DbTransaction insertTransaction = null;
            try
            {
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@SystemUserID-BIGINT", empid.ToString());
                DataSet getEmployeeHierarchy = GetData("sp_EmployeeHierarchySelect", _nvCollection);

                if (getEmployeeHierarchy.Tables[0].Rows.Count > 0)
                {
                    level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@EmployeeID-int", empid.ToString());
                _nvCollection.Add("@level1id-int", level1id.ToString());
                _nvCollection.Add("@level2id-int", level2id.ToString());
                _nvCollection.Add("@level3id-int", level3id.ToString());
                _nvCollection.Add("@level4id-int", level4id.ToString());
                _nvCollection.Add("@DocVerificationId-int", id.ToString());
                _nvCollection.Add("@Status-varchar(50)", Status.ToString());
                _nvCollection.Add("@CurrentUserRole-varchar(50)", CurrentUserRole.ToString());
                DataSet result = GetData("SP_UpdateDoctorRequest_ForBricksAndDistributorbulkUploaderReject", _nvCollection);
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/UpdateDoctorDistributorRejectThis : " + exception.Message));
                returnString = exception.Message;
                if (insertTransaction != null) insertTransaction.Rollback();
            }
            finally
            {
                if (_dataContext.Connection.State == ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }
            return returnString;
        }



        //------------------------------------------------  Request List -------------------------------------------------------//


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataOfAddToListProcessDistributors(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role)
        {

            string returnString = "";
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", Level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", Level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", Level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", Level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", Level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", Level6Id.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
                _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());

                DataSet ds = GetData("sp_DoctorDetailSelect_level6_ForNewRequestBrickAndDistributors", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();

                }

            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetDataOfAddToListProcessDistributors : " + exception.Message));
                returnString = exception.Message;
            }

            return returnString;
        }


        //------------------------------------------------ Mapping  Request List for Level 5 4 AND 3 -------------------------------------------------------//


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetDataOfAddToListProcessDistributorsWithoutNewRequest(string Level1Id, string Level2Id, string Level3Id, string Level4Id, string Level5Id, string Level6Id, string TeamID, string Role)
        {
            string returnString = "";
            try
            {
                _currentUser = (SystemUser)Session["SystemUser"];
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", Level1Id.ToString());
                _nvCollection.Add("@Level2id-INT", Level2Id.ToString());
                _nvCollection.Add("@Level3id-INT", Level3Id.ToString());
                _nvCollection.Add("@Level4id-INT", Level4Id.ToString());
                _nvCollection.Add("@Level5id-INT", Level5Id.ToString());
                _nvCollection.Add("@Level6id-INT", Level6Id.ToString());
                _nvCollection.Add("@CurrentUserEmployeeId-INT", _currentUser.EmployeeId.ToString());
            //    _nvCollection.Add("@TeamID-INT", TeamID.ToString());
                _nvCollection.Add("@Userrole-varchar(50)", Role.ToString());
                DataSet ds = GetData("sp_DoctorDetailSelect_level6_WithoutNewRequestBrickAndDistributors", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
                }
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/GetDataOfAddToListProcessDistributorsWithoutNewRequest : " + exception.Message));
                returnString = exception.Message;
            }
            return returnString;
        }

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
        private System.Data.DataSet GetData(String SpName, SqlCommand command, Boolean withTable)
        {
            var connection = new SqlConnection();

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new System.Data.DataSet();
                connection.Open();

                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = SpName;
                command.CommandTimeout = 20000;

                var dataAdapter = new SqlDataAdapter();
                dataAdapter.SelectCommand = command;
                dataAdapter.Fill(dataSet);

                return dataSet;
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
                Constants.ErrorLog("Error While Dumping Monthly Doctors Sheet Records ::: Error: " + exception.Message);
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

        #region public Functions
        public void SendMail(string FormName, string ToAddress, string SMEmployeeid, string AddtoList, string DrRemId, string DrBrickUpdateId, string NewDrLocID, string excelUrl, string EmployeeName, string SpoNamewithTerritory, string BUH, string ManagerName, string msg)
        {
            MailMessage mail = new MailMessage();
            mail.Subject = FormName;
            mail.From = new MailAddress(fromAddress);
            mail.To.Add(ToAddress);
            mail.CC.Add(CCAddress);

            try
            {
                ErrorLog("Code Reached to SendMail Method");
               
                


                mail.Body = @"<html><head><title></title></head><body><div style = 'border-top:3px solid #2484C6'>&nbsp;</div>
                <span style = 'font-family:Arial;font-size:10pt'>
                Dear Mr." + BUH + ".<br/><br/>" +
                "You have received SFE approval request.<br/><br/>" +
                "<b>From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>" + ManagerName + "<br/>" +
                "<b>For&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>" + msg + " <br/>" +
                "<b>Generated by &nbsp;: </b>" + SpoNamewithTerritory + "<br/>" +
                "<br/>" +
                "<b>Link : </b><a href='http://203.92.5.38/AtcoCRM/Form/Login.aspx'>Web Portal URL</a>" +
                "</body></html>";

                mail.IsBodyHtml = true;

                AlternateView avHtml = AlternateView.CreateAlternateViewFromString(mail.Body, Encoding.Default, MediaTypeNames.Text.Html);
                //string path = System.AppDomain.CurrentDomain.BaseDirectory + "/Images/Bmclogo.png";
                ////System.Web.HttpContext.Current.Server.MapPath("~/Images/Bmclogo.png");
                //LinkedResource header = new LinkedResource(path, MediaTypeNames.Image.Jpeg);
                //header.ContentId = "Footer";
                //avHtml.LinkedResources.Add(header)
                //System.Net.Mail.Attachment attachment;
                //attachment = new System.Net.Mail.Attachment(excelUrl);
                //mail.Attachments.Add(attachment);

                mail.AlternateViews.Add(avHtml);
                SmtpClient smtp = new SmtpClient(smtphost, Convert.ToInt32(smtpPort));
                smtp.EnableSsl = smtpSSL;
                NetworkCredential netCre = new NetworkCredential(fromAddress, smtppassword);
                smtp.Credentials = netCre;
                smtp.Send(mail);
                EmailLogStatus(msg, fromAddress, ToAddress, SMEmployeeid, AddtoList, DrRemId, DrBrickUpdateId, NewDrLocID, "Processed");
            }
            catch (Exception ex)
            {
                ErrorLog("EMAIL FAILURE :: Doctors Add To List Proccessing ::: Failure While Sending Email To " + ToAddress + ". Excel Sheet URL Is:" + excelUrl);
                ErrorLog("STACKTRACE :: " + ex.StackTrace);
                EmailLogStatus(msg, fromAddress, ToAddress, SMEmployeeid, AddtoList, DrRemId, DrBrickUpdateId, NewDrLocID, ex.Message);
                throw ex;

                //ClientScript.RegisterStartupScript(GetType(), "alert", "alert('" + ex.ToString() + "');", true);
            }
        }

        public void EmailLogStatus(string FormName, string fromAddress, string ToAddress, string SMEmployeeid, string AddtoList, string DrRemId, string DrBrickUpdateId, string NewDrLocID, string status)
        {
           
            NameValueCollection _nvCollection = new NameValueCollection();
            try
            {
                ErrorLog("Code Reached to EmailLogStatus Method");
                _nvCollection.Add("@FormName-varchar(250)", FormName.ToString());
            _nvCollection.Add("@fromAddress-varchar(250)", fromAddress.ToString());
            _nvCollection.Add("@ToAddress-varchar(250)", ToAddress.ToString());
            _nvCollection.Add("@SMEmployeeid-varchar(250)", SMEmployeeid.ToString());
            _nvCollection.Add("@AddtoList-varchar(250)", AddtoList.ToString());
            _nvCollection.Add("@DrRemId-varchar(250)", DrRemId.ToString());
            _nvCollection.Add("@DrBrickUpdateId-varchar(250)", DrBrickUpdateId.ToString());
            _nvCollection.Add("@NewDrLocID-varchar(250)", NewDrLocID.ToString());
            _nvCollection.Add("@status-varchar(250)", status.ToString());
            
                DataSet ds = GetData("sp_EmailLogStatus", _nvCollection);


            }
            catch(Exception ex)
            {
                ErrorLog("Error occured in DoctorService.asmx/EmailLogStatus : " + ex.Message);
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorService.asmx/EmailLogStatus : " + ex.Message));

            }
        }

        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_MonthlyDoctorsProccessing" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt", DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion
    }
}