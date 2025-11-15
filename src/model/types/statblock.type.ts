export type Stats = {
  [S in Stat]: number;
};

export type SaveThrows = {
  [SS in Stat]?: string;
};

export type DamageType =
  | 'necrotic'
  | 'radiant'
  | 'posion'
  | 'acid'
  | 'lightning'
  | 'thunder'
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'psychic'
  | 'cold'
  | 'fire'
  | 'force'
  | 'thunder';

export type SpeedType = 'walk' | 'burrow' | 'fly' | 'swim';
export type SpeedInfo = {
  [Speed in SpeedType]: number;
};
export type Language = 'Draconic' | 'Common';

export type Stat = 'str' | 'con' | 'dex' | 'wis' | 'int' | 'cha';

// TODO: write possible skills rather than just string
export type Skill = { [key: string]: string };

// Sizes
export type SizesAbbr = 'T' | 'M' | 'L' | 'H';
export type SizesFull = 'Tiny' | 'Medium' | 'Large' | 'Huge';
export type SizeMapper = Record<SizesAbbr, SizesFull>;

// Alignment
export type AlignmentAbbr = 'L' | 'E' | 'C' | 'N' | 'G' | 'U';
export type AlignmentFull =
  | 'Lawful'
  | 'Evil'
  | 'Chaotic'
  | 'Neutral'
  | 'Good'
  | 'Unknown';
export type AlignmentMapper = Record<AlignmentAbbr, AlignmentFull>;

export const SIZE_MAPPER: SizeMapper = {
  T: 'Tiny',
  M: 'Medium',
  L: 'Large',
  H: 'Huge',
};

export const ALIGNMENT_MAPPER: AlignmentMapper = {
  G: 'Good',
  N: 'Neutral',
  L: 'Lawful',
  U: 'Unknown',
  E: 'Evil',
  C: 'Chaotic',
};