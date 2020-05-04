using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Web.Utilities;

namespace web.Controllers
{
    public class DiaryController : Controller
    {
        [RequirePlayer]
        public IActionResult Index([FromServices] IAchievementService achievementService)
        {
            return View(
                achievementService.GetDiaryProgress(
                    HttpContext.Session.GetPlayerName()
                )
            );
        }
    }
}
