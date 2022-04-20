using Application.DTOs.Collections;
using Application.DTOs.Farm;
using AutoMapper;
using Domain.Entities;

namespace Application.DTOs.MappingProfile
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<County, CountyDTO>();
            CreateMap<Culture, CultureDTO>();
            CreateMap<AddParcelDTO, Parcel>();
            CreateMap<Parcel, AddParcelDTO>();
            CreateMap<EditParcelDTO, Parcel>();
        }
    }
}
