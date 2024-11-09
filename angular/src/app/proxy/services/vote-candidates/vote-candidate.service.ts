import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CandidateFileDto, CandidateVoteInfo, VoteCandidateDto, VoteCountDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class VoteCandidateService {
  apiName = 'Default';
  

  create = (input: VoteCandidateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/vote-candidate',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VoteCandidateDto[]>({
      method: 'GET',
      url: '/api/app/vote-candidate',
    },
    { apiName: this.apiName,...config });
  

  getListVotedByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CandidateVoteInfo[]>({
      method: 'GET',
      url: `/api/app/vote-candidate/voted/${userId}`,
    },
    { apiName: this.apiName,...config });
  

  getStastic = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VoteCountDto[]>({
      method: 'GET',
      url: '/api/app/vote-candidate/stastic',
    },
    { apiName: this.apiName,...config });
  

  removeCandidateById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'DELETE',
      responseType: 'text',
      url: `/api/app/vote-candidate/${id}/candidate`,
    },
    { apiName: this.apiName,...config });
  

  saveFileOfCandidateByInput = (input: CandidateFileDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/vote-candidate/save-file-of-candidate',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  unVoteByTypeAndCandidateIdAndUserId = (type: number, candidateId: string, userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'POST',
      url: '/api/app/vote-candidate/un-vote',
      params: { type, candidateId, userId },
    },
    { apiName: this.apiName,...config });
  

  update = (Id: string, input: VoteCandidateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/vote-candidate',
      params: { id: Id },
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateWinerStatusByInput = (input: VoteCountDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'PUT',
      url: '/api/app/vote-candidate/winer-status',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  voteCandidateCheckByTypeAndCandidateIdAndUserId = (type: number, candidateId: string, userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'POST',
      url: '/api/app/vote-candidate/vote-candidate-check',
      params: { type, candidateId, userId },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
