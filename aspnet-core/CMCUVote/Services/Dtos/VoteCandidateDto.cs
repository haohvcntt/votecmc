namespace CMCUVote.Services.Dtos
{
    public class VoteCandidateDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }

    }
}
