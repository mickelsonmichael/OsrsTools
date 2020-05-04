using Domain.Skills;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.Skills;
using System.Collections.Generic;
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
            => View();

        public IList<Potion> Potions()
            => _herbloreService.GetPotions();
    }
}