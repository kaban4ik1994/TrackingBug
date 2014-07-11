using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Backend2.Models;

namespace Backend2.Controllers
{
    public class BugController : ApiController
    {
        private BugContext _db = new BugContext();

        // GET api/values

        public IEnumerable<Bug> Get()
        {

            return _db.Bugs.ToList();
        }

        // GET api/values/5
        public IEnumerable<Bug> Get( int page,int pageSize=3)
        {
            return _db.Bugs.ToList().Skip((page - 1)*pageSize).Take(pageSize);
        }

        // POST api/values 
        public IEnumerable<Bug> Post(int id=0, string status="fixed", string whoReported="name")
        {
            var value = new Bug {Id = id, Status = status, Date = DateTime.Now, WhoReported = "name"};
                value.Date = DateTime.Now;
                _db.Bugs.Add(value);
                _db.SaveChanges();
                return _db.Bugs.ToList();
        }

        // PUT api/values/5
        public IEnumerable<Bug> Put(int id, string status, string date, string whoReported)
        {
            var bug = _db.Bugs.ToList().Find(e => e.Id == id);
            bug.Status = status;
            bug.Date = Convert.ToDateTime(date);
            bug.WhoReported = whoReported;
            _db.SaveChanges();
            return _db.Bugs.ToList();

        }

        // DELETE api/values/5
        public IEnumerable<Bug> Delete(int id)
        {
            var bug = _db.Bugs.ToList().Find(e => e.Id == id);
            if (bug == null) return _db.Bugs.ToList();
            _db.Bugs.Remove(bug);
            _db.SaveChanges();
            return _db.Bugs.ToList();
        }

    }
}
