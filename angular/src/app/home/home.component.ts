import { AuthService, ConfigStateService } from '@abp/ng.core';
import { PageAlertService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FileHandleService } from '@proxy/services';
import { CandidateVoteInfo, VoteCandidateDto } from '@proxy/services/dtos';
import { VoteCandidateService } from '@proxy/services/vote-candidates';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // define variables
  candidates: VoteCandidateDto[] = [];
  candidateVoted: CandidateVoteInfo[] = [];
  currentUserId: any;

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private _voteCandidateService: VoteCandidateService,
    private _candidateFile: FileHandleService,
    private _config: ConfigStateService,
    private _toaster: ToasterService
  ) {
    this.currentUserId = this._config.getOne('currentUser').id;
  }

  ngOnInit(): void {
    this._voteCandidateService.getListVotedByUserId(this.currentUserId).subscribe(res => {
      this.candidateVoted = res;
    });

    this._voteCandidateService.getList().subscribe(res => {
      this.candidates = res;

      this.candidates.forEach(candidate => {
        if (candidate.files.length > 0) {
          var filePath = candidate.files[0].filePath;
          this._candidateFile.downloadFileByFileName(filePath).subscribe(res => {
            var file = new Blob([res], { type: 'application/octet-stream' });
            candidate.files[0].filePath = URL.createObjectURL(file);
          });
        } else candidate.files[0].filePath = '';
      });
    });
  }
  removeVote(voteInfo: CandidateVoteInfo) {
    this._voteCandidateService
      .unVoteByTypeAndCandidateIdAndUserId(voteInfo.type, voteInfo.candidateId, this.currentUserId)
      .subscribe(res => {
        this._toaster.success('Xóa vote thành công');
        this.reloadVoted();
      });
  }

  reloadVoted() {
    this._voteCandidateService.getListVotedByUserId(this.currentUserId).subscribe(res => {
      this.candidateVoted = res;
    });
  }
}
