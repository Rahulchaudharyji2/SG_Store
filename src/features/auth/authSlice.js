import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const DEFAULT_STATE = { token: null, user: null, isAuthenticated: false };

function loadInitial() {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw);

    // Accept only object with expected shape, otherwise reset
    if (
      parsed &&
      typeof parsed === 'object' &&
      ('isAuthenticated' in parsed || 'token' in parsed || 'user' in parsed)
    ) {
      return {
        ...DEFAULT_STATE,
        ...parsed,
        isAuthenticated: Boolean(parsed?.token && parsed?.user),
      };
    }
  } catch {
    // ignore parse errors
  }
  // Clean up bad/corrupted values
  localStorage.removeItem('auth');
  return DEFAULT_STATE;
}

const initialState = loadInitial();

function persist(state) {
  try {
    localStorage.setItem('auth', JSON.stringify(state));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user } = action.payload || {};
      state.token = token || null;
      state.user = user || null;
      state.isAuthenticated = Boolean(token && user);
      persist(state);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      persist(state);
    },
    // Optional: force-reset from UI if ever needed
    resetAuth() {
      persist(DEFAULT_STATE);
      return { ...DEFAULT_STATE };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token || null;
        state.user = payload.user || null;
        state.isAuthenticated = Boolean(payload?.token && payload?.user);
        persist(state);
      })
      .addMatcher(authApi.endpoints.signupAdmin.matchFulfilled, (state, { payload }) => {
        state.token = payload.token || null;
        state.user = payload.user || null;
        state.isAuthenticated = Boolean(payload?.token && payload?.user);
        persist(state);
      });
  },
});

export const { setCredentials, logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;