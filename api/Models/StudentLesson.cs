using Dapper.Contrib.Extensions;

namespace Advancity.Models
{
  public class StudentLesson
  {
    [ExplicitKey]
    public long? Id { get; set; }
    public long StudentId { get; set; }
    public long LessonId { get; set; }
  }
}