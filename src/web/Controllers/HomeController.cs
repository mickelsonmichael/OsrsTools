using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Utilities;
using System.Diagnostics;
using web.Models;

namespace web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        [HttpPost]
        public IActionResult SetPlayerName(
            string playerName
        )
        {
            if (string.IsNullOrWhiteSpace(playerName))
            {
                ControllerContext
                    .HttpContext
                    .Session
                    .ClearPlayerName();
            }
            else
            {
                ControllerContext
                    .HttpContext
                    .Session
                    .SetPlayerName(playerName);
            }

            var returnUrl = new System.Uri(ControllerContext.HttpContext.Request.Headers["Referer"]);

            if (!string.Equals(
                    returnUrl.Host,
                    HttpContext.Request.Host.Host,
                    System.StringComparison.InvariantCultureIgnoreCase)
            )
            {
                return RedirectToAction(nameof(Index));
            }

            return Redirect(returnUrl.ToString());
        }

        [HttpPost]
        public IActionResult GetHiScores(string playerName,
            [FromServices] IHiScoreService hiScoreService)
        {
            if (string.IsNullOrWhiteSpace(playerName))
            {
                return View(nameof(Index));
            }

            return View(
                hiScoreService.GetHiScore(playerName)
            );
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
