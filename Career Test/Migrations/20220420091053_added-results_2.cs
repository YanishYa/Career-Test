using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_Test.Migrations
{
    public partial class addedresults_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultId",
                table: "Options",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Options_ResultId",
                table: "Options",
                column: "ResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_Options_Results_ResultId",
                table: "Options",
                column: "ResultId",
                principalTable: "Results",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Options_Results_ResultId",
                table: "Options");

            migrationBuilder.DropIndex(
                name: "IX_Options_ResultId",
                table: "Options");

            migrationBuilder.DropColumn(
                name: "ResultId",
                table: "Options");
        }
    }
}
