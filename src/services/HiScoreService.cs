using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using Services.Interfaces;
using Domain;
using Domain.Enums;
using static Domain.Enums.SkillIndex;
using static Domain.Enums.SkillDetail;

namespace Services
{
    public class HiScoreService : IHiScoreService
    {
        private WebClient _client = new WebClient();
        const string _apiUrl = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
        
        public HiScore GetHiScore(string playerName)
        {
            var test = _client.DownloadString(_apiUrl + playerName);
            var skills = ParseHighScore(test);

            Console.WriteLine(test);

            return new HiScore(playerName, skills);
        }

        private IEnumerable<Skill> ParseHighScore(string data)
        {
            return data
                .Split('\n')
                .Take(24)
                .Select(x => x.Split(','))
                .Select((x, i) => new Skill(i, x));
        }
    }
}