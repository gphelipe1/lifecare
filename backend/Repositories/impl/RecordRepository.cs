using lifecare.DAO;
using lifecare.Data;

namespace lifecare.Repositories
{
     public class RecordRepository: IRecordRepository
     {
        private readonly AppDataContext _context;

        public RecordRepository(AppDataContext context)
        {
            _context = context;
        }

        public Record Create(Record record)
        {
            _context.Records.Add(record);
            _context.SaveChanges();

            return record;
        }

        public Record Update(Record record)
        {
            _context.Records.Update(record);
            _context.SaveChanges();

            return record;
        }

        public Record Delete(int id)
        {
            var record = _context.Records.FirstOrDefault(c => c.Id == id);
        
            _context.Records.Remove(record);
            _context.SaveChanges();

            return record;
        }

        public List<Record> GetAll()
        {
            var records = _context.Records.ToList();
            return records;
        }

        public Record? GetById(int id)
        {
            var record = _context.Records.FirstOrDefault(c => c.Id == id);
            return record;
        }


        public Record? GetByCPF(string cpf)
        {
           var record = _context.Records.FirstOrDefault(c => c.CPF == cpf);
           return record;
        }
     }
}