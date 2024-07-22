using ToDoApp.Data.DataModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ToDoApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<DataModels.Task> Tasks { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName);
                entity.Property(e => e.LastName);
                entity.Property(e => e.UserName);
                entity.Property(e => e.Email);
                entity.Property(e => e.Password);
            });
            modelBuilder.Entity<DataModels.Task>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e=>e.Title);
                entity.Property(e=>e.Description);
                entity.Property(e=>e.CreatedOn).HasColumnType("datetime");
                entity.Property(e => e.TaskDate).HasColumnType("datetime").HasDefaultValue(DateTime.MinValue);
                entity.Property(e => e.LastModifiedOn).HasColumnType("datetime");
            });
        }
    }
}
