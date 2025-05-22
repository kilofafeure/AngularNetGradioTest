import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AIService } from '../../services/ai.service';
import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';

@Component({
  selector: 'app-aiintegration',
  templateUrl: './ai-integration.component.html',
  styleUrl: './ai-integration.component.css',
  standalone: true,
  imports: [DragAndDropFilesComponent, FormsModule ]
})
export class AIIntegrationComponent {
  constructor(private aiService: AIService) { }
  files: File[] = [];
  errorMessage: string = '';
  showErrorMessage: boolean = false;
  showDragAndDrop: boolean = false;
  textoUsuario = '';
  disabledForm: boolean = false;

  abrirDragAndDrop() {
    this.showDragAndDrop = !this.showDragAndDrop;
  }

  selectedFiles($event: Array<File>) {
    for (let i = 0; i < $event.length; i++) {
      if (!this.files.includes($event[i])) {
        this.files.push($event[i]);
      }
    }
  }

  predict() {
    this.disabledForm = true;
    // Lógica para enviar el texto
    console.log(this.textoUsuario);
    this.disabledForm = false;
  }

  //sendFilesToPredict() {
  //  if (this.files.length > 0) {
  //    this.hideError();

  //  }
  //  else {
  //    this.showError('Not files selected');
  //  }
  //}

  private hideError() {
    this.errorMessage = '';
    this.showErrorMessage = false;
  }

  private showError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showErrorMessage = true;
  }
}
