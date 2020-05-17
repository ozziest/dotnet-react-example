using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171037)]
  public class AddBranchesTable : Migration
  {
    public override void Up()
    {
      Create.Table("Branches")
        .WithColumn("Id").AsInt64().PrimaryKey().Identity()
        .WithColumn("Title").AsString(5)
        .WithColumn("Level").AsInt16();
    }

    public override void Down()
    {
      Delete.Table("Branches");
    }
  }
}