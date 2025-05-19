using AngularNetGradioTest.Server.Common.Enums;
using AngularNetGradioTest.Server.Common.Helpers;
using AngularNetGradioTest.Server.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetGradioTest.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController(ILogger<LoginController> logger) : ControllerBase
    {
        private readonly ILogger<LoginController> _logger = logger;

        [HttpPost(Name = "Login")]
        public LoginResponseModel Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid && model.Email == "admin@admin.com" && model.Password == "admin")
            {
                return new LoginResponseModel();
            }
            return new LoginResponseModel(CustomErrorList.LoginNotAllowed, ExtensionMethodHelper.GetEnumDescription(CustomErrorList.LoginNotAllowed));
        }
    }
}
