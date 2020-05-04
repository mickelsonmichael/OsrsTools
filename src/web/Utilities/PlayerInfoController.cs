using Microsoft.AspNetCore.Mvc;
using System;

namespace Web.Utilities
{
    public class PlayerInfoController : Controller
    {
        public void SetOrClearPlayer(string playerName)
        {
            if (string.IsNullOrWhiteSpace(playerName))
            {
                ClearPlayerName();
            }
            else
            {
                SetPlayerName(playerName);
            }
        }

        public string GetPlayerName()
            => ControllerContext.HttpContext.Session.GetPlayerName();

        private void ClearPlayerName()
            => ControllerContext.HttpContext.Session.ClearPlayerName();
        private void SetPlayerName(string playerName)
            => ControllerContext.HttpContext.Session.SetPlayerName(playerName);
        public Uri GetUrlReferrer()
            => new Uri(ControllerContext.HttpContext.Request.Headers["Referer"]);
    }
}
