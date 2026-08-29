import { logout } from "../reducers/auth.reducer";
import { login } from "../thunks/auth.thunk";

const authAction = {
  login,
  logout,
};

export default authAction;


