using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
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
        private IMemoryCache _cache;
        private readonly ILogger<HiScoreService> _logger;
        private const byte _retryAttempts = 3;

        public HiScoreService(IMemoryCache cache, ILogger<HiScoreService> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        public HiScore GetHiScore(string playerName)
        {
            _logger.LogInformation($"Getting HiScores for {playerName}");

            return _cache.GetOrCreate(
                playerName,
                entry => 
                {
                    entry.SetAbsoluteExpiration(TimeSpan.FromMinutes(60));
                    entry.SetSlidingExpiration(TimeSpan.FromMinutes(15));

                    return RetrieveFromApi(playerName);
                }
            );
        }

        private HiScore RetrieveFromApi(string playerName)
        {
            _logger.LogInformation($"Retrieving updated information for {playerName}");

            var dataString = GetDataString(playerName);
            
            _logger.LogDebug(dataString);

            return new HiScore(
                playerName, 
                ParseHighScore(dataString)
            );
        }

        private string GetDataString(string playerName)
        {
            string dataString = string.Empty;
            byte attemptCount = 1;

            try 
            {
                while(true)
                {
                    dataString = _client.DownloadString(_apiUrl + playerName);

                    if (string.IsNullOrEmpty(dataString))
                    {
                        throw new Exception("Empty string retrieved from database");
                    }

                    return dataString;
                }
            }
            catch (Exception ex)
                when (attemptCount < _retryAttempts)
            {
                _logger.LogError($"Failed attempt to gather data from HiScores. Attempt {attemptCount}/{_retryAttempts}", ex);
                attemptCount++;
            }
            catch
            {
                throw; // retries failed, just throw
            }

            return string.Empty;
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