using lifecare.DTO;

namespace lifecare.Services
{
    public interface IRecordService
    {
        RecordDTO Create(RecordDTO dto);
        RecordDTO Update(RecordDTO record);
        RecordDTO Delete(int id);
        List<RecordDTO> GetAll();
        RecordDTO? GetById(int id);
        RecordDTO? GetByCPF(string cpf);
    }
}