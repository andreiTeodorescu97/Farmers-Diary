using Application.DTOs.AppliedFertilizers;
using Application.DTOs.Collections;
using Application.DTOs.Farm;
using AutoMapper;
using Domain.Entities;
using System;

namespace Application.DTOs.MappingProfile
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<County, CountyDTO>();
            CreateMap<Culture, CultureDTO>();
            CreateMap<AddParcelDTO, Parcel>()
                .ForMember(dest => dest.DateAdded, options => options.MapFrom(source => DateTime.Now));

            CreateMap<Parcel, AddParcelDTO>();
            CreateMap<EditParcelDTO, Parcel>();
            CreateMap<Parcel, GetParcelDTO>()
                .ForMember(dest => dest.CountyName, options => options.MapFrom(source => source.County.Name))
                .ForMember(dest => dest.CultureName, options => options.MapFrom(source => source.Culture.Name))
                .ForMember(dest => dest.DateAdded, options => options.MapFrom(source => source.DateAdded.Value.ToString("dd/MM/yyyy")));

            CreateMap<AddFertilizerDTO, AppliedFertilizer>()
                .ForMember(dest => dest.DateAdded, options => options.MapFrom(source => DateTime.Now));

            CreateMap<AppliedFertilizer, GetFertilizerDTO>();
        }
    }
}
