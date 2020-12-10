export const clearStateAct = 'CLEAR_STATE';

export const setErrorMessage = <T, E>(state: T, error: E): T => ({
  ...state,
  error,
});

export const setLoading = (state: any): typeof state => ({
  ...state,
  isLoading: true,
  addingDone: false,
  error: null,
});

export const unsetLoading = (state: any): typeof state => ({
  ...state,
  isLoading: false,
});

export const defaultPayload = {
};
