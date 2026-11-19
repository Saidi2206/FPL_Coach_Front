import { Component, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../core/api.service';
import { ChipsPlan } from '../core/models';
import { fmtDate } from '../core/format';
import { errMsg } from '../core/http-error';
import { StatBar } from '../shared/stat-bar';
import { Loader } from '../shared/loader';
import { ErrorBox } from '../shared/error-box';

const LABELS: Record<string, string> = {
  wildcard: 'Wildcard', freehit: 'Free Hit', bboost: 'Bench Boost', '3xc': 'Triple Captain',
};

@Component({
  selector: 'app-chips',
  imports: [RouterLink, StatBar, Loader, ErrorBox],
  templateUrl: './chips.html',
  styleUrl: './chips.css',
})
export class Chips {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  id = signal(0);
  data = signal<ChipsPlan | null>(null);
  loading = signal(true);
  error = signal('');

  date = fmtDate;
  label = (n: string) => LABELS[n] ?? n;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(pm => {
      this.id.set(Number(pm.get('id')));
      this.load();
    });
  }

  load() {
    this.loading.set(true);
    this.error.set('');
    this.data.set(null);
    this.api.chips(this.id()).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: (e: HttpErrorResponse) => { this.error.set(errMsg(e)); this.loading.set(false); },
    });
  }

  maxWc = computed(() => Math.max(1, ...(this.data()?.wildcard ?? []).map(x => x.gain)));
  maxFh = computed(() => Math.max(1, ...(this.data()?.freehit ?? []).map(x => x.gain)));
  maxBb = computed(() => Math.max(1, ...(this.data()?.benchboost ?? []).map(x => Math.max(x.bench, x.bench_mine))));
}