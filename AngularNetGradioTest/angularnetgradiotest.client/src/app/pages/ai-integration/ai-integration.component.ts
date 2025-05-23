import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-aiintegration',
  templateUrl: './ai-integration.component.html',
  styleUrl: './ai-integration.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AIIntegrationComponent {
  messages: ChatMessage[] = [
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ];
  userInput: string = '';
  isLoading = false;

  @ViewChild('chatHistory') chatHistory!: ElementRef<HTMLDivElement>;

  sendMessage() {
    if (!this.userInput.trim()) return;
    const userMsg = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMsg });
    this.userInput = '';
    this.isLoading = true;
    setTimeout(() => {
      // Simulate AI response
      this.messages.push({ sender: 'bot', text: 'Copilot response to: ' + userMsg });
      this.isLoading = false;
      setTimeout(() => this.scrollToBottom(), 50);
    }, 1200);
    setTimeout(() => this.scrollToBottom(), 10);
  }

  scrollToBottom() {
    if (this.chatHistory && this.chatHistory.nativeElement) {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    }
  }
}

//import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { AIService } from '../../services/ai.service';
//import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';

//@Component({
//  selector: 'app-aiintegration',
//  templateUrl: './ai-integration.component.html',
//  styleUrl: './ai-integration.component.css',
//  standalone: true,
//  imports: [DragAndDropFilesComponent, FormsModule ]
//})
//export class AIIntegrationComponent {
//  constructor(private aiService: AIService) { }
//  files: File[] = [];
//  errorMessage: string = '';
//  showErrorMessage: boolean = false;
//  showDragAndDrop: boolean = false;
//  textoApp: string = '¿Te puedo ayudar en algo? Puedes preguntarme y/o adjuntar ficheros pdf';
//  textoUsuario: string = '';
//  isLoading: boolean = false;
//  disabledForm: boolean = false;

//  abrirDragAndDrop() {
//    this.showDragAndDrop = !this.showDragAndDrop;
//  }

//  selectedFiles($event: Array<File>) {
//    for (let i = 0; i < $event.length; i++) {
//      if (!this.files.includes($event[i])) {
//        this.files.push($event[i]);
//      }
//    }
//  }

//  predict() {
//    this.disabledForm = true;
//    this.isLoading = true;
//    //this.aiService.predict(this.textoUsuario, this.files).subscribe({
//    //  next: (result) => {
//    //  },
//    //  error: (err) => {
//    //  },
//    //  complete: () => {
//    //    this.isLoading = false;
//    //  }
//    //});
//  }

//  private hideError() {
//    this.errorMessage = '';
//    this.showErrorMessage = false;
//  }

//  private showError(errorMessage: string) {
//    this.errorMessage = errorMessage;
//    this.showErrorMessage = true;
//  }
//}
