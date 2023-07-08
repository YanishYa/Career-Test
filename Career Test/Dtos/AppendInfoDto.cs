using Career_Test.Data.Models.Enums;

namespace Career_Test.Dtos
{
	public class AppendInfoDto
	{
		public int UserId { get; set; }
		public string? Phone { get; set; }
		public string? Fio { get; set; }
		public int? Age { get; set; }
		public string? City { get; set; }
		public string? School { get; set; }
		public string? Class { get; set; }
	}
}
