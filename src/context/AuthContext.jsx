import { createContext, useContext, useReducer, useCallback } from 'react';

// ─── Auth Context ───────────────────────────────────────────────
const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        modal: null,
        error: null,
      };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, error: null };
    case 'OPEN_MODAL':
      return { ...state, modal: action.payload, error: null };
    case 'CLOSE_MODAL':
      return { ...state, modal: null, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  modal: null, // 'signin' | 'signup'
  error: null,
  loading: false,
};

// Mock user DB (in-memory for demo)
const MOCK_USERS = [
  { id: 'u1', email: 'demo@nocturn.com', password: 'gothic123', name: 'Morticia Vale' },
];

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const signIn = useCallback(async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // Simulate API latency
    await new Promise(r => setTimeout(r, 800));
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      dispatch({ type: 'LOGIN', payload: safeUser });
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials. Try demo@nocturn.com / gothic123' });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const signUp = useCallback(async (name, email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await new Promise(r => setTimeout(r, 800));
    if (MOCK_USERS.find(u => u.email === email)) {
      dispatch({ type: 'SET_ERROR', payload: 'An account with this email already exists.' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }
    const newUser = { id: `u${Date.now()}`, email, name };
    MOCK_USERS.push({ ...newUser, password });
    dispatch({ type: 'LOGIN', payload: newUser });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const signOut = useCallback(() => dispatch({ type: 'LOGOUT' }), []);
  const openModal = useCallback((type) => dispatch({ type: 'OPEN_MODAL', payload: type }), []);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        modal: state.modal,
        error: state.error,
        loading: state.loading,
        signIn,
        signUp,
        signOut,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
