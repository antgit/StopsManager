using System;
using Microsoft.AspNet.Mvc;
using StopsManager.Infrastructure;
using StopsManager.Repositories;

namespace StopsManager.Controllers
{
    public class StopsController : Controller
    {
        private readonly StopsRepository _stopsRepository;
        private readonly ObjectToJsonSerializer _objectToJsonSerializer;

        public StopsController(StopsRepository stopsRepository, ObjectToJsonSerializer objectToJsonSerializer)
        {
            if (stopsRepository == null) throw new ArgumentNullException(nameof(stopsRepository));
            if (objectToJsonSerializer == null) throw new ArgumentNullException(nameof(objectToJsonSerializer));

            _stopsRepository = stopsRepository;
            _objectToJsonSerializer = objectToJsonSerializer;
        }

        public IActionResult Get()
        {
            var allStops = _stopsRepository.GetAll();
            return Content(_objectToJsonSerializer.Serialize(allStops), "application/json");
        }
    }
}
