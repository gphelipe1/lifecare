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
        
             _context.Records.Remove(record!);
            _context.SaveChanges();

            return record!;
        }

        public List<Record> GetAll()
        {
            var records = _context.Records.ToList();
            return records;
        }

        public List<Record> GetById(int id)
        {
            var record = _context.Records.Where(c => c.Id == id).ToList();
            return record;
        }


        public List<Record> GetByCPF(string cpf)
        {
           var record = _context.Records.Where(c => c.CPF == cpf).ToList();
           return record;
        }

        public Record? GetByUserAndRecord(string cpf, int recordId)
        {
            var record = _context.Records.Where(c => c.CPF == cpf && c.Id == recordId).FirstOrDefault();
            return record;
        }
     }
}