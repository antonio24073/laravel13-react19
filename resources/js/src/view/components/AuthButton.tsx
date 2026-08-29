import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { login } from '../../store/thunks/auth.thunk';

export default function AuthButton() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = () => {
    dispatch(
      login({
        email: 'test1@obawp.com',
        password: 'pjJKYiuWzwLPc7',
      })
    );
  };

  return (
    <button onClick={handleLogin}>
      {loading ? 'Entrando...' : 'Entrar'}
    </button>
  );
}