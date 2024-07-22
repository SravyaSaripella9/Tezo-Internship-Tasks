namespace EmployeeDirectory.Models.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void InsertRecord(T record);
        List<T> GetAll();
        T? GetById(object id);
        void UpdateRecord(T record);
        void DeleteRecord(T record);
    }
}