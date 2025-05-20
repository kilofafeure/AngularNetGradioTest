using AngularNetGradioTest.Server.Common.Enums;
using AngularNetGradioTest.Server.Common.Helpers;
using AngularNetGradioTest.Server.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetGradioTest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(ILogger<LoginController> logger) : ControllerBase
    {
        private readonly ILogger<LoginController> _logger = logger;

        [HttpPost(Name = "Login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            try
            {
                // TODO : NEEEDED VALIDATIONS
                // TODO : NEEEDED VALIDATIONS
                if (ModelState.IsValid && model.Email == "admin@admin.com" && model.Password == "admin")
                {
                    // TODO : CREATE JWT TOKEN
                    // TODO : CREATE JWT TOKEN
                    return Ok(new LoginResponseModel());
                }
                return BadRequest(new LoginResponseModel(CustomErrorList.LoginNotAllowed, ExtensionMethodHelper.GetEnumDescription(CustomErrorList.LoginNotAllowed)));
            }
            catch (Exception ex)
            {
                // TODO : IMPLEMENT LOGS
                // TODO : IMPLEMENT LOGS
                return BadRequest(new LoginResponseModel(CustomErrorList.UnknownError, ExceptionHelper.GetFullExceptionMessage(ex)));
            }
        }
    }
}
