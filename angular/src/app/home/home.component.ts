import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { VoteCandidateDto } from '@proxy/services/dtos';
import { VoteCandidateService } from '@proxy/services/vote-candidates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // define variables
  voteCandidates: VoteCandidateDto[] = [];


  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService,
    private voteService: VoteCandidateService,
  ) {}

  ngOnInit(): void {
  //   this.voteService.getList().subscribe((result) => {
  //     // this.voteCandidates = result;  
  //     this.voteCandidates = [
  //       {
  //         fullName: 'Nguyễn Ngọc Thùy',
  //         note: 'Chuyên viên',
  //         department: 'Phòng Đào tạo'
  //       },];
  // });
  this.voteCandidates = [
    { fullName: 'Đặng Thanh Hùng', note: 'Giám đốc', department: 'Phòng Hành chính' },
    { fullName: 'Bùi Thị Hằng', note: 'Quản lý', department: 'Phòng Hành chính' },
    { fullName: 'Đặng Diệu Nhi', note: 'Thực tập sinh', department: 'Phòng Công nghệ' },
    { fullName: 'Lê Thanh Hùng', note: 'Thực tập sinh', department: 'Phòng Đào tạo' },
    { fullName: 'Phạm Phương Linh', note: 'Kế toán viên', department: 'Phòng Nhân sự' },
    { fullName: 'Phạm Minh Quân', note: 'Quản lý', department: 'Phòng Kinh doanh' },
    { fullName: 'Võ Minh Quân', note: 'Thực tập sinh', department: 'Phòng Kinh doanh' },
    { fullName: 'Bùi Thu Hương', note: 'Nhân viên', department: 'Phòng Pháp lý' },
    { fullName: 'Lê Văn Nam', note: 'Nhân viên', department: 'Phòng Công nghệ' },
    { fullName: 'Võ Anh Tuấn', note: 'Trưởng phòng', department: 'Phòng Nhân sự' },
    { fullName: 'Đặng Phương Linh', note: 'Giám đốc', department: 'Phòng Nhân sự' },
    { fullName: 'Đặng Anh Tuấn', note: 'Trưởng phòng', department: 'Phòng Kế toán' },
    { fullName: 'Phạm Văn Nam', note: 'Giám đốc', department: 'Phòng Công nghệ' },
    { fullName: 'Lê Thanh Hùng', note: 'Kỹ sư', department: 'Phòng Hành chính' },
    { fullName: 'Đặng Tấn Phát', note: 'Chuyên viên', department: 'Phòng Đào tạo' },
    { fullName: 'Hoàng Anh Tuấn', note: 'Giám đốc', department: 'Phòng Hành chính' },
    { fullName: 'Đặng Văn Nam', note: 'Thực tập sinh', department: 'Phòng Kế toán' },
    { fullName: 'Võ Ngọc Thùy', note: 'Trưởng phòng', department: 'Phòng Hành chính' },
    { fullName: 'Nguyễn Tấn Phát', note: 'Quản lý', department: 'Phòng Hành chính' },
    { fullName: 'Bùi Thu Hương', note: 'Giám đốc', department: 'Phòng Kinh doanh' },
    { fullName: 'Bùi Ngọc Thùy', note: 'Nhân viên', department: 'Phòng Pháp lý' },
    { fullName: 'Võ Thị Hằng', note: 'Trưởng phòng', department: 'Phòng Marketing' },
    { fullName: 'Phan Thanh Hùng', note: 'Giám đốc', department: 'Phòng Marketing' },
    { fullName: 'Đặng Minh Quân', note: 'Nhân viên', department: 'Phòng Hành chính' },
    { fullName: 'Đặng Minh Quân', note: 'Kế toán viên', department: 'Phòng Hành chính' },
    { fullName: 'Trần Thị Hằng', note: 'Kế toán viên', department: 'Phòng Pháp lý' },
    { fullName: 'Phan Văn Nam', note: 'Trưởng phòng', department: 'Phòng Marketing' },
    { fullName: 'Võ Phương Linh', note: 'Chuyên viên', department: 'Phòng Pháp lý' },
    { fullName: 'Võ Anh Tuấn', note: 'Quản lý', department: 'Phòng Kế toán' },
    { fullName: 'Đặng Thị Hằng', note: 'Chuyên viên', department: 'Phòng Công nghệ' },
    { fullName: 'Bùi Phương Linh', note: 'Quản lý', department: 'Phòng Hành chính' },
    { fullName: 'Lê Ngọc Thùy', note: 'Kế toán viên', department: 'Phòng Công nghệ' },
    { fullName: 'Võ Anh Tuấn', note: 'Quản lý', department: 'Phòng Kế toán' },
    { fullName: 'Bùi Ngọc Thùy', note: 'Nhân viên', department: 'Phòng Công nghệ' },
    { fullName: 'Phan Văn Nam', note: 'Kỹ sư', department: 'Phòng Nhân sự' },
    { fullName: 'Nguyễn Thu Hương', note: 'Quản lý', department: 'Phòng Kinh doanh' },
    { fullName: 'Hoàng Phương Linh', note: 'Giám đốc', department: 'Phòng Đào tạo' },
    { fullName: 'Vũ Ngọc Thùy', note: 'Nhân viên', department: 'Phòng Marketing' },
    { fullName: 'Nguyễn Anh Tuấn', note: 'Trưởng phòng', department: 'Phòng Đào tạo' },
    { fullName: 'Bùi Văn Nam', note: 'Chuyên viên', department: 'Phòng Kế toán' }
  ];
  
  }

}
