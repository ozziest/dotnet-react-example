namespace Advancity.Requests
{
  public class NewStudentRequest
  {
    public int? id { get; set; }
    public string name { get; set; }
    public string surname { get; set; }
    public string number { get; set; }
    public int branchId { get; set; }
  }
}