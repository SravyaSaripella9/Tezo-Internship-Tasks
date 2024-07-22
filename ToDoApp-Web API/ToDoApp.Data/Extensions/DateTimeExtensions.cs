namespace ToDoApp.Data.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime ToIST(this DateTime dateTime)
        {
            TimeZoneInfo istZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, istZone);
        }
    }
}
