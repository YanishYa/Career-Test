using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Career_Test.Data.Models
{
	public class Chair
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey("Result")]
		public int? ResultId { get; set; }
		public Result? Result { get; set; }

		public string? Name { get; set; }

		public string? Description { get; set; }
		public string? Link { get; set; }
		public string? Abbreviation { get; set; }
	}
}
