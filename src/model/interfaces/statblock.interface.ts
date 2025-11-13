import {
  DamageType,
  Language,
  SaveThrows,
  SizesFull,
  Skill,
  SpeedInfo,
  Stats,
} from '../types/statblock.type';

export interface IStatBlock {
  name: string;
  hp: number;
  ac: number;
  speed: Partial<SpeedInfo>;
  stats: Stats;
  save: SaveThrows;
  resistances: DamageType[];
  immunities: DamageType[];
  languages: Language[];
  cr: string;
  trait: IBaseAction;
  legendary: IBaseAction;
  action: IBaseAction;
  actionTags: string[];
  skill: Skill;
  senses: string[];
  size: SizesFull;
  // TODO: hardcode types
  type: string;
}

// TODO: add other skills
export interface ISkills {
  perception: string;
  stealth: string;
}

export interface IBaseAction {
  name: string;
  entries: string[];
}
