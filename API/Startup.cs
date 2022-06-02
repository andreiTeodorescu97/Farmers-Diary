using Application.DTOs.MappingProfile;
using Application.Farm.AppliedFertilizersRepository;
using Application.Farm.ParcelsRepository;
using Application.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Repositories
            services.AddScoped<IParcelsRepository, ParcelsRepository>();
            services.AddScoped<IAppliedFertilizersRepository, AppliedFertilizersRepository>();

            services.AddAplicationServices(_config);

            services.AddControllers().AddFluentValidation(s =>
            {
                s.RegisterValidatorsFromAssemblyContaining<AddParcelDTOValidator>();
                s.ValidatorOptions.CascadeMode = CascadeMode.Stop;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddCors();
            services.AddIdentityServices(_config);
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
                app.UseCors(policy => policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(_config.GetSection("HostName").Value));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy => policy
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles(); //use index.htmhl
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
