using Career_Test.Data.Models.Enums;

namespace Career_Test.Dtos
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public Gender Gender { get; set; }

        public LoginDto(string email, string name, Gender gender)
        {
            Email = email;
            Name = name;
            Gender = gender;
        }
    }
}
