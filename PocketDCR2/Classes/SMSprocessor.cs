using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;
using System.Globalization;
using System.Collections;
using System.Data.SqlClient;
using System.Collections.Specialized;
using DatabaseLayer.SQL;
using System.IO;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;


namespace PocketDCR2.Classes
{
    public class SMSprocessor
    {
        #region Private Members

        private DatabaseDataContext _dataContext;
        private static readonly SMSprocessor _instance = new SMSprocessor();
        private readonly System.Timers.Timer _processTimer;
        private DateTime _smsDate;
        private NameValueCollection _nvCollection = new NameValueCollection();
        private int _templateId = 0, _maxDateRange = 0, _receivedSms = 0;
        private long _insertedId = 0;
        private string _status = "", _templateBound = "", _sms = "", _smsKeyWord = "", _isTemp = "", _doctorCode = "",
            _employeeName = "", _mgsText = "";
        private bool _isDateValid = false, _isValid = false, _isSaved = false;
        private List<SMSOutbound> _insertSms;
        private SmsApi _sendSMS;
        private DAL _dl = new DAL();
        private string BMDtemp = "", DCRtemp = "";
        #endregion

        #region Contructor

        private SMSprocessor()
        {
            _processTimer = new System.Timers.Timer();
        }

        #endregion

        #region Database Layer

