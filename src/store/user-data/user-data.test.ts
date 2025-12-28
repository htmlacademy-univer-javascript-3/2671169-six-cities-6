import { authorizeUser, loginUser, logoutUser } from '../api-actions/user';
import { makeFakeUser } from '../../utils/mocks';
import { UsersSlice } from '../user-data/user-data';
import { AuthStatus } from '../../const';
import { UserState } from '../../types/state';

describe('User slice', () => {
  const usersState: UserState = {
    isAuthLoading: false,
    error: null,
    authorizationStatus: AuthStatus.Unknown,
    user: null
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = UsersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(usersState);
  });

  it('should return updated state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...usersState, isLoading: true };

    const result = UsersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  describe('loginUser', () => {
    it('should return "isAuthLoading" to "true", "error" to "null" with "loginUser.pending"', () => {
      const expectedState = { ...usersState, isAuthLoading: true };
      const result = UsersSlice.reducer(undefined, loginUser.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isAuthLoading" to "false", "error" to "error.message" with "loginUser.rejected"', () => {
      const action = {
        type: loginUser.rejected,
        payload: 'Failed to authorized',
      };
      const expectedState = { ...usersState, error: 'Failed to authorized' };

      const result = UsersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return set "authorizationStatus" to "AUTH" and "user" to user data, "error" to "null" with "loginUser.fulfilled"', () => {
      const mockUser = makeFakeUser();
      const action = {
        type: loginUser.fulfilled,
        payload: mockUser
      };
      const expectedState = { ...usersState, user: mockUser, authorizationStatus: AuthStatus.Auth };

      const result = UsersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('authorizeUser', () => {
    it('should return "isAuthLoading" to "true", "error" to "null" with "authorizeUser.pending"', () => {
      const expectedState = { ...usersState, isAuthLoading: true };
      const result = UsersSlice.reducer(undefined, authorizeUser.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isAuthLoading" to "false", "error" to "error.message" with "authorizeUser.rejected"', () => {
      const action = {
        type: authorizeUser.rejected,
        payload: 'Failed to authorized',
      };
      const expectedState = { ...usersState, error: 'Failed to authorized' };

      const result = UsersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return set "authorizationStatus" to "AUTH" and "user" to user data, "error" to "null" with "authorizeUser.fulfilled"', () => {
      const mockUser = makeFakeUser();
      const action = {
        type: authorizeUser.fulfilled,
        payload: mockUser
      };
      const expectedState = { ...usersState, user: mockUser, authorizationStatus: AuthStatus.Auth };

      const result = UsersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('logOutUser', () => {
    it('should return "isAuthLoading" to "true", "error" to "null" with "logOutUser.pending"', () => {
      const expectedState = { ...usersState, isAuthLoading: true};
      const result = UsersSlice.reducer(undefined, logoutUser.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isAuthLoading" to "false", "error" to "error.message" with "logOutUser.rejected"', () => {
      const action = {
        type: logoutUser.rejected,
        payload: 'Failed to logout',
      };
      const expectedState = { ...usersState, error: 'Failed to logout' };

      const result = UsersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return set "authorizationStatus" to "UNKNOWN" and "user" to "null", "error" to "null" with "logOutUser.fulfilled"', () => {
      const result = UsersSlice.reducer(undefined, logoutUser.fulfilled);
      expect(result).toEqual(usersState);
    });
  });
});
