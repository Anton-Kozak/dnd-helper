import { Combatant } from 'src/model/interfaces/combatant.interface';
import {
  IStatBlock,
  MappedStat,
} from 'src/model/interfaces/statblock.interface';
import {
  SaveThrows,
  SizeMapper,
  SizesAbbr,
  Stat,
  Stats,
} from 'src/model/types/statblock.type';

export const SIZE_MAPPER: SizeMapper = {
  T: 'Tiny',
  M: 'Medium',
  L: 'Large',
  H: 'Huge',
};

export const statblockMapper = (rawStatblockData: any): IStatBlock => {
  const {
    name,
    str,
    dex,
    con,
    int,
    wis,
    cha,
    save,
    cr,
    speed,
    skill,
    resist,
    immune,
    languages,
    trait,
    action,
    legendary,
    actionTags,
    senses,
    size,
    type,
  } = rawStatblockData;

  const AC: number =
    (rawStatblockData.ac as Array<any>)[0].ac || rawStatblockData.ac || 'N/A';
  const hp: number =
    (rawStatblockData.hp as Array<any>)[0]?.hp.average ||
    rawStatblockData.hp.average;
  const stats = [
    ...mapStatsIntoSingleObject({ str, dex, con, int, wis, cha }, save),
  ];

  return {
    name,
    hp,
    ac: AC,
    speed,
    stats,
    resistances: resist,
    immunities: immune,
    languages,
    cr,
    trait,
    legendary,
    action,
    actionTags,
    skill,
    senses,
    size: SIZE_MAPPER[size as SizesAbbr],
    type: type.type,
  };
};

const mapStatsIntoSingleObject = (
  stats: Stats,
  saveStats: SaveThrows | undefined,
): MappedStat[] => {
  return (Object.keys(stats) as Stat[]).map((statKey) => {
    return {
      name: statKey,
      value: stats[statKey],
      save: saveStats ? saveStats[statKey] : undefined,
    };
  });
};

export const mapStatblockToCombatant = (sb: IStatBlock): Combatant => {
  return {
    id: crypto.randomUUID(),
    hp: sb.hp,
    name: sb.name,
    currentHp: sb.hp,
    ac: sb.ac,
    isActive: false,
    status: 'active',
    initBonus: Math.floor(
      ((sb.stats.find((s) => s.name === 'dex')?.value || 10) - 10) / 2,
    ),
    type: 'monster',
    initiative: 0,
  };
};
