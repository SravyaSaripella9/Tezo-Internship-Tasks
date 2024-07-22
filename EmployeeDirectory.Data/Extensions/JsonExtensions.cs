using Newtonsoft.Json;

namespace EmployeeDirectory.Data.Extensions
{
    public static class JsonExtensions
    {
        public static string ToJson(this object obj)
        {
            try
            {
                string jsonString = JsonConvert.SerializeObject(obj, Formatting.Indented);
                return jsonString;
            }
            catch(Exception ex)
            {
                return "";
            }
        }
        public static T? ToObjectFromJson<T>(this string str)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(str))
                {
                    return default;
                }
                T? obj = JsonConvert.DeserializeObject<T?>(str) ?? default;
                return obj;
            }
            catch (Exception ex)
            {
                return default;
            }
        }
    }
}