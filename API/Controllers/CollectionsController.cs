using Application.DTOs.Collections;
using AutoMapper;
using Domain.DataContext;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CollectionsController : BaseApiController
    {
        public CollectionsController(JFContext context, IMapper mapper) : base(context, mapper) { }

        [HttpGet("counties")]
        public async Task<ActionResult<IEnumerable<CountyDTO>>> GetCounties()
        {
            return await _context.Counties.Select(c => _mapper.Map<County, CountyDTO>(c)).ToListAsync();
        }

        [HttpGet("countiesBad")]
        public ActionResult<IEnumerable<CountyDTO>> GetCountiesBad()
        {
            return _context.Counties.Select(c => _mapper.Map<County, CountyDTO>(c)).ToList();
        }

        [HttpGet("cultures")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CultureDTO>>> GetCultures()
        {
            return await _context.Cultures.Select(c => _mapper.Map<Culture, CultureDTO>(c)).ToListAsync();
        }
    }
}
