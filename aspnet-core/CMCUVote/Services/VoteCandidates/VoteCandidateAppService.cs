using CMCUVote.Entities;
using CMCUVote.Services.Dtos;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text.Json;
using Volo.Abp.Account;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.Uow;
using static Volo.Abp.UI.Navigation.DefaultMenuNames.Application;

namespace CMCUVote.Services.VoteCandidates
{
    public class VoteCandidateAppService : CMCUVoteAppService
    {
        private readonly IRepository<VoteCandidate, Guid> _voteCandidateRepository;
        private readonly IRepository<CandidateFile, Guid> _candidateFileRepository;
        private readonly IRepository<VoteInfo, Guid> _voteInfoRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IdentityUserManager _userManager;

        public VoteCandidateAppService(IRepository<VoteCandidate, Guid> voteCandidateRepository,
            IRepository<CandidateFile, Guid> candidateFileRepository,
            IUnitOfWork unitOfWork,
            IRepository<VoteInfo, Guid> voteInfoRepository,
            IdentityUserManager userManager)
        {
            _voteCandidateRepository = voteCandidateRepository;
            _candidateFileRepository = candidateFileRepository;
            _unitOfWork = unitOfWork;
            _voteInfoRepository = voteInfoRepository;
            _userManager = userManager;
        }
        public async Task<Guid> CreateAsync(VoteCandidateDto input)
        {
            var item = new VoteCandidate
            {
                FullName = input.FullName,
                Department = input.Department,
                Note = input.Note
            };
            await _voteCandidateRepository.InsertAsync(item);
            await _unitOfWork.CompleteAsync();
            return item.Id;
        }

        public async Task UpdateAsync(Guid Id, VoteCandidateDto input)
        {
            var candidate = await _voteCandidateRepository.GetAsync(Id);
            if (candidate != null)
            {
                candidate.FullName = input.FullName;
                candidate.Department = input.Department;
                candidate.Note = input.Note;
            }
            await _voteCandidateRepository.UpdateAsync(candidate);
        }


        public async Task<List<VoteCandidateDto>> GetListAsync()
        {
            var items = await _voteCandidateRepository.GetListAsync();
            var candidateIds = items.Select(s => s.Id).ToList();
            var files = await _candidateFileRepository.GetListAsync(w => candidateIds.Contains((Guid)w.VoteCandidateId));

            var result = items.Select(s => new VoteCandidateDto
            {
                Id = s.Id,
                FullName = s.FullName,
                Department = s.Department,
                Note = s.Note,
                Files = files.Where(f => f.VoteCandidateId == s.Id)
                             .Select(f => new CandidateFileDto
                             {
                                 VoteCandidateId = f.VoteCandidateId,
                                 FileName = f.FileName,
                                 FilePath = f.FilePath
                             }).ToList()
            }).ToList();

            return result;
        }

        public async Task SaveFileOfCandidate(CandidateFileDto input)
        {
            var item = new CandidateFile
            {
                VoteCandidateId = input.VoteCandidateId,
                FileName = input.FileName,
                FilePath = input.FilePath
            };
            await _candidateFileRepository.InsertAsync(item);
        }

        public async Task<Guid> RemoveCandidate(Guid id)
        {
            await _voteCandidateRepository.DeleteAsync(id);
            // remove image
            var candidateFiles = await _candidateFileRepository.GetListAsync(w => w.VoteCandidateId == id);
            if (candidateFiles != null)
            {
                var ids = candidateFiles.Select(s => s.Id).ToList();
                await _candidateFileRepository.DeleteManyAsync(ids);

            }
            return id;
        }

        public async Task<int> VoteCandidateCheck(int type, Guid candidateId, Guid userId)
        {
            // Kiểm tra người dùng đã vote cho ứng viên đó, với tiêu chí đó chưa?
            // Nếu chưa thì thêm vào bảng VoteCandidateCheck
            var voted = await _voteInfoRepository.FirstOrDefaultAsync(w => w.UserId == userId && w.VoteCandidateId == candidateId && w.Type == type);
            var votedByType = await _voteInfoRepository.FirstOrDefaultAsync(w => w.UserId == userId && w.Type == type);
            var countVoted = await _voteInfoRepository.GetListAsync(w => w.UserId == userId);
            if (countVoted.Count >= 5) return 2; // Hết lượt vote.
            if (votedByType != null) return 3; // Đã vote cho tiêu chí đó rồi.
            if (voted != null) return 1; // Đã vote cho ứng viên rồi.
            else
            {
                var voteInfo = new VoteInfo
                {
                    UserId = userId,
                    VoteCandidateId = candidateId,
                    Type = type
                };
                await _voteInfoRepository.InsertAsync(voteInfo);
                return 0; // Vote thành công.
            }
        }

