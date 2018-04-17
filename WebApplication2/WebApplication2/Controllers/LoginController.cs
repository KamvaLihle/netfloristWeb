using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public string validateLogin(Customer data)
        {
            bool passwordCorrect = false;
            string idNumber = data.ID;
            string password = data.password;
            using(netfloristEntities3 entity = new netfloristEntities3())
            {
                var user = entity.Customers.Where(u => u.ID == idNumber).FirstOrDefault();
                if(user != null)
                {
                    if(password == user.password)
                    {
                        Session["LoginID"] = user.ID;
                        Session["UserName"] = user.firstName + ' ' + user.lastName;
                        return user.ID.ToString();
                    }
                    else
                    {
                        return "0";
                    }
                }
                else
                {
                    return "-1";
                }
            }

        }

    }
}