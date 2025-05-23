import { Component, Renderer2, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, HeaderComponent]
})
export class AppComponent implements OnDestroy {
  private renderer = inject(Renderer2);
  private loadingSub: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loadingSub = this.loadingService.isLoading$.subscribe(isLoading => {
      this.renderer.setStyle(document.body, 'cursor', isLoading ? 'wait' : 'default');
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
