using System;

namespace Application.DTOs.Farm
{
    public class GetParcelDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Surface { get; set; }
        public int CultureId { get; set; }
        public string CultureName { get; set; }
        public int CountyId { get; set; }
        public string CountyName { get; set; }
        public string DateAdded { get; set; }
    }
}
