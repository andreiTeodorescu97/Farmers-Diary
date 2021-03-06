using System.Collections.Generic;

namespace Domain.Entities
{
    public class Culture
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Parcel> Parcels { get; set; }
    }
}
