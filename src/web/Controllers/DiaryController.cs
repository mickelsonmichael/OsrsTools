using System;
using Microsoft.AspNetCore.Mvc;
using web.Models;
using Services.Interfaces;

namespace web.Controllers
{
    public class DiaryController : Controller
    {
        [HttpPost]
        public IActionResult Index(string playerName,
            [FromServices] IAchievementService achievementService)
        {
            if (string.IsNullOrWhiteSpace(playerName))
            {
                return View("Index", "Home");
            }

            return View(
                achievementService.GetDiaryProgress(playerName)
            );
        }
    }
}
