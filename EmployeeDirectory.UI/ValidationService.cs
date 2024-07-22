using System.Text.RegularExpressions;
using EmployeeDirectory.Models;

namespace EmployeeDirectory.UI
{
    class ValidationService
    {
        public static ValidationResponse IsValidOption(string option, int startIndex, int endIndex)
        {
            int optionEntered;
            if (!int.TryParse(option, out optionEntered))
                return ValidationResponse.OnFailure("Please enter a valid integer:");
            if (optionEntered < startIndex || optionEntered > endIndex)
                return ValidationResponse.OnFailure($"Please enter an option in the range of {startIndex} to {endIndex} only");
            return ValidationResponse.OnSuccess();
        }
        public static ValidationResponse IsValidDate(string date)
        {
            if (string.IsNullOrWhiteSpace(date))
                return ValidationResponse.OnFailure("It is a mandatory field. Please enter:");
            if (!DateOnly.TryParse(date, out _))
                return ValidationResponse.OnFailure("Please enter valid date. The date must be in the format of MM/DD/YYYY (or) MM-DD-YYYY");
            return ValidationResponse.OnSuccess();
        }
        public static ValidationResponse IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return ValidationResponse.OnFailure("Employee mail is a mandatory field. Please enter employee mail:");
            string pattern = "^(?i)[a-zA-Z0-9]+@tezo\\.com$";
            Regex regex = new Regex(pattern);
            bool isValidEmail = regex.IsMatch(email);
            if (!isValidEmail)
                return ValidationResponse.OnFailure("Please enter valid employee mail. The email must be in the format of username@tezo.com");
            return ValidationResponse.OnSuccess();
        }
        public static ValidationResponse IsValidMobileNumber(string mobileNumber)
        {
            if (string.IsNullOrWhiteSpace(mobileNumber))
                return ValidationResponse.OnSuccess();
            string pattern = "^\\d{10}$";
            Regex regex = new Regex(pattern);
            bool isValidMobileNumber = regex.IsMatch(mobileNumber);
            if (!isValidMobileNumber)
                return ValidationResponse.OnFailure("The entered mobile number is not valid. Mobile number must contain only integer digits of length 10. Please enter valid mobile number:");
            return ValidationResponse.OnSuccess();
        }
    }
}