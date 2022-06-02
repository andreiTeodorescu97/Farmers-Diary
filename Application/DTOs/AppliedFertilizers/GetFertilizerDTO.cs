using Application.DTOs.Farm;
using System;

namespace Application.DTOs.AppliedFertilizers
{
    public class GetFertilizerDTO
    {
        public GetParcelDTO Parcel { get; set; }
        public int Planned { get; set; }
        public string FetilizerType { get; set; }
        public string Type { get; set; }
        public decimal AppliedWeightPerHa { get; set; }
        public DateTime DateApplied { get; set; }
        public string Observations { get; set; }
    }
}
