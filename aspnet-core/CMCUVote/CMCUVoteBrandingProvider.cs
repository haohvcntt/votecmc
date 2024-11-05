using Microsoft.Extensions.Localization;
using CMCUVote.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace CMCUVote;

[Dependency(ReplaceServices = true)]
public class CMCUVoteBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<CMCUVoteResource> _localizer;

    public CMCUVoteBrandingProvider(IStringLocalizer<CMCUVoteResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
