import {
  AlignmentFull,
  SizesFull,
  Skill,
  SpeedInfo,
  Stat,
} from '../types/statblock.type';

export interface IStatBlock {
  name: string;
  displayName: string;
  hp: number;
  ac: number;
  speed: Partial<SpeedInfo>;
  stats: MappedStat[];
  resistances: string[];
  immunities: string[];
  languages: string[];
  cr: string;
  trait: IBaseAction[];
  legendary: IBaseAction[];
  action: IBaseAction[];
  actionTags: string[];
  skill: Skill;
  senses: string[];
  size: SizesFull;
  // TODO: hardcode types
  type: string;
  alignment: AlignmentFull[];
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

export interface MappedStat {
  name: Stat;
  value: number;
  save: string | undefined;
}
