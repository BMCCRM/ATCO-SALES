using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace PocketDCR2.SalesMod
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IZipUpload" in both code and config file together.
    [ServiceContract]
  
    public interface IZipUpload
    {
        [OperationContract]
        void DoWork();

        [OperationContract]
        [WebInvoke(UriTemplate = "UploadtxtFile?Path={path}")]
        void UploadtxtFile(string path, Stream stream);   

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/ExtractandRead/{filename}")]
        string ExtractandRead(string filename);

      
    }
}
