import { register } from '../User';

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
});
