using Domain;

namespace Services.Interfaces
{
    public interface IAchievementService
    {
        DiaryRequirements GetDiaryProgress(string playerName);
    }
}