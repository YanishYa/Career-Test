using Career_Test.Data;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Career_Test.Authentication
{
    public class AuthorizationBehaviour
    {
        private readonly RequestDelegate _next;
        private readonly ApplicationConfiguration _appSettings;

        public AuthorizationBehaviour(RequestDelegate next, IOptions<ApplicationConfiguration> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, ApplicationContext dataContext)
        {
            var token = context.Request.Headers["authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                await AttachAccountToContext(context, dataContext, token);

            await _next(context);
        }

        private async Task AttachAccountToContext(HttpContext context, ApplicationContext dataContext, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var accountId = jwtToken.Claims.First(x => x.Type == "unique_name").Value;

                // attach account to context on successful jwt validation
                context.User = new ClaimsPrincipal(new ClaimsIdentity(jwtToken.Claims));
            }
            catch
            {
                // do nothing if jwt validation fails
                // account is not attached to context so request won't have access to secure routes
            }
        }
    }
}
