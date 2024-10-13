import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'file-vault';
  fileList: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchFileList();
  }
  onFileUploaded(event: any) {
    this.fetchFileList();
    alert(`File ${event} Uploaded!`);
  }

  onFileDeleted(event: any) {
    this.fetchFileList();
    alert(`File ${event} Deleted!`);
  }

  fetchFileList() {
    this.apiService.getFileList().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.fileList = [];
        data.forEach((file) => {
          this.fileList.push(file);
        });
      }
    });
  }
}
