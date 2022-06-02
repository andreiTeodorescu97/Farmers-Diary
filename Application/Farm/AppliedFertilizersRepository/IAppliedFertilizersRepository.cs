using Application.DTOs.AppliedFertilizers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Farm.AppliedFertilizersRepository
{
    public interface IAppliedFertilizersRepository
    {
        Task AddFertilizer(AddFertilizerDTO fertilizerDTO);
        Task<IEnumerable<GetFertilizerDTO>> GetAppliedFertilizers(int userId);
    }
}
