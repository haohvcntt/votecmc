import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { VoteCandidateDto } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class VoteCandidateService {
  apiName = 'Default';
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, VoteCandidateDto[]>({
      method: 'GET',
      url: '/api/app/vote-candidate',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
