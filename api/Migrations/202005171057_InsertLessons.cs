using System.Collections.Generic;
using FluentMigrator;

namespace Advancity.Migrations
{
  [Migration(202005171057)]
  public class InsertLessons : Migration
  {
    public override void Up()
    {
      List<string> lessons = new List<string>() {
        "Matematik", "Türkçe", "Sosyal Bilgiler", "Fen Bilgisi"
      };

      lessons.ForEach((lesson) => {
        for (int level = 1; level <= 5; level++) {
          Insert.IntoTable("Lessons").Row(new {
            Title = lesson, Level = level
          });
        }
      });
    }

    public override void Down()
    {
      Delete.FromTable("Lesssons").AllRows();
    }
  }
}