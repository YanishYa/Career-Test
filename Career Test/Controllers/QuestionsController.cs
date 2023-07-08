using Career_Test.Data;
using Career_Test.Data.Models;
using Career_Test.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Career_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public QuestionsController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Questions.Include(x => x.Options).ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] QuestionDto dto)
        {
            var question = new Question()
            {
                Name = dto.Name,
                Options = dto.Options.Select(x => new Option()
                {
                    Name = x.Name,
                    ResultId = x.ResultId
                }).ToList()
            };

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
            return Ok(question.Id);
        }
    }
}
