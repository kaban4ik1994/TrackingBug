using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace api.Models
{
    public class BugContext: DbContext
    {
        public DbSet<Bug> Bugs { get; set; }
    }
}