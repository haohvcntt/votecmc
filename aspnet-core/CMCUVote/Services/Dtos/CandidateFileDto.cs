namespace CMCUVote.Services.Dtos
{
    public class CandidateFileDto
    {
        public Guid? VoteCandidateId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
    }
}
