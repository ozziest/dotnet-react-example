namespace Advancity.Requests
{
  public class PaginateStudentRequest
  {
    public long page { get; set; }
    public long recordPerPage { get; set; }

    public PaginateStudentRequest () {
      this.page = 1;
      this.recordPerPage = 10;
    }
  }
}