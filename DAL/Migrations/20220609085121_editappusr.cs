using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class editappusr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Interens_UserId",
                table: "Interens");

            migrationBuilder.CreateIndex(
                name: "IX_Interens_UserId",
                table: "Interens",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Interens_UserId",
                table: "Interens");

            migrationBuilder.CreateIndex(
                name: "IX_Interens_UserId",
                table: "Interens",
                column: "UserId");
        }
    }
}
