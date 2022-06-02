using System;

namespace Application.DTOs.AppliedFertilizers
{
    public class AddFertilizerDTO
    {
        public int ParcelId { get; set; }
        public int Planned { get; set; }
        public string FetilizerType { get; set; }
        public string Type { get; set; }
        public decimal AppliedWeightPerHa { get; set; }
        public DateTime DateApplied { get; set; }
        public string Observations { get; set; }
        public int? AppUserId { get; set; }
    }
}
