using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCompletedOnColumnAndModifyTaskDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TaskDate",
                table: "Tasks",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(2024, 7, 5, 10, 7, 26, 202, DateTimeKind.Local).AddTicks(994),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedOn",
                table: "Tasks",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedOn",
                table: "Tasks");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TaskDate",
                table: "Tasks",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldDefaultValue: new DateTime(2024, 7, 5, 10, 7, 26, 202, DateTimeKind.Local).AddTicks(994));
        }
    }
}