        private DataSet GetData(String spName, NameValueCollection nv)
        {
            var connection = new SqlConnection();
            string dbTyper = "";

            try
            {
                connection.ConnectionString = Classes.Constants.GetConnectionString();
                var dataSet = new DataSet();
                connection.Open();

                var command = new SqlCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.Connection = connection;
                command.CommandText = spName;

                if (nv != null)
                {
                    //New code implemented for retrieving data
                    for (int i = 0; i < nv.Count; i++)
                    {
                        string[] arraySplit = nv.Keys[i].Split('-');

                        if (arraySplit.Length > 2)
                        {
                            //Run the code with datatype length.
                            dbTyper = "SqlDbType." + arraySplit[1].ToString() + "," + arraySplit[2].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
                        }
                        else
                        {
                            //Run the code for int values
                            dbTyper = "SqlDbType." + arraySplit[1].ToString();
                            command.Parameters.AddWithValue(arraySplit[0].ToString(), dbTyper).Value = nv[i].ToString();
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

        #region Public Functions

        public static SMSprocessor Instance
        {
            get
            {
                return _instance;
            }
        }

        public string ServerStatus
        {
            get
            {
                return _status;
            }

            set
            {
                _status = value;
            }
        }

        public void Start()
        {
            try
            {
                int timerInterval = 10000;
                _processTimer.AutoReset = true;
                _processTimer.Elapsed += new System.Timers.ElapsedEventHandler(_processTimer_Elapsed);
                _processTimer.Interval = timerInterval;
                _processTimer.Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        void _processTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                _processTimer.Stop();
                _status = Process();
                _processTimer.Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void Stop()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public string Process()
        {
            string retrunString = "";

            try
            {
                MethodsToRun();
            }
            catch (Exception)
            {
                retrunString = "Unable to connect";
            }

            return retrunString;
        }

        public void InitializeSystem()
        {
            try
            {
                Start();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public void ShutDownSystem()
        {
            try
            {
                _processTimer.Stop();
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion

        #region Private Functions

        private void MethodsToRun()
        {
            try
            {
                _dataContext = new DatabaseDataContext(Classes.Constants.GetConnectionString());

                if (SmsProcessing())
                {
                    if (_receivedSms != 0)
                    {
                        ErrorLog("SMS has been validate and saved successfully at " + DateTime.UtcNow.ToString("yyyy-MM-dd"));
                    }
                }
                else
                {
                    ErrorLog("SMS validation has been failed at " + DateTime.UtcNow.ToString("yyyy-MM-dd"));
                }

                this.UnProcessSMS();
            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from MethodsToRun method is " + exception.Message);
            }
        }

        private bool SmsProcessing()
        {
            #region Initialize

            bool isTemplate = false;
            bool isTemplateSMS = false;
            bool isComplete = false;
            bool isDuplicate = false;
            bool isSave = false;
            DataSet dataSet = new DataSet();
            List<SMSInbound> updateSMSInbound;
            long receieveId = 0;
            int count = 0, index = 0;
            string DT = "";

            #endregion

            try
            {
                #region Pick SMS Packet from SMSReceived

                List<SMSReceived> updateReceivedSMS;

                var getUnReadSMS = _dataContext.sp_SMSReceivedSelect().ToList();

                #region Process List

                if (getUnReadSMS.Count > 0)
                {
                    count = 0;

                    #region Loop

                    foreach (var unreadSMS in getUnReadSMS)
                    {
                        count = count + 1;

                        #region Mark SMS as "READ" in SMSRecieved

                        receieveId = Convert.ToInt64(unreadSMS.ReceivedId);
                        updateReceivedSMS = _dataContext.sp_SMSReceivedUpdate(receieveId).ToList();

                        #endregion

                        #region Get SMS KeyWord


                        string[] smsSplit = unreadSMS.MessageText.Trim().Split(' ');
                        _smsKeyWord = smsSplit[0];

                        #endregion

                        #region Template is required

                        DAL dllSMS = new DAL();
                        DataSet dssms = new DataSet();
                        _sendSMS = new SmsApi();

                        if (unreadSMS.MessageText != "" && unreadSMS.MessageText.ToUpper().Trim().Contains("DCR TEMP") ||
                            unreadSMS.MessageText.ToUpper().Trim().Contains("DCR TEMPLATE"))
                        {
                            #region DCR


                            dssms = dllSMS.GetData("Generate_Template_rspns_DCR", null);

                            var getInsertedDCRSMSId = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                          unreadSMS.PortName, unreadSMS.MessageText, DateTime.Now, DateTime.Now).ToList();

                            if (getInsertedDCRSMSId.Count != 0)
                            {
                                _insertedId = Convert.ToInt64(getInsertedDCRSMSId[0].InboundId);

                                _insertSms = _dataContext.sp_SMSOutboundInsert(unreadSMS.MobileNumber, _mgsText, true, DateTime.Now).ToList();
                                updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "Template", " DCR Template Request", DateTime.Now).ToList();

                                //var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", unreadSMS.MobileNumber, dssms.Tables[0].Rows[0]["temp"].ToString(), DateTime.Now).ToList();

                                //if (insertSentMessage.Count > 0)
                                //{
                                //    long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                //    string returnRespnse = _sendSMS.SendMessage(unreadSMS.MobileNumber, dssms.Tables[0].Rows[0]["temp"].ToString());
                                //    var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                                //}

                            }

                            #endregion

                            goto SkipMSG;
                        }
                        else if (unreadSMS.MessageText != "" && unreadSMS.MessageText.ToUpper().Trim().Contains("BMD TEMP") ||
                            unreadSMS.MessageText.ToUpper().Trim().Contains("BMD TEMPLATE")
                            )
                        {
                            #region BMD
                            var getInsertedBMDSMSId = _dataContext.sp_SMSInboundInsert(2, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                          unreadSMS.PortName, unreadSMS.MessageText, DateTime.Now, DateTime.Now).ToList();

                            dssms = dllSMS.GetData("Generate_Template_rspns_BMD", null);

                            if (getInsertedBMDSMSId.Count != 0)
                            {
                                _insertedId = Convert.ToInt64(getInsertedBMDSMSId[0].InboundId);
                                _insertSms = _dataContext.sp_SMSOutboundInsert(unreadSMS.MobileNumber, "BMD Template required", true, DateTime.Now).ToList();
                                updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "Template", "BMD Template Request", DateTime.Now).ToList();
                                //var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", unreadSMS.MobileNumber, dssms.Tables[0].Rows[0]["temp"].ToString(), DateTime.Now).ToList();

                                //if (insertSentMessage.Count > 0)
                                //{
                                //    long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                                //    string returnRespnse = _sendSMS.SendMessage(unreadSMS.MobileNumber, dssms.Tables[0].Rows[0]["temp"].ToString());
                                //    var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                                //}
                            }

                            #endregion
                            goto SkipMSG;
                        }

                        #endregion

                        if (_smsKeyWord.ToUpper() != "DCR" && _smsKeyWord.ToUpper() != "DEL" && _smsKeyWord.ToUpper() != "BMD")
                        {
                            var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                            unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                            updateSMSInbound = _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", "Garbage SMS", DateTime.Now).ToList();

                            goto SkipMSG;
                        }

                        #region DT

                        try
                        {
                            if (unreadSMS.MessageText != "" && unreadSMS.MessageText.Contains(" DT:"))
                            {
                                index = unreadSMS.MessageText.IndexOf(" DT:");

                                if (index > -1)
                                {
                                    if (_smsKeyWord.ToUpper() == "DCR" || _smsKeyWord.ToUpper() == "DEL")
                                    {
                                        DT = unreadSMS.MessageText.Substring(index + 4, (unreadSMS.MessageText.IndexOf("DC:") - 1) - (index + 4)).Trim();
                                    }
                                    else if (_smsKeyWord.ToUpper() == "BMD")
                                    {
                                        DT = unreadSMS.MessageText.Substring(index + 4, (unreadSMS.MessageText.IndexOf("MR:") - 1) - (index + 4)).Trim();
                                    }
                                }
                            }
                            else if (unreadSMS.MessageText != "" && unreadSMS.MessageText.Contains("DT:"))
                            {
                                index = unreadSMS.MessageText.IndexOf("DT:");

                                if (index > -1)
                                {
                                    if (_smsKeyWord.ToUpper() == "DCR" || _smsKeyWord.ToUpper() == "DEL")
                                    {
                                        DT = unreadSMS.MessageText.Substring(index + 3, unreadSMS.MessageText.IndexOf("DC:") - (index + 3)).Trim();
                                    }
                                    else if (_smsKeyWord.ToUpper() == "BMD")
                                    {
                                        DT = unreadSMS.MessageText.Substring(index + 3, unreadSMS.MessageText.IndexOf("MR:") - (index + 3)).Trim();
                                    }

                                }

                            }
                            else
                            {

                                var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                                                 unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                                updateSMSInbound =
                                    _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", " Your last sms is not recognized by the system, Please check your sms template.", DateTime.Now).ToList();
                                goto SkipMSG;


                            }
                        }
                        catch (Exception ex)
                        {
                            var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                     unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                            updateSMSInbound =
                                _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", " Your last sms is not recognized by the system, Please check your sms template.", DateTime.Now).ToList();
                            goto SkipMSG;
                        }

                        var dateInfo = new DateTimeFormatInfo();
                        dateInfo.ShortDatePattern = "dd/MM/yyyy";

                        DateTime validDate = DateTime.Now;
                        try
                        {

                            if (DT.Split('/')[0].Length > 1)
                            {
                                validDate = Convert.ToDateTime(DT, dateInfo);
                            }
                            else
                            {

                                var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                                          unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                                updateSMSInbound =
                                    _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", _smsKeyWord.ToUpper() + " OF DT contains Error : " + DT + " ", DateTime.Now).ToList();
                                goto SkipMSG;


                            }




                            DateTime cdate = DateTime.Now;
                            //unreadSMS.CreatedDate;
                            if (cdate < validDate || DATEDIFF("day", validDate, cdate) > Convert.ToInt32(ConfigurationManager.AppSettings["DCRValidDays"].ToString()))
                            {
                                var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                                           unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                                updateSMSInbound = _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", _smsKeyWord.ToUpper() + " OF DT                                                              contains Error : " + validDate.ToString("dd/MM/yyyy") + "", DateTime.Now).ToList();
                                goto SkipMSG;
                            }
                            _smsDate = validDate;
                        }
                        catch (Exception)
                        {
                            int tem = 0;
                            if (_smsKeyWord.ToUpper() == "DCR" || _smsKeyWord.ToUpper() == "DEL")
                            { tem = 1; }
                            else if (_smsKeyWord.ToUpper() == "BMD") { tem = 2; }

                            var getInsertedSMSId_empty = _dataContext.sp_SMSInboundInsert(tem, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                                       unreadSMS.PortName, unreadSMS.MessageText, getUnReadSMS[0].CreatedDate, DateTime.Now).ToList();
                            updateSMSInbound = _dataContext.sp_SMSInboundUpdate(getInsertedSMSId_empty[0].InboundId, "ERROR", _smsKeyWord.ToUpper() + " OF DT contains                                                  Error :  " + DT, DateTime.Now).ToList();

                            goto SkipMSG;
                        }

                        #endregion

                        #region DCR DEL SMS
                        if (_smsKeyWord.ToUpper() == "DEL")
                        {
                            string MobileNumber, PortName, MessageText, CreatedDate, DelMessageText = "";
                            long ReceivedId;

                            DelMessageText = unreadSMS.MessageText.Trim();

                            #region Place SMS Packet into SMSInbound, receiveID + pick their Insertion Id

                            var SMSInboundInsertfordel = _dataContext.sp_SMSInboundInsert(1, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                                unreadSMS.PortName, unreadSMS.MessageText, validDate, DateTime.Now).ToList();

                            if (SMSInboundInsertfordel.Count != 0)
                            {
                                _insertedId = Convert.ToInt64(SMSInboundInsertfordel[0].InboundId);
                            }

                            #endregion

                            CreatedDate = validDate.ToString("yyyy-MM-dd");
                            ReceivedId = unreadSMS.ReceivedId;
                            MobileNumber = unreadSMS.MobileNumber;
                            PortName = unreadSMS.PortName;
                            MessageText = unreadSMS.MessageText;

                            try
                            {
                                NameValueCollection nv = new NameValueCollection();
                                DAL dll = new DAL();
                                nv.Add("smsText-Varchar-800", MessageText.Trim().ToString());
                                nv.Add("cellNo-Varchar-20", MobileNumber.ToString());
                                nv.Add("DelInboundID-int", _insertedId.ToString());
                                nv.Add("vistDate-datetime", validDate.ToString());

                                DataSet ds = dll.GetData("DelSalesCalls", nv);

                                if (ds != null)
                                    if (ds.Tables[0].Rows.Count != 0)
                                    {

                                    }

                            }
                            catch (Exception ex) { }
                            //send to database


                            goto SkipMSG;
                        }
                        #endregion

                        #region Get Template Id

                        var getMasterTemplate = _dataContext.sp_SMSTemplateMasterSelect(_smsKeyWord, true).ToList();

                        if (getMasterTemplate.Count != 0)
                        {
                            _templateId = Convert.ToInt32(getMasterTemplate[0].TMasterId);
                        }
                        else
                        {
                            ErrorLog("SMS Template id not found!");
                            goto Error;
                        }

                        #endregion

                        #region Place SMS Packet into SMSInbound, receiveID + pick their Insertion Id

                        var getInsertedSMSId = _dataContext.sp_SMSInboundInsert(_templateId, receieveId, unreadSMS.MobileNumber, unreadSMS.ModemNumber,
                            unreadSMS.PortName, unreadSMS.MessageText, validDate, DateTime.Now).ToList();

                        if (getInsertedSMSId.Count != 0)
                        {
                            _insertedId = Convert.ToInt64(getInsertedSMSId[0].InboundId);
                        }

                        #endregion

                        #region Is Valid SMS

                        _sms = unreadSMS.MessageText.Trim().ToUpper();

                        var isValidTemplate =
                            ValidateTemplate(_sms, _insertedId, unreadSMS.MobileNumber, unreadSMS.ModemNumber, unreadSMS.PortName, unreadSMS.MessageType, "",
                                unreadSMS.CreatedDate.ToString());

                        #endregion

                        if (isValidTemplate == "Success")
                        {
                            #region Check For MR Account IS Enabled

                            var MRIsAvailable = _dataContext.sp_EmployeeSelectByCredential(null, unreadSMS.MobileNumber).ToList();

                            if (MRIsAvailable.Count == 0)
                            {
                                UpdateSMSrecievedWithError(_insertedId, "MR is not found");
                                InsertSMSrecievedWithErrorOutbound(unreadSMS.MobileNumber, "MR is not found");
                                goto SkipMSG;
                            }
                            else
                            {
                                var mrPresent = Convert.ToBoolean(MRIsAvailable[0].IsActive);

                                if (!mrPresent)
                                {
                                    UpdateSMSrecievedWithError(_insertedId, "Account Disabled");
                                    InsertSMSrecievedWithErrorOutbound(unreadSMS.MobileNumber, "Account Disabled");
                                    goto SkipMSG;
                                }
                            }

                            #endregion

                            #region Validate SMS

                            if (isValidTemplate == "Success")
                            {
                                if (_insertedId != 0)
                                {
                                    if (_isTemp != string.Empty)
                                    {
                                        isTemplate = true;
                                        isTemplateSMS = true;
                                        var insertSMS = _dataContext.sp_SMSOutboundInsert(getInsertedSMSId[0].MobileNumber, getInsertedSMSId[0].MessageText, true, DateTime.Now).ToList();



                                    }
                                    else
                                    {
                                        #region Filter With Keyword

                                        #region Check For SMS Duplication

                                        var checkSMSDuplication = _dataContext.sp_SMSCheckDuplication(_insertedId, unreadSMS.MobileNumber, unreadSMS.MessageText).ToList();
                                        #endregion

                                        if (checkSMSDuplication.Count != 0)
                                        {
                                            isComplete = false;
                                            isDuplicate = true;
                                        }
                                        else
                                        {
                                            #region Save SMS to Hierarchy

                                            if (_smsKeyWord == "DCR")
                                            {
                                                _isSaved = InsertDcr(_insertedId, unreadSMS.MobileNumber, _sms);
                                            }
                                            else if (_smsKeyWord == "BMD")
                                            {
                                                _isSaved = InsertBmd(_insertedId, unreadSMS.MobileNumber, _sms);
                                            }
                                            else if (_smsKeyWord == "MERC")
                                            {
                                                _isSaved = InsertMerc(_insertedId, unreadSMS.MobileNumber, _sms);
                                            }

                                            if (!_isSaved)
                                            {
                                                isSave = false;
                                                isComplete = false;
                                                isDuplicate = false;
                                            }
                                            else
                                            {
                                                isTemplate = true;
                                                isSave = true;
                                                isComplete = true;
                                                isDuplicate = false;
                                            }

                                            #endregion
                                        }

                                        #endregion
                                    }
                                }
                            }
                            else
                            {
                                isTemplate = false;
                            }
                            #endregion

                            if (!isComplete && isDuplicate)
                            {
                                updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "Duplicate", "Duplicate SMS", DateTime.Now).ToList();
                            }
                            else
                            {
                                if (!isSave)
                                {
                                    isSave = true;
                                }
                            }


                            #region Result

                            //if (!isTemplate)
                            //{
                            //    // updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "ERROR", "Your last sms is not recognized by the system,Please check your sms template", DateTime.Now).ToList();
                            //}
                            //else
                            //{
                            //    if (isTemplate && isTemplateSMS)
                            //    {
                            //        updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "TEMPLATE - REQUEST", _smsKeyWord + " Template is required", DateTime.Now).ToList();

                            //    }
                            //    else
                            //    {
                            //        if (!isComplete && isDuplicate)
                            //        {
                            //            updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "ERROR - Duplicate", "Duplicate SMS", DateTime.Now).ToList();
                            //        }
                            //        else
                            //        {
                            //            if (!isSave)
                            //            {
                            //                isSave = true;
                            //            }
                            //        }
                            //    }
                            //}

                            #endregion
                        }


                        if (count == getUnReadSMS.Count)
                        {
                            goto Finish;
                        }

                    SkipMSG:
                        { }
                    }

                    #endregion
                }
                else
                {

                    ErrorLog("No new message received on " + DateTime.UtcNow.ToString("yyyy_MM_dd"));
                    goto Finish;
                }

                #endregion

                #endregion
            }
            catch (SqlException sqlException)
            {
                ErrorLog("Database Exception occur from SMSProcessing method is " + sqlException.Message);
                goto Error;
            }
            catch (Exception exception)
            {

                ErrorLog("Exception occur from SMSProcessing method is " + exception.Message);
                goto Error;
            }
        Error:
            {
                // updateSMSInbound = _dataContext.sp_SMSInboundUpdate(_insertedId, "ERROR", "Your last sms is not recognized by the system,Please check your sms template", DateTime.Now).ToList();
            }
        Finish: { }

            return isComplete;
        }

        private string ValidateTemplate(string sms, long insertedId, string MobileNumber, string ModemNumber, string PortName, string MessageType,
            string Remarks, string CreatedDate)
        {
            string returnString = "Failed";

            try
            {
                #region Check Is Template Required Or Not

                if (sms.Contains("TEMP"))
                {
                    _isTemp = "TEMP";
                    returnString = "Success";
                }

                #endregion

                #region Check SMS Packet Is Validate Or Not

                if (!sms.Contains("TEMP"))
                {
                    try
                    {
                        if (sms.StartsWith("DCR") && !sms.Contains("DEL"))
                        {
                            #region Get SMS KeyWord ... Split work

                            string[] smsSplit = sms.Trim().Split(' ');
                            _smsKeyWord = smsSplit[0];

                            #endregion

                            #region Check Is SMS Template Found Filter With Keyword And IsActive?

                            var getMasterTemplate = _dataContext.sp_SMSTemplateMasterSelect(_smsKeyWord, true).ToList();

                            if (getMasterTemplate.Count != 0)
                            {
                                #region Get Template Id

                                _templateId = Convert.ToInt32(getMasterTemplate[0].TMasterId);

                                #endregion

                                #region Check SMS Packet Is Validate Or Not

                                #region Get Selected Template Detail

                                _isTemp = "";
                                var getMasterTemplateDetail = _dataContext.sp_SMSTemplateDetailSelect(Convert.ToInt32(getMasterTemplate[0].TMasterId)).ToList();

                                #endregion

                                if (getMasterTemplateDetail.Count != 0)
                                {
                                    #region Validate SMS Token With Data Type

                                    int index = 0;
                                    string checker = "", toneName = "", tonePrefix = "", one = "", tempVal = "", tempPref = "";
                                    _isValid = true;

                                    foreach (var masterTemplateDetail in getMasterTemplateDetail)
                                    {
                                        toneName = masterTemplateDetail.ToneName;
                                        tonePrefix = masterTemplateDetail.TokenPrefix;

                                        if (!_isValid)
                                        {
                                            goto Error;
                                        }

                                        if (toneName.ToString() != "" || toneName.ToString() != null)
                                        {
                                            one = toneName.ToString();

                                            if (one != null)
                                            {
                                                if (tempVal == null || tempVal == "")
                                                {
                                                    tempVal = one;
                                                    tempPref = tonePrefix;
                                                }
                                                else
                                                {
                                                    index = sms.IndexOf(tempVal + ":");

                                                    if (index > -1)
                                                    {
                                                        #region Get Value on the basis of length

                                                        if (tempVal.Length == 1)
                                                        {
                                                            checker = sms.Substring(index + 2, (sms.IndexOf(one + ":") - 1) - (index + 2)).Trim();
                                                        }
                                                        else if (tempVal.Length == 2)
                                                        {
                                                            checker = sms.Substring(index + 3, (sms.IndexOf(one + ":") - 1) - (index + 3)).Trim();
                                                        }
                                                        else if (tempVal.Length == 3)
                                                        {
                                                            checker = sms.Substring(index + 4, (sms.IndexOf(one + ":") - 1) - (index + 4)).Trim();
                                                        }
                                                        else if (tempVal.Length == 4)
                                                        {
                                                            checker = sms.Substring(index + 5, (sms.IndexOf(one + ":") - 1) - (index + 5)).Trim();
                                                        }

                                                        #endregion

                                                        if (checker != string.Empty)
                                                        {
                                                            #region Prefix Validation

                                                            if (tempPref == "Numeric")
                                                            {
                                                                #region Numeric Validation

                                                                if (!TemplateValidator.IsNumeric(checker))
                                                                {
                                                                    _isValid = false;
                                                                }
                                                                else
                                                                {
                                                                    _isValid = true;
                                                                }

                                                                #endregion
                                                            }
                                                            else if (tempPref == "Character")
                                                            {
                                                                #region Character Validation

                                                                if (!TemplateValidator.IsChar(checker))
                                                                {
                                                                    _isValid = false;
                                                                }
                                                                else
                                                                {
                                                                    _isValid = true;
                                                                }

                                                                #endregion
                                                            }
                                                            else if (tempPref == "DateTime")
                                                            {
                                                                #region Date Validation

                                                                string[] dateSpilit = checker.Trim().Split('/');
                                                                int Day = 0, Month = 0, Year = 0, Counter = 0;

                                                                foreach (var item in dateSpilit)
                                                                {
                                                                    if (Counter == 0)
                                                                    {
                                                                        Day = Convert.ToInt32(item);
                                                                        Counter++;
                                                                    }
                                                                    else if (Counter == 1)
                                                                    {
                                                                        Month = Convert.ToInt32(item);
                                                                        Counter++;
                                                                    }
                                                                    else if (Counter == 2)
                                                                    {
                                                                        Year = Convert.ToInt32(item);
                                                                        Counter++;
                                                                    }
                                                                }

                                                                checker = Month + "/" + Day + "/" + Year;
                                                                _smsDate = Convert.ToDateTime(checker);

                                                                if (!TemplateValidator.IsDate(_smsDate.ToString()))
                                                                {
                                                                    _isValid = false;
                                                                }
                                                                else
                                                                {
                                                                    _isValid = true;
                                                                }

                                                                #endregion
                                                            }

                                                            #endregion
                                                        }

                                                        tempVal = one;
                                                        tempPref = tonePrefix;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (tempVal.Trim() != string.Empty && tempPref.Trim() != string.Empty)
                                    {
                                        index = sms.IndexOf(tempVal + ":");

                                        if (index > -1)
                                        {
                                            #region Get Value on the basis of length

                                            if (tempVal.Length == 1)
                                            {
                                                checker = sms.Substring(index + 2, (sms.Length) - (index + 2)).Trim();
                                            }
                                            else if (tempVal.Length == 2)
                                            {
                                                checker = sms.Substring(index + 3, (sms.Length) - (index + 3)).Trim();
                                            }
                                            else if (tempVal.Length == 3)
                                            {
                                                checker = sms.Substring(index + 4, (sms.Length) - (index + 4)).Trim();
                                            }
                                            else if (tempVal.Length == 4)
                                            {
                                                checker = sms.Substring(index + 5, (sms.Length) - (index + 5)).Trim();
                                            }

                                            #endregion

                                            if (checker != string.Empty)
                                            {
                                                if (checker == "M" || checker == "m")
                                                {
                                                    checker = Convert.ToString(1);
                                                }
                                                else if (checker == "E" || checker == "e")
                                                {
                                                    checker = Convert.ToString(2);
                                                }
                                                else
                                                {

                                                }




                                                #region Prefix Validation

                                                #region Prefix Validation

                                                if (tempPref == "Numeric")
                                                {
                                                    #region Numeric Validation

                                                    if (!TemplateValidator.IsNumeric(checker))
                                                    {
                                                        _isValid = false;
                                                    }
                                                    else
                                                    {
                                                        _isValid = true;
                                                    }

                                                    #endregion
                                                }
                                                else if (tempPref == "Character")
                                                {
                                                    #region Character Validation

                                                    if (!TemplateValidator.IsChar(checker))
                                                    {
                                                        _isValid = false;
                                                    }
                                                    else
                                                    {
                                                        _isValid = true;
                                                    }

                                                    #endregion
                                                }
                                                else if (tempPref == "DateTime")
                                                {
                                                    #region Date Validation

                                                    _smsDate = Convert.ToDateTime(checker);

                                                    if (!TemplateValidator.IsDate(_smsDate.ToString()))
                                                    {
                                                        _isValid = false;
                                                    }
                                                    else
                                                    {
                                                        _isValid = true;
                                                    }

                                                    #endregion
                                                }

                                                #endregion

                                                #endregion
                                            }
                                            else if (checker == string.Empty)
                                            {
                                                checker = Convert.ToString(0);
                                                goto Error;
                                            }
                                        }
                                    }

                                    #endregion

                                    #region Return Validation Result

                                    if (!_isValid)
                                    {
                                        InsertSMSrecievedWithErrorOutbound(MobileNumber, "Your Last " + _smsKeyWord + " sms is not recognized by the system,Please check your sms template");
                                        goto Error;
                                    }
                                    else
                                    {
                                        returnString = "Success";
                                        goto Finish;
                                    }

                                    #endregion
                                }

                                #endregion
                            }
                            else
                            {

                                goto Error;
                            }

                            #endregion

                            #region Check Date Validation

                            var getTemplate = _dataContext.sp_ParameterSelect("MaxDateRange").ToList();

                            if (getTemplate.Count != 0)
                            {
                                _maxDateRange = Convert.ToInt32(getTemplate[0].ParameterValue);
                                int index = 0;
                                string DT = "";

                                try
                                {
                                    #region Pick Date From SMS

                                    if (sms != "" && sms.Contains(" DT:"))
                                    {
                                        index = sms.IndexOf(" DT:");

                                        if (index > -1)
                                        {
                                            DT = sms.Substring(index + 4, (sms.IndexOf("DC:") - 1) - (index + 4)).Trim();
                                        }
                                    }
                                    else
                                    {
                                        if (sms != "" && sms.Contains("DT:"))
                                        {
                                            index = sms.IndexOf("DT:");

                                            if (index > -1)
                                            {
                                                DT = sms.Substring(index + 3, sms.IndexOf("DC:") - (index + 3)).Trim();
                                            }
                                        }
                                    }
                                    _smsDate = Convert.ToDateTime(DT);

                                    if (!TemplateValidator.IsDate(_smsDate.ToString()))
                                    {
                                        _isValid = false;
                                    }
                                    else
                                    {
                                        _isValid = true;
                                        int resultedDay = Convert.ToInt32((DateTime.Now - _smsDate).TotalDays);

                                        if (resultedDay > _maxDateRange)
                                        {
                                            _isDateValid = false;
                                        }
                                        else
                                        {
                                            _isDateValid = true;
                                        }
                                    }

                                    #endregion
                                }
                                catch (Exception)
                                {

                                }
                            }

                            #endregion
                        }
                        else if (sms.StartsWith("DCR") && sms.Contains("DEL"))
                        {
                            goto Error;
                        }
                        else if (sms.StartsWith("BMD"))
                        {
                            returnString = "Success";
                            goto Finish;
                            //    goto Error;
                        }
                    }
                    catch (Exception)
                    {
                        goto Error;
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from ValidateTemplate method is " + exception.Message);
            }
        Error:
            {
                returnString = "Failed";
                UpdateSMSrecievedWithError(_insertedId, "Your last sms is not recognized by the system,Please check your sms template");
                InsertSMSrecievedWithErrorOutbound(MobileNumber, "Your last sms is not recognized by the system,Please check your sms template");

                //var insertSentMessage = _dataContext.sp_SmsSentInsert("mycrm", MobileNumber, "Your last sms is not recognized by the system,Please check your sms template", DateTime.Now).ToList();

                //if (insertSentMessage.Count > 0)
                //{
                //    long smsId = Convert.ToInt64(insertSentMessage[0].SmsId);
                //    string returnRespnse = _sendSMS.SendMessage(MobileNumber, "Your last sms is not recognized by the system,Please check your sms template");
                //    var updateSentMessage = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                //}



            }
        Finish: { }

            return returnString;
        }

        private bool InsertDcr(long insertedId, string mobileNumber, string messageText)
        {
            bool IsSaved = false;
            DataSet dataSet = new DataSet();
            DbTransaction insertTransaction = null;
            var errormsg = ""; var errormsg2 = "";
            try
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Closed)
                {
                    _dataContext.Connection.Open();
                }

                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;

                #region Initialize Variables

                DateTime DT = DateTime.Now;
                string DC = "", P1 = "", P2 = "", P3 = "", P4 = "", R1 = "", R2 = "", R3 = "", S1 = "", S2 = "", S3 = "", Q1 = "", Q2 = "", Q3 = "", G1 = "", G2 = "", QG1 = "",
                    QG2 = "", JV = "", VT = "";
                long doctorId = 0, employeeId = 0, systemUserID = 0, preSalesCallsId = 0, jointVisitorId = 0, gift1Id = 0, gift2Id = 0;
                int classId = 0, specialityId = 0, qualificationId = 0, levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0, callTypeId = 0,
                    product1Id = 0, product2Id = 0, product3Id = 0, product4Id = 0, productSKU1Id = 0, productSKU2Id = 0, productSKU3Id = 0, productSKU4Id = 0, sample1Id = 0,
                    sample2Id = 0, sample3Id = 0, sampleProductSku1Id = 0, sampleProductSku2Id = 0, sampleProductSku3Id = 0;
                string JVZSMstring = "", JVRSMstring = "", JVNSMstring = "", JVHOstring = "";
                long? JVZSM = null, JVRSM = null, JVNSM = null, JVHO = null;
                #endregion

                #region DT

                DT = _smsDate;

                #endregion

                #region DC

                if (messageText != "" && messageText.Contains(" DC:"))
                {
                    var index = messageText.IndexOf(" DC:");

                    if (index > -1)
                    {
                        DC = messageText.Substring(index + 4, (messageText.IndexOf("P1:") - 1) - (index + 4)).Trim();

                        if (DC.Trim() == "")
                        {
                            UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            goto Error;
                        }
                        else
                        {
                            _doctorCode = DC.Trim();
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("DC:"))
                    {
                        var index = messageText.IndexOf("DC:");

                        if (index > -1)
                        {
                            DC = messageText.Substring(index + 3, messageText.IndexOf("P1:") - (index + 3)).Trim();

                            if (DC.Trim() == "")
                            {
                                UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                goto Error;
                            }
                            else
                            {
                                _doctorCode = DC.Trim();
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region P1

                if (messageText != "" && messageText.Contains(" P1:"))
                {
                    var index = messageText.IndexOf(" P1:");

                    if (index > -1)
                    {
                        P1 = messageText.Substring(index + 4, (messageText.IndexOf("P2:") - 1) - (index + 4)).Trim();

                        if (P1.Trim() == "")
                        {
                            P1 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("P1:"))
                    {
                        var index = messageText.IndexOf("P1:");

                        if (index > -1)
                        {
                            P1 = messageText.Substring(index + 3, messageText.IndexOf("P2:") - (index + 3)).Trim();

                            if (P1.Trim() == "")
                            {
                                P1 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region P2

                if (messageText != "" && messageText.Contains(" P2:"))
                {
                    var index = messageText.IndexOf(" P2:");

                    if (index > -1)
                    {
                        P2 = messageText.Substring(index + 4, (messageText.IndexOf("P3:") - 1) - (index + 4)).Trim();

                        if (P2.Trim() == "")
                        {
                            P2 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("P2:"))
                    {
                        var index = messageText.IndexOf("P2:");

                        if (index > -1)
                        {
                            P2 = messageText.Substring(index + 3, messageText.IndexOf("P3:") - (index + 3)).Trim();

                            if (P2.Trim() == "")
                            {
                                P2 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region P3

                if (messageText != "" && messageText.Contains(" P3:"))
                {
                    var index = messageText.IndexOf(" P3:");

                    if (index > -1)
                    {
                        P3 = messageText.Substring(index + 4, (messageText.IndexOf("P4:") - 1) - (index + 4)).Trim();

                        if (P3.Trim() == "")
                        {
                            P3 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("P3:"))
                    {
                        var index = messageText.IndexOf("P3:");

                        if (index > -1)
                        {
                            P3 = messageText.Substring(index + 3, messageText.IndexOf("P4:") - (index + 3)).Trim();

                            if (P3.Trim() == "")
                            {
                                P3 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region P4

                if (messageText != "" && messageText.Contains(" P4:"))
                {
                    var index = messageText.IndexOf(" P4:");

                    if (index > -1)
                    {
                        P4 = messageText.Substring(index + 4, (messageText.IndexOf("R1:") - 1) - (index + 4)).Trim();

                        if (P4.Trim() == "")
                        {
                            P4 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("P4:"))
                    {
                        var index = messageText.IndexOf("P4:");

                        if (index > -1)
                        {
                            P4 = messageText.Substring(index + 3, messageText.IndexOf("R1:") - (index + 3)).Trim();

                            if (P4.Trim() == "")
                            {
                                P4 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region R1

                if (messageText != "" && messageText.Contains(" R1:"))
                {
                    var index = messageText.IndexOf(" R1:");

                    if (index > -1)
                    {
                        R1 = messageText.Substring(index + 4, (messageText.IndexOf("R2:") - 1) - (index + 4)).Trim();

                        if (R1.Trim() == "")
                        {
                            R1 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("R1:"))
                    {
                        var index = messageText.IndexOf("R1:");

                        if (index > -1)
                        {
                            R1 = messageText.Substring(index + 3, messageText.IndexOf("R2:") - (index + 3)).Trim();

                            if (R1.Trim() == "")
                            {
                                R1 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region R2

                if (messageText != "" && messageText.Contains(" R2:"))
                {
                    var index = messageText.IndexOf(" R2:");

                    if (index > -1)
                    {
                        R2 = messageText.Substring(index + 4, (messageText.IndexOf("R3:") - 1) - (index + 4)).Trim();

                        if (R2.Trim() == "")
                        {
                            R2 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("R2:"))
                    {
                        var index = messageText.IndexOf("R2:");

                        if (index > -1)
                        {
                            R2 = messageText.Substring(index + 3, messageText.IndexOf("R3:") - (index + 3)).Trim();

                            if (R2.Trim() == "")
                            {
                                R2 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region R3

                if (messageText != "" && messageText.Contains(" R3:"))
                {
                    var index = messageText.IndexOf(" R3:");

                    if (index > -1)
                    {
                        R3 = messageText.Substring(index + 4, (messageText.IndexOf("S1:") - 1) - (index + 4)).Trim();

                        if (R3.Trim() == "")
                        {
                            R3 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("R3:"))
                    {
                        var index = messageText.IndexOf("R3:");

                        if (index > -1)
                        {
                            R3 = messageText.Substring(index + 3, messageText.IndexOf("S1:") - (index + 3)).Trim();

                            if (R3.Trim() == "")
                            {
                                R3 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region S1

                if (messageText != "" && messageText.Contains(" S1:"))
                {
                    var index = messageText.IndexOf(" S1:");

                    if (index > -1)
                    {
                        S1 = messageText.Substring(index + 4, (messageText.IndexOf("S2:") - 1) - (index + 4)).Trim();

                        if (S1.Trim() != "")
                        {
                            try
                            {
                                if (S1.IndexOf(' ') > 0)
                                {
                                    string S1New = S1;

                                    //int spacepoint = S1.IndexOf(' ');
                                    //string ns1 = S1.Substring(0, spacepoint).Trim();
                                    //string nQ1 = S1.Substring(spacepoint, S1.Length - 1).Trim();
                                    // string[] Sample1 = S1.Split(' ');
                                    var ssss = S1New.Split(' ');

                                    if (ssss.Length == 3)
                                    {
                                        S1 = S1New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q1 = S1New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                    }
                                    else
                                    {
                                        S1 = S1New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q1 = S1New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                    }


                                }
                                else
                                {
                                    S1 = S1.ToString();
                                    Q1 = "NULL";
                                }

                            }
                            catch (Exception)
                            {
                                UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                goto Error;
                            }
                        }
                        else
                        {
                            S1 = "NULL";
                            Q1 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("S1:"))
                    {
                        var index = messageText.IndexOf("S1:");

                        if (index > -1)
                        {
                            S1 = messageText.Substring(index + 3, messageText.IndexOf("S2:") - (index + 3)).Trim();

                            if (S1.Trim() != "")
                            {
                                try
                                {
                                    if (S1.IndexOf(' ') > 0)
                                    {
                                        string S1New = S1;
                                        //int spacepoint = S1.IndexOf(' ');
                                        //string ns1 = S1.Substring(0, spacepoint).Trim();
                                        //string nQ1 = S1.Substring(spacepoint, S1.Length - 1).Trim();
                                        // string[] Sample1 = S1.Split(' ');
                                        var ssss = S1New.Split(' ');

                                        if (ssss.Length == 3)
                                        {
                                            S1 = S1New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q1 = S1New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                        }
                                        else
                                        {
                                            S1 = S1New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q1 = S1New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                            // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        }
                                    }
                                    else
                                    {
                                        S1 = S1.ToString();
                                        Q1 = "NULL";
                                    }
                                    //string[] Sample1 = S1.Split(' ');
                                    //S1 = Sample1[0].ToString();
                                    //Q1 = Sample1[1].ToString();
                                }
                                catch (Exception)
                                {
                                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    goto Error;
                                }
                            }
                            else
                            {
                                S1 = "NULL";
                                Q1 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region S2

                if (messageText != "" && messageText.Contains(" S2:"))
                {
                    var index = messageText.IndexOf(" S2:");

                    if (index > -1)
                    {
                        S2 = messageText.Substring(index + 4, (messageText.IndexOf("S3:") - 1) - (index + 4)).Trim();

                        if (S2.Trim() != "")
                        {
                            try
                            {

                                if (S2.IndexOf(' ') > 0)
                                {
                                    string S2New = S2;
                                    //int spacepoint = S2.IndexOf(' ');
                                    //string ns1 = S2.Substring(0, spacepoint).Trim();
                                    //string nQ1 = S2.Substring(spacepoint, S2.Length - 1).Trim();
                                    // string[] Sample1 = S1.Split(' ');

                                    // S2 = S2New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                    // Q2 = S2New.Split(' ')[1].ToString(); // Sample1[1].ToString();

                                    var ssss = S2New.Split(' ');

                                    if (ssss.Length == 3)
                                    {
                                        S2 = S2New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q2 = S2New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                    }
                                    else
                                    {
                                        S2 = S2New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q2 = S2New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                    }




                                }
                                else
                                {
                                    S2 = S2.ToString();
                                    Q2 = "NULL";
                                }

                                //string[] Sample2 = S2.Split(' ');
                                //S2 = Sample2[0].ToString();
                                //Q2 = Sample2[1].ToString();
                            }
                            catch (Exception)
                            {
                                UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                goto Error;
                            }
                        }
                        else
                        {
                            S2 = "NULL";
                            Q2 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("S2:"))
                    {
                        var index = messageText.IndexOf("S2:");

                        if (index > -1)
                        {
                            S2 = messageText.Substring(index + 3, messageText.IndexOf("S3:") - (index + 3)).Trim();

                            if (S2.Trim() != "")
                            {
                                try
                                {
                                    if (S2.IndexOf(' ') > 0)
                                    {
                                        //int spacepoint = S2.IndexOf(' ');
                                        //string ns1 = S2.Substring(0, spacepoint).Trim();
                                        //string nQ1 = S2.Substring(spacepoint, S2.Length - 1).Trim();
                                        // string[] Sample1 = S1.Split(' ');
                                        string S2New = S2;

                                        var ssss = S2New.Split(' ');

                                        if (ssss.Length == 3)
                                        {
                                            S2 = S2New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q2 = S2New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                        }
                                        else
                                        {
                                            S2 = S2New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q2 = S2New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                            // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        }

                                    }
                                    else
                                    {
                                        S2 = S2.ToString();
                                        Q2 = "NULL";
                                    }
                                    //string[] Sample2 = S2.Split(' ');
                                    //S2 = Sample2[0].ToString();
                                    //Q2 = Sample2[1].ToString();
                                }
                                catch (Exception)
                                {
                                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    goto Error;
                                }
                            }
                            else
                            {
                                S2 = "NULL";
                                Q2 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region S3

                if (messageText != "" && messageText.Contains(" S3:"))
                {
                    var index = messageText.IndexOf(" S3:");

                    if (index > -1)
                    {
                        S3 = messageText.Substring(index + 4, (messageText.IndexOf("G1:") - 1) - (index + 4)).Trim();

                        if (S3.Trim() != "")
                        {
                            try
                            {
                                if (S3.IndexOf(' ') > 0)
                                {
                                    string S3New = S3;
                                    //int spacepoint = S2.IndexOf(' ');
                                    //string ns1 = S2.Substring(0, spacepoint).Trim();
                                    //string nQ1 = S2.Substring(spacepoint, S2.Length - 1).Trim();
                                    // string[] Sample1 = S1.Split(' ');

                                    // S3 = S3New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                    // Q3 = S3New.Split(' ')[1].ToString(); // Sample1[1].ToString();

                                    var ssss = S3New.Split(' ');

                                    if (ssss.Length == 3)
                                    {
                                        S3 = S3New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q3 = S3New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                    }
                                    else
                                    {
                                        S3 = S3New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        Q3 = S3New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                        // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                    }



                                }
                                else
                                {
                                    S3 = S3.ToString();
                                    Q3 = "NULL";
                                }
                                //string[] Sample3 = S3.Split(' ');
                                //S3 = Sample3[0].ToString();
                                //Q3 = Sample3[1].ToString();
                            }
                            catch (Exception)
                            {
                                UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                goto Error;
                            }
                        }
                        else
                        {
                            S3 = "NULL";
                            Q3 = "NULL";
                        }
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("S3:"))
                    {
                        var index = messageText.IndexOf("S3:");

                        if (index > -1)
                        {
                            S3 = messageText.Substring(index + 3, messageText.IndexOf("G1:") - (index + 3)).Trim();

                            if (S3.Trim() != "")
                            {
                                try
                                {
                                    if (S3.IndexOf(' ') > 0)
                                    {
                                        string S3New = S3;
                                        //int spacepoint = S2.IndexOf(' ');
                                        //string ns1 = S2.Substring(0, spacepoint).Trim();
                                        //string nQ1 = S2.Substring(spacepoint, S2.Length - 1).Trim();
                                        // string[] Sample1 = S1.Split(' ');

                                        var ssss = S3New.Split(' ');

                                        if (ssss.Length == 3)
                                        {
                                            S3 = S3New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q3 = S3New.Split(' ')[2].ToString(); // Sample1[1].ToString();
                                        }
                                        else
                                        {
                                            S3 = S3New.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            Q3 = S3New.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                            // S1 = sampl1.Split(' ')[0].ToString(); //Sample1[0].ToString();
                                            // Q1 = sampl1.Split(' ')[1].ToString(); // Sample1[1].ToString();
                                        }
                                    }
                                    else
                                    {
                                        S3 = S3.ToString();
                                        Q3 = "NULL";
                                    }

                                    //string[] Sample3 = S3.Split(' ');
                                    //S3 = Sample3[0].ToString();
                                    //Q3 = Sample3[1].ToString();
                                }
                                catch (Exception)
                                {
                                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    goto Error;
                                }
                            }
                            else
                            {
                                S3 = "NULL";
                                Q3 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region G1

                try
                {
                    if (messageText != "" && messageText.Contains(" G1:"))
                    {
                        var index = messageText.IndexOf(" G1:");

                        if (index > -1)
                        {
                            G1 = messageText.Substring(index + 4, (messageText.IndexOf("G2:") - 1) - (index + 4)).Trim();

                            if (G1.Trim() != "")
                            {
                                try
                                {

                                    QG1 = G1;
                                    //string[] Sample1 = G1.Split(' ');

                                    //G1 = Sample1[0].ToString();
                                    //if (Sample1.Count() > 1)
                                    //{
                                    //    QG1 = Sample1[1].ToString();
                                    //}
                                    //else
                                    //{
                                    //    QG1 = "NULL";
                                    //}
                                }
                                catch (Exception)
                                {
                                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    goto Error;
                                }
                            }
                            else
                            {
                                G1 = "NULL";
                                QG1 = "NULL";

                            }
                        }
                    }
                    else
                    {
                        if (messageText != "" && messageText.Contains("G1:"))
                        {
                            var index = messageText.IndexOf("G1:");

                            if (index > -1)
                            {
                                G1 = messageText.Substring(index + 3, messageText.IndexOf("G2:") - (index + 3)).Trim();

                                if (G1.Trim() != "")
                                {
                                    try
                                    {

                                        QG1 = G1;
                                        //string[] Sample1 = G1.Split(' ');

                                        //G1 = Sample1[0].ToString();
                                        //if (Sample1.Count() > 1)
                                        //{
                                        //    QG1 = Sample1[1].ToString();
                                        //}
                                        //else
                                        //{
                                        //    QG1 = "NULL";
                                        //}
                                    }
                                    catch (Exception)
                                    {
                                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                        goto Error;
                                    }
                                }
                                else
                                {
                                    G1 = "NULL";
                                    QG1 = "NULL";

                                }
                            }
                        }
                        else
                        {
                            goto Error;
                        }
                    }
                }
                catch (Exception exception)
                {
                    Console.Out.WriteLine(exception.Message);
                    QG1 = "NULL";
                }

                #endregion

                #region G2

                try
                {
                    if (messageText != "" && messageText.Contains(" G2:"))
                    {
                        var index = messageText.IndexOf(" G2:");

                        if (index > -1)
                        {
                            G2 = messageText.Substring(index + 4, (messageText.IndexOf("JV:") - 1) - (index + 4)).Trim();

                            if (G2.Trim() != "")
                            {
                                try
                                {
                                    QG2 = G2;
                                    //string[] Sample1 = G2.Split(' ');
                                    //G2 = Sample1[0].ToString();
                                    //if (Sample1.Count() > 1)
                                    //{
                                    //    QG2 = Sample1[1].ToString();
                                    //}
                                    //else
                                    //{
                                    //    QG2 = "NULL";
                                    //}
                                }
                                catch (Exception)
                                {
                                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                    goto Error;
                                }
                            }
                            else
                            {
                                G2 = "NULL";
                                QG2 = "NULL";
                            }
                        }
                    }
                    else
                    {
                        if (messageText != "" && messageText.Contains("G2:"))
                        {
                            var index = messageText.IndexOf("G2:");

                            if (index > -1)
                            {
                                G2 = messageText.Substring(index + 3, messageText.IndexOf("JV:") - (index + 3)).Trim();

                                if (G2.Trim() != "")
                                {
                                    try
                                    {
                                        QG2 = G2;
                                        //string[] Sample1 = G2.Split(' ');
                                        //G2 = Sample1[0].ToString();
                                        //if (Sample1.Count() > 1)
                                        //{
                                        //    QG2 = Sample1[1].ToString();
                                        //}
                                        //else
                                        //{
                                        //    QG2 = "NULL";
                                        //}
                                    }
                                    catch (Exception)
                                    {
                                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                        goto Error;
                                    }
                                }
                                else
                                {
                                    G2 = "NULL";
                                    QG2 = "NULL";
                                }
                            }
                        }
                        else
                        {
                            UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            goto Error;
                        }
                    }
                }
                catch (Exception exception)
                {
                    Console.Out.WriteLine(exception.Message);
                    QG2 = "NULL";
                }

                #endregion

                #region JV

                if (messageText != "" && messageText.Contains(" JV:"))
                {
                    var index = messageText.IndexOf(" JV:");

                    if (index > -1)
                    {
                        JV = messageText.Substring(index + 4, (messageText.IndexOf("VT:") - 1) - (index + 4)).Trim();
                    }
                }
                else
                {
                    if (messageText != "" && messageText.Contains("JV:"))
                    {
                        var index = messageText.IndexOf("JV:");

                        if (index > -1)
                        {
                            JV = messageText.Substring(index + 3, messageText.IndexOf("VT:") - (index + 3)).Trim();
                        }
                    }
                    else
                    {
                        UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                        goto Error;
                    }
                }

                #endregion

                #region VT

                if (messageText != "" && messageText.Contains("VT:"))
                {
                    var index = messageText.IndexOf("VT:");

                    if (index > -1)
                    {
                        VT = messageText.Substring(index + 3, (messageText.Length) - (index + 3)).Trim();

                        if (VT.Trim() != string.Empty)
                        {
                            if (VT == "M" || VT == "m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == "E" || VT == "e")
                            {
                                VT = Convert.ToString(2);
                            }
                            else if (VT == ":M" || VT == ":m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == ":E" || VT == ":e")
                            {
                                VT = Convert.ToString(2);
                            }
                            else
                            {
                                UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                                goto Error;
                            }
                        }

                        if (VT.Trim() == string.Empty)
                        {
                            VT = Convert.ToString(0);
                            UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                            goto Error;
                        }
                    }
                }
                else
                {
                    UpdateSMSrecievedWithError(insertedId, "Your last DCR sms is not recognized by the system,Please check your sms template");
                    InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last DCR sms is not recognized by the system,Please check your sms template");
                    goto Error;
                }

                #endregion

                #region Get MR Complete Hierarchy Detail

                var validateMR = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();

                if (validateMR.Count != 0)
                {
                    var mrPresent = Convert.ToBoolean(validateMR[0].IsActive);

                    if (!mrPresent)
                    {
                        goto Error;
                    }

                    employeeId = Convert.ToInt64(validateMR[0].EmployeeId);
                    _employeeName = validateMR[0].FirstName + " " + validateMR[0].MiddleName + " " + validateMR[0].LastName;
                    var getEmployeeMembership = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                    if (getEmployeeMembership.Count != 0)
                    {
                        systemUserID = Convert.ToInt64(getEmployeeMembership[0].SystemUserID);
                        var getEmployeeHierarchy = _dataContext.sp_EmplyeeHierarchySelect(systemUserID).ToList();

                        if (getEmployeeHierarchy.Count != 0)
                        {
                            levelId1 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
                            levelId2 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
                            levelId3 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                            levelId4 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                            levelId5 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                            levelId6 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
                        }
                        else
                        {
                            goto Error;
                        }
                    }
                    else
                    {
                        goto Error;
                    }
                }

                #endregion

                #region Get Doctor Detail
                int numDC;
                if (!int.TryParse(DC, out numDC))
                {
                    errormsg = errormsg + "DCR of DC " + DC + " contains errors. DC: " + DC + " ";
                }
                else
                {
                    var validateDoctor = _dataContext.sp_MRDoctorSelectByCode(employeeId, DC).ToList();

                    if (validateDoctor.Count != 0)
                    {
                        doctorId = Convert.ToInt64(validateDoctor[0].DoctorId);

                        #region Doctor Class

                        var getClassOfDoctor = _dataContext.sp_ClassOfDoctorSelect(doctorId).ToList();

                        if (getClassOfDoctor.Count != 0)
                        {
                            classId = Convert.ToInt32(getClassOfDoctor[0].ClassId);
                        }
                        else
                        {
                            // UpdateSMSrecievedWithError(insertedId, "Class For DC: " + DC + "not available");
                            //  InsertSMSrecievedWithErrorOutbound(mobileNumber, "Class For DC: " + DC + "not available");
                            // goto Error;
                        }

                        #endregion

                        #region Doctor Speciality

                        var getSpecialityOfDoctor = _dataContext.sp_DoctorSpecialitySelectByDoctor(doctorId).ToList();

                        if (getSpecialityOfDoctor.Count != 0)
                        {
                            specialityId = Convert.ToInt32(getSpecialityOfDoctor[0].SpecialityId);
                        }
                        else
                        {
                            //UpdateSMSrecievedWithError(insertedId, "Speciality For DC: " + DC + "not available");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Speciality For DC: " + DC + "not available");
                            //goto Error;
                            specialityId = 1;
                        }

                        #endregion

                        #region Doctor Qualification

                        var getQualificationOfDoctor = _dataContext.sp_QualificationsOfDoctorsSelectByDoctor(doctorId).ToList();

                        if (getQualificationOfDoctor.Count != 0)
                        {
                            qualificationId = Convert.ToInt32(getQualificationOfDoctor[0].QulificationId);
                        }
                        else
                        {
                            //UpdateSMSrecievedWithError(insertedId, "Qualification For DC: " + DC + "not available");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Qualification For DC: " + DC + "not available");
                            //goto Error;
                            qualificationId = 1;
                        }

                        #endregion
                    }
                    else
                    {
                        errormsg = errormsg + "DCR of DC " + DC + " contains errors. DC: " + DC + " ";
                        //  goto CodeError;
                    }
                }

                #endregion

                #region Get "CallType, CallProduct, CallProductSmaple, CallGift, CallQuantity, Joint-Visitor" Details

                #region Get Call Type

                var getCallType = _dataContext.sp_CallTypesSelectByName(_smsKeyWord).ToList();

                if (getCallType.Count != 0)
                {
                    callTypeId = Convert.ToInt32(getCallType[0].CallTypeId);
                }
                else
                {
                    errormsg2 = _smsKeyWord;
                    if (errormsg == "")
                    {
                        errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                    }
                    else
                    {
                        errormsg = errormsg + " " + errormsg2 + " ";
                    }

                    //UpdateSMSrecievedWithError(insertedId, errormsg);
                    //InsertSMSrecievedWithErrorOutbound(mobileNumber, errormsg);
                    goto Error;
                }

                #endregion

                #region Get Call Products

                List<DatabaseLayer.SQL.ProductSku> getProductSku;
                #region P1
                if (P1 != "NULL")
                {
                    int nump1;
                    if (!int.TryParse(P1, out nump1))
                    {
                        errormsg2 = "P1: " + P1 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {

                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P1).ToList();

                        if (getProductSku.Count != 0)
                        {
                            product1Id = Convert.ToInt32(getProductSku[0].ProductId);
                            productSKU1Id = Convert.ToInt32(getProductSku[0].SkuId);
                        }
                        else
                        {
                            errormsg2 = "P1: " + P1 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }


                            // UpdateSMSrecievedWithError(insertedId, "Product  P1: " + P1 + "not found");
                            // InsertSMSrecievedWithErrorOutbound(mobileNumber, "Product  P1: " + P1 + "not found");
                            // goto Error;
                        }
                    }
                }

                #endregion
                #region P2
                if (P2 != "NULL")
                {

                    int numP2;
                    if (!int.TryParse(P2, out numP2))
                    {
                        errormsg2 = "P1: " + P1 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P2).ToList();

                        if (getProductSku.Count != 0)
                        {
                            product2Id = Convert.ToInt32(getProductSku[0].ProductId);
                            productSKU2Id = Convert.ToInt32(getProductSku[0].SkuId);
                        }
                        else
                        {
                            errormsg2 = "P2: " + P2 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                        }
                    }

                }
                #endregion
                #region P3
                if (P3 != "NULL")
                {

                    int numP3;
                    if (!int.TryParse(P3, out numP3))
                    {
                        errormsg2 = "P3: " + P3 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {

                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P3).ToList();

                        if (getProductSku.Count != 0)
                        {
                            product3Id = Convert.ToInt32(getProductSku[0].ProductId);
                            productSKU3Id = Convert.ToInt32(getProductSku[0].SkuId);
                        }
                        else
                        {
                            errormsg2 = "P3: " + P3 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "Product  P3: " + P3 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Product  P3: " + P3 + "not found");
                            //goto Error;
                        }
                    }
                }
                #endregion
                #region P4
                if (P4 != "NULL")
                {
                    int nump4;
                    if (!int.TryParse(P4, out nump4))
                    {
                        errormsg2 = "P4: " + P4 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {

                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, P4).ToList();

                        if (getProductSku.Count != 0)
                        {
                            product4Id = Convert.ToInt32(getProductSku[0].ProductId);
                            productSKU4Id = Convert.ToInt32(getProductSku[0].SkuId);
                        }
                        else
                        {
                            errormsg2 = "P4: " + P4 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "Product  P4: " + P4 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Product  P4: " + P4 + "not found");
                            //goto Error;
                        }
                    }
                }
                #endregion
                #endregion

                #region GET Remainder With Products

                if (R1 != "NULL")
                {
                    int num1;
                    if (!int.TryParse(R1, out num1))
                    {
                        errormsg2 = "R1: " + R1 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, R1).ToList();
                        if (getProductSku.Count == 0)
                        {
                            errormsg2 = "R1: " + R1 + " ";
                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                        }
                    }

                }

                if (R2 != "NULL")
                {
                    int num1;
                    if (!int.TryParse(R2, out num1))
                    {
                        errormsg2 = "R2: " + R2 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, R2).ToList();
                        if (getProductSku.Count == 0)
                        {
                            errormsg2 = "R2: " + R2 + " ";
                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                        }
                    }
                }

                if (R3 != "NULL")
                {
                    int num1;
                    if (!int.TryParse(R3, out num1))
                    {
                        errormsg2 = "R3: " + R3 + " ";
                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, R3).ToList();
                        if (getProductSku.Count == 0)
                        {
                            errormsg2 = "R3: " + R3 + " ";
                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                        }
                    }
                }
                #endregion

                #region Get Call Product Sample
                #region S1

                int num2;
                if (S1 != "NULL")
                {
                    int numS1;
                    if (!int.TryParse(S1, out numS1))
                    {
                        errormsg2 = "S1: " + S1 + " ";

                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S1).ToList();

                        if (getProductSku.Count != 0)
                        {
                            sample1Id = Convert.ToInt32(getProductSku[0].ProductId);
                            sampleProductSku1Id = Convert.ToInt32(getProductSku[0].SkuId);

                            if (Q1 == null)
                            {
                                errormsg2 = "Q1: " + Q1 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }

                            }
                            else if (!int.TryParse(Q1, out num2))
                            {
                                errormsg2 = "Q1: " + Q1 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }
                            }
                        }
                        else
                        {
                            errormsg2 = "S1: " + S1 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "Product Sample  S1: " + S1 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Product  S1: " + S1 + "not found");
                            //goto Error;
                        }
                    }
                }
                #endregion
                #region S2

                if (S2 != "NULL")
                {
                    int numS2;
                    if (!int.TryParse(S2, out numS2))
                    {
                        errormsg2 = "S2: " + S2 + " ";

                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {

                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S2).ToList();

                        if (getProductSku.Count != 0)
                        {
                            sample2Id = Convert.ToInt32(getProductSku[0].ProductId);
                            sampleProductSku2Id = Convert.ToInt32(getProductSku[0].SkuId);

                            if (Q2 == null)
                            {
                                errormsg2 = "Q2: " + Q2 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }

                            }
                            else if (!int.TryParse(Q2, out num2))
                            {
                                errormsg2 = "Q2: " + Q2 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }
                            }
                        }
                        else
                        {
                            errormsg2 = "S2: " + S2 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "Product Sample  S2: " + S2 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Product  S2: " + S2 + "not found");
                            //goto Error;
                        }
                    }
                }
                #endregion
                #region S3
                if (S3 != "NULL")
                {
                    int numS3;
                    if (!int.TryParse(S3, out numS3))
                    {
                        errormsg2 = "S3: " + S3 + " ";

                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                    }
                    else
                    {
                        getProductSku = _dataContext.sp_ProductSkuSelect(null, null, S3).ToList();

                        if (getProductSku.Count != 0)
                        {
                            sample3Id = Convert.ToInt32(getProductSku[0].ProductId);
                            sampleProductSku3Id = Convert.ToInt32(getProductSku[0].SkuId);

                            if (Q3 == null)
                            {
                                errormsg2 = "Q3: " + Q3 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }

                            }
                            else if (!int.TryParse(Q3, out num2))
                            {
                                errormsg2 = "Q3: " + Q3 + " ";
                                if (errormsg == "")
                                {
                                    errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                                }
                                else
                                {
                                    errormsg = errormsg + " " + errormsg2 + " ";
                                }
                            }
                        }
                        else
                        {
                            errormsg2 = "S3: " + S3 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                        }
                    }
                }
                #endregion
                #endregion

                #region Get Joint-Visitor Detail

                #region JointVistWork
                DAL dl = new DAL();
                DataSet ds = new DataSet();
                NameValueCollection nv = new NameValueCollection();
                List<DatabaseLayer.SQL.Employee> getManager;
                long managerId = 0;

                if (JV != "")
                    if (JV != "0")
                    {
                        string[] jvster = JV.Split(' ');

                        for (int i = 0; i < jvster.Length; i++)
                        {
                            if (i == 0)
                            {
                                JVZSMstring = jvster[i].ToString();
                            }
                            else if (i == 1)
                            {
                                JVRSMstring = jvster[i].ToString();
                            }
                            else if (i == 2)
                            {
                                JVNSMstring = jvster[i].ToString();
                            }
                            else if (i == 3)
                            {
                                JVHOstring = jvster[i].ToString();
                            }
                        }

                        if (JV.Length > 1)
                        {
                            int reslt;
                            if (JVZSMstring != "" && !(int.TryParse(JVZSMstring, out reslt)))
                            {
                                JVZSM = null;
                            }
                            if (JVRSMstring != "" && !(int.TryParse(JVRSMstring, out reslt)))
                            {
                                JVRSM = null;
                            }
                            if (JVNSMstring != "" && !(int.TryParse(JVNSMstring, out reslt)))
                            {
                                JVNSM = null;
                            }
                            if (JVHOstring != "" && !(int.TryParse(JVHOstring, out reslt)))
                            {
                                JVHO = null;
                            }

                            if (JVZSMstring != "0")
                            {
                                #region RL5

                                nv.Add("@EmployeeId-BIGINT", employeeId.ToString());
                                ds = dl.GetData("sp_EmployeesSelect", nv);
                                //getManager = _dataContext.sp_EmployeesSelect1(employeeId).ToList();

                                if (ds.Tables[0].Rows.Count > 0)
                                {
                                    JVZSM = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());
                                    JV = ds.Tables[0].Rows[0]["ManagerId"].ToString();
                                }
                                else
                                {
                                    //UpdateSMSrecievedWithError(insertedId, "Joint Visitor 1 is inactive");
                                    //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor 1 is inactive");
                                    //goto Error;
                                }

                                #endregion
                            }
                            else
                            {
                                JVZSM = null;
                                JV = null;
                            }

                            if (JVRSMstring != "0")
                            {
                                #region RL4

                                ds.Clear();
                                nv.Clear();
                                nv.Add("@EmployeeId-BIGINT", employeeId.ToString());
                                ds = dl.GetData("sp_EmployeesSelect", nv);
                                //getManager = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                                if (ds.Tables[0].Rows.Count > 0)
                                {
                                    managerId = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());

                                    ds.Clear();
                                    nv.Clear();
                                    nv.Add("@EmployeeId-BIGINT", managerId.ToString());
                                    ds = dl.GetData("sp_EmployeesSelect", nv);

                                    //getManager = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                    if (ds.Tables[0].Rows.Count > 0)
                                    {
                                        JVRSM = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());
                                    }
                                    else
                                    {
                                        //UpdateSMSrecievedWithError(insertedId, "Joint Visitor is inactive");
                                        //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor is inactive");
                                        //goto Error;
                                    }
                                }
                                else
                                {
                                    //UpdateSMSrecievedWithError(insertedId, "Joint Visitor is inactive");
                                    //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor is inactive");
                                    //goto Error;
                                }

                                #endregion
                            }
                            else
                            {
                                JVRSM = null;
                            }

                            if (JVNSMstring != "0")
                            {
                                #region RL3

                                ds.Clear();
                                nv.Clear();
                                nv.Add("@EmployeeId-BIGINT", employeeId.ToString());
                                ds = dl.GetData("sp_EmployeesSelect", nv);

                                // getManager = _dataContext.sp_EmployeesSelect(employeeId).ToList();

                                if (ds.Tables[0].Rows.Count > 0)
                                {
                                    managerId = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());
                                    //getManager = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                    ds.Clear();
                                    nv.Clear();
                                    nv.Add("@EmployeeId-BIGINT", managerId.ToString());
                                    ds = dl.GetData("sp_EmployeesSelect", nv);

                                    if (ds.Tables[0].Rows.Count > 0)
                                    {
                                        managerId = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());
                                        //getManager = _dataContext.sp_EmployeesSelect(managerId).ToList();

                                        ds.Clear();
                                        nv.Clear();
                                        nv.Add("@EmployeeId-BIGINT", managerId.ToString());
                                        ds = dl.GetData("sp_EmployeesSelect", nv);

                                        if (ds.Tables[0].Rows.Count > 0)
                                        {
                                            JVNSM = Convert.ToInt64(ds.Tables[0].Rows[0]["ManagerId"].ToString());
                                        }
                                        else
                                        {
                                            //UpdateSMSrecievedWithError(insertedId, "Joint Visitor is inactive");
                                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor is inactive");
                                            //goto Error;
                                        }
                                    }
                                    else
                                    {
                                        //UpdateSMSrecievedWithError(insertedId, "Joint Visitor is inactive");
                                        //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor is inactive");
                                        //goto Error;
                                    }
                                }
                                else
                                {
                                    //UpdateSMSrecievedWithError(insertedId, "Joint Visitor is inactive");
                                    //InsertSMSrecievedWithErrorOutbound(mobileNumber, "Joint Visitor is inactive");
                                    //goto Error;
                                }

                                #endregion
                            }
                            else
                            {
                                JVNSM = null;
                            }

                            if (JVHOstring != "0")
                            {
                                JVHO = 2;
                            }
                            else
                            {
                                JVHO = null;
                            }
                        }
                        else if (JV.Length == 1)
                        {
                            int k;
                            if (JV != " " && int.TryParse(JV, out k))
                            {
                                JV = "1";
                                JVZSM = 1;
                            }
                            else
                            {
                                JV = "NULL";
                            }
                        }
                    }
                    else
                    {
                        JV = null;
                        JVZSM = null;
                        JVRSM = null;
                        JVNSM = null;
                        JVHO = null;
                    }
                #endregion

                #endregion

                #region Get Gifts Detail

                List<DatabaseLayer.SQL.GiftItem> getGiftItems;

                #region G1
                if (G1 != "NULL")
                {

                    if (int.TryParse(G1, out num2))
                    {
                        getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G1).ToList();

                        if (getGiftItems.Count != 0)
                        {
                            gift1Id = Convert.ToInt64(getGiftItems[0].GiftId);

                            //if (QG1 == null)
                            //{
                            //    errormsg2 = "QG1: " + QG1 + " ";
                            //    if (errormsg == "")
                            //    {
                            //        errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            //    }
                            //    else
                            //    {
                            //        errormsg = errormsg + " " + errormsg2 + " ";
                            //    }

                            //}
                        }
                        else
                        {
                            #region
                            errormsg2 = "G1: " + G1 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "G1: " + G1 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "G1: " + G1 + "not found");
                            //goto Error;
                            #endregion
                        }
                    }
                    else
                    {
                        #region
                        errormsg2 = "G1: " + G1 + " ";

                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                        #endregion
                    }
                }
                #endregion
                #region G2
                if (G2 != "NULL")
                {
                    if (int.TryParse(G2, out num2))
                    {
                        getGiftItems = _dataContext.sp_GiftItemsSelectByCode(G2).ToList();

                        if (getGiftItems.Count != 0)
                        {
                            gift2Id = Convert.ToInt64(getGiftItems[0].GiftId);

                            //if (QG1 == null)
                            //{
                            //    errormsg2 = "QG1: " + QG1 + " ";
                            //    if (errormsg == "")
                            //    {
                            //        errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            //    }
                            //    else
                            //    {
                            //        errormsg = errormsg + " " + errormsg2 + " ";
                            //    }

                            //}
                        }
                        else
                        {
                            #region
                            errormsg2 = "G2: " + G2 + " ";

                            if (errormsg == "")
                            {
                                errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                            }
                            else
                            {
                                errormsg = errormsg + " " + errormsg2 + " ";
                            }
                            //UpdateSMSrecievedWithError(insertedId, "G1: " + G1 + "not found");
                            //InsertSMSrecievedWithErrorOutbound(mobileNumber, "G1: " + G1 + "not found");
                            //goto Error;
                            #endregion
                        }
                    }
                    else
                    {
                        #region
                        errormsg2 = "G2: " + G2 + " ";

                        if (errormsg == "")
                        {
                            errormsg = "DCR of DC " + DC + " contains errors. " + errormsg2 + " ";
                        }
                        else
                        {
                            errormsg = errormsg + " " + errormsg2 + " ";
                        }
                        #endregion
                    }
                }
                #endregion

                #endregion

                #endregion

                #region Add SMS Detail to Hierarchy

                if (errormsg == "")
                {
                    #region PreSalesCalls


                    //var insertPreSaleCalls = _dataContext.sp_PreSalesCallsInsert(DT, levelId1, levelId2, levelId3, levelId4, levelId5, levelId6,
                    //    classId, specialityId, qualificationId, DateTime.Now, callTypeId, Convert.ToInt32(VT), doctorId, employeeId, insertedId).ToList();
                    _nvCollection.Clear();
                    _nvCollection.Add("@VisitDateTime-datetime", DT.ToString());
                    _nvCollection.Add("@Level1LevelId-INT", levelId1.ToString());
                    _nvCollection.Add("@Level2LevelId-int", levelId2.ToString());
                    _nvCollection.Add("@Level3LevelId-int", levelId3.ToString());
                    _nvCollection.Add("@Level4LevelId-int", levelId4.ToString());
                    _nvCollection.Add("@Level5LevelId-int", levelId5.ToString());
                    _nvCollection.Add("@Level6LevelId-int", levelId6.ToString());
                    _nvCollection.Add("@ClassId-int", classId.ToString());
                    _nvCollection.Add("@SpecialityId-int", specialityId.ToString());
                    _nvCollection.Add("@QulificationId-int", qualificationId.ToString());
                    _nvCollection.Add("@CreationDateTime-datetime", DateTime.Now.ToString());
                    _nvCollection.Add("@CallTypeId-int", callTypeId.ToString());
                    _nvCollection.Add("@VisitShift-int", VT);
                    _nvCollection.Add("@DoctorId-bigint", doctorId.ToString());
                    _nvCollection.Add("@EmployeeId-bigint", employeeId.ToString());
                    _nvCollection.Add("@InboundId-bigint", insertedId.ToString());
                    _nvCollection.Add("@DocCode-INT", DC);

                    DataSet insertPreSaleCalls = dl.GetData("sp_PreSalesCallsInsert2", _nvCollection);

                    if (insertPreSaleCalls.Tables[0].Rows.Count > 0)
                    {
                        preSalesCallsId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["SalesCallId"]);

                        #region Update Visits

                        //var getVisit = _dataContext.sp_MRPlanningSelect(employeeId, doctorId, DT).ToList();

                        //if (getVisit.Count != 0)
                        //{
                        //    var targetCall = Convert.ToInt32(getVisit[0].TargetCall);
                        //    var pendingCall = Convert.ToInt32(getVisit[0].PendingCall);

                        //    int day = Convert.ToInt32(_smsDate.Day);
                        //    var isMatchPlan = _dataContext.sp_DrCallMatctWithPlan(day, employeeId, doctorId).ToList();

                        //    if (isMatchPlan.Count != 0)
                        //    {
                        //        var updateVisit = _dataContext.sp_MRPlanningUpdateActualVisit(employeeId, doctorId, DT).ToList();
                        //    }
                        //    else
                        //    {
                        //        insertTransaction.Rollback();
                        //        goto CallInvalid;
                        //    }
                        //}

                        #endregion

                        #region CallDoctors

                        var insertCallDoctors = _dataContext.sp_CallDoctorsInsert(preSalesCallsId, doctorId).ToList();

                        #endregion

                        #region CallVisitors

                        if (JV != "0 0 0 0")
                            if (JV != "NULL")
                            {
                                var insertCallVisitor = _dataContext.sp_CalVisitorsInsertNew_withjv8(preSalesCallsId, employeeId, JVZSM, JVRSM, JVNSM, JVHO, 0, 0, 0, 0).ToList();
                            }

                        #endregion

                        #region VisitFeedBack

                        var insertFeedBack = _dataContext.sp_VisitFeedBackInsert(preSalesCallsId, "DCR has been done successfully").ToList();

                        #endregion

                        #region CallProducts

                        List<CallProduct> insertCallProduct;

                        if (P1 != "NULL")
                        {
                            if (R1 != "NULL")
                            {
                                insertCallProduct =
                                    _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, Convert.ToInt32(R1), productSKU1Id, 1).ToList();
                            }
                            else
                            {
                                insertCallProduct =
                                    _dataContext.sp_CallProductsInsert(product1Id, preSalesCallsId, 0, productSKU1Id, 1).ToList();
                            }
                        }


                        if (P2 != "NULL")
                        {
                            if (R2 != "NULL")
                            {
                                insertCallProduct =
                                      _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, Convert.ToInt32(R2), productSKU2Id, 2).ToList();
                            }
                            else
                            {
                                insertCallProduct =
                                    _dataContext.sp_CallProductsInsert(product2Id, preSalesCallsId, 0, productSKU2Id, 2).ToList();
                            }
                        }

                        if (P3 != "NULL")
                        {
                            if (R3 != "NULL")
                            {
                                insertCallProduct =
                                    _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, Convert.ToInt32(R3), productSKU3Id, 3).ToList();
                            }
                            else
                            {
                                insertCallProduct =
                                    _dataContext.sp_CallProductsInsert(product3Id, preSalesCallsId, 0, productSKU3Id, 3).ToList();
                            }
                        }

                        if (P4 != "NULL")
                        {
                            insertCallProduct =
                                _dataContext.sp_CallProductsInsert(product4Id, preSalesCallsId, 0, productSKU4Id, 4).ToList();
                        }

                        if (R1 != "NULL")
                        {
                            nv.Clear();
                            nv.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                            nv.Add("@ReminderID-INT", R1.ToString());
                            nv.Add("@ReminderOrder-INT", "1");
                            bool reslt = dl.InserData("insertCallReminders", nv);
                        }
                        if (R2 != "NULL")
                        {
                            nv.Clear();
                            nv.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                            nv.Add("@ReminderID-INT", R2.ToString());
                            nv.Add("@ReminderOrder-INT", "2");
                            bool reslt = dl.InserData("insertCallReminders", nv);
                        }
                        if (R3 != "NULL")
                        {
                            nv.Clear();
                            nv.Add("@SalesCallID-INT", preSalesCallsId.ToString());
                            nv.Add("@ReminderID-INT", R3.ToString());
                            nv.Add("@ReminderOrder-INT", "3");
                            bool reslt = dl.InserData("insertCallReminders", nv);
                        }

                        #endregion

                        #region CallProductSamples

                        List<CallProductSample> insertCallProductSample;
                        //List<MInventory> getInventory;
                        //List<MCInventory> updateInventory;
                        //List<v_Inventory> getInventoryDetail;

                        var year = Convert.ToInt32(DT.Day);
                        var month = Convert.ToInt32(DT.Day);
                        var mrId = Convert.ToInt64(insertPreSaleCalls.Tables[0].Rows[0]["EmployeeId"].ToString());
                        //long remainingQuantity = 0;

                        //getInventory = _dataContext.sp_MInventorySelect(mrId, year, month).ToList();

                        if (S1 != "NULL" && Q1 != "NULL")
                        {
                            insertCallProductSample =
                                _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample1Id, sampleProductSku1Id, Convert.ToInt32(Q1), 1).ToList();

                            #region Update Inventory

                            //if (getInventory.Count != 0)
                            //{
                            //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample1Id, year, month).ToList();

                            //    if (getInventoryDetail.Count != 0)
                            //    {
                            //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                            //        if (remainingQuantity != 0)
                            //        {
                            //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample1Id, long.Parse(Q1), remainingQuantity).ToList();
                            //        }
                            //        else
                            //        {
                            //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample1Id
                            //                + " has been empty in stock. Update your inventory");
                            //        }
                            //    }
                            //    else
                            //    {
                            //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S1 + " unable to match with your list!";
                            //        goto InventoryInvalid;
                            //    }
                            //}
                            //else
                            //{
                            //    goto InventoryEmpty;
                            //}

                            #endregion
                        }


                        if (S2 != "NULL" && Q2 != "NULL")
                        {
                            insertCallProductSample =
                                _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample2Id, sampleProductSku2Id, Convert.ToInt32(Q2), 2).ToList();

                            #region Update Inventory

                            //if (getInventory.Count != 0)
                            //{
                            //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                            //    if (getInventoryDetail.Count != 0)
                            //    {
                            //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                            //        if (remainingQuantity != 0)
                            //        {
                            //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                            //        }
                            //        else
                            //        {
                            //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                            //                + " has been empty in stock. Update your inventory");
                            //        }
                            //    }
                            //    else
                            //    {
                            //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S2 + " unable to match with your list!";
                            //        goto InventoryInvalid;
                            //    }
                            //}
                            //else
                            //{
                            //    goto InventoryEmpty;
                            //}

                            #endregion
                        }

                        if (S3 != "NULL" && Q3 != "NULL")
                        {
                            insertCallProductSample =
                                _dataContext.sp_CallProductSamplesInsert(preSalesCallsId, sample3Id, sampleProductSku3Id, Convert.ToInt32(Q3), 3).ToList();

                            #region Update Inventory

                            //if (getInventory.Count != 0)
                            //{
                            //    getInventoryDetail = _dataContext.sp_MCInventorySelect(mrId, sample2Id, year, month).ToList();

                            //    if (getInventoryDetail.Count != 0)
                            //    {
                            //        remainingQuantity = Convert.ToInt64(getInventoryDetail[0].Remaining);

                            //        if (remainingQuantity != 0)
                            //        {
                            //            updateInventory = _dataContext.sp_InventoryUpdateByMR(month, sample2Id, long.Parse(Q2), remainingQuantity).ToList();
                            //        }
                            //        else
                            //        {
                            //            ErrorLog("EmployeeId: " + employeeId + ", SampleId: " + sample2Id
                            //                + " has been empty in stock. Update your inventory");
                            //        }
                            //    }
                            //    else
                            //    {
                            //        _mgsText = "Dear " + _employeeName + ", Sample Code: " + S3 + " unable to match with your list!";
                            //        goto InventoryInvalid;
                            //    }
                            //}
                            //else
                            //{
                            //    goto InventoryEmpty;
                            //}

                            #endregion
                        }

                        #endregion

                        #region CallGifts

                        List<CallGift> insertCallGift;

                        if (G1 != "NULL")
                        {
                            if (QG1 != "NULL")
                            {
                                insertCallGift =
                                    _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, Convert.ToInt32(QG1), 1).ToList();
                            }
                            else
                            {
                                insertCallGift =
                                    _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift1Id, 0, 1).ToList();
                            }
                        }

                        if (G2 != "NULL")
                        {
                            if (QG2 != "NULL")
                            {
                                insertCallGift =
                                    _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, Convert.ToInt32(QG2), 1).ToList();
                            }
                            else
                            {
                                insertCallGift =
                                    _dataContext.sp_CallGiftsInsert(preSalesCallsId, gift2Id, 0, 1).ToList();
                            }
                        }

                        #endregion
                    }

                    #endregion
                }
                else
                {
                    UpdateSMSrecievedWithError(insertedId, errormsg);
                    InsertSMSrecievedWithErrorOutbound(mobileNumber, errormsg);
                    var updateSMSInbounds =
                        _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", errormsg, DateTime.Now).ToList();
                    //_insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();

                    //var insertSentMessage_error = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, "ERROR " + errormsg.ToString(), DateTime.Now).ToList();

                    //if (insertSentMessage_error.Count > 0)
                    //{
                    //    long smsId = Convert.ToInt64(insertSentMessage_error[0].SmsId);
                    //    string returnRespnse = _sendSMS.SendMessage(mobileNumber, "ERROR " + errormsg.ToString());
                    //    var updateSentMessage_error = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                    //}

                    goto Error;
                }
                #endregion

                insertTransaction.Commit();
                goto Clear;

            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from InsertDCR method is " + exception.Message);
                insertTransaction.Rollback();
                goto Error;
            }

            #region Comments
        //CallInvalid:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Call unable to match with MR Plan schedule", DateTime.Now).ToList();

        //        _mgsText = "Dear " + _employeeName + ", Call of doctor Code: " + _doctorCode + " unable to match with monthly plan!";
        //        _insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();

        //        IsSaved = false;
        //        goto Finish;
        //    }

            #region
        //InventoryEmpty:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Inventory list empty.", DateTime.Now).ToList();

        //        _mgsText = "Dear " + _employeeName + ", Your inventory list is empty";
        //        _insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();

        //        IsSaved = false;
        //        goto Finish;
        //    }
        //InventoryInvalid:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Sample Code doesn't match with your list", DateTime.Now).ToList();

        //        _insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();

        //        IsSaved = false;
        //        goto Finish;
        //    }
            #endregion

        //CodeError:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Doctor Code Invalid", DateTime.Now).ToList();

        //        _mgsText = "Dear " + _employeeName + ", Doctor Code: " + _doctorCode + " Invalid!";
        //        _insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();

        //        IsSaved = false;
        //        goto Finish;
        //    }
            #endregion
            #region

        Error:
            {
                insertTransaction.Commit();
                IsSaved = false;
                goto Finish;


            }

        Clear:
            {
                var updateSMSInbounds =
                        _dataContext.sp_SMSInboundUpdate(insertedId, "SUCCESS", "DCR has been saved successfully", DateTime.Now).ToList();
                IsSaved = true;
                _receivedSms = 1;
                goto Finish;
            }

        Finish:
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return IsSaved;
            #endregion
        }

        private bool InsertBmd(long insertedId, string mobileNumber, string messageText)
        {
            bool IsSaved = false;
            DataSet dataSet = new DataSet();
            DbTransaction insertTransaction = null;
            string MR = "", DC = "", errormsg3 = ""; long newemployeeId = 0;
            try
            {
                if (_dataContext.Connection.State == System.Data.ConnectionState.Closed)
                {
                    _dataContext.Connection.Open();
                }

                insertTransaction = _dataContext.Connection.BeginTransaction();
                _dataContext.Transaction = insertTransaction;

                #region Initialize Variables

                DateTime DT = DateTime.Now;
                string TT = "", OSP = "", OST = "", N = "", RX = "", RXP1 = "", RXP2 = "", RXP3 = "", JV = "", VT = "", errormsg = "",
                    errormsg2 = "";
                long employeeId = 0, systemUserID = 0, mrId = 0, doctorId = 0;
                int? levelId1 = null, levelId2 = null, levelId3 = null, levelId4 = null, levelId5 = null, levelId6 = null, callTypeId = 0;

                #endregion

                #region DT

                DT = _smsDate;

                #endregion

                #region MR

                if (messageText != "" && messageText.Contains(" MR:"))
                {
                    var index = messageText.IndexOf(" MR:");

                    if (index > -1)
                    {
                        MR = messageText.Substring(index + 4, (messageText.IndexOf("DC:") - 1) - (index + 4)).Trim();

                        if (MR.Trim() == "")
                        {
                            errormsg = "BMD of MR contains errors." + MR;
                            // goto Error;
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("MR:"))
                {
                    var index = messageText.IndexOf("MR:");

                    if (index > -1)
                    {
                        MR = messageText.Substring(index + 3, (messageText.IndexOf("DC:") - 1) - (index + 3)).Trim();

                        if (MR.Trim() == "")
                        {
                            errormsg = "BMD of MR contains errors." + MR;
                            // goto Error;
                        }
                    }
                }
                else
                {
                    errormsg3 = " MR ";
                    goto Error;
                }


                #endregion

                #region DC

                if (messageText != "" && messageText.Contains(" DC:"))
                {
                    var index = messageText.IndexOf(" DC:");

                    if (index > -1)
                    {
                        DC = messageText.Substring(index + 4, (messageText.IndexOf("TT:") - 1) - (index + 4)).Trim();

                        if (DC.Trim() == "")
                        {
                            errormsg2 = "DC " + DC;
                            //DC = "NULL";
                            //goto Error;
                        }

                    }
                }
                else if (messageText != "" && messageText.Contains("DC:"))
                {
                    var index = messageText.IndexOf("DC:");

                    if (index > -1)
                    {
                        DC = messageText.Substring(index + 3, (messageText.IndexOf("TT:") - 1) - (index + 3)).Trim();

                        if (DC.Trim() == "")
                        {
                            errormsg2 = "DC " + DC;
                            //DC = "NULL";
                            //goto Error;
                        }
                    }
                }
                else
                {
                    errormsg3 = " DC ";
                    goto Error;
                }


                #endregion

                #region TT

                if (messageText != "" && messageText.Contains(" TT:"))
                {
                    var index = messageText.IndexOf(" TT:");

                    if (index > -1)
                    {
                        TT = messageText.Substring(index + 4, (messageText.IndexOf("OSP:") - 1) - (index + 4)).Trim();

                        if (TT.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " TT " + TT + " Can not be blank";
                            //TT = "NULL";
                            // goto Error;
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(TT))
                            {
                                errormsg2 = errormsg2 + " TT " + TT + " Should be numeric";
                            }

                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("TT:"))
                {
                    var index = messageText.IndexOf("TT:");

                    if (index > -1)
                    {
                        TT = messageText.Substring(index + 3, (messageText.IndexOf("OSP:") - 1) - (index + 3)).Trim();

                        if (TT.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " TT " + TT + " Can not be blank";
                            //TT = "NULL";
                            //goto Error;
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(TT))
                            {
                                errormsg2 = errormsg2 + " TT " + TT + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " TT ";
                    goto Error;
                }

                #endregion

                #region OSP

                if (messageText != "" && messageText.Contains(" OSP:"))
                {
                    var index = messageText.IndexOf(" OSP:");

                    if (index > -1)
                    {
                        OSP = messageText.Substring(index + 5, (messageText.IndexOf("OST:") - 1) - (index + 5)).Trim();

                        if (OSP.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " OSP " + OSP + " Can not be blank";
                            //OSP = "NULL";
                            //goto Error;
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(TT))
                            {
                                errormsg2 = errormsg2 + " OSP " + OSP + " Should be numeric";
                            }
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("OSP:"))
                {
                    var index = messageText.IndexOf("OSP:");

                    if (index > -1)
                    {
                        OSP = messageText.Substring(index + 4, (messageText.IndexOf("OST:") - 1) - (index + 4)).Trim();

                        if (OSP.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " OSP " + OSP + " Can not be blank";
                            //OSP = "NULL";
                            //goto Error;
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(TT))
                            {
                                errormsg2 = errormsg2 + " OSP " + OSP + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " OSP ";
                    goto Error;
                }

                #endregion

                #region OST

                if (messageText != "" && messageText.Contains(" OST:"))
                {
                    var index = messageText.IndexOf(" OST:");

                    if (index > -1)
                    {
                        OST = messageText.Substring(index + 5, (messageText.IndexOf("N:") - 1) - (index + 5)).Trim();

                        if (OST.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " OST " + OST + " Can not be blank";
                            //goto Error;
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(OST))
                            {
                                errormsg2 = errormsg2 + " OST " + OST + " Should be numeric";
                            }
                        }
                    }

                }
                else if (messageText != "" && messageText.Contains("OST:"))
                {
                    var index = messageText.IndexOf("OST:");

                    if (index > -1)
                    {
                        OST = messageText.Substring(index + 4, (messageText.IndexOf("N:") - 1) - (index + 4)).Trim();

                        if (OST.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " OST " + OST + " Can not be blank";
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(OST))
                            {
                                errormsg2 = errormsg2 + " OST " + OST + " Should be numeric";
                            }
                        }
                    }

                }
                else
                {
                    errormsg3 = " OST ";
                    goto Error;
                }

                #endregion

                #region N

                if (messageText != "" && messageText.Contains(" N:"))
                {
                    var index = messageText.IndexOf(" N:");

                    if (index > -1)
                    {
                        N = messageText.Substring(index + 3, (messageText.IndexOf("RX:") - 1) - (index + 3)).Trim();

                        if (N.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " N " + N + " Can not be blank";
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(N))
                            {
                                errormsg2 = errormsg2 + " N " + N + " Should be numeric";
                            }
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("N:"))
                {
                    var index = messageText.IndexOf("N:");

                    if (index > -1)
                    {
                        N = messageText.Substring(index + 2, (messageText.IndexOf("RX:") - 1) - (index + 2)).Trim();

                        if (N.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " N " + N + " Can not be blank";
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(N))
                            {
                                errormsg2 = errormsg2 + " N " + N + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " N ";
                    goto Error;
                }

                #endregion

                #region RX

                if (messageText != "" && messageText.Contains(" RX:"))
                {
                    var index = messageText.IndexOf(" RX:");

                    if (index > -1)
                    {
                        RX = messageText.Substring(index + 4, (messageText.IndexOf("RXP1:") - 1) - (index + 4)).Trim();

                        if (RX.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " RX " + RX + " Can not be blank";
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(RX))
                            {
                                errormsg2 = errormsg2 + " RX " + RX + " Should be numeric";
                            }
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("RX:"))
                {
                    var index = messageText.IndexOf("RX:");

                    if (index > -1)
                    {
                        RX = messageText.Substring(index + 3, (messageText.IndexOf("RXP1:") - 1) - (index + 3)).Trim();

                        if (RX.Trim() == "")
                        {
                            errormsg2 = errormsg2 + " RX " + RX + " Can not be blank";
                        }
                        else
                        {
                            if (!TemplateValidator.IsNumeric(RX))
                            {
                                errormsg2 = errormsg2 + " RX " + RX + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " Rx ";
                    goto Error;
                }

                #endregion

                #region RXP1

                if (messageText != "" && messageText.Contains(" RXP1:"))
                {
                    var index = messageText.IndexOf(" RXP1:");

                    if (index > -1)
                    {
                        RXP1 = messageText.Substring(index + 6, (messageText.IndexOf("RXP2:") - 1) - (index + 6)).Trim();

                        if (RXP1.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP1))
                            {
                                errormsg2 = errormsg2 + " RXP1 " + RXP1 + " Should be numeric";
                            }
                        }

                    }
                }
                else if (messageText != "" && messageText.Contains("RXP1:"))
                {
                    var index = messageText.IndexOf("RXP1:");

                    if (index > -1)
                    {
                        RXP1 = messageText.Substring(index + 5, (messageText.IndexOf("RXP2:") - 1) - (index + 5)).Trim();

                        if (RXP1.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP1))
                            {
                                errormsg2 = errormsg2 + " RXP1 " + RXP1 + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " RxP1 ";
                    goto Error;
                }

                #endregion

                #region RXP2

                if (messageText != "" && messageText.Contains(" RXP2:"))
                {
                    var index = messageText.IndexOf(" RXP2:");

                    if (index > -1)
                    {
                        RXP2 = messageText.Substring(index + 6, (messageText.IndexOf("RXP3:") - 1) - (index + 6)).Trim();

                        if (RXP2.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP2))
                            {
                                errormsg2 = errormsg2 + " RXP2 " + RXP2 + " Should be numeric";
                            }
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("RXP2:"))
                {
                    var index = messageText.IndexOf("RXP2:");

                    if (index > -1)
                    {
                        RXP2 = messageText.Substring(index + 5, (messageText.IndexOf("RXP3:") - 1) - (index + 5)).Trim();

                        if (RXP2.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP2))
                            {
                                errormsg2 = errormsg2 + " RXP2 " + RXP2 + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " RxP2 ";
                    goto Error;
                }

                #endregion

                #region RXP3

                if (messageText != "" && messageText.Contains(" RXP3:"))
                {
                    var index = messageText.IndexOf(" RXP3:");

                    if (index > -1)
                    {
                        RXP3 = messageText.Substring(index + 6, (messageText.IndexOf("JV:") - 1) - (index + 6)).Trim();

                        if (RXP3.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP3))
                            {
                                errormsg2 = errormsg2 + " RXP3 " + RXP3 + " Should be numeric";
                            }
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("RXP3:"))
                {
                    var index = messageText.IndexOf("RXP3:");

                    if (index > -1)
                    {
                        RXP3 = messageText.Substring(index + 5, (messageText.IndexOf("JV:") - 1) - (index + 5)).Trim();

                        if (RXP3.Trim() != "")
                        {
                            if (!TemplateValidator.IsNumeric(RXP3))
                            {
                                errormsg2 = errormsg2 + " RXP3 " + RXP3 + " Should be numeric";
                            }
                        }
                    }
                }
                else
                {
                    errormsg3 = " RxP3 ";
                    goto Error;
                }

                #endregion

                #region JV

                if (messageText != "" && messageText.Contains(" JV:"))
                {
                    var index = messageText.IndexOf(" JV:");

                    if (index > -1)
                    {
                        JV = messageText.Substring(index + 4, (messageText.IndexOf("VT:") - 1) - (index + 4)).Trim();

                        if (JV.Trim() == "0" || JV.Trim() == "")
                        {
                            JV = "NULL";
                            //  goto Error;
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("JV:"))
                {
                    var index = messageText.IndexOf("JV:");

                    if (index > -1)
                    {
                        JV = messageText.Substring(index + 3, (messageText.IndexOf("VT:") - 1) - (index + 3)).Trim();

                        if (JV.Trim() == "0" || JV.Trim() == "")
                        {
                            JV = "NULL";
                            //  goto Error;
                        }
                    }
                }
                else
                {
                    errormsg3 = " JV ";
                    goto Error;
                }

                #endregion

                #region VT

                if (messageText != "" && messageText.Contains(" VT:"))
                {
                    var index = messageText.IndexOf(" VT:");

                    if (index > -1)
                    {
                        VT = messageText.Substring(index + 3, (messageText.Length) - (index + 3)).Trim();

                        if (VT.Trim() != string.Empty)
                        {
                            if (VT == "M" || VT == "m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == "E" || VT == "e")
                            {
                                VT = Convert.ToString(2);
                            }

                            if (VT == ":M" || VT == ":m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == ":E" || VT == ":e")
                            {
                                VT = Convert.ToString(2);
                            }

                        }

                        if (VT.Trim() == string.Empty)
                        {
                            VT = Convert.ToString(0);
                            // goto Error;
                        }
                    }
                }
                else if (messageText != "" && messageText.Contains("VT:"))
                {
                    var index = messageText.IndexOf("VT:");

                    if (index > -1)
                    {
                        VT = messageText.Substring(index + 3, (messageText.Length) - (index + 3)).Trim();

                        if (VT.Trim() != string.Empty)
                        {
                            if (VT == "M" || VT == "m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == "E" || VT == "e")
                            {
                                VT = Convert.ToString(2);
                            }


                            if (VT == ":M" || VT == ":m")
                            {
                                VT = Convert.ToString(1);
                            }
                            else if (VT == ":E" || VT == ":e")
                            {
                                VT = Convert.ToString(2);
                            }
                        }

                        if (VT.Trim() == string.Empty)
                        {
                            VT = Convert.ToString(0);
                            // goto Error;
                        }
                    }
                }
                else
                {
                    errormsg3 = " VT ";
                    goto Error;
                }

                #endregion

                if (errormsg != "")
                {
                    errormsg = errormsg2;
                }
                else
                {
                    if (errormsg2 != "")
                    {
                        errormsg = "BMD of MR " + MR + " Contains errors.  " + errormsg2;
                    }
                }

                if (errormsg == "")
                {

                    #region Get Employee Complete Hierarchy Detail

                    var validateEmployee = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();

                    if (validateEmployee.Count != 0)
                    {
                        employeeId = Convert.ToInt64(validateEmployee[0].EmployeeId);
                        var getEmployeeMembership = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

                        if (getEmployeeMembership.Count != 0)
                        {
                            systemUserID = Convert.ToInt64(getEmployeeMembership[0].SystemUserID);
                            var getEmployeeHierarchy = _dataContext.sp_EmplyeeHierarchySelect(systemUserID).ToList();

                            if (getEmployeeHierarchy.Count != 0)
                            {
                                levelId1 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
                                levelId2 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
                                levelId3 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
                                levelId4 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
                                levelId5 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
                                levelId6 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);

                                if (levelId1 == -1) { levelId1 = null; }
                                if (levelId2 == -1) { levelId2 = null; }
                                if (levelId3 == -1) { levelId3 = null; }
                                if (levelId4 == -1) { levelId4 = null; }
                                if (levelId5 == -1) { levelId5 = null; }
                                if (levelId6 == -1) { levelId6 = null; }


                            }
                            else
                            {
                                goto MRAbsent;
                            }
                        }
                        else
                        {
                            goto MRAbsent;
                        }
                    }

                    #endregion

                    #region Get MR Detail

                    var validateMR = _dataContext.sp_EmployeeSelectByCredential(null, null).ToList();

                    if (validateMR.Count != 0)
                    {
                        bool isMRActive = true;
                        isMRActive = Convert.ToBoolean(validateMR[0].IsActive);

                        if (isMRActive)
                        {
                            mrId = Convert.ToInt64(validateMR[0].EmployeeId);
                        }
                        else
                        {
                            goto MRAbsent;
                        }
                    }
                    else
                    {
                        goto CodeError;
                    }

                    #endregion

                    #region Get MIO Details
                    var validateMIO = _dataContext.sp_EmployeesSelectByCode(MR).ToList();

                    if (validateMIO.Count == 0)
                    {
                        goto MIOAbsent;
                    }
                    else
                    {
                        newemployeeId = Convert.ToInt64(validateMIO[0].EmployeeId);
                    }


                    #endregion

                    #region Get Doctor Detail

                    var validateDoctor = _dataContext.sp_MRDoctorSelectByCode(newemployeeId, DC).ToList();

                    if (validateDoctor.Count != 0)
                    {
                        doctorId = Convert.ToInt64(validateDoctor[0].DoctorId);
                    }
                    else
                    {
                        goto CodeError;
                    }

                    #endregion

                    #region Get Call Type

                    var getCallType = _dataContext.sp_CallTypesSelectByName(_smsKeyWord).ToList();

                    if (getCallType.Count != 0)
                    {
                        callTypeId = Convert.ToInt32(getCallType[0].CallTypeId);
                    }
                    else
                    {
                        callTypeId = 2;
                        // goto Error;
                    }

                    #endregion

                    #region Add SMS to BMD

                    #region SAVE WORK

                    //var test = Convert.ToInt32(OSP) + Convert.ToInt32(OST) + Convert.ToInt32(N);

                    //if (test <= Convert.ToInt32(TT))
                    //{

                    //}
                    //else
                    //{
                    //    goto TestVariation;
                    //}

                    #region Update Visit



                    #endregion

                    #region BMD

                    int? TT1 = null, OSP1 = null, OST1 = null, N1 = null, RX1 = null, RXP11 = null, RXP21 = null, RXP31 = null, VT1 = null;


                    if (TT != null || TT != "" || TT != string.Empty) { TT1 = Convert.ToInt32(TT); }
                    if (OSP != "") { OSP1 = Convert.ToInt32(OSP); }
                    if (OST != "") { OST1 = Convert.ToInt32(OST); }
                    if (N != "") { N1 = Convert.ToInt32(N); }
                    if (RX != "") { RX1 = Convert.ToInt32(RX); }
                    if (RXP1 != "") { RXP11 = Convert.ToInt32(RXP1); }
                    if (RXP2 != "") { RXP21 = Convert.ToInt32(RXP2); }
                    if (RXP3.Trim() != "") { RXP31 = Convert.ToInt32(RXP3); }
                    if (VT != "") { VT1 = Convert.ToInt32(VT); }

                    try
                    {
                        var insertBMD = _dataContext.sp_BMDInsert(DT, insertedId, DateTime.Now, levelId1, levelId2, levelId3, levelId4, levelId5, levelId6, employeeId, callTypeId,
                            mrId, doctorId, TT1, OSP1, OST1, N1, RX1, RXP11, RXP21, RXP31, JV, VT1).ToList();
                    }
                    catch (Exception)
                    { }

                    #endregion

                    #endregion

                    #endregion
                }
                else
                {
                    UpdateSMSrecievedWithError(insertedId, errormsg);
                    InsertSMSrecievedWithErrorOutbound(mobileNumber, errormsg);
                    var updateSMSInbound = _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", errormsg, DateTime.Now).ToList();

                    //var insertSentMessage_error = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, "ERROR " + errormsg.ToString(), DateTime.Now).ToList();
                    //if (insertSentMessage_error.Count > 0)
                    //{
                    //    long smsId = Convert.ToInt64(insertSentMessage_error[0].SmsId);
                    //    string returnRespnse = _sendSMS.SendMessage(mobileNumber, "ERROR " + errormsg.ToString());
                    //    var updateSentMessage_error = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                    //}

                    IsSaved = false;
                    goto Finish;
                }

                goto Clear;
            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from InsertBMD method is " + exception.Message);
                goto Error;
            }
        TestVariation:
            {
                var updateSMSInbound =
                    _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "TT less than receiving test", DateTime.Now).ToList();
                IsSaved = false;
                goto Finish;
            }

            #region
        //CallInvalid:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Call unable to match with MR Plan schedule", DateTime.Now).ToList();
        //        IsSaved = false;
        //        goto Finish;
        //    }
        //VisitExceed:
        //    {
        //        var updateSMSInbound =
        //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "DR visits exceed", DateTime.Now).ToList();
        //        IsSaved = false;
        //        goto Finish;
        //    }
            #endregion

        MRAbsent:
            {
                UpdateSMSrecievedWithError(_insertedId, "BMD coordinator not found. Mobile # : " + mobileNumber);
                InsertSMSrecievedWithErrorOutbound(mobileNumber, "BMD coordinator not found. Mobile # : " + mobileNumber);
                var updateSMSInbound =
                    _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "BMD coordinator not found. Mobile # : " + mobileNumber, DateTime.Now).ToList();
                IsSaved = false;
                goto Finish;
            }
        MIOAbsent:
            {
                UpdateSMSrecievedWithError(_insertedId, "BMD contains errors. MR: " + MR + " Not found.");
                InsertSMSrecievedWithErrorOutbound(mobileNumber, "BMD contains errors. MR: " + MR + " Not found.");
                var updateSMSInbound =
                    _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "BMD contains errors. MR: " + MR + " Not found.", DateTime.Now).ToList();
                IsSaved = false;
                goto Finish;
            }
        CodeError:
            {
                UpdateSMSrecievedWithError(_insertedId, "BMD contains errors. DC: " + DC + " Not found.");
                InsertSMSrecievedWithErrorOutbound(mobileNumber, "BMD contains errors. DC: " + DC + " Not found.");

                var updateSMSInbound =
                    _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "BMD contains errors. DC: " + DC + " Not found.", DateTime.Now).ToList();
                IsSaved = false;
                goto Finish;
            }
        Error:
            {
                UpdateSMSrecievedWithError(_insertedId, "Your last sms is not recognized by the system,Please check your sms template");
                InsertSMSrecievedWithErrorOutbound(mobileNumber, "Your last sms is not recognized by the system,Please check your sms template");

                var updateSMSInbound = _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Your last BMD sms is not recognized by the system, Keyword : " + errormsg3 + " missing,  Please check your sms template.", DateTime.Now).ToList();


                //var insertSentMessage_error = _dataContext.sp_SmsSentInsert("mycrm", mobileNumber, "Your last BMD sms is not recognized by the system, Keyword :  " + errormsg3.ToString() + " missing,  Please check your sms template.", DateTime.Now).ToList();

                //if (insertSentMessage_error.Count > 0)
                //{
                //    long smsId = Convert.ToInt64(insertSentMessage_error[0].SmsId);
                //    string returnRespnse = _sendSMS.SendMessage(mobileNumber, "Your last BMD sms is not recognized by the system, Keyword :  " + errormsg3.ToString() + " missing,  Please check your sms template.");
                //    var updateSentMessage_error = _dataContext.sp_SmsSentUpdate(smsId, returnRespnse).ToList();
                //}





                IsSaved = false;
                goto Finish;
            }
        Clear:
            {
                var updateSMSInbounds =
                        _dataContext.sp_SMSInboundUpdate(insertedId, "SUCCESS", "BMD has been saved successfully", DateTime.Now).ToList();
                IsSaved = true;
                _receivedSms = 1;
                goto Finish;
            }
        Finish:
            {
                insertTransaction.Commit();
                if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
                {
                    _dataContext.Connection.Close();
                }
            }

            return IsSaved;
        }

        private bool InsertMerc(long insertedId, string mobileNumber, string messageText)
        {
            bool IsSaved = false;
            //    DataSet dataSet = new DataSet();
            //    DbTransaction insertTransaction = null;

            //    try
            //    {
            //        if (_dataContext.Connection.State == System.Data.ConnectionState.Closed)
            //        {
            //            _dataContext.Connection.Open();
            //        }

            //        insertTransaction = _dataContext.Connection.BeginTransaction();
            //        _dataContext.Transaction = insertTransaction;

            //        #region Initialize Variables

            //        DateTime DT = DateTime.Now;
            //        string SC = "", P1 = "", P2 = "", P3 = "", P4 = "", P5 = "", P6 = "", JV = "", VT = "";
            //        long employeeId = 0, systemUserID = 0, shopId = 0;
            //        int levelId1 = 0, levelId2 = 0, levelId3 = 0, levelId4 = 0, levelId5 = 0, levelId6 = 0, callTypeId = 0;

            //        #endregion

            //        #region DT

            //        DT = _smsDate;

            //        #endregion

            //        #region SC

            //        if (messageText != "" && messageText.Contains(" SC:"))
            //        {
            //            var index = messageText.IndexOf(" SC:");

            //            if (index > -1)
            //            {
            //                SC = messageText.Substring(index + 4, (messageText.IndexOf("P1:") - 1) - (index + 4)).Trim();

            //                if (SC.Trim() == "")
            //                {
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P1

            //        if (messageText != "" && messageText.Contains(" P1:"))
            //        {
            //            var index = messageText.IndexOf(" P1:");

            //            if (index > -1)
            //            {
            //                P1 = messageText.Substring(index + 4, (messageText.IndexOf("P2:") - 1) - (index + 4)).Trim();

            //                if (P1.Trim() == "")
            //                {
            //                    P1 = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P2

            //        if (messageText != "" && messageText.Contains(" P2:"))
            //        {
            //            var index = messageText.IndexOf(" P2:");

            //            if (index > -1)
            //            {
            //                P2 = messageText.Substring(index + 4, (messageText.IndexOf("P3:") - 1) - (index + 4)).Trim();

            //                if (P2.Trim() == "")
            //                {
            //                    P2 = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P3

            //        if (messageText != "" && messageText.Contains(" P3:"))
            //        {
            //            var index = messageText.IndexOf(" P3:");

            //            if (index > -1)
            //            {
            //                P3 = messageText.Substring(index + 4, (messageText.IndexOf("P4:") - 1) - (index + 4)).Trim();

            //                if (P3.Trim() == "")
            //                {
            //                    P3 = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P4

            //        if (messageText != "" && messageText.Contains(" P4:"))
            //        {
            //            var index = messageText.IndexOf(" P4:");

            //            if (index > -1)
            //            {
            //                P4 = messageText.Substring(index + 4, (messageText.IndexOf("P5:") - 1) - (index + 4)).Trim();

            //                if (P4.Trim() == "")
            //                {
            //                    P4 = "NULL";
            //                    goto Error;
            //                }
            //            }

            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P5

            //        if (messageText != "" && messageText.Contains(" P5:"))
            //        {
            //            var index = messageText.IndexOf(" P5:");

            //            if (index > -1)
            //            {
            //                P5 = messageText.Substring(index + 4, (messageText.IndexOf("P6:") - 1) - (index + 4)).Trim();

            //                if (P5.Trim() == "")
            //                {
            //                    P5 = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region P6

            //        if (messageText != "" && messageText.Contains(" P6:"))
            //        {
            //            var index = messageText.IndexOf(" P6:");

            //            if (index > -1)
            //            {
            //                P6 = messageText.Substring(index + 4, (messageText.IndexOf("JV:") - 1) - (index + 4)).Trim();

            //                if (P6.Trim() == "")
            //                {
            //                    P6 = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region JV

            //        if (messageText != "" && messageText.Contains(" JV:"))
            //        {
            //            var index = messageText.IndexOf(" JV:");

            //            if (index > -1)
            //            {
            //                JV = messageText.Substring(index + 4, (messageText.IndexOf("VT:") - 1) - (index + 4)).Trim();

            //                if (JV.Trim() == "0" || JV.Trim() == "")
            //                {
            //                    JV = "NULL";
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region VT

            //        if (messageText != "" && messageText.Contains("VT:"))
            //        {
            //            var index = messageText.IndexOf("VT:");

            //            if (index > -1)
            //            {
            //                VT = messageText.Substring(index + 3, (messageText.Length) - (index + 3)).Trim();

            //                if (VT.Trim() != string.Empty)
            //                {
            //                    if (VT == "M" || VT == "m")
            //                    {
            //                        VT = Convert.ToString(1);
            //                    }
            //                    else if (VT == "E" || VT == "e")
            //                    {
            //                        VT = Convert.ToString(2);
            //                    }
            //                }

            //                if (VT.Trim() == string.Empty)
            //                {
            //                    VT = Convert.ToString(0);
            //                    goto Error;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region Get Employee Complete Hierarchy Detail

            //        var validateEmployee = _dataContext.sp_EmployeeSelectByCredential(null, mobileNumber).ToList();

            //        if (validateEmployee.Count != 0)
            //        {
            //            employeeId = Convert.ToInt64(validateEmployee[0].EmployeeId);
            //            var getEmployeeMembership = _dataContext.sp_EmployeeMembershipSelectByEmployee(employeeId).ToList();

            //            if (getEmployeeMembership.Count != 0)
            //            {
            //                systemUserID = Convert.ToInt64(getEmployeeMembership[0].SystemUserID);
            //                var getEmployeeHierarchy = _dataContext.sp_EmplyeeHierarchySelect(systemUserID).ToList();

            //                if (getEmployeeHierarchy.Count != 0)
            //                {
            //                    levelId1 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId1);
            //                    levelId2 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId2);
            //                    levelId3 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId3);
            //                    levelId4 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId4);
            //                    levelId5 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId5);
            //                    levelId6 = Convert.ToInt32(getEmployeeHierarchy[0].LevelId6);
            //                }
            //                else
            //                {
            //                    goto Error;
            //                }
            //            }
            //            else
            //            {
            //                goto Error;
            //            }
            //        }

            //        #endregion

            //        #region Get Shop Detail

            //        var validateShop = _dataContext.sp_ShopSelectByCode(SC).ToList();

            //        if (validateShop.Count != 0)
            //        {
            //            bool isShopActive = true;
            //            isShopActive = Convert.ToBoolean(validateShop[0].IsActive);

            //            if (isShopActive)
            //            {
            //                shopId = Convert.ToInt64(validateShop[0].ShopId);
            //            }
            //            else
            //            {
            //                goto ShopInActive;
            //            }
            //        }
            //        else
            //        {
            //            goto CodeError;
            //        }

            //        #endregion

            //        #region Get Call Type

            //        var getCallType = _dataContext.sp_CallTypesSelectByName(_smsKeyWord).ToList();

            //        if (getCallType.Count != 0)
            //        {
            //            callTypeId = Convert.ToInt32(getCallType[0].CallTypeId);
            //        }
            //        else
            //        {
            //            goto Error;
            //        }

            //        #endregion

            //        #region Add SMS to MERC

            //        #region Update Visit



            //        #endregion

            //        #region MERC

            //        var insertMERC = _dataContext.sp_MERCInsert(DT, DateTime.Now, levelId1, levelId2, levelId3, levelId4, levelId5, levelId6, employeeId, callTypeId,
            //            shopId, Convert.ToInt32(P1), Convert.ToInt32(P2), Convert.ToInt32(P3), Convert.ToInt32(P4), Convert.ToInt32(P5), Convert.ToInt32(P6),
            //            JV, Convert.ToInt32(VT)).ToList();

            //        #endregion

            //        #endregion

            //        insertTransaction.Commit();
            //        goto Clear;
            //    }
            //    catch (Exception exception)
            //    {
            //        ErrorLog("Exception occur from InsertMERC method is " + exception.Message);
            //        goto Error;
            //    }
            ////CallInvalid:
            ////    {
            ////        var updateSMSInbound =
            ////            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Call unable to match with MR Plan schedule", DateTime.Now).ToList();
            ////        IsSaved = false;
            ////        goto Finish;
            ////    }
            ////VisitExceed:
            ////    {
            ////        var updateSMSInbound =
            ////            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Shop visits exceed", DateTime.Now).ToList();
            ////        IsSaved = false;
            ////        goto Finish;
            ////    }
            //ShopInActive:
            //    {
            //        var updateSMSInbound =
            //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Shop is inactive", DateTime.Now).ToList();
            //        IsSaved = false;
            //        goto Finish;
            //    }
            //CodeError:
            //    {
            //        var updateSMSInbound =
            //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "Shop Code Invalid", DateTime.Now).ToList();
            //        IsSaved = false;
            //        goto Finish;
            //    }
            //Error:
            //    {
            //        var updateSMSInbound =
            //            _dataContext.sp_SMSInboundUpdate(insertedId, "ERROR", "SMS Text validation failed", DateTime.Now).ToList();
            //        IsSaved = false;
            //        goto Finish;
            //    }
            //Clear:
            //    {
            //        var updateSMSInbounds =
            //                _dataContext.sp_SMSInboundUpdate(insertedId, "SUCCESS", "DCR has been sent successfully", DateTime.Now).ToList();
            //        IsSaved = true;
            //        _receivedSms = 1;
            //        goto Finish;
            //    }
            //Finish:
            //    {
            //        if (_dataContext.Connection.State == System.Data.ConnectionState.Open)
            //        {
            //            _dataContext.Connection.Close();
            //        }
            //    }

            return IsSaved;
        }

        private void UpdateSMSrecievedWithError(long smsID, string msg)
        {
            var updateSMSInbound = _dataContext.sp_SMSInboundUpdate(smsID, "ERROR", msg, DateTime.Now).ToList();
        }

        private void InsertSMSrecievedWithErrorOutbound(string mobileNumber, string _mgsText)
        {
            var _insertSms = _dataContext.sp_SMSOutboundInsert(mobileNumber, _mgsText, true, DateTime.Now).ToList();
        }

        private void UnProcessSMS()
        {
            try
            {
                SMSInbound deleteInbound;
                SMSReceived deleteReceived;
                SMSReceived updateReceived;
                List<SMSReceived> getReceivedList;

                var unprocessSms
                    = (from sms in _dataContext.SMSInbounds where sms.MessageType == null && sms.Remarks == null select sms).ToList();

                if (unprocessSms.Count > 0)
                {
                    foreach (var unprocess in unprocessSms)
                    {
                        #region Get SMS Receive List

                        getReceivedList
                            = (from receive in _dataContext.SMSReceiveds
                               where receive.MobileNumber == unprocess.MobileNumber && receive.MessageText == unprocess.MessageText
                               select receive).ToList();

                        #endregion

                        if (getReceivedList.Count > 0)
                        {
                            #region First Delete From SMS Inbound

                            deleteInbound
                                = (from inbound in _dataContext.SMSInbounds
                                   where inbound.MobileNumber == unprocess.MobileNumber && inbound.MessageText == unprocess.MessageText &&
                                        inbound.MessageType == null && inbound.Remarks == null
                                   select inbound).FirstOrDefault();

                            if (deleteInbound != null)
                            {
                                _dataContext.SMSInbounds.DeleteOnSubmit(deleteInbound);
                            }

                            _dataContext.SubmitChanges();

                            #endregion

                            #region Delete All Except One

                            if (getReceivedList.Count > 1)
                            {
                                int counter = getReceivedList.Count;

                                foreach (var deleteOne in getReceivedList)
                                {
                                    if (counter == 1)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        deleteReceived
                                            = (from deleteReceive in _dataContext.SMSReceiveds
                                               where deleteReceive.MobileNumber == deleteOne.MobileNumber
                                               &&
                                               deleteReceive.MessageText == deleteOne.MessageText
                                               select deleteReceive).FirstOrDefault();

                                        if (deleteReceived != null)
                                        {
                                            _dataContext.SMSReceiveds.DeleteOnSubmit(deleteReceived);
                                            _dataContext.SubmitChanges();
                                        }

                                        counter--;
                                    }
                                }
                            }

                            #endregion

                            #region Update Remaining SMS

                            updateReceived
                                = _dataContext.SMSReceiveds.Single(sms =>
                                        sms.MobileNumber == unprocess.MobileNumber && sms.MessageText == unprocess.MessageText);

                            if (updateReceived != null)
                            {
                                updateReceived.MessageType = "UNREAD";
                            }

                            _dataContext.SubmitChanges();

                            #endregion
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from UnProcessSMS method is " + exception.Message);
            }
        }

        private void UnProcessSms1()
        {
            try
            {
                SMSInbound deleteInbound;
                SMSReceived deleteReceived;
                SMSReceived updateReceived;
                List<SMSReceived> getReceivedList;

                var unprocessSms
                    = (from sms in _dataContext.SMSInbounds
                       where sms.MessageType == "ERROR"
                           && sms.Remarks.Contains("Your last sms is not recognized by the system,Please check your sms template")
                       orderby sms.CreatedDate descending
                       select sms).ToList();

                if (unprocessSms.Count > 0)
                {
                    foreach (var unprocess in unprocessSms)
                    {
                        #region Get SMS Receive List

                        getReceivedList
                            = (from receive in _dataContext.SMSReceiveds
                               where receive.MobileNumber == unprocess.MobileNumber && receive.MessageText == unprocess.MessageText
                               select receive).ToList();

                        #endregion

                        if (getReceivedList.Count > 0)
                        {
                            #region First Delete From SMS Inbound

                            deleteInbound
                                = (from inbound in _dataContext.SMSInbounds
                                   where inbound.MobileNumber == unprocess.MobileNumber && inbound.MessageText == unprocess.MessageText &&
                                        inbound.MessageType == "ERROR"
                                        && inbound.Remarks.Contains("Your last sms is not recognized by the system,Please check your sms template")
                                   select inbound).FirstOrDefault();

                            if (deleteInbound != null)
                            {
                                _dataContext.SMSInbounds.DeleteOnSubmit(deleteInbound);
                            }

                            _dataContext.SubmitChanges();

                            #endregion

                            #region Delete All Except One

                            if (getReceivedList.Count > 1)
                            {
                                int counter = getReceivedList.Count;

                                foreach (var deleteOne in getReceivedList)
                                {
                                    if (counter == 1)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        deleteReceived
                                            = (from deleteReceive in _dataContext.SMSReceiveds
                                               where deleteReceive.MobileNumber == deleteOne.MobileNumber
                                               &&
                                               deleteReceive.MessageText == deleteOne.MessageText
                                               select deleteReceive).FirstOrDefault();

                                        if (deleteReceived != null)
                                        {
                                            _dataContext.SMSReceiveds.DeleteOnSubmit(deleteReceived);
                                            _dataContext.SubmitChanges();
                                        }

                                        counter--;
                                    }
                                }
                            }

                            #endregion

                            #region Update Remaining SMS

                            updateReceived
                                = _dataContext.SMSReceiveds.Single(sms =>
                                        sms.MobileNumber == unprocess.MobileNumber && sms.MessageText == unprocess.MessageText);

                            if (updateReceived != null)
                            {
                                updateReceived.MessageType = "UNREAD";
                            }

                            _dataContext.SubmitChanges();

                            #endregion
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                ErrorLog("Exception occur from UnProcessSms1 method is " + exception.Message);
            }
        }

        private void DeleteDcr()
        {
            try
            {
                #region Initialize

                List<SMSReceived> getDeleteSms;
                List<SMSInbound> getInboundSms;
                List<PreSalesCall> getPreSaleCall;
                List<CallDoctor> getCallDoctor;
                List<CalVisitor> getCallVisitor;
                List<CallProduct> getCallProduct;
                List<CallProductSample> getCallProductSample;
                List<CallGift> getCallGift;
                List<VisitFeedBack> getVisitFeedback;
                SMSInbound updateInboundSms;
                SMSInbound deleteInboundSms;
                int counter = 0;
                long saleCallId = 0;

                #endregion

                #region Get SMS From SMSReceived

                getDeleteSms = (from sms in _dataContext.SMSReceiveds
                                where sms.MessageText.StartsWith("DEL ")
                                orderby sms.CreatedDate descending
                                select sms).ToList();

                #endregion

                #region Extraction & Deletion

                if (getDeleteSms.Count > 0)
                {
                    foreach (var delSms in getDeleteSms)
                    {
                        #region Update MessageType & Remarks From SMSInbound

                        getInboundSms = (from getSms in _dataContext.SMSInbounds
                                         where getSms.MessageText == delSms.MessageText && getSms.MobileNumber == delSms.MobileNumber
                                         select getSms).ToList();

                        if (getInboundSms.Count > 0)
                        {
                            #region Delete All Except One From SMSInbound

                            counter = getInboundSms.Count;

                            foreach (var deleteOne in getInboundSms)
                            {
                                #region Delete PreSaleCall's Record

                                getPreSaleCall = (from psc in _dataContext.PreSalesCalls
                                                  where psc.InboundId == deleteOne.InboundId
                                                  select psc).ToList();

                                if (getPreSaleCall.Count > 0)
                                {
                                    foreach (var psc in getPreSaleCall)
                                    {
                                        saleCallId = Convert.ToInt64(psc.SalesCallId);

                                        #region Get & Delete Call Doctor

                                        getCallDoctor = _dataContext.sp_CallDoctorsSelect(saleCallId).ToList();

                                        if (getCallDoctor.Count > 0)
                                        {
                                            foreach (var cd in getCallDoctor)
                                            {
                                                _dataContext.sp_CallDoctorsDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Get & Delete Call Visitor

                                        getCallVisitor = _dataContext.sp_CalVisitorsSelect(saleCallId).ToList();

                                        if (getCallVisitor.Count > 0)
                                        {
                                            foreach (var cv in getCallVisitor)
                                            {
                                                _dataContext.sp_CalVisitorsDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Get & Delete Call Product

                                        getCallProduct = _dataContext.sp_CallProductsSelect(saleCallId).ToList();

                                        if (getCallProduct.Count > 0)
                                        {
                                            foreach (var cp in getCallProduct)
                                            {
                                                _dataContext.sp_CallProductsDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Get & Delete Call Product Sample

                                        getCallProductSample = _dataContext.sp_CallProductSamplesSelect(saleCallId).ToList();

                                        if (getCallProductSample.Count > 0)
                                        {
                                            foreach (var cps in getCallProductSample)
                                            {
                                                _dataContext.sp_CallProductSamplesDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Get & Delete Call Gift

                                        getCallGift = _dataContext.sp_CallGiftsSelect(saleCallId).ToList();

                                        if (getCallGift.Count > 0)
                                        {
                                            foreach (var cg in getCallGift)
                                            {
                                                _dataContext.sp_CallGiftsDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Get & Delete Visit Feedback

                                        getVisitFeedback = _dataContext.sp_VisitFeedBackSelect(saleCallId).ToList();

                                        if (getVisitFeedback.Count > 0)
                                        {
                                            foreach (var fb in getVisitFeedback)
                                            {
                                                _dataContext.sp_VisitFeedBackDelete(saleCallId);
                                            }
                                        }

                                        #endregion

                                        #region Delete PreSaleCall

                                        _dataContext.sp_PreSalesCallsDelete(saleCallId);

                                        #endregion
                                    }
                                }

                                #endregion

                                #region Counter For SMS InBound

                                if (counter == 1)
                                {
                                    break;
                                }
                                else
                                {
                                    #region Delete SMS Inbound

                                    deleteInboundSms
                                        = (from deleteInbound in _dataContext.SMSInbounds
                                           where deleteInbound.MobileNumber == deleteOne.MobileNumber
                                           &&
                                           deleteInbound.MessageText == deleteOne.MessageText
                                           select deleteInbound).FirstOrDefault();

                                    if (deleteInboundSms != null)
                                    {
                                        _dataContext.SMSInbounds.DeleteOnSubmit(deleteInboundSms);
                                        _dataContext.SubmitChanges();
                                    }

                                    #endregion

                                    counter--;
                                }

                                #endregion
                            }

                            #endregion

                            #region Update MessageType To Delete

                            updateInboundSms
                                = _dataContext.SMSInbounds.Single(sms =>
                                        sms.MobileNumber == delSms.MobileNumber && sms.MessageText == delSms.MessageText);

                            if (updateInboundSms != null)
                            {
                                updateInboundSms.MessageType = "DELETE";
                                updateInboundSms.Remarks = "DCR has been deleted on request!";
                            }

                            _dataContext.SubmitChanges();

                            #endregion
                        }

                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine("Exception is raised from DeleteDcr is " + exception.Message);
            }
        }

        private void SmsDate()
        {
            #region Initialize

            string DT = "";
            long receivedId = 0, inboundId = 0;
            int index = 0;
            DateTime smsDate;

            #endregion

            try
            {
                #region SMS Received

                var getSmsReceived = (from receive in _dataContext.SMSReceiveds
                                      select receive).ToList();

                if (getSmsReceived.Count > 0)
                {
                    foreach (var item in getSmsReceived)
                    {
                        receivedId = Convert.ToInt64(item.ReceivedId);

                        #region DT

                        if (item.MessageText != "" && item.MessageText.Contains(" DT:"))
                        {
                            index = item.MessageText.IndexOf(" DT:");

                            if (index > -1)
                            {
                                DT = item.MessageText.Substring(index + 4, (item.MessageText.IndexOf("DC:") - 1) - (index + 4)).Trim();
                            }
                        }
                        else
                        {
                            if (item.MessageText != "" && item.MessageText.Contains("DT:"))
                            {
                                index = item.MessageText.IndexOf("DT:");

                                if (index > -1)
                                {
                                    DT = item.MessageText.Substring(index + 3, item.MessageText.IndexOf("DC:") - (index + 3)).Trim();
                                }
                            }
                        }

                        smsDate = Convert.ToDateTime(DT);

                        #endregion

                        #region Update Sms

                        var updateSmsReceived = _dataContext.SMSReceiveds.Single(update => update.ReceivedId == receivedId);

                        if (updateSmsReceived != null)
                        {
                            updateSmsReceived.CreatedDate = smsDate;
                        }

                        _dataContext.SubmitChanges();

                        #endregion
                    }
                }

                #endregion

                #region SMS Inbound

                var getSmsInbound = (from receive in _dataContext.SMSInbounds
                                     select receive).ToList();

                if (getSmsReceived.Count > 0)
                {
                    foreach (var item in getSmsInbound)
                    {
                        inboundId = Convert.ToInt64(item.InboundId);

                        #region DT

                        if (item.MessageText != "" && item.MessageText.Contains(" DT:"))
                        {
                            index = item.MessageText.IndexOf(" DT:");

                            if (index > -1)
                            {
                                DT = item.MessageText.Substring(index + 4, (item.MessageText.IndexOf("DC:") - 1) - (index + 4)).Trim();
                            }
                        }
                        else
                        {
                            if (item.MessageText != "" && item.MessageText.Contains("DT:"))
                            {
                                index = item.MessageText.IndexOf("DT:");

                                if (index > -1)
                                {
                                    DT = item.MessageText.Substring(index + 3, item.MessageText.IndexOf("DC:") - (index + 3)).Trim();
                                }
                            }
                        }

                        smsDate = Convert.ToDateTime(DT);

                        #endregion

                        #region Update Sms

                        var updateSmsInbound = _dataContext.SMSInbounds.Single(update => update.InboundId == inboundId);

                        if (updateSmsInbound != null)
                        {
                            updateSmsInbound.CreatedDate = smsDate;
                        }

                        _dataContext.SubmitChanges();

                        #endregion
                    }
                }

                #endregion
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine("Exception is raised from SmsDate is " + exception.Message);
            }
        }

        private int DATEDIFF(string interval, DateTime visitdatetime, DateTime createdDatetime)
        {
            int daysdiff = 0;

            TimeSpan span = createdDatetime.Subtract(visitdatetime);
            daysdiff = span.Days;
            return daysdiff;

        }

        private static void ErrorLog(string error)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings[@"Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings[@"Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + error + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        #endregion
    }
}