using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Services.Interfaces;
using Services.Interfaces.Skills;
using Services.Skills;

namespace Services
{
    public static class ServiceRegistrations
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            // singletons
            services.AddSingleton<IMemoryCache, MemoryCache>()
                .AddSingleton<IHiScoreService, HiScoreService>()
                .AddSingleton<IAchievementService, AchievementService>()
                .AddSingleton<IHerbloreService, JsonHerbloreService>()
                .AddSingleton<IFarmingService, JsonFarmingService>();

            return services;
        }
    }
}