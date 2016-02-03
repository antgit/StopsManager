using Microsoft.AspNet.Mvc;

namespace StopsManager.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //TODO add strings to resources
            ViewBag.Title = "Stops Manager";
            return View();
        }
    }
}
