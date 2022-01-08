using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class AddedFilmDeactivation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsShowing",
                table: "Films",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 1,
                column: "IsShowing",
                value: true);

            migrationBuilder.UpdateData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 2,
                column: "IsShowing",
                value: true);

            migrationBuilder.UpdateData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 3,
                column: "IsShowing",
                value: true);

            migrationBuilder.UpdateData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 4,
                column: "IsShowing",
                value: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsShowing",
                table: "Films");
        }
    }
}
