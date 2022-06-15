using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Application.Errors;
using System.Text.Json;
using FluentValidation;
using System.Linq;
using Infrastructure.Helper;
using System.Collections.Generic;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context){
            try{
                await _next(context);
            }
            catch(Exception ex){
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            object errors = null;
            string userMessage = "An error has occured. Please contact your System Administrator!";
            switch (ex){
                case RestException re:
                    _logger.LogError(ex, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int) re.StatusCode;
                    userMessage = (errors?.GetType() == typeof(string)) ? errors.ToString() : userMessage;
                    break;
                case ValidationException ve:
                    _logger.LogError(ve, "VALIDATION ERROR");
                    if (ve.Errors.Any())
                        errors = ve.Errors.Select(err => err.ErrorMessage);
                    else
                        errors = ve.Message.AsList();
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    userMessage = ((IEnumerable<string>)errors)?.FirstOrDefault() ?? userMessage;
                    break;
                case Exception exception:
                    _logger.LogError(ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(ex.Message)? "Error":ex.Message;
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;    
            }

            context.Response.Headers.TryAdd("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
            context.Response.ContentType = "application/json";
            if(errors!=null){
                var result = JsonSerializer.Serialize(new
                {
                    statusCode = context.Response.StatusCode,
                    userMessage,
                    errors
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}