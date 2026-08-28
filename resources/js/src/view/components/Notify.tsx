import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, SnackbarContent } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { close } from '../../store/reducers/notify.reducer';
import type { NotifyModel } from '../../models/NotifyModel';

export default function Notify() {
    const dispatch = useDispatch();
    const notify = useSelector((state: NotifyModel) => state.notify);

    return (
        <Snackbar
            anchorOrigin={{
                horizontal: notify.horizontal,
                vertical: notify.vertical,
            }}
            open={notify.open}
            autoHideDuration={notify.time}
            onClose={() => dispatch(close())}
        >
            <SnackbarContent
                sx={{
                    backgroundColor:
                        notify.class === 'success'
                            ? green[500]
                            : red[600],
                }}
                className="d-flex justify-content-center"
                message={
                    <span className="d-flex align-items-center">
                        {notify.msg}
                    </span>
                }
            />
        </Snackbar>
    );
}