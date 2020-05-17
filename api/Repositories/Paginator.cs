using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Advancity.Requests;
using Advancity.Responses;
using Dapper;

namespace Advancity.Repositories {
  public class Paginator {
    private IDbConnection db { get; set; }
    private string table { get; set; }
    private string orderBy { get; set; }
    private string orderType { get; set; }
    private PaginateRequest request { get; set; }

    public Paginator (PaginateRequest request) {
      this.orderType = "ASC";
      this.request = request;
    }

    public Paginator Table(string table) {
      this.table = table;
      return this;
    }

    public Paginator SetDefaultOrderBy (string orderBy, string orderType) {
      this.orderBy = orderBy;
      this.orderType = orderType;
      return this;
    }

    public Paginator OrderBy(Dictionary<string, string> sortableColumns) {
      return this.OrderBy(sortableColumns, this.request.orderBy, this.request.orderType);
    }

    public Paginator OrderBy(Dictionary<string, string> sortableColumns, string orderBy, string orderType) {
      string column;

      if(sortableColumns.TryGetValue(orderBy, out column))
      {
        this.orderBy = column;
        this.orderType = "ASC";

        if (orderType == "ASC" || orderType == "DESC") {
          this.orderType = orderType;
        }
      }

      return this;
    }

    public Pagination<T> Fetch<T>(IDbConnection db) {
      Pagination<T> response = new Pagination<T>();
      response.page = this.request.page ;
      response.recordPerPage = this.request.recordPerPage;

      // This is the basic query structure
      string sql = @"FROM {TABLE_NAME} {WHERE}";

      // We should update table name and where conditions if there is any
      sql = sql
        .Replace("{TABLE_NAME}", this.table)
        .Replace("{WHERE}", "");

      // In here, we should calculate pagination numbers for this query
      this.SetPaginationItems(db, response, sql);

      // If there is any sorting options we should add the information to the SQL
      if (this.orderBy != null) {
        sql += " ORDER BY " + this.orderBy + " " + this.orderType;
      }

      // Final version of our query.
      sql = "SELECT * " + sql + " LIMIT @startAt, @recordPerPage";

      // Fetching data
      response.data = db.Query<T>(sql, new {
        startAt = ((response.page - 1) * response.recordPerPage),
        recordPerPage = response.recordPerPage
      }).ToList();

      return response;
    }
    
    private void SetPaginationItems<T> (IDbConnection db, Pagination<T> response, string sql) {
      string query = "SELECT COUNT(*) AS total " + sql;
      response.total = db.Query<TotalResponse>(query, new {
        startAt = ((response.page - 1) * response.recordPerPage),
        recordPerPage = response.recordPerPage
      }).First().total;
      response.pages = (long)Math.Ceiling((decimal)response.total / (decimal)response.recordPerPage);
    }
  }
}