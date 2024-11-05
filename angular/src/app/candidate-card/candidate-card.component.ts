import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoteCandidateDto } from '@proxy/services/dtos';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [],
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.scss'
})
export class CandidateCardComponent {
  @Input() candidate!: VoteCandidateDto;
  @Output() vote = new EventEmitter<void>();

  onVote() {
    this.vote.emit();
  }
}
