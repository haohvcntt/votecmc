using Volo.Abp.Domain.Entities;

namespace CMCUVote.Entities
{
    public class VoteInfo: BasicAggregateRoot<Guid>
    {
        public Guid? VoteCandidateId { get; set; }
        public Guid? CriteriaId { get; set; }
        public Guid? UserId { get; set; }
        public int? Type { get; set; }
        public bool? IsWinner { get; set; }
    }
}
