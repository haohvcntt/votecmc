using CMCUVote.Entities;
using CMCUVote.Services.Dtos;
using Volo.Abp.Domain.Repositories;

namespace CMCUVote.Services.VoteCandidates
{
    public class VoteCandidateAppService : CMCUVoteAppService
    {
        private readonly IRepository<VoteCandidate, Guid> _voteCandidateRepository;
        public VoteCandidateAppService(IRepository<VoteCandidate, Guid> voteCandidateRepository)
        {
            _voteCandidateRepository = voteCandidateRepository;
        }

        public async Task<List<VoteCandidateDto>> GetListAsync()
        {
            var items = await _voteCandidateRepository.GetListAsync();
            return items.Select(s => new VoteCandidateDto
            {
                Id = s.Id,
                FullName = s.FullName,
                Department = s.Department,
                Note = s.Note
            }).ToList();
        }
    }
}
