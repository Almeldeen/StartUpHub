using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class editchat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnlineUser_AspNetUsers_UserId",
                table: "OnlineUser");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "Createdate",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "Read",
                table: "Chats");

            migrationBuilder.RenameTable(
                name: "OnlineUser",
                newName: "OnlineUsers");

            migrationBuilder.CreateTable(
                name: "ChatMsgs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChatId = table.Column<int>(type: "int", nullable: false),
                    SenderId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReciverId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Read = table.Column<bool>(type: "bit", nullable: false),
                    Createdate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMsgs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatMsgs_AspNetUsers_ReciverId",
                        column: x => x.ReciverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatMsgs_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatMsgs_Chats_ChatId",
                        column: x => x.ChatId,
                        principalTable: "Chats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatMsgs_ChatId",
                table: "ChatMsgs",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMsgs_ReciverId",
                table: "ChatMsgs",
                column: "ReciverId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMsgs_SenderId",
                table: "ChatMsgs",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OnlineUsers_AspNetUsers_UserId",
                table: "OnlineUsers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnlineUsers_AspNetUsers_UserId",
                table: "OnlineUsers");

            migrationBuilder.DropTable(
                name: "ChatMsgs");

            migrationBuilder.RenameTable(
                name: "OnlineUsers",
                newName: "OnlineUser");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Chats",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Createdate",
                table: "Chats",
                type: "datetimeoffset",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<bool>(
                name: "Read",
                table: "Chats",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_OnlineUser_AspNetUsers_UserId",
                table: "OnlineUser",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
