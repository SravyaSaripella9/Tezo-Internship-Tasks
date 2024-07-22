using ToDoApp.Models;

namespace ToDoApp.Data.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        void InsertRecord(T record);
        List<T> GetAll();
        T GetById(int id);
        void UpdateRecord(T record);
        void DeleteRecord(T record);
        void DeleteAllRecords(List<T> records);
    }
}
