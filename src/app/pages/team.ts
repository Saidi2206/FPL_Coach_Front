import { Component, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../core/api.service';
import { TeamAnalysis } from '../core/models';
import { compact, fmtDate, fmtInt, fmtPrice } from '../core/format';
import { errMsg } from '../core/http-error';
import { Countdown } from '../shared/countdown';
import { StatBar } from '../shared/stat-bar';
import { Pitch } from '../shared/pitch';
import { PlayerCard } from '../shared/player-card';
import { TipList, TipRow } from '../shared/tip-list';
import { Loader } from '../shared/loader';
import { ErrorBox } from '../shared/error-box';

const STATUS: Record<string, string> = {
  d: 'Douteux', i: 'Blessé', s: 'Suspendu', u: 'Indisponible', n: 'Absent',
};

@Component({
  selector: 'app-team',
  imports: [RouterLink, Countdown, StatBar, Pitch, PlayerCard, TipList, Loader, ErrorBox],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  id = signal(0);
  data = signal<TeamAnalysis | null>(null);
  loading = signal(true);
  error = signal('');

  fmtInt = fmtInt;
  price = fmtPrice;
  date = fmtDate;

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
    this.api.team(this.id()).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: (e: HttpErrorResponse) => { this.error.set(errMsg(e)); this.loading.set(false); },
    });
  }

  status(s: string) { return STATUS[s] ?? s; }

  // échelle du graphique d'historique
  histMax = computed(() => {
    const d = this.data();
    return d ? Math.max(1, ...d.history.gws.map(g => Math.max(g.points, g.average ?? 0))) : 1;
  });

  // option de transfert recommandée (même règle que le back : meilleur net, sinon 0)
  bestMax = computed(() => {
    const o = this.data()?.transfers.options ?? [];
    if (!o.length) return 0;
    const best = o.reduce((a, b) => (b.net > a.net ? b : a));
    return best.net > 0 ? best.max : 0;
  });

  netMax = computed(() => Math.max(1, ...(this.data()?.transfers.options ?? []).map(o => o.net)));

  weakest = computed<TipRow[]>(() =>
    (this.data()?.tips.mine?.weakest ?? []).map(w => ({
      name: w.name,
      sub: `${w.pos} · ${fmtPrice(w.price)}${w.news ? ' · ' + w.news : ''}`,
      value: `${w.pts4} xPts`,
    })));

  leaving = computed<TipRow[]>(() =>
    (this.data()?.tips.mine?.leaving ?? []).map(l => ({
      name: l.name, sub: fmtPrice(l.price), value: compact(l.net), tone: 'down' as const,
    })));
}