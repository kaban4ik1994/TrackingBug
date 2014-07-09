using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;

namespace api.Controllers
{
    public class ValuesController : ApiController
    {

        BugContext _db = new BugContext();

        // GET api/values
        public IEnumerable<Bug> Get()
        {
            return _db.Bugs.ToList();
        }

        // GET api/values/5
        public Bug Get(int id)
        {
            return _db.Bugs.ToList().Find(e => e.Id == id);

        }

        // POST api/values 
        public IEnumerable<Bug> Post(Bug value)
        {
           _db.Bugs.Add(value);
            _db.SaveChanges();
            return _db.Bugs.ToList();
        }

        // PUT api/values/5
        public void Put(int id, string value)
        {
            _db.Bugs.ToList().Find(e => e.Id == id).Status = value;
        }

        // DELETE api/values/5
        public IEnumerable<Bug> Delete(int id)
        {
           _db.Bugs.Remove(_db.Bugs.ToList().Find(e => e.Id == id));
            return _db.Bugs.ToList();
        }
    }
}