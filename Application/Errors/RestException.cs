using System;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace Application.Errors
{
    [ExcludeFromCodeCoverage]
    public class RestException : Exception
    {
        public RestException(HttpStatusCode statusCode, object errors = null)
        {
            StatusCode = statusCode;
            Errors = errors;
        }

        public HttpStatusCode StatusCode { get; }
        public object Errors { get; }
    }
}