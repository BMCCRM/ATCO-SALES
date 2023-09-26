using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;
using PocketDCR2.Classes;

namespace PocketDCR2.Reports
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "WCF_Image" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select WCF_Image.svc or WCF_Image.svc.cs at the Solution Explorer and start debugging.
    [ServiceBehavior]
    [AspNetCompatibilityRequirements
    (RequirementsMode = AspNetCompatibilityRequirementsMode.
    Allowed)]
    public class WCF_Image : IWCF_Image
    {
        
        public string UploadPhoto(Stream Imagefile, string filename)
        {
            NameValueCollection _nvCollection = new NameValueCollection();
            DAL _dl = new DAL();

            try
            {

                string EmpID = HttpContext.Current.Session["CurrentUserId"].ToString();

                string idImageName = HttpContext.Current.Session["CurrentUserId"].ToString() + "_image." + filename.Split('.')[1];
                string path = HttpContext.Current.Server.MapPath("../TeamImages");
                FileStream fileToUpload = new FileStream(path + @"\" + idImageName, FileMode.Create);

                byte[] bytearray = new byte[10000000];
                int bytesRead, totalBytesRead = 0;
                do
                {
                    bytesRead = Imagefile.Read(bytearray, 0, bytearray.Length);
                    totalBytesRead += bytesRead;
                } while (bytesRead > 0);

                fileToUpload.Write(bytearray, 0, bytearray.Length);
                fileToUpload.Close();
                fileToUpload.Dispose();

                _nvCollection.Clear();
                _nvCollection.Add("@Emp_ID-bigint", EmpID.ToString());
                DataSet ds = _dl.GetData("SelectEmployeeImage", _nvCollection);

                if (ds != null)
                {
                    if (ds.Tables[0].Rows.Count != 0)
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@Emp_ID-bigint", EmpID.ToString());
                        _nvCollection.Add("@ImageName-varchar-(500)", idImageName.ToString());
                        _dl.InserData("UpdateEmployeeImage", _nvCollection);
                    }
                    else
                    {
                        _nvCollection.Clear();
                        _nvCollection.Add("@Emp_ID-bigint", EmpID.ToString());
                        _nvCollection.Add("@ImageName-varchar-(500)", idImageName.ToString());
                        _dl.InserData("InsertEmployeeImage", _nvCollection);
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
            return "tsc";
        }
    }
}
