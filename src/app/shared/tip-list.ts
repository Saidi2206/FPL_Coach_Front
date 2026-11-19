import { Component, input } from '@angular/core';

export interface TipRow {
  name: string;
  sub?: string;
  value?: string;
  tone?: 'up' | 'down' | '';
}

@Component({
  selector: 'app-tip-list',
  template: `
    <h3>{{ title() }}</h3>
    <div class="card list">
      @for (r of rows(); track r.name; let i = $index) {
        <div class="row reveal" [style.animation-delay.ms]="i * 50">
          <div class="who">
            <b>{{ r.name }}</b>
            @if (r.sub) { <span class="muted small">{{ r.sub }}</span> }
          </div>
          @if (r.value) {
            <span class="num" [class.up]="r.tone === 'up'" [class.down]="r.tone === 'down'">{{ r.value }}</span>
          }
        </div>
      } @empty {
        <p class="muted empty">{{ empty() }}</p>
      }
    </div>
  `,
  styles: `
    h3 { margin-bottom: .8rem; }
    .list { padding: .4rem 1.25rem; }
    .row { display: flex; align-items: center; gap: 1rem; padding: .75rem 0; border-bottom: 1px solid var(--line); }
    .row:last-child { border-bottom: 0; }
    .who { flex: 1; display: grid; }
    .small { font-size: .8rem; }
    .empty { margin: .8rem 0; }
  `,
})
export class TipList {
  title = input.required<string>();
  rows = input.required<TipRow[]>();
  empty = input('Rien à signaler.');
}