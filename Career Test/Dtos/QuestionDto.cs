namespace Career_Test.Dtos
{
    public class QuestionDto
    {
        public string Name { get; set; }
       
        public ICollection<OptionDto> Options { get; set; }
    }
}
