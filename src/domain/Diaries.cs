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
        public Diary Kourend { get; }
        public Diary Lumbridge { get; }
        public Diary Morytania { get; }
        public Diary Varrock { get; }
        public Diary Western { get; }

        public Diaries(Diary kandarin,
            Diary ardougne,
            Diary falador,
            Diary fremennik,
            Diary desert,
            Diary karamja,
            Diary kourend,
            Diary lumbridge,
            Diary morytania, Diary varrock, Diary western)
        {
            Kandarin = kandarin;
            Ardougne = ardougne;
            Falador = falador;
            Fremennik = fremennik;
            Desert = desert;
            Karamja = karamja;
            Kourend = kourend;
            Lumbridge = lumbridge;
            Morytania = morytania;
            Varrock = varrock;
            Western = western;
        }

        public IEnumerable<(string Name, Diary Diary)> GetDiaries()
        {
            yield return (nameof(Ardougne), Ardougne);
            yield return (nameof(Falador), Falador);
            yield return (nameof(Fremennik), Fremennik);
            yield return (nameof(Kandarin), Kandarin);
            yield return (nameof(Karamja), Karamja);
            yield return (nameof(Kourend), Kourend);
            yield return (nameof(Lumbridge), Lumbridge);
            yield return (nameof(Morytania), Morytania);
            yield return (nameof(Varrock), Varrock);
            yield return ("Western Provinces", Western);
        }
    }
}