export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function createNotification(options) {
  const defaults = {
    type: 'info',
    text: '',
    title: '',
    position: 'tr',
    timeout: 5000,
  };
  return {
    type: CREATE_NOTIFICATION,
    ...defaults,
    ...options,
  };
}

export function removeNotification(id) {
  return {
    type: CREATE_NOTIFICATION,
  };
}
