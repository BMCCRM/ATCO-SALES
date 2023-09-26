using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace PocketDCR2.BWSD
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IDistributorFile" in both code and config file together.
    [ServiceContract]
    public interface IDistributorFile
    {
        [OperationContract]
        void DoWork();


        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, UriTemplate = "/SaveDistributorFile")]
        string SaveDistributorFile(Stream stream);
    }
}
