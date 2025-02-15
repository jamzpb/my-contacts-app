using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class FallbackController : Controller
{
    public IActionResult Index()
    {
        // fallback if api doesnt recognise client route
        return PhysicalFile(Path.Combine(
            Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/html");
    }
}