export interface Combatant {
  id: string;
  name: string;
  displayName: string;
  hp: number;
  currentHp: number;
  ac: number;
  initBonus: number;
  initiative: number;
  type: 'player' | 'monster' | 'npc';
  isActiveTurn: boolean;
  isStatblockSelected: boolean;
  status: 'active' | 'dead' | 'incapaciated';
}
