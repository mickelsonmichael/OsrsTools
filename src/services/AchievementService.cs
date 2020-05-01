using Domain;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Services.Interfaces;
using System.IO;

namespace Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IHiScoreService _hiScoreService;
        private readonly Diaries _diaries;
        private readonly ILogger<AchievementService> _logger;
        private readonly string _fileName;

        public AchievementService(IHiScoreService hiScoreService, ILogger<AchievementService> logger, IOptions<ServiceOptions> config)
        {
            _hiScoreService = hiScoreService;
            _logger = logger;
            _fileName = config.Value.DiaryFileName;

            _diaries = GetDiaries();
        }

        public DiaryRequirements GetDiaryProgress(string playerName)
        {
            _logger.LogInformation("Diary progress requested for {PlayerName}.", playerName);

            var hiScore = _hiScoreService.GetHiScore(playerName);

            return new DiaryRequirements(hiScore, _diaries);
        }

        private Diaries GetDiaries()
        {
            var assembly = typeof(AchievementService).Assembly;

            _logger.LogInformation("Populating diaries from {FileName} in {Assembly}", _fileName, assembly);

            using Stream resource = assembly.GetManifestResourceStream(_fileName);
            using var reader = new StreamReader(resource);
            var json = reader.ReadToEnd();

            _logger.LogDebug("JSON retrieved: {Json}", json);

            return JsonConvert.DeserializeObject<Diaries>(json);
        }
    }
}
