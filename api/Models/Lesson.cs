using System.ComponentModel.DataAnnotations;

namespace Advancity.Models
{
  public class Lesson
  {
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public int Level { get; set; }
  }
}