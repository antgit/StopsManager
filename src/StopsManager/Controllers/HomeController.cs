using System;
using Microsoft.AspNet.Mvc;
using StopsManager.Repositories;

namespace StopsManager.Controllers
{
    public class HomeController : Controller
    {
        private readonly StopsRepository _stopsRepository;

        public HomeController(StopsRepository stopsRepository)
        {
            if (stopsRepository == null) throw new ArgumentNullException(nameof(stopsRepository));

            _stopsRepository = stopsRepository;
        }

        public IActionResult Index()
        {
            var allStops = _stopsRepository.GetAll();
            return View();
        }
    }
}
