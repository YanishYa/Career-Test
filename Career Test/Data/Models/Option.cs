using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Career_Test.Data.Models
{
    public class Option
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }

        [ForeignKey("Result")]
        public int? ResultId { get; set; }

        public Result? Result { get; set; }
    }
}
