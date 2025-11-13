export type Stats = {
  [StatSave in Stat]: number;
};

export type SaveThrows = {
  [StatSave in Stat]: string;
};

export type DamageType = 'necrotic' | 'radiant' | 'posion' | 'acid';
export type SpeedType = 'walk' | 'burrow' | 'fly' | 'swim';
export type SpeedInfo = {
  [Speed in SpeedType]: number;
};
export type Language = 'Draconic' | 'Common';

export type Stat = 'str' | 'con' | 'dex' | 'wis' | 'int' | 'cha';

// TODO: write possible skills rather than just string
export type Skill = { [key: string]: string };

export type SizesAbbr = 'T' | 'M' | 'L' | 'H';
export type SizesFull = 'Tiny' | 'Medium' | 'Large' | 'Huge';
export type SizeMapper = Record<SizesAbbr, SizesFull>;
