using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddInternApplaiedQAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "InternApplaieds");

            migrationBuilder.CreateTable(
                name: "InternApplaiedQAnswers",
                columns: table => new
                {
                    QId = table.Column<int>(type: "int", nullable: false),
                    InternShipId = table.Column<int>(type: "int", nullable: false),
                    InternId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QAnswer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InternApplaiedQAnswers", x => new { x.QId, x.InternId, x.InternShipId });
                    table.ForeignKey(
                        name: "FK_InternApplaiedQAnswers_InternApplaieds_InternId_InternShipId",
                        columns: x => new { x.InternId, x.InternShipId },
                        principalTable: "InternApplaieds",
                        principalColumns: new[] { "InternId", "InternShipId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InternApplaiedQAnswers_InternShipQuestions_QId",
                        column: x => x.QId,
                        principalTable: "InternShipQuestions",
                        principalColumn: "QId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InternApplaiedQAnswers_InternId_InternShipId",
                table: "InternApplaiedQAnswers",
                columns: new[] { "InternId", "InternShipId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InternApplaiedQAnswers");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "InternApplaieds",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
