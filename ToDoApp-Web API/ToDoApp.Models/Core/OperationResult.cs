namespace ToDoApp.Models.Core
{
    public class OperationResult
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public object? Data { get; set; }
        public static OperationResult OnSuccess(object? data)
        {
            return new OperationResult()
            {
                IsSuccess = true,
                Data = data
            };
        }
        public static OperationResult OnFailure(string errorMessage)
        {
            return new OperationResult()
            {
                IsSuccess = false,
                ErrorMessage = errorMessage
            };
        }
    }
}