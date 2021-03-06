using Dapper.Contrib.Extensions;

namespace Advancity.Models
{
  public class Lesson
  {
    [ExplicitKey]
    public long? Id { get; set; }
    public string Title { get; set; }
    public int Level { get; set; }
  }
}