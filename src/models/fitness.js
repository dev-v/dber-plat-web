import {query} from '../services/fitnessService';
import {platGet as get, platPost as post} from '../utils/request';

const rootPath = 'fitness_service';

export default {
  namespace: 'fitness',
  state: {
    datas: [],
    total: 0,
    currentPage: 1,
  },
  reducers: {},
  effects: {
    * query({page}, {call, put}) {
      return (yield call(post, `${rootPath}/query/${page}`)).response;
    },
    * del({id}, {call}) {
      return (yield call(get, `${rootPath}/del/${id}`)).response;
    },
    * save({data}, {call}) {
      return (yield call(post, `${rootPath}/save`, data)).response;
    },
    * get({id}, {call}) {
      return (yield call(get, `${rootPath}/get/${id}`)).response;
    },
  },
};
