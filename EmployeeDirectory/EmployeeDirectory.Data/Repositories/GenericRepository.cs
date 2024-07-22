using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        public void InsertRecord(T record)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Set<T>().Add(record);
                    context.SaveChanges();
                    Console.WriteLine($"{typeof(T).Name} added successfully");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
        public List<T> GetData()
        {
            List<T> data = new List<T>();
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    data = (from item in context.Set<T>() select item).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            return data;
        }
        public void UpdateRecord(T record)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Set<T>().Update(record);
                    context.SaveChanges();
                    Console.WriteLine($"{typeof(T).Name} updated successfully");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
        public void DeleteRecord(T record)
        {
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    context.Set<T>().Update(record);
                    context.SaveChanges();
                    Console.WriteLine($"{typeof(T).Name} deleted successfully");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}