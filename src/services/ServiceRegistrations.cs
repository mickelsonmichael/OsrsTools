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
            services.AddSingleton<IMemoryCache, MemoryCache>();
            services.AddSingleton<IHiScoreService, HiScoreService>();
            services.AddSingleton<IAchievementService, AchievementService>();
            services.AddSingleton<IHerbloreService, JsonHerbloreService>();

            return services;
        }
    }
}