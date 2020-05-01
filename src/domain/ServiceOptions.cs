namespace Domain
{
    public class ServiceOptions
    {
        public string ApiUrl { get; set; }
        public byte RetryAttempts { get; set; }
        public string DiaryFileName { get; set; }
    }
}
