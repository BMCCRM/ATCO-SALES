using System;
using System.Data;
using PocketDCR2.Classes;
using System.Collections.Specialized;
using System.Text;
using System.Xml;

namespace PocketDCR2.UserControls
{
    public partial class menucontrol_saeed : System.Web.UI.UserControl
    {
        #region Private Members

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["CurrentUserId"] != null)
            {
                string user_name = "";
                if (!IsPostBack)
                {
                    var dl = new DAL();
                    var nv = new NameValueCollection();
                    nv.Clear();
                    nv.Add("EmployeeId-long", Session["CurrentUserId"].ToString());
                    var ds = dl.GetData("sp_EmployeesSelect", nv);
                    if (ds != null)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            user_name = ds.Tables[0].Rows[0]["FirstName"].ToString().Trim() + " " + ds.Tables[0].Rows[0]["MiddleName"].ToString().Trim()
                            + " " + ds.Tables[0].Rows[0]["LastName"].ToString().Trim();
                        }
                    }
                }
            
            var str = new StringBuilder();
            str.Append("<ul>");
            string link, title, roll;
           // Session["CurrentUserRole"] = "admin";
            roll = Convert.ToString(Session["CurrentUserRole"]);

            var xml = new XmlDocument();
            string Path = Server.MapPath("~/XMLFile1.xml");
            xml.Load(Path);
            for (int i = 1; i < 9; i++)
            {
                XmlNodeList RssNodeList = xml.SelectNodes("MianMenu/" + roll + "/MainTab" + i + "");
                if (RssNodeList != null)
                    foreach (XmlNode rssNode in RssNodeList)
                    {
                        if (rssNode.Attributes != null)
                        {
                            string MainLi = rssNode.Attributes[1].Value;

                            if (MainLi == "userinfo")
                            {
                                str.Append("<li class='active has-sub'><a href='#'>" + user_name + "</a><ul>");
                            }
                            else
                            {
                                str.Append("<li class='active has-sub'><a href='#'>" + MainLi + "</a><ul>");
                            }
                        }

                        foreach (XmlNode childNode in rssNode.ChildNodes)
                        {
                            #region
                            //rsssubnode = childNode.ChildNodes.Item(0);
                            //rsssubnode = rssNode.ChildNodes.Item(1);
                            if (childNode.Attributes == null) continue;
                            link = childNode.Attributes[0].Value;
                            title = childNode.Attributes[1].Value;
                            if (childNode.ChildNodes.Count > 0)
                            {
                                str.Append("<li class='has-sub'><a href='#'>" + title + "</a>");
                                str.Append("<ul>");
                                foreach (XmlNode innerchildNode in childNode.ChildNodes)
                                {
                                    if (innerchildNode.Attributes != null)
                                    {
                                        link = innerchildNode.Attributes[0].Value;
                                        title = innerchildNode.Attributes[1].Value;
                                    }
                                    str.Append("<li><a href='" + link + "'>" + title + "</a></li>");
                                }
                                str.Append("</ul>");
                            }
                            else
                            {
                                str.Append("<li><a href='" + link + "'>" + title + "</a></li>");
                            }

                            #endregion
                        }

                    }
                str.Append("</ul></li>");  
            }

            str.Append("</ul>");

            Literal1.Text = str.ToString();
            }
            else
            {
                Response.Redirect("../Form/Login.aspx");
            }
        }

        protected void LoginView1_Unload(object sender, EventArgs e)
        {

        }
       
    }
}