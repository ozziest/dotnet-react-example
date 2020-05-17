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
  public class BranchesController : ControllerBase
  {

    private IConfiguration configuration { get; set; }

    public BranchesController(IConfiguration configuration)
    {
      this.configuration = configuration;
    }

    [HttpGet]
    [Route("api/branches")]
    public List<Branch> Get()
    {
      List<Branch> branches = new List<Branch>();
      using (IDbConnection db = new SqliteConnection(this.configuration.GetSection("ConnectionString").Value))
      {
        branches = db.Query<Branch>("SELECT * FROM Branches").ToList();
      }
      return branches;
    }
  }
}
