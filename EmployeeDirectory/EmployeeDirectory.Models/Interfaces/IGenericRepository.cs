namespace EmployeeDirectory.Models.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void InsertRecord(T record);
        List<T> GetData();
        void UpdateRecord(T record);
        void DeleteRecord(T record);
    }
}