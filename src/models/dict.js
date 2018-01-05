import basePlat from './basePlat';

const baseCategory = basePlat('dict', 'dict_category');
const baseDict = basePlat('dict', 'dict', 'Dict');

export default {
  ...baseCategory,
  effects: {
    ...baseCategory.effects,
    ...baseDict.effects,
  },
};
