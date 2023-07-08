using Career_Test.Authentication;
using Career_Test.Data;
using Career_Test.Data.Models;
using Career_Test.Data.Models.Enums;
using Career_Test.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Career_Test.Services
{
    public class AuthTokenService : IAuthTokenService
    {
        private readonly ApplicationConfiguration _appSettings;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _context;

        public AuthTokenService(IOptions<ApplicationConfiguration> options, UserManager<User> userManager, ApplicationContext context)
        {
            _appSettings = options.Value;
            _userManager = userManager;
            _context = context;
        }

        public Task DecodeToken(string token)
        {
            throw new NotImplementedException();
        }


        public async Task<LoginResponseDto> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                var res = await _userManager.CreateAsync(new User()
                {
                    Gender = model.Gender,
                    UserName = model.Email,
                    Email = model.Email,
                    Fio = model.Name
                });

				user = await _userManager.FindByEmailAsync(model.Email);
			}

            var token = GenerateToken(user);
            var roles = string.Join("|", await _userManager.GetRolesAsync(user));

            var isFilled = user.Age != null && user.City != null && user.Class != null && user.Phone != null && user.School != null;

            return new LoginResponseDto(user.Id, user.Email, roles, token, user.Gender, user.Fio ?? "", isFilled);
        }

        public async Task<bool> AppendInfo(AppendInfoDto dto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == dto.UserId);
            if (user == null)
                throw new Exception();
            user.Phone = dto.Phone;
            user.City = dto.City;
            user.Age = dto.Age;
            user.Class = dto.Class;
            user.Fio = dto.Fio;
            user.School = dto.School;

            await _userManager.UpdateAsync(user);
            return true;
        } 

        //public async Task<LoginResponseDto> Register(RegisterDto model)
        //{
        //    var existing = await _userManager.FindByEmailAsync(model.Email);
        //    if (existing != null)
        //        throw new Exception("User is exist");
        //    var user = new User
        //    {
        //        UserName = model.Email,
        //        Email = model.Email,
        //        Class = model.Class,
        //        Gender = model.Gender,
        //        Age = model.Age,
        //        City = model.City,
        //        Fio = model.Fio,
        //        Phone = model.Phone,
        //        School = model.School,
        //        EmailConfirmed = true,
        //    };
        //    var result = await _userManager.CreateAsync(user);
        //    if (!result.Succeeded)
        //        throw new Exception("Can't create user");

        //    await _userManager.AddPasswordAsync(user, model.Password);

        //    //await _userManager.AddToRoleAsync(user, Roles.Enrollee);
        //    //var role = await _context.Roles.FirstAsync(x => x.Name == Roles.Enrollee);
        //    //var userRole = await _context.UserRoles.FindAsync(user.Id, role.Id);

        //    await _context.SaveChangesAsync(CancellationToken.None);

        //    return await Login(new LoginDto(model.Password, model.Email));
        //}

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var claims = new List<Claim>(new[] { new Claim(ClaimTypes.Name, user.Id.ToString()) });
            //claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, "role")));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
