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
        public LoginModel Login([FromBody] FullLoginModel model)
        {
            if (ModelState.IsValid && model.Email == "admin@admin.com" && model.Password == "admin")
            {
                return new LoginModel(model.Email);
            }
            return new LoginModel();
        }
    }
}
