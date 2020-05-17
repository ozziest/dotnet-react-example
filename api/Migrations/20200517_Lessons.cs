using FluentMigrator;

namespace Advancity.Migrations {
  [Migration (202005171033)]
  public class AddLessonTable : Migration {
    public override void Up () {
      Create.Table ("Lessons")
        .WithColumn ("Id").AsInt64 ().PrimaryKey ().Identity ()
        .WithColumn ("Title").AsString ()
        .WithColumn ("Level").AsInt64 ();
    }

    public override void Down () {
      Delete.Table ("Lessons");
    }
  }
}