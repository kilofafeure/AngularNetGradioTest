import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-files',
  templateUrl: './drag-and-drop-files.component.html',
  styleUrls: ['./drag-and-drop-files.component.css'],
  standalone: true,
})
export class DragAndDropFilesComponent {
  @Input() accept: string[] = ['application/pdf'];
  @Output() emitFiles = new EventEmitter<File[]>();

  files: File[] = [];
  errors: string[] = [];
  isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
      input.value = '';
    }
  }

  handleFiles(fileList: FileList) {
    this.errors = [];
    const existingNames = this.files.map(f => f.name);

    Array.from(fileList).forEach(file => {
      if (!this.accept.includes(file.type)) {
        this.errors.push(`Extensión no permitida: ${file.name}`);
      } else if (existingNames.includes(file.name)) {
        this.errors.push(`Archivo ya seleccionado: ${file.name}`);
      } else {
        this.files.push(file);
      }
    });

    this.emitFiles.emit(this.files);
  }

  removeFile(file: File) {
    this.files = this.files.filter(f => f !== file);
    this.emitFiles.emit(this.files);
  }

  removeFiles() {
    this.files = [];
    this.emitFiles.emit(this.files);
  }

  clearErrors() {
    this.errors = [];
  }

  removeError(error: string) {
    this.errors = this.errors.filter(e => e !== error);
  }
}
