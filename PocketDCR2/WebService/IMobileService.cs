using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace PocketDCR2.WebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMobileService" in both code and config file together.
    [ServiceContract]
    public interface IMobileService
    {
        [OperationContract]
        void DoWork();

        #region Comment By Rahim on Behalf of Ahmer
        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData/{fileName}")]
        //string UploadCallsData(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_New/{fileName}")]
        //string UploadCallsData_New(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_Expense/{fileName}")]
        //string UploadCallsData_Expense(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_ExpenseAndMultipleAddress/{fileName}")]
        //string UploadCallsData_ExpenseAndMultipleAddress(string fileName, Stream stream);


        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_ExpenseAndMultipleAddress_IMEI/{fileName}")]
        //string UploadCallsData_ExpenseAndMultipleAddress_IMEI(string fileName, Stream stream);
        #endregion

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsDataLatest/{fileName}")]
        string UploadCallsDataLatest(string fileName, Stream stream);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_New/{fileName}")]
        string UploadCallsData_New(string fileName, Stream stream);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadVoiceRecording/{fileName}/{callId}")]
        string UploadVoiceRecording(string fileName,string callId, Stream stream);

     
        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_DSM/{fileName}")]
        string UploadCallsData_DSM(string fileName, Stream stream);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCallsData_RSM/{fileName}")]
        string UploadCallsData_RSM(string fileName, Stream stream);


        

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadFiles")]
        void Upload(Stream data);

        #region Comment By Rahim on Behalf of Ahmer
        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadProfile")]
        //void UploadProfileImage(Stream data);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadSurveyData/{filename}")]
        //string UploadSurveyData(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadRatingData/{filename}")]
        //string UploadRatingData(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadQuizData/{filename}")]
        //string UploadQuizData(string fileName, Stream stream);

        //[OperationContract]
        //[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadCSRData/{filename}")]
        //string UploadCSRData(string fileName, Stream stream);
        #endregion

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadExpenseCall/{fileName}")]
        string UploadExpenseCall(string fileName, Stream stream);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadExpenseCall_New/{fileName}")]
        string UploadExpenseCall_New(string fileName, Stream stream);



        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/AttendanceReportForHRAPI/{dt1}/{emptype}/{Date}")]
        string AttendanceReportForHRAPI(string dt1, string emptype, string Date);


    }
}
