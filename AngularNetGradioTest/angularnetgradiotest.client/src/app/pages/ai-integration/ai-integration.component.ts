import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragAndDropFilesComponent } from '../../components/drag-and-drop-files/drag-and-drop-files.component';
import { LoadingService } from '../../services/loading.service';
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-aiintegration',
  templateUrl: './ai-integration.component.html',
  styleUrl: './ai-integration.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, DragAndDropFilesComponent]
})
export class AIIntegrationComponent {
  messages: ChatMessage[] = [
    { sender: 'bot', text: 'How can I help you today?' }
  ];
  userInput: string = '';
  isLoading = false;
  showFileDropper = false;
  files: File[] = [];

  @ViewChild('chatHistory') chatHistory!: ElementRef<HTMLDivElement>;

  constructor(private loadingService: LoadingService) { }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.loadingService.setLoading(true);
    const userMsg = this.userInput.trim();
    this.messages.push({ sender: 'user', text: userMsg });
    this.userInput = '';
    this.isLoading = true;

    //this.aiService.predict(this.textoUsuario, this.files).subscribe({
    //  next: (result) => {
    //  },
    //  error: (err) => {
    //  },
    //  complete: () => {
    //    this.isLoading = false;
    //  }
    //});

    // Simulate AI response
    setTimeout(() => {
      this.messages.push({ sender: 'bot', text: 'Response to: ' + userMsg });
      this.isLoading = false;
      setTimeout(() => this.scrollToBottom(), 50);
    }, 1200);
    setTimeout(() => this.scrollToBottom(), 10);
  }

  toggleFileDropper() {
    this.showFileDropper = !this.showFileDropper;
  }

  onFilesDropped(files: File[]) {
    for (let i = 0; i < files.length; i++) {
      if (!this.files.includes(files[i])) {
        this.files.push(files[i]);
      }
    }
  }

  scrollToBottom() {
    if (this.chatHistory && this.chatHistory.nativeElement) {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    }
  }
}
