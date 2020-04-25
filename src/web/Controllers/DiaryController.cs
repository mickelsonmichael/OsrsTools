using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using web.Models;
using Services.Interfaces;

namespace web.Controllers
{
    public class DiaryController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public DiaryController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetDiaryRequirements(string playerName,
            [FromServices] IAchievementService achievementService)
        {
            if (string.IsNullOrWhiteSpace(playerName))
            {
                return View(nameof(Index));
            }

            var reqs = achievementService.GetDiaryProgress(playerName);

            Console.WriteLine(reqs.Diaries);
            return View("Requirements", reqs);
        }
    }
}
