using lifecare.DTO;

namespace lifecare.Services
{
    public interface IRecordService
    {
        RecordDTO Create(RecordDTO dto);
        RecordDTO Update(RecordDTO record);
        RecordDTO? Delete(int id);
        List<RecordDTO> GetAll();
        List<RecordDTO>? GetById(int id);
        List<RecordDTO>? GetByCPF(string cpf);
    }
}