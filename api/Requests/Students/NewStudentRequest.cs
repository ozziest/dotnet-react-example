using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Advancity.Requests.Students
{
  public class NewStudentRequest
  {
    public int? id { get; set; }

    [Display(Name = "Ad")]
    [Required]
    public string name { get; set; }

    [Display(Name = "Soyad")]
    [Required]
    public string surname { get; set; }

    [Display(Name = "Öğrenci Numarası")]
    [Required]
    public string number { get; set; }

    [Display(Name = "Şube Kodu")]
    [Required]
    public int branchId { get; set; }

    [Display(Name = "Dersler")]
    [Required]
    public List<int> selectedLessons { get; set; }
  }
}