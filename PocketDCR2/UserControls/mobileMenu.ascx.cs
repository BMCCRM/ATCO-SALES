using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using System.Security;
using PocketDCR2.Classes;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PocketDCR2.UserControls
{
    public partial class mobileMenu : System.Web.UI.UserControl
    {
        #region Private Members
        private DatabaseDataContext _dataContext;
        private SystemUser _currentUser;
        #endregion


        protected void Page_Load(object sender, EventArgs e)
        {
            NameValueCollection _nvCollection = new NameValueCollection();
            DAL _dl = new DAL();
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
                str.Append("<ul class='nav navbar-nav'>");
                string link, title, roll;
                // Session["CurrentUserRole"] = "admin";
                roll = Convert.ToString(Session["CurrentUserRole"]);

                var xml = new XmlDocument();
                string Path = Server.MapPath("~/XMLFileMobile.xml");
                xml.Load(Path);

                string test = "";
                string EmpID = Session["CurrentUserId"].ToString();
                _nvCollection.Clear();
                _nvCollection.Add("@Emp_ID-bigint", EmpID.ToString());
                DataSet dsimage = _dl.GetData("SelectEmployeeImage", _nvCollection);

                for (int i = 1; i < 9; i++)
                {
                    XmlNodeList RssNodeList = xml.SelectNodes("MainMenu/" + roll + "/MainTab" + i + "");
                    if (RssNodeList != null)
                        foreach (XmlNode rssNode in RssNodeList)
                        {
                            if (rssNode.Attributes != null)
                            {
                                string MainLi = rssNode.Attributes[1].Value;

                                if (MainLi == "userinfo")
                                {
                                    if (dsimage != null)
                                    {
                                        if (dsimage.Tables[0].Rows.Count != 0)
                                        {
                                            str.Append("<li class='dropdown'><a href='#' data-toggle='dropdown'>" + user_name + "</a><ul class='dropdown-menu dropdown-menu-left'>");
                                        }
                                        else
                                        {
                                            str.Append("<li class='dropdown'><a href='#' data-toggle='dropdown'>" + user_name + "</a><ul class='dropdown-menu dropdown-menu-left'>");
                                        }
                                    }
                                    else
                                    {
                                        str.Append("<li class='dropdown'><a href='#' data-toggle='dropdown'>" + user_name + "</a><ul class='dropdown-menu dropdown-menu-left'>");
                                    }
                                }
                                else
                                {
                                    str.Append("<li class='dropdown'><a href='#' data-toggle='dropdown'>" + MainLi + "</a><ul class='dropdown-menu dropdown-menu-left'>");
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
                                    str.Append("<li class='dropdown-submenu'><a href='javascript:void(0);' class='has_children'>" + title + "</a>");
                                    str.Append("<ul class='dropdown-menu dropdown-menu-left'>");
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
                Response.Redirect("~/Form/Login2.aspx");
            }
        }
    }
}