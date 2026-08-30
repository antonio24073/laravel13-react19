import { logout } from "../reducers/login.reducer";
import { login } from "../thunks/login.thunk";

const loginAction = {
  login,
  logout
};

export default loginAction;


