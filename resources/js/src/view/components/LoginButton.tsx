import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { login } from '../../store/thunks/login.thunk';

export default function LoginButton() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(
    (state: RootState) => state.login
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