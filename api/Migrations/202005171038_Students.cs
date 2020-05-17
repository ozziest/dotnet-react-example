using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171038)]
  public class AddStudentTable : Migration
  {
    public override void Up()
    {
      Create.Table("Students")
        .WithColumn("Id").AsInt64().PrimaryKey().Identity()
        .WithColumn("Name").AsString(50)
        .WithColumn("Surname").AsString(50)
        .WithColumn("StudentNo").AsString(10)
        .WithColumn("BranchId").AsInt16().NotNullable();
    }

    public override void Down()
    {
      Delete.Table("Students");
    }
  }
}