using Volo.Abp.Domain.Entities;

namespace CMCUVote.Entities
{
    public class VoteCandidate : BasicAggregateRoot<Guid>
    {
        public string FullName { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }
    }
}
