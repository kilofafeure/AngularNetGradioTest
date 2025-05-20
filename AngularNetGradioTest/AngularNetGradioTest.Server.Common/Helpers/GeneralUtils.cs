using System.Text.RegularExpressions;

namespace AngularNetGradioTest.Server.Common.Helpers
{
    public static partial class GeneralUtils
    {
        #region ************ REGEX ************

        [GeneratedRegex("[ ]{2,}")]
        private static partial Regex WhiteSpaces1LongRegex();


        [GeneratedRegex(@"\t|\n|\r|\\t|\\n|\\r")]
        private static partial Regex HtmlRegex();

        #endregion

        public static string UnescapeString(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                return string.Empty;

            // Espacios en blanco de longitud máxima 1        
            Regex whiteSpaces1Long = WhiteSpaces1LongRegex();

            string value0 = HtmlRegex().Replace(message, "");
            string value1 = Regex.Unescape(value0);
            string value2 = whiteSpaces1Long.Replace(value1, " ");
            string value3 = value2.Replace("'", string.Empty);

            return value3.Trim();
        }
    }
}
