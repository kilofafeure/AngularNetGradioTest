using AngularNetGradioTest.Server.Common.Enums;
using AngularNetGradioTest.Server.Common.Helpers;
using AngularNetGradioTest.Server.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetGradioTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController(ILogger<WeatherForecastController> logger) : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        private readonly ILogger<WeatherForecastController> _logger = logger;

        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<WeatherForecast> items = Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                }).ToArray();

                return Ok(items);
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
