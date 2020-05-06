using System.Collections.Generic;

namespace Domain.skills
{
    public class Farming
    {
        public ISet<Herb> Herbs { get; }

        public Farming(ISet<Herb> herbs)
        {
            Herbs = herbs;
        }
    }

    public class Herb
    {
        public string Name { get; }
        public byte FarmingLevel { get; }
        public double PlantXp { get; }
        public double HarvestXp { get; }
        public byte Level1Chance { get; }
        public byte Level99Chance { get; }

        public Herb(
            string name,
            byte farmingLevel,
            double plantXp,
            double harvestXp,
            byte level1Chance,
            byte level99Chance
        )
        {
            Name = name;
            FarmingLevel = farmingLevel;
            PlantXp = plantXp;
            HarvestXp = harvestXp;
            Level1Chance = level1Chance;
            Level99Chance = level99Chance;
        }

    }
}
