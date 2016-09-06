// @flow

import {
  FETCHING_STARTED,
  FETCHING_COMPLETE,
  FETCHING_BACKGROUND_STARTED,
  FETCHING_BACKGROUND_COMPLETE,
} from 'actions/loader';

const initialState = {
  fetchingComponents: 0,
  backgroundFetchingComponents: 0,
};

export default (state: object = initialState, action: object): object => {
  switch (action.type) {
    case FETCHING_STARTED:
      return {
        ...state,
        fetchingComponents: state.fetchingComponents + 1,
      };
    case FETCHING_COMPLETE:
      return {
        ...state,
        fetchingComponents: state.fetchingComponents - 1,
      };
    case FETCHING_BACKGROUND_STARTED:
      return {
        ...state,
        backgroundFetchingComponents: state.backgroundFetchingComponents + 1,
      };
    case FETCHING_BACKGROUND_COMPLETE:
      return {
        ...state,
        backgroundFetchingComponents: state.backgroundFetchingComponents - 1,
      };
    default:
      return state;
  }
};
