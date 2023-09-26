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

namespace PocketDCR2.Form
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    [ScriptService]
    public class DoctorAddtoListBrickAndDistributors1 : System.Web.Services.WebService
    {

        #region Public Member

        DatabaseDataContext _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
        JavaScriptSerializer _jss = new JavaScriptSerializer();
        NameValueCollection _nvCollection = new NameValueCollection();
        //List<HierarchyLevel1> _getHierarchyLevel1;
        //List<HierarchyLevel2> _getHierarchyLevel2;
        //List<HierarchyLevel3> _getHierarchyLevel3;
        //List<HierarchyLevel4> _getHierarchyLevel4;
        //List<HierarchyLevel5> _getHierarchyLevel5;
        //List<HierarchyLevel6> _getHierarchyLevel6;

        #endregion

        #region Web Methods
      

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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/UpdateDoctor : " + exception.Message));
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

        


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetAllDataWithoutNewRequest(int empid)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
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
                    //level1id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId1"]);
                    //level2id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId2"]);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId3"]);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId4"]);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId5"]);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy.Tables[0].Rows[0]["LevelId6"]);
                }

                _nvCollection.Clear();
                _nvCollection.Add("@Level1id-INT", level1id.ToString());
                _nvCollection.Add("@Level2id-INT", level2id.ToString());
                _nvCollection.Add("@Level3id-INT", level3id.ToString());
                _nvCollection.Add("@Level4id-INT", level4id.ToString());
                _nvCollection.Add("@Level5id-INT", level5id.ToString());
                _nvCollection.Add("@Level6id-INT", level6id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());

                DataSet ds = GetData("sp_DoctorDetailSelect_level6_WithoutNewRequest", _nvCollection);

                if (ds.Tables[0].Rows.Count > 0 || ds != null)
                {
                    returnString = ds.Tables[0].ToJsonString();
                    //returnString = _jss.Serialize(ds.Tables[0]);
                }
                //List<v_DoctorVerificationDetailselect> doctor = _dataContext.sp_DoctorDetailSelect_level6(level1id, level2id, level3id, level4id, level5id, level6id, empid).Select(
                //    p =>
                //        new v_DoctorVerificationDetailselect
                //        {
                //            DoctorId = p.DoctorId,
                //            MIOID = p.MIOID,
                //            Designation = p.Designation,
                //            DoctorName = p.DoctorName,
                //            Region = p.Region,
                //            DoctorBrick = p.DoctorBrick,
                //            ClassName = p.ClassName,
                //            Speciality = p.Speciality,
                //            Qualification = p.Qualification,
                //            City = p.City,
                //            VerifiedByFlm = p.VerifiedByFlm,
                //            VerifiedByRSM = p.VerifiedByRSM,
                //            VerifiedByNSM = p.VerifiedByNSM,
                //            AprovedByAdmin = p.AprovedByAdmin
                //        }).ToList();

                //if (doctor.Count > 0)
                //{
                //    returnString = _jss.Serialize(doctor);
                //}
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/GetAllDataWithoutRequest : " + exception.Message));
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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/AddToList : " + exception.Message));
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
                _nvCollection.Add("@DoctorID-INT", doctorId.ToString());
                _nvCollection.Add("@HLevel1-INT", levelId1.ToString());
                _nvCollection.Add("@HLevel2-INT", levelId2.ToString());
                _nvCollection.Add("@HLevel3-INT", levelId3.ToString());
                _nvCollection.Add("@HLevel4-INT", levelId4.ToString());
                _nvCollection.Add("@HLevel5-INT", levelId5.ToString());
                _nvCollection.Add("@HLevel6-INT", levelId6.ToString());
                _nvCollection.Add("@classId-INT", classId.ToString());
                _nvCollection.Add("@EmpId-INT", empid.ToString());
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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/AddToList : " + exception.Message));
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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/AddToList : " + exception.Message));
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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/MultipleAddTolist : " + exception.Message));
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
        public string ApproveThis(string id, string docid, string empid,string date)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;

            try
            {
                string[] pkIds = id.Split(',');
                string[] docIds = docid.Split(',');
                string[] datesplt = date.Split(',');

                for (int i = 0; i < pkIds.Count(); i++)
                {
                    string pkID = pkIds[i];
                    string docID = docIds[i];
                    string Docdatesplit = datesplt[i];

                    #region Get Doc Verification Record

                    NameValueCollection _nvCollection = new NameValueCollection();
                    _nvCollection.Clear();
                    _nvCollection.Add("@ID-BIGINT", pkID.ToString());
                    _nvCollection.Add("@DocID-BIGINT", docID.ToString());
                    _nvCollection.Add("@EmpID-BIGINT", empid.ToString());
                    _nvCollection.Add("@date-BIGINT", Docdatesplit.ToString());
                    DataSet getDocVerificationRecord = GetData("sp_DoctorVerificationSelect_ForBrickAndDistributors", _nvCollection);

                    #endregion

                    #region InsertDoctorVerification

                    if (getDocVerificationRecord.Tables[0].Rows.Count > 0)
                    {
                        var DocVerificationId = getDocVerificationRecord.Tables[0].Rows[0]["ID"];
                        var DocId = getDocVerificationRecord.Tables[0].Rows[0]["DoctorId"];
                        var BricksId = getDocVerificationRecord.Tables[0].Rows[0]["BricksId"];
                        var DistributorId = getDocVerificationRecord.Tables[0].Rows[0]["DistributorId"];
                        var MIOID = getDocVerificationRecord.Tables[0].Rows[0]["MIOID"];
                        var ClassId = getDocVerificationRecord.Tables[0].Rows[0]["ClassId"];                                                
                        var Frequency = getDocVerificationRecord.Tables[0].Rows[0]["Frequency"];
                        var CityID = getDocVerificationRecord.Tables[0].Rows[0]["CityId"];
                        var Monthofdoctorlist = getDocVerificationRecord.Tables[0].Rows[0]["RequestDate"];

                        _nvCollection.Clear();
                        _nvCollection.Add("@DocRequestId-int", DocVerificationId.ToString());
                        _nvCollection.Add("@DoctorID-bigint", DocId.ToString());
                        _nvCollection.Add("@BrickID-bigint", BricksId.ToString());
                        _nvCollection.Add("@DistributerID-bigint", DistributorId.ToString());
                        _nvCollection.Add("@EmployeeID-bigint", MIOID.ToString());
                        _nvCollection.Add("@classID-bigint", ClassId.ToString());
                        _nvCollection.Add("@frequencyID-Varchar(250)", Frequency.ToString());
                        _nvCollection.Add("@cityID-bigint", CityID.ToString());
                        _nvCollection.Add("@Monthofdoctorlist-bigint", Monthofdoctorlist.ToString());
                        DataSet docVerDetails = GetData("sp_UpdateDoctorRequest_ForBricksAndDistributor", _nvCollection);

                        if (docVerDetails.Tables[0].Rows.Count > 0)
                        {
                            returnString = docVerDetails.Tables[0].ToJsonString();
                        }
                    }
                }
                #endregion
                //insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/ApproveThis : " + exception.Message));
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
        public string GetAllDataOfRemovalRequest(int empid)
        {
            string returnString = "";
            int level1id = 0, level2id = 0, level3id = 0, level4id = 0, level5id = 0, level6id = 0;
            try
            {

                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
                var getEmployeeHierarchy = _dataContext.sp_EmployeeHierarchyDetailSelect(empid).ToList();

                if (getEmployeeHierarchy.Count > 0)
                {
                    //level1id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId1) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
                    //level2id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId2) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
                    level3id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId3) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                    level4id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId4) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                    level5id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId5) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                    level6id = (Convert.ToInt32(getEmployeeHierarchy[0].LevelId6) < 0) ? 0 : Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
                }
                NameValueCollection _nvCollection = new NameValueCollection();
                _nvCollection.Clear();
                //_nvCollection.Add("@Level1id-INT", level1id.ToString());
                //_nvCollection.Add("@Level2id-INT", level2id.ToString());
                _nvCollection.Add("@Level3id-INT", level3id.ToString());
                _nvCollection.Add("@Level4id-INT", level4id.ToString());
                _nvCollection.Add("@Level5id-INT", level5id.ToString());
                _nvCollection.Add("@Level6id-INT", level6id.ToString());
                _nvCollection.Add("@EmployeeId-INT", empid.ToString());

                DataSet ds = GetData("sp_DoctorDetailSelectForRemoveRquest_level6", _nvCollection);

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
        public string RemoveDocRequest(string Docid, string EmployeeId)
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
                        DataSet ds = GetData("sp_DoctorRemoveRequest", _nvCollection);
                        val = ds.Tables[0].Rows[0][0].ToString();


                    }

                }

                if (val == "OK")
                { returnString = "OK"; }
                returnString = val;



            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string removeMultipleDocs(string Docids, string EmployeeId)
        {
            int doctorId = 0;
            _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());
            // bool val = false;
            string returnString = "";
            try
            {
                string[] doclist = Docids.Split(',');
                string val = "";
                NameValueCollection _nvCollection = new NameValueCollection();


                for (int i = 0; i < doclist.Count(); i++)
                {
                    var doc_id = doclist[i];


                    doctorId = Convert.ToInt32(doc_id);

                    _nvCollection.Clear();
                    _nvCollection.Add("@DoctorId-INT", doctorId.ToString());
                    _nvCollection.Add("@Role-varchar(50)", "");
                    _nvCollection.Add("@EmpId-int", EmployeeId.ToString());
                    DataSet ds = GetData("sp_DoctorRemoveRequest", _nvCollection);
                    val = ds.Tables[0].Rows[0][0].ToString();




                }

                if (val == "OK")
                { returnString = "OK"; }
                returnString = val;



            }
            catch (Exception exception)
            {
                returnString = exception.Message;
            }

            return returnString;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string RemoveThis(string id, string docid, string empid)
        {
            string returnString = "";
            DbTransaction insertTransaction = null;

            try
            {
                string[] pkIds = id.Split(',');
                string[] docIds = docid.Split(',');
                string[] empIds = empid.Split(',');

                for (int i = 0; i < pkIds.Count(); i++)
                {
                    string pkID = pkIds[i];
                    string docID = docIds[i];
                    string mioid = empIds[i];


                    #region Get Doc Removal Record

                    NameValueCollection _nvCollection = new NameValueCollection();
                    _nvCollection.Clear();
                    _nvCollection.Add("@ID-BIGINT", pkID.ToString());
                    _nvCollection.Add("@DocID-BIGINT", docID.ToString());
                    _nvCollection.Add("@EmpID-BIGINT", mioid.ToString());
                    DataSet getDocVerificationRecord = GetData("sp_DoctorRemovalSelect", _nvCollection);

                    #endregion

                    #region InsertDoctorVerification

                    if (getDocVerificationRecord.Tables[0].Rows.Count > 0)
                    {
                        var DocVerificationId = getDocVerificationRecord.Tables[0].Rows[0]["ID"];
                        var DocId = getDocVerificationRecord.Tables[0].Rows[0]["DoctorId"];
                        var MIOID = getDocVerificationRecord.Tables[0].Rows[0]["MIOID"];
                        var DocCode = getDocVerificationRecord.Tables[0].Rows[0]["DocCode"];


                        _nvCollection.Clear();
                        _nvCollection.Add("@MIOID-bigint", MIOID.ToString());
                        _nvCollection.Add("@DocId-bigint", DocId.ToString());
                        _nvCollection.Add("@DocCode-bigint", DocCode.ToString());
                        _nvCollection.Add("@DocVerificationId-int", DocVerificationId.ToString());
                        DataSet docVerDetails = GetData("sp_RemovefromDCR_DoctorRemoval", _nvCollection);

                        if (docVerDetails.Tables[0].Rows.Count > 0)
                        {
                            returnString = docVerDetails.Tables[0].ToJsonString();
                        }
                    }

                }

                    #endregion

                //insertTransaction.Commit();
            }
            catch (Exception exception)
            {
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/RemoveThis : " + exception.Message));
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
                Logger.LogWriter.Log.Logging(new Exception("Error occured in DoctorAddtoListBrickAndDistributors.asmx/GetSpecialityByEmpId : " + exception.Message));
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

        #endregion
    }
}
