using System;
using Microsoft.AspNetCore.Mvc;
using web.Models;
using Services.Interfaces;
using System.Diagnostics;

namespace web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

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
