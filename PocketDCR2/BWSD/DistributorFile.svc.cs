using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;

namespace PocketDCR2.BWSD
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "DistributorFile" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select DistributorFile.svc or DistributorFile.svc.cs at the Solution Explorer and start debugging.
    [ServiceBehavior(UseSynchronizationContext = false,
    ConcurrencyMode = ConcurrencyMode.Multiple,
    InstanceContextMode = InstanceContextMode.PerCall),
    AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class DistributorFile : IDistributorFile
    {
        public void DoWork()
        {
        }

        JavaScriptSerializer _jss = new JavaScriptSerializer();
        DAL dl = new DAL();
        NameValueCollection nv = new NameValueCollection();
        public string SaveDistributorFile(Stream stream)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            string postedStream = new StreamReader(stream).ReadToEnd();
            SaveFileData OverAllData = js.Deserialize<SaveFileData>(postedStream);
           string returnstring = string.Empty;
            for (int i = 0; i < OverAllData.FileDataJson.Length; i++)
            {
                FileRow DataRow = OverAllData.FileDataJson[i];
                if (OverAllData.Mode == "Add")
                {
                    try
                    {
                        nv.Clear();
       
                        nv.Add("@Column-VARCHAR(100)", DataRow.Column.ToString());
                        nv.Add("@DistId-INT", OverAllData.DistributorId.ToString());
                        nv.Add("@filename-varchar(100)", DataRow.FileName.ToString());
                        nv.Add("@StartIndex-INT", DataRow.StartIndex.ToString());
                        nv.Add("@EndIndex-INT", DataRow.EndIndex.ToString());
                        nv.Add("@Length-INT", DataRow.Length.ToString());

                        var data = dl.GetData("sp_FileColumnInsert", nv);
                        //returnstring = data.Tables[0].ToJsonString();
                        if (data!=null)
                        {

                        }
                        
                    }
                    catch (Exception ex)
                    {
                        returnstring = ex.Message;
                    }
                }
                else if (OverAllData.Mode == "Update")
                {
                    try
                    {

                        nv.Clear();
                        nv.Add("@Column-VARCHAR(100)", DataRow.Column.ToString());
                        nv.Add("@DistId-INT", OverAllData.DistributorId.ToString());
                        nv.Add("@filename-VARCHAR(100)", DataRow.FileName.ToString());
                        nv.Add("@StartIndex-INT", DataRow.StartIndex.ToString());
                        nv.Add("@EndIndex-INT", DataRow.EndIndex.ToString());
                        nv.Add("@Length-INT", DataRow.Length.ToString());
                        var data = dl.GetData("sp_FileColumnUpdate", nv);

                    }
                    catch (Exception ex)
                    {
                        returnstring = ex.Message;
                    }
                }
              
            }
      
            return returnstring;
        }

        [DataContract]
        public class SaveFileData
        {
            [DataMember(Name = "DistributorId")]
            public string DistributorId { get; set; }

            [DataMember(Name = "Mode")]
            public string Mode { get; set; }

            [DataMember(Name = "FileDataJson")]
            public FileRow[] FileDataJson { get; set; }
        }

        public class FileRow
        {
            [DataMember(Name = "FileName")]
            public string FileName { get; set; }

            [DataMember(Name = "Column")]
            public string Column { get; set; }

            [DataMember(Name = "StartIndex")]
            public string StartIndex { get; set; }

            [DataMember(Name = "EndIndex")]
            public string EndIndex { get; set; }

            [DataMember(Name = "Length")]
            public string Length { get; set; }

        }

    }
}
