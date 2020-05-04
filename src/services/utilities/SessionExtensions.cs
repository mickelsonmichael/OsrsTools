using Microsoft.AspNetCore.Http;
using System.Text;

namespace Services.Utilities
{
    public static class SessionExtensions
    {
        public static ISession SetPlayerName(this ISession session, string playerName)
        {
            session.Set("OsrsTools.PlayerName", Encoding.ASCII.GetBytes(playerName));

            return session;
        }

        public static ISession ClearPlayerName(this ISession session)
        {
            session.Remove("OsrsTools.PlayerName");

            return session;
        }

        public static string GetPlayerName(this ISession session)
        {
            if (session.TryGetValue("OsrsTools.PlayerName", out var bytes))
            {
                return Encoding.ASCII.GetString(bytes);
            }
            else
            {
                return string.Empty;
            }
        }
    }
}
