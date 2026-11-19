import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-box',
  template: `
    <div class="card err reveal">
      <h3>Erreur</h3>
      <p>{{ message() }}</p>
      @if (retryable()) {
        <button class="btn danger" (click)="retry.emit()">Réessayer</button>
      }
    </div>
  `,
  styles: `
    .err { border-color: rgba(233,0,82,.5); }
    .err::before { background: var(--magenta); box-shadow: 0 0 24px rgba(233,0,82,.5); }
    h3 { color: var(--magenta); margin-bottom: .6rem; }
    p { margin: 0 0 1rem; color: var(--text); }
  `,
})
export class ErrorBox {
  message = input.required<string>();
  retryable = input(true);
  retry = output<void>();
}