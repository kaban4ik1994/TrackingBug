using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using System.Web.Mvc;
using Backend.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Backend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BugController : ApiController
    {
        private BugContext _db = new BugContext();

        public IEnumerable<Bug> Get(int offset, int limit, string filter = "")
        {
            var result = new List<Bug>();
            if (offset + limit < _db.Bugs.Count())
            {
                for (var i = offset; i < (offset + limit); i++)
                {
                    result.Add(_db.Bugs.ToList().ElementAt(i));
                }
            }
            else
            {
                for (var i = offset; i < _db.Bugs.Count(); i++)
                {
                    result.Add(_db.Bugs.ToList().ElementAt(i));
                }
            }

            return result;
        }

        public Bug Get(int id)
        {
            return _db.Bugs.ToList().Find(x => x.Id == id);
        }

        public CountElements GetCountBugs()
        {
            var count = _db.Bugs.Count();
            return new CountElements { CountBugs = count };
        }


        public void Delete(int id)
        {
            _db.Bugs.Remove(_db.Bugs.ToList().Find(x => x.Id == id));
            _db.SaveChanges();
        }

        [System.Web.Http.HttpPost]
        public void Post(string date, string status, string whoReported)
        {
            var bug = new Bug { Status = status, Id = 0 };
            char[] charsToTrim = { '\\', '\"' };
            date = date.Trim(charsToTrim);
            bug.Date = Convert.ToDateTime(date);
            bug.WhoReported = whoReported;
            _db.Bugs.Add(bug);
            _db.SaveChanges();
        }

        [System.Web.Http.HttpPut]
        public void Put( string status, string date, string whoReported, int id=0)
        {
            if (id != 0)
            {
                var bug = _db.Bugs.ToList().Find(e => e.Id == id);
                bug.Status = status;
                char[] charsToTrim = {'\\', '\"'};
                date = date.Trim(charsToTrim);
                bug.Date = Convert.ToDateTime(date);
                bug.WhoReported = whoReported;
          
           
            }
            else
            {
                var bug = new Bug { Status = status, Id = 0 };
                char[] charsToTrim = { '\\', '\"' };
                date = date.Trim(charsToTrim);
                bug.Date = Convert.ToDateTime(date);
                bug.WhoReported = whoReported;
                _db.Bugs.Add(bug);
              
            }

            _db.SaveChanges();
        }

    }
}
