using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SchedulerDAL
{
    public class Utility
    {
        public static string STATUS_INPROCESS = "Draft";
        public static string STATUS_SUBMITTED = "Submitted";
        public static string STATUS_APPROVED = "Approved";
        public static string STATUS_REJECTED = "Rejected";
        public static string STATUS_RESUBMITTED = "Resubmitted";

        public static string GetStatusColor(string status)
        {
            if (status == STATUS_INPROCESS)
                return "red1";
            else if (status == STATUS_APPROVED)
                return "green";
            else if (status == STATUS_SUBMITTED)
                return "yellow";
            else if (status == STATUS_RESUBMITTED)
                return "yellow";
            else if (status == STATUS_REJECTED)
                return "red1";
            else
                return "red1";
        }
    }
}
