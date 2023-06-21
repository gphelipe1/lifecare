using AutoMapper;
using lifecare.DAO;
using lifecare.DTO;
using lifecare.Repositories;

namespace lifecare.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _repository;
        private readonly IMapper _mapper;

        public RecordService(IRecordRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public RecordDTO Create(RecordDTO dto)
        {
            var record = _repository.Create(_mapper.Map<RecordDTO, Record>(dto));
            var recordtDto = _mapper.Map<Record, RecordDTO>(record);
            return recordtDto;
        }

         public RecordDTO Update(RecordDTO dto)
        {
            var record = _repository.Update(_mapper.Map<RecordDTO, Record>(dto));
            var recordDTO = _mapper.Map<Record, RecordDTO>(record);

            return recordDTO;
        }

        public RecordDTO? Delete(int id)
        {
            var record = _repository.Delete(id);

            if (record != null)
            {
                var recordDTO = _mapper.Map<Record, RecordDTO>(record);
                return recordDTO;
            }

            return null;
        }

        public List<RecordDTO> GetAll()
        {
            var records = _repository.GetAll();
            var recordsDTO = _mapper.Map<List<RecordDTO>>(records);
            
            return recordsDTO;
        }

        public List<RecordDTO>? GetById(int id)
        {
           var record = _repository.GetById(id);

            if(record == null)
            { 
                return null;
            }

            return _mapper.Map<List<RecordDTO>>(record);
        }


        public List<RecordDTO>? GetByCPF(string cpf)
        {
           var record = _repository.GetByCPF(cpf);

            if(record == null)
            { 
                return null;
            }

            return _mapper.Map<List<RecordDTO>>(record);
        }
    }
}