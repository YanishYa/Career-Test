using Career_Test.Data.Models.Enums;
using Microsoft.AspNetCore.Identity;

namespace Career_Test.Data.Models
{
    public class User: IdentityUser<int>
    {
        public string? Phone { get; set; }
        public string? Fio { get; set; }
        public Gender Gender { get; set; }
        public int? Age { get; set; }
        public string? City { get; set; }
        public string? School { get; set; }
        public string? Class { get; set; }
    }
}
