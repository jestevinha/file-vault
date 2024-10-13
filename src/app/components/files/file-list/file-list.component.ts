import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnChanges {
  @Input()
  files: any[] = [];
  sortedFiles: any[] = [];
  sortBy: string = 'name';
  sortOrder: string = 'desc';
  @Output() fileDeleted = new EventEmitter<string>();
  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['files'] && changes['files'].currentValue) {
      this.sortFiles(); // Sort files whenever the file list changes
    }
  }

  downloadFile(fileName: string) {
    this.apiService.downloadFile(fileName).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    });
  }

  deleteFile(fileName: string) {
    if (confirm(`Are you sure you want to delete the file: ${fileName}?`)) {
      this.apiService.deleteFile(fileName).subscribe(
        (response) => {
          console.log('File deleted:', response);
          this.fileDeleted.emit(fileName);
        },
        (error) => {
          alert(error.error);
        }
      );
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortFiles();
  }
  sortFiles() {
    const orderMultiplier = this.sortOrder === 'asc' ? 1 : -1; // Ascending or descending

    if (this.sortBy === 'name') {
      this.sortedFiles = this.files.slice().sort(
        (a, b) =>
          a.filename.localeCompare(b.filename, undefined, {
            sensitivity: 'base',
          }) * orderMultiplier
      );
    } else if (this.sortBy === 'size') {
      this.sortedFiles = this.files
        .slice()
        .sort((a, b) => (a.size - b.size) * orderMultiplier);
    }
  }
}
