using Application.DTOs.Collections;
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
        }
    }
}
