import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  template: `
    <div class="cd">
      @for (p of parts(); track p.l) {
        <div class="cell">
          <span class="v num">{{ p.v < 10 ? '0' + p.v : p.v }}</span>
          <span class="l">{{ p.l }}</span>
        </div>
      }
    </div>
  `,
  styles: `
    .cd { display: flex; gap: .6rem; }
    .cell {
      min-width: 64px; padding: .5rem .7rem; text-align: center;
      background: rgba(255,255,255,.04); border: 1px solid var(--line);
      border-bottom: 2px solid var(--magenta);
    }
    .v { display: block; font-size: 1.8rem; color: var(--text); }
    .l { font-family: var(--font-title); font-size: .8rem; color: var(--muted); letter-spacing: .15em; }
  `,
})
export class Countdown {
  deadline = input.required<string>();
  private now = signal(Date.now());

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  parts = computed(() => {
    let s = Math.max(0, Math.floor((new Date(this.deadline()).getTime() - this.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600);  s %= 3600;
    const m = Math.floor(s / 60);
    return [{ l: 'JOURS', v: d }, { l: 'HEURES', v: h }, { l: 'MIN', v: m }, { l: 'SEC', v: s % 60 }];
  });
}
