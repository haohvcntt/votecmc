using Volo.Abp.Domain.Entities;

namespace CMCUVote.Entities
{
    public class CandidateFile : BasicAggregateRoot<Guid>
    {
        public Guid? VoteCandidateId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
    }
}
