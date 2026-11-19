import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  template: `<div class="track"><div class="fill" [style.width.%]="pct()"></div></div>`,
  styles: `
    .track { height: 6px; background: rgba(255,255,255,.08); }
    .fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon), var(--cyan));
      box-shadow: 0 0 10px rgba(0,255,133,.5);
      transition: width .8s cubic-bezier(.2,.8,.2,1);
    }
  `,
})
export class StatBar {
  value = input.required<number>();
  max = input.required<number>();
  pct = computed(() => (this.max() > 0 ? Math.max(0, Math.min(100, (this.value() / this.max()) * 100)) : 0));
}