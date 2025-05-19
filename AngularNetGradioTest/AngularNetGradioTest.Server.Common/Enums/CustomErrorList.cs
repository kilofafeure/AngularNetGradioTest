using System.ComponentModel;

namespace AngularNetGradioTest.Server.Common.Enums
{
    public enum CustomErrorList
    {
        [Description("Unknown error")]
        UnknownError = -1,
        [Description("Invalid user or password, are mandatory")]
        LoginNotAllowed = 10,
    }
}
