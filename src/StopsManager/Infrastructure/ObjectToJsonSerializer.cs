using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace StopsManager.Infrastructure
{
    public class ObjectToJsonSerializer
    {
        public string Serialize(object model)
        {
            return JsonConvert.SerializeObject(model, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}
