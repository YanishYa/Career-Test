using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_Test.Migrations
{
    public partial class addedanswersave3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionAnswers_Questions_QuestionId",
                table: "QuestionAnswers");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "QuestionAnswers",
                newName: "OptionId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionAnswers_QuestionId",
                table: "QuestionAnswers",
                newName: "IX_QuestionAnswers_OptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionAnswers_Options_OptionId",
                table: "QuestionAnswers",
                column: "OptionId",
                principalTable: "Options",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionAnswers_Options_OptionId",
                table: "QuestionAnswers");

            migrationBuilder.RenameColumn(
                name: "OptionId",
                table: "QuestionAnswers",
                newName: "QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionAnswers_OptionId",
                table: "QuestionAnswers",
                newName: "IX_QuestionAnswers_QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionAnswers_Questions_QuestionId",
                table: "QuestionAnswers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
