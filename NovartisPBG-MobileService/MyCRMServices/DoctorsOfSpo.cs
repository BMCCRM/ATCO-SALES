//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyCRMServices
{
    using System;
    using System.Collections.Generic;
    
    public partial class DoctorsOfSpo
    {
        public int DoctorsOfSpoId { get; set; }
        public long DoctorId { get; set; }
        public long EmployeeId { get; set; }
        public string DoctorCode { get; set; }
    
        public virtual Employee Employee { get; set; }
        public virtual Doctor Doctor { get; set; }
    }
}