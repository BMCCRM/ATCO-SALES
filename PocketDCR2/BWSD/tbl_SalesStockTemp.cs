//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PocketDCR2.BWSD
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_SalesStockTemp
    {
        public int PK_ID { get; set; }
        public Nullable<int> FK_ExcelID { get; set; }
        public string DSTBID { get; set; }
        public string PRDID { get; set; }
        public string PRD { get; set; }
        public string BATCHNO { get; set; }
        public string CLDATE { get; set; }
        public string CLOSING { get; set; }
        public int UserId { get; set; }
        public string FlagStatus { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    }
}