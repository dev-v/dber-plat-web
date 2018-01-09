import {shopService} from '../utils/request';

/**
 * 使用实例
 */
/*
import basePlat from './basePlat';
1、直接使用
export default basePlat('fitness', 'fitness_service');

2、定制
const baseFitness = basePlat('fitness', 'fitness_service');
export default {
  ...baseFitness,
  effects: {
    ...baseFitness.effects,
    // 下面可以是扩展或覆盖默认的effects
  },
};*/

export default (namespace, serviceRootPath, methodNameSuffix = '') => {

  return {
    namespace,
    state: {},
    reducers: {},
    effects: {
      * [`query${methodNameSuffix}`]({page}, {call}) {
        return (yield call(shopService.post,
          `${serviceRootPath}/query/${page}`)).response;
      },
      * [`queryWithoutPage${methodNameSuffix}`]({condition}, {call}) {
        return (yield call(shopService.post, `${serviceRootPath}/query`,
          condition)).response;
      },
      * [`del${methodNameSuffix}`]({id}, {call}) {
        return (yield call(shopService.get,
          `${serviceRootPath}/del/${id}`)).response;
      },
      * [`save${methodNameSuffix}`]({data}, {call}) {
        return (yield call(shopService.post, `${serviceRootPath}/save`,
          data)).response;
      },
      * [`get${methodNameSuffix}`]({id}, {call}) {
        return (yield call(shopService.get,
          `${serviceRootPath}/get/${id}`)).response;
      },
    },
  };
}
