using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PocketDCR2.Classes
{
    public class TemplateValidator
    {
        #region IsNumeric

        public static bool IsNumeric(string value)
        {
            var numericSpiliter = value.Trim().Split(' ');
            int isNumeric;
            bool numeric = true;

            foreach (var item in numericSpiliter)
            {
                numeric = int.TryParse(item, out isNumeric);
            }

            return numeric;
        }

        #endregion        

        #region IsChar

        public static bool IsChar(string value)
        {
            char character;
            return char.TryParse(value, out character);
        }

        #endregion

        #region IsDate

        public static bool IsDate(string value)
        {
            DateTime dateTime;
            return DateTime.TryParse(value.ToString(), out dateTime);
        }

        #endregion
    }
}