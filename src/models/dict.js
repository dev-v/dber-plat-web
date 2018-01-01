import {
  queryCategory,
  queryByCategoryId,
  addCategory,
} from '../services/dictService';

export default {
  namespace: 'dict',
  state: {
    index: {
      selectedKeys: [],
      currentPage: 1,
      total: 0,
      datas: [],
    },
    editCategory: {
      data: {},
    },
  },
  reducers: {
    refresh(props, {index}) {
      return {...props, index};
    },
    addCategory(props) {
      props.index = {...props.index, ...{datas: [{}, ...props.index.datas]}};
      return {...props};
    },
    editCategory(props, {data = {}}) {
      props.editCategory = {
        visible: true, data,
      };
      return {...props};
    },
    cancelCategory(props) {
      props.editCategory = {visible: false};
      return {...props};
    },
  },
  effects: {
    * saveCategory({category}, {call, put}) {
      yield call(addCategory, category);
      yield put({type: 'queryCategory'});
    },
    * queryCategory({page}, {call, put}) {
      const {data} = yield call(queryCategory, page);
      yield put({type: 'refresh', index: data.response});
    },
    * queryDicts({categoryId}, {call}) {
      const {data} = yield call(queryByCategoryId, categoryId);
      console.log(data);
    },
  },
};
