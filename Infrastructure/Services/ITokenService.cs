using Domain.Entities;

namespace Infrastructure.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
