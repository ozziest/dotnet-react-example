using Dapper.Contrib.Extensions;

namespace Advancity.Models
{
  public class Student
  {
    [ExplicitKey]
    public long Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string StudentNo { get; set; }
    public int BranchId { get; set; }
  }
}