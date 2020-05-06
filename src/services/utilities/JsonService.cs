using Newtonsoft.Json;
using System.IO;

namespace Services.utilities
{
    public static class JsonService
    {
        public static T ReadJson<T>(string fileName) where T : class
        {
            var assembly = typeof(JsonService).Assembly;

            using Stream resource = assembly.GetManifestResourceStream(fileName);
            using var reader = new StreamReader(resource);

            return JsonConvert.DeserializeObject<T>(
                reader.ReadToEnd()
            );
        }
    }
}
