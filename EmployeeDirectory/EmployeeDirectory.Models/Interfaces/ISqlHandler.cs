namespace EmployeeDirectory.Models.Interfaces
{
    public interface ISqlHandler
    {
        string GetConnectionString();
        void InsertRecord<T>(T record);
        List<T> GetData<T>() where T : new();
        void UpdateRecord<T>(T record);
        void DeleteRecord(Employee employee);
    }
}
