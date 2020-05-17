using System;
using System.Collections.Generic;

namespace Advancity.Requests
{
  public class PaginateRequest
  {
    public string orderBy { get; set; }
    public string orderType { get; set; }
    public long page { get; set; }
    public long recordPerPage { get; set; }

    public PaginateRequest () {
      this.page = 1;
      this.recordPerPage = 10;
    }

    public void SortableColumns(List<string> columns) {
      Console.WriteLine("SortableColumns" + this.orderBy);
    }
  }
}