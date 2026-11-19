
import { Component, computed, input } from '@angular/core';
import { Pl } from '../core/models';
import { PlayerCard } from './player-card';

const ORDER = ['FWD', 'MID', 'DEF', 'GKP'];     // attaque en haut, gardien en bas

@Component({
  selector: 'app-pitch',
  imports: [PlayerCard],
  template: `
    <div class="pitch">
      @for (row of rows(); track row.pos) {
        <div class="line">
          @for (p of row.players; track p.name + p.team) {
            <app-player-card [player]="p" [role]="roleOf(p)" />
          }
        </div>
      }
    </div>
  `,
  styles: `
    .pitch {
      position: relative; display: grid; grid-template-rows: repeat(4, 1fr);
      gap: 1rem; padding: 1.8rem .6rem; min-height: 560px;
      background:
        repeating-linear-gradient(180deg, rgba(0,255,133,.04) 0 60px, rgba(0,255,133,.09) 60px 120px),
        #0b1712;
      border: 1px solid rgba(0,255,133,.3);
      clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
    }
    .pitch::before {            /* ligne médiane */
      content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px;
      background: rgba(0,255,133,.3);
    }
    .pitch::after {             /* rond central */
      content: ''; position: absolute; left: 50%; top: 50%;
      width: 120px; height: 120px; border-radius: 50%;
      border: 1px solid rgba(0,255,133,.3); transform: translate(-50%, -50%);
    }
    .line { position: relative; z-index: 1; display: flex; justify-content: space-around; align-items: center; }
    @media (max-width: 600px) { .pitch { min-height: 480px; } }
  `,
})
export class Pitch {
  xi = input.required<Pl[]>();
  captain = input('');
  vice = input('');

  rows = computed(() =>
    ORDER.map(pos => ({ pos, players: this.xi().filter(p => p.pos === pos) })).filter(r => r.players.length)
  );

  roleOf(p: Pl): 'C' | 'V' | '' {
    return p.name === this.captain() ? 'C' : p.name === this.vice() ? 'V' : '';
  }
}