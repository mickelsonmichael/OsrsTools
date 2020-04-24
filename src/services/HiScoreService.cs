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
        const string _apiUrl = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
        private WebClient _client = new WebClient();
        
        public HiScore GetHiScore(string playerName)
        {
            var dataString = _client.DownloadString(_apiUrl + playerName);

            return new HiScore(
                playerName, 
                ParseHighScore(dataString)
            );
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