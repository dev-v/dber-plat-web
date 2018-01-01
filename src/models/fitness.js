import {query} from '../services/fitnessService';

export default {
  namespace: 'fitness',
  state: {
    selectedKeys: [],
    currentPage: 1,
    total: 0,
    datas: [],
  },
  reducers: {
    refresh(props, {payload}) {
      return {...props, ...payload};
    },
  },
  effects: {
    * query({page}, {call, put}) {
      const {data} = yield call(query, page);
      yield put({type: 'refresh', payload: data.response});
    },
  },
};
