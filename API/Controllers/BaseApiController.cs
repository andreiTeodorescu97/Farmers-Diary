using AutoMapper;
using Domain.DataContext;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly JFContext _context;
        protected readonly IMapper _mapper;

        public BaseApiController(JFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
