using Domain;
using Domain.Skills;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Services.Interfaces.Skills;
using Services.utilities;
using System.Collections.Generic;

namespace Services.Skills
{
    public class JsonHerbloreService : IHerbloreService
    {
        private readonly Herblore _herblore;

        public JsonHerbloreService(
            ILogger<JsonHerbloreService> logger,
            IOptions<ServiceOptions> config
        )
        {
            var fileName = config.Value.SkillData["Herblore"];

            logger.LogInformation("Generating herblore data from {FileName}", fileName);

            _herblore = JsonService.ReadJson<Herblore>(fileName);
        }

        public IList<Potion> GetPotions() => _herblore.Potions;
    }
}