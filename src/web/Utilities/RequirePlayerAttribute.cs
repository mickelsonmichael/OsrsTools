using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Web.Utilities
{
    public class RequirePlayerAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var playerName = context.HttpContext.Session.GetPlayerName();

            if (string.IsNullOrWhiteSpace(playerName))
            {
                context.Result = new ViewResult
                {
                    ViewName = "SetPlayerName"
                };
            }
        }
    }
}
