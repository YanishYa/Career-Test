using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Career_Test.Authentication
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private string Secret;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeAttribute"/> class. 
        /// </summary>
        public AuthorizeAttribute()
        {
            LoadSecret();
            Roles = Array.Empty<string>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthorizeAttribute"/> class with array of roles. 
        /// </summary>
        public AuthorizeAttribute(params string[] roles)
        {
            LoadSecret();
            Roles = roles ?? Array.Empty<string>();
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //context.HttpContext.Request.Headers.TryGetValue("authorization", out var t);
            //var token = t.FirstOrDefault().Replace("Bearer ", "");
            //var decodedToken = DecodeToken(token);

            //if (decodedToken == null)
            //{
            //    context.Result = new JsonResult(new { message = "Unauthorized request" })
            //    { StatusCode = StatusCodes.Status401Unauthorized };
            //    return;
            //}

            UserId = context?.HttpContext?.User?.FindFirst("unique_name")?.Value;

            if (UserId == null)
            {
                context.Result = new JsonResult(new { message = "Unauthorized request" })
                { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }

            var userRoles = context?.HttpContext?.User?.Claims?.Where(x => x.Type == "role")?.Select(x => x.Value);

            if (Roles.Any() && userRoles != null && Roles.Intersect(userRoles).Count() != Roles.Count())
            {
                context.Result = new JsonResult(new { message = "Unauthorized request. Permissions denied" })
                { StatusCode = StatusCodes.Status403Forbidden };
            }
        }

        /// <summary>
        /// Gets or sets a comma delimited list of roles that are allowed to access the resource.
        /// </summary>
        public IEnumerable<string> Roles { get; set; }

        public string UserId { get; set; }

        private JwtSecurityToken DecodeToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(Secret);

                var tokenResult = tokenHandler.ReadJwtToken(token);

                return tokenResult;
            }

            catch (Exception e)
            {
                return null;
            }
        }

        private void LoadSecret()
        {
            var environmentName = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT");
            var confBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{environmentName}.json", true);

            var configuration = confBuilder.Build();
            Secret = configuration.GetSection("ApplicationSettings:Secret").Value;
        }
    }
}
