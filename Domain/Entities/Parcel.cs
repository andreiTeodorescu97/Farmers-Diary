using System;

namespace Domain.Entities
{
    public class Parcel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhysicalBlock{ get; set; }
        public decimal Surface { get; set; }
        public int CultureId { get; set; }
        public virtual Culture Culture { get; set; }
        public int CountyId { get; set; }
        public virtual County County { get; set; }
        public int AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}