using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        ApplicationDbContext context;
        public GenericRepository(ApplicationDbContext context)
        {
            this.context = context;
        }
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
        public T? GetById(object id)
        {
            T? record = null;
            record = context.Set<T>().Find(id);
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
    }
}