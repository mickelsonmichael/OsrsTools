using Domain.Base;
using Domain.Enums;
using Domain.Skills;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.Skills;
using System.Collections.Generic;
using System.Linq;
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

        public IActionResult Index(
            [FromServices] Services.Interfaces.IHiScoreService hiScoreService    
        )
        {
            var playerName = GetPlayerName();

            if (string.IsNullOrWhiteSpace(playerName))
            {
                return View((Skill.NoSkill(SkillIndex.Herblore), Skill.NoSkill(SkillIndex.Farming)));
            }

            var skills = hiScoreService.GetHiScore(GetPlayerName())?.Skills;

            var herbloreSkill = skills
                ?.Single(x => x.Name == nameof(SkillIndex.Herblore));

            var farmingSkill = skills
                ?.Single(x => x.Name == nameof(SkillIndex.Farming));

            return View((herbloreSkill, farmingSkill));
        }

        public IList<Potion> Potions()
            => _herbloreService.GetPotions();
    }
}