using Application.DTOs.Farm;
using AutoMapper;
using Domain.DataContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Farm.ParcelsRepository
{
    public class ParcelsRepository : IParcelsRepository
    {
        private readonly JFContext _context;
        private readonly IMapper _mapper;

        public ParcelsRepository(JFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AddParcelDTO>> GetParcelsForUser(int userId)
        {
            var parcels = await _context.Parcels
                .Where(c => c.AppUserId == userId)
                .Select(c => _mapper.Map<Parcel, AddParcelDTO>(c))
                .ToListAsync();

            return parcels;
        }

        public async Task AddParcel(AddParcelDTO request)
        {
            var parcel = _mapper.Map<Parcel>(request);
            _context.Parcels.Add(parcel);

            await SaveAllAsync();
        }

        public async Task EditParcel(EditParcelDTO request)
        {
            var parcel = await _context.Parcels.FindAsync(request.Id);
            parcel = _mapper.Map(request, parcel);
            _context.Entry(parcel).State = EntityState.Modified;

            await SaveAllAsync();
        }

        public async Task DeleteParcel(int parcelId)
        {
            var parcel = await _context.Parcels.FindAsync(parcelId);
            _context.Parcels.Remove(parcel);

            await SaveAllAsync();
        }

        public bool CheckUserParcelCombination(int userId, long parcelId)
        {
            var result =  _context.Parcels.Any(c => c.AppUserId == userId && c.Id == parcelId);
            return result;
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
