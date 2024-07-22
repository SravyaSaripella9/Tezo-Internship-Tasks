namespace EmployeeDirectory.Models
{
    public class ValidationResponse
    {
        public string ErrorMessage { get; set; }
        public bool IsValid { get; set; }
        public static ValidationResponse OnSuccess()
        {
            return new ValidationResponse()
            {
                IsValid = true,
                ErrorMessage = string.Empty
            };
        }
        public static ValidationResponse OnFailure(string errorMessage)
        {
            return new ValidationResponse()
            {
                IsValid = false,
                ErrorMessage = errorMessage
            };
        }
    }
}