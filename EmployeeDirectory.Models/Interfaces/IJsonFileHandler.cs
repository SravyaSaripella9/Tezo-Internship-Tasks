namespace EmployeeDirectory.Models.Interfaces
{
    public interface IJsonFileHandler
    {
        void WriteToJsonFile<T>(object obj);
        List<T> GetData<T>();
        string GetFilePath<T>();
    }
}
