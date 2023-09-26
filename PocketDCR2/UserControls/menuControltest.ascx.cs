using System;
using System.Collections.Specialized;
using System.Text;
using System.Xml;
using PocketDCR2.Classes;
using System.Data;

namespace PocketDCR2.UserControls
{
    public partial class menuControltest : System.Web.UI.UserControl
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            var str = new StringBuilder();
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
                if (Session["user-device"] != null)
                {
                    if (Session["user-device"].ToString() != "mobile")
                    {
                        str = new StringBuilder();
                        str.Append("<ul>");
                        string link, title, roll;
                        // Session["CurrentUserRole"] = "admin";
                        roll = Convert.ToString(Session["CurrentUserRole"]);

                        var xml = new XmlDocument();
                        string Path = Server.MapPath("~/XMLFile1.xml");
                        xml.Load(Path);

                        string test = "";
                        string EmpID = Session["CurrentUserId"].ToString();
                        _nvCollection.Clear();
                        _nvCollection.Add("@Emp_ID-bigint", EmpID.ToString());
                        DataSet ds = _dl.GetData("SelectEmployeeImage", _nvCollection);

                        for (int i = 1; i < 9; i++)
                        {
                            XmlNodeList RssNodeList = xml.SelectNodes("MianMenu/" + roll + "/MainTab" + i + "");
                            if (RssNodeList != null)
                                foreach (XmlNode rssNode in RssNodeList)
                                {
                                    if (rssNode.Attributes != null)
                                    {
                                        string MainLi = rssNode.Attributes[1].Value;
                                        test = MainLi.ToString();

                                        if (MainLi == "userinfo")
                                        {
                                            if (ds != null)
                                            {
                                                if (ds.Tables[0].Rows.Count != 0)
                                                {
                                                    str.Append("<li class='active has-sub'><a href='#'>" + user_name + "<img src='../TeamImages/" + ds.Tables[0].Rows[0]["ImageName"].ToString() + "' alt='user image'  width='55' height='55' class='img_css'/></a><div class='mainbutton'><div id='yourBtn' class='buttoncss' onclick='getFile()'></div><div style='height: 0px;width: 0px; overflow:hidden;'><input id='upfile' type='file' value='upload' onchange='sub(this)' /></div></div><ul>");
                                                }
                                                else
                                                {
                                                    str.Append("<li class='active has-sub'><a href='#'>" + user_name + "<img src='../TeamImages/0_image.jpg' alt='user image'  width='55' height='55' class='img_css'/></a><div class='mainbutton'><div id='yourBtn' class='buttoncss' onclick='getFile()'></div><div style='height: 0px;width: 0px; overflow:hidden;'><input id='upfile' type='file' value='upload' onchange='sub(this)' /></div></div><ul>");
                                                }
                                            }
                                            else
                                            {
                                                str.Append("<li class='active has-sub'><a href='#'>" + user_name + "<img src='../TeamImages/0_image.jpg' alt='user image'  width='55' height='55' class='img_css'/></a><div class='mainbutton'><div id='yourBtn' class='buttoncss' onclick='getFile()'></div><div style='height: 0px;width: 0px; overflow:hidden;'><input id='upfile' type='file' value='upload' onchange='sub(this)' /></div></div><ul>");
                                            }
                                        }
                                        else
                                        {
                                            str.Append("<li class='active has-sub'><a href='#'>" + MainLi + "</a><ul>");
                                        }
                                    }

                                    foreach (XmlNode childNode in rssNode.ChildNodes)
                                    {
                                        #region
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
                    }
                    else
                    {
                        str.Append("<select name='menu_id' id='menu_id' class='mob-menu' tabindex='1' onChange='window.location.href=this.value'>");
                        str.Append("<option value=''>-- Menu --</option>");
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
                                            str.Append("<optgroup label='" + user_name + "'>");
                                        }
                                        else
                                        {
                                            str.Append("<optgroup label='" + MainLi + "'>");
                                        }
                                    }

                                    foreach (XmlNode childNode in rssNode.ChildNodes)
                                    {
                                        #region
                                        if (childNode.Attributes == null) continue;
                                        link = childNode.Attributes[0].Value;
                                        title = childNode.Attributes[1].Value;
                                        if (childNode.ChildNodes.Count > 0)
                                        {
                                            #region Menu Menu MenuLink

                                            str.Append("<optgroup label='" + title + "'>");
                                            foreach (XmlNode innerchildNode in childNode.ChildNodes)
                                            {
                                                if (innerchildNode.Attributes != null)
                                                {
                                                    link = innerchildNode.Attributes[0].Value;
                                                    title = innerchildNode.Attributes[1].Value;
                                                    str.Append("<option value='" + link + "'>" + title + "</option>");
                                                }

                                            }
                                            str.Append("</optgroup>");
                                            #endregion
                                        }
                                        else
                                        {
                                            #region Menu MenuLink
                                            str.Append("<option value='" + link + "'>" + title + "</option>");
                                            #endregion
                                        }
                                        #endregion
                                    }
                                }
                            str.Append("</optgroup>");
                        }
                        str.Append("</select>");
                    }
                }
                Literal1.Text = str.ToString();
            }
            else
            {
                Response.Redirect("../Form/Login.aspx");
            }
        }
    }
}