        public async Task<int> UnVote(int type, Guid candidateId, Guid userId)
        {
            await _voteInfoRepository.DeleteAsync(w => w.UserId == userId && w.VoteCandidateId == candidateId && w.Type == type);
            return 0;
        }
        public async Task<List<CandidateVoteInfo>> GetListVoted(Guid userId)
        {
            var voteInfos = await _voteInfoRepository.GetListAsync(w => w.UserId == userId);
            var candidateIds = voteInfos.Select(s => s.VoteCandidateId).ToList();
            var candidates = await _voteCandidateRepository.GetListAsync(w => candidateIds.Contains(w.Id));

            var result = voteInfos.Select(voteInfo => new CandidateVoteInfo
            {
                CandidateId = voteInfo.VoteCandidateId,
                Type = voteInfo.Type,
                TypeName = voteInfo.Type switch
                {
                    1 => "Mr. Fashion Icon - Anh Tài Sành Điệu",
                    2 => "Mr. Ginger Salt - Anh Tài Mứt Gừng",
                    3 => "Mr. King of Memes - Anh Tài Hài Hước",
                    4 => "Mr. Problem Solver - Anh Tài Chu Đáo",
                    5 => "Mr. Tech Genius - Anh Tài Công Nghệ",
                    _ => "Unknown"
                },
                CandidateName = candidates.Find(w => w.Id == voteInfo.VoteCandidateId).FullName ?? ""
            }).ToList();
            return result;
        }

        public async Task<List<VoteCountDto>> GetStastic()
        {
            // Get all vote information
            var voteInfos = await _voteInfoRepository.GetListAsync();

            // Group by type and then by candidate, and count the votes
            var groupedVotes = voteInfos
                .GroupBy(v => v.Type)
                .Select(g => new
                {
                    Type = g.Key,
                    Candidates = g.GroupBy(v => v.VoteCandidateId)
                                  .Select(cg => new
                                  {
                                      CandidateId = cg.Key,
                                      VoteCount = cg.Count()
                                  })
                                  .OrderByDescending(c => c.VoteCount)
                                  .Take(3) // Take top 3 candidates for each type
                });

            // Get candidate details
            var candidateIds = groupedVotes.SelectMany(g => g.Candidates.Select(c => c.CandidateId)).ToList();
            var candidates = await _voteCandidateRepository.GetListAsync(w => candidateIds.Contains(w.Id));

            var listResult = new List<VoteCountDto>();

            // Prepare the result
            foreach (var group in groupedVotes)
            {
                foreach (var candidate in group.Candidates)
                {
                    var candidateEntity = candidates.FirstOrDefault(c => c.Id == candidate.CandidateId);
                    if (candidateEntity != null)
                    {
                        listResult.Add(new VoteCountDto
                        {
                            CandidateId = candidate.CandidateId,
                            CandidateName = candidateEntity.FullName,
                            Type = group.Type,
                            TypeName = group.Type switch
                            {
                                1 => "Mr. Fashion Icon - Anh Tài Sành Điệu",
                                2 => "Mr. Ginger Salt - Anh Tài Mứt Gừng",
                                3 => "Mr. King of Memes - Anh Tài Hài Hước",
                                4 => "Mr. Problem Solver - Anh Tài Chu Đáo",
                                5 => "Mr. Tech Genius - Anh Tài Công Nghệ",
                                _ => "Unknown"
                            },
                            VoteCount = candidate.VoteCount,
                            IsWinner = await _voteInfoRepository.FirstOrDefaultAsync(w => w.VoteCandidateId == candidate.CandidateId && w.Type == group.Type && w.IsWinner == true) != null
                        });
                    }
                }
            }

            return listResult;
        }

        private async Task InserMulUser(IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            using (var reader = new StreamReader(stream))
            {
                var jsonData = await reader.ReadToEndAsync();
                UserInputDto[] users;
                try
                {
                    users = JsonSerializer.Deserialize<UserInputDto[]>(jsonData);
                }
                catch (JsonException ex)
                {
                    // Log the error (you can replace this with your logging mechanism)
                    Console.WriteLine($"Error deserializing JSON: {ex.Message}");
                    throw;
                }

                foreach (var userInput in users)
                {
                    var user = new IdentityUser(Guid.NewGuid(), userInput.value, userInput.email, null);
                    await _userManager.CreateAsync(user, "Cmcuni@2024");
                }
            }
        }

        public async Task<int> UpdateWinerStatus(VoteCountDto input)
        {
            if (input != null)
            {
                // Check 
                var existedVoteInfo = await _voteInfoRepository.FirstOrDefaultAsync(w => w.IsWinner != null && w.IsWinner == true && w.Type == input.Type);
                if (existedVoteInfo != null)
                {
                    existedVoteInfo.IsWinner = null;
                    await _voteInfoRepository.UpdateAsync(existedVoteInfo);
                }
                var voteInfo = await _voteInfoRepository.FirstOrDefaultAsync(w => w.VoteCandidateId == input.CandidateId && w.Type == input.Type);
                if (voteInfo != null)
                {
                    voteInfo.IsWinner = true;
                    await _voteInfoRepository.UpdateAsync(voteInfo);
                    return 1;
                }
                else
                    return 0;
            }
            else return 0;
        }
    }

    class UserInputDto
    {
        public string value { get; set; }
        public string email { get; set; }
    }
}