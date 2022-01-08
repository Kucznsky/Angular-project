using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class SeededData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "ScreeningTime", "Title" },
                values: new object[] { 1, 156, "Diune" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "ScreeningTime", "Title" },
                values: new object[] { 2, 112, "The Intouchables" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "ScreeningTime", "Title" },
                values: new object[] { 3, 157, "Dom Gucci" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "ScreeningTime", "Title" },
                values: new object[] { 4, 600, "Motywacja" });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "ID", "Capacity" },
                values: new object[] { 1, 60 });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "ID", "Capacity" },
                values: new object[] { 2, 150 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Films",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "ID",
                keyValue: 2);
        }
    }
}
