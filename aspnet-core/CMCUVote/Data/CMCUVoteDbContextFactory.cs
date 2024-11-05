using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CMCUVote.Data;

public class CMCUVoteDbContextFactory : IDesignTimeDbContextFactory<CMCUVoteDbContext>
{
    public CMCUVoteDbContext CreateDbContext(string[] args)
    {
        CMCUVoteEfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<CMCUVoteDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new CMCUVoteDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
