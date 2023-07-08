using Career_Test.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Career_Test.Dtos
{
	public class QuestionAnswersDto
	{
		public int QuestionId { get; set; }
		public int Answer { get; set; }
	}
}
