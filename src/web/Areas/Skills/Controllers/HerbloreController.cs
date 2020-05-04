using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.Skills;
using Web.Utilities;

namespace Web.Areas.Skills.Controllers
{
    [Area("Skills")]
    public class HerbloreController : PlayerInfoController
    {
        private readonly IHerbloreService _herbloreService;

        public HerbloreController(IHerbloreService herbloreService)
        {
            _herbloreService = herbloreService;
        }

        public IActionResult Index()
            => View(_herbloreService.GetPotions());
    }
}