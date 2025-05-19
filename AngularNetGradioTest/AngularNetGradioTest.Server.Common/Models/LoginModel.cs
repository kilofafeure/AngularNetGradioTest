
using AngularNetGradioTest.Server.Common.Enums;
using System.Text.Json.Serialization;

namespace AngularNetGradioTest.Server.Common.Models
{
    public class LoginModel
    {
        [JsonPropertyName("password")]
        public string Password { get; set; } = string.Empty;
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;
    }

    public class LoginResponseModel(CustomErrorList? errorId = null, string errorMessage = "")
    {
        [JsonPropertyName("errorId")]
        public CustomErrorList? ErrorId { get; set; } = errorId;
        [JsonPropertyName("errorMessage")]
        public string ErrorMessage { get; set; } = errorMessage;
    }
}
