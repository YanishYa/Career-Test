using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Career_Test.Data.Models
{
	[Index("UniqueId")]
	public class QuestionAnswers
	{
		[Key]
		public Guid Id { get; set; }
		[ForeignKey("Option")]
		public int OptionId { get; set; }
		public Option? Option { get; set; }
		[ForeignKey("User")]
		public int UserId { get; set; }
		public User? User { get; set; }
		public int Answer { get; set; }
		
		public Guid UniqueId { get; set; }
		public DateTime Created { get; set; }
	}
}
