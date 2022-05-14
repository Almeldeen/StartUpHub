using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class addEducation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Educations",
                columns: table => new
                {
                    EducationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Degree = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FieldOfStudy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudentActivities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndDate = table.Column<TimeSpan>(type: "time", nullable: false),
                    InterenId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educations", x => x.EducationID);
                    table.ForeignKey(
                        name: "FK_Educations_Interens_InterenId",
                        column: x => x.InterenId,
                        principalTable: "Interens",
                        principalColumn: "InterenId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Educations_InterenId",
                table: "Educations",
                column: "InterenId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Educations");
        }
    }
}
