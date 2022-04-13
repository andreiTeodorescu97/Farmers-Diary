using Domain.DataContext;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly JFContext _dbContext;

        public UsersController(JFContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public  async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _dbContext.Users.FindAsync(id);
        }
    }
}
