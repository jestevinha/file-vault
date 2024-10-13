import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api';
  constructor(private http: HttpClient) {}
  getFileList() {
    return this.http.get(`${this.apiUrl}/files`);
  }
  downloadFile(fileName: string) {
    return this.http.get(`${this.apiUrl}/download/${fileName}`, {
      responseType: 'blob',
    });
  }
  uploadFile(formData: FormData) {
    return this.http.post('/api/upload', formData);
  }

  deleteFile(fileName: string) {
    return this.http.delete(`/api/delete/${fileName}`);
  }
}
