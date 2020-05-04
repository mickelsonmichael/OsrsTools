using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Utilities;

namespace web.Controllers
{
    public class DiaryController : Controller
    {
        public IActionResult Index(
            [FromServices] IAchievementService achievementService
        )
        {
            string playerName = HttpContext.Session.GetPlayerName();

            if (string.IsNullOrWhiteSpace(playerName))
            {
                return View("SetPlayerName");
            }

            return View(
                achievementService.GetDiaryProgress(playerName)
            );
        }
    }
}
