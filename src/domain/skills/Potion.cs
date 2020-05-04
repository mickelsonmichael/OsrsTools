using System.Collections.Generic;

namespace Domain.Skills
{
    public class Potion
    {
        public string Name { get; }
        public short XP { get; }
        public byte Level { get; }
        public string Herb { get; }
        public ISet<string> Ingredients { get; }

        public Potion(
            string name,
            short xp,
            byte level,
            string herb,
            ISet<string> ingredients
        )
        {
            Name = name;
            XP = xp;
            Level = level;
            Herb = herb;
            Ingredients = ingredients;
        }
    }
}