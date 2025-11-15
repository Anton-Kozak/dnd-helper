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
  isActive: boolean;
  status: 'active' | 'dead' | 'incapaciated';
}
