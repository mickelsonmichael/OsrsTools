using Newtonsoft.Json;

namespace Domain
{
    public class Difficulty
    {
        public short Overall { get; }
        
        public byte Attack { get; }
        
        public byte Defence { get; }
        
        public byte Hitpoints { get; }
        
        public byte Ranged { get; }
        
        public byte Prayer { get; }
        
        public byte Magic { get; }
        
        public byte Cooking { get; }
        
        public byte Woodcutting { get; }
        
        public byte Fletching { get; }
        
        public byte Fishing { get; }
        
        public byte Firemaking { get; }
        
        public byte Crafting { get; }
        
        public byte Smithing { get; }
        
        public byte Mining { get; }
        
        public byte Herblore { get; }
        
        public byte Agility { get; }
        
        public byte Thieving { get; }
        
        public byte Slayer { get; }
        
        public byte Farming { get; }
        
        public byte Runecrafting { get; }
        
        public byte Hunter { get; }
        
        public byte Construction { get; }

        public Difficulty(
            short overall,
            byte attack,
            byte defence,
            byte hitpoints,
            byte ranged,
            byte prayer,
            byte magic,
            byte cooking,
            byte woodcutting,
            byte fletching,
            byte fishing,
            byte firemaking,
            byte crafting,
            byte smithing,
            byte mining,
            byte herblore,
            byte agility,
            byte thieving,
            byte slayer,
            byte farming,
            byte runecrafting,
            byte hunter,
            byte construction
        )
        {
            Overall = overall;
            Attack = attack;
            Defence = defence;
            Hitpoints = hitpoints;
            Ranged = ranged;
            Prayer = prayer;
            Magic = magic;
            Cooking = cooking;
            Woodcutting = woodcutting;
            Fletching = fletching;
            Fishing = fishing;
            Firemaking = firemaking;
            Crafting = crafting;
            Smithing = smithing;
            Mining = mining;
            Herblore = herblore;
            Agility = agility;
            Thieving = thieving;
            Slayer = slayer;
            Farming = farming;
            Runecrafting = runecrafting;
            Hunter = hunter;
            Construction = construction;
        }
    }
}
