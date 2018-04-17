using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    public class ProductDetailsController : ApiController
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductCategory { get; set; }
        public decimal ProductPrice { get; set; }
        public byte[] Picture { get; set; }

        public ProductDetailsController()
        {

        }

    }
}
