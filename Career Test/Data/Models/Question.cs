using System.ComponentModel.DataAnnotations;

namespace Career_Test.Data.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Option> Options { get; set; }
    }
}
