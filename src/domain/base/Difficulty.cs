using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Domain
{
    public class Difficulty
    {
        [JsonProperty]
        public short Overall { get; private set; }
        [JsonProperty]
        public byte Attack { get; private set; }
        [JsonProperty]
        public byte Defence { get; private set; }
        [JsonProperty]
        public byte Hitpoints { get; private set; }
        [JsonProperty]
        public byte Ranged { get; private set; }
        [JsonProperty]
        public byte Prayer { get; private set; }
        [JsonProperty]
        public byte Magic { get; private set; }
        [JsonProperty]
        public byte Cooking { get; private set; }
        [JsonProperty]
        public byte Woodcutting { get; private set; }
        [JsonProperty]
        public byte Fletching { get; private set; }
        [JsonProperty]
        public byte Fishing { get; private set; }
        [JsonProperty]
        public byte Firemaking { get; private set; }
        [JsonProperty]
        public byte Crafting { get; private set; }
        [JsonProperty]
        public byte Smithing { get; private set; }
        [JsonProperty]
        public byte Mining { get; private set; }
        [JsonProperty]
        public byte Herblore { get; private set; }
        [JsonProperty]
        public byte Agility { get; private set; }
        [JsonProperty]
        public byte Thieving { get; private set; }
        [JsonProperty]
        public byte Slayer { get; private set; }
        [JsonProperty]
        public byte Farming { get; private set; }
        [JsonProperty]
        public byte Runecraft { get; private set; }
        [JsonProperty]
        public byte Hunter { get; private set; }
        [JsonProperty]
        public byte Construction { get; private set; }
        [JsonProperty]
        public string[] Quests { get; private set; }
        [JsonProperty]
        public string[] Boostable { get; private set; }
        [JsonProperty]
        public short QuestPoints { get; private set; }
        [JsonProperty]
        public Difficulty Ironmen { get; private set; }

        public short this[string skillName]
        {
            get 
            {
                return (byte)(GetType()
                .GetProperty(skillName)
                .GetValue(this, null));
            }
        }

        public IEnumerable<(string Name, short Level)> GetSkills()
        {
            yield return (nameof(Attack), Attack);
            yield return (nameof(Defence), Defence);
            yield return (nameof(Hitpoints), Hitpoints);
            yield return (nameof(Ranged), Ranged);
            yield return (nameof(Prayer), Prayer);
            yield return (nameof(Magic), Magic);
            yield return (nameof(Cooking), Cooking);
            yield return (nameof(Woodcutting), Woodcutting);
            yield return (nameof(Fletching), Fletching);
            yield return (nameof(Fishing), Fishing);
            yield return (nameof(Firemaking), Firemaking);
            yield return (nameof(Crafting), Crafting);
            yield return (nameof(Smithing), Smithing);
            yield return (nameof(Mining), Mining);
            yield return (nameof(Herblore), Herblore);
            yield return (nameof(Agility), Agility);
            yield return (nameof(Thieving), Thieving);
            yield return (nameof(Slayer), Slayer);
            yield return (nameof(Farming), Farming);
            yield return (nameof(Runecraft), Runecraft);
            yield return (nameof(Hunter), Hunter);
            yield return (nameof(Construction), Construction);
        }
    }
}
