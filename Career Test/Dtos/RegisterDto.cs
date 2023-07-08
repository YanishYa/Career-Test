using Career_Test.Data.Models.Enums;

namespace Career_Test.Dtos
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public RegisterDto(string password, string email)
        {
            Password = password;
            Email = email;
        }

        public string? Phone { get; set; }
        public string? Fio { get; set; }
        public Gender Gender { get; set; }
        public int? Age { get; set; }
        public string? City { get; set; }
        public string? School { get; set; }
        public string? Class { get; set; }

    }


}
