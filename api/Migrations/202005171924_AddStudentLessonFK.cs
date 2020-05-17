using System.Collections.Generic;
using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171924)]
  public class AddStudentLessonFK : Migration
  {
    public override void Up()
    {
      Create.ForeignKey()
        .FromTable("StudentLessons").ForeignColumn("StudentId")
        .ToTable("Students").PrimaryColumn("Id");

      Create.ForeignKey()
        .FromTable("StudentLessons").ForeignColumn("LessonId")
        .ToTable("Lessons").PrimaryColumn("Id");
    }

    public override void Down()
    {
      Delete.DefaultConstraint().OnTable("StudentLessons").OnColumn("StudentId");
      Delete.DefaultConstraint().OnTable("StudentLessons").OnColumn("LessonId");
    }
  }
}