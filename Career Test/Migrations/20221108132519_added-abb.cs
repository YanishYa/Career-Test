using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_Test.Migrations
{
    public partial class addedabb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "Chairs",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "Chairs");
        }
    }
}
