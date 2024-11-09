namespace CMCUVote.Services.Dtos
{
    public class CandidateVoteInfo
    {
        public Guid? CandidateId { get; set; }
        public string? CandidateName { get; set; }
        public string? TypeName { get; set; }
        public int? Type { get; set; }
    }
}
