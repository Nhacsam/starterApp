import { register, registeringSelector, registeringFailureSelector, userReducer } from '../User';

import { createSuccess, createFailure } from '../Model/User';

describe('User module', () => {
  const user = { email: 'test@test.com' };

  describe('action creator', () => {
    it('should create a register action', () => {
      expect(register(user)).toEqual({
        type: 'USER.REGISTER',
        payload: { user },
      });
    });
  });

  describe('selectors', () => {
    it('should select the registerging boolean', () => {
      const state = { user: { registering: false } };
      expect(registeringSelector(state)).toBe(false);
      state.user.registering = true;
      expect(registeringSelector(state)).toBe(true);
    });

    it('should select the registerging failure boolean', () => {
      const state = { user: { registerFailure: false } };
      expect(registeringFailureSelector(state)).toBe(false);
      state.user.registerFailure = true;
      expect(registeringFailureSelector(state)).toBe(true);
    });
  });

  describe('reducer', () => {
    const initialState = {
      registering: false,
      registerFailure: false,
    };

    it('should return an initial state', () => {
      expect(userReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should return the last state by default', () => {
      expect(userReducer(initialState, { type: 'UNKNOWN' })).toBe(initialState);
    });

    it('should save the user and mark as registering', () => {
      expect(userReducer(initialState, register(user))).toEqual({
        registering: true,
        registerFailure: false,
      });
    });

    it('should save the user and stop registering', () => {
      const state = userReducer(initialState, register({ email: 'other_email' }));
      expect(userReducer(state, createSuccess(user))).toEqual({
        registering: false,
        registerFailure: false,
      });
    });
    it('should mark registering as error and stop it', () => {
      const state = userReducer(initialState, register({ email: 'other_email' }));
      expect(userReducer(state, createFailure())).toEqual({
        registering: false,
        registerFailure: true,
      });
    });
  });
});
