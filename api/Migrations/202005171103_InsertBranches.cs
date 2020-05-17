using System.Collections.Generic;
using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171103)]
  public class InsertBranches : Migration
  {
    public override void Up()
    {
      List<string> branches = new List<string>() {
        "A", "B", "C", "D"
      };

      branches.ForEach((branch) => {
        for (int level = 1; level <= 5; level++) {
          Insert.IntoTable("Branches").Row(new {
            Title = level.ToString() + " " + branch, Level = level
          });
        }
      });
    }

    public override void Down()
    {
      Delete.FromTable("Branches").AllRows();
    }
  }
}