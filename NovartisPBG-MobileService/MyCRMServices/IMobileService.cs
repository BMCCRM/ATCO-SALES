using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;
using System.IO;

namespace MyCRMServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMobileService" in both code and config file together.
    [ServiceContract]
    public interface IMobileService
    {
        [OperationContract]
        void DoWork();

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "DownloadFileForMIO/{empid}/{mobile}/{date}")]
        System.ServiceModel.Channels.Message DownloadFileForMIO(string empid, string mobile, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "DownloadFileForZSM/{empid}/{mobile}/{date}")]
        System.ServiceModel.Channels.Message DownloadFileForZSM(string empid, string mobile, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "DownloadFileForRSM/{empid}/{mobile}/{date}")]
        System.ServiceModel.Channels.Message DownloadFileForRSM(string empid, string mobile, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "DownloadFileForFLM/{empid}/{date}")]
        System.ServiceModel.Channels.Message DownloadFileForFLM(string empid, string date);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "DownloadFileForCSR/{empid}/{date}")]
        System.ServiceModel.Channels.Message DownloadFileForCSR(string empid, string date);
        

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanOverallData/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanOverallData(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanMonthData/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanMonthData(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getCurrentDate/{empid}")]
        string getCurrentDate(string empid);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getDoctorSalesByProductSkuandMonth/{employeeid}/{doctorid}/{doctorcode}/{productid}/{skuid}/{date}")]
        MyCRMServices.MobileService.ResponseObject getDoctorSalesByProductSkuandMonth(string employeeid, string doctorid, string doctorcode, string productid, string skuid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanData/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanData(string empid, string date);


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadPlan/{fileName}")]
        string UploadPlan(string fileName, Stream stream);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadPlanZSM/{fileName}")]
        string UploadPlanZSM(string fileName, Stream stream);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/UploadPlanRSM/{fileName}")]
        string UploadPlanRSM(string fileName, Stream stream);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanDataZSM/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanDataZSM(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getCurrentDateZSM/{empid}")]
        string getCurrentDateZSM(string empid);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanOverallDataWithDoctorName/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanOverallDataWithDoctorName(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getCurrentDateRSM/{empid}")]
        string getCurrentDateRSM(string empid);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanOverallDataZSM/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanOverallDataZSM(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanOverallDataRSM/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanOverallDataRSM(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPlanDataRSM/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPlanDataRSM(string empid, string date);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "LoadDashboardCP/{empid}/{date}/{date2}")]
        System.ServiceModel.Channels.Message LoadDashboardCP(string empid, string date, string date2);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetDetailVisitRecords/{empid}/{dt1}/{dt2}/{lastRecordID}/{recordsCount}")]
        System.ServiceModel.Channels.Message GetDetailVisitRecords(string empid, string dt1, string dt2, string lastRecordID, string recordsCount);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "LoadExtimatedWorkingDaysdaysInField/{empid}/{datefrom}/{dateto}")]
        System.ServiceModel.Channels.Message LoadExtimatedWorkingDaysdaysInField(string empid, string datefrom,string dateto);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "LoadEstimatedWorkingDaysOfYear/{empid}")]
        System.ServiceModel.Channels.Message LoadEstimatedWorkingDaysOfYear(string empid);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetDistributorData/{empid}")]
        System.ServiceModel.Channels.Message GetDistributorData(string empid);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetBricksData/{distid}")]
        System.ServiceModel.Channels.Message GetBricksData(string distid);



        //---------------------------------------------- Create By Faraz to get pharmcy by brick Id ------------------------------------------------- 

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetpharmcyData/{bricks}")]
        System.ServiceModel.Channels.Message GetpharmcyData(string bricks);

       // --------------------------------- INC n EST -------------------------------------- 
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetINC_ESTData/{Type}")]
        System.ServiceModel.Channels.Message GetINC_ESTData(string Type);

        //----------------------------------------------- End -----------------------------------------------------------------------------------------


        //[OperationContract]
        //[WebInvoke(Method = "Post", ResponseFormat = WebMessageFormat.Json, UriTemplate = "InsertEmployeeBrickRelation/{EmployeeID}/{DistributorID}/{BrickIds}")]
        //string InsertEmployeeBrickRelation(string EmployeeID, string DistributorID, string BrickIds);



        //[OperationContract]
        //[WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "Notification/{Start}/{end}/{empid}")]
        //System.ServiceModel.Channels.Message Notification(string Start, string end, string empid);



        //[OperationContract]
        //[WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "NotificationNew/{empid}")]
        //System.ServiceModel.Channels.Message NotificationNew(string empid);



        //[OperationContract]
        //[WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/AttendanceReportForHRAPIDaily/{StartingDate}")]
        //System.ServiceModel.Channels.Message AttendanceReportForHRAPIDaily(string StartingDate);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "/AttendanceReportForHRAPIMonthly/{StartingDate}")]
        System.ServiceModel.Channels.Message AttendanceReportForHRAPIMonthly(string StartingDate);


        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "getPredayCalls/{empid}/{date}")]
        System.ServiceModel.Channels.Message getPredayCalls(string empid, string date);



    }
}
