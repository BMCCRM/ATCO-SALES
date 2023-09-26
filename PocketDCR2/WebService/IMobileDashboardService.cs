using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace PocketDCR2.WebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMobileDashboardService" in both code and config file together.

    [ServiceContract]
    public interface IMobileDashboardService
    {
       
        [WebGet(ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "/ProdFreClass/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]
        ListGetClassfrequency ProdFreClass(string date, string endate, string LevelType, string EmployeeId);

        [WebGet(ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "/callsperday/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]
        ListGetcallsperday callsperday(string date, string endate, string LevelType, string EmployeeId);


        [WebGet(ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "/daysinfield/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]
        ListGetdaysinfield daysinfield(string date, string endate, string LevelType, string EmployeeId);

        [WebGet(ResponseFormat = WebMessageFormat.Json,
           UriTemplate = "/StartDailyCallTrendWork/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]
        ListGetStartDailyCallTrendWork StartDailyCallTrendWork(string date, string endate, string LevelType, string EmployeeId);

         [WebGet(ResponseFormat = WebMessageFormat.Json,
           UriTemplate = "/DailyCall/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]
         ListGetDailyCall DailyCall(string date, string endate, string LevelType, string EmployeeId);

         [WebGet(ResponseFormat = WebMessageFormat.Json,
           UriTemplate = "/PlannedVsActualCalls/{date}/{endate}/{LevelType}/{EmployeeId}", BodyStyle = WebMessageBodyStyle.Bare)]
        [OperationContract]

         ListGetPlannedVsActualCalls PlannedVsActualCalls(string date, string endate, string LevelType, string EmployeeId);
    }


    #region class
    [DataContract]
    public class GetClassfrequency
    {
        [DataMember]
        public string ClassId;
        [DataMember]
        public string ProdFreq;
       

        public GetClassfrequency()
        { }

        public GetClassfrequency(string classId, string prodFreq)
        {
            ClassId = classId;
            ProdFreq = prodFreq;
        }

    }

    [DataContract]
    public class ListGetClassfrequency : BaseClass
    {
        [DataMember]
        public List<GetClassfrequency> data;

        public ListGetClassfrequency()
        { }

        public ListGetClassfrequency(List<GetClassfrequency> data)
        {
            data = new List<GetClassfrequency>();
        }

    }

    [DataContract]
    public class Getcallsperday
    {
        [DataMember]
        public string CallPerDay;
        public Getcallsperday()
        { }

        public Getcallsperday(string callPerDay)
        {
            CallPerDay = callPerDay;
        }
    }


    [DataContract]
    public class Getdaysinfield
    {
        [DataMember]
        public string Final;

        public Getdaysinfield()
        { }

        public Getdaysinfield(string final)
        {
            Final = final;
        }

    }

    [DataContract]
    public class ListGetdaysinfield : BaseClass
    {
        [DataMember]
        public List<Getdaysinfield> data;

        public ListGetdaysinfield()
        { }

        public ListGetdaysinfield(List<Getdaysinfield> data)
        {
            data = new List<Getdaysinfield>();
        }

    }


    [DataContract]
    public class ListGetcallsperday :BaseClass
    {
        [DataMember]
        public List<Getcallsperday> data;

        public ListGetcallsperday()
        { }

        public ListGetcallsperday(List<Getcallsperday> data)
        {
            data = new List<Getcallsperday>();
        }

    }


    [DataContract]
    public class GetStartDailyCallTrendWork
    {
        [DataMember]
        public string ActualCalls;
        //[DataMember]
        //public string Days;
        //[DataMember]
        //public string CorrectSMS;
        //[DataMember]
        //public string MIOs;
        //[DataMember]
        //public string AVGC;

        public GetStartDailyCallTrendWork()
        { }

        public GetStartDailyCallTrendWork(string actualcall)
        {
            ActualCalls = actualcall;
            //Days = days;
            //CorrectSMS = corectsms;
            //MIOs = mio;
            //AVGC = avg;
        }
        			
    }

    [DataContract]
    public class ListGetStartDailyCallTrendWork : BaseClass
    {
        [DataMember]
        public List<GetStartDailyCallTrendWork> data;

        public ListGetStartDailyCallTrendWork()
        { }

        public ListGetStartDailyCallTrendWork(List<GetStartDailyCallTrendWork> data)
        {
            data = new List<GetStartDailyCallTrendWork>();
        }

    }


      [DataContract]
    public class GetDailyCall
    {
        [DataMember]
        public string Days;
        [DataMember]
        public string CorrectSMS;
        [DataMember]
        public string MIOs;
        [DataMember]
        public string AVGC;

        public GetDailyCall()
        { }

        public GetDailyCall(string days,string corectsms,string mio,string avg)
        {
         
            Days = days;
            CorrectSMS = corectsms;
            MIOs = mio;
            AVGC = avg;
        }
        			
    }

    [DataContract]
    public class ListGetDailyCall : BaseClass
    {
        [DataMember]
        public List<GetDailyCall> data;

        public ListGetDailyCall()
        { }

        public ListGetDailyCall(List<GetDailyCall> data)
        {
            data = new List<GetDailyCall>();
        }

    }


    
      [DataContract]
    public class GetPlannedVsActualCalls
    {
        [DataMember]
        public string Class;
        [DataMember]
        public string Target;
        [DataMember]
        public string Actual;
       
          		
        public GetPlannedVsActualCalls()
        { }

        public GetPlannedVsActualCalls(string classs,string planvisit,string actualcall)
        {
            Class = classs;
            Target = planvisit;
            Actual = actualcall;
        }
        			
    }

    [DataContract]
    public class ListGetPlannedVsActualCalls : BaseClass
    {
        [DataMember]
        public List<GetPlannedVsActualCalls> data;

        public ListGetPlannedVsActualCalls()
        { }

        public ListGetPlannedVsActualCalls(List<GetPlannedVsActualCalls> data)
        {
            data = new List<GetPlannedVsActualCalls>();
        }

    }




    [DataContract]
    public class ConflictsStruture
    {
        [DataMember]
        public string FieldName;

        [DataMember]
        public string DBValue;

        [DataMember]
        public string SentValue;

        public ConflictsStruture()
        {
            FieldName = string.Empty;
            DBValue = string.Empty;
            SentValue = string.Empty;
        }
    }
    [DataContract]
    public class BaseClass
    {
        [DataMember]
        public HttpStatusCode Status;

        [DataMember]
        public string Message;

        [DataMember]
        public List<ConflictsStruture> Conflicts;

        [DataMember]
        public string NewRecordId;

        [DataMember]
        public string TransId;



        public BaseClass()
        {
            Message = string.Empty;
            NewRecordId = string.Empty;
            Conflicts = new List<ConflictsStruture>();

        }
    }

    #endregion

}
