using System;

namespace Advancity.Requests.Students
{
  public class PaginateStudentRequest: PaginateRequest
  {
    public string no { get; set; }
    public string name { get; set; }
    public string surname { get; set; }
    public int branch { get; set; }
    public int lesson { get; set; }
  }
}