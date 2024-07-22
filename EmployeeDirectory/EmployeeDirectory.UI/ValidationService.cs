using System.Text.RegularExpressions;
using EmployeeDirectory.Models;

namespace EmployeeDirectory.UI
{
    class ValidationService
    {
        public static ValidationResult IsValidOption(string option, int startIndex, int endIndex)
        {
            int optionEntered;
            if (!int.TryParse(option, out optionEntered))
                return ValidationResult.OnFailure("Please enter a valid integer:");
            if (optionEntered < startIndex || optionEntered > endIndex)
                return ValidationResult.OnFailure($"Please enter an option in the range of {startIndex} to {endIndex} only");
            return ValidationResult.OnSuccess();
        }
        public static ValidationResult IsValidDate(string date)
        {
            if (string.IsNullOrWhiteSpace(date))
                return ValidationResult.OnFailure("It is a mandatory field. Please enter:");
            if (!DateOnly.TryParse(date, out _))
                return ValidationResult.OnFailure("Please enter valid date. The date must be in the format of MM/DD/YYYY (or) MM-DD-YYYY");
            return ValidationResult.OnSuccess();
        }
        public static ValidationResult IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return ValidationResult.OnFailure("Employee mail is a mandatory field. Please enter employee mail:");
            string pattern = "^(?i)[a-zA-Z0-9]+@tezo\\.com$";
            Regex regex = new Regex(pattern);
            bool isValidEmail = regex.IsMatch(email);
            if (!isValidEmail)
                return ValidationResult.OnFailure("Please enter valid employee mail. The email must be in the format of username@tezo.com");
            return ValidationResult.OnSuccess();
        }
        public static ValidationResult IsValidMobileNumber(string? mobileNumber)
        {
            if (string.IsNullOrWhiteSpace(mobileNumber))
                return ValidationResult.OnSuccess();
            string pattern = "^\\d{10}$";
            Regex regex = new Regex(pattern);
            bool isValidMobileNumber = regex.IsMatch(mobileNumber);
            if (!isValidMobileNumber)
                return ValidationResult.OnFailure("The entered mobile number is not valid. Mobile number must contain only integer digits of length 10. Please enter valid mobile number:");
            return ValidationResult.OnSuccess();
        }
    }
}