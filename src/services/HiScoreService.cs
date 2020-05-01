using Domain;
using Domain.Base;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Services
{
    public class HiScoreService : IHiScoreService
    {
        private const string _apiUrl = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
        private readonly WebClient _client = new WebClient();
        private readonly IMemoryCache _cache;
        private readonly ILogger<HiScoreService> _logger;
        private const byte _retryAttempts = 3;

        public HiScoreService(IMemoryCache cache, ILogger<HiScoreService> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        public HiScore GetHiScore(string playerName)
        {
            _logger.LogInformation("Getting HiScores for {PlayerName}", playerName);

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
            _logger.LogInformation("Retrieving updated information for {PlayerName}", playerName);

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

            _logger.LogDebug("Getting information from {ApiUrl}", _apiUrl);

            try
            {
                while(true)
                {
                    dataString = _client.DownloadString(_apiUrl + playerName);

                    if (string.IsNullOrEmpty(dataString))
                    {
                        throw new HiScoreRetrievalException("Empty string retrieved from API.");
                    }

                    return dataString;
                }
            }
            catch (Exception ex)
                when (attemptCount < _retryAttempts)
            {
                _logger.LogError("Failed attempt to gather data from HiScores. Attempt {AttemptCount}/{RetryAttempts}", ex, attemptCount, _retryAttempts);
                attemptCount++;
            }
            catch
            {
                _logger.LogCritical("Retries failed for {PlayerName}. {RetryAttempts} retry attempts.", playerName, _retryAttempts);

                throw; // retries failed, just throw
            }

            return dataString;
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