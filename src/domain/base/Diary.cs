using System.Text.Json;
using System.Collections.Generic;

namespace Domain.Base
{
    public class Diary
    {
        public Difficulty Easy { get; }
        public Difficulty Medium { get; }
        public Difficulty Hard { get; }
        public Difficulty Elite { get; }

        public Diary(Difficulty easy,
            Difficulty medium,
            Difficulty hard,
            Difficulty elite)
        {
            Easy = easy;
            Medium = medium;
            Hard = hard;
            Elite = elite;
        }

        public IEnumerable<(string Name, Difficulty Difficulty)> GetDifficulties()
        {
            yield return (nameof(Easy), Easy);
            yield return (nameof(Medium), Medium);
            yield return (nameof(Hard), Hard);
            yield return (nameof(Elite), Elite);
        }
    }
}