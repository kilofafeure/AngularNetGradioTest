import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  //selector: 'drag-and-drop-files',
  //templateUrl:'./drag-and-drop-files.component.html',
  //styleUrls: './drag-and-drop-files.component.css',
  selector: 'app-drag-and-drop-files',
  templateUrl: './drag-and-drop-files.component.html',
  styleUrl: './drag-and-drop-files.component.css',
  standalone: true,
})

export class DragAndDropFilesComponent {
  @Input() accept: [string] = ['application/pdf'];
  @Output() emitFiles = new EventEmitter<Array<File>>();

  hasErrors: boolean = false;
  errorMessages: string[] = [];
  currentFiles: Array<File> = [];
  disabledDragAndDrop: boolean = false;

  constructor() { }

  onFilesDropped(files: FileList) {
    console.log('********************* onFilesDropped: files: ', files);
    if (!this.disabledDragAndDrop) {
      this.disabledDragAndDrop = true;
      const currentFileNames = this.getFileNames();
      for (let i = 0; i < files.length; i++) {
        const validExtension: boolean = this.accept.includes(files[i].type);
        const existsFile: boolean = currentFileNames.includes(files[i].name);

        if (validExtension && !existsFile) {
          this.currentFiles.push(files[i]);
        }
        else if (!validExtension) {
          this.hasErrors = true;
          this.errorMessages.push('Extensión not allowed - ', files[i].name);
        }
        else {
          this.hasErrors = true;
          this.errorMessages.push('File allready selected - ', files[i].name);
        }
      }
      this.disabledDragAndDrop = false;
      this.emitFiles.emit(this.currentFiles);
    }
  }

  onClick() {
    this.disabledDragAndDrop = true;
    const fileUpload: HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;

    if (fileUpload !== null) {
      fileUpload.onclick = function () {
        fileUpload.value = '';
      };
      fileUpload.onchange = (event: any) => {
        this.hasErrors = false;
        const selectedFiles = event?.target?.files ?? [];
        if (fileUpload?.files !== null && fileUpload.files.length > 0) {
          const currentFileNames = this.getFileNames();
          for (let i = 0; i < selectedFiles.length; i++) {
            const validExtension: boolean = this.accept.includes(selectedFiles[i].type);
            const existsFile: boolean = currentFileNames.includes(selectedFiles[i].name);
            if (validExtension && !existsFile) {
              this.currentFiles.push(selectedFiles[i]);
            }
            else if (!validExtension) {
              this.hasErrors = true;
              const errorMes = 'Extensión not allowed - ' + selectedFiles[i].name;
              if (!this.errorMessages.includes(errorMes)) {
                this.errorMessages.push(errorMes);
              }
            }
            else {
              this.hasErrors = true;
              const errorMes = 'File allready selected - ' + selectedFiles[i].name;
              if (!this.errorMessages.includes(errorMes)) {
                this.errorMessages.push(errorMes);
              }
            }
          }
          this.emitFiles.emit(this.currentFiles);
        }
        this.disabledDragAndDrop = false;
      }
    };

    fileUpload.onclose = () => {
      this.disabledDragAndDrop = false;
    }

    fileUpload.oncancel = () => {
      this.disabledDragAndDrop = false;
    }

    fileUpload.click();
  }

  getFileNames(): string[] {
    let fileNames: string[] = [];
    for (let i = 0; i < this.currentFiles.length; i++) {
      fileNames.push(this.currentFiles[i].name);
    }
    return fileNames;
  }

  removeErrors() {
    this.hasErrors = false;
    this.errorMessages = [];
  }

  removeFile(file: File) {
    var index = this.currentFiles.indexOf(file);
    if (index > -1) {
      this.currentFiles.splice(index, 1);
    }
    this.emitFiles.emit(this.currentFiles);
  }

  removeFiles() {
    this.currentFiles = [];
    this.emitFiles.emit([]);
  }
}
