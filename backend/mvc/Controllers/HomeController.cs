//HO TENUTO IL FILE SOLO PER CONFRONTARLO CON L'IMPLEMENTAZIONE IN NODE VEDERE HomeController.js

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCSample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index() {
            return View();
        }
    }
}