namespace StopsManager.Models
{
    public class StopModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string ZoneId { get; set; }
        public string Url { get; set; }
        public string LocationType { get; set; }
        public string ParentStation { get; set; }
    }
}
