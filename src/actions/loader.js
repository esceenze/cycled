export const FETCHING_STARTED = 'FETCHING_STARTED';
export const FETCHING_COMPLETE = 'FETCHING_COMPLETE';

export function loaderFetchingStarted() {
  return {
    type: FETCHING_STARTED,
  };
}

export function loaderFetchingComplete() {
  return {
    type: FETCHING_COMPLETE,
  };
}

export const FETCHING_BACKGROUND_STARTED = 'FETCHING_BACKGROUND_STARTED';
export const FETCHING_BACKGROUND_COMPLETE = 'FETCHING_BACKGROUND_COMPLETE';
export function loaderBackgroundFetchingStarted() {
  return {
    type: FETCHING_BACKGROUND_STARTED,
  };
}

export function loaderBackgroundFetchingComplete() {
  return {
    type: FETCHING_BACKGROUND_COMPLETE,
  };
}
