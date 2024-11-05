using Microsoft.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;

namespace CMCUVote.Data;

public class CMCUVoteEFCoreDbSchemaMigrator : ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public CMCUVoteEFCoreDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the CMCUVoteDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<CMCUVoteDbContext>()
            .Database
            .MigrateAsync();
    }
}
