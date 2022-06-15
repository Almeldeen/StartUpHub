using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class editcoulamnametotitel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "InternShips",
                newName: "title");

            migrationBuilder.AlterColumn<string>(
                name: "QContent",
                table: "InternShipQuestions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "title",
                table: "InternShips",
                newName: "Name");

            migrationBuilder.AlterColumn<int>(
                name: "QContent",
                table: "InternShipQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
