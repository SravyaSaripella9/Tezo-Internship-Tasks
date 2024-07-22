namespace EmployeeDirectory.Models
{
    public class ValidationResult
    {
        public string ErrorMessage { get; set; }
        public bool IsValid { get; set; }
        public static ValidationResult OnSuccess()
        {
            return new ValidationResult()
            {
                IsValid = true,
                ErrorMessage = string.Empty
            };
        }
        public static ValidationResult OnFailure(string errorMessage)
        {
            return new ValidationResult()
            {
                IsValid = false,
                ErrorMessage = errorMessage
            };
        }
    }
}