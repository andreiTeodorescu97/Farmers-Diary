namespace Application.DTOs.Farm
{
    public class EditParcelDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Surface { get; set; }
        public int CultureId { get; set; }
        public int CountyId { get; set; }
        public int? AppUserId { get; set; }
    }
}
