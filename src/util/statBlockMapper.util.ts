import { Combatant } from 'src/model/interfaces/combatant.interface';
import {
  IStatBlock,
  MappedStat,
} from 'src/model/interfaces/statblock.interface';
import {
  ALIGNMENT_MAPPER,
  AlignmentAbbr,
  DamageType,
  SaveThrows,
  SIZE_MAPPER,
  SizesAbbr,
  Stat,
  Stats,
} from 'src/model/types/statblock.type';

export const statblockMapper = (rawStatblockData: any): IStatBlock => {
  console.log('invoked to map raw to statblock');
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
    alignment,
  } = rawStatblockData;

  const AC: number =
    (rawStatblockData.ac as Array<any>)[0].ac || rawStatblockData.ac || 'N/A';
  const hp: number =
    (rawStatblockData.hp as Array<any>)[0]?.hp.average ||
    rawStatblockData.hp.average;
  const stats = [
    ...mapStatsIntoSingleObject({ str, dex, con, int, wis, cha }, save),
  ];
  const resistances = parseDamageResAndImmun(resist);
  const immunities = parseDamageResAndImmun(immune);

  return {
    name,
    displayName: name,
    hp,
    ac: AC,
    speed,
    stats,
    resistances,
    immunities,
    languages,
    cr,
    trait,
    legendary,
    action,
    actionTags,
    skill,
    senses,
    size: SIZE_MAPPER[size as SizesAbbr],
    type: type.type || type,
    alignment: alignment.map(
      (a: AlignmentAbbr) => ALIGNMENT_MAPPER[a as AlignmentAbbr],
    ),
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

function parseDamageResAndImmun(data: any[]) {
  if (!data?.length) {
    return [];
  }

  const dmg: string[] = [];
  const uniqueDmg: string[] = [];

  data.forEach((d) => {
    if (typeof d === 'string') {
      dmg.push(d);
    }

    if (typeof d === 'object') {
      if (d.note) {
        uniqueDmg.push(`${d.note}: `);
        d.resist.forEach((ud: DamageType) => {
          uniqueDmg.push(ud);
        });
      }
      if (d.special) {
        uniqueDmg.push(d.special);
      }
    }
  });
  return [...dmg, ...uniqueDmg];
}

export const mapStatblockToCombatant = (sb: IStatBlock): Combatant => {
  return {
    id: crypto.randomUUID(),
    hp: sb.hp,
    name: sb.name,
    displayName: sb.displayName,
    currentHp: sb.hp,
    ac: sb.ac,
    isActiveTurn: false,
    isStatblockSelected: false,
    status: 'active',
    initBonus: Math.floor(
      ((sb.stats.find((s) => s.name === 'dex')?.value || 10) - 10) / 2,
    ),
    type: 'monster',
    initiative: 0,
  };
};
