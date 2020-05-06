using Domain;
using Domain.skills;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Services.Interfaces.Skills;
using Services.utilities;
using System.Collections.Generic;

namespace Services.Skills
{
    public class JsonFarmingService : IFarmingService
    {
        private readonly Farming _farming;

        public JsonFarmingService(
            ILogger<JsonFarmingService> logger,
            IOptions<ServiceOptions> config
        )
        {
            var fileName = config.Value.SkillData["Farming"];

            logger.LogInformation("Generating farming data from {FileName}", fileName);

            _farming = JsonService.ReadJson<Farming>(fileName);
        }

        public ISet<Herb> GetHerbs() => _farming.Herbs;
    }
}
