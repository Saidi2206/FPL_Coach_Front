import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    @if (message()) {
      <p class="msg"><span class="dot"></span>{{ message() }}</p>
    }
    <div class="grid cols-3">
      @for (i of items(); track $index) { <div class="card skeleton"></div> }
    </div>
  `,
  styles: `
    .msg {
      display: flex; align-items: center; gap: .8rem;
      font-family: var(--font-num); font-size: .9rem; color: var(--cyan);
      margin: 0 0 1.2rem;
    }
    .dot {
      width: 10px; height: 10px; background: var(--neon); box-shadow: var(--glow);
      animation: pulse 1s ease-in-out infinite;
    }
    @keyframes pulse { 50% { opacity: .2; transform: scale(.6); } }
  `,
})
export class Loader {
  message = input('');
  count = input(3);
  items = computed(() => Array.from({ length: this.count() }));
}