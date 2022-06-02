using Application.DTOs.AppliedFertilizers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DataContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Farm.AppliedFertilizersRepository
{
    public class AppliedFertilizersRepository : IAppliedFertilizersRepository
    {
        private readonly JFContext _context;
        private readonly IMapper _mapper;

        public AppliedFertilizersRepository(JFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddFertilizer(AddFertilizerDTO fertilizerDTO)
        {
            var fertilizer = _mapper.Map<AppliedFertilizer>(fertilizerDTO);
            _context.AppliedFertilizers.Add(fertilizer);

            await SaveAllAsync();
        }

        public async Task<IEnumerable<GetFertilizerDTO>> GetAppliedFertilizers(int userId)
        {
            return await _context.AppliedFertilizers.Where(c => c.Parcel.AppUserId == userId)
                .ProjectTo<GetFertilizerDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        private async Task SaveAllAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
