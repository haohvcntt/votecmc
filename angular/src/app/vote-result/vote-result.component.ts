import { Component, OnInit } from '@angular/core';
import { FileHandleService } from '@proxy/services';
import { VoteCandidateDto, VoteCountDto } from '@proxy/services/dtos';
import { VoteCandidateService } from '@proxy/services/vote-candidates';

@Component({
  selector: 'app-vote-result',
  templateUrl: './vote-result.component.html',
  styleUrl: './vote-result.component.scss',
})
export class VoteResultComponent implements OnInit {
  votes: VoteCountDto[] = [];
  winnerCandidates: VoteCandidateDto[] = [];
  candidateImages: { [key: string]: string } = {};

  constructor(
    private _voteSerVice: VoteCandidateService,
    private _voteCandidateService: VoteCandidateService,
    private _candidateFile: FileHandleService
  ) {}
  ngOnInit() {
    this._voteSerVice.getStastic().subscribe(res => {
      this.votes = res.filter(item => item.isWinner === true);
      this._voteCandidateService.getList().subscribe(res => {
        this.winnerCandidates = res.filter(candidate =>
          this.votes.some(vote => vote.candidateId === candidate.id)
        );
        this.winnerCandidates.forEach(candidate => {
          if (candidate.files.length > 0) {
            var filePath = candidate.files[0].filePath;
            this._candidateFile.downloadFileByFileName(filePath).subscribe(res => {
              var file = new Blob([res], { type: 'application/octet-stream' });
              candidate.files[0].filePath = URL.createObjectURL(file);
            });
          } else candidate.files[0].filePath = '';
          this.candidateImages[candidate.id] = candidate.files[0].filePath;
        });
      
        console.log('this.candidateImages', this.candidateImages);
        console.log('this.winnerCandidates', this.winnerCandidates);
        console.log('this.votes', this.votes);

      });
    });
  }
}
