using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class jopskills : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JopSkills",
                columns: table => new
                {
                    JopId = table.Column<int>(type: "int", nullable: false),
                    SkillsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JopSkills", x => new { x.JopId, x.SkillsId });
                    table.ForeignKey(
                        name: "FK_JopSkills_Jops_JopId",
                        column: x => x.JopId,
                        principalTable: "Jops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JopSkills_Skills_SkillsId",
                        column: x => x.SkillsId,
                        principalTable: "Skills",
                        principalColumn: "SkillsId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JopSkills_SkillsId",
                table: "JopSkills",
                column: "SkillsId");
            migrationBuilder.CreateIndex(
               name: "IX_JopSkills_JopId",
               table: "JopSkills",
               column: "JopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JopSkills");
        }
    }
}
