using Volo.Abp.Domain.Entities;

namespace CMCUVote.Entities
{
    public class Criteria : BasicAggregateRoot<Guid>
    {
        public string? Code { get; set; }
        public string? Name { get; set; }
    }
}
