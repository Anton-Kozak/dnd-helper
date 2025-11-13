import { IStatBlock } from 'src/model/interfaces/statblock.interface';
import { SizeMapper, SizesAbbr } from 'src/model/types/statblock.type';

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

  const AC: number = (rawStatblockData.ac as Array<any>)[0].ac;
  const hp: number =
    (rawStatblockData.hp as Array<any>)[0]?.hp.average ||
    rawStatblockData.hp.average;

  return {
    name,
    hp,
    ac: AC,
    speed,
    stats: { str, dex, con, int, wis, cha },
    save,
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
    type: type.toUpperCase(),
  };
};
