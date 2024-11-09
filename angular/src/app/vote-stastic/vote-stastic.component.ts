import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { VoteCountDto } from '@proxy/services/dtos';
import { VoteCandidateService } from '@proxy/services/vote-candidates';

@Component({
  selector: 'app-vote-stastic',
  templateUrl: './vote-stastic.component.html',
  styleUrl: './vote-stastic.component.scss'
})
export class VoteStasticComponent implements OnInit {
  votes: VoteCountDto[] = [];
  
  constructor(private _voteSerVice: VoteCandidateService, private _toaster: ToasterService) { }

  ngOnInit() {
    this._voteSerVice.getStastic().subscribe((res) => {
      this.votes = res;
    });
  }

  voteWinner(item: VoteCountDto) {
    this._voteSerVice.updateWinerStatusByInput(item).subscribe((res) => {
      if (res === 1) {
        this._toaster.success('Cập nhật thành công');
        this._voteSerVice.getStastic().subscribe((res) => {
          this.votes = res;
        });
      } else {
        this._toaster.error('Cập nhật thất bại');
      }
    });
  }

}
