import { Component, OnInit } from '@angular/core';
import { FileHandleService } from '@proxy/services';
import { CandidateFileDto, VoteCandidateDto } from '@proxy/services/dtos';
import { VoteCandidateService } from '@proxy/services/vote-candidates';
import { FormControl } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { PageAlertService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-candidate-management',
  standalone: true,
  imports: [SharedModule, TableModule, InputTextModule, ButtonModule, FileUploadModule],
  templateUrl: './candidate-management.component.html',
  styleUrl: './candidate-management.component.scss',
})
export class CandidateManagementComponent implements OnInit {
  candidates: VoteCandidateDto[] = [];
  formData: FormControl;
  candidate: VoteCandidateDto;
  candidateFile: CandidateFileDto = {};
  fileExtention: string;

  constructor(
    private _voteCandidateService: VoteCandidateService,
    private _candidateFile: FileHandleService,
    private _alert: PageAlertService
  ) {}

  ngOnInit(): void {
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

    this.candidate = {
      id: null,
      fullName: '',
      department: '',
      note: '',
      files: [],
    };
  }
  save() {
    if (
      this.candidate.files.length === 0 ||
      this.candidate.fullName === '' ||
      this.candidate.note === ''
    ) {
      this._alert.show({
        type: 'warning',
        message: 'Vui lòng nhập đầy đủ thông tin',
        title: 'Nhập thông tin',
      });
    } else {
      const myFormData = new FormData();
      myFormData.append('file', this.candidate.files[0] as Blob);
      this.candidate.id = '5fba337b-8622-4a2f-95d7-b323db279f26';
      // create new candidate
      this._voteCandidateService.create(this.candidate).subscribe(res1 => {
        this._candidateFile.uploadFileByFile(myFormData).subscribe(res2 => {
          this.candidateFile.filePath = res2;
          this.candidateFile.voteCandidateId = res1.replace(/['"]+/g, '');
          this._voteCandidateService
            .saveFileOfCandidateByInput(this.candidateFile)
            .subscribe(res3 => {
              this._alert.show({
                type: 'success',
                message: 'Thêm ứng viên thành công',
                title: 'Thêm ứng viên',
              });
              this.ngOnInit();
            });
        });
      });
    }
  }

  onFilechange(event: any) {
    this.candidate.files.push(event.target.files[0]);
    this.candidateFile.fileName = event.target.files[0].name;
    this.fileExtention = event.target.files[0].name.split('.').pop();
  }

  removeCandidate(id: any) {
    this._voteCandidateService.removeCandidateById(id).subscribe(res => {
      this._alert.show({
        type: 'success',
        message: 'Xóa ứng viên thành công',
        title: 'Xóa ứng viên',
      });
      this.ngOnInit();
    });
  }
}
