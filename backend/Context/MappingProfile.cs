using AutoMapper;
using lifecare.DAO;
using lifecare.DTO;

namespace lifecare.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Record, RecordDTO>().ReverseMap();
        }
    }
}