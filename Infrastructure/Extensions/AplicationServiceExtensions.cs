using Domain.DataContext;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions
{
    public static class AplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<JFContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("JurnalulFermieruluiConnString"), x => x.MigrationsAssembly("Domain"));
            });

            return services;
        }
    }
}
