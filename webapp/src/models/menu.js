export default {
  namespace: 'menu',
  state: {
    current: {
      pathname: '/'
    }
  },
  reducers: {
    'set-current'(state, { payload: { pathname, query } }) {
      return {
        ...state,
        current: {
          pathname,
          query
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({
          type: 'set-current',
          payload: {
            pathname: pathname,
            query: query
          }
        })
      })
    }
  }
}