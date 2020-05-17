using Advancity.Models;

namespace Advancity.Responses.Students {
  public class StudentResponse: Student {
    public string BranchTitle { get; set; }
    public int TotalLesson { get; set; }
  }
}