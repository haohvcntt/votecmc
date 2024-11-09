using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMCUVote.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVoteInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "VoteInfos",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "VoteInfos");
        }
    }
}
