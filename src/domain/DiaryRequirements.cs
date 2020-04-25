using System.Collections.Generic;
using Domain.Base;

namespace Domain
{
    public class DiaryRequirements
    {
        public HiScore Levels { get; }
        public Diaries Diaries { get; }

        public DiaryRequirements(HiScore hiScore, Diaries diaries)
        {
            Levels = hiScore;
            Diaries = diaries;
        }
    }
}
