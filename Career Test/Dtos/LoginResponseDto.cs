using Career_Test.Data.Models.Enums;

namespace Career_Test.Dtos
{
    public class LoginResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Roles { get; set; }
        public string Token { get; set; }
        public Gender Gender { get; set; }
        public bool IsProfileFilled { get; set; }

		public LoginResponseDto(int id, string email, string roles, string token, Gender gender, string name, bool isProfileFilled)
		{
			Id = id;
			Email = email;
			Roles = roles;
			Token = token;
			Gender = gender;
			Name = name;
			IsProfileFilled = isProfileFilled;
		}
	}
}
