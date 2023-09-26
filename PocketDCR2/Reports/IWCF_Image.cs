using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace PocketDCR2.Reports
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IWCF_Image" in both code and config file together.
    [ServiceContract]
    public interface IWCF_Image
    {
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "/UploadPhoto/{filename}")]
        string UploadPhoto(Stream Imagefile, string filename);
    }
}
