using Services.Interfaces;
using Domain;
using Domain.Enums;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IHiScoreService _hiScoreService;
        private readonly Diaries _diaries;

        public AchievementService(IHiScoreService hiScoreService)
        {
            _hiScoreService = hiScoreService;
            _diaries = GetDiaries();
        }

        public DiaryRequirements GetDiaryProgress(string playerName)
        {
            var hiScore = _hiScoreService.GetHiScore(playerName);

            return new DiaryRequirements(hiScore, _diaries);
        }

        private Diaries GetDiaries()
        {
            var assembly = typeof(AchievementService).Assembly;
            var names = assembly.GetManifestResourceNames();
            using Stream resource = assembly.GetManifestResourceStream("Services.diaries.json");
            using var reader = new StreamReader(resource);

            var json = reader.ReadToEnd();
            System.Console.WriteLine(json);
            return JsonConvert.DeserializeObject<Diaries>(json);
        }

        
    }
}