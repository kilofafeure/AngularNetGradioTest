import { Component } from '@angular/core';
import { AIService } from '../../services/ai.service';
import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';

@Component({
  selector: 'app-aiintegration',
  templateUrl: './ai-integration.component.html',
  styleUrl: './ai-integration.component.css',
  standalone: true,
  imports: [ DragAndDropFilesComponent ]
})
export class AIIntegrationComponent {
  constructor(private aiService: AIService) { }
  files: File[] = [];
  errorMessage: string = '';
  showErrorMessage: boolean = false

  selectedFiles($event: Array<File>) {
    for (let i = 0; i < $event.length; i++) {
      if (!this.files.includes($event[i])) {
        this.files.push($event[i]);
      }
    }
  }

  sendFilesToPredict() {
    if (this.files.length > 0) {
      this.hideError();

    }
    else {
      this.showError('Not files selected');
    }
  }

  private hideError() {
    this.errorMessage = '';
    this.showErrorMessage = false;
  }

  private showError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorMessage = true;
  }
}
