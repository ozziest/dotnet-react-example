using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Advancity.Models;
using Advancity.Repositories;
using Advancity.Requests.Students;
using Advancity.Responses;
using Advancity.Responses.Students;
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
    public Pagination<StudentResponse> Paginate([FromQuery] PaginateStudentRequest request)
    {
      Pagination<StudentResponse> pagination = new Pagination<StudentResponse>();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        Paginator paginator = new Paginator(request);
        pagination = paginator
          .Table("Students")
          .Select("Students.*, Branches.Title AS BranchTitle")
          .Joins("LEFT JOIN Branches ON Branches.Id = Students.BranchId")
          .Where(@"
            (
              @name IS NULL OR Students.Name LIKE @name
            )
            AND (
              @surname IS NULL OR Students.Surname LIKE @surname
            )
            AND (
              @no IS NULL OR Students.StudentNo LIKE @no
            )
            AND (
              @branch = -1 OR Students.BranchId = @branch
            )
          ", new Dictionary<string, dynamic>() {
            { "name", "%" + request.name + "%" },
            { "surname", "%" + request.surname + "%" },
            { "no", "%" + request.no + "%" },
            { "branch", request.branch }
          })
          .SetDefaultOrderBy("StudentNo", "ASC")
          .OrderBy(new Dictionary<string, string>() {
            { "no", "Students.StudentNo" },
            { "name", "Students.Name" },
            { "surname", "Students.Surname" },
            { "branch", "Branches.Title" }
          })
          .Fetch<StudentResponse>(db);
      }
      return pagination;
    }

    [HttpPost]
    [Route("api/students")]
    public Student Post([FromBody] NewStudentRequest form)
    {
      // if (ModelState.IsValid == false) {
      //   throw new Exception("Not Valid!");
      // }

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
