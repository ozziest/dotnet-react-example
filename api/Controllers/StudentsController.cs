using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Advancity.Models;
using Advancity.Requests;
using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Advancity.Controllers
{
  [ApiController]
  public class StudentsController : ControllerBase
  {

    private IConfiguration configuration { get; set; }

    public StudentsController(IConfiguration configuration)
    {
      this.configuration = configuration;
    }

    [HttpPost]
    [Route("api/students")]
    public Student Post([FromBody] NewStudentRequest form)
    {
      Student student = new Student();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        long id = db.Insert(new Student() {
          Name = form.name,
          Surname = form.surname,
          StudentNo = form.number,
          BranchId = form.branchId
        });
        student = db.Get<Student>(id);
      }
      return student;
    }
  }
}
