
using System.Text.Json.Serialization;

namespace AngularNetGradioTest.Server.Common.Models
{
    public class FullLoginModel
    {
        [JsonPropertyName("password")]
        public string Password { get; set; } = string.Empty;
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;
    }

    public class LoginModel(string email = "")
    {
        [JsonPropertyName("email")]
        public string Email { get; set; } = email;   
    }
}
