using ToDoApp.Models;
using ToDoApp.Data.Interfaces;

namespace ToDoApp.Data.Repositories
{
    public class GenericRepository<T>(ApplicationDbContext context) : IGenericRepository<T> where T : BaseEntity
    {
        public void InsertRecord(T record)
        {
            context.Set<T>().Add(record);
            context.SaveChanges();
        }
        public List<T> GetAll()
        {
            List<T> data = new List<T>();
            data = (from item in context.Set<T>() select item).ToList();
            return data;
        }
        public T GetById(int id)
        {
            T record;
            record = context.Set<T>().Single<T>(x => x.Id.Equals(id));
            return record;
        }
        public void UpdateRecord(T record)
        {
            context.Set<T>().Update(record);
            context.SaveChanges();
        }
        public void DeleteRecord(T record)
        {
            context.Set<T>().Update(record);
            context.SaveChanges();
        }
        public void DeleteAllRecords(List<T> records)
        {
            foreach (T record in records)
                context.Set<T>().Update(record);
            context.SaveChanges();
        }
    }
}
