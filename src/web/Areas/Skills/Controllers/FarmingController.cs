using Domain.skills;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.Skills;
using System.Collections.Generic;

namespace Web.Areas.Skills.Controllers
{
    [Area("Skills")]
    public class FarmingController : Controller
    {
        public ISet<Herb> GetHerbs([FromServices] IFarmingService farmingService) => farmingService.GetHerbs();
    }
}