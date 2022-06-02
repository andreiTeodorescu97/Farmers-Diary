using System;

namespace Domain.Entities
{
    public class AppliedFertilizer
    {
        public int Id { get; set; }
        public int ParcelId { get; set; }
        public virtual Parcel Parcel { get; set; }
        public int Planned { get; set; }
        public string FetilizerType { get; set; }
        public string Type { get; set; }
        public decimal AppliedWeightPerHa { get; set; }
        public DateTime DateApplied { get; set; }
        public DateTime? DateAdded { get; set; }
        public string Observations { get; set; }
    }
}
