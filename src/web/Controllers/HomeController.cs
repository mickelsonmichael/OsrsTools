using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Diagnostics;
using System.Linq;
using web.Models;
using Web.Utilities;

namespace web.Controllers
{
    public class HomeController : PlayerInfoController
    {
        public IActionResult Index() => View();

        [HttpPost]
        public IActionResult SetPlayerName(string playerName)
        {
            SetOrClearPlayer(playerName);

            var returnUrl = GetUrlReferrer();

            if (!string.Equals(returnUrl.Host, HttpContext.Request.Host.Host, System.StringComparison.InvariantCultureIgnoreCase))
            {
                return RedirectToAction(nameof(Index));
            }

            return Redirect(returnUrl.ToString());
        }

        public long GetSkillXp(
            string playerName,
            string skill,
            [FromServices] IHiScoreService hiScoreService
        )
        {
            if (string.IsNullOrWhiteSpace(playerName))
                return 0;

            return hiScoreService
                ?.GetHiScore(playerName)
                ?.Skills
                ?.SingleOrDefault(x => string.Equals(x.Name, skill, System.StringComparison.CurrentCultureIgnoreCase))
                ?.XP ?? 0;
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
