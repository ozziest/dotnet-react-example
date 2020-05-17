using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;

namespace Advancity.Responses {
  public class Pagination<T> {
    public long page { get; set; }
    public long recordPerPage { get; set; }
    public long total { get; set; }
    public long pages { get; set; }
    public List<T> data { get; set; }

    public Pagination () {
      this.page = 1;
      this.recordPerPage = 10;
    }

    public Pagination (long page, long recordPerPage) {
      this.page = page;
      this.recordPerPage = recordPerPage;
    }

    public void SetTotal (IDbConnection db, string sql) {
      string query = "SELECT COUNT(*) AS total " + sql.Replace("LIMIT @startAt, @recordPerPage", "");
      this.total = db.Query<TotalResponse>(query, new {
        startAt = ((this.page - 1) * this.recordPerPage),
        recordPerPage = this.recordPerPage
      }).First().total;
      this.pages = (long)Math.Ceiling((decimal)this.total / (decimal)this.recordPerPage);
    }
  }
}