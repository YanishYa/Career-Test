using Career_Test.Authentication;
using Career_Test.Data;
using Career_Test.Data.Models;
using Career_Test.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Career_Test
{
    public static class Startup
    {
        public static void ConfigureServices(this IConfiguration configuration, IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("QuestionDatabase"), db =>
                {

                }));
            //services.AddDbContext<ApplicationContext>(options =>
            //    options.UseSqlite(configuration.GetConnectionString("QuestionDatabase"), db =>
            //    {

            //    }));

            services.Configure<ApplicationConfiguration>(opts =>
            {
                opts.Secret = configuration.GetValue<string>("ApplicationSettings:Secret");
            });

            services
                .AddIdentityCore<User>(opts =>
                {
                    opts.Password.RequireLowercase = false;
                    opts.Password.RequireDigit = false;
                    opts.Password.RequireNonAlphanumeric = false;
                    opts.Password.RequireUppercase = false;
                    opts.Password.RequiredLength = 6;
                })
                .AddRoles<Role>()
                .AddRoleManager<RoleManager<Role>>()
                .AddEntityFrameworkStores<ApplicationContext>();

            services.AddAuthentication();

            services.AddTransient<IAuthTokenService, AuthTokenService>();

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen( c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Career test API", Version = "v1" });
            });

        }

        public static void Configure(this WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();


            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Career test API v1");
            });

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseMiddleware<AuthorizationBehaviour>();



            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
        }
    }
}
