using System.Text.Json;

namespace Domain.Base
{
    public class Diary
    {
        public Difficulty Easy { get; set; }
        public Difficulty Medium { get; set; }
        public Difficulty Hard { get; set; }
        public Difficulty Elite { get; set; }
    }
}