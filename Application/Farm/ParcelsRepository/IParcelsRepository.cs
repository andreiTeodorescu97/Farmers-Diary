using Application.DTOs.Farm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Farm.ParcelsRepository
{
    public interface IParcelsRepository
    {
        Task AddParcel(AddParcelDTO parcel);
        Task<IEnumerable<AddParcelDTO>> GetParcelsForUser(int userId);
        Task DeleteParcel(int parcelId);
        Task EditParcel(EditParcelDTO parcel);
        bool CheckUserParcelCombination(int userId, long parcelId);
    }
}
