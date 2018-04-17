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
using System.Threading.Tasks;
using System.Web;
using System.IO;

namespace WebApplication2.Controllers
{
    public class ImagesController : ApiController
    {
        private netfloristEntities3 db = new netfloristEntities3();

        // GET: api/Images
        public IQueryable<Image> GetImages()
        {
            return db.Images;
        }

        // GET: api/Images/5
        [ResponseType(typeof(Image))]
        public IHttpActionResult GetImage(int id)
        {
            Image image = db.Images.Find(id);
            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }

        // PUT: api/Images/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutImage(int id, Image image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != image.ImageID)
            {
                return BadRequest();
            }

            db.Entry(image).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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

        // POST: api/Images
        public async Task<string> POST()
        {

            int count = 0;

            //collect files
            HttpFileCollection files = HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            Image image = new Image();
            var productID = db.Products.Select(i => i).ToArray().LastOrDefault();

            string Status = "";
            for(int i = 0; i <= files.Count; i++)
            {
                HttpPostedFile postFile = files[i];
                string fileName = new FileInfo(postFile.FileName).Name;
                if(postFile.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();
                    string modifiedFileName = id.ToString() + '_' + fileName;
                    byte[] picture = new byte[postFile.ContentLength];
                    postFile.InputStream.Read(picture, 0, postFile.ContentLength);
                    image.ImageID = new Random().Next();
                    image.Picture = picture;
                    image.ProductID = Convert.ToInt32(productID.ProductID.ToString());
                    db.Images.Add(image);
                    await db.SaveChangesAsync();
                    count++;
                }
            }
            if(count > 0)
            {
                return Status;
            }
            return "Failed to Upload";
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //db.Images.Add(image);

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateException)
            //{
            //    if (ImageExists(image.ImageID))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return CreatedAtRoute("DefaultApi", new { id = image.ImageID }, image);
        }

        // DELETE: api/Images/5
        [ResponseType(typeof(Image))]
        public IHttpActionResult DeleteImage(int id)
        {
            Image image = db.Images.Find(id);
            if (image == null)
            {
                return NotFound();
            }

            db.Images.Remove(image);
            db.SaveChanges();

            return Ok(image);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ImageExists(int id)
        {
            return db.Images.Count(e => e.ImageID == id) > 0;
        }
    }
}