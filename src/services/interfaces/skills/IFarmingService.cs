using Domain.skills;
using System.Collections.Generic;

namespace Services.Interfaces.Skills
{
    public interface IFarmingService
    {
        ISet<Herb> GetHerbs();
    }
}
