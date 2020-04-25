using Domain.Base;
using System.Collections.Generic;

namespace Domain
{
    public class Diaries
    {
        public Diary Kandarin { get; }

        public Diaries(Diary kandarin)
        {
            Kandarin = kandarin;
        }

        public IEnumerable<(string Name, Diary Diary)> GetDiaries()
        {
            yield return (nameof(Kandarin), Kandarin);

        }
    }
}