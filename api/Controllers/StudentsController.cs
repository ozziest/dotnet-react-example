using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Advancity.Models;
using Advancity.Repositories;
using Advancity.Requests.Students;
using Advancity.Responses;
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

    [HttpGet]
    [Route("api/students")]
    public Pagination<Student> Paginate([FromQuery] PaginateStudentRequest request)
    {
      Pagination<Student> pagination = new Pagination<Student>();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        Paginator paginator = new Paginator(request);
        pagination = paginator
          .Table("Students")
          .SetDefaultOrderBy("StudentNo", "ASC")
          .OrderBy(new Dictionary<string, string>() {
            { "no", "StudentNo" },
            { "name", "Name" },
            { "surname", "Surname" }
          })
          .Fetch<Student>(db);
      }
      return pagination;
    }

    [HttpPost]
    [Route("api/students")]
    public Student Post([FromBody] NewStudentRequest form)
    {
      Student student = new Student();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        long id = -1;
        if (form.id == null) {
          id = db.Insert(new Student() {
            Name = form.name,
            Surname = form.surname,
            StudentNo = form.number,
            BranchId = form.branchId
          });
        } else {
          id = (long) form.id;
          db.Update(new Student() {
            Id = id,
            Name = form.name,
            Surname = form.surname,
            StudentNo = form.number,
            BranchId = form.branchId
          });
        }

        student = db.Get<Student>(id);
      }
      return student;
    }
  }
}
