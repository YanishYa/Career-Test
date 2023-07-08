using Career_Test.Data;
using Career_Test.Data.Models;
using Career_Test.Dtos;
using Career_Test.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Career_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthTokenService _authService;
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _context;

        public AuthenticationController(IAuthTokenService authService, RoleManager<Role> roleManager, UserManager<User> userManager, ApplicationContext context)
        {
            _authService = authService;
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var res = await _authService.Login(dto);

                if (res == null) return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> AppendInfo([FromBody]AppendInfoDto dto)
        {
            return Ok(await _authService.AppendInfo(dto));
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        //{
        //    try
        //    {
        //        var res = await _authService.Register(dto);

        //        if (res == null) return BadRequest();

        //        return Ok(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            await _roleManager.CreateAsync(new Role() { Name = "enrollee" });
            return Ok();
        }
    }
}
