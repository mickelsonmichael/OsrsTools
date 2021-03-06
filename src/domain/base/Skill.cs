using Domain.Enums;

namespace Domain.Base
{
    public class Skill
    {
        public long XP { get; }
        public int Rank { get; }
        public string Name { get; }
        public int Level { get; }

        public Skill(int index, string[] data)
        {
            Name = ((SkillIndex)index).ToString();
            Level = int.Parse(data[(int)SkillDetail.Level]);
            Rank = int.Parse(data[(int)SkillDetail.Rank]);
            XP = long.Parse(data[(int)SkillDetail.XP]);
        }

        public static Skill NoSkill(SkillIndex skill)
        {
            return new Skill(
                (int)skill,
                new[] { "0", "0", "0" }
            );
        }
    }
}
