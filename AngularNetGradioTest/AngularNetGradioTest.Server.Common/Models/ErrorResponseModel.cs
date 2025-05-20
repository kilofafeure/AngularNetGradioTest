using AngularNetGradioTest.Server.Common.Enums;
using System.Text.Json.Serialization;

namespace AngularNetGradioTest.Server.Common.Models
{
    public class ErrorResponseModel(CustomErrorList? errorId = null, string errorMessage = "")
    {
        [JsonPropertyName("errorId")]
        public CustomErrorList? ErrorId { get; set; } = errorId;
        [JsonPropertyName("errorMessage")]
        public string ErrorMessage { get; set; } = errorMessage;
    }
}
