import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoteCandidateDto } from '@proxy/services/dtos';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfigStateService } from '@abp/ng.core';
import { VoteCandidateService } from '@proxy/services/vote-candidates';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.scss',
})
export class CandidateCardComponent implements OnInit {
  @Input() candidate!: VoteCandidateDto;
  @Output() vote = new EventEmitter<void>();
  currentUserId: any;

  constructor(private _config: ConfigStateService, private _service: VoteCandidateService, private _toaster: ToasterService) {
    this.currentUserId = this._config.getOne('currentUser').id;
  }
  ngOnInit(): void {}

  onVote(type: number, candidateId: string) {
    this._service
      .voteCandidateCheckByTypeAndCandidateIdAndUserId(type, candidateId, this.currentUserId)
      .subscribe(res => {
        if (res == 0) { // Vote thanh cong
          this._toaster.success('Vote thành công');
          this.vote.emit();
        }
        if (res == 1) { // Da vote
          this._toaster.error('Bạn đã vote cho ứng viên này rồi');
        }
        if (res == 2) { // Het luot vote
          this._toaster.error('Bạn đã hết lượt vote. Mỗi người chỉ được vote 5 lần.');
        } 
        if (res == 3) {
          this._toaster.error('Bạn đã vote cho tiêu chí này rồi.');
        }
      });
  }
}
