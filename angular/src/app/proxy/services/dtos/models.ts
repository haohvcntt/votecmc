
export interface CandidateFileDto {
  voteCandidateId?: string;
  fileName?: string;
  filePath?: string;
}

export interface CandidateVoteInfo {
  candidateId?: string;
  candidateName?: string;
  typeName?: string;
  type?: number;
}

export interface VoteCandidateDto {
  id?: string;
  fullName?: string;
  department?: string;
  note?: string;
  files: CandidateFileDto[];
}

export interface VoteCountDto {
  candidateId?: string;
  candidateName?: string;
  voteCount?: number;
  type?: number;
  typeName?: string;
  isWinner?: boolean;
}
