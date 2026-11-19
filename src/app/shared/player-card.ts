import { Component, input } from '@angular/core';
import { Pl } from '../core/models';
import { fmtPrice } from '../core/format';

@Component({
  selector: 'app-player-card',
  template: `
    <div class="pc" [class.row]="mode() === 'row'">
      @if (role()) { <span class="role" [class.v]="role() === 'V'">{{ role() }}</span> }
      <span class="pos" [attr.data-pos]="player().pos">{{ player().pos }}</span>
      <div class="info">
        <b class="name">{{ player().name }}</b>
        <span class="team">{{ player().team }}</span>
      </div>
      <div class="nums">
        <span class="x num">{{ player().xpts }}</span>
        <span class="p num">{{ price(player().price) }}</span>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .pc {
      position: relative; display: flex; flex-direction: column; align-items: center;
      gap: .3rem; width: 96px; text-align: center;
    }
    .pos {
      font-family: var(--font-title); font-size: .8rem; letter-spacing: .05em;
      padding: .45rem .9rem; color: #0a0612; background: var(--neon);
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    }
    .pos[data-pos='GKP'] { background: #ffd23f; }
    .pos[data-pos='DEF'] { background: var(--cyan); }
    .pos[data-pos='MID'] { background: var(--neon); }
    .pos[data-pos='FWD'] { background: var(--magenta); color: #fff; }

    .info { display: grid; min-width: 0; }
    .name {
      font-size: .85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      max-width: 96px;
    }
    .team { font-size: .7rem; color: var(--muted); }
    .nums { display: flex; gap: .5rem; align-items: baseline; }
    .x { color: var(--neon); font-size: 1rem; text-shadow: var(--glow); }
    .p { color: var(--muted); font-size: .7rem; }

    .role {
      position: absolute; top: -8px; right: -2px; z-index: 2;
      width: 22px; height: 22px; display: grid; place-items: center;
      border-radius: 50%; font-family: var(--font-title); font-size: .8rem;
      background: var(--neon); color: #04110a; box-shadow: var(--glow);
    }
    .role.v { background: var(--cyan); box-shadow: 0 0 16px rgba(4,245,255,.5); }

    /* mode ligne */
    .pc.row { flex-direction: row; width: 100%; text-align: left; gap: .9rem; }
    .pc.row .info { flex: 1; }
    .pc.row .name { max-width: none; font-size: .95rem; }
    .pc.row .nums { flex-direction: column; align-items: flex-end; gap: 0; }
    .pc.row .role { top: -8px; left: 28px; right: auto; }
    .pc.row .pos { min-width: 62px; text-align: center; }

    @media (max-width: 600px) {
      .pc { width: 66px; }
      .name { font-size: .7rem; max-width: 66px; }
      .pos { padding: .3rem .5rem; font-size: .65rem; }
      .p { display: none; }
      .pc.row { width: 100%; }
      .pc.row .name { max-width: none; font-size: .9rem; }
      .pc.row .p { display: block; }
    }
  `,
})
export class PlayerCard {
  player = input.required<Pl>();
  role = input<'C' | 'V' | ''>('');
  mode = input<'pitch' | 'row'>('pitch');
  price = fmtPrice;
}