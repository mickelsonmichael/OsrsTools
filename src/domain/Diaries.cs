using Domain.Base;
using System.Collections.Generic;

namespace Domain
{
    public class Diaries
    {
        public Diary Kandarin { get; }
        public Diary Ardougne { get; }
        public Diary Falador { get; }
        public Diary Fremennik { get; }
        public Diary Desert { get; }
        public Diary Karamja { get; }

        public Diaries(Diary kandarin,
            Diary ardougne,
            Diary falador,
            Diary fremennik,
            Diary desert,
            Diary karamja)
        {
            Kandarin = kandarin;
            Ardougne = ardougne;
            Falador = falador;
            Fremennik = fremennik;
            Desert = desert;
            Karamja = karamja;
        }

        public IEnumerable<(string Name, Diary Diary)> GetDiaries()
        {
            yield return (nameof(Ardougne), Ardougne);
            yield return (nameof(Falador), Falador);
            yield return (nameof(Fremennik), Fremennik);
            yield return (nameof(Karamja), Karamja);
            yield return (nameof(Kandarin), Kandarin);
        }
    }
}