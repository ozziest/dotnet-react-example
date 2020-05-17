using System.Collections.Generic;

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
      this.data = new List<T>();
    }
  }
}