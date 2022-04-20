namespace Application.DTOs.Farm
{
    public class AddParcelDTO
    {
        public string Name { get; set; }
        public decimal Surface { get; set; }
        public int CultureId { get; set; }
        public int CountyId { get; set; }
        public int? AppUserId { get; set; }
    }
}
