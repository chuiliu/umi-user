import * as service from '../services/users';

export default {
  state: {
    list: [], // 用户列表
    current: 1, // 当前页码
    total: 0, // 总条数
    editUser: {},  // 当前编辑的用户
  },
  effects: {
    *query({ payload: { page } }, { call, put }) {
      const { data: { list, page: { total, current } } } = yield call(service.getUsers, { page });
      yield put({
        type: 'save',
        payload: {
          list,
          total,
          current
        }
      });
    },
    *create({ payload: user }, { call, put, select }) {
      yield call(service.addUser, user);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'query',
        payload: { page }
      });
    },
    *delete({ payload: id }, { call, put, select }) {
      yield call(service.removeUser, id);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'query',
        payload: { page }
      });
    },
    *update({ payload: { id, user } }, { call, put, select }) {
      yield call(service.updateUser, id, user);
      const page = yield select(state => state.users.page);
      yield put({
        type: 'query',
        payload: { page }
      });
    },
    *queryUser({ payload: { id } }, { call, put, select }) {
      let list = yield select(state => state.users.list);
      console.log(list, id);
      let user = null;
      if (list && list.length) {
        user = list.find(user => user.id === parseInt(id, 10));
      }
      if (!user || !user.id) {
        let { data } = yield call(service.queryUser, id);
        user = data;
      }
      yield put({
        type: 'saveEditUser',
        payload: {
          editUser: user
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'query', payload: query });
        }
        if (/\/users\/\d+\/edit/.test(pathname)) {
          console.log('edit');
        }
      });
    }
  },
  reducers: {
    save(state, { payload: { list, total, current } }) {
      return {
        ...state,
        list,
        total,
        current
      }
    },
    saveEditUser(state, { payload: { editUser } }) {
      return {
        ...state,
        editUser
      }
    }
  }
};
