using Microsoft.AspNet.Mvc;

namespace StopsManager.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
