using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Advancity.Models;
using Advancity.Requests;
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
      Pagination<Student> response = new Pagination<Student>(request.page, request.recordPerPage);
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        string query = @"
          FROM Students
          LIMIT @startAt, @recordPerPage
        ";

        response.SetTotal(db, query);

        response.data = db.Query<Student>("SELECT * " + query, new {
          startAt = ((response.page - 1) * response.recordPerPage),
          recordPerPage = response.recordPerPage
        }).ToList();
      }
      return response;
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
