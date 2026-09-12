import { logout } from "../reducers/login.reducer";
import { login } from "../thunks/login.thunk";

export { logout };

const loginAction = {
  login,
  logout
};

export default loginAction;


