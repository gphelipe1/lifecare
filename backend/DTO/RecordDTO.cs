namespace lifecare.DTO {
    public class RecordDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; } 

        public string CPF { get; set; }

        public string Phone { get; set; }
        
        public string? Address { get; set; }

        public string? Description { get; set; }
        
        public RecordDTO(string Name, string CPF, string Phone, string? Address) {
            this.Name = Name;
            this.CPF = CPF;
            this.Phone = Phone;
            this.Address = Address;
        }    
    }
}