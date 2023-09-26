using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Script.Serialization;
using System.Text;
using System.Configuration;

namespace PocketDCR2.Classes
{
    public static class ExtensionMethods
    {
        public static string ToJsonString(this DataTable dt)
        {
            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = int.MaxValue;

            var rows = new List<Dictionary<string, string>>();
            foreach (DataRow dr in dt.Rows)
            {
                var row = dt.Columns.Cast<DataColumn>().ToDictionary(col => col.ColumnName, col => dr[col].ToString());
                rows.Add(row);
            }

            var builder = new StringBuilder();
            serializer.Serialize(rows, builder);
            return builder.ToString();
        }

        public static void ErrorLog(this Exception ex)
        {
            try
            {
                if (!Directory.Exists(ConfigurationManager.AppSettings["Logs"].ToString()))
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["Logs"].ToString());
                }

                File.AppendAllText(ConfigurationManager.AppSettings[@"Logs\"].ToString() + "Log_" + DateTime.UtcNow.ToString("yyyy_MM_dd") + ".txt",
                    DateTime.Now + " : " + ex.Message + Environment.NewLine);
            }
            catch (Exception exception)
            {
                Console.Out.WriteLine(exception.Message);
            }
        }

        public static DataTable GenerateTransposedTable(this DataTable inputTable)
        {
            DataTable outputTable = new DataTable();

            // Add columns by looping rows

            // Header row's first column is same as in inputTable
            outputTable.Columns.Add(inputTable.Columns[0].ColumnName.ToString());

            // Header row's second column onwards, 'inputTable's first column taken
            foreach (DataRow inRow in inputTable.Rows)
            {
                string newColName = inRow[0].ToString();
                outputTable.Columns.Add(newColName);
            }
            outputTable.Columns.Add("Avg");

            // Add rows by looping columns        
            for (int rCount = 1; rCount <= inputTable.Columns.Count - 1; rCount++)
            {
                DataRow newRow = outputTable.NewRow();

                // First column is inputTable's Header row's second column
                newRow[0] = inputTable.Columns[rCount].ColumnName.ToString();
                for (int cCount = 0; cCount <= inputTable.Rows.Count - 1; cCount++)
                {
                    string colValue = inputTable.Rows[cCount][rCount].ToString();
                    newRow[cCount + 1] = colValue;
                }
                outputTable.Rows.Add(newRow);
            }

            return outputTable;
        }
    }
}