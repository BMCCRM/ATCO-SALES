using System;
using System.Linq;
using System.Web.Services;
using System.Collections.Specialized;
using System.Data;
using DatabaseLayer.SQL;
using PocketDCR.CustomMembershipProvider;
using PocketDCR2.Classes;


namespace PocketDCR2.Form
{
    /// <summary>
    /// Summary description for PlanningCache1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PlanningCache1 : System.Web.Services.WebService
    {
        private readonly DAL dl = new DAL();
        private readonly DatabaseDataContext _dataContext = new DatabaseDataContext(Constants.GetConnectionString());

        [WebMethod(EnableSession = true)]
        public string LoadCache(string userDevice)
        {
            MIOBrickCollection.Instance.Clear();
            MIODoctorClassCollection.Instance.Clear();
            MIODoctorSpecialityCollection.Instance.Clear();
            MIODoctorsCollection.Instance.Clear();

            var _currentUser = (SystemUser)Session["SystemUser"];
            if (Session["CurrentUserRole"].ToString() == "rl6")
            {

                // ReSharper disable SpecifyACultureInStringConversionExplicitly
                var nv = new NameValueCollection { { "@EmployeeId-bigint", _currentUser.EmployeeId.ToString() } };
                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                DataSet dsBrick = dl.GetData("Mioplaning_FilterB", nv);
                if (dsBrick != null)
                    if (dsBrick.Tables[0].Rows.Count > 0)
                    {
                        MIOBrickCollection.Instance.AddMioBrick(Convert.ToInt32(_currentUser.EmployeeId), dsBrick);
                    }
                DataSet dsDoctorClass = dl.GetData("Mioplaning_FilterC", nv);
                if (dsDoctorClass != null)
                    if (dsDoctorClass.Tables[0].Rows.Count > 0)
                    {
                        MIODoctorClassCollection.Instance.AddMioDoctorClass(Convert.ToInt32(_currentUser.EmployeeId),
                                                                            dsDoctorClass);
                    }
                DataSet dsDoctorSpec = dl.GetData("Mioplaning_FilterS", nv);
                if (dsDoctorSpec != null)
                    if (dsDoctorSpec.Tables[0].Rows.Count > 0)
                    {
                        MIODoctorSpecialityCollection.Instance.AddMioDoctorSpec(
                            Convert.ToInt32(_currentUser.EmployeeId), dsDoctorSpec);
                    }
                DataSet dsMioDoctors = dl.GetData("Mioplaning_FilterD", nv);
                if (dsMioDoctors != null)
                    if (dsMioDoctors.Tables[0].Rows.Count > 0)
                    {
                        MIODoctorsCollection.Instance.AddMioDoctors(Convert.ToInt32(_currentUser.EmployeeId),
                                                                    dsMioDoctors);
                    }
            }
            else if (Session["CurrentUserRole"].ToString() == "rl5")
            {
                try
                {
                    var nv1 = new NameValueCollection();
                    int level3 = 0, level4 = 0, level5 = 0;

                    #region Set Employee HR

                    nv1.Clear();
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv1.Add("@EmployeeId-bigint", _currentUser.EmployeeId.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    DataSet mioHr = dl.GetData("Mioplaning_MIOHierarchy", nv1);

                    if (mioHr.Tables.Count > 0)
                    {
                        if (mioHr.Tables[0].Rows.Count > 0)
                        {
                            level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
                            level4 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level4LevelId"]);
                            level5 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level5LevelId"]);
                        }
                    }

                    #endregion

                    var _mIolist =
                        _dataContext.sp_EmployeesSelectByLevel("Level3", "rl5", 0, 0, level3, level4, level5, 0).ToList();
                    foreach (var vEmployeeWithRole in _mIolist)
                    {
                        var nv = new NameValueCollection { { "@EmployeeId-bigint", vEmployeeWithRole.EmployeeId.ToString() } };
                        // ReSharper restore SpecifyACultureInStringConversionExplicitly
                        DataSet dsBrick = dl.GetData("Mioplaning_FilterB", nv);
                        if (dsBrick != null)
                            if (dsBrick.Tables[0].Rows.Count > 0)
                            {
                                MIOBrickCollection.Instance.AddMioBrick(Convert.ToInt32(vEmployeeWithRole.EmployeeId),
                                                                        dsBrick);
                            }
                        DataSet dsDoctorClass = dl.GetData("Mioplaning_FilterC", nv);
                        if (dsDoctorClass != null)
                            if (dsDoctorClass.Tables[0].Rows.Count > 0)
                            {
                                MIODoctorClassCollection.Instance.AddMioDoctorClass(
                                    Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorClass);
                            }
                        DataSet dsDoctorSpec = dl.GetData("Mioplaning_FilterS", nv);
                        if (dsDoctorSpec != null)
                            if (dsDoctorSpec.Tables[0].Rows.Count > 0)
                            {
                                MIODoctorSpecialityCollection.Instance.AddMioDoctorSpec(
                                    Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorSpec);
                            }
                        DataSet dsMioDoctors = dl.GetData("Mioplaning_FilterD", nv);
                        if (dsMioDoctors != null)
                            if (dsMioDoctors.Tables[0].Rows.Count > 0)
                            {
                                MIODoctorsCollection.Instance.AddMioDoctors(
                                    Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsMioDoctors);
                            }
                    }
                }
                catch (Exception exception)
                {
                    exception.ErrorLog();
                }
            }
            else if (Session["CurrentUserRole"].ToString() == "rl4")
            {
                try
                {
                    var nv1 = new NameValueCollection();
                    int level3 = 0, level4 = 0;

                    #region Set Employee HR

                    nv1.Clear();
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv1.Add("@EmployeeId-bigint", _currentUser.EmployeeId.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    DataSet mioHr = dl.GetData("Mioplaning_MIOHierarchy", nv1);

                    if (mioHr.Tables.Count > 0)
                    {
                        if (mioHr.Tables[0].Rows.Count > 0)
                        {
                            level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);
                            level4 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level4LevelId"]);
                        }
                    }

                    #endregion

                    var _zsmlist =
                        _dataContext.sp_EmployeesSelectByLevel("Level3", "rl4", 0, 0, level3, level4, 0, 0).ToList();
                    foreach (var vEmployeeWithRole in _zsmlist)
                    {

                        var mioList = _dataContext.sp_EmployeesSelectByManager(vEmployeeWithRole.EmployeeId);
                        foreach (var mio in mioList)
                        {
                            if (mio.EmployeeId == 492)
                            {
                                var dasda = "";
                            }

                            var nv = new NameValueCollection { { "@EmployeeId-bigint", mio.EmployeeId.ToString() } };
                            // ReSharper restore SpecifyACultureInStringConversionExplicitly
                            DataSet dsBrick = dl.GetData("Mioplaning_FilterB", nv);
                            if (dsBrick != null)
                                if (dsBrick.Tables[0].Rows.Count > 0)
                                {
                                    MIOBrickCollection.Instance.AddMioBrick(Convert.ToInt32(mio.EmployeeId),
                                                                            dsBrick);
                                }
                            DataSet dsDoctorClass = dl.GetData("Mioplaning_FilterC", nv);
                            if (dsDoctorClass != null)
                                if (dsDoctorClass.Tables[0].Rows.Count > 0)
                                {
                                    MIODoctorClassCollection.Instance.AddMioDoctorClass(
                                        Convert.ToInt32(mio.EmployeeId), dsDoctorClass);
                                }
                            DataSet dsDoctorSpec = dl.GetData("Mioplaning_FilterS", nv);
                            if (dsDoctorSpec != null)
                                if (dsDoctorSpec.Tables[0].Rows.Count > 0)
                                {
                                    MIODoctorSpecialityCollection.Instance.AddMioDoctorSpec(
                                        Convert.ToInt32(mio.EmployeeId), dsDoctorSpec);
                                }
                            DataSet dsMioDoctors = dl.GetData("Mioplaning_FilterD", nv);
                            if (dsMioDoctors != null)
                                if (dsMioDoctors.Tables[0].Rows.Count > 0)
                                {
                                    MIODoctorsCollection.Instance.AddMioDoctors(
                                        Convert.ToInt32(mio.EmployeeId), dsMioDoctors);
                                }
                        }
                    }
                }
                catch (Exception exception)
                {
                    exception.ErrorLog();
                }
            }
            else if (Session["CurrentUserRole"].ToString() == "rl3")
            {
                try
                {
                    var nv1 = new NameValueCollection();
                    int level3 = 0;

                    #region Set Employee HR

                    nv1.Clear();
                    // ReSharper disable SpecifyACultureInStringConversionExplicitly
                    nv1.Add("@EmployeeId-bigint", _currentUser.EmployeeId.ToString());
                    // ReSharper restore SpecifyACultureInStringConversionExplicitly
                    DataSet mioHr = dl.GetData("Mioplaning_MIOHierarchy", nv1);

                    if (mioHr.Tables.Count > 0)
                    {
                        if (mioHr.Tables[0].Rows.Count > 0)
                        {
                            level3 = Convert.ToInt32(mioHr.Tables[0].Rows[0]["Level3LevelId"]);

                        }
                    }

                    #endregion

                    var _rsmlist =
                        _dataContext.sp_EmployeesSelectByLevel("Level3", "rl3", 0, 0, level3, 0, 0, 0).ToList();
                    foreach (var rsm in _rsmlist)
                    {
                        var _zsmlist = _dataContext.sp_EmployeesSelectByManager(rsm.EmployeeId);

                        foreach (var zsm in _zsmlist)
                        {
                            var mioList = _dataContext.sp_EmployeesSelectByManager(zsm.EmployeeId);

                            foreach (var vEmployeeWithRole in mioList)
                            {
                                var nv = new NameValueCollection { { "@EmployeeId-bigint", vEmployeeWithRole.EmployeeId.ToString() } };
                                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                                DataSet dsBrick = dl.GetData("Mioplaning_FilterB", nv);
                                if (dsBrick != null)
                                    if (dsBrick.Tables[0].Rows.Count > 0)
                                    {
                                        MIOBrickCollection.Instance.AddMioBrick(Convert.ToInt32(vEmployeeWithRole.EmployeeId),
                                                                                dsBrick);
                                    }
                                DataSet dsDoctorClass = dl.GetData("Mioplaning_FilterC", nv);
                                if (dsDoctorClass != null)
                                    if (dsDoctorClass.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorClassCollection.Instance.AddMioDoctorClass(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorClass);
                                    }
                                DataSet dsDoctorSpec = dl.GetData("Mioplaning_FilterS", nv);
                                if (dsDoctorSpec != null)
                                    if (dsDoctorSpec.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorSpecialityCollection.Instance.AddMioDoctorSpec(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorSpec);
                                    }
                                DataSet dsMioDoctors = dl.GetData("Mioplaning_FilterD", nv);
                                if (dsMioDoctors != null)
                                    if (dsMioDoctors.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorsCollection.Instance.AddMioDoctors(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsMioDoctors);
                                    }
                            }
                        }
                    }
                }
                catch (Exception exception)
                {
                    exception.ErrorLog();
                }
            }
            else if (Session["CurrentUserRole"].ToString() == "admin")
            {
                try
                {

                    var nv1 = new NameValueCollection();
                    int level3 = 1;

                    #region Set Employee HR

                    var NationalLevel = (from p in _dataContext.v_EmployeeHierarchies
                                         where p.LevelId1 == null
                                         where p.LevelId2 == null
                                         where p.LevelId4 == null
                                         where p.LevelId5 == null
                                         where p.LevelId6 == null
                                         select p).ToList();
                    if (NationalLevel.Count > 0)
                    {
                        var employeeHierarchy = NationalLevel.FirstOrDefault();
                        if (employeeHierarchy != null)
                            level3 = Convert.ToInt32(employeeHierarchy.LevelId3);
                    }

                    #endregion

                    var _rsmlist =
                        _dataContext.sp_EmployeesSelectByLevel("Level3", "rl3", 0, 0, level3, 0, 0, 0).ToList();
                    foreach (var rsm in _rsmlist)
                    {
                        var _zsmlist = _dataContext.sp_EmployeesSelectByManager(rsm.EmployeeId);

                        foreach (var zsm in _zsmlist)
                        {
                            var mioList = _dataContext.sp_EmployeesSelectByManager(zsm.EmployeeId);

                            foreach (var vEmployeeWithRole in mioList)
                            {
                                var nv = new NameValueCollection { { "@EmployeeId-bigint", vEmployeeWithRole.EmployeeId.ToString() } };
                                // ReSharper restore SpecifyACultureInStringConversionExplicitly
                                DataSet dsBrick = dl.GetData("Mioplaning_FilterB", nv);
                                if (dsBrick != null)
                                    if (dsBrick.Tables[0].Rows.Count > 0)
                                    {
                                        MIOBrickCollection.Instance.AddMioBrick(Convert.ToInt32(vEmployeeWithRole.EmployeeId),
                                                                                dsBrick);
                                    }
                                DataSet dsDoctorClass = dl.GetData("Mioplaning_FilterC", nv);
                                if (dsDoctorClass != null)
                                    if (dsDoctorClass.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorClassCollection.Instance.AddMioDoctorClass(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorClass);
                                    }
                                DataSet dsDoctorSpec = dl.GetData("Mioplaning_FilterS", nv);
                                if (dsDoctorSpec != null)
                                    if (dsDoctorSpec.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorSpecialityCollection.Instance.AddMioDoctorSpec(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsDoctorSpec);
                                    }
                                DataSet dsMioDoctors = dl.GetData("Mioplaning_FilterD", nv);
                                if (dsMioDoctors != null)
                                    if (dsMioDoctors.Tables[0].Rows.Count > 0)
                                    {
                                        MIODoctorsCollection.Instance.AddMioDoctors(
                                            Convert.ToInt32(vEmployeeWithRole.EmployeeId), dsMioDoctors);
                                    }
                            }
                        }
                    }
                }
                catch (Exception exception)
                {
                    exception.ErrorLog();
                }
            }

            return "ok";
        }
    }
}
