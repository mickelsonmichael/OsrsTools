using System.Collections.Generic;

namespace Domain.Skills
{
    public class Potion
    {
        public string Id => Name.ToLower().Replace(" ", "_");
        public string Name { get; }
        public string PotionFilename { get; }
        public double XP { get; }
        public double CleanXP { get; }
        public byte Level { get; }
        public string Herb { get; }
        public string CleanFilename { get; }
        public string GrimyFilename { get; }
        public ISet<string> Ingredients { get; }

        public Potion(
            string name,
            string potionFilename,
            double xp,
            double cleanXp,
            byte level,
            string herb,
            string cleanFilename,
            string grimyFilename,
            ISet<string> ingredients
        )
        {
            Name = name;
            PotionFilename = potionFilename;
            XP = xp;
            CleanXP = cleanXp;
            Level = level;
            Herb = herb;
            Ingredients = ingredients;
            GrimyFilename = grimyFilename;
            CleanFilename = cleanFilename;
        }
    }
}