using lifecare.DAO;

namespace lifecare.Repositories
{
    public interface IRecordRepository
    {
        Record Create(Record record);
        Record Update(Record record);
        Record? Delete(int id);
        List<Record> GetAll();
        Record? GetById(int id);
        Record? GetByCPF(string cpf);
    }
}