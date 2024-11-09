using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMCUVote.Migrations
{
    /// <inheritdoc />
    public partial class CreateVoteFile3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsWinner",
                table: "VoteInfos",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWinner",
                table: "VoteInfos");
        }
    }
}
