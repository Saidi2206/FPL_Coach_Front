export interface Meta {
  gw: number;
  deadline: string;
  updated_at: string;
  calendar: { gw: number; matchs: number }[];
}

export interface TipPlayer {
  name: string; team?: string; price: number;
  xpts?: number; pts4?: number; sel?: number;
  vs?: string; ceiling?: number; net?: number; valeur?: number;
}

export interface Tips {
  captain: TipPlayer[];
  differentials: TipPlayer[];
  value: Record<'GKP' | 'DEF' | 'MID' | 'FWD', TipPlayer[]>;
  rises: TipPlayer[];
  falls: TipPlayer[];
  teams: { attack: { team: string; score: number }[]; defense: { team: string; score: number }[] };
  mine?: {
    weakest: { name: string; pos: string; price: number; pts4: number; news: string }[];
    leaving: { name: string; price: number; net: number }[];
  };
}

export interface Pl { name: string; pos: string; team: string; xpts: number; price: number; }

export interface TeamAnalysis {
  gw: number;
  deadline: string;
  team: { name: string; rank: number; points: number; bank: number; free_transfers: number };
  lineup: { captain: string; vice: string; xi: Pl[]; bench: Pl[] };
  transfers: {
    horizon: number; gain_net: number; hit: number;
    advice: { pos: string; out: Pl; in: Pl }[];
    options: { max: number; made: number; hit: number; net: number }[];
  };
  tips: Tips;
  alerts: { name: string; status: string; chance: number | null; news: string }[];
  history: {
    gws: { gw: number; points: number; average: number | null; rank: number }[];
    hits_lost: number; bench_points: number; captain_regret: number;
  };
}

export interface ChipsPlan {
  plan: { chip: string; gw: number; deadline: string; gain: string }[];
  used: { name: string; event: number }[];
  note: string;
  wildcard: { gw: number; gain: number }[];
  freehit: { gw: number; matchs: number; gain: number }[];
  benchboost: { gw: number; bench: number; bench_mine: number }[];
}