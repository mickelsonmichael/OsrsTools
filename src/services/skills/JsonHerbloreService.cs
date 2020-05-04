using Microsoft.Extensions.Logging;
using Services.Interfaces.Skills;
using Domain.Skills;
using Microsoft.Extensions.Options;
using Domain;
using System.Linq;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Services.Skills
{
    public class JsonHerbloreService : IHerbloreService
    {
        private readonly ILogger<JsonHerbloreService> _logger;
        private readonly string _dataFileName;
        private Herblore _herblore;

        public JsonHerbloreService(
            ILogger<JsonHerbloreService> logger,
            IOptions<ServiceOptions> config
        )
        {
            _logger = logger;
            _dataFileName = config.Value
                .SkillData
                .Single(x => x.SkillName == "Herblore")
                .FileName;

            _herblore = ReadJson();
        }

        public IList<Potion> GetPotions() => _herblore.Potions;

        private Herblore ReadJson()
        {
            var assembly = typeof(JsonHerbloreService).Assembly;

            _logger.LogInformation(
                "Populating diaries from {FileName} in {Assembly}",
                _dataFileName,
                assembly.FullName);

            using Stream resource = assembly.GetManifestResourceStream(_dataFileName);
            using var reader = new StreamReader(resource);
            var json = reader.ReadToEnd();

            _logger.LogDebug("JSON retrieved: {Json}", json);

            return JsonConvert.DeserializeObject<Herblore>(json);
        }
    }
}