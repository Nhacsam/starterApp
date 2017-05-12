import {
  register,
  registerSuccess,
  registerFail,
  registeringSelector,
  registeringFailureSelector,
  userReducer,
} from '../User';

describe('User module', () => {
  const user = { email: 'test@test.com' };

  describe('action creator', () => {
    it('should create a register action', () => {
      expect(register(user)).toEqual({
        type: 'USER.REGISTER',
        user,
      });
    });

    it('should create a register success action', () => {
      expect(registerSuccess(user)).toEqual({
        type: 'USER.REGISTER_SUCCESS',
        user,
      });
    });

    it('should create a register fail action', () => {
      expect(registerFail()).toEqual({
        type: 'USER.REGISTER_FAILURE',
      });
    });
  });

  describe('selectors', () => {
    it('should select the registerging boolean', () => {
      const state = { user: { _meta: { registering: false } } };
      expect(registeringSelector(state)).toBe(false);
      state.user._meta.registering = true;
      expect(registeringSelector(state)).toBe(true);
    });

    it('should select the registerging failure boolean', () => {
      const state = { user: { _meta: { registerFailure: false } } };
      expect(registeringFailureSelector(state)).toBe(false);
      state.user._meta.registerFailure = true;
      expect(registeringFailureSelector(state)).toBe(true);
    });
  });

  describe('reducer', () => {
    const randomState = {
      ...user,
      _meta: {
        registering: false,
        registerFailure: false,
      },
    };

    it('should return an initial state', () => {
      expect(userReducer()).toEqual({
        _meta: {
          registering: false,
          registerFailure: false,
        },
      });
    });

    it('should return the last state by default', () => {
      expect(userReducer(randomState, { type: 'UNKNOWN' })).toBe(randomState);
    });

    it('should save the user and mark as registering', () => {
      expect(userReducer(randomState, register(user))).toEqual({
        ...user,
        _meta: {
          registering: true,
          registerFailure: false,
        },
      });
    });

    it('should save the user and stop registering', () => {
      const state = userReducer(randomState, register({ email: 'other_email' }));
      expect(userReducer(state, registerSuccess(user))).toEqual({
        ...user,
        _meta: {
          registering: false,
          registerFailure: false,
        },
      });
    });
    it('should mark registering as error and stop it', () => {
      const state = userReducer(randomState, register({ email: 'other_email' }));
      expect(userReducer(state, registerFail())).toEqual({
        email: 'other_email',
        _meta: {
          registering: false,
          registerFailure: true,
        },
      });
    });
  });
});
