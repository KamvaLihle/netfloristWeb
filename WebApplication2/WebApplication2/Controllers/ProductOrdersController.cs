using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class ProductOrdersController : ApiController
    {
        private netfloristEntities3 db = new netfloristEntities3();

        // GET: api/ProductOrders
        public IQueryable<ProductOrder> GetProductOrders()
        {
            return db.ProductOrders;
        }

        // GET: api/ProductOrders/5
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult GetProductOrder(int id)
        {
            ProductOrder productOrder = db.ProductOrders.Find(id);
            if (productOrder == null)
            {
                return NotFound();
            }

            return Ok(productOrder);
        }

        // PUT: api/ProductOrders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductOrder(int id, ProductOrder productOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productOrder.ProdOrderID)
            {
                return BadRequest();
            }

            db.Entry(productOrder).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ProductOrders
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult PostProductOrder(ProductOrder productOrder)
        {
            Random rand = new Random();
            int toSkip = rand.Next(1, db.Drivers.Count());
            var driverID = db.Drivers.OrderBy(i => Guid.NewGuid()).Skip(toSkip).Take(1).First();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            productOrder.ProdOrderID = new Random().Next();
            productOrder.DriverID = Convert.ToInt32(driverID.DriverID);
            db.ProductOrders.Add(productOrder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProductOrderExists(productOrder.ProdOrderID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = productOrder.ProdOrderID }, productOrder);
        }

        // DELETE: api/ProductOrders/5
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult DeleteProductOrder(int id)
        {
            ProductOrder productOrder = db.ProductOrders.Find(id);
            if (productOrder == null)
            {
                return NotFound();
            }

            db.ProductOrders.Remove(productOrder);
            db.SaveChanges();

            return Ok(productOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductOrderExists(int id)
        {
            return db.ProductOrders.Count(e => e.ProdOrderID == id) > 0;
        }
    }
}