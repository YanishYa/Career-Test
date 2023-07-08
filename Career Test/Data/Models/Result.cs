using System.ComponentModel.DataAnnotations;

namespace Career_Test.Data.Models
{
    public class Result
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LinkToImage { get; set; }
        public string GuildName { get; set; }
        public string Power { get; set; }
        public string Subject { get; set; }
        public string Minion { get; set; }  
        public string Description { get; set; }

        public virtual ICollection<Chair>? Chairs { get; set; }
    }
}
