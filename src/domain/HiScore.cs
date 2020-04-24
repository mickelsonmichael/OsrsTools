using System.Collections.Generic;

namespace Domain
{
    public class HiScore
    {
        public string PlayerName { get; }
        public IEnumerable<Skill> Skills { get; }

        public HiScore(string playerName, IEnumerable<Skill> skills)
        {
            Skills = skills;
            PlayerName = playerName;
        }
    }
}