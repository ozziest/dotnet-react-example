using System.Collections.Generic;
using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171923)]
  public class AddStudentLessons : Migration
  {
    public override void Up()
    {
      Create.Table("StudentLessons")
        .WithColumn("Id").AsInt64().PrimaryKey().Identity()
        .WithColumn("StudentId").AsInt16().NotNullable()
        .WithColumn("LessonId").AsInt16().NotNullable();
    }

    public override void Down()
    {
      Delete.Table("StudentLessons");
    }
  }
}