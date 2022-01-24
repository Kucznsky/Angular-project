using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class SeededDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BeginsAt",
                table: "Screenings",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsShowing",
                table: "Films",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "IsShowing", "ScreeningTime", "Title" },
                values: new object[] { 1, true, 156, "Diune" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "IsShowing", "ScreeningTime", "Title" },
                values: new object[] { 2, true, 112, "The Intouchables" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "IsShowing", "ScreeningTime", "Title" },
                values: new object[] { 3, true, 91, "Bee Movie" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "IsShowing", "ScreeningTime", "Title" },
                values: new object[] { 4, true, 121, "Hot Fuzz" });

            migrationBuilder.InsertData(
                table: "Films",
                columns: new[] { "ID", "IsShowing", "ScreeningTime", "Title" },
                values: new object[] { 5, true, 600, "Motywacja" });

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
                table: "Films",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "BeginsAt",
                table: "Screenings");

            migrationBuilder.DropColumn(
                name: "IsShowing",
                table: "Films");
        }
    }
}
