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
  public class StudentLessonsController : ControllerBase
  {

    private IConfiguration configuration { get; set; }

    public StudentLessonsController(IConfiguration configuration)
    {
      this.configuration = configuration;
    }

    [HttpGet]
    [Route("api/students/{studentId}/lessons")]
    public List<StudentLesson> Index(int studentId)
    {
      List<StudentLesson> studentLessons = new List<StudentLesson>();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        studentLessons = db
          .Query<StudentLesson>(
            "SELECT * FROM StudentLessons WHERE StudentId = @StudentId",
            new {
              StudentId = studentId
            }
          )
          .ToList();
      }
      return studentLessons;
    }
  }
}
