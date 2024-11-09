namespace CMCUVote.Services.Dtos
{
    public class VoteCountDto
    {
        public Guid? CandidateId { get; set; }
        public string? CandidateName { get; set; }
        public int? VoteCount { get; set; }
        public int? Type { get; set; }
        public string? TypeName { get; set; }
        public bool? IsWinner { get; set; } = false;
    }
}
