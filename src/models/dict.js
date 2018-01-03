import {platPost as post, platGet as get} from '../utils/request';

const rootPath = 'dict_category';
const rootDictPath = 'dict';

export default {
  namespace: 'dict',
  state: {
    currentPage: 1,
    total: 0,
    datas: [],
  },
  reducers: {
    refresh(props, {payload}) {
      return {
        ...props,
        ...payload,
      };
    },
  },
  effects: {
    // 字典类型
    * saveCategory({category}, {call}) {
      yield call(post, `${rootPath}/save`, category);
    },
    * queryCategory({page}, {call, put}) {
      const data = yield call(post, `${rootPath}/query/${page}`);
      yield put({type: 'refresh', payload: data.response});
    },
    * delCategory({id}, {call}) {
      yield call(get, `${rootPath}/del/${id}`);
    },

    // 字典数据
    * saveDict({dict}, {call}) {
      return (yield call(post, `${rootDictPath}/save`, dict)).response;
    },
    * queryDict({categoryId}, {call}) {
      return (yield call(post, `${rootDictPath}/query/`,
        {categoryId})).response;
    },
    * delDict({id}, {call}) {
      return (yield call(get, `${rootDictPath}/del/${id}`)).response;
    },
  },
};
