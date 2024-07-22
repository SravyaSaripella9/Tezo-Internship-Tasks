using EmployeeDirectory.Data.Extensions;
using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data
{
    public class JsonFileHandler : IJsonFileHandler
    {
        public void WriteToJsonFile<T>(object obj)
        {
            string jsonData = obj.ToJson();
            string filePath = GetFilePath<T>();
            File.WriteAllText(filePath, jsonData);
        }
        public List<T> GetData<T>()
        {
            string filePath=GetFilePath<T>();
            if (File.Exists(filePath))
            {
                string jsonData = File.ReadAllText(filePath);
                return jsonData.ToObjectFromJson<List<T>>() ?? new List<T>();
            }
            else
                return new List<T>();
        }
        public string GetFilePath<T>()
        {
            string filePath = "";
            var assm = typeof(JsonFileHandler).Assembly;
            var rootPath = Path.GetDirectoryName(assm.Location)!;
            if (typeof(T) == typeof(Employee))
                filePath = Path.Combine(rootPath, "employees.json");
            else if (typeof(T) == typeof(Role))
                filePath = Path.Combine(rootPath, "roles.json");
            else if (typeof(T) == typeof(Location))
                filePath = Path.Combine(rootPath, "locations.json");
            else if (typeof(T) == typeof(Department))
                filePath = Path.Combine(rootPath, "departments.json");
            else if (typeof(T) == typeof(Project))
                filePath = Path.Combine(rootPath, "projects.json"); 
            return filePath;
        }
    }
}