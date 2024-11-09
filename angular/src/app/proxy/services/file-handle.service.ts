import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileHandleService {
  apiName = 'Default';
  

  downloadFileByFileName = (fileName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'POST',
      responseType: 'blob',
      url: '/api/app/file-handle/download-file',
      params: { fileName },
    },
    { apiName: this.apiName,...config });
  

  uploadFileByFile = (file: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/app/file-handle/upload-file',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
