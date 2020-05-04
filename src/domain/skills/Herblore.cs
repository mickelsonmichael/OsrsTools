using System.Collections.Generic;

namespace Domain.Skills
{
    public class Herblore
    {
        public ISet<string> Herbs { get; }
        public IList<Potion> Potions { get; }

        public Herblore(
            ISet<string> herbs,
            IList<Potion> potions
        )
        {
            Herbs = herbs;
            Potions = potions;
        }
    }
}