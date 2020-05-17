using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171039)]
  public class AddBranchIdFK : Migration
  {
    public override void Up()
    {
      Create.ForeignKey()
        .FromTable("Students").ForeignColumn("BranchId")
        .ToTable("Branch").PrimaryColumn("Id");
    }

    public override void Down()
    {
      Delete.DefaultConstraint().OnTable("Students").OnColumn("BranchId");
    }
  }
}