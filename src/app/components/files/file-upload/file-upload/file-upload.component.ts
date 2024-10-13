import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  @Output() fileUploaded = new EventEmitter<string>();
  constructor(private apiService: ApiService) {}
  onFileSelected(event: any) {
    let file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');

    reader.onload = () => {
      this.selectedFile = file;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  }
  hasFileSelected() {
    return this.selectedFile !== null;
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.apiService.uploadFile(formData).subscribe((response) => {
        console.log('File uploaded successfully!', response);
        this.fileUploaded.emit(this.selectedFile?.name);
        this.selectedFile = null;
      });
    }
  }
}
