using Career_Test.Authentication;
using Career_Test.Data;
using Career_Test.Data.Models;
using Career_Test.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Career_Test.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AnswerController : ControllerBase
	{
		private readonly ApplicationContext _context;

		public AnswerController(ApplicationContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Authorize]
		public async Task SaveResults(ICollection<QuestionAnswersDto> dtos)
		{
			var a = User.FindFirst(x => x.Type == "unique_name").Value;
			if (int.TryParse(a, out var id))
			{
				var answers = new List<QuestionAnswers>();
				var guid = Guid.NewGuid();

				var entities = dtos.Select(x => new QuestionAnswers()
				{
					Created = DateTime.UtcNow,
					Answer = x.Answer,
					OptionId = x.QuestionId,
					UniqueId = guid,
					UserId = id,
					Id = Guid.NewGuid(),
				}).ToList();

				await _context.QuestionAnswers.AddRangeAsync(entities);
				await _context.SaveChangesAsync();
			}

		}
	}
}
