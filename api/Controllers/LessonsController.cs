using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Advancity.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Advancity.Controllers
{
  [ApiController]
  public class LessonsController : ControllerBase
  {

    private IConfiguration configuration { get; set; }

    public LessonsController(IConfiguration configuration)
    {
      this.configuration = configuration;
    }

    [HttpGet]
    [Route("api/lessons")]
    public List<Lesson> Get()
    {
      List<Lesson> lessons = new List<Lesson>();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        lessons = db.Query<Lesson>("SELECT * FROM Lessons").ToList();
      }
      return lessons;
    }
  }
}
