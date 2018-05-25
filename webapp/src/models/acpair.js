import * as acpairService from 'services/acpair';
import * as elegantService from 'services/elegant';

var initialState = {
  showResult: false,

  // settings
  settings: {
    list: [],
    isLoading: false
  },

  // results
  results: {
    isAnalyzing: false
  }
};

export default {
  namespace: 'acpair',
  state: initialState,
  reducers: {
    'set-show-result'(state, { payload: { showResult } }) {
      return {
        ...state,
        showResult
      };
    },

    // settings
    'init-list'(state, { payload: { list } }) {
      return {
        ...state,
        settings: {
          ...state.settings,
          list: list.map((acpair, i) => {
            return {
              ...acpair,
              checked: false,
              index: i
            };
          })
        }
      };
    },
    'check-all'(state) {
      return {
        ...state,
        settings: {
          ...state.settings,
          list: state.settings.list.map(acpair => {
            return {
              ...acpair,
              checked: true,
            };
          })
        }
      };
    },
    'check-none'(state) {
      return {
        ...state,
        settings: {
          ...state.settings,
          list: state.settings.list.map(acpair => {
            return {
              ...acpair,
              checked: false,
            };
          })
        }
      };
    },
    'check-uncheck-one'(state, { payload: { index, checked } }) {
      const list = [...state.settings.list];
      list[index].checked = checked;

      return {
        ...state,
        settings: {
          ...state.settings,
          list
        }
      };
    },
    'set-loading'(state, { payload: { isLoading } }) {
      return {
        ...state,
        settings: {
          ...state.settings,
          isLoading
        }
      };
    },

    // results
    'set-result'(state, { payload: { result } }) {
      return {
        ...state,
        results: {
          resultInString: result.resultInString
        }
      };
    },
    'set-analyzing'(state, { payload: { isAnalyzing } }) {
      return {
        ...state,
        results: {
          ...state.results,
          isAnalyzing
        }
      };
    }
  },
  effects: {
    * 'fetch'(_, { call, put }) {
      // set show results
      yield put({
        type: 'set-show-result',
        payload: {
          showResult: false
        }
      });

      // set loading
      yield put({ type: 'set-loading', payload: { isLoading: true } });

      // fetch data
      const { data, headers } = yield call(acpairService.get);
      yield put({
        type: 'init-list',
        payload: {
          list: data,
          total: headers['x-total-count']
        }
      });

      // set unloading
      yield put({ type: 'set-loading', payload: { isLoading: false } });
    },
    * 'upload'({ payload: { acpairs, file, d3Algo } }, { call, put }) {
      // set show result
      yield put({
        type: 'set-show-result',
        payload: {
          showResult: true
        }
      });
      
      // set result page: analyzing
      yield put({ type: 'set-analyzing', payload: { isAnalyzing: true } });

      // upload and wait for analysing
      let { data, headers } = yield call(elegantService.post, { acpairs, file, d3Algo });
      yield put({ type: 'set-result', payload: { result: data } });

      // set result page: analyzing done
      yield put({
        type: 'set-analyzing',
        payload: {
          isAnalyzing: false
        }
      });
    }
  }
};
