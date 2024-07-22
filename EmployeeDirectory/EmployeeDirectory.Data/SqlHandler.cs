using System.Data;
using EmployeeDirectory.Models;
using System.Data.SqlClient;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data
{
    public class SqlHandler : ISqlHandler
    {
        public string GetConnectionString()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            return configuration.GetConnectionString("DefaultConnection");
        }
        public void InsertRecord<T>(T record)
        {
            string connectionString = GetConnectionString();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                PropertyInfo[] properties = typeof(T).GetProperties().Where(property => property.Name != "Id").ToArray();
                string columns = string.Join(",", properties.Select(p => p.Name));
                string values = string.Join(",", properties.Select(p => "@" + p.Name));
                string query=$"Insert into {typeof(T).Name}s ({columns}) values ({values})";
                SqlCommand command =new SqlCommand(query, connection);
                foreach (PropertyInfo property in properties)
                {
                    object? value = property.GetValue(record);
                    command.Parameters.AddWithValue($"@{property.Name}", value ?? DBNull.Value);
                }
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                    Console.WriteLine($"{typeof(T).Name} added successfully");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
        }
        public List<T> GetData<T>() where T : new()
        {
            List<T> list = new List<T>();
            string connectionString = GetConnectionString();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand($"Select * from {typeof(T).Name}s", connection);
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        T item = new T();
                        foreach(PropertyInfo property in typeof(T).GetProperties())
                        {
                            if (reader[property.Name] != DBNull.Value)
                                property.SetValue(item, reader[property.Name]);
                        }
                        list.Add(item);
                    }
                    reader.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
            return list;
        }
        public void UpdateRecord<T>(T record)
        {
            string connectionString = GetConnectionString();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                PropertyInfo[] properties = typeof(T).GetProperties();
                string primaryKey;
                if (typeof(T) == typeof(Employee))
                    primaryKey = "EmpNo";
                else
                    primaryKey = "Id";
                string setClause = string.Join(",", properties.Where(property => property.Name != primaryKey).Select(property => $"{property.Name} = @{property.Name}"));
                PropertyInfo primaryKeyProperty = typeof(T).GetProperty(primaryKey)!;
                string whereClause = $"{primaryKey} = @{primaryKey}";
                string query = $"Update {typeof(T).Name}s set {setClause} where {whereClause}";
                SqlCommand command = new SqlCommand(query, connection);
                foreach (PropertyInfo property in properties)
                {
                    object? value = property.GetValue(record);
                    command.Parameters.AddWithValue($"@{property.Name}", value ?? DBNull.Value);
                }
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                    Console.WriteLine($"{typeof(T).Name} updated successfully");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
        }
        public void DeleteRecord(Employee employee)
        {
            string connectionString = GetConnectionString();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string primaryKey="EmpNo";
                string query = $"Update Employees set IsDeleted = @IsDeleted where {primaryKey} = @{primaryKey}";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue($"@IsDeleted", true);
                command.Parameters.AddWithValue($"@{primaryKey}", employee.EmpNo);
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                    Console.WriteLine("Employee deleted successfully");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
        }
    }
}