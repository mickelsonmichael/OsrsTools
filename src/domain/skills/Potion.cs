using System.Collections.Generic;

namespace Domain.Skills
{
    public class Potion
    {
        public string Name { get; }
        public double XP { get; }
        public double CleanXP { get; }
        public byte Level { get; }
        public string Herb { get; }
        public ISet<string> Ingredients { get; }

        public Potion(
            string name,
            double xp,
            double cleanXp,
            byte level,
            string herb,
            ISet<string> ingredients
        )
        {
            Name = name;
            XP = xp;
            CleanXP = cleanXp;
            Level = level;
            Herb = herb;
            Ingredients = ingredients;
        }
    }
}