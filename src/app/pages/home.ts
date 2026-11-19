import { Component, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { Meta, TipPlayer, Tips } from '../core/models';
import { compact, fmtDate, fmtPrice, signed } from '../core/format';
import { Countdown } from '../shared/countdown';
import { StatBar } from '../shared/stat-bar';

type Pos = 'GKP' | 'DEF' | 'MID' | 'FWD';

@Component({
  selector: 'app-home',
  imports: [Countdown, StatBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private api = inject(ApiService);
  private router = inject(Router);

  meta = signal<Meta | null>(null);
  tips = signal<Tips | null>(null);
  error = signal('');

  id = signal('');
  valid = computed(() => /^\d{1,9}$/.test(this.id().trim()));

  positions: Pos[] = ['GKP', 'DEF', 'MID', 'FWD'];
  pos = signal<Pos>('MID');

  price = fmtPrice;
  signed = signed;
  compact = compact;
  date = fmtDate;

  constructor() {
    this.api.meta().subscribe({ next: m => this.meta.set(m), error: e => this.fail(e) });
    this.api.tips().subscribe({ next: t => this.tips.set(t), error: e => this.fail(e) });
  }

  maxOf(list: TipPlayer[], key: 'xpts' | 'pts4'): number {
    return Math.max(1, ...list.map(p => p[key] ?? 0));
  }

  maxScore(list: { score: number }[]): number {
    return Math.max(1, ...list.map(x => x.score));
  }

  go(ev: Event) {
    ev.preventDefault();
    if (this.valid()) this.router.navigate(['/team', this.id().trim()]);
  }

  private fail(e: HttpErrorResponse) {
    this.error.set(
      e.status === 503
        ? 'Aucune prédiction disponible : lance train_job.py côté back.'
        : 'Impossible de joindre le back. Vérifie que uvicorn tourne sur le port 8000.'
    );
  }
}