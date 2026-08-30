import { register } from '../thunks/register.thunk';
import { clearRegisterState } from '../reducers/register.reducer';

const registerAction = {
    register,
    clearRegisterState,
};

export default registerAction;