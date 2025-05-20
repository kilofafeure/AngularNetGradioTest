namespace AngularNetGradioTest.Server.Common.Helpers
{
    public static partial class ExceptionHelper
    {
        private const string seeInnerEx = ", see inner exception.";

        public static string GetFullExceptionMessage(Exception initialEx)
        {
            string oMessage = initialEx.GetOriginalException().Replace(seeInnerEx, string.Empty);
            return GeneralUtils.UnescapeString(oMessage);
        }

        private static string GetOriginalException(this Exception ex)
        {
            if (ex.InnerException is not null)
            {
                return $"{ex.Message} - {ex.InnerException.GetOriginalException()}";
            }
            return ex.Message;
        }
    }
}
