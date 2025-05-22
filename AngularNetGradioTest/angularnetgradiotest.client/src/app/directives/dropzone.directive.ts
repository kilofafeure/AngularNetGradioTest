import { Directive, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: "[appDropZone]"
})

export class DropzoneDirective {
  @Output() onFilesDropped = new EventEmitter<FileList>();

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    console.log('********************* DropzoneDirective: onDrop:', event);
    event.preventDefault();
    if (event.dataTransfer !== null && event.dataTransfer.files.length > 0) {
      this.onFilesDropped.emit(event.dataTransfer.files);
    }
    event.stopPropagation();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('body:drop', ['$event'])
  onBodyDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
