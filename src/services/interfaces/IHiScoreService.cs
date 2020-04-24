using Domain;

namespace Services.Interfaces
{
    public interface IHiScoreService
    {
        HiScore GetHiScore(string playerName);
    }
}