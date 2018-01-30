import basePlat from './basePlat';

const shop = basePlat('shop', 'shop');

export default {
  ...shop,
  effects: {
    ...shop.effects,
    * setBasePrice({data}, {call}) {
      return (yield call(shop.service.post, `${shop.serviceRootPath}/setBasePrice`, data)).response;
    }
  }
}
