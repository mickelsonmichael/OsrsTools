using Domain.Skills;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Services.Interfaces.Skills
{
    public interface IHerbloreService
    {
        IList<Potion> GetPotions();
    }
}