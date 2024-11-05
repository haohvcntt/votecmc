using CMCUVote.Localization;
using Volo.Abp.Application.Services;

namespace CMCUVote.Services;

/* Inherit your application services from this class. */
public abstract class CMCUVoteAppService : ApplicationService
{
    protected CMCUVoteAppService()
    {
        LocalizationResource = typeof(CMCUVoteResource);
    }
